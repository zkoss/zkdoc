---
title: "Client Activity Watches"
---



In addtion to widget events
([zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html)) and DOM events
([jq.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/jq.Event.html)), there are some special
notifications called client activity watches. They are used to notify
special activities, such as when a widget becomes invisible, or a window
is brought to the top. This kind of activity can be listened by
so-called watch ([\_global\_.zWatch](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html))

# Listen to Client Activities

To add a watch (i.e., listen to a client activity), you could use
[\_global\_.zWatch#listen(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#listen(_global_.Map))
as follows:

```java
zWatch.listen({
    onSize: this,
    onShow: this,
    onHide: [this, this._onHide]
});
```

As shown, the key of each entry in the given map is the name of the
client activity (aka., the watch name), and the value could be one of
the following:

- An object that has a method with the same name. In the above case,
  **this** must have the `onSize` and `onShow` methods
- A two-element array, where the first element is the target, and the
  second is the method

# Listener Object

Here is an example of a client activity listener:

```js
var listener = {
    onCommandReady: function(controller) {
        zk.log(arguments[0].name);
    },
    onResponse: function(controller) {
        zk.log(arguments[0].name);
    },
    onFloatUp: function(controller) {
        zk.log(`focus on ${controller.origin.widgetName}` )
    },
}

zWatch.listen({onCommandReady: listener,
               onResponse: listener,
               onFloatUp: listener,
               });
```

## Size Event Listener

```js
var sizeListener = {
    onSize: function(controller) {
        zk.log(arguments[0].name);
        //ctrl.origin is null
    },
    isWatchable_: function() { //required for a size event listener
        return true;
    }
};
```

- Line 6-8: you need to add this function to listen to those size
  related events

### Listener Function

The signature of the listener function is as follows.

```java
function onWhatever(controller, arg0, arg1...) {
  //controller.origin: the object passed as the first argument to zWatch.fire or zWatch.fireDown
  //controller.fireDown(something) and controller.fire(something):
  //   
}
```

Where `controller` is a controller allowing you to control of the
invocation sequence of the listeners, and `arg0` and others are the
arguments that passed to
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
or
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)).

Here is the pseudo-code for the controller:

```java
interface Controller {
  /** event name */
  name;
  /** Usually zk.Widget (unless fire() and fireDown() is called with a different object) */
  Object origin;
  /** enforce the remaining listeners to be invoked immediately (change the invocation sequence) */
  void fire(Object ref, Object...);
  /** enforce the remaining listeners to be invoked immediately (change the invocation sequence) */
  void fireDown(Object ref, Object...);
}
```

