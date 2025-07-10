In this section we introduce some of the most commonly used Java utility classes.

# Executions

[org.zkoss.zk.ui.Executions](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html)

### getCurrent

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getCurrent>()
Executions.getCurrent()\]

Retrieves the current execution (request/response).

### createComponents

[Executions.createComponents()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents-java.lang.String-org.zkoss.zk.ui.Component-java.util.Map)

Creates components defined in another zul file and attaches them to the
current page.

### sendRedirect

[Executions.sendRedirect()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#sendRedirect-java.lang.String)

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

The Clients class provides a comprehensive set of utility methods for client-side manipulation through AU (Asynchronous Update) responses. It enables server-side code to interact with the browser, including executing JavaScript, managing UI focus, handling scrolling, showing notifications, controlling busy states, and more. This class serves as the bridge between server-side Java code and client-side browser interactions in ZK applications.

## evalJavaScript

[Clients.evalJavaScript()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#evalJavaScript-java.lang.String)

This method sends an AU Response to execute the given JavaScript on
client side, which is the standard way of calling JavaScript from server
side in ZK. For example,

```java
Clients.evalJavaScript("zk.log('Hi.');");
```

{% include version-badge.html version=9.6.0 %}To handle javascript errors triggered
by evalJavascript,
[org.zkoss.zk.ui.ScriptErrorListener.class]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_ui_scripterrorlistener_class)
is provided.

## focus

{% include version-badge.html version=9.5.0 %}

[Clients.focus(Component component)](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#focus-org.zkoss.zk.ui.Component) for MVC

[Clients.focus(String selector)](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#focus-java.lang.String) for MVVM.

Focus the given component or the selector-matched component.

## Scroll Components Into View
[Clients.scrollIntoView(Component cmp)](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#scrollIntoView-org.zkoss.zk.ui.Component)

Scroll a component into viewport. It scrolls the parent component of the given component, so the given one becomes visible in the view.

This method is particularly useful to ensure a component is visible to the users, especially when it might initially be outside the current viewport. Common use cases include bringing form fields with validation errors into view, ensuring components are visible for user interaction like focusing, navigating to specific elements on long pages (similar to anchor links), highlighting search
 results within lists or tables, or bringing newly loaded items in dynamically loading content into view. It is often used in conjunction with `Clients.focus()` to improve reliability across different browsers and devices, including mobile, where automatic scrolling might not occur when focusing.

```java
Component myComponent;
Clients.scrollIntoView(myComponent);
```

{% include version-badge.html version=9.5.0 %}
[Clients.scrollIntoView(String selector)](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#scrollIntoView-java.lang.String)

Scrolls the parent of the selector matched component, so the given one
becomes visible in the view.

```java
Clients.scrollIntoView("#myWindow");
Clients.scrollIntoView(".myField");
```

## Show Busy Message / Block Users Interaction

[Clients.showBusy()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showBusy-java.lang.String)
[Clients.clearBusy()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#clearBusy)

Display/dismiss a busy message which can cover a component or the whole
page. So you can block all interaction to components and let users know
the operation is in progress or has finished. For example,

```java
Clients.showBusy(window, "Waiting for server...");
```

![](/zk_dev_ref/images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showBusy.png)

## showNotification

{% include version-badge.html version=6.0.1 %}
[Clients.showNotification()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showNotification-java.lang.String) {% include version-badge.html version=9.0.0 %} It is
advised to use [Notification class](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Notification.html) which was introduced in ZK 9 instead.

Shows a notification box, which is dismissed upon left click (like a
Popup). You can either display a global notification (bigger) or a
notification specific to another component (smaller with an arrow
pointing to the target component).

```java
Clients.showNotification(msg); // display a global notification box
Clients.showNotification(msg, component); // display a notification box pointing to a component
```

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification01.png)

You can also specify its position, style, and duration (for
auto-dismiss):

```java
Clients.showNotification(msg, type, component, position, duration);
```

Type determines the style of the notification box.

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification02.png)

Here are the available positions:

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification03.png)

### Closable

{% include version-badge.html version=6.5.0 %} Notification now supports closable to
let users close the notification box manually.

```java
// add close icon on the top right corner of notification box
Clients.showNotification(msg, closable); 
```

![](images/ZKDevRef_UIPattern_UsefulJavaUtil_Clients_showNotification04.png)

### Multiline

To show a multiline message, just append `<br/>` in the message string.

```java
Clients.showNotification("msg1 <br/> msg2 <br/>");
```

# Notification

{% include version-badge.html version=9.0.0 %}

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

```java
Notification.show(msg); // display a global notification box
Notification.show(msg, component); // display a notification box pointing to a component
```

# Toast

{% include edition-availability.html edition="ee" %} {% include version-badge.html version=9.0.0 %}

[org.zkoss.zkmax.ui.util.Toast](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/util/Toast.html)

This class offers a set of static methods showing a toast-style
notification, which is dismissed either automatically or upon user
interaction (e.g., left click).

Unlike Notification, Toast supports multiple concurrent messages and
will stack them on screen without replacing previously shown toasts.

![](/zk_dev_ref/images/ZKDevRef_UIPattern_UsefulJavaUtil_Toast01.png)

```java
Toast.show(msg); // display a toast notification
Toast.show(msg, "warning", "top_right"); // display a toast notification on top-right of the browser viewport
```

## Advanced Usage

You can customize the toast by specifying:

- Type (style): e.g., "info", "success", "warning", "error"
- Position: location within the browser viewport
- Duration: time in milliseconds before auto-dismissal
- Closable: whether the user can manually close it

```java
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
[org.zkoss.zkmax.ui.util.Toast.animationSpeed]({{site.baseurl}}/zk_config_ref/org_zkoss_zkmax_ui_util_toast_animationspeed)
is provided.

```xml
<library-property>
    <name>org.zkoss.zkmax.ui.util.Toast.animationSpeed</name>
    <value>500</value>
</library-property>
```

# Loadingbar

{% include edition-availability.html edition="ee" %} {% include version-badge.html version=9.0.0 %}

[org.zkoss.zkmax.ui.util.Loadingbar](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/util/Loadingbar.html)

A Loadingbar behaves like a Progressmeter that provides information on
the progress of a task.

You can control a loadingbar with the LoadingbarControl.

![]({{site.baseurl}}/zk_dev_ref/images/loadingbar.gif)

```java
// create a LoadingbarControl for control the loadingbar
LoadingbarControl loadingbarCtrl = Loadingbar.createLoadingbar("myId"); 
loadingbarCtrl.start();
loadingbarCtrl.update(20); // update the value to 20
loadingbarCtrl.finish();
```

You can also specify its value(0~100), position(top/bottom) and
indeterminate(true/false):

```java
loadingbarCtrl.start(20, "top", false);
```

You can turn on/off the indeterminate animation:

![]({{site.baseurl}}/zk_dev_ref/images/loadingbar2.gif)

```java
loadingbarCtrl.update(true); // set loadingbar indeterminate true
```

## Animation Speed

To specify the Loadingbar animation speed,
[org.zkoss.zkmax.ui.util.Loadingbar.animationSpeed]({{site.baseurl}}/zk_config_ref/org_zkoss_zkmax_ui_util_loadingbar_animationspeed)
is provided.

```xml
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
