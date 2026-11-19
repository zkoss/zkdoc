---
title: "Listbox, Grid and Tree for Huge Data"
description: "Listbox, Grid and Tree for Huge Data: In this section, we will discuss how to make a listbox, grid and tree to serve huge amount of data effectively."
---

In this section, we will discuss how to make a listbox, grid and tree to
serve huge amount of data effectively.

# Show a Skeleton Placeholder While Data Loads

{% include edition-availability.html edition="pe" %} {% include supported-since.html version="11.0.0" %}

While a listbox, grid or tree loads its data, you can show a
[skeleton placeholder]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#skeleton)
in its place. Show the placeholder in the current request, then run the slow
query in a later request with `Events.echoEvent`:

```java
grid.setSkeleton("rect");
Events.echoEvent("onLoadData", grid, null);   // the client shows the placeholder, then sends onLoadData back

@Listen("onLoadData = #grid")
public void loadData() {
    grid.setModel(new ListModelList<>(service.findAll()));  // slow query
    grid.setSkeleton(null);
}
```

The two steps must run in separate requests. Setting the skeleton and then
clearing it in the same request sends both changes in one response, so the
client only sees the last value and never draws the placeholder.

The placeholder improves perceived performance because users see the layout
right away. It does not make loading faster, so keep the query itself lean
with paging or live data. The placeholder does not stop clicks: while the
skeleton is on, clicks on the component itself still reach it, so add your own
guard in the handler if users must not act while the data loads.

Runnable examples in the ZK Component Reference:

- [Grid](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/grid/skeleton.zul)
- [Listbox](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/listbox/skeleton.zul)
- [Tree](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/tree/skeleton.zul)
