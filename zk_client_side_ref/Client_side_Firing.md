

In general, an AU request is caused by a widget event
(<javadoc directory="jsdoc">zk.Event</javadoc>) that is going to be sent
to the server. This happens when the widget event targets a widget that
is created at the server, or with the `toServer` option (specified in
<javadoc directory="jsdoc" method="opts">zk.Event</javadoc>). In
addition, you could invoke
<javadoc method="fire(_global_.String, zk.Object, _global_.Map, int)" directory="jsdoc">zk.Widget</javadoc>
explicitly to fire an AU request to the server.

# Fire Event to Widget

An event can be fired to a widget by the use of
<javadoc method="fire(_global_.String, zk.Object, _global_.Map, int)" directory="jsdoc">zk.Widget</javadoc>
and
<javadoc method="fireX(zk.Event, int)" directory="jsdoc">zk.Widget</javadoc>.
For example,

```javascript
onCloseClick: function () {
 this.fire('onClose');
}
```

The event will be *propagated* to the widget's parent, parent's parent
and so on, until all ancestors are notified, or the propagation has been
stopped by
<javadoc method="stop(_global_.Map)" directory="jsdoc">zk.Event</javadoc>.

After the widget and all of its ancestors are notified, this event is
converted to an AU request and sent to the server, if

1.  The widget has a peer component, i.e., the widget was created by ZK
    Client Engine because of the instantiation of a component at the
    server[^1]. Notice that, to minimize the traffic, ZK Client Engine
    sends the AU request only if one of the following conditions is
    satisfied:
    - The event is declared as [an important
      event]({{site.baseurl}}/zk_client_side_ref/communication/au_requests/server-side_processing#Important_Events)
      (at server).
    - The server has registered an event listener
      (<javadoc type="interface">org.zkoss.zk.ui.event.EventListener</javadoc>)
      for it.
2.  Or, the `toServer` option has been specified in
    <javadoc directory="jsdoc" method="opts">zk.Event</javadoc> of the
    event. For example,

```javascript
zAu.send(new zk.Event(wgt, "onFoo", {foo: 'my data'}, {toServer:true}));
```

For more information, please refer to [the next
section]({{site.baseurl}}/zk_client_side_ref/communication/au_requests/server-side_processing).

> ------------------------------------------------------------------------
>
> <references/>

# Fire Event to Desktop

At the client, a desktop
(<javadoc directory="jsdoc">zk.Desktop</javadoc>) is also a widget
(<javadoc directory="jsdoc">zk.Widget</javadoc>). So, firing an event to
a desktop is the same as firing to a widget.

If you would like to fire an event to all desktops, please refer to the
next section.

# Fire Event Directly to Server

If you would like to fire an event to the server directly, you could
invoke [zAu.send(Event,
int)](https://www.zkoss.org/javadoc/latest/jsdoc/_global_/zAu.html#send-zk.Event-int-).
In other words, the event won't go through the target widget's listeners
and will be sent to the server, no matter if it has a peer component or
anything else.

The second argument specifies the time to wait before sending the
request (unit: milliseconds). If negative, the event won't be sent until
another event with a non-negative delay is about to be sent. In other
words, if negative, it means the event is deferrable.

If you would like to send an event to all desktops (in the current
browser window), you could specify `null` as the target widget of the
event.

# What States to Send Back the Server

A component has to synchronize every state affecting the widget's
behavior to the client, but the widget is required to send to the server
only the state that is changed by the user. For better performance and
offline capability, it is not necessary to send back the states changed
by the client application.

For example, the change of the value of a textbox widget is better to
send back to the peer widget since the user might change it. On the
other hand, it is not necessary to send the change of the value of a
label widget, since the user won't be able to change it.

[^1]: If a widget is created automatically because of a peer component,
    <javadoc method="inServer" directory="jsdoc">zk.Widget</javadoc>
    will be true.
