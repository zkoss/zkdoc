

# Tree

- Component Reference:
  [Tree](ZK_Component_Reference/Data/Tree)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# Friendly Scrolling Support

When user swipe on the content of Tree, the friendly scrollbar will
appear.

![](Tree_Tablet_Example.png)

**Note 1:** to disable the friendly scrollbar, please use the following
setting.

``` xml
<tree xmlns:a="client/attribute" a:data-scrollable="false"/>
```

**Note 2:** to make sure the friendly scrollbar works correctly when
containing images inside treecell, please add image preload attribute as
follows.

``` xml
<tree>
    <custom-attributes org.zkoss.zul.image.preload="true"/>
</tree>
```

# Version History

| Version | Date       | Content                                                                                                                            |
|---------|------------|------------------------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Grid, Listbox, Tree can support to scroll the content by finger on tablet/mobile device](http://tracker.zkoss.org/browse/ZK-1239) |


