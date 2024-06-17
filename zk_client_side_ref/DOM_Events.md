\_\_TOC\_\_

A DOM event (<javadoc directory="jsdoc">jq.Event</javadoc>) is the
DOM-level event that is usually triggered by the browser. It is usually
listened by the implementation of a widget, rather than the client
application.

Since ZK Client Engine can intercept most DOM events and encapsulate
them into the widget events, it is suggested to listen the widget
events, if possible, for better performance (by overriding the
corresponding methods, such as
<javadoc method="doClick_(zk.Event)" directory="jsdoc">zk.Widget</javadoc>).
For more information, please refer to [the previous
section](ZK_Client-side_Reference/Notifications/Widget_Events).

# How to Listen and Unlisten

There are two different approaches to listen a DOM event:
<javadoc method="domListen_(_global_.DOMElement, _global_.String, zk.Object)" directory="jsdoc">zk.Widget</javadoc>
and jQuery (<javadoc directory="jsdoc">\_global\_.jq</javadoc>).

## Use domListen\_ and domUnlisten\_

<javadoc method="domListen_(_global_.DOMElement, _global_.String, zk.Object)" directory="jsdoc">zk.Widget</javadoc>
registers a DOM-level event listener. The registration should be done
when a widget is bound to DOM elements, i.e., when
<javadoc method="bind_(zk.Desktop, zk.Skipper, _global_.Array)" directory="jsdoc">zk.Widget</javadoc>
is called. It is important to un-register by the use of
<javadoc method="domUnlisten_(_global_.DOMElement, _global_.String, zk.Object)" directory="jsdoc">zk.Widget</javadoc>
when a widget is un-bound from DOM elements, i.e., when
<javadoc method="unbind_(zk.Skipper, _global_.Array)" directory="jsdoc">zk.Widget</javadoc>
is called. For example,

``` javascript
bind_: function () {
    this.$supers('bind_', arguments);
    this.domListen_(this.getNode(), "onChange");
},
unbind_: function () {
    this.domUnlisten_(this.node, "onChange");
    this.$supers('unbind_', arguments);
},
_doChange: function (evt) { //event listener
    //evt is an instance of jq.Event
},
```

Unlike jQuery's event listener
(<javadoc directory="jsdoc">\_global\_.jq</javadoc>),
<javadoc method="domListen_(_global_.DOMElement, _global_.String, zk.Object)" directory="jsdoc">zk.Widget</javadoc>
will be ignored if the widget is under control of ZK Weaver (a WYSIWYG
editor), i.e., in the so-called *Design Mode*. In most cases, a widget
should not register any event listeners when it is under control of ZK
Weaver to avoid any conflict.

## Use jQuery

The use of jQuery (<javadoc directory="jsdoc">\_global\_.jq</javadoc>)
is similar except using one of the event listening methods found in
[jQuery](http://api.jquery.com/category/events/).

``` javascript
bind_: function () {
    this.$supers('bind_', arguments);
    jq(this.$n("form")).bind("reset", this.proxy(this._resetForm));
},
unbind_: function () {
    jq(this.$n("form")).unbind("reset", this.proxy(this._resetForm));
    this.$supers('unbind_', arguments);
},
_resetForm: function (evt) { //event listener
   this.doSomething(); //this refers to the widget since this.proxy is used
},
```

where we use
<javadoc method="proxy(_global_.Function)" directory="jsdoc">zk.Object</javadoc>
to proxy a function such that `this` will refer to the widget when the
method is called. Also notice that the event name used with jQuery does
not start with `on`.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
