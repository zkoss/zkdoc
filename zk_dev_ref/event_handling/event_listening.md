# Listen by Use of an Event Listener

## Event Listener

An event listener is a class implementing
<javadoc type="interface">org.zkoss.zk.ui.event.EventListener</javadoc>.
For example,

```java
public class MyListener implements EventListener {
    public void onEvent(Event event) {
        Messagebox.show("Hello");
    }
}
```

Then, you can register an event listener to the component that might
receive the event by the use of
<javadoc method="addEventListener(java.lang.String, org.zkoss.zk.ui.event.EventListener)">org.zkoss.zk.ui.Component</javadoc>.
For example,

```java
button.addEventListener("onClick", new MyListener());
```

This is a typical approach to handle events. However, it is a bit
tedious to register event listeners one-by-one if there are a lot of
listeners. Rather, it is suggested to use a composer as described in the
following section.

## Composer and Event Listener Autowiring

With [ZK Developer's Reference/MVC]({{site.baseurl}}/zk_dev_ref/mvc), you generally
do not need to register event listeners manually. Rather, they can be
registered automatically by the use of the
[auto-wiring]({{site.baseurl}}/zk_dev_ref/mvc/controller/wire_event_listeners)
feature of [a composer]({{site.baseurl}}/zk_dev_ref/mvc/controller). For
example,

```java
public class MyComposer extends SelectorComposer {
    @Listen("onClick = button#hi")
    public void showHi() {
        Messsagebox.show("Hello");
    }
    @Listen("onClick = button#bye")
    public void showBye() {
        Messsagebox.show("Bye");
    }
    @Listen("onOK = window#mywin")
    public void onOK() {
        Messsagebox.show("OK pressed");
    }
}
```

As shown above, the method to listen is annotated with the
[org.zkoss.zk.ui.select.annotation.Listen](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/Listen.html) annotation
using the event name followed by a selector string identifying the
component(s) (for more selector syntax examples see
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html)). The
composer will register each annotated method as an event listener to the
selected component automatically **in the same [ ID space](ZK_Developer's_Reference/ui_composing/ID_Space)**.
Then, in the ZUL page, you can specify the `apply` attribute to
associate the composer with a component.

```xml
<window id="mywin" apply="MyComposer">
    <textbox/>
    <button id="hi"/>
    <button id="bye"/>
</window>
```

If the listener needs to access the event, just declare it as the
argument:

```java
    @Listen("onClick = button#hi")
    public void showHi(MouseEvent event) {
      Messsagebox.show("Hello, " + event.getName());
    }
```

Though not limited, a composer is usually associated with an ID space
(such as [org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html)) to handle events and
components within the given ID space. You could associate any component
that properly represents a scope of your application to manage.

For more information please refer to the [Wire Event Listeners]({{site.baseurl}}/zk_dev_ref/mvc/controller/wire_event_listeners)
section.

## Deferrable Event Listeners

By default, events are sent to the server when it is fired at the
client. However, many event listeners are just used to maintain the
status on the server, rather than providing visual responses to the
user. In other words, there is no need to send the events for these
listeners immediately. Rather, they shall be sent at once to minimize
the traffic between the client and the server so as to improve the
server's performance. For the sake of convenience, we call them the
deferrable event listeners.

To make an event listener deferrable, you have to implement
<javadoc type="interface">org.zkoss.zk.ui.event.Deferrable</javadoc>
(with `EventListener`) and return true for the `isDeferrable` method as
follows.

```java
 public class DeferrableListener implements EventListener, Deferrable {
     private boolean _modified;
     public void onEvent(Event event) {
         _modified = true;
     }
     public boolean isDeferrable() {
         return true;
     }
 }
```

When an event is fired at the client (e.g., the user selects a list
item), ZK won't send the event if no event listener is registered for it
or only deferrable listeners are registered. Instead, the event is
queued at the client.

On the other hand, if at least one non-deferrable listener is
registered, the event will be sent immediately with all queued events to
the server at once. No event is lost and the arriving order is
preserved.

> ------------------------------------------------------------------------
>
> **Tip**: Use the deferrable listeners for maintaining the server
> status, while the non-deferrable listeners for providing the visual
> responses for the user.

## Page-level Event Listener

Developers could add event listeners to a page
(<javadoc type="interface">org.zkoss.zk.ui.Page</javadoc>) dynamically
by
<javadoc type="interface" method="addEventListener(java.lang.String, org.zkoss.zk.ui.event.EventListener)">org.zkoss.zk.ui.Page</javadoc>.
Once added, all events of the specified name sent to any components of
the specified page will be sent to the listener.

All event listeners added to a page (so-called page-level event
listeners) are assumed to be deferrable, no matter if
<javadoc type="interface">org.zkoss.zk.ui.event.Deferrable</javadoc> is
implemented or not.

A typical example is to use a page-level event listener to maintain the
modification flag as follows (pseudo code).

```java
page.addEventListener("onChange", new EventListener() {
    public void onEvent(Event event) {
        modified = true;
    }
});
```

# Listen by the use of an Event Handler

An event handler is a method specified as an event attribute of a ZK
page or as a member of a component class.

## Declare an Event Handler in ZUML

An event handler can be declared in a ZUL page by specifying an event
attribute[^1]. For example,

```xml
<button label="hi" onClick='alert("Hello")'/>
```

where the content of the event handler is the code snippet in Java. The
event handler will be interpreted at run time (by use of BeanShell). If
you prefer to use another language, you could specify the language name
in front of it. For example, the following uses Groovy as the
interpreter:

```xml
<button label="hi" onClick="groovy:alert('Hi, Groovy')"/>
```

Important Builtin Variables

- self - the component receiving the event. In the previous example, it
  is the button itself.
- event - the event being received. In the previous example, it is an
  instance of [org.zkoss.zk.ui.event.MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html).

Notice that the event handler declared in this way is interpreted at run
time, so it inherits all advantages and disadvantages of
interpreter-based execution.

Advantages:

- It can be changed on the fly without recompiling and reloading the
  application.
- Easy to maintain if the code snippet is small.

Disadvantages:

- Slower to run.
- Compilation errors can not be known in advance.
- Hard to maintain if mixing business logic with user interface.

Suggestion:

- It is generally suggested to use this approach for 1) prototyping,
  or 2) simple event handling.

