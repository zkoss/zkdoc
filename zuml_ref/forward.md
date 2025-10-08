# Syntax

`forward="orginalEvent=targetId1/targetId2.targetEvent"`  
`forward="orginalEvent=targetId1/targetId2.targetEvent(eventData)"`  
`forward="originalEvent=${el-target}.targetEvent(${el-eventdata})"`  
`forward="targetEvent"`

## orginalEvent

Optional. If it is not specified, `onClick` is assumed

## targetId1

Optional. If it's not specified, the **space owner** is assumed. If the
space owner is not a component (a Page), the target is **root
component**.

## eventData

Optional. You could specify any application-specific data in the forward
condition by surrounding it with the parenthesis as shown below.

``` xml
 <button forward="onCancel(abort)"/><!-- "abort" is passed -->
 <button forward="onPrint(${inf})"/><!-- the object returned by ${inf} is passed -->
```

Then, the application-specific data can be retrieved by the use of
[org.zkoss.zk.ui.event.ForwardEvent#getData()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ForwardEvent.html#getData()).

## Multiple forwarding

If you want to forward several events, you can specify all these
conditions in the forward attribute by separating them with the comma `,`:

```xml
 <textbox forward="onChanging=onUpdating, onChange=some.onUpdate"/>
```

# Description

It is used to forward an event, that is targeting a specific component,
to another component in another event name. It is called the forward
condition.

The event listener receives a
[org.zkoss.zk.ui.event.ForwardEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ForwardEvent.html) object. You can
invoke
[org.zkoss.zk.ui.event.ForwardEvent#getOrigin()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ForwardEvent.html#getOrigin())
to retrieve the original event.

The target component and the event data can be specified in EL
expressions, while the event names cannot.

The target component can also be specified using component
[Path](/zk_dev_ref/ui_composing/access_ui_components_with_path)
within ZUML page. This is especially useful if target component is in
different [IdSpace](/zk_dev_ref/ui_composing/id_space)

```xml
   <button forward="//mainPage/mainWindow.onSave" /> <!-- default forward event is onClick -->
```
