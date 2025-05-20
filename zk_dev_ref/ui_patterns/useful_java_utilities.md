

In this section we introduce some of the most commonly used Java utility
classes.

# Executions

[org.zkoss.zk.ui.Executions](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html)

### getCurrent

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getCurrent>()
Executions.getCurrent()\]

Retrieves the current execution (request/response).

### createComponents

[Executions.createComponents()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents%28java.lang.String,%20org.zkoss.zk.ui.Component,%20java.util.Map%29)

Creates components defined in another zul file and attaches them to the
current page.

### sendRedirect

[Executions.sendRedirect()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect%28java.lang.String%29)

Redirects to another URL. If the parameter is left null, it will
redirect to the current page.

 

# Sessions

[org.zkoss.zk.ui.Sessions](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html)

### getCurrent

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html#getCurrent>()
Sessions.getCurrent()\]

Retrieves the current session.

 

# Clients

[org.zkoss.zk.ui.util.Clients](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html)

This class offers a collection of methods which manipulate client side
via AU Response.

## evalJavaScript

[Clients.evalJavaScript()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#evalJavaScript%28java.lang.String%29)

This method sends an AU Response to execute the given JavaScript on
client side, which is the standard way of calling JavaScript from server
side in ZK. For example,

``` java
Clients.evalJavaScript("zk.log('Hi.');");
```

{% include RemovedSince.html version=9.6.0 %}To handle javascript errors triggered
by evalJavascript,
[org.zkoss.zk.ui.ScriptErrorListener.class](https://www.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zk.ui.ScriptErrorListener.class)
is provided.

## focus

{% include RemovedSince.html version=9.5.0 %}

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#focus(org.zkoss.zk.ui.Component>)
Clients.focus(Component component)\] for MVC

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#focus(java.lang.String>)
Clients.focus(String selector)\] for MVVM.

Focus the given component or the selector-matched component.

## scrollIntoView

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#scrollIntoView(org.zkoss.zk.ui.Component>)
Clients.scrollIntoView(Component cmp)\]

Scrolls the parent of the given component, so the given one becomes
visible in the view.

{% include RemovedSince.html version=9.5.0 %}

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#scrollIntoView(java.lang.String>)
Clients.scrollIntoView(String selector)\]

Scrolls the parent of the selector matched component, so the given one
becomes visible in the view.

## Show Busy Message / Block Users Interaction

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showBusy(java.lang.String>)
Clients.showBusy()\] /
\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#clearBusy>()
Clients.clearBusy()\]

Display/dismiss a busy message which can cover a component or the whole
page. So you can block all interaction to components and let users know
the operation is in progress or has finished. For example,

``` java
Clients.showBusy(window, "Waiting for server...");
```

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showBusy.png)

## showNotification

{% include RemovedSince.html version=6.0.1 %}
\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showNotification(java.lang.String>)
Clients.showNotification()\] {% include RemovedSince.html version=9.0.0 %} It is
advised to use [Notification
class](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Notification.html)
which was introduced in ZK 9 instead.

Shows a notification box, which is dismissed upon left click (like a
Popup). You can either display a global notification (bigger) or a
notification specific to another component (smaller with an arrow
pointing to the target component).

``` java
Clients.showNotification(msg); // display a global notification box
Clients.showNotification(msg, component); // display a notification box pointing to a component
```

