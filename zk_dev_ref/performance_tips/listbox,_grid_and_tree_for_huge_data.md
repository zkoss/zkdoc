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
in its place, so users see the layout right away. The placeholder does not
make the query faster, so keep the query lean with paging or live data.

The placeholder must be sent to the browser before the slow query runs. Turn
it on in one request, then run the query in a later request that the client
sends back with `Events.echoEvent`. Use one of the two patterns below.

## Load When the Page Loads

Use this pattern when the page itself should wait for its data. Do not query in
`doAfterCompose`: the page is not sent to the browser until the composer
returns, so the placeholder would never appear. Instead, echo an event from
`doAfterCompose` and run the query when the event arrives:

```java
@Override
public void doAfterCompose(Component comp) throws Exception {
    super.doAfterCompose(comp);
    grid.setSkeleton("rect");
    Events.echoEvent("onLoadData", grid, null);   // the page reaches the browser first
}

@Listen("onLoadData = #grid")
public void loadData() {
    grid.setModel(new ListModelList<>(service.findAll()));  // slow query
    grid.setSkeleton(null);
}
```

## Load After a User Event

Use this pattern when the data loads after a button click or another user
action. The handler turns the skeleton on and echoes the event; the query runs
in the next request:

```java
@Listen("onClick = #load")
public void startLoading() {
    grid.setSkeleton("rect");
    Events.echoEvent("onLoadData", grid, null);   // the client draws the placeholder first
}

@Listen("onLoadData = #grid")
public void loadData() {
    grid.setModel(new ListModelList<>(service.findAll()));  // slow query
    grid.setSkeleton(null);
}
```

## Notes on Both Patterns

The two steps must run in separate requests. Setting the skeleton and then
clearing it in the same request sends both changes in one response, so the
client only sees the last value and never draws the placeholder.

The placeholder does not stop clicks: while the skeleton is on, clicks on the
component itself still reach it, so add your own guard in the handler if users
must not act while the data loads.

## Enable Render on Demand for Large Models

A large grid also costs time to draw. For a grid with a large model, turn on
render on demand so that the grid draws only the rows in view and adds or
removes rows as the user scrolls. Set the `org.zkoss.zul.grid.rod` property on
the grid:

```xml
<grid skeleton="rect">
    <custom-attributes org.zkoss.zul.grid.rod="true"/>
    ...
</grid>
```

See [org.zkoss.zul.grid.rod]({{site.baseurl}}/zk_config_ref/org_zkoss_zul_grid_rod)
and [turn on render on demand]({{site.baseurl}}/zk_dev_ref/performance_tips/turn_on_render_on_demand#grid)
for the details, including the fixed viewport the grid requires.

## Runnable Examples

Runnable examples in the ZK Component Reference:

- Grid, load on page load:
  [skeleton-on-load.zul](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/grid/skeleton-on-load.zul)
  and [SkeletonOnLoadComposer.java](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/java/org/zkoss/reference/component/data/grid/SkeletonOnLoadComposer.java)
- Grid, load after a user event:
  [skeleton-on-event.zul](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/grid/skeleton-on-event.zul)
  and [SkeletonOnEventComposer.java](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/java/org/zkoss/reference/component/data/grid/SkeletonOnEventComposer.java)
- [Listbox](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/listbox/skeleton.zul)
- [Tree](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/data/tree/skeleton.zul)
