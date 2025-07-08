Sending out a listbox/grid/tree with a lot of items to the client is
expensive. In addition, the JavaScript engines of some browsers are not
good for initializing a listbox/grid/tree with a lot of items. A better
solution is to use the live data, i.e., by assigning a model (such as
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html)) to it.
Then, the items are sent to the client only if they become visible.

In addition, the performance will be improved more if you also use the
paging mold such as

```xml
<listbox model="${mymodel}" mold="paging">
...
```

For more information of using and implementing a model, please refer to
[the Model section]({{site.baseurl}}/zk_dev_ref/mvc/model) and
[ZK Component Reference: Listbox]({{site.baseurl}}/zk_component_ref/listbox#Live_Data).

{{ ZKDevelopersReferencePageFooter}}