![](ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification01.png")

You can also specify its position, style, and duration (for
auto-dismiss):

``` java
Clients.showNotification(msg, type, component, position, duration);
```

Type determines the style of the notification box.

![](ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification02.png")

Here are the available positions:

![](ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification03.png")

### Closable

{% include RemovedSince.html version=6.5.0 %} Notification now supports closable to
let users close the notification box manually.

``` java
// add close icon on the top right corner of notification box
Clients.showNotification(msg, closable); 
```

![](ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification04.png")

### Multiline

To show a multiline message, just append `<br/>` in the message string.

``` java
Clients.showNotification("msg1 <br/> msg2 <br/>");
```

# Notification

{% include RemovedSince.html version=9.0.0 %}

[org.zkoss.zk.ui.util.Notification](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Notification.html)

The Notification class provides a set of static methods to display a
notification box, which are dismissed upon a left mouse click (similar
to a popup).

You can choose between:

- Global Notifications:

These are centered and styled prominently, suitable for broadcasting
general messages to the users.

- Component-Targeted Notifications:

These are smaller, contextual messages that appear near a specific UI
component, with an arrow pointing to the component.

Note: Only one component-targeted notification can be displayed at a
time. Showing a new one will automatically dismiss the previous
notification.

``` java
Notification.show(msg); // display a global notification box
Notification.show(msg, component); // display a notification box pointing to a component
```

# Toast

{% include edition-availability.html edition=ee %} {% include RemovedSince.html version=9.0.0 %}

[org.zkoss.zkmax.ui.util.Toast](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/util/Toast.html)

This class offers a set of static methods showing a toast-style
notification, which is dismissed either automatically or upon user
interaction (e.g., left click).

Unlike Notification, Toast supports multiple concurrent messages and
will stack them on screen without replacing previously shown toasts.

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Toast01.png)

``` java
Toast.show(msg); // display a toast notification
Toast.show(msg, "warning", "top_right"); // display a toast notification on top-right of the browser viewport
```

## Advanced Usage

You can customize the toast by specifying:

- Type (style): e.g., "info", "success", "warning", "error"
- Position: location within the browser viewport
- Duration: time in milliseconds before auto-dismissal
- Closable: whether the user can manually close it

``` java
Toast.show(msg, type, position, duration, closable);
```

Here are the available positions:

|               | left        | center        | right        |
|---------------|-------------|---------------|--------------|
| <b>top</b>    | top_left    | top_center    | top_right    |
| <b>middle</b> | middle_left | middle_center | middle_right |
| <b>bottom</b> | bottom_left | bottom_center | bottom_right |

## Animation Speed

To specify the duration of opening and closing animation,
[org.zkoss.zkmax.ui.util.Toast.animationSpeed](https://www.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zkmax.ui.util.Toast.animationSpeed)
is provided.

``` xml
<library-property>
    <name>org.zkoss.zkmax.ui.util.Toast.animationSpeed</name>
    <value>500</value>
</library-property>
```

# Loadingbar

{% include edition-availability.html edition=ee %} {% include RemovedSince.html version=9.0.0 %}

[org.zkoss.zkmax.ui.util.Loadingbar](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/util/Loadingbar.html)

A Loadingbar behaves like a Progressmeter that provides information on
the progress of a task.

You can control a loadingbar with the LoadingbarControl.

![]({{site.baseurl}}/zk_dev_ref/images/Loadingbar.gif)

``` java
// create a LoadingbarControl for control the loadingbar
LoadingbarControl loadingbarCtrl = Loadingbar.createLoadingbar("myId"); 
loadingbarCtrl.start();
loadingbarCtrl.update(20); // update the value to 20
loadingbarCtrl.finish();
```

You can also specify its value(0~100), position(top/bottom) and
indeterminate(true/false):

``` java
loadingbarCtrl.start(20, "top", false);
```

You can turn on/off the indeterminate animation:

![]({{site.baseurl}}/zk_dev_ref/images/Loadingbar2.gif)

``` java
loadingbarCtrl.update(true); // set loadingbar indeterminate true
```

## Animation Speed

To specify the Loadingbar animation speed,
[org.zkoss.zkmax.ui.util.Loadingbar.animationSpeed](https://www.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zkmax.ui.util.Loadingbar.animationSpeed)
is provided.

``` xml
<library-property>
    <name>org.zkoss.zkmax.ui.util.Loadingbar.animationSpeed</name>
    <value>500</value>
</library-property>
```

# Version History

| Version | Date       | Content                                                                                                                   |
|---------|------------|---------------------------------------------------------------------------------------------------------------------------|
| 6.0.1   | March 2012 | Add Clients.showNotification()                                                                                            |
| 6.5.0   | July 2012  | [ZK-1145](http://tracker.zkoss.org/browse/ZK-1145): Notification supports closable                                        |
| 9.0.0   | Sep 2019   | [ZK-4371](http://tracker.zkoss.org/browse/ZK-4371): Provide a Toast utility                                               |
| 9.0.0   | Sep 2019   | [ZK-4372](http://tracker.zkoss.org/browse/ZK-4372): Extract Notification functionalities from Clients                     |
| 9.0.0   | Nov 2019   | [ZK-4379](http://tracker.zkoss.org/browse/ZK-4379): Provide a Loadingbar utility                                          |
| 9.5.0   | Sep 2020   | [ZK-4624](http://tracker.zkoss.org/browse/ZK-4624): Clients API support scrollIntoView and focus by using selector string |
