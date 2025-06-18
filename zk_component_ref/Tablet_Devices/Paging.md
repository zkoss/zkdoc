

# Paging

- Component Reference:
  [Paging]({{site.baseurl}}/zk_component_ref/paging)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# SwipeEvent Support

Within Tree, Grid, and Listbox, Paging can support to navigate previous
page or next page by user swipe on the edge of content with client
attribute.

```xml
<listbox mold="paging" pageSize="5" xmlns:ca="client/attribute" ca:data-swipeable="true"></listbox>
```

![](/zk_component_ref/images/Paging_Tablet_Example.png)

# Version History

| Version | Date       | Content                                                                                                         |
|---------|------------|-----------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Grid/List/Tree support changing page by swipe event on tablet device](http://tracker.zkoss.org/browse/ZK-1283) |


