Here we describe how to handle errors. An error is caused by an
exception that is not caught by the application. An exception might be
thrown in two situations:

1.  when loading a ZUML document
2.  when serving an AU request (aka, an Ajax request).

To handle them both, you need to configure them in different places.

# Error Handling When Loading ZUML Documents

If an uncaught exception is thrown when loading a ZUML document, it is
handled directly by the Web server. In other words, the handling is no
different from other servlets.

By default, the Web server displays an error page showing the error
message and stack trace. For example,

![](Exception.png)

You can customize the error handling by specifying the error page in
`WEB-INF/web.xml` as follows[^1].

**Note:** When exceptions are thrown during the ZK UI Lifecycle they are
wrapped into a
<javadoc  type="class">org.zkoss.zk.ui.UiException</javadoc>. If you
want to handle your own exceptions you can implement the
<javadoc type="interface">org.zkoss.lang.Expectable</javadoc> on your
exception type. Exceptions implementing this interface will not be
wrapped and can be handled using the <exception-type> element directly.

**Note:** If the exception you want to handle is a checked exception, it
must extend `ServletException` or `IOException`. So the Web container
can handle them directly in `doGet` or `doPost` method.

```xml
<!-- WEB-INF/web.xml -->
<error-page>
    <exception-type>java.lang.Throwable</exception-type>    
    <location>/WEB-INF/sys/error.zul</location>    
</error-page>
```

Then, when an error occurs on loading a page, the Web server forwards
the error page you specified, /error/error.zul. Upon forwarding, the Web
server passes a set of request attributes to the error page to describe
what happens. These attributes are as follows.

| Request Attribute                                                      | Type                                  |
|------------------------------------------------------------------------|---------------------------------------|
| javax.servlet.error.status_code                                        | java.lang.Integer                     |
| javax.servlet.error.exception_type                                     | java.lang.Class                       |
| javax.servlet.error.message                                            | java.lang.String                      |
| javax.servlet.error.exception                                          | java.lang.Throwable                   |
| javax.servlet.error.request_uri                                        | java.lang.String                      |
| javax.servlet.error.servlet_name                                       | java.lang.String                      |
| {% include version-badge.html version=10.2.0 %} javax.servlet.error.exception_list | java.util.List\<java.lang.Throwable\> |

- If you run with Jakarta EE, need to replace **javax** with **jakarta**
  in those attribute names e.g. `jakarta.servlet.error.status_code`

Then, on the error page, you can display your custom information using
these attributes. For example:

```xml
<window title="Error ${requestScope['javax.servlet.error.status_code']}">
    Cause: ${requestScope['javax.servlet.error.message']}    
</window>
```

**Tips:**

- The error page can be any kind of servlets. In addition to ZUML, you
  can use JSP or whatever servlet you prefer.
