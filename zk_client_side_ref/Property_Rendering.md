

If a state (aka., a property) of a component will cause the peer widget
to have a different behavior or visual appearance, the state has to be
sent to the widget to ensure the consistency.

There are two situations a component has to send the states to the
client.

1.  Render All Properties When Attached
      
    A component has to render all properties when it is attached to a
    page at the first time
2.  Dynamic Update a Property
      
    A component has to send the new value of a property when it is
    changed dynamically.

> ------------------------------------------------------------------------
>
> Notice that this section describes how to synchronize states of a
> component to the widget. To synchronize states back to a component,
> refer to [the AU Requests > section]({{site.baseurl}}/zk_client_side_ref/communication/au_requests/client-side_firing).

# Render All Properties When Attached

When ZK is about to render a new-attached component to the client (by
new-attached we mean just attached to a desktop),
<javadoc method="redraw(java.io.Writer)" type="interface">org.zkoss.zk.ui.sys.ComponentCtrl</javadoc>
is called to render the component, including the widget's class name,
all properties, event listeners and so on.

However, you don't have to implement
<javadoc method="redraw(java.io.Writer)" type="interface">org.zkoss.zk.ui.sys.ComponentCtrl</javadoc>
from ground up. [org.zkoss.zk.ui.AbstractComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html)
provides a default implementation, so you could override
<javadoc method="renderProperties(org.zkoss.zk.ui.sys.ContentRenderer)">org.zkoss.zk.ui.AbstractComponent</javadoc>
instead.

## renderProperties

Overriding
<javadoc method="renderProperties(org.zkoss.zk.ui.sys.ContentRenderer)">org.zkoss.zk.ui.AbstractComponent</javadoc>
is straightforward: call back `super.renderProperties` to render
inherited properties, and then call one of the `render` methods to
render the properties of the component.

```java
protected void renderProperties(ContentRenderer renderer)
throws IOException {
 super.renderProperties(renderer);
 render(renderer, "myProp", _myProp);
 //...
}
```

Notice that the render methods of
[org.zkoss.zk.ui.AbstractComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html) will ignore `null`,
empty string, and `false` automatically. Thus, the `if` statement in the
following example is redundant.

```java
if (value != null && value .length() != 0) //redundant since render will check
    render(renderer, "name", value); //does nothing if null or empty
```

On the other hand, if you want to render null and an empty string, you
should invoke the render methods of
[org.zkoss.zk.ui.sys.ContentRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ContentRenderer.html),
such as

```java
render.render("name", value);
```

## redrawChildren

After calling `renderProperties`, `redraw` calls
<javadoc method="redrawChildren(java.io.Writer)">org.zkoss.zk.ui.AbstractComponent</javadoc>
to render the properties of children recursively.

Here is the calling sequence of the default implementation of
<javadoc method="redraw(java.io.Writer)">org.zkoss.zk.ui.AbstractComponent</javadoc>:

1.  `renderProperties(new JsContentRenderer());`
2.  `redrawChildren(out);`

## Render Special Properties

ZK Client Engine supports several special properties to provide extra
functionality, such as late evaluation and so on.

### z_al

Specifies a map of properties that should be evaluated after all script
files are loaded.

For example,

```java
protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
throws java.io.IOException {
  //assume js is the JavaScript code snippet
  renderer.renderDirectly("z_al", "{constraint:function(){\nreturn "+js+";}}");
}
```

Notice that the value of `z_al` is a JavaScript map of properties that
will be evaluated, after all the required JavaScript packages are
loaded. Moreover, the value of each entry in the map is a function that
should return the object being assigned with.

In the above example, the function will be invoked after all packages
are loaded, and then the returned value. `js` will be assigned to the
`constraint` property.

### z_ea

Specifies the property name whose value must be retrieved from the DOM
element with the same UUID.

It is typically used to render a property that will be able to be
indexed search engines.

For example,

```javascript
renderer.render("z_ea", "content");
```

Then, the value of the `content` property will be retrieved from the
inner HTML of the DOM element with the same UUID. Of course, the
component has to render the value in the correct DOM element by the use
of
<javadoc method="renderCrawlableA(java.lang.String, java.lang.String)">org.zkoss.zul.impl.Utils</javadoc>
or
<javadoc method="renderCrawlableText(java.lang.String)">org.zkoss.zul.impl.Utils</javadoc>.

If the content has to decode first (from &lt; to \<), prefix the
property name with '\$'.

```javascript
renderer.render("z_ea", "$content");
```

### z_pk

Specifies a list of packages separated by comma that should be loaded
before creating the widgets.

For example,

```java
renderer.render("z_pk", "com.foo,com.foo.more");
```

## Enforce ZK Update Engine to Redraw a Component

A component can enforce ZK Update Engine to redraw a component by
calling
<javadoc method="invalidate()" type="interface">org.zkoss.zk.ui.Component</javadoc>.
Once called, the peer widget will be removed, and a new peer widget will
be created to represent the new content. Thus, all modifications to the
widget at client will be lost if not preserved (or synchronized back) to
the server.

Also notice that
<javadoc method="redraw(java.io.Writer)" type="interface">org.zkoss.zk.ui.Component</javadoc>
won't be called immediately. Rather, ZK Update Engine will accumulate
all updates, and then optimize the number of commands ([AU responses]({{site.baseurl}}/zk_client_side_ref/communication/au_responses))
that need to be sent.

# Dynamic Update a Property

When the application modifies a state that affects the peer widget, a
component has to send the updated value to the peer widget. It is done
by calling one of the smartUpdate methods of
[org.zkoss.zk.ui.AbstractComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html). For example,

```java
public void setValue(String value) {
 if (!_value.equals(value)) {
  _value = value;
  smartUpdate("value", _value);
 }
}
```

If the peer widget was created in the previous request (i.e., the
component has been attached to desktop), the invocation of `smartUpdate`
will actually cause the peer widget's setter of the specified properties
being called. In the above example, `setValue` will be called at the
client.

On the other hand, if a component is not yet attached to a desktop,
`smartUpdate` will do nothing (since the peer widget doesn't exist). If
<javadoc method="invalidate()" type="interface">org.zkoss.zk.ui.Component</javadoc>
was called, `smartUpdate` does nothing and previous invocation of
`smartUpdate` of the same request are ignored (since the peer widget
will be removed and re-created).

## Deferred Property Value

Sometimes the value is not ready when `smartUpdate` is called, and it is
better to retrieve when rendering the components. To defer the
evaluation of a value, you can implement
[org.zkoss.zk.ui.util.DeferredValue](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DeferredValue.html).

For example,
<javadoc method="encodeURL(java.lang.String)" type="interface">org.zkoss.zk.ui.Execution</javadoc>
is better to be called when rendering components[^1]:

```java
public void setSrc(String src) {
 if (!Objects.equals(_src, src)) {
  _src = src;
  smartUpdate("src", new EncodedURL());
 }
}
private class EncodedURL implements DeferedValue {
 public Object getValue() {
  return getDesktop().getExecution().encodeURL(_src);
 }
}
```

> ------------------------------------------------------------------------
>
> <references/>



[^1]: It is because `smartUpdate` is usually called in an event
    listener, which might run at the event thread (if it is turned on).
    Meanwhile, WebSphere 5 doesn't allow calling `encodeURL` other than
    the servlet thread.
