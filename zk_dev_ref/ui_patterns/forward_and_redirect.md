

A Web application jumping from one URL to another is usually caused by
the user's click on a hyperlink, such as clicking on a
[button]({{site.baseurl}}/zk_component_ref/button),
[toolbarbutton]({{site.baseurl}}/zk_component_ref/toolbarbutton),
[menuitem]({{site.baseurl}}/zk_component_ref/menuitem)
and [a]({{site.baseurl}}/zk_component_ref/a) that
is associated with the `href` attribute.

```xml
<button label="Next" href="next.zul"/>
```

It is done at the client without Java code, so it is efficient. However,
you could control it on the server (in Java) too, such that you could
redirect it based on some information that is available only at the
server.

# Redirect to Another URL

Redirecting to another URL is straightforward: pass the URL to
[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String)).
A typical use case is to redirect after authenticating the user's login.

```java
if (someCondition())
   Executions.sendRedirect("/ready.zul");
```

You could also ask the browser to open another browser window from a
given URL by the use of
[org.zkoss.zk.ui.Execution#sendRedirect(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#sendRedirect(java.lang.String, java.lang.String)).

## Redirect When Loading

[org.zkoss.zk.ui.Executions#sendRedirect(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect(java.lang.String))
is designed to be used when serving an AU request (aka., Ajax). If you
want to redirect to another page when loading a ZUML document, it is
more efficient to call
[HttpServletResponse.sendRedirect](http://download.oracle.com/javaee/1.4/api/javax/servlet/http/HttpServletResponse.html#sendRedirect%28java.lang.String%29)[^1],
such that the browser will handle the redirect for you without running
any JavaScript code.

For example,

```java
if (!isLogin()) {
    Execution exec = Executions.getCurrent();
    HttpServletResponse response = (HttpServletResponse)exec.getNativeResponse();
    response.sendRedirect(response.encodeRedirectURL("/login")); //assume there is /login
    exec.setVoided(true); //no need to create UI since redirect will take place
}
```

Notice that we invoke
[org.zkoss.zk.ui.Execution#setVoided(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#setVoided(boolean))
to *void* an execution, such that ZK Loader will abort the evaluation of
a ZUML document (if you prefer not to generate any UI when redirecting).

Also notice that the casting to `javax.servlet.http.HttpServletResponse`
in the above example does *not* work in a portlet, since the native
response is an instance of `javax.portlet.RenderResponse`.

To check whether to redirect can be packed as
[org.zkoss.zk.ui.util.Initiator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Initiator.html), see
below for an example:

```java
public class AuthenticateInit extends org.zkoss.zk.ui.util.GenericInitiator {
    public void doInit(Page page, Map args) throws Exception {
        if (!isLogin()) {
            Execution exec = Executions.getCurrent();
            HttpServletResponse response = (HttpServletResponse)exec.getNativeResponse();
            response.sendRedirect(response.encodeRedirectURL("/login")); //assume there is /login
            exec.setVoided(true); //no need to create UI since redirect will take place
        }
    }
}
```

Then, you could specify it in your ZUML document:

```xml
<?init class="foo.AuthenticateInit"?>
```

> ------------------------------------------------------------------------
>
> <references/>

# Forward to Another Page

Sometimes we have to forward to another page. For example, when a user
visits a page that requires authorization, we could forward it to a
login page[^2].

The simplest way is to use the [forward directive](zuml_ref/forward):

```xml
<?forward uri="/login.zul" if="${!foo:isLogin()}"?>
```

where we assume `isLogin` is an EL function that returns whether the
user has logged in. For more information, please refer to the
[Conditional Evaluation]({{site.baseurl}}/zk_dev_ref/ui_composing/conditional_evaluation)
section.

You could forward to another page by the use of
[org.zkoss.zk.ui.Executions#forward(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#forward(java.lang.String))
too.

Notice that forwarding can be called only when loading a page. You
cannot call it when handling an Ajax request (such as when a user clicks
a button). For handling an Ajax request, you have to use *redirect* as
described in the previous section.

Unlike redirect, forward does *not* change the URL that the browser
knows. Rather, it is purely server-side activity: using another page's
content instead of the original one to render the output of the given
(and the same) URL.

# Navigation and desktop cleanup

The client-side ZK Engine monitors outgoing navigation using the
javascript onBeforeUnload event. This event is fired when the browser’s
window is about to unload. From the client engine point of view, unload
indicates that the current page will no longer be used. Therefore, a
rmDesktop command holding the relevant desktop ID is fired to let the
server know that server-side objects used in the current page can be
discarded.

![](/zk_dev_ref/images/OnBeforeUnload1.png )

Usually, onBeforeUnload will be triggered by outgoing navigation or by
closing a browser tab. However, file download may also cause a browser’s
window to unload if they are performed in the page’s main context. In
this case, the initial page still exists after navigation as most
browsers will handle file download in a separate download manager
without closing the page.

For example, the following zul code will trigger a file download by
causing navigation to the targeted file. Since the href attribute is a
valid URL, most browsers will start a navigation workflow (which
includes triggering unload). Once the target replies with a non-document
content (ie a file to download), the browser will interrupt navigation
and handle the file while remaining on the previous page.

```xml
<zk>
    <a href="./myFile.zip">my file</a>
</zk>
```

At this point however, the client engine has already triggered rmDesktop
and the current desktop is no longer available.

![](/zk_dev_ref/images/OnBeforeUnload2.png )

To avoid this issue, download in ZK should receive a target.

## New tab

Using taget=”\_blank” will open a new blank browser tab and use it as
the target for the URL. This will prevent the ZK page from unloading
since no navigation is performed in its context. Since the result of
navigating to this url is not a document, the new blank tab will
automatically be closed as soon as the download starts.

```xml
<zk>
    <a href="./myFile.zip" target="_blank">my file</a>
</zk>
```

## Hidden iframe

To avoid the new tab flickering in the client browser, it is also
possible to target a different context in the same page. To do so, the
page should contain a hidden iframe, and perform the download through
it.

```xml
<zk>
    <a href="./myFile.zip" target="myHiddenIframe">my file</a>
    <iframe name="myHiddenIframe" visible="false"/>
</zk>
```

## Note on outgoing navigation

Outgoing navigation to a different document is usually not an issue
since the browser leaves the current page. If the user navigates back to
the ZK page, a new desktop will be instantiated and will perform using
the normal workflow.

This is only a problem when a navigation action doesn’t result in the
browser leaving the current ZK page, as the page is unloaded but still
exists in the client browser.

> ------------------------------------------------------------------------
>
> <references/>

[^1]: It actually sets [the refresh header](http://www.metatags.org/meta_http_equiv_refresh).

[^2]: In addition to forwarding, we could popup a window to ask them to
    login, i.e., without leaving the current desktop
