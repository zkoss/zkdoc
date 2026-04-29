---
title: "Create your first ZK Charts"
---

In this section, we will show how to create your first ZK Charts
component step by step.

# A Very Basic Chart

First, declare a chart component in a ZUML document. Specify `type` and
`title` properties.

## chart.zul

```xml
<charts id="chart" type="line" title="Season Average Temperature" 
    apply="org.zkoss.zkcharts.essentials.FirstChartComposer"/>
```

Use model to handle chart data, and set model to chart in a Controller
which extends [org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html)

## First ChartComposer.java

```java
public class FirstChartComposer extends SelectorComposer<Component> {
    @Wire
    Charts chart;

    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        // Create a predefined implementation category model
        CategoryModel model = new DefaultCategoryModel();

        // Set value to the model
        model.setValue("Tokyo", "Spring", 11);
        model.setValue("Tokyo", "Summer", 20);
        model.setValue("Tokyo", "Fall", 16);
        model.setValue("Tokyo", "Winter", -2);
        model.setValue("New York", "Spring", 6);
        model.setValue("New York", "Summer", 12);
        model.setValue("New York", "Fall", 10);
        model.setValue("New York", "Winter", 2);

        // Set model to the chart
        chart.setModel(model);
    }
}
```

After that, you can easily obtain an amazing chart to visualize your
data.

![](images/FirstChart.png)

## Change Configuration

Moreover, if you want to change the configuration, you can add
additional declarations in the composer:

```java
    // Get the legend option in chart
    Legend legend = chart.getLegend();

    // Change legend's layout to vertical
    legend.setLayout("vertical");

    // Change legend's alignment
    legend.setAlign("right");
    legend.setVerticalAlign("middle");

    // Remove legend's border
    legend.setBorderWidth(0);
```

The [org.zkoss.chart.Legend](https://www.zkoss.org/javadoc/latest/zkcharts/org/zkoss/chart/Legend.html) of
chart will be moved to the right of the chart without border.

![](images/FirstChartSettings.png)
