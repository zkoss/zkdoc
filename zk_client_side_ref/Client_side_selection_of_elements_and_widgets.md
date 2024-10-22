# Client-side selection of elements and widgets

ZK client-side architecture is based on HTML DOM nodes and JavaScript
objects (ZK Widgets). The widget exists in the browser JavaScript
context and is a client-side representation of a Server-side Java ZK
component. Some client-side scenarios may require accessing the DOM node
or the widget representing a specific UI entity. For example, when
creating an automated test on client side, selecting the right DOM node
is useful to check that the browser state is correct, and selecting a
widget can be useful to read states or trigger workflows.

More technical information are available in the [ZK client
API](https://www.zkoss.org/javadoc/latest/jsdoc/_global_/jq.html).

## jQuery selectors in pure JavaScript

The [library
selectors](https://api.jquery.com/category/selectors/%7CjQuery) can
target one or multiple UI objects using the selector syntax.

For example, the DOM element with the ‘id=”object1”’ attribute can be
targeted using the selector “#object1”. Using a similar syntax a
selector targeting every DOM holding the class “class1” would be
“.class1”.

These selectors are generally used in the jQuery shorthand selector
function \$. \$(“#object1”) or \$(“.class1”)

More information on default selection in jQuery in the
\[<https://learn.jquery.com/using-jquery-core/selecting-elements/>\|
official documentation\].

in pure html:

``` xml
  <div id="div1"></div>
  <script>
    console.log("scroll position: " + $('#div1').scrollTop());
  </script>
```

## ZK selectors and jQuery selection in a ZK page

### The Jq function

ZK client engine include a version of jQuery selection accessible using
the `window.jq()` function – or `jq()` for short.

This `jq` function can be used to select DOM elements in the same way
the default `$()` function in standard jQuery.

For example, `$("#object1")` in standard jQuery is equlivalent to
`jq("#object1")` in a ZK page. It will return a jQuery selection of DOM
nodes matching the criteria id=”object1”

in a zk page:

``` xml
    <div sclass="class1"><div>
    <script>
        console.log("scroll position: " + jq(".class1').scrollTop());
    </script>
```

### The zk function

The zk function can be used with the same selector syntax as the `jq`
function, but will select ZK widgets instead of selecting DOM nodes. ZK
widgets are pure abstract JavaScript objects. Most of the time, they are
tied to a DOM node, but an object can exist in memory while not attached
to a page – for example, if they are set to render on-demand.

ZK widgets (client-side JavaScript objects) usually have an API closely
resembling that of their matching ZK component (server-side Java
objects). When accessing a ZK widget, getters and setters for most
attributes are available, as well as triggers for some UI events (click,
size, etc).

See the [ZK client API](https://www.zkoss.org/javadoc/latest/jsdoc/) for
full API information.

The `zk()` function will return a zk selection object (which might refer
to more than one target), but the most useful function is the `zk.$()`,
which will return the first widget matching the selector criteria
directly. This is especially useful when the criteria are expected to
return only one result. For example, the `zk.$('$object1')` will return
the widget associated with the server-side component declared with
id=”object1”

In a zk page:

``` xml
    <textbox id="tb"/>
    <script>
        console.log("client-side textbox value: "zk.$("$tb").getValue());
    </script>
```

## ZK specific selectors

In addition of the default selectors, ZK adds the following:

### \$ - ZK component Id selector.

The "\$" selector will match ZK Server-side component IDs. In a ZK page,
components ID are not visible on client-side. Instead, a UUID (universal
unique ID) is generated for each component. Theses IDs are unique to the
component instances and are visible on client-side as the id of the DOM
nodes representing a ZK component.

Using the \$ selector, it is possible to retrieve an object based on the
component id.

``` xml
    <textbox id="tb"/>
    <script>
        console.log("client-side textbox value: "zk.$("$tb").getValue());
    </script>
```

### @ - ZK component name selector

The "@" selector will match ZK components names. For example, if a
<textbox/> component is created in a zul page, objects matching this
component can be selected using the “@textbox” selector.

``` xml
    <textbox id="tb"/>
    <script>
        console.log("client-side textbox value: "zk.$("@textbox").getValue());
    </script>
```

### DOM node selector

The zk and jq functions can accept a DOM node as input. In this case,
the zk() function will return the widget associated with the DOM node
(if any), and the jq() function will return the jQuery object wrapping
this DOM node.

In a zk page:

``` xml
    <textbox id="tb"/>
    <script>
        var domNode = jq("$tb")[0];
        console.log("client-side textbox value: "zk.$(domNode).getValue());
    </script>
```

### Zk and jq interoperability

The zk() function can accept as parameter a jQuery object returned from
the jq function, and will return the ZK widget associated with the jq
selection.

The jq() function can accept a zk widget as parameter and will return
the jQuery wrapper object for the main DOM node associated with the
widget.

In a zk page:

``` xml
    <textbox id="tb" sclass="class1"/>
    <script>
        var jqObject = jq("$tb");
        console.log("client-side textbox value: "zk.$(jqObject).getValue());

        var zkWidget = zk.$("$tb");
        console.log(jq(zkWidget).hasClass="class1"?"class found":"class not found");
    </script>
```

## Zk widget DOM node selection

ZK widgets all possess a widget.\$n() function, which will return the
main DOM node associated with the widget.

The widget.\$n() can also accept a sub-node name as parameter. In this
case, the function will return the sub-node holding the matching name if
any. For example: listboxwidget.\$n('body') will return the “body”
subnode of the listbox widget. However, if called on a textbox widget
(which doesn’t have a “body” subnode), the result would be empty.

In a zk page:

``` xml
    <textbox id="tb" sclass="class1"/>
    <script>
        var zkWidget = zk.$("$tb");
        console.log("DOM node: " + zkWidget.$n());
    </script>
```