- From java code the request attributes are accessible via
  <javadoc class="true"  method="getAttribute(java.lang.String)">org.zkoss.zk.ui.Execution</javadoc>
  or from the [requestScope (implicit object)](https://www.zkoss.org/wiki/ZUML_Reference/EL_Expressions/Implicit_Objects_(Predefined_Variables)/requestScope).

```java

public class ErrorHandlingComposer extends SelectorComposer<Component> {

    @WireVariable
    private Map<String, Object> requestScope;

    @Override
    public void doAfterCompose(Component comp) throws Exception {

        //via execution.getAttribute()
        Execution execution = Executions.getCurrent();
        Exception ex1 = (Exception) execution.getAttribute("javax.servlet.error.exception");

        //via requestScope map
        Exception ex2 = (Exception) requestScope.get("javax.servlet.error.exception");
    }
}
```

> ------------------------------------------------------------------------
>
> <references/>

## Error Handling when the Client Engine crashes

<figure>
<img src="error_handling_crash_screen.png"
title="error_handling_crash_screen.png" />
<figcaption>error_handling_crash_screen.png</figcaption>
</figure>

In rare cases, the client engine stops working before even the error
handling is initialized (e.g. when ZK's core scripts, e.g. zk.wpd, fail
to download). In those cases, the configured error handler can't be
called, and ZK falls back to a very basic error handling.

If the client engine didn't initialize within a configurable timeout, it
will display a generic error message like the screenshot to the right.
When this occurs, the connection to ZK is usually broken. So you can't
report errors to the server via ZK's Ajax engine. As the error details
are usually visible in the browser's console, it's useful to instruct
users to report the errors manually or automatically extract and send
them to an error handling service that is accessible at that time (not
part of ZK).

Please check [the list of error codes]({{site.baseurl}}/zk_config_ref/the_client-config_element/the_init-crash-script_element).
You can configure both the timeout and the error message presented to
users with the elements below:

- [<init-crash-script>]({{site.baseurl}}/zk_config_ref/the_client-config_element/the_init-crash-script_element)
- [<init-crash-timeout>]({{site.baseurl}}/zk_config_ref/the_client-config_element/the_init-crash-timeout_element)

# Handling Errors Thrown in Event Listeners

If an uncaught exception is thrown by an event listener or a command
method in a ViewModel (aka. when serving an AU request ), it is handled
by the ZK Update Engine. By default, it simply shows an error message to
indicate the error.

For example, suppose we have the following code:

```xml
<button label="Cause Error" onClick='throw new NullPointerException("Unknown Value")'/>
```

Then, if you click the button, the following error message will be
shown.

![](Exception-au.png)

## Configure Error Handling Page

You can customize the error handling by specifying the error page in
`WEB-INF/zk.xml` as described in [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_error-page_element).
For example,

```xml
<!-- zk.xml -->
<error-page>
    <exception-type>java.lang.Throwable</exception-type>    
    <location>/WEB-INF/sys/error.zul</location>    
</error-page>
```

Then, when an error occurs in an event listener, the ZK Update Engine
will show the page you specified.

Like error handling in loading a ZUML page, you can specify multiple
<error-page>. Each of them is associated with a different exception
type, specified in <exception-type>. When an error occurs, ZK will
search the error pages one-by-one until the exception type matches.

### Order Matters

The order to handle a thrown exception according to its type is based on
the <error-page>'s declaration sequence in zk.xml.

## Get Error Information

In addition, ZK passes a set of request(Execution) attributes to the
error page to describe what happens. These attributes are as follows:

| Request Attribute Name                                                 | Type                                  | Content                                                          |
|------------------------------------------------------------------------|---------------------------------------|------------------------------------------------------------------|
| javax.servlet.error.exception_type                                     | java.lang.Class                       | the thrown error object's class i.e. return `Throwable.getClass` |
| javax.servlet.error.message                                            | java.lang.String                      | the all thrown error messages combined                           |
| javax.servlet.error.exception                                          | java.lang.Throwable                   | the thrown error object                                          |
| javax.servlet.error.status_code                                        | java.lang.Integer                     | 500                                                              |
| javax.servlet.error.error_page                                         | java.lang.String                      | the error handling page URL configured in zk.xml                 |
| {% include version-badge.html version=10.2.0 %} javax.servlet.error.exception_list | java.util.List\<java.lang.Throwable\> | a list containing all thrown error objects                       |

- If you run with Jakarta EE, need to replace **javax** with **jakarta**
  in those attribute names e.g. `jakarta.servlet.error.status_code`

Besides, the error page is created on the same desktop that causes the
error, so you can retrieve the relevant information from the desktop
e.g. the page URL, `getPage().getRequestPath()`.

For example, you can specify the following content as the error page.

```xml
<window title="Error ${requestScope['javax.servlet.error.status_code']}"
width="50%" border="normal" mode="modal" closable="true">
    <vlayout>
KillerApp encounters an error: ${requestScope['javax.servlet.error.message']}
        <hlayout style="margin-left:auto; margin-right:auto">
            <button label="Continue" onClick="spaceOwner.detach()"/>
            <button label="Reload" onClick="Executions.sendRedirect(null)"/>
        </hlayout>
    </vlayout>

    <!-- optional: record the error for improving the app -->
    <zscript>
    org.zkoss.util.logging.Log.lookup("Fatal").error(
        requestScope.get("javax.servlet.error.exception"));
    </zscript>
</window>
```

Then, when the button is clicked, the following will be shown.

![](Exception-au2.png)

# Handling a Custom Exception

By default, ZK will wrap your custom exception with `UiException` or
`OperationException`. If you want to handle your custom exception,
`YourException`, specifically on a specific error page upon its type.
Your custom exception class needs to extend specific classes to avoid
being wrapped:

## For unchecked:

```java
public class YourException extends java.lang.RuntimeException{...}
```

Ref: <http://tracker.zkoss.org/browse/ZK-2638>

## For checked:

```java
public class YourException extends javax.servlet.ServletException{...}
```

or

```java
public class YourException extends java.io.IOException{...}
```

Ref: <http://tracker.zkoss.org/browse/ZK-3679>

Because `HttpServlet` only [throws these 2 checked exceptions (ServletException, IOException) above](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServlet.html#doGet-javax.servlet.http.HttpServletRequest-javax.servlet.http.HttpServletResponse-).

[^1]: Please refer to Chapter 10.9 of [Java Servlet Specification](http://download.oracle.com/otn-pub/jcp/servlet-3.0-fr-eval-oth-JSpec/servlet-3_0-final-spec.pdf)
    for more details.
