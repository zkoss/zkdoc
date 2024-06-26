

# CreateEvent

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zk.ui.event.CreateEvent</javadoc>
- JavaScript API: N/A

# Employment/Purpose

`UiEngine` posts this event to notify a component that all its children
are created and initialized when creating components upon a zul page. So
devs can listen to this event to do your application-specific
initialization logic.

But if you create components on your new statement (e.g. `new Label()`),
not through a zul, ZK doesn't post such an event.

# Notes

## Use with data binding

When the data binder processed a collection of data in, say, a grid or a
listbox, it will detach the original one, and then clone it to represent
each item of the data. For example,

``` xml
<listbox model="@{person.interests}">
    <listitem self="@{each=obj}" value="@{obj}" onCreate="foo()"/>
</listbox>
```

where the execution sequence is as follows.

1.  ZK Loader creates a listbox and a listitem, and posts `onCreate` to
    the listitem (since it has a listener).
2.  The data binder processes all annotations, after all the components
    are created.
    1.  When handling `each`, the data binder detaches the listitem,
        invokes
        <javadoc method="clone()">org.zkoss.zk.ui.Component</javadoc> to
        make a clone for each item (person.interests), and attach the
        clone to the listbox.
3.  The listitem created by ZK Loader receives `onCreate`.

The detail behavior of step 3 is a bit different since 5.0.4. We will
discuss it more detailed in the following sections.

### 5.0.3 and earlier

With 5.0.3 and earlier, only the original listitem (the listitem used as
template to be cloned) will receive `onCreate`. Thus, whatever change
the listener made won't affect the cloned listitems.

In summary, when using data binding with 5.0.3 or earlier, don't use
`onCreate`.

### 5.0.4

Since 5.0.4, the data binder will fire `onCreate` to each cloned
component, so it is safe to use `onCreate` with the data binder.

However, there is one more thing to be noticed: how the event listener
is cloned when a component is cloned. By default, the new component will
share the same listener with the original component. Sometimes, it might
not be correct (for example, the listener might be an inner class that
assumes `this` to be the original component), the event listener shall
implement <javadoc>org.zkoss.zk.ui.util.ComponentCloneListener</javadoc>
to clone the listener by itself. For example,

``` java
public FooCreateListener implements EventListener, ComponentCloneListener {
  private Listitem _item;
  public FooListener(Listitem item) {
    _item = item;
  }
  public Object willClone(Component comp) {
    return new FooListener((Listitem)comp);
  }
  public void onEvent(Event evt) {
   //handle _item
  }
}
```

Instead of implementing
<javadoc>org.zkoss.zk.ui.util.ComponentCloneListener</javadoc>, using
<javadoc method="getTarget()">org.zkoss.zk.ui.event.Event</javadoc>
could be easier to make a listener safe to clone.

``` java
public FooCreateListener implements EventListener, ComponentCloneListener {
  public void onEvent(Event evt) {
    Listitem item = (Listitem)evt.getTarget();
    //then, handle item
  }
}
```

# Supported events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |


