

A DOM event ([jq.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/jq.Event.html)) is the
DOM-level event that is usually triggered by the browser. It is usually
listened by the implementation of a widget, rather than the client
application.

Since ZK Client Engine can intercept most DOM events and encapsulate
them into the widget events, it is suggested to listen the widget
events, if possible, for better performance (by overriding the
corresponding methods, such as
[zk.Widget#doClick_(zk.Event)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#doClick_(zk.Event))).
For more information, please refer to [the previous section]({{site.baseurl}}/zk_client_side_ref/notifications/widget_events).

# How to Listen and Unlisten

There are two different approaches to listen a DOM event:
[zk.Widget#domListen_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domListen_(_global_.DOMElement, _global_.String, zk.Object))
and jQuery ([\_global\_.jq](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jq.html)).

## Use domListen\_ and domUnlisten\_

[zk.Widget#domListen_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domListen_(_global_.DOMElement, _global_.String, zk.Object))
registers a DOM-level event listener. The registration should be done
when a widget is bound to DOM elements, i.e., when
[zk.Widget#bind_(zk.Desktop, zk.Skipper, _global_.Array)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#bind_(zk.Desktop, zk.Skipper, _global_.Array))
is called. It is important to un-register by the use of
[zk.Widget#domUnlisten_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domUnlisten_(_global_.DOMElement, _global_.String, zk.Object))
when a widget is un-bound from DOM elements, i.e., when
[zk.Widget#unbind_(zk.Skipper, _global_.Array)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#unbind_(zk.Skipper, _global_.Array))
is called. For example,

```javascript
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
([\_global\_.jq](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jq.html)),
[zk.Widget#domListen_(_global_.DOMElement, _global_.String, zk.Object)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domListen_(_global_.DOMElement, _global_.String, zk.Object))
will be ignored if the widget is under control of ZK Weaver (a WYSIWYG
editor), i.e., in the so-called *Design Mode*. In most cases, a widget
should not register any event listeners when it is under control of ZK
Weaver to avoid any conflict.

## Use jQuery

The use of jQuery ([\_global\_.jq](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jq.html))
is similar except using one of the event listening methods found in
[jQuery](http://api.jquery.com/category/events/).

```javascript
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
[zk.Object#proxy(_global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Object.html#proxy(_global_.Function))
to proxy a function such that `this` will refer to the widget when the
method is called. Also notice that the event name used with jQuery does
not start with `on`.


