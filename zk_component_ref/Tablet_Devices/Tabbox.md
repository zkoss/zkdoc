{% include ZKComponentReferencePageHeader %}

# Tabbox

- Component Reference:
  [Tabbox](ZK_Component_Reference/Containers/Tabbox)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# SwipeEvent Support

Tabbox support to switch the tab by user swipe on the edge of content
with client attribute.

``` xml
<tabbox xmlns:ca="client/attribute" ca:data-swipeable="true">
    <!-- omitted -->
</tabbox>
```

<figure>
<img src="Tabbox_Tablet_Example.png"
title="Tabbox_Tablet_Example.png" />
<figcaption>Tabbox_Tablet_Example.png</figcaption>
</figure>

# Friendly Scrolling Support

When user swipe on the content of Tabpanel, the friendly scrollbar will
appear. To enable the friendly scrollbar, please specify the overflow
style to auto.

For example,

``` xml
<tabpanel style="overflow:auto">
```

<figure>
<img src="Tabbox_Tablet_Scrolling_Example.png"
title="Tabbox_Tablet_Scrolling_Example.png" />
<figcaption>Tabbox_Tablet_Scrolling_Example.png</figcaption>
</figure>

# Version History

| Version | Date       | Content                                                                                               |
|---------|------------|-------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Tabbox support touch's swipe event to switch tab selection](http://tracker.zkoss.org/browse/ZK-1244) |

{% include ZKComponentReferencePageFooter %}