## Declare an Event Handler in Java

The other way to have an event handler is to declare it as a member of a
component class. For example,

```java
public class MyButton extends Button {
    public void onClick() {
        Messagebox.show("Hello");
    }
}
```

If the event handler needs to handle the event, it can declare the event
as the argument as follows.

```java
public class MyButton extends Button {
    public void onClick(MouseEvent event) {
        Messagebox.show("Hello, "+event.getName());
    }
}
```

Suggestions:

- It is suggested to use this approach for component development, since
  it is subtle for application developers to notice its existence. In
  addition, it requires to extend the component class.

> ------------------------------------------------------------------------
>
> <references/>

# Precedence of Listeners

The order of precedence for listeners from the highest to the lowest is
as follows.

1.  Event listeners implemented with
    <javadoc type="interface">org.zkoss.zk.ui.event.Express</javadoc>,
    and registered by
    <javadoc type="interface" method="addEventListener(java.lang.String, org.zkoss.zk.ui.event.EventListener)">org.zkoss.zk.ui.Component</javadoc>
2.  Event handlers defined in a ZUML document
3.  Event listeners registered by
    <javadoc type="interface" method="addEventListener(java.lang.String, org.zkoss.zk.ui.event.EventListener)">org.zkoss.zk.ui.Component</javadoc>
    (and without
    <javadoc type="interface">org.zkoss.zk.ui.event.Express</javadoc>)
    - It includes the method of a composer wired by
      [org.zkoss.zk.ui.util.GenericForwardComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/GenericForwardComposer.html)
      because the event listener is used.
4.  Event handlers defined as a class's method
5.  Event listeners registered to a page by
    <javadoc type="interface" method="addEventListener(java.lang.String, org.zkoss.zk.ui.event.EventListener)">org.zkoss.zk.ui.Page</javadoc>

## Abort the Invocation Sequence

You could abort the calling sequence by calling
<javadoc method="stopPropagation()">org.zkoss.zk.ui.event.Event</javadoc>.
Once one of the event listeners invokes this method, all the following
event handlers and listeners are ignored.

# Version History

| Version | Date          | Content                                                                                                                                                            |
|---------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6   | November 2010 | <javadoc type="interface">org.zkoss.zk.ui.event.SerializableEventListener</javadoc> was introduced to simplify the instantiation of a serializable anonymous class |

[^1]: An event attribute is an attribute starting with `on`