- Line 5: it is the original object (usually a widget,
  [zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)) passed as the first
  argument when
  [\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
  or
  [\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
  was called. In other words, it is the one that causes the client
  activity, e.g. the widget being dragged, shown, or sized. It is null
  if not available.
- Line 7, 9: The fire() and fireDown() are used to fore the remaining
  listeners (caused by the same invocation of of
  [\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
  or
  [\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)))
  to be invoked. If your listener doesn't call any of them, the other
  listeners are called in the same order of registration. The `ref` is
  optional. If specified, it will invoke only the listeners for the
  given object (and its descendants if fireDown) that are not invoked
  yet. If null, it will invoke all the listeners that are not invoked
  yet.

# Unlisten

To unlisten, you could use
[\_global\_.zWatch#unlisten(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#unlisten(_global_.Map))
as follows:

```java
zWatch.unlisten({
    onSize: this,
    onShow: this,
    onHide: [this, this._onHide]
});
```

# Fire

The client activity is triggered (aka., fired) by one of the following 2
functions:

- [\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)):
  will invoke the listeners on the target object
- [\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)):
  will invokes the listeners on the target object and all of **its
  descendants** (i.e., the target object's children, grandchildren...).

For example, if a widget resizes itself, it could fire down onSize as
follows.

```xml
zWatch.fireDown("onSize", wgt);
```

The target object could be anything as long as the listener recognizes
it, but ZK's standard widgets use
[zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html) only.

# Client Activities

Here is the list of client activities that you could watch (in
alphabetic order).

## afterSize

`[fireDown]`

It is called right after the browser window or the parent widget is
resized.

`beforeSize`, `onFitSize`, `onSize`, and `afterSize` are fired when a
browser window or a widget is resized. beforeSize is fired first, such
that the listeners could reset style's width or height. Then, the
listeners of onFitSize are called in the reverse order (child first) to
calculate the minimum allowed size. And the listener of onSize can
change it to the correct size. Finally, the listener of afterSize could
move the floating elements such as popups to the correct position.

Notice
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
must be used to fire this event, so only the listeners of descendants of
the specified widget will be called.

Don't do anything that would interfere the position of other components
in this event. For example: changing size/content or
adding/removing/moving the DOM node. The typical usage is to recalculate
the position of popup/notification.

- Parameters
  - `ctl.origin` - the widget that causes the resizing. If null, it
    means the whole browser is resized.

## beforeSize

`[fireDown]`

It is called right before the browser window or the parent widget is
resized.

beforeSize, onFitSize, onSize and afterSize are fired when the browser
window or a widget is resized. beforeSize is fired first, such that the
listeners could reset style's width or height. Then, the listeners of
onFitSize are called in the reverse order (child first) to calculate the
minimal allowed size. And the the listener of onSize can change it to
the correct size. Finally, the the listener of afterSize could move the
floating elements such as popups to the correct position.

Notice
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
must be used to fire this event, so only the listeners of descendants of
the specified widget will be called.

- Parameters
  - ctl.origin - the widget that causes the resizing. If null, it means
    the whole browser is resized.

## onBeforeDestroy

It is called before the desktop is removed. For example, it can be used
in embedded ZK.

```javascript
desktop.listen({onBeforeDestroy:function(){
    console.log("before destroy this desktop")
}});
```

## onBindLevelMove

`[fire]`

It is called if a [zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)'s
`bindLevel` is changed due to moving from one parent to another.

Notice it won't be called if the widget is unbound and bound (i.e.,
detached and attached).

Notice
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

## onCommandReady

`[fire]`

It is called after the AU commands are processed and before
"onResponse". In other words, the "onCommandReady" is fired without
"setTimeout" which is triggered directly. Unlike "onResponse" will be
triggered with a "setTimeout".

Notice the
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

## onEndDrag

`[fire]`

It's fired after an end-user stops dragging a component by releasing a
mouse button.

## onFitSize

`[fireDown; reverse order]`

It is called between beforeSize and onSize.

beforeSize, onFitSize, onSize, and afterSize are fired when a browser
window or a widget is resized. beforeSize is fired first, such that the
listeners could reset the style's width or height. Then, the listeners
of onFitSize are called in the reverse order (child first) to calculate
the minimum allowed size. And the listener of onSize can change it to
the correct size. Finally, the listener of afterSize could move the
floating elements such as popups to the correct position.

Notice that the listeners of onFitSize are called in the reverse order,
i.e., the child is called before the parent. However, the superclass'
listener of the same widget will still be called first (like onSize and
other events).

- Parameters
  - `ctl.origin` - the widget that causes the resizing. If null, it
    means the whole browser is resized.

## onFloatUp

`[fire]`

It is called after a widget has gained the focus. It means the 'float'
widget that is the parent of the focus widget shall become topmost.

Notice
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

- Parameters
  - ctl.origin - the widget gains the focus.

## onHide

`[fireDown]`

It is called before a widget is going to become invisible.

Notice
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
must be used to fire this event, so only the listeners of descendants of
wgt will be called.

- Parameters
  - ctl.origin - the widget is becoming invisible

<!-- -->

- See Also
  - [\#onShow](#onShow)

## onMove

`[fire]`

It is called after you finish dragging a component in a browser.

## onResponse

`[fire]`

It is called after the response of the AU request has been sent back
from the server and processed.

Notice the
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

## onRestore

`[fireDown]`

It is called when [zk.Skipper](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Skipper.html)
restores the DOM elements.

It is rarely required but to fix the browser's bug if any. Furthermore,
if you listen to onRestore, it is likely you have to listen onVParent
too.

- Parameters
  - ctl.origin - the widget has become visible

<!-- -->

- See Also
  - [\#onVParent](#onVParent)

## onScroll

`[fire]`

It is called when the browser window or the specified widget is
scrolling.

Notice the
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

- Parameters
  - ctl.origin - the widget that is scrolling (i.e., causing the
    onScroll watch), or null if the whole browser window is scrolling

## onSend

`[fire]`

It is called before sending the AU request to the server. The implicit
argument indicates whether all AU requests being sent are implicit.

Notice
[\_global\_.zWatch#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fire(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
is used, so all listeners are invoked.

## onSize

`[fireDown]`

It is called when a browser window is resized.

beforeSize, onFitSize, onSize, and afterSize are fired when the browser
window or a widget is resized. beforeSize is fired first, such that the
listeners could reset the style's width or height. Then, the listeners
of onFitSize are called in the reverse order (child first) to calculate
the minimum allowed size. And the listener of onSize can change it to
the correct size. Finally, the listener of afterSize could move the
floating elements such as popups to the correct position.

Notice that a layout widget (such as Borderlayout and Hbox) must fire
both `beforeSize` and `onSize` when it resizes.

Notice
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
must be used to fire this event, so only the listeners of descendants of
wgt will be called.

- Parameters
  - ctl.origin - the widget that causes the resizing. If null, it means
    the whole browser is resized.

## onShow

`[fireDown]`

It is called after a widget has become visible.

Notice
[\_global\_.zWatch#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zWatch.html#fireDown(_global_.String, java.lang.Object, _global_.Map, java.lang.Object...))
must be used to fire this event, so only the listeners of descendants of
wgt will be called.

- Parameters
  - ctl.origin - the widget that becomes visible

<!-- -->

- See Also
  - [\#onHide](#onHide)

## onStartDrag

`[fire]`

It's fired after an end-user drags a component with a mouse.

## onVParent

`[fireDown]`

It is called when
[\_global\_.jqzk#makeVParent()](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jqzk.html#makeVParent())
or
[\_global\_.jqzk#undoVParent()](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jqzk.html#undoVParent())
is called to move a DOM element to/from `document.body`.

It is rarely required but could be used to fix a browser's bug if any.
Furthermore, if you listen to onVParent, it is likely you have to listen
to onRestore too.

- Parameters
  - ctl.origin - the widget has become visible

<!-- -->

- See Also
  - [\#onRestore](#onRestore)

# Version History

| Version | Date          | Content                                                                      |
|---------|---------------|------------------------------------------------------------------------------|
| 5.0.8   | August 2011   | onFitSize and onVParent was introduced.                                      |
| 7.0.5   | February 2015 | [Support onCommandReady](http://tracker.zkoss.org/browse/ZK-2516)            |
| 8.5.2   | July 2018     | [ZK-3943](http://tracker.zkoss.org/browse/ZK-3943) afterSize was introduced. |
