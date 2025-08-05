---
title: "List Model"
---



[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html),
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html), and
[org.zkoss.zul.Tabbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabbox.html) allow developers to separate the
view and the model by implementing
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html). Once the
model is assigned (with
[org.zkoss.zul.Listbox#setModel(org.zkoss.zul.ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#setModel(org.zkoss.zul.ListModel))),
the display of the listbox is controlled by the model, and an optional
renderer. The model is used to provide data, while the renderer is used
to provide the custom look. By default, the data is shown as a
single-column grid/listbox. If it is not what you want, please refer to
[the View section]({{site.baseurl}}/zk_dev_ref/mvc/view) for
writing a custom renderer.

# Model-driven Rendering

![]({{site.baseurl}}/zk_dev_ref/images/drlistmodelrenderer.png)

As shown, the listbox retrieves elements from the specified model[^1],
and then invokes the renderer, if specified, to compose the
[listitem]({{site.baseurl}}/zk_component_ref/listitem) for
the element.

The retrieval of elements is done by invoking
[org.zkoss.zul.ListModel#getSize()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#getSize())
and
[org.zkoss.zul.ListModel#getElementAt(int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#getElementAt(int)).

The listbox will register itself as a data listener to the list model by
invoking
[org.zkoss.zul.ListModel#addListDataListener(org.zkoss.zul.event.ListDataListener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#addListDataListener(org.zkoss.zul.event.ListDataListener)).
Thus, if the list model is not mutable, the implementation has to notify
all the registered data listeners. It is generally suggested to extend
from [org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html), or use any of
the default implementations, which provide a set of utilities for
handling data listeners transparently. We will talk about it later in
[\#Notify for Data Updates](#Notify_for_Data_Updates).

> ------------------------------------------------------------------------
>
> <references/>

# Default ListModel Implementation

In most cases, you can use ZK default implementation of
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html) as the model
without implementing by yourselves:

- [org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html)
- [org.zkoss.zul.ListModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelArray.html)
- [org.zkoss.zul.ListModelSet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelSet.html)
- [org.zkoss.zul.ListModelMap](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelMap.html)

For example,

```java
void setModel(List data) {
    listbox.setModel(new ListModelList(data));
}
```

## Benefit: Optimizing Rendering at the Client-side

When you call a method of `ListModel`, e.g. `add(), remove(), set()`, it
will automatically notify its associated component to render the
differential items instead of re-rendering all items.

# Load All Data into a ListModel

If the amount of your data is small, you could load them all into a
list, map, set or array. Then, you could use one of the default
implementations as described above.

Alternatively, you could load all data when
[org.zkoss.zul.ListModel#getSize()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#getSize())
is called. For example,

```java
public class FooModel extends AbstractListModel {
    private List _data;
    public int getSize() {
        //load all data into _data
        return _data.size();
    }
    public Object getElementAt(int index) {
        return _data.get(index);
    }
}
```

# Load Partial Data into a ListModel

If the data amount is huge, it is not a good idea to load all of them at
once. Rather, you shall load only the required subset. On the other
hand, it is generally not a good idea to load single elements when
[org.zkoss.zul.ListModel#getElementAt(int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#getElementAt(int))
is called since the overhead loading from the database is significant.

Thus, it is suggested to use SQL LIMIT or a similar feature to load only
a subset of data. For example, if the total number of visible elements
is about 30, you could load 30 (or more, say 60, depending on
performance or memory is more important to you). If an element is not
loaded, you have to discard the previously loaded data if any. If the
next invocation of
[org.zkoss.zul.ListModel#getElementAt(int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#getElementAt(int))
is in the subset, we could return it immediately. Here is the pseudo
code:

```java
public class FooModel extends AbstractListModel {
    public List _subset;
    public int _startAt;

    public Object getElementAt(int index) {
        if (index >= _startAt && _subset != null && index - _startAt < _subset.size())
            return _subset.get(index - _startAt); //cache hit
        _subset = new LinkedList(); //drop _subset, and load a subset of data, say, 60, to _subset
        ...
```

For more realistic examples, please refer to [example project](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/mvc/model/listModel.zul).

# Notify for Data Updates

If you build your own `ListModel` implementation, when the data in the
model is changed, the implementation must notify all the data listeners
that are registered by
[org.zkoss.zul.ListModel#addListDataListener(org.zkoss.zul.event.ListDataListener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html#addListDataListener(org.zkoss.zul.event.ListDataListener)).
It can be done by invoking
[org.zkoss.zul.AbstractListModel#fireEvent(int, int, int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html#fireEvent(int, int, int))
if your implementation is extended from
[org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html) or derived.

> ------------------------------------------------------------------------
>
> Notice that if you use one of the default implementations, such as
> [org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html), you don't need to
> worry about it. The notification is handled transparently.

For example, (pseudo code)

```java
public void removeRange(int fromIndex, int toIndex) {
    removeElements(fromIndex, toIndex); //remove elements from fromIndex (inclusive) to toIndex (exclusive)
    fireEvent(ListDataEvent.INTERVAL_REMOVED, fromIndex, index - 1);
}
public void add(int index, Object element){
    addElements(index, element); //add an element at index
    fireEvent(ListDataEvent.INTERVAL_ADDED, index, index);
}
public void set(int index, Object element) {
    setElement(index, element); //change the element at index
    fireEvent(ListDataEvent.CONTENTS_CHANGED, index, index);
}
```

Once a model is assigned to a component, the component will register
itself as a data listener such that any changes can be updated to UI.

Notice that you shall not update the component (such as listbox)
directly. Rather, you shall update the model and then the model shall
fire an event to notify the components to render accordingly.

# Selection

## Select through ListModel

It's important that, once you assign a `ListModel` to a Listbox, you
shall not manipulate a `Listitem` and/or change the selection through a
Listbox API directly. Rather, the application shall **add, remove and
select data items via `ListModel` API**, and let the model notify the
component what has been changed. For example, here are the most 2
commonly used:

- [addToSelection()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html#addToSelection-E-)
- [removeFromSelection()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html#removeFromSelection-java.lang.Object-)

### Get Selection

You can get selected objects by
[getSelection()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html#getSelection--)

```java
private ListModelList<Locale> listModel = new ListModelList<>(Locale.getAvailableLocales());
...
listModel.getSelection().iterator(); //iterate it to get all selected Locale objects
```

## Selection Control

With the multiple selection function in a data model, you have to
implement a class for the
[org.zkoss.zul.ext.SelectionControl](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/SelectionControl.html)
to tell the data model which items are selectable and what it will
perform a "select all" function with. The following implementation
extends
[org.zkoss.zul.AbstractListModel.DefaultSelectionControl](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel/DefaultSelectionControl.html)
and serves as a simple example to change "selectable" items.

Please note that if your data model is much larger, you may implement it
on your own to get rid of the performance impact.

```java
model.setSelectionControl(new AbstractListModel.DefaultSelectionControl(model) {
    public boolean isSelectable(Object e) {
        int i = model.indexOf(e);
        return i % 2 == 0;
    }
});
```

## Custom ListModel Supports Selection

`Interface: `[`org.zkoss.zul.ext.Selectable`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/ext/Selectable`.html)  
`Implementation: Implemented by `[`org.zkoss.zul.AbstractListModel`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/AbstractListModel`.html)

If your data model also provides the collection of selected elements,
you shall also implement
[org.zkoss.zul.ext.Selectable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html). When
using with a component supporting the selection (such as
[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html)), the component will invoke
[org.zkoss.zul.ext.Selectable#isSelected(E)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html#isSelected(E))
to display the selected elements correctly. In addition, if the end user
selects or deselects an item,
[org.zkoss.zul.ext.Selectable#addSelection(E)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html#addSelection(E))
and
[org.zkoss.zul.ext.Selectable#removeSelection(java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html#removeSelection(java.lang.Object))
will be called by the component to notify the model that the selection
is changed. Then, you can update the selection into the persistent layer
(such as database) if necessary.

On the other hand, when the model detects the selection is changed (such
as
[org.zkoss.zul.ext.Selectable#addSelection(E)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html#addSelection(E))
is called), it has to fire the event, such as
[org.zkoss.zul.event.ListDataEvent#SELECTION_CHANGED](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ListDataEvent.html#SELECTION_CHANGED) to notify the component. It will cause the component to
correct the selection[^2].

All default implementations, including
[org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html), implement
[org.zkoss.zul.ext.Selectable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html). Thus,
your implementation generally doesn't need to handle the selection if it
extends one of these classes.

> ------------------------------------------------------------------------
>
> <references/>

# Sorting

`Interface: `[`org.zkoss.zul.ext.Sortable`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/ext/Sortable`.html)  
`Implementation: You have to implement it explicitly`

To support sorting, the model must implement
[org.zkoss.zul.ext.Sortable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Sortable.html) too.
Thus, when the end user clicks the header to request sorting,
[org.zkoss.zul.ext.Sortable#sort(java.util.Comparator, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Sortable.html#sort(java.util.Comparator, boolean))
will be called.

For example, (pseudo code)

```java
public class FooModel extends AbstractListModel implements Sortable {
    public void sort(Comparator cmpr, final boolean ascending) {
        sortData(cmpr); //sort your data here
        fireEvent(ListDataEvent.CONTENTS_CHANGED, -1, -1); //ask component to reload all
    }
...
```

Notice that the `ascending` parameter is used only for reference and you
usually don't need it, since the `cmpr` is already a comparator capable
to sort in the order specified in the `ascending` parameter.

# Version History

| Version | Date          | Content                                                                                                                                                                                                                                                             |
|---------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6.0.0   | February 2012 | All selection states are maintained in the list model. And, the application shall <i>not</i> access the component for the selection. Rather, the application shall invoke [org.zkoss.zul.ext.Selectable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html) for retrieving or changing the selection. |
| 6.0.0   | February 2012 | [org.zkoss.zul.ext.Sortable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Sortable.html) was introduced and replaced `ListModelExt`.                                                                                                                                                          |

[^1]: The listbox is smart enough to read the elements that are visible
    at the client, such as the elements for the active page. It is
    called *Live Data* or *Render on Demand*.

[^2]: Don't worry. The component is smart enough to prevent the dead
    loop, even though the component invokes addSelection to notify the
    model while the model fires the event to notify the component.
