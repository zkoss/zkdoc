---
title: "Working with ZK Charts"
---

This section details how to build interactive and customized charts
that take advantage of ZK Charts' many features.

- [Manipulating Chart Model]({{site.baseurl}}/zk_charts_essentials/manipulating_chart_model) — feed
  data into the chart with the supplied model classes, with one example
  per chart type.
- [Using Series]({{site.baseurl}}/zk_charts_essentials/using_series) — add data through
  `Series` instead of a model, e.g. for combo charts.
- [Changing Chart Configuration]({{site.baseurl}}/zk_charts_essentials/changing_chart_configuration) —
  map Highcharts options to ZK Charts Java APIs and use
  `addExtraAttr()` for options without a setter.
- [Customizing Chart Style]({{site.baseurl}}/zk_charts_essentials/customizing_chart_style) — themes,
  colors, gradients, HTML axis labels, and data label formatters.
- [Handling Chart Events]({{site.baseurl}}/zk_charts_essentials/handling_chart_events) — listen for
  `ChartsEvent` to react to plot clicks, selection, and drilldown.
- [MVVM Pattern]({{site.baseurl}}/zk_charts_essentials/mvvm_pattern) — wire a `Charts` component
  and access `ChartsEvent` from a ViewModel.
- [Drag Points]({{site.baseurl}}/zk_charts_essentials/drag_points) — enable draggable points and
  forward drag/drop events to the server.
- [Drill Down]({{site.baseurl}}/zk_charts_essentials/drill_down) — built-in drilldown, on-demand
  loading, and a manual multi-series drilldown.
- [Exporting]({{site.baseurl}}/zk_charts_essentials/exporting) — export images/PDF, custom
  exporting menu items, and offline export via `ChartsEngine`.
- [Display Large Number of Data]({{site.baseurl}}/zk_charts_essentials/display_large_number_of_data)
  — strategies for rendering many points.
- [1000 Points Threshold]({{site.baseurl}}/zk_charts_essentials/1000_points_threshold) — what the
  turbo threshold is and how to raise or disable it.
- [Accessibility]({{site.baseurl}}/zk_charts_essentials/accessibility) — load the Highcharts
  accessibility module and configure it from Java.
