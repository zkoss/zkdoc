The default implementation of models, such as
[org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html) and
[org.zkoss.zul.DefaultTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DefaultTreeModel.html) assumes all data are
available in the memory. It is not practical if a model has a lot of
data. For huge amount of data, it is suggested to implement your own
model by loading and caching only one portion of data at a time.

To implement your own model for a component it is recommended that you
extend the correct abstract model type. For a ListModel extend from
[org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html), for a GroupsModel
extend [org.zkoss.zul.AbstractGroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractGroupsModel.html) and for a
TreeModel extend [org.zkoss.zul.AbstractTreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractTreeModel.html) as
described in [the Model section]({{site.baseurl}}/zk_dev_ref/mvc/model). To implement a
model that supports sorting, you have to implement
<javadoc type="interface">org.zkoss.zul.ext.Sortable</javadoc> too. Each
time a user requires sorting,
<javadoc type="interface" method="sort(java.util.Comparator, boolean)">org.zkoss.zul.ext.Sortable</javadoc>
will be called and the implementation usually clears the cache and
re-generates the SQL statement accordingly.

Here is some pseudocode for a custom ListModel:

```java
public class FooListModel extends AbstractListModel implements Sortable {
    private int _size = -1;
    private Object[] _cache;
    private int _beginOffset;
    private String _orderBy;
    private boolean _ascending, _descending;
    private Comparator _sorting;
 
    public int getSize() {
        if (_size < 0)
            _size = /**SELECT COUNT(*) FROM ...*/
        return _size;
    }
    public Object getElementAt(int index) {
        if (_cache == null || index < _beginOffset || index >= _beginOffset + _cache.length) {
           loadToCache(index, 100); //SELECT ... FROM .... OFFSET index LIMIT 100
                //if _ascending, ORDER BY _orderBy ASC
                //if _descending, ORDER BY _orderBy DSC
        }
        return _cache[index - _beginOffset];
    }
    @Override
    public void sort(Comparator cmpr, boolean ascending) {
        _cache = null; //purge cache
        _size = -1; //so size will be reloaded
        _descending = !(_ascending = ascending);
        _orderBy = ((FieldComparator)cmpr).getRawOrderBy();
        _sorting = cmpr;
             //Here we assume sort="auto(fieldName)" is specified in ZUML, so cmpr is FieldComparator
             //On other hand, if you specifies your own comparator, such as sortAscending="${mycmpr}",
             //then, cmpr will be the comparator you assigned
        fireEvent(ListDataEvent.CONTENTS_CHANGED, -1, -1);
    }
    @Override
    public String getSortDirection(Comparator cmpr) {
        if (Objects.equals(_sorting, cmpr))
            return _ascending ?  "ascending" : "descending";
        return "natural";   
    }
}
```

The implementation of
<javadoc type="interface" method="sort(java.util.Comparator, boolean)">org.zkoss.zul.ext.Sortable</javadoc>
generally has to purge the cache, store the sorting direction and field,
and then fire
<javadoc method="CONTENTS_CHANGED">org.zkoss.zul.event.ListDataEvent</javadoc>
to reload the content.

The field to sort against has to be retrieved from the given comparator.
If you specify `"auto(fieldName)"` to
<javadoc method="setSort(java.lang.String)">org.zkoss.zul.Listheader</javadoc>,
then the comparator is an instance of
[org.zkoss.zul.FieldComparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/FieldComparator.html), and you could retrieve
the field's name from
<javadoc method="getRawOrderBy()">org.zkoss.zul.FieldComparator</javadoc>.

If you'd like to use your own comparator, you have to carry the
information in it and then retrieve it back when
<javadoc type="interface" method="sort(java.util.Comparator, boolean)">org.zkoss.zul.ext.Sortable</javadoc>
is called.

Also notice that we cache the size to improve the performance, since
<javadoc method="getSize()" type="interface">org.zkoss.zul.ListModel</javadoc>
might be called multiple times.

Here is some pseudo for a custom TreeModel which renders an Apache
Commons VFS FileObject to be able to browse a filesystem:

```java
public class VfsTreeModel extends AbstractTreeModel<FileObject> {
    public VfsTreeModel(FileObject root){
        super(root);
    }
    
    @Override
    public FileObject getChild(FileObject parent, int index) {
        FileObject child = null;
        try {
            FileObject[] children = parent.getChildren();
            child = children[index];
        } catch (FileSystemException e) {
            throw new IllegalArgumentException(e);
        }
        return child;
    }

    @Override
    public int getChildCount(FileObject node) {
        int childCount = 0;
        try {
            FileType type = node.getType();
            if( type == FileType.FOLDER ){
                childCount = node.getChildren().length;
            }
        } catch (FileSystemException e) {
            throw new IllegalArgumentException(e);
        }
        return childCount;
    }

    @Override
    public boolean isLeaf(FileObject node) {
        boolean isLeaf = false;
        try {
            FileType type = node.getType();
            isLeaf = (type == FileType.FILE );
        } catch (FileSystemException e) {
            throw new IllegalArgumentException(e);
        }
        return isLeaf;
    }
    /*
     * Return the sibling index of each node in walk down from the root. 
     */
    @Override
    public int[] getPath(FileObject node) {
        List<Integer> paths = new ArrayList<Integer>();
        try {
            // walk upwards to root getting sibling index of each child in each parent
            FileObject parent = node.getParent(); 
            while (parent != null && parent.getType().equals(FileType.FOLDER)) {
                FileObject[] children = parent.getChildren();
                for( int index = 0; index < children.length; index++){
                    FileObject c = children[index];
                    if( node.equals(c)){
                        paths.add(index);
                        break;
                    }
                }
                node = parent;
                parent = node.getParent();
            }
        } catch (FileSystemException e) {
            throw new IllegalArgumentException(e);
        }
        int[] p = new int[paths.size()];
        for( int index = 0; index < paths.size(); index++){
            p[index] = paths.get(p.length - 1 - index); // reverse
        }
        return p;
    }
}
```

When many treerows are open and further rows are expanded the
re-rendering of the tree may visit many of the open rows. It is
therefore recommended that you cache the results of any expensive calls
where possible with a suitable eviction strategy.

For a real example, please refer to [Small Talk: Handling sortable huge data using ZK](https://www.zkoss.org/wiki/Small_Talks/2011/March/Handling_sortable_huge_data_using_ZK)
and/or [Small Talk: Handling huge data using ZK](https://www.zkoss.org/wiki/Small_Talks/2009/July/Handling_huge_data_using_ZK).

# Version History

| Version | Date       | Content            |
|---------|------------|--------------------|
| 6.0.0   | 02/03/2012 | Sortable interface |
