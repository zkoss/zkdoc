

ZK Charts provides a set of comprehensive
[API](http://www.zkoss.org/javadoc/latest/zkcharts/) for chart
configuration options. You can change a chart's appearance including
title, series, tooltip, x/y axis, legend, data labels...etc by simply
calling API. For example, if you want to change the title's
configuration, we can call `chart.getTitle()` to get the
<javadoc directory="zkcharts">org.zkoss.chart.Title</javadoc> class then
modify its attributes as below:

``` java
    // Get the title option of chart
    Title title = chart.getTitle();

    // Set some attributes
    title.setText("It's a title");
    title.setX(100);
    title.setY(250);
```

Of course you can also create a new
<javadoc directory="zkcharts">org.zkoss.chart.Title</javadoc> class and
assign it to chart:

``` java
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

ZKChart is a ZK component that integrates Highcharts, please check
[ZKChart Demo](https://www.zkoss.org/zkchartsdemo), [Highcharts
Demo](https://www.highcharts.com/demo), or [Highcharts API
Reference](https://api.highcharts.com/highcharts/) for features you want
and find the corresponding configuration options.

# The API Corresponding to Highcharts Options

Since [Highcharts](http://highcharts.com) is the client-side widget ZK
Charts integrates, we design ZK Charts' API mapping to [Highcharts
options](https://api.highcharts.com/highcharts/). ZK Charts has
corresponding Java APIs (getter/setter) for most Hightcharts options.

For example, assuming the option below you want to use is:

## Highcharts option

[plotOptions.line.enableMouseTracking](http://api.highcharts.com/highcharts/plotOptions.line.enableMouseTracking)

## Corresponding ZK Charts API

Each option has a getter and setter Java API in zkcharts:

- getter: `chart.getPlotOptions().getLine().isEnableMouseTracking()`
- setter:
  `chart.getPlotOptions().getLine().setEnableMouseTracking(false)`

So you can check [Highcharts configuration
options](http://api.highcharts.com/highcharts/) first for an option's
function then call the corresponding Java API.

Please see [Highcharts API
reference](https://api.highcharts.com/highcharts/) for complete options
and its description.

# Supported Version

Please remember to check which Highcharts version is available for an
option.

<figure>
<img src="images/zkcharts-essentials-apiVersion.jpg
title="zkcharts-essentials-apiVersion.jpg" />
<figcaption>zkcharts-essentials-apiVersion.jpg</figcaption>
</figure>

You can know the version of Highcharts bundled in ZK Charts by checking
`chart.wpd` in a developer tool. (search **Highcharts**)

<figure>
<img src="images/zkcharts-essentials-highchartsVersion.png
title="zkcharts-essentials-highchartsVersion.png" />
<figcaption>zkcharts-essentials-highchartsVersion.png</figcaption>
</figure>

# Use addExtraAttr() for Options without Setter

If you find there is a Highcharts option without a corresponding ZK
Charts API, you still can set the option with `addExtraAttr()` method.
For example, there is an option [series /
fillOpacity](http://api.highcharts.com/highcharts/series%3Carea%3E.fillOpacity)
without a setter available.

![](images/zkcharts-essentials-fillOpacity.png)

Thus, you can set it like:

``` java
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

``` java
chart.getPlotOptions().getColumnRange().addExtraAttr("grouping", new AnyVal<Boolean>(false));
```
