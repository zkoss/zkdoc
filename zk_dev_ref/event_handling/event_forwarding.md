# Overview

For easy programming, ZK does not introduce any complex event flow. When
an event is sent to a target component, only the event listeners
registered for the target component will be called. It is the
application's job to forward an event to another component if necessary.

For example, you might have a menu item and a button to trigger the same
action, say, opening a dialog, and then it is more convenient to have a
single listener to open the dialog, and register the listener to the
main window rather than register to both the menu item and button.

# Event Forwarding in Java

Forwarding an event is straightforward: just posting or sending the
event again. However, there is a better way:
[composer]({{site.baseurl}}/zk_dev_ref/mvc/controller/composer).
The composer can be the central place to handle the events. For example,
you could invoke `openDialog` in the event handler for the menu item and
button as shown below:

```java
public class FooComposer extends SelectorComposer {
   @Listen("onClick = menuitem#item1; onClick = button#btn")
   private void openDialog() {
     //whatever you want
   }
}
```

# Event Forwarding in ZUML

Event forwarding can be done with [the forward attribute](ZUML_Reference/ZUML/Attributes/forward) in ZUML.
For example,

```xml
<window id="mywin">
    <button label="Save" forward="onSave"/>
    <button label="Cancel" forward="onCancel"/>
</window>
```

Then, `window` will receive the `onSave` event when the Save button is
clicked.

With this approach we could introduce an abstract layer between the
event and the component. For example, `window` needs only to handle the
`onSave` event without knowing which component causes it. Therefore, you
could introduce another UI to trigger onSave without modifying the event
listener. For example,

```xml
    <menuitem label="Save" forward="onSave"/>
```

Of course, you can use the composer and ZUML's forward together to have
more maintainable code.

```java
public class BetterComposer
extends org.zkoss.zk.ui.select.SelectorComposer {
    @Listen("onSave = #mywin")
    public void doSave(ForwardEvent event) { //signature if you care about the event
        ...
    }
    @Listen("onCancel = #mywin")
    public void doCancel() { //signature if you don't care about the event
        ...
```

Notice that, as shown above, the event being forwarded is wrapped as an
instance of <javadoc>org.zkoss.zk.ui.event.ForwardEvent</javadoc>. To
retrieve the original event, you could invoke
<javadoc method="getOrigin()">org.zkoss.zk.ui.event.ForwardEvent</javadoc>.

## Using a component Path

You can also use a component
[Path]({{site.baseurl}}/zk_dev_ref/access_ui_components_with_path)
within your ZUML pages to specify a target component to which you would
like to forward a specific event. This is especially useful if you want
to forward events across different
[IdSpace]({{site.baseurl}}/zk_dev_ref/ui_composing/id_space)
such as forwarding events from a component in an included ZUML page to
the main page component. For example,

```xml
<?page id="mainPage" ?>
<window id="mainWindow" apply="BetterComposer">
...
    <include src="incDetails.zul" />
...
</window>
```

Now in your included page use
[Path]({{site.baseurl}}/zk_dev_ref/access_ui_components_with_path)
while forwarding events to mainWindow `Window` component.

```xml
   <button forward="//mainPage/mainWindow.onSave" /> <!-- default forward event is onClick -->
```

## Forward with Parameters

You can specify any application-specific data in the forward attribute
by surrounding it with the parenthesis as shown below:

```xml
 <button forward="onCancel(abort)"/><!-- "abort" is passed -->
 <button forward="onPrint(${inf})"/><!-- the object returned by ${inf} is passed -->
```

Then, you can retrieve the application-specific data by
<javadoc method="getData()">org.zkoss.zk.ui.event.ForwardEvent</javadoc>.

**Notice**: When using <i>forward</i> attribute in the ZUML(.zul) with
ZK MVC controller, you have to get the original event by using
**getOrigin()**, then you can access the data by **getData()**  
\*Example : ZUL

```xml
<tabbox id="ctrl" apply="composer1">
  <tabs>
     <tab id="tb1" label="News" forward="ctrl.onSelectTab(0)"></tab>
     <tab id="tb2" label="News Images" forward="ctrl.onSelectTab(1)"></tab>
  </tabs>
</tabbox>
```

- Example Composer (composer1)

```java
    @Listen("onSelectTab = #ctrl")
    public void doChangeTab(ForwardEvent e) { 
        MouseEvent me = (MouseEvent) e.getOrigin();
        System.out.println(me.getData());
    }
```

## Foward Multiple Events

If you want to forward several events at once, you can specify them in
the forward attribute by separating them with commas **`,`**. For
example,

```xml
 <textbox forward="onChanging=onUpdating, onChange=some.onUpdate"/>
```

In addition, the target component and the event data can be specified in
EL expressions, while the event names cannot.
