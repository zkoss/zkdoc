

# Paging

- Component Reference:
  [Paging](ZK_Component_Reference/Supplementary/Paging)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# SwipeEvent Support

Within Tree, Grid, and Listbox, Paging can support to navigate previous
page or next page by user swipe on the edge of content with client
attribute.

``` xml
<listbox mold="paging" pageSize="5" xmlns:ca="client/attribute" ca:data-swipeable="true"></listbox>
```

<figure>
<img src="Paging_Tablet_Example.png"
title="Paging_Tablet_Example.png" />
<figcaption>Paging_Tablet_Example.png</figcaption>
</figure>

# Version History

| Version | Date       | Content                                                                                                         |
|---------|------------|-----------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Grid/List/Tree support changing page by swipe event on tablet device](http://tracker.zkoss.org/browse/ZK-1283) |


