# Borderlayout

- Component Reference:
  [Borderlayout](ZK_Component_Reference/Layouts/Borderlayout)
- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# SwipeEvent Support

Each layout region can support to close and open the region area by
user's swipe on the edge of the region with client/attribute.

``` xml
<borderlayout xmlns:ca="client/attribute" ca:data-swipeable="true">
<!-- omitted -->
</borderlayout>
```

<figure>
<img src="Borderlayout_Tablet_Swipe_Example.png"
title="Borderlayout_Tablet_Swipe_Example.png" />
<figcaption>Borderlayout_Tablet_Swipe_Example.png</figcaption>
</figure>

# Friendly Scrolling Support

When user swipe on the content of Layout Region from Borderlayout, the
friendly scrollbar will appear. To enable the friendly scrollbar, please
specify autoscroll to true.

For example,

``` xml
<west title="West" size="20%" autoscroll="true" />
```

<figure>
<img src="Borderlayout_Tablet_Scrolling_Example.png"
title="Borderlayout_Tablet_Scrolling_Example.png" />
<figcaption>Borderlayout_Tablet_Scrolling_Example.png</figcaption>
</figure>

**Note:** to disable the friendly scrollbar, please use the following
setting.

``` xml
<west autoscroll="false"/>
```

# Version History

| Version | Date       | Content                                                                                                             |
|---------|------------|---------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | July, 2012 | [Borderlayout support touch's swipe event to close/open the layout region](http://tracker.zkoss.org/browse/ZK-1245) |
