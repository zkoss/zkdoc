

To retrieve the information about the client, you can register an event
listener for the `onClientInfo` event to a root component. To control
the behavior of the client, you can use the utilities in the
[org.zkoss.zk.ui.util.Clients](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html) class.

# Browser Information

Sometimes an application needs to know the client's information, such as
time zone. Then, you can add an event listener for the `onClientInfo`
event. Once the event is added, the client will send back an instance of
the [org.zkoss.zk.ui.event.ClientInfoEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ClientInfoEvent.html) class, from
which you can retrieve the information of the client.

For example,

```xml
<grid onClientInfo="onClientInfo(event)">
    <rows>
        <row>Time Zone <label id="tm"/></row>
        <row>Screen <label id="scrn"/></row>
    </rows>

    <zscript>
     void onClientInfo(ClientInfoEvent evt) {
         tm.setValue(evt.getTimeZone().toString());
         scrn.setValue(
             evt.getScreenWidth()+"x"+evt.getScreenHeight()+"x"+evt.getColorDepth());
     }
    </zscript>
</grid>
```

Notice that the `onClientInfo` event is meaningful only to the root
component (aka., a component without any parent).

The client information is not stored by ZK, so you have to store it
manually if necessary. Since a session is associated with the same
client, you can store the client info in the session's attribute.

For example, we could use it to control the default time zone (For more
information about time zone, please refer to the [Time Zone]({{site.baseurl}}/zk_dev_ref/internationalization/time_zone)
section).

```java
session.setAttribute("org.zkoss.web.preferred.timeZone", event.getTimeZone());
```

Notice that the `onClientInfo` event is sent from the client after the
UI is rendered at the client. Thus, if some of your component's data
depends on the client's info, say, screen resolution, it is better to
handle it (say, adjust UI's size) when the `onClientInfo` event is
received.

If it is, though rarely, too late (i.e., it has to be done at the
beginning), you could ask the client to re-send the request again with
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>.
For example,

```java
 import org.zkoss.util.TimeZones;
 ...
  if (!TimeZones.getCurrent().equals(event.getTimeZone()) {
     session.setAttribute("org.zkoss.web.preferred.timeZone", event.getTimeZone()); //update to the session
     Executions.sendRedirect(null); //ask to re-send (i.e., redo)
  }
```

# Browser Control

[org.zkoss.ui.util.Clients](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/ui/util/Clients.html) has utilities to control
the client's visual presentation (more precisely, the browser window),
such as printing, submitting, resizing and so on. For example, you can
scroll the browser window (aka., the desktop) as follows.

```java
 Clients.scrollBy(100, 0);
```

Here we describe some special controls that are worth noticing. For
complete functionality, please refer to
[org.zkoss.ui.util.Clients](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/ui/util/Clients.html).

## Warn Users When Leaving a Page

If you want to confirm a user when they try to reload, close, or leave
the current page to another URL, you can call
<javadoc method="confirmClose(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>.

For example, when a user is composing a mail that is not sent or saved
yet.

```java
 if (mail.isDirty()) {
     Clients.confirmClose("any string");
 } else {
     Clients.confirmClose(null); //reset. no more confirmation.
 }
```

- Line 2: [All modern browsers now don't support showing a custom message](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#compatibility_notes).
  So just pass a non-null string as a parameter to activate the
  confirmation dialog.

After activating, when the user tries to leave a page, a browser will
show a confirmation dialog (each browser has its own default dialog with
a default message):

![]({{site.baseurl}}/zk_dev_ref/images/confirmclose.png)

To disable the confirmation dialog, just invoke
<javadoc method="confirmClose(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>
with null.

ZK cannot determine what's unsaved or dirty, you have to implement it by
yourselves. Then call this API in a proper timing.

## Notify User Component under Processing

Sometimes a request may take a long time to process, and it is better to
notify the user that it is under processing. It can be done by the use
of
<javadoc method="showBusy(org.zkoss.zk.ui.Component, java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>
if only a component is not accessible, or
<javadoc method="showBusy(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>
if the whole browser is not accessible. For example,

```java
showBusy(grid, "Loading data...");
```

After the loading is completed, you could invoke
<javadoc method="clearBusy(org.zkoss.zk.ui.Component)">org.zkoss.zk.ui.util.Clients</javadoc>
(or
<javadoc method="clearBusy()">org.zkoss.zk.ui.util.Clients</javadoc>)to
clean it up. For more information, please refer to the [Use Echo Events]({{site.baseurl}}/zk_dev_ref/ui_patterns/long_operations/use_echo_events)
section.

## Log the Message to Browser

In addition to logging messages to the console, you could log the
messages to the browser for debugging by the use of
<javadoc method="log(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>.
For example,

```java
//in Java
void doSomething() {
   Clients.log("doSomething called");
}
```

## Control in JavaScript

If you are familiar with JavaScript, you could have more control by
sending any JavaScript code to the client for evaluation. It can be done
by preparing the JavaScript code in
[org.zkoss.zk.au.out.AuInvoke](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/out/AuInvoke.html) or
[org.zkoss.zk.au.out.AuScript](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/out/AuScript.html), and then send back to
the client by calling
<javadoc method="response(org.zkoss.zk.au.AuResponse)">org.zkoss.zk.ui.util.Clients</javadoc>.

For example, we could use
[org.zkoss.zk.au.out.AuScript](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/out/AuScript.html) to inject any code,
while [org.zkoss.zk.au.out.AuInvoke](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/out/AuInvoke.html) is better if you
want to invoke a function of a client-side widget.

```java
Clients.response(new AuScript(null, "alert('Hello, Client')"));
```

For client-side API, please refer to [JavaScript API](http://www.zkoss.org/javadoc/latest/jsdoc/).

# Browser Page Visibility State

In order to develop power and CPU efficient web applications, W3C
publishes a specification named [Page Visibility](http://www.w3.org/TR/page-visibility/) in HTML 5 which
defines a means for site developers to programmatically determine the
current visibility state of the page. In this specification, there are
two attributes defined: *hidden* and *visibilityState*, where *hidden*
is a boolean value representing whether the current page is visible or
not and *visibilityState* represents that the current page has four
states: hidden, visible, prerender, and unloaded.

To get the two attributes, you can add an event listener for the
`onVisibilityChange` event. Once the event is added, the client will
send back an instance of the
[org.zkoss.zk.ui.event.VisibilityChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/VisibilityChangeEvent.html) class,
from which you can retrieve the page visibility state of the current
page.

```xml
<zk>
    <label>
    Open/Change to another tab in the browser and go back this tab
    </label>
    <window title="window" border="normal" onVisibilityChange="onVisibleChange(event)">
        <label id="lbl" />
        <zscript><![CDATA[
            import org.zkoss.zk.ui.event.VisibilityChangeEvent;
            void onVisibleChange(VisibilityChangeEvent event) {
                if ("visible".equals(event.getVisibilityState()) || !event.isHidden()) {
                    lbl.setValue("Welcome back");
                }
            }
        ]]></zscript>
    </window>
</zk>
```

Notice that the `onVisibilityChange` event is meaningful only to the
root component (aka., a component without any parent) and the browsers
that support this HTML 5 API.

# Version History

| Version | Date           | Content                                                                                        |
|---------|----------------|------------------------------------------------------------------------------------------------|
| 5.0.8   | June, 2010     | <javadoc method="log(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc> was introduced. |
| 6.5.1   | November, 2012 | [org.zkoss.zk.ui.util.VisibilityChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/VisibilityChangeEvent.html) was introduced.                  |
