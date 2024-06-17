When a component is attached to a page for the first time, the
<javadoc method="renderProperties(org.zkoss.zk.ui.sys.ContentRenderer)" class='false'>org.zkoss.zk.ui.AbstractComponent</javadoc>
method is called to render all properties that will be sent to the
client for creating a peer widget. All the required properties have to
be rendered such that the client can create a peer widget with the same
set of properties.

Implementing
<javadoc method="renderProperties(org.zkoss.zk.ui.sys.ContentRenderer)" class='false'>org.zkoss.zk.ui.AbstractComponent</javadoc>
is straightforward. As shown below, all you need to do is to invoke
<mp>super.renderProperties</mp> to render all inherited properties (such
as width and height), and then the render method to render the property
defined in this class.

``` java
protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
throws java.io.IOException {
 super.renderProperties(renderer);
 render(renderer, "value", _value);
}
```

#### Why renderProperties and smartUpdate?

A common question is why
<javadoc method="renderProperties(org.zkoss.zk.ui.sys.ContentRenderer)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>
(and
<javadoc method="redraw(java.io.Writer)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>)
is required to render value again, when we notify the client with
<javadoc method="smartUpdate(java.lang.String, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>
in setValue.

The simple answer is that renderProperties is used to send all
properties at once, when a component is going to be attached to the page
at the client. On the other hand,
<javadoc method="smartUpdate(java.lang.String, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>
is used to send a property that was modified after the peer widget is
attached at the client. ZK will minimize the traffic by removing
unnecessary
<javadoc method="smartUpdate(java.lang.String, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>
(if renderProperties is called).

Once a widget is attached to the page at the client, renderProperties
won’t be called. If you want to regenerate all properties and rerender
it at the client, you can invoke the invalidate method. Note that if you
update a property multiple times in the same execution (with
<javadoc method="smartUpdate(java.lang.String, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>),
only the last value will be sent to the client. If you prefer to send
them all (rather than overwriting), then you can set the 3rd argument
append to true
(<javadoc method="smartUpdate(java.lang.String, java.lang.Object, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>).
For example you may use this when adding a listener for a certain event
and you do not want to overwrite the present listener this is achieved
by passing true as the third argument of
<javadoc method="smartUpdate(java.lang.String, boolean)" class="false">org.zkoss.zk.ui.AbstractComponent</javadoc>.
The table below outlines the differences.

|                                              | <b>smartUpdate</b>          | <b>smartUpdate (append, 3rd argument true)</b> |
|----------------------------------------------|-----------------------------|------------------------------------------------|
| Sent to client if invalidated or new created | No                          | No                                             |
| Sent to client if the component is removed   | No                          | No                                             |
| Sent to client if name is the same           | Only the last value is sent | Yes                                            |
