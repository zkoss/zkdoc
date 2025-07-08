

# Listbox

- Component Reference:
  [Listbox]({{site.baseurl}}/zk_component_ref/listbox)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# Friendly Scrolling Support

When user swipe on the content of Listbox, the friendly scrollbar will
appear.

![](/zk_component_ref/images/Listbox_Tablet_Example.png)

**Note 1:** to disable the friendly scrollbar, please use the following
setting.

```xml
<listbox xmlns:a="client/attribute" a:data-scrollable="false"/>
```

**Note 2:** to make sure the friendly scrollbar works correctly when
containing images inside listcell, please add image preload attribute as
follows.

```xml
<listbox>
    <custom-attributes org.zkoss.zul.image.preload="true"/>
</listbox>
```

# Version History

| Version | Date       | Content                                                                                                                            |
|---------|------------|------------------------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Grid, Listbox, Tree can support to scroll the content by finger on tablet/mobile device](http://tracker.zkoss.org/browse/ZK-1239) |


