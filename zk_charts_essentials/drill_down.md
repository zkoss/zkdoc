---
title: "Drill Down"
---



Here we talk about 2 ways to achieve a drill-down function. One is
simply using ZK Charts built-in feature, and another is implemented
manually.

# Built-in Drilldown

The simplest way to implement drilldown is to use the built-in feature.
ZK Charts demo has a good example please refer to
<http://www.zkoss.org/zkchartsdemo/column_drilldown>

But under this way, it only can display one series after you drill down
a series. If you need to display multiple series, you need to adopt the
approach mentioned below.

## Drilldown on Demand

In cases where the drill down data is expensive to calculate, you can
add drill down series on demand by listening to
`ChartsEvents.ON_PLOT_DRILL_DOWN` / `ChartsEvents.ON_PLOT_DRILL_UP` and
calling `chart.addSeriesAsDrilldown`.

**org.zkoss.zkcharts.essentials.DrilldownOnDemandComposer**

```java
        chart.addEventListener(ChartsEvents.ON_PLOT_DRILL_DOWN, (ChartsEvent e) -> {
            Point parent = e.getPoint();
            Point[] childPoints = loadPoints(parent); //e.g. from DB
            Series series = new Series(parent.getDrilldown(), childPoints);
            series.setName("Details of " + parent.getName());
            chart.addSeriesAsDrilldown(parent, series);
        });
        chart.addEventListener(ChartsEvents.ON_PLOT_DRILL_UP, e -> { ... });
```

To enable the listeners you need to call `point.setDrilldown()` for each
point (having drill down data) in your initial and in dynamically added
drill down series.

A fully runnable example - featuring *infinite* drill down - is
available in our zkchartsessentials demo project:

- [drilldownOnDemand.zul](https://github.com/zkoss/zkchartsessentials/blob/master/src/main/webapp/drilldown/drilldownOnDemand.zul)

<!-- -->

- [DrilldownOnDemandComposer.java](https://github.com/zkoss/zkchartsessentials/blob/master/src/main/java/org/zkoss/zkcharts/essentials/DrilldownOnDemandComposer.java)

**NOTE:** Until version 3.0.3, this feature requires 2 simple
workarounds mentioned in
[ZKCHARTS-80](https://tracker.zkoss.org/browse/ZKCHARTS-80) and
[ZKCHARTS-81](https://tracker.zkoss.org/browse/ZKCHARTS-81)

# Drill Down Manually

The main benefit to implement drill-down by yourselves is flexibility,
and this way can show multiple series after drilling down a series. But
you have to take care all things during drill-down like UI update and
data loading.

## Remember Drill-down Level

You might have multiple levels of data to drill down, and the controller
needs to know which level the chart's data is to decide loading
corresponding data. We can store the drill-down level as an attribute of
*Charts* component.

```java
package org.zkoss.zkcharts.essentials;

import org.zkoss.chart.Charts;
import org.zkoss.chart.ChartsEvent;
import org.zkoss.chart.model.DefaultCategoryModel;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Button;

/**
 * An example to demonstrate drill-down manually by listening "onPlotClick"<br/>
 * Listening "onPlotDrillDown" is a possible solution, but it will throw an exception when there are multiple series.
 * @author hawk
 *
 */
public class DisplayMultipleSeriesComposer extends SelectorComposer<Component> {

    @Wire
    private Charts chart;
    @Wire("#back")
    private Button backButton;
    
    private DefaultCategoryModel model = new DefaultCategoryModel();
    private String DRILLDOWN_LEVEL = "LEVEL"; 
    
    @Override
    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        chart.getYAxis().setTitle("Values");
        initModel();
        chart.setAttribute(DRILLDOWN_LEVEL, new Integer(0)); 
        updateDrilldownStatus();
    }
...
}
```

- Line 33: We store drill-down level as an attribute of the *Charts*.
  You can store any information to indicate the drill-down status.

## Load Drill-down Data

Now we can implement the drill-down behavior by listening `onPlotClick`
event and replace `model`'s data upon which market of a series you
click.

**org.zkoss.zkcharts.essentials.DisplayMultipleSeriesComposer.java**

```java
    /**
     * Switch the chart's model with corresponding data.  
     */
    @Listen("onPlotClick = #chart")
    public void drilldown(ChartsEvent e){
        Integer level = (Integer)chart.getAttribute(DRILLDOWN_LEVEL);
        if (level == 0){
            model.clear();
            if (MARKET1.equals(e.getCategory())){
                loadDrilldownModel1();
            }else{
                loadDrilldownModel2();
            }
            level++;
            chart.setAttribute(DRILLDOWN_LEVEL, level);
            updateDrilldownStatus();
        }
    }
```

## Drill-up Button

Since we don't use the built-in drill-down feature, we need to create
our own drill-up button.

**displayMultipleSeries.zul**

```xml
<zk>
    <window apply="org.zkoss.zkcharts.essentials.DisplayMultipleSeriesComposer" >
        <charts id="chart" type="column" title="Market Share" 
            subtitle="Click the columns to view regions" width="600"/>
        <button id="back" label="back to All Market" visible="false" 
        style="position: absolute; z-index:100; left:460px; top:40px"/>
    </window>
</zk>
```

- Line 4: The drill-up button is only visible after drilling down a
  series.
- Line 5: We move the button to the up-right corner to make it similar
  with built-in drill-up button.

When users click the drill-up button, we reload back to original data
and change the button's visibility and cursor's style..

**An event listener for drill-up button in
DisplayMultipleSeriesComposer.java**

```java

    @Listen("onClick = #back")
    public void reloadMarket(){
        Integer level = (Integer)chart.getAttribute(DRILLDOWN_LEVEL);
        if (level == 1){
            model.clear();
            initModel();
            level--;
            chart.setAttribute(DRILLDOWN_LEVEL, level);
            updateDrilldownStatus();
        }
    }

    private void updateDrilldownStatus(){
        Integer level = (Integer)chart.getAttribute(DRILLDOWN_LEVEL);
        if (level == 0){
            chart.getPlotOptions().getSeries().setCursor("pointer");
            backButton.setVisible(false);
        }else{
            chart.getPlotOptions().getSeries().setCursor("normal");
            backButton.setVisible(true);
        }
    } 
```
