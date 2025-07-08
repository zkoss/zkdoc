

By default, ZK creates components based on what is defined in a ZUML
document when loading the document. However, we can defer the creation
of some sections of components, until necessary, such as becoming
visible. This technique is called load-on-demand or render-on-demand.

For example, you could split a ZUML document into multiple pages, and
then load the required ones when necessary. Please refer to the [Load ZUML in Java]({{site.baseurl}}/zk_dev_ref/ui_composing/load_zuml_in_java)
section for how to load a ZUML document dynamically.

It improves the performance both at the server and client sides. It is
suggested to apply this technique whenever appropriate. In addition, ZK
Loader provides a standard on-demand evaluation called *fulfill* to
simplify the implementation as described in the following section.

# Load-on-Demand with the fulfill Attribute

The simplest way to defer the creation of the child components is to use
[the fulfill attribute](zuml_ref/ZUML/Attributes/fulfill). For
example, the
[comboitem]({{site.baseurl}}/zk_component_ref/comboitem) in the
following code snippet will not be created, until the
[combobox]({{site.baseurl}}/zk_component_ref/combobox) receives
the `onOpen` event, indicating that comboitem is becoming visible.

```xml
<combobox fulfill="onOpen">
    <comboitem label="First Option"/>    
</combobox>
```

In other words, if an XML element is specified with the fulfill
attribute, all of its child elements will not be processed until the
event specified as the value of the fulfill attribute is received.

## Specify Target with ID or Implicit Variable

If the event to trigger the creation of children is targeted at another
component, you can specify the target component's identifier in front of
the event name as depicted below.

```xml
<button id="btn" label="show" onClick="content.visible = true"/>
<div id="content" fulfill="btn.onClick">
    Any content created automatically when btn is clicked    
</div>
```

### Create a Tabpanel's Children after It's Selected

```xml
    <tabbox>
        <tabs>
            <tab selected="true">tab 1</tab>
            <tab>tab 2</tab>
        </tabs>
        <tabpanels>
            <tabpanel>
                ..
            </tabpanel>
            <tabpanel fulfill="self.linkedTab.onSelect">
                ...
            </tabpanel>
        </tabpanels>
    </tabbox>
```

## Specify Target with its Path

If the components belong to a different ID space, you can specify a path
before the event name as follows:

```xml
<button id="btn" label="show" onClick="content.visible = true"/>
<window id="content" fulfill="../btn.onClick">
    Any content created automatically when btn is clicked    
</window>
```

## Specify Target with EL Expressions

EL expressions are allowed to specify the target, and it must return a
component, an identifier or a path.

```xml
    <button id="foo" label="click me to show"/>
    <div fulfill="${foo}.onClick">
        created on demand
    </div>
```

## Specify Multiple Fulfill Conditions

If there are multiple conditions to fulfill, you could specify all of
them in the fulfill attribute by separating them with a comma, such as

```xml
<div fulfill="b1.onClick, ${another}.onOpen">
...
</div>
```

# Load Another ZUML on Demand with the fulfill Attribute

You could specify an URI in the fulfill attribute when the fulfill
condition is satisfied (i.e. if a specified event has been received).
The ZUML document of the URI will be loaded and rendered as the children
of the associated component. To specify an URI, just append it to the
condition and separate with an equal sign (=). For example,

```xml
<zk>
    <button id="btn" label="Click to Load"/>
    <div fulfill="btn.onClick=another.zul"/>
</zk>
```

Then, `another.zul` will be loaded when the button is clicked.

Notice that even though you could specify multiple conditions, you could
specify at most one URI. The ZUML document of the URI will be loaded no
matter which condition is satisfied.

```xml
<div fulfill="btn.onClick, foo.onOpen=another.zul"/>
```

If you specify an URI without any conditions, the ZUML document of the
URI will be loaded from the very beginning. In other words, it has the
same effect as using
[include]({{site.baseurl}}/zk_dev_ref/ui_composing/include).

```xml
<div fulfill="=another.zul"/>
```

# The onFulfill Event

After ZK applies the fulfill condition, i.e., creates all descendant
components, it fires the `onFulfill` event with an instance of
[org.zkoss.zk.ui.event.FulfillEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/FulfillEvent.html) to notify the
component for further processing if any.

For example, if you use the `wireVariables` method of the
[org.zkoss.zk.ui.Components](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Components.html) class, you might have to
call `wireVariables` again to wire the new components in the `onFulfill`
event.

```xml
<div fulfill="b1.onClick, b2.onOpen" onFulfill="Components.wireVariables(self, controller)">
    ...
</div>
```
