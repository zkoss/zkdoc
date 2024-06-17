Sending out a listbox/grid/tree with a lot of items to the client is
expensive. In addition, the JavaScript engines of some browsers are not
good for initializing a listbox/grid/tree with a lot of items. A better
solution is to use the live data, i.e., by assigning a model (such as
<javadoc type="interface">org.zkoss.zul.ListModel</javadoc>) to it.
Then, the items are sent to the client only if they become visible.

In addition, the performance will be improved more if you also use the
paging mold such as

``` xml
<listbox model="${mymodel}" mold="paging">
...
```

For more information of using and implementing a model, please refer to
[the Model section](ZK_Developer's_Reference/MVC/Model) and
[ZK Component Reference:
Listbox](ZK_Component_Reference/Data/Listbox#Live_Data).

{{ ZKDevelopersReferencePageFooter}}
