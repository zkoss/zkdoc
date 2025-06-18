

ZK allows a user to drag particular components around the user
interface. For example, dragging an image representing a file onto a
tree representing a directory, or dragging a listitem representing a
product onto a listbox representing a shopping cart.

A component is droppable, if a user could drop a draggable component to
it.

Notice that ZK does not assume any behavior about what should take place
after dropping. It is up to application developers to implement the
`onDrop` event listener.

If an application doesn't do anything, the dragged component is simply
moved back to where it originated from.

# The draggable and droppable Properties

With ZK, you could make a component draggable by assigning any value,
other than `"false"`, to the draggable property by the use of
<javadoc method="setDraggable(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>.
To disable it, assign it with `"false"`.

```xml
<image draggable="true"/>
```

Similarly, you could make a component droppable by assigning `"true"` to
the droppable property by the use of
<javadoc method="setDroppable(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>.

```xml
<hbox droppable="true"/>
```

Then, the user could drag a draggable component, and then drop it to a
droppable component.

Since the draggable and droppable properties are implemented in
<javadoc>org.zkoss.zk.ui.HtmlBasedComponent</javadoc>, almost all the
components can become draggable or droppable.

# The onDrop Event

Once a user has dragged a component and dropped it to another component,
the component that the user dropped the component to will be notified by
the `onDrop` event. The `onDrop` event is an instance of
<javadoc>org.zkoss.zk.ui.event.DropEvent</javadoc>. By calling
<javadoc method="getDragged()">org.zkoss.zk.ui.event.DropEvent</javadoc>,
you could retrieve what has been dragged (and dropped).

Notice that the target of the `onDrop` event is the droppable component,
not the component being dragged.

The following is a simple example that allows users to reorder list
items by drag-and-drop.

```xml
    Unique Visitors of ZK:
    <listbox id="src" multiple="true" width="300px">
        <listhead>
            <listheader label="Country/Area"/>
            <listheader align="right" label="Visits"/>
            <listheader align="right" label="%"/>
        </listhead>
        <listitem draggable="true" droppable="true" onDrop="move(event.dragged)">
            <listcell label="United States"/>
            <listcell label="5,093"/>
            <listcell label="19.39%"/>
        </listitem>
        <listitem draggable="true" droppable="true" onDrop="move(event.dragged)">
            <listcell label="China"/>
            <listcell label="4,274"/>
            <listcell label="16.27%"/>
        </listitem>
        <listitem draggable="true" droppable="true" onDrop="move(event.dragged)">
            <listcell label="France"/>
            <listcell label="1,892"/>
            <listcell label="7.20%"/>
        </listitem>
        <listitem draggable="true" droppable="true" onDrop="move(event.dragged)">
            <listcell label="Germany"/>
            <listcell label="1,846"/>
            <listcell label="7.03%"/>
        </listitem>
        <listitem draggable="true" droppable="true" onDrop="move(event.dragged)">
            <listcell label="(other)"/>
            <listcell label="13,162"/>
            <listcell label="50.01%"/>
        </listitem>
        <listfoot>
            <listfooter label="Total 132"/>
            <listfooter label="26,267"/>
            <listfooter label="100.00%"/>
        </listfoot>
    </listbox>
    <zscript>
        void move(Component dragged) {
            self.parent.insertBefore(dragged, self);
        }
    </zscript>
```

# Dragging with Multiple Selections

When a user drag-and-drops a list item or a tree item, the selection
status of these items won't be changed. Usually only the dragged item is
moved, but you can handle all the selected items at once by looking up
the set of all selected items as depicted below.

```java
public void onDrop(DropEvent evt) {
    Set selected = ((Listitem)evt.getDragged()).getListbox().getSelectedItems();
    //then, you can handle the whole set at once
}
```

Notice that the dragged item may not be selected. Thus, you may prefer
to change the selection to the dragged item for this case, as shown
below.

```java
Listitem li = (Listitem)evt.getDragged();
    if (li.isSelected()) {
        Set selected = ((Listitem)evt.getDragged()).getListbox().getSelectedItems();
        //then, you can handle the whole set at once
    } else {
        li.setSelected(true);
        //handle li only
}
```

# Multiple Types of Draggable Components

It is common that a droppable component doesn't accept all draggable
components. For example, an e-mail folder accepts only e-mails and it
rejects contacts or others. You could silently ignore non-acceptable
components or alert a message, when `onDrop` is invoked.

To have better visual effect, you could identify each type of draggable
components with an identifier, and then assign the identifier to the
`draggable` property.

```xml
<listitem draggable="email"/>
 ...
<listitem draggable="contact"/>
```

Then, you could specify a list of identifiers to the `droppable`
property to limit what can be dropped. For example, the following image
accepts only `email` and `contact`.

```xml
<image src="/img/send.png" droppable="email, contact" onDrop="send(event.dragged)"/>
```

To accept any kind of draggable components, you could specify `"true"`
to the `droppable` property. For example, the following image accepts
any kind of draggable components.

```xml
<image src="/img/trash.png" droppable="true" onDrop="remove(event.dragged)"/>
```

On the other hand, if the `draggable` property is `"true"`, it means the
component belongs to anonymous type. Furthermore, only components with
the `droppable` property assigned to `"true"` could accept it.

# Drag-and-Drop Effect Customization

The effects of drag-and-drop can be customized. It requires some
client-side programming. Please refer to [ZK Client-side
Reference/customization/Drag-and-Drop
Effects]({{site.baseurl}}/zk_client_side_ref/customization/drag-and-drop_effects)
for more information.
