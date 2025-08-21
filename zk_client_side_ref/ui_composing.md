# Overview

![](images/ZKComDevEss_widget_component_application.png)

A UI object visible to a user at the client is hosted by a JavaScript
object[^1] called a widget
([zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)). On the other hand, a
component is a Java object
([org.zkoss.zk.ui.Component](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html)) representing the UI
object at the server that an application manipulates directly. Once a
component is attached to a page, a widget is created at the client
automatically. Furthermore, any state change of the component at the
server will be updated to the widget at the client.

Generally, you need not to know the existence of widgets. Ajax requests
and the state synchronization are handled automatically by ZK and the
components automatically. However, you could instantiate or alert any
client-side widgets directly at the client (in JavaScript). It is the
so-called Server+client fusion.

The rule of thumb is that you should handle events and manipulate UI
mostly, if not all, at the server, since it is more productive. Then,
you could improve the responsiveness and visual effects, and/or reduce
the load of the server by handling them at the client, when it is
appropriate.

Here we describe how to compose UI in JavaScript at the client-side.

- For client-side event handling, please refer to the [Client-side Event Handling]({{site.baseurl}}/zk_client_side_ref/event_listening)
  section.
- For more information about the relationship among components, widgets,
  and DOM, please refer to the [Components and Widgets]({{site.baseurl}}/zk_client_side_ref/components_and_widgets).
- For developing a component, please refer to the [Component Development]({{site.baseurl}}/zk_client_side_ref/component_development)
  section.


# Modify Widget's State at Client

While the states of a widget are maintained automatically if you update
the corresponding component at the server, you could modify the widget
state directly at the server. The modification is straightforward: call
the correct method with the arguments you want. Notice that it is
JavaScript for Ajax browsers.

```javaScript
var foo = zk.Widget.$('$foo');
foo.setValue("What's Up?");
```

