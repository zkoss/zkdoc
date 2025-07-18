

A widget event is the widget-level event
([zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html)).

Like [org.zkoss.zk.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/event/Event.html) at the server side, the
widget event can be anything, and can be triggered by a widget or an
application to notify a widget-level or application-level event, such as
that a window has been moved.

In addition, ZK Client Engine intercepts most DOM events and encapsulate
them into widgets events, such that it is easier and more efficient for
component developers to handle events at widget-level (rather than
DOM-level, [jq.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/jq.Event.html)).

# Lifecycle-related Widget Events

ZK fires some lifecycle-related events when creating and destroying
widgets. Please check
[client-side-lifecycle.zul](https://github.com/zkoss/zkbooks/blob/master/clientreference/src/main/webapp/notification/client-side-lifecycle.zul)
to know the basic concept.

# Event Listening for Component Developers

ZK Client Engine intercepts most DOM events that are targeting the DOM
elements belong to widgets. It then encapsulates them into widget
events, and then invokes the corresponding method of
[zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html). For example, when the
user moves the mouse over a DOM element of a widget,
[zk.Widget#doMouseOver_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseOver_(zk.Event))
will be called. Similarly, when the user clicks a DOM element of a
widget,
[zk.Widget#doClick_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doClick_(zk.Event))
will be called.

## Events and Corresponding Methods

**Events that can be handled by overriding a method**

| DOM Event Name | ZK Widget Event Name | Method to Override |
|----------------|----------------------|-------------------|
| blur | onBlur | [zk.Widget#doBlur_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doBlur_(zk.Event))<br/><br/>Note: unlike others, you have to register a listener with [zk.Widget#domListen_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domListen_(_global_.DOMElement, _global_.String, zk.Object)) as follows. Otherwise, doBlur_ won't be called.<br/><br/>```javascript<br/>this.domListen_(n, "onBlur");<br/>``` |
| click | onClick | [zk.Widget#doClick_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doClick_(zk.Event)) |
| dblclick | onDoubleClick | [zk.Widget#doDoubleClick_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doDoubleClick_(zk.Event)) |
| contextmenu (aka., the right click) | onRightClick | [zk.Widget#doRightClick_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doRightClick_(zk.Event)) |
| focus | onFocus | [zk.Widget#doFocus_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doFocus_(zk.Event))<br/><br/>Note: unlike others, you have to register a listener with [zk.Widget#domListen_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domListen_(_global_.DOMElement, _global_.String, zk.Object)) as follows. Otherwise, doFocus_ won't be called.<br/><br/>```javascript<br/>this.domListen_(n, "onFocus");<br/>``` |
| mouseover | onMouseOver | [zk.Widget#doMouseOver_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseOver_(zk.Event)) |
| mouseout | onMouseOut | [zk.Widget#doMouseOut_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseOut_(zk.Event)) |
| mousedown | onMouseDown | [zk.Widget#doMouseDown_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseDown_(zk.Event)) |
| mouseup | onMouseUp | [zk.Widget#doMouseUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseUp_(zk.Event)) |
| mousemove | onMouseMove | [zk.Widget#doMouseMove_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseMove_(zk.Event)) |
| keydown | onKeyDown | [zk.Widget#doKeyDown_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doKeyDown_(zk.Event)) |
| keyup | onKeyUp | [zk.Widget#doKeyUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doKeyUp_(zk.Event)) |
| keypress | onKeyPress | [zk.Widget#doKeyPress_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doKeyPress_(zk.Event)) |
| x | onBind | handle it by registering a listener according to [event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening) ZK fires it in afterMount, starting from the inner-most child then its parent, and so on. |
| x | onSize | handle it by registering a listener according to [event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening) ZK fires it when you resize a widget and propagates this event to its children. |
| x | onAfterSize | handle it by registering a listener according to [event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening) ZK fires it when each time ZK completes rendering/re-rendering a widget and propagates this event to its children. |
| x | onUnbind | handle it by registering a listener according to [event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening) ZK fires it when ZK removes a widget from a page. |

Events that can be handled by overriding a method

Please read
[event listening]({{site.baseurl}}/zk_client_side_ref/event_listening)
for listening to widget events.

## Listen by Overriding a Method

Thus, the simplest way to listen a DOM event is to override the
corresponding method. For example,

```javascript
doMouseDown_: function (evt) {
    //do whatever you want
    this.$supers('doMouseDown_', arguments); //invoke parent.fireX() and so on
}
```

where `evt` is an instance of
[zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html). The original DOM event
can be retrieved by the use of
[zk.Event#domEvent](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html#domEvent), and the
original DOM element can be found by the use of
[zk.Event#domTarget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html#domTarget) (or
`evt.domEvent.target`).

If you want to listen and disable the default behavior, just not to call
the super class:

```javascript
doClick_: function (evt) {
    this.fireX(evt);
    //don't call this.$supers to avoid the event propagation
},
```

**Note** that this approach is suggested for better performance since no
real DOM-level event registration is required (as described in [the next section]({{site.baseurl}}/zk_client_side_ref/dom_events)).

## Event Propgation

The default implementation of the event methods (doXxxx\_ in
[zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)) propagates the event
from the target widget to its parent, grandparent and so on. To stop the
propagation, you can either invoke
[zk.Event#stop(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html#stop(_global_.Map)),
or not calling back the superclass's event method (the effect is the
same). In other words, if the propagation is stopped, the parent's event
method won't be called.

If a widget event is not stopped and required by the server, it will be
sent to the server, and converted to an instance of
[org.zkoss.zk.au.AuRequest](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/AuRequest.html) at the
server[^1].

In addition to the event propagation, the default implementation will
invoke
[zk.Widget#fireX(zk.Event, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#fireX(zk.Event, int))
to inoke the application-level listeners, if any (registered with
[zk.Widget#listen(_global_.Map, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#listen(_global_.Map, int)).

Notice that there are two kinds of propagation: widget-level and
DOM-level. If you stop only the widget-level propagation (by calling
`evt.stop({propagation:true})`), the DOM event will go through all
DOM-level event listeners and then trigger the browser default behavior.

> ------------------------------------------------------------------------
>
> <references/>

## Capture the Mouse Event

Sometime you want the following
[zk.Widget#doMouseOver_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseOver_(zk.Event))
and
[zk.Widget#doMouseUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseUp_(zk.Event))
are called against the same widget, no matter where the mouse-up event
happens. This is also known as capturing. It can be done by setting
[\_global\_.zk#mouseCapture](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#mouseCapture)
as follows.

```javascript
doMouseDown_: function () {
    zk.mouseCapture = this;
    this.$supers('doMouseDown_', arguments);
}
```

Notice that the mouse capture is reset automatically after
[zk.Widget#doMouseUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doMouseUp_(zk.Event))
is called.

## Capture the Input Event

Sometime you want the following
[zk.Widget#onKeyPress_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#onKeyPress_(zk.Event))
and
[zk.Widget#onKeyUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#onKeyUp_(zk.Event))
to be called against the same widget, no matter where the key-up event
happens. It is also known as capturing. It can be done by setting
[\_global\_.zk#keyCapture](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#keyCapture)
as follows.

```javascript
doKeyDown_: function () {
    zk.keyCapture = this;
    this.$supers('doKeyDown_', arguments);
}
```

Notice that the key capture is reset automatically after
[zk.Widget#onKeyUp_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#onKeyUp_(zk.Event))
is called.

# Event Listening for Application Developers

To listen a widget event, you could invoke
[zk.Widget#listen(_global_.Map, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#listen(_global_.Map, int))
to listen any widget event you want. However,
[zk.Widget#listen(_global_.Map, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#listen(_global_.Map, int))
is designed for applications to listen events at the client. Thus, it is
also called the application-level event listener.

For component development, the method overriding is suggested as
described in the previous subsections.

The signature of an event listener is as follows.

```javascript
function (event) { //an instance of zk.Event
}
```

# Event Firing

To fire a widget event, you could invoke
[zk.Widget#fire(_global_.String, zk.Object, _global_.Map, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#fire(_global_.String, zk.Object, _global_.Map, int))
or
[zk.Widget#fireX(zk.Event, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#fireX(zk.Event, int)).

Then, the listeners registered with
[zk.Widget#listen(_global_.Map, int)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#listen(_global_.Map, int))
will be invoked one-by-one. Then, it will be sent to the server, if an
event listener has been registered at the server or it is an import
event[^2].

A client-side event listener could stop sending a widget event to the
server by invoking
[zk.Event#stop(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html#stop(_global_.Map))
with `{au:true}`, such as

```javascript
evt.stop({au: true});
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For more information, please refer to the [AU Requests]({{site.baseurl}}/zk_client_side_ref/au_requests)
    section.

[^2]: For more information, please refer to the [AU Requests]({{site.baseurl}}/zk_client_side_ref/au_requests)
    section.
