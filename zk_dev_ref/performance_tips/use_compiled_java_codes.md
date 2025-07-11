

# Not to Use zscript for Better Performance

It is convenient to use zscript in ZUML, but it comes with a price:
slower performance. The degradation varies from one application to
another. It is suggested to use zscript only for fast prototyping, POC,
or small projects. For large websites, it is suggested to use [ZK MVC]({{site.baseurl}}/zk_dev_ref/mvc/mvc)/[ZK MVVM](http://books.zkoss.org/zk-mvvm-book/8.0/index.html) instead. For
example, with ZK MVC

```xml
 <window apply="foo.MyComposer">
//omitted
```

You can handle all events and components in `foo.MyComposer`. By the use
of [ auto-wiring]({{site.baseurl}}/zk_dev_ref/event_handling/event_listening#Composer_and_Event_Listener_Autowiring),
it is straightforward to handle events and components.

## Event Handler Is zscript

In addition to the `zscript` element, [ the event handler declared in a ZUL page]({{site.baseurl}}/zk_dev_ref/event_handling/event_listening#Declare_an_Event_Handler_in_a_ZUL_page)
is also interpreted at the runtime. For example,

```xml
  <button label="OK" onClick="doSomething()"/>
```

where `doSomething()` is interpreted as `zscript`. Thus, for better
performance, they should be replaced too.

## Turn off the use of zscript

If you decide not to use zscript at all, you could turn on [the disable-script configuration]({{site.baseurl}}/zk_config_ref/the_disable_zscript_element)
as follows, such that an exception will be thrown if zscript is used.

```xml
<system-config>
    <disable-zscript>true</disable-zscript>
</system-config>
```

# Use the deferred Attribute

If you still need to write zscript codes, you can specify the `deferred`
attribute to defer the evaluation of zscript codes as follows.

```xml
<zscript deferred="true">
</zscript>
```

By specifying the `deferred` attribute, the zscript codes it contains
will not be evaluated when ZK renders a page. It means that the
interpreter won't be loaded when ZK renders a page. This saves memory
and speeds up page rendering.

In the following example, the interpreter is loaded only when the button
is clicked:

```xml
<window id="w">
    <zscript deferred="true">
     void addMore() {
         new Label("More").setParent(w);
     }
    </zscript>
    <button label="Add" onClick="addMore()"/>
</window>
```

## The deferred Attribute and the onCreate Event

It is worth to notice that, if the `onCreate` event listener is written
in zscript, the deferred option mentioned in the previous section
becomes *useless*. It is because the `onCreate` event is sent when the
page is loaded. In other words, all deferred zscript will be evaluated
when the page is loaded if the `onCreate` event listener is written in
zscript as shown below.

```xml
<window onCreate="init()">
```

Rather, it is better to rewrite it as

```xml
<window use="my.MyWindow">
```

Then, prepare `MyWindow.java` as shown below.

```java
 package my;
 public class MyWindow extends Window {
     public void onCreate() { //to process the onCreate event
 ...
```

If you prefer to do the initialization right after the component (and
all its children) is created, you can implement the
[org.zkoss.zk.ui.ext.AfterCompose](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/AfterCompose.html)
interface as shown below. Note: the `afterCompose` method of the
`AfterCompose` interface is evaluated at the Component Creation phase,
while the `onCreate` event is evaluated in the Event Processing Phase.

```java
 package my;
 public class MyWindow extends Window implements org.zkoss.zk.ui.ext.AfterCompose {
     public void afterCompose() { //to initialize the window
 ...
```

# Use the forward Attribute

To simplify the event flow, ZK components usually send the events to the
component itself, rather than the parent or other targets. For example,
when a user clicks a button, the `onClick` event is sent to the button.
However, developers may need to forward the event to the window
component by the use of the `onClick` event listener as follows.

```xml
<window id="w" onOK='alert("on OK")'>
    <button label="OK" onClick='Events.postEvent("onOK", w, null)'/>
</window>
```

As suggested in the previous sections, the performance can be improved
by *not* using zscript at all. Thus, you can rewrite the above code
snippet either with `EventListener` or by specifying the `forward`
attribute as follows.

```xml
<window apply="foo.MyComposer">
    <button label="OK" forward="onOK"/>
</window>
```
