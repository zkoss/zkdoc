# Overview

ZK allows applications to handle events at both the server and client
side. Handling events at the server side, as described in the previous
sections, is more common, since the listeners can access the backend
services directly. However, handling event at the client side improves
the responsiveness. For example, it is better to be done with a
client-side listener if you want to open the drop-down list when a
comobox gains the focus.

The rule of thumb is to use server-side listeners first since it is
easier, and then improve the responsiveness of the critical part, if
any, with the client-side listener.

Here we describe how to handle events at the client. For client-side UI
manipulation, please refer to the [UI
Composing](ZK_Client-side_Reference/General_Control/UI_Composing)
and [Widget
Customization](ZK_Client-side_Reference/General_Control/Widget_Customization)
sections.

# Declare a Client-side Listener in ZUML

Declaring a client-side listener in a ZUML document is similar to
declaring a server-side listener, the steps are:

1.  Declare client namespace first, URI is
    <http://www.zkoss.org/2005/zk/client> (aka., client)
2.  write your logic in JavaScript

'''Implementation Notes:

- `this` references to the event target widget.
- Use `this.$f()` to reference fellow widgets
  (<javadoc directory="jsdoc" method="$f()">zk.Widget</javadoc>)
- `event` is referenced to
  [zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/zk/Event.html).

For example,

``` xml
<combobox xmlns:w="client" w:onFocus="this.open()"/>
```

Notice that EL expressions are allowed in the JavaScript code (for the
client-side listener). Thus, it is straightforward to embed the
server-side data to the client-side listener. For example,

``` xml
<window id="wnd" title="main">
<combobox xmlns:w="client" w:onFocus="zk.log('${wnd.title}')"/>
</window>
```

If you want to escape it, place a backslash between \$ and {, such as
`w:onFocus="zk.log('$\{wnd.title}')"`.

For more information about manipulating widgets at the client, please
refer to the [UI
Composing](ZK_Client-side_Reference/General_Control/UI_Composing)
section.

## Client-side Event Listener First then Server-side

It is allowed to register both the client and server-side event
listeners. They will be both invoked. Of course, the client-side
listener is called first, and then the server-side listener. For
example,

``` xml
  <combobox xmlns:w="client" w:onFocus="this.open()"
   onFocus='self.parent.appendChild(new Label("focus"))'/>
```

### Client-side Event Controls Firing Behavior

If you want to stop the event propagation such that the server won't
receive the event, you could invoke
<javadoc method="stop(_global_.Map)" directory="jsdoc">zk.Event</javadoc>.
For example, the server-side listener won't be invoked in the following
example:

``` xml
  <combobox xmlns:w="client" w:onFocus="this.open(); event.stop();"
   onFocus='self.parent.appendChild(new Label("focus"))'/>
```

Since ZK fires an event to the server-side based on the same `Event`,
you can also override
[`event.opts`](https://www.zkoss.org/javadoc/latest/jsdoc/zk/Event.html#opts)
to affect event firing behavior.

# Declare a Client-side Listener in Java

The other way to declare a client-side listener at the server is
<javadoc method="setWidgetListener(java.lang.String, java.lang.String)">org.zkoss.zk.ui.Component</javadoc>.
For example,

``` java
combobox.setWidgetListener("onFocus", "this.open()");
```

Notice that it is Java and running at the server.

Also notice that EL expressions are not allowed (i.e., not interpreted)
if you assign it directly. It is because EL expressions are interpreted
by ZK Loader when loading a ZUL page. However, it is easy to construct a
string to any content you want with Java.

# Register a Client-side Listener in Client-Side JavaScript

Listening an event at the client could be done by calling
<javadoc directory="jsdoc" method="listen(_global_.Map, int)">zk.Widget</javadoc>.
For example,

``` xml
<window>
    <bandbox id="bb"/>
    <script defer="true">
    this.$f().bb.listen({onFocus: function () {this.open();}});
    </script>
</window>
```

where

1.  `defer="true"` is required such that the JavaScript code will be
    evaluated after all widgets are created successfully. Otherwise, it
    is not able to retreive the bandbox (`bb`).
2.  `script` is a widget (unlike `zscript`), so `this` references to the
    `script` widget, rather than the parent.
3.  <javadoc directory="jsdoc" method="$f(_global_.String)">zk.Widget</javadoc>
    is equivalent to
    <javadoc method="getFellow(java.lang.String)">org.zkoss.zk.ui.Component</javadoc>,
    except it is a JavaScript method (accessible at the client).

## Register DOM-level Event Listener

Notice that the event listener handling discussed in the previous
sections is for handling so-called ZK widget event
(<javadoc directory="jsdoc">zk.Event</javadoc>). Though rare, you could
register a DOM-level event too by the use of jQuery (API:
<javadoc directory="jsdoc">\_global\_.jq</javadoc>).


