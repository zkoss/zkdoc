This section explains those common error messages you might encounter
while developing with ZK, so you can figure out what's going wrong and
eliminate them.

# Your ZK binary is being altered and may not work as expected

It is caused by mixing unexpected jars in your classpath including :

- Mixing different versions of ZK jar (e.g. 8.6.0.1 with 9.6.0.1)
- Mixing enterprise evaluation jar with the official jar (e.g.
  9.6.3-Eval with 9.6.3)
- Mixing CE jar with the enterprise evaluation jar

## Suggestions

Make sure you use the correct, single source of ZK jar.

- download jar from ZK Maven premium repository
- If you use ZK by copying jar manually, remove all the existing zk jar
  and copy from a single source again.

If you use Maven, list the final resolved dependencies:

`mvn dependency:list`

Then check if there is any mixed-version jar.

# The resource you request is no longer available

![](/zk_dev_ref/images/no-longer-available.png)
`The resource you request is no longer available: /ui/handling.zul (z_na20). This is normally caused by timeout, or opening too many Web pages. You have to reload the page and try again.`

## Suggestion

It could be caused by

- the corresponding Desktop at the sever is destroyed
- a session is time out
- your server or application is down

Please check them.

# Javascript Error in a Browser

`Severe: [Desktop z_wew:/mypage.zul] client error: Failed to mount: Cannot read property 'colSpan' of undefined`

## Suggestion

Usually, a failed to mount error is caused by a bug in the specific
widget code, invalid custom JavaScript, missing JavaScript packages or
files, or other causes affecting the client.

When encountering a failed to mount error box, we suggest you to check:

- **Javascript console on a browser**

Open a browser developer tools \> console tab. You should find one or
more JavaScript errors in the console. Please expand the error stack
trace and provide these full error stacks in the support ticket. This
can help us pinpoint the exact cause of the issue.

To make the stack trace readable, you have to enable JavaScript debug
mode in zk.xml

```xml
<client-config>
<debug-js>true</debug-js>
</client-config>
```

Restart your zk application.

- **Send to Your Server**

{% include version-badge.html version=10.0.0 %}

You can enable [the send-client-errors element]({{site.baseurl}}/zk_config_ref/the_client-config_element/the_send-client-errors_element)
in zk.xml to send client errors to the server for logging the page url
where the error occurred and its stack trace.

This feature is particularly useful in production environments where
system administrators or developers are not always available when an
end-user encounters a JavaScript error. End-users often struggle to
reproduce the issue, making it difficult to diagnose and resolve
problems. By logging these errors on the server, developers gain access
to crucial debugging information that helps investigate and address
issues effectively.

```xml
<client-config>
<send-client-errors>true</send-client-errors>
</client-config>
```

- **Network tab on a browser developer tool**

Open a browser developer tools \> network tab. ZK does not load every JS
package at page initialization. Instead, packages are loaded on demand.
For example, the `zul.inp.wpd` (input package) will be loaded if you add
an input component to your page. If a browser could not locate or load
the relevant package for a newly added widget class, you should see a
failed request for this package. This request should also display a
return code. Anything other than "200 - success" should be documented
and added to the support ticket.

# java.lang.IllegalStateException: Access denied: component, <Listcell z_27_b53>, belongs to another desktop: \[Desktop g272\]

The error message resembles the one mentioned above but with different
component names and desktop IDs. This error message is typically caused
by an incorrect usage scenario where a setter method of one component is
invoked within the event listener of a different desktop (or browser
tab).

You can think of one desktop as corresponding to a browser tab, so each
component actually belongs to a specific desktop (tab). When you call a
setter method like your case is `Window.setTitle()`, it will generate
responses to its desktop, but if you call it in another desktop's
listener zk will throw this exception.

Please review your code for the following potential issues:

- A variable that references a component in a composer is declared as
  static
- A component is passed by a session-scope (or application-scope) event
  queue to another desktop to access
- Retrieving a component from a session (or application) attribute and
  calling its setter

## Suggestions

- You should not declare any variable that references a component as
  static.

<!-- -->

- The purpose of storing (or passing) a component is to communicate with
  another component.

### Pass data, not the component

The principle is: **pass data, not the component**

For example, if you want to get user input from a textbox, don't pass
the textbox, pass `textbox.getValue()` instead.

### Use Desktop Scope

If you still need to pass a component for later use:

- set an attribute in a Desktop
- [ pass a component via a Desktop scope event queue]({{site.baseurl}}/zk_dev_ref/ui_patterns/communication/inter-desktop_communication)

# Server is temporarily out of service - Error 467

If you see this error message after making a large update, such as
editing a large amount of text in a ZKCkeditor text editor, you may have
reached your webserver's maximum post size.

Some web servers, specifically tomcat, have a maxPostSize of 2Mb by
default. Tomcat doesn't reject requests which reach this limit. Instead,
tomcat will truncate the request and allow it through. This may cause
the 467 error, which indicates that ZK failed to locate the desktop
associated with the page in the request data.

You can verify this by opening the client-side developer tools, and
checking the request headers field, which contains the request size.

## Suggestions

If you want to allow users to send larger requests, you will need to
apply the relevant settings on your webserver. On tomcat, the relevant
setting is maxPostSize


# Server is Temporarily Out of Service / Service Unavailable

Users may encounter error messages:

`The server is temporarily out of service. Would you like to try again?`

This error indicates that the server is currently unable to process requests. This can be due to a variety of reasons, including:

- Temporary server overload or high traffic
- Backend service downtime or maintenance
- Network connectivity issues between client and server
- Exceeding server resource limits (e.g., maxPostSize on Tomcat)
- Unexpected backend crashes or restarts

## What to Do

1. **Retry the Operation**
   - Wait a few moments and try again. Many outages are brief.

2. **Check System Status**
   - If available, consult your system status page or dashboard for maintenance notifications or known outages.

3. **Network Troubleshooting**
   - Ensure your internet connection is stable.
   - Try accessing the service from a different network or device.

4. **Check for Large Requests**
- If the error occurs after submitting a large form or file, you may have exceeded server limits (see Error 467 above).

5. **Ask Colleagues**
- Confirm with others if the issue is widespread or isolated to your environment.

6. **Escalate if Persistent**
If the problem persists, contact support. Please provide:
- The exact error message
- Timestamp of the error
- Steps to reproduce
- Any relevant screenshots or logs

