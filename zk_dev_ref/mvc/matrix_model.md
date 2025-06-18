

Here we describe how to implement a matrix model
(<javadoc type="interface">org.zkoss.zkmax.zul.MatrixModel</javadoc>).
For the concept of component, model and renderer, please refer to [the
Model-driven Display
section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

By default, ZK does not provide a built-in model implementation class
for *MatrixModel* because [
Biglistbox]({{site.baseurl}}/zk_component_ref/data/biglistbox) is
designed to handle unlimited data set, therefore, there is no need to
handle model data in memory. This usage is application-dependent and
varies from case to case. However, you can extend your own
implementation from the
<javadoc type="interface">org.zkoss.zul.AbstractListModel</javadoc>
skeleton class.

To implement a *MatrixModel*, one needs to consider the performance
issue that handles a huge data set in memory with Java Collection
Framework. The issue is when using the default implementation of <i>Java
Collection Framework</i> as it goes through every entry to gather the
value of <b><i>hashCode</i></b> when searching the key in <b>Map/Set</b>
or to check every entry for <b>equals</b> and <b>toString</b> functions.
This implementation method greatly reduces the performance of
<i><b>Biglistbox</b></i>. Therefore, to use the <i><b>Biglistbox</b></i>
component with <b><i>MatrixModel</i></b>, we need to implement a clever
and simple <b><i>List</i></b> for traversing huge data sets.

## FakerKeyList

In this example, we create a *FakerKeyList* to implement the *List*
interface for *MatrixModel* to handle the partial big data in memory.

```java
private class FakerKeyList<T> extends AbstractList<T> {
    final int _size;
    Map<String, T> _updateCache = new HashMap<String,T> ();
    final Fun<?> _fn;
    final String _key;

    public FakerKeyList(int size, int key, Fun<?> fn) {
        _size = size;
        _key = key + "_" + size;
        _fn = fn;
    }

    @Override
    public T get(int index) {
        // if changed, returns the changed value
        Object val = _updateCache.get(String.valueOf(index));
        if (val != null)
            return (T) val;
        return (T) _fn.apply(index);
    }

    @Override
    public int hashCode() {
        return _key.hashCode();
    }
        
    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;
        if (obj instanceof FakerKeyList) {
            return _key.equals(((FakerKeyList)(obj))._key);
        }
        return false;
    }
    
    @Override
    public String toString() {
        return _key;
    }

    // omitted...
}
```

As you can see, we use a **key** string as the key for <i>toString</i>,
<i>hashCode</i>, and <i>equals</i> methods to speed up searching time.
**Fun** class on the other hand, is a handy class to render the model
data for this example.

## FakerMatrixModel

In this example, we create a <b>FakerMatrixModel</b> to implement
<b>MatrixModel</b>. Following is the fragment code:

```java
public class FakerMatrixModel<Head extends List, Row extends List, Cell, Header> extends
        AbstractListModel<Row> implements MatrixModel<Row, Head, Cell, Header>, Sortable {

    // omitted...

    private boolean _sortDir = true;

    @Override
    public Row getElementAt(int index) {
        final int rowIndex = _sortDir ? index : getSize() - index - 1; // handle the sorting
        final String key = String.valueOf(rowIndex);
        List<String> value = _rowCache.get(key);
        if (value == null) {
            value = new FakerKeyList<String>(_colSize, rowIndex, new Fun() {
                @Override
                public Object apply(int index) {
                    return "y = " + rowIndex;
                }});
            _rowCache.put(key, value);
        }
        return (Row) value;
    }

    // omitted...
}
```

<b>MatrixModel</b> is extended from the **ListModel** interface and uses
the **getElementAt(int)** method to receive row data from the
**FakerKeyList** object that implements the **List** interface.

## Sortable Model

The <b>MatrixModel</b> can also support
<javadoc type="interface">org.zkoss.zul.ext.Sortable</javadoc>
interface. In your implementor class you can just implement the
<javadoc type="interface">org.zkoss.zul.ext.Sortable</javadoc> interface
and provide
<javadoc method="sort(java.util.Comparator, boolean)">org.zkoss.zul.ext.Sortable</javadoc>
and
<javadoc method="getSortDirection(java.util.Comparator)">org.zkoss.zul.ext.Sortable</javadoc>
methods.

For example,

```java
    public void sort(Comparator cmpr, boolean ascending) {
        _sorting = cmpr;
        _sortDir = ascending;
        fireEvent(ListDataEvent.STRUCTURE_CHANGED, -1, -1);
    }

    @Override
    public String getSortDirection(Comparator cmpr) {
        if (Objects.equals(_sorting, cmpr))
            return _sortDir ? "ascending" : "descending";
        return "natural";
    }
```

As you can see, we fire a data change event with
*ListDataEvent.STRUCTURE_CHANGED* attribute to notify the component that
model data has been changed.

## Notify for Data Updates

*MatrixModel* is the same as *ListModel* when notify for data updates,
please refer to [
ListMode#Notify_for_Data_Updates]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Notify_for_Data_Updates)

## Resource

All of the examples above can be found here - [Github's FakerMatrixModel
source
code](https://github.com/zkoss/zk/blob/master/zktest/src/org/zkoss/zktest/test2/big/FakerMatrixModel.java)

# Version History

| Version | Date       | Content                                        |
|---------|------------|------------------------------------------------|
| 6.0.1   | March 2012 | The Biglistbox and MatrixModel were introduced |
