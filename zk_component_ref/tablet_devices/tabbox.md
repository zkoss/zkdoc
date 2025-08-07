

# Tabbox

- Component Reference:
  [Tabbox]({{site.baseurl}}/zk_component_ref/tabbox)
{% include edition-availability.html edition="ee" %}

# SwipeEvent Support

Tabbox support to switch the tab by user swipe on the edge of content
with client attribute.

```xml
<tabbox xmlns:ca="client/attribute" ca:data-swipeable="true">
    <!-- omitted -->
</tabbox>
```

![](/zk_component_ref/images/Tabbox_Tablet_Example.png)

# Friendly Scrolling Support

When user swipe on the content of Tabpanel, the friendly scrollbar will
appear. To enable the friendly scrollbar, please specify the overflow
style to auto.

For example,

```xml
<tabpanel style="overflow:auto">
```

![](/zk_component_ref/images/Tabbox_Tablet_Scrolling_Example.png)

# Version History

| Version | Date       | Content                                                                                               |
|---------|------------|-------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Tabbox support touch's swipe event to switch tab selection](http://tracker.zkoss.org/browse/ZK-1244) |


