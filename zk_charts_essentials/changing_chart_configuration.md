---
title: "Changing Chart Configuration"
---

ZK Charts provides a set of comprehensive
[API](http://www.zkoss.org/javadoc/latest/zkcharts/) for chart
configuration options. You can change a chart's appearance including
title, series, tooltip, x/y axis, legend, data labels...etc by simply
calling API. For example, if you want to change the title's
configuration, we can call `chart.getTitle()` to get the
[org.zkoss.chart.Title](https://www.zkoss.org/javadoc/latest/zkcharts/org/zkoss/chart/Title.html) class then
modify its attributes as below:

```java
    // Get the title option of chart
    Title title = chart.getTitle();

    // Set some attributes
    title.setText("It's a title");
    title.setX(100);
    title.setY(250);
```

Of course you can also create a new
[org.zkoss.chart.Title](https://www.zkoss.org/javadoc/latest/zkcharts/org/zkoss/chart/Title.html) class and
assign it to chart:

```java
    // Create a new Title
    Title title = new Title();

    // Set some attributes
    title.setText("Yet another title");
    title.setX(200);
    title.setY(400);

    // Assign title to chart
    chart.setTitle(title);
```

# Look For Features You Need

ZK Charts is a ZK component that integrates Highcharts, please check
[ZK Charts Demo](https://www.zkoss.org/zkchartsdemo), [Highcharts Demo](https://www.highcharts.com/demo), or [Highcharts API Reference](https://api.highcharts.com/highcharts/) for features you want
and find the corresponding configuration options.

# The API Corresponding to Highcharts Options

Since [Highcharts](https://www.highcharts.com/) is the client-side widget ZK
Charts integrates, we design ZK Charts' API mapping to [Highcharts options](https://api.highcharts.com/highcharts/). ZK Charts has
corresponding Java APIs (getter/setter) for most Highcharts options.

For example, assuming the option below you want to use is:

## Highcharts option

[plotOptions.line.enableMouseTracking](https://api.highcharts.com/highcharts/plotOptions.line.enableMouseTracking)

## Corresponding ZK Charts API

Each option has a getter and setter Java API in zkcharts:

- getter: `chart.getPlotOptions().getLine().isEnableMouseTracking()`
- setter:
  `chart.getPlotOptions().getLine().setEnableMouseTracking(false)`

So you can check [Highcharts configuration options](https://api.highcharts.com/highcharts/) first for an option's
function then call the corresponding Java API.

Please see [Highcharts API reference](https://api.highcharts.com/highcharts/) for complete options and its description.

# Supported Version

Please remember to check which Highcharts version is available for an
option.

![](images/zkcharts-essentials-apiVersion.jpg)

You can know the version of Highcharts bundled in ZK Charts by checking
`chart.wpd` in a developer tool. (search **Highcharts**)

![](images/zkcharts-essentials-highchartsVersion.png)

## Notes for Highcharts 12

ZK Charts 12.5 bundles Highcharts 12.5. Most chart configuration through ZK
Charts Java APIs works the same way, but custom JavaScript that directly uses
Highcharts internals might need changes:

- Date and time labels use the page or browser locale by default. If you need
  the previous English-style output, set `lang.locale`, or explicitly configure
  `xAxis.dateTimeLabelFormats` and related time format options.
- Internal series arrays such as `series.xData`, `series.yData`,
  `series.processedXData`, and `series.processedYData` were removed. Use
  Highcharts' `series.getColumn()` in custom JavaScript instead.
- Highcharts modules no longer expose an initialization function in JavaScript
  module imports. If your application loads Highcharts modules outside ZK Charts,
  import or load the module itself instead of calling a returned factory function.

# Use addExtraAttr() for Options without Setter

If you find there is a Highcharts option without a corresponding ZK
Charts API, you can still set the option with the `addExtraAttr()` method.
For example, there is an option [series / fillOpacity](https://api.highcharts.com/highcharts/series%3Carea%3E.fillOpacity)
without a setter available.

![](images/zkcharts-essentials-fillOpacity.png)

Thus, you can set it like:

```java
public class OptionsWithouApiComposer extends SelectorComposer<Window> {

    @Wire
    Charts chart;
    private float opacity = 0.5f;

    public void doAfterCompose(Window comp) throws Exception {
        //omitted code
 
        chart.getSeries().addExtraAttr("fillOpacity", new AnyVal<Float>(opacity));
    }
}
```

Another example:

```java
chart.getPlotOptions().getColumnRange().addExtraAttr("grouping", new AnyVal<Boolean>(false));
```
