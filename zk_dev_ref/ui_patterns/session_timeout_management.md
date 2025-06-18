After a session times out, all desktops and UI objects it belongs are
removed. If a user keeps accessing the desktop that no longer exists, ZK
will prompt the user for the session-timeout situation. ZK supports
several ways to prompt the user for session timeout:

- Show a message
- Redirect to another page
- Totally control by running JavaScript code

You could pick one depending on your application requirement. In
addition, you could configure your application to enforce the user
prompting to take place, without waiting for the user's activity. It is
called automatic timeout.

# Show a Message

By default, a message is shown to prompt the user and prevent from
further accessing as depicted below.

![]({{site.baseurl}}/zk_dev_ref/images/drsesstimeout.png)

## Custom Message

You could show a custom message by specifying
[`timeout-message`]({{site.baseurl}}/zk_config_ref/the_session-config_element#The_timeout-message_Element)
in `WEB-INF/zk.xml`. For example,

```xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-message>Session timeout. Please reload.</timeout-message>
</session-config>
```

### Internationalization

If you want to specify a Locale-dependent message, you could specify the
key and prefix it with `label:` as follows.

```xml
<session-config>
    <device-type>ajax</device-type>
    <timeout-message>label:timeout</timeout-message>
</session-config>
```

Then, you have to prepare the zk-label properties files as described in
the
[Labels]({{site.baseurl}}/zk_dev_ref/internationalization/labels)
section.

```text
#zk-label.properties
timeout={
Session timeout.
(multi-line is allowed)
}
```

# Redirect to Another Page

Sometimes it is better to redirect to another page that gives users a
more complete description and guides them to the other resources, or
asks them to login again. You can specify the target URI, that you want
to redirect users to when timeout, with [the timeout-uri element]({{site.baseurl}}/zk_config_ref/the_session-config_element#The_timeout-uri_Element)
in `WEB-INF/zk.xml`. For example, the target URI is /timeout.zul and
then you can add the following lines to zk.xml.

```xml
<session-config>
    <device-type>ajax</device-type>    
    <timeout-uri>/timeout.zul</timeout-uri>    
</session-config>
```

In addition to `WEB-INF/zk.xml`, you could change the redirected URI
manually as follows.

```java
Devices.setTimeoutURI("ajax", "/timeout.zul");
```

> ------------------------------------------------------------------------
>
> About Device: A device represents the client device, such as Ajax
> browsers and Android devices. Each desktop is associated with one
> device, and vice versa.

If you prefer to reload the page instead of redirecting to other URI,
you can specify an empty URI as follows.

```xml
<session-config>
    <device-type>ajax</device-type>    
    <timeout-uri></timeout-uri>    
</session-config>
```

# Total Control in JavaScript

If you want more amazing effect, you could provide some JavaScript code
and configure ZK to run it if timeout. For example, [our demo](http://www.zkoss.org/zkdemo) shows up a message on the top of
window with some animation, and then automatically reloads if it detects
any mouse move (it means the user is back).

For example, if you have a function called `foo.timeout` to handle the
timeout effect, then you could configure `WEB-INF/zk.xml` as follows.

```xml
<session-config>
    <device-type>ajax</device-type>
    <automatic-timeout>true</automatic-timeout>
    <timeout-message>script:<![CDATA[foo.timeout('Session Timeout');]]></timeout-message>
</session-config>
```

The code depends on the client. For Ajax devices, it has to be
JavaScript.

# Automatic Timeout

By default, the session-timeout mechanism is triggered only if the
client sends back a request (such as clicking on a button). If you
prefer to prompt the user even if it doesn't do anything, you could
specify the [automatic-timeout element]({{site.baseurl}}/zk_config_ref/the_session-config_element#The_automatic-timeout_Element)
in `WEB-INF/zk.xml` as follows.

```xml
<session-config>
    <device-type>ajax</device-type>
    <automatic-timeout/>
</session-config>
```

Then, ZK Client will trigger the session-time mechanism (showing a
message, redirecting to another page, or running some JavaScript code).

## Page-level Automatic Timeout

If you want to specify whether to automatically timeout for particular
pages, you can use [ the page directive](ZUML_Reference/ZUML/Processing_Instructions/page#automaticTimeout).

Moreover, it is better to turn off the automatic timeout for the timeout
page you want to redirect to (if the page is a ZUML page). For example,

```xml
<!-- my timeout page -->
<?page automaticTimeout="false"?>
...
```

# Never Timeout

Though not recommended, you could prevent the session from timeout by
making a "keep-alive" timer, such that the desktop keeps alive until the
user surfs away.

To do that, you first configure WEB/zk.xml as follows.

```xml
<session-config>
  <timer-keep-alive>true</timer-keep-alive>
</session-config>
```

and create a timer in your ZUL page:

```xml
<timer id="timerKeepAliveSession" repeats="true" delay="600000" onTimer=""/>
```

This will prevent the session to time out when the ZUL page is opened in
the browser. The session still timeouts when the user has navigated the
browser away. The delay (600000 is 10 minutes) shall be as long as
possible but smaller than your session timeout.

The
[timer-keep-alive]({{site.baseurl}}/zk_config_ref/the_session-config_element#The_timer-keep-alive_Element)
element is used to specify whether the session shall consider timer as a
normal request. If it is considered as a normal request, the session
timeout mechanism will be restarted when it is received. Otherwise, the
timer, by default, won't restart the timeout mechanism.

# Version History

| Version | Date         | Content                                                      |
|---------|--------------|--------------------------------------------------------------|
| 5.0.5   | October 2010 | The support of Custom Message and JavaScript was introduced. |
