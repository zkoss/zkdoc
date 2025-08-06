---
title: "Data-Swipeable"
---

`ZK EE tablet only`

Each layout region in borderlayout can support the closing and opening
of the region area by user's swipe on the edge of the region with
client/attribute[^1].

```xml
<div xmlns:ca="client/attribute">
  <borderlayout xmlns:ca="client/attribute" ca:data-swipeable="true">
  whatever_value_you_want
  </borderlayout>
</div>
```

Tabbox supports the switching of tabs by user swiping on the edge of the
content with client attribute[^2].

```xml
<div xmlns:ca="client/attribute">
  <tabbox xmlns:ca="client/attribute" ca:data-swipeable="true">
  whatever_value_you_want
  </tabbox>
</div>
```

Within Tree, Grid, and Listbox, Paging can support the navigation to the
previous or the next page by user swiping on the edge of the content
with client attribute[^3].

```xml
<div xmlns:ca="client/attribute">
<listbox mold="paging" pageSize="5" xmlns:ca="client/attribute" ca:data-swipeable="true"></listbox>
</div>
```

Calendar can support the switching of view by user swiping on the
content with client attribute[^4].

```xml
<div xmlns:ca="client/attribute">
<calendar xmlns:ca="client/attribute" ca:data-swipeable="true" />
</div>
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For more information, please refer to [ZK Component Reference Tablet Devices: Borderlayout]({{site.baseurl}}/zk_component_ref/tablet_devices/borderlayout#SwipeEvent_Support).

[^2]: For more information, please refer to [ZK Component Reference Tablet Devices: Tabbox]({{site.baseurl}}/zk_component_ref/tablet_devices/tabbox#SwipeEvent_Support).

[^3]: For more information, please refer to [ZK Component Reference Tablet Devices: Paging]({{site.baseurl}}/zk_component_ref/tablet_devices/paging#SwipeEvent_Support).

[^4]: For more information, please refer to [ZK Component Reference Tablet Devices: Calendar]({{site.baseurl}}/zk_component_ref/tablet_devices/calendar#Friendly_Scrolling_Support).