For a complete API available to the client-side fusion, please refer to
[JavaScript API](http://www.zkoss.org/javadoc/latest/jsdoc/).

## Fusion with Server-side ZUML and Java

It is suggested that the client-side UI composing is better designed to
minimize the network round-trip, provide effects and other enhancement,
while the most, if not all, of the application is better to be done at
the server. Thus, here we only discuss this kind of addon, aka., fusion.
For pure-client approach, please refer to [Small Talk: ZK 5.0 and Client-centric Approach](https://www.zkoss.org/wiki/Small_Talks/2009/July/ZK_5.0_and_Client-centric_Approach).

Depending on your requirement, there are typically two situations we
could *fuse* the client-side code:

1.  Register a client-side event listener.
2.  Override widget's default behavior

For example, suppose we want to open the drop down when a commbox gains
the focus, then we register a client-side event listener for the onFocus
event as follows.

```xml
<div>
  <combobox xmlns:w="client" w:onFocus="this.open()"/>
</div>
```

As shown, we have to use the [client namespace]({{site.baseurl}}/zuml_ref/client) to indicate
the onFocus attribute which is for the client-side event listener. It is
done by applying [XML namespace](http://www.w3schools.com/xml/xml_namespaces.asp):

- Add the `xmlns:w="client"` attribute
- Prefix `w:` before onFocus

For more information about the client-side event listener, please refer
to the [Event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening)
section.

The other typical situation to fuse the client-side code is to override
the default behavior of a widget. We will discuss it later.

## Find a Widget at Client

Inside a client event listener, you can reference the widget using
`this` and the event using `event`. In the following example, `this`
refers to the label.

```xml
<window xmlns:w="client">
  <label value="change me by click" w:onClick="this.setValue('clicked');"/> 
</window>
```

To retrieve a fellow[^2], you could use
[zk.Widget#$f(_global_.String)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#$f(_global_.String)).
It works in a similar manner as
[org.zkoss.zk.ui.Component#getFellow(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#getFellow(java.lang.String)).
For example,

```javaScript
this.$f('foo').setValue('found');
this.$().foo.setValue('found'); //equivalent to the above statement
```

If you don't have a widget as a reference, you could use
[zk.Widget#$(zk.Object, _global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#$(zk.Object, _global_.Map)).
Notice it assumes there is only one widget with the given ID in all ID
spaces of the desktop. For example,

### find by a DOM element's ID

```javaScript
zk.Widget.$('foo').setValue('found');
```

### find by a component ID

If there is a component in the zul like

```xml
<label id="foo"/>
```

Then you can get its widget by

```javaScript
zk.Widget.$('$foo');
```

### find by DOM element

In addition, you can use jQuery to select a DOM element of a widget[^3].
For example `jq("@window")` will select DOM elements of all window
widgets. And, `jq("$win1")` will select the DOM elements of all widgets
whose ID is `win1`. (see
[\_global\_.jq](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.jq.html)).

```xml
<window xmlns:w="http://www.zkoss.org/2005/zk/client">
    <vbox>
        <label id="labelone" value="click to change"
            w:onClick="this.setValue('changed by click label');" />

        <button label="button"
            w:onClick="this.$f('labelone').setValue('changed by button');" />

        <html><![CDATA[
  <a href="javascript:;" onclick="zk.Widget.$(jq('$labelone')[0]).setValue('changed with jq');">not widget</a>
        ]]></html>      
    
    </vbox>
</window>
```

To determine if an object is a specific widget, you can call
`$instanceof` like:

```javaScript
if (widget.$instanceof(zul.sel.Treeitem)){
    //widget is a Treeitem widget
}
```


# Instantiate Widget at Client

A widget has to be created to make a component visible at the client
(once it has been attached to a page). However, you could instantiate a
widget at the client without the corresponding Java object at the
server. To an extreme extent, you could create all widgets at the client
(of course, this can be costly and less secure).

To instantiate a widget, we can pass all initial values into the
constructor. For example,

```javaScript
zk.load('zul.wnd');
new zul.wnd.Window({
    title: 'Hello, World',
    border: 'normal',
    children: [
        new zul.wgt.Label({value: 'Hi, '}),
        new zul.wgt.Button({
            label: 'Click Me!',
            listeners:  {
                onClick: function (evt) {
                    alert('Hi, you clicked me');
                }
            }
        })
    ]
});
```

- Line 1: Notice that zk widget javascript files are loaded on demand,
  e.g. if there is no window component created, ZK doesn't load window
  widget javascript, but you can enforce loading.

As shown, the initial values are passed as a map. In addition, the
`children` property is used to specify an array of child widgets, and
the `listeners` property to specify a map of listeners.

## Attach Widget to DOM

Once a widget is instantiated, you could attach it to the browser's DOM
tree to make it visible to users[^4]. It can be done in one of two ways:

1.  Make it as a child of another widget that already being attached
2.  Replace or insert it to a DOM element

You could use
[zk.Widget#appendChild(zk.Widget)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#appendChild(zk.Widget))
or
[zk.Widget#insertBefore(zk.Widget, zk.Widget)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#insertBefore(zk.Widget, zk.Widget)).
For example,

```xml
<vlayout>
  <button label="Click Me" xmlns:w="client"
    w:onClick="this.parent.appendChild(new zul.wgt.Label({value: 'Clicked'}))"/>
</vlayout>
```

Besides, we could replace an existing DOM element with a widget (not
attached yet). For example,

```xml
  <n:div id="anchor" xmlns:n="native"/>
  <button label="Click Me" xmlns:w="client"
    w:onClick="new zul.wgt.Label({value: 'Clicked'}).replaceHTML('#anchor')"/>
```

where we use the [native namespace]({{site.baseurl}}/zuml_ref/native) to create a
DOM element and then replace it with the label widget.


## Load Required JavaScript Widget File

ZK Client Engine loads a JavaScript package only when it is required. It
minimizes the memory footprint at the client. However, this also means
that you cannot run your JavaScript code until the required packages
have been loaded. It can be done by the use of
[\_global\_.zk#load(_global_.String, _global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#load(_global_.String, _global_.Function)).
For example, suppose you're not sure if the `zul.wnd` and `zul.grid`
package has been loaded, when you are going to instantiate
[zul.wnd.Window](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wnd.Window.html) and
[zul.grid.Grid](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Grid.html), you could do as
follows.

```javaScript
zk.load("zul.wnd,zul.grid", function () { //load zul.wnd and zul.grid if they aren't loaded yet
     //In this function, you could access zul.wnd.Window and zul.grid.Grid whatever you want
    new zul.wnd.Window({children: [new zul.grid.Grid()]});
});
```

where
[\_global\_.zk#load(_global_.String, _global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#load(_global_.String, _global_.Function))
loads the `zul.wnd` and `zul.grid` packages and then invokes the
function when they have been loaded.

Notice that there is another method for similar purpose called
[\_global\_.zk#aferLoad(_global_.String, _global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#aferLoad(_global_.String, _global_.Function)).
Unlike
[\_global\_.zk#load(_global_.String, _global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#load(_global_.String, _global_.Function)),
[\_global\_.zk#afterLoad(_global_.String, _global_.Function)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zk.html#afterLoad(_global_.String, _global_.Function))
won't load the packages. Rather, it queues the given function and
invokes it when the packages have been loaded. It is useful when you
want to override the default behavior of a widget. We will discuss it
later.

[^1]: It actually depends on the device. For Ajax, it is a JavaScript
    object. For Android devices, it is a Java object.

[^2]: A widget in the same [ID space]({{site.baseurl}}/zk_dev_ref/ui_composing/id_space).

[^3]: Since ZK 5.0.2

[^4]: Notice that a widget is not visible to users unless it is attached
    to the browser's DOM tree.
