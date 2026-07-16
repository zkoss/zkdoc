---
title: "Chart"
description: "Chart: A chart is used to show a set of data as a graph. It helps users to judge things with a snapshot."
---

- **Demonstration:** [Chart](https://www.zkoss.org/zkdemo/chart/pie_chart)
- **Java API:** [org.zkoss.zul.Chart](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Chart.html)
- **JavaScript API:** [zul.wgt.Chart](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Chart.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A `chart` is used to show a set of data as a graph. It helps users to
judge things with a snapshot. To use a chart component , developers must
prepare a `ChartModel` and a `ChartEngine`. Developers also set proper
chart type, and the threeD (3D) attribute to draw a proper chart. The
model and type must match each other, or the result is unpredictable.
The 3D chart is not supported on all chart types.

## Common Use Cases

### Bar Chart with CategoryModel

Use `type="bar"` together with a `CategoryModel` to compare values across categories.

```xml
<zscript><![CDATA[
    import org.zkoss.zul.*;
    CategoryModel salesModel = new SimpleCategoryModel();
    salesModel.setValue("Revenue", "Q1", new Integer(120));
    salesModel.setValue("Revenue", "Q2", new Integer(150));
    salesModel.setValue("Revenue", "Q3", new Integer(130));
    salesModel.setValue("Revenue", "Q4", new Integer(170));
]]></zscript>
<chart type="bar" title="Sales" width="600px" height="300px"
       xAxis="Quarter" yAxis="Revenue" model="${salesModel}"/>
```

### Pie Chart

Use `type="pie"` with a `PieModel` to show proportional data.

```xml
<zscript><![CDATA[
    import org.zkoss.zul.*;
    PieModel pieModel = new SimplePieModel();
    pieModel.setValue("Market A", 35.5);
    pieModel.setValue("Market B", 28.3);
    pieModel.setValue("Market C", 21.2);
    pieModel.setValue("Market D", 15.0);
]]></zscript>
<chart type="pie" title="Market Share" width="500px" height="250px"
       threeD="true" showLegend="true" model="${pieModel}"/>
```

### Time Series Chart

Use `type="time_series"` with an `XYModel` and set `period` and `dateFormat` for date-based axes.

```xml
<zscript><![CDATA[
    import org.zkoss.zul.*;
    XYModel tsModel = new SimpleXYModel();
    tsModel.addValue("CPU", new Integer(0), new Integer(45));
    tsModel.addValue("CPU", new Integer(1), new Integer(52));
    tsModel.addValue("CPU", new Integer(2), new Integer(48));
    tsModel.addValue("CPU", new Integer(3), new Integer(61));
]]></zscript>
<chart type="time_series" title="CPU Usage" width="700px" height="350px"
       period="minute" dateFormat="HH:mm" model="${tsModel}"/>
```

# Example

## Pie Chart

![Chart](/zk_component_ref/images/ZKComRef_Chart.png)

```xml
<chart id="mychart" title="Pie Chart Demo" width="550" height="400"
    type="pie" threeD="true" fgAlpha="128">
    <attribute name="onClick"><![CDATA[
        Area area = event.getAreaComponent();
        if (area != null)
            alert(""+area.getAttribute("entity")+":"+area.getTooltiptext());
    ]]></attribute>
    <zscript><![CDATA[
        PieModel model = new SimplePieModel();
        model.setValue("C/C++", new Double(21.2));
        model.setValue("VB", new Double(10.2));
        model.setValue("Java", new Double(40.4));
        model.setValue("PHP", new Double(28.2));
        mychart.setModel(model);
    ]]></zscript>
</chart>
```

## Pie Chart 3D

![Chart Pie 3 D](/zk_component_ref/images/ZKComRef_Chart_Pie_3D.png)

```xml
<chart id="piechart3d" title="Pie Chart 3D" width="500" height="250"
        type="pie" threeD="true" fgAlpha="128">
    <zscript><![CDATA[
        PieModel piemodel = new SimplePieModel();
        piemodel.setValue("C/C++", new Double(12.5));
        piemodel.setValue("Java", new Double(50.2));
        piemodel.setValue("VB", new Double(20.5));
        piemodel.setValue("PHP", new Double(15.5));
        piechart3d.setModel(piemodel);
    ]]></zscript>
</chart>
```

## Ring Chart

![Chart Ring](/zk_component_ref/images/ZKComRef_Chart_Ring.png)

```xml
<chart id="ringchart" title="Ring Chart" width="500" height="250"
        type="ring" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        PieModel piemodel = new SimplePieModel();
        piemodel.setValue("C/C++", new Double(12.5));
        piemodel.setValue("Java", new Double(50.2));
        piemodel.setValue("VB", new Double(20.5));
        piemodel.setValue("PHP", new Double(15.5));
        ringchart.setModel(piemodel);
    ]]></zscript>
</chart>
```

## Bar Chart

![Chart Bar](/zk_component_ref/images/ZKComRef_Chart_Bar.png)

```xml
<chart id="barchart" title="Bar Chart" width="500" height="250"
        type="bar" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        barchart.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Bar Chart 3D

![Chart Bar 3 D](/zk_component_ref/images/ZKComRef_Chart_Bar_3D.png)

```xml
<chart id="barchart3d" title="Bar Chart 3D" width="500" height="250"
        type="bar" threeD="true" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        barchart3d.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Stacked Bar

![Chart Stacked Bar](/zk_component_ref/images/ZKComRef_Chart_Stacked_Bar.png)

```xml
<chart id="sbarchart" title="Stacked Bar" width="500" height="250"
        type="stacked_bar" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        sbarchart.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Stacked Bar 3D

![Chart Stacked Bar 3 D](/zk_component_ref/images/ZKComRef_Chart_Stacked_Bar_3D.png)

```xml
<chart id="sbarchart3d" title="Stacked Bar 3D" width="500"
        height="250" type="stacked_bar" threeD="true" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        sbarchart3d.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Line Chart

![Chart Line](/zk_component_ref/images/ZKComRef_Chart_Line.png)

```xml
<chart id="linechart" title="Line Chart" width="500" height="250"
        type="line" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        linechart.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Line Chart 3D

![Chart Line 3 D](/zk_component_ref/images/ZKComRef_Chart_Line_3D.png)

```xml
<chart id="linechart3d" title="Line Chart 3D" width="500"
        height="250" type="line" threeD="true" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        linechart3d.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Area Chart

![Chart Area](/zk_component_ref/images/ZKComRef_Chart_Area.png)

```xml
<chart id="areachart" title="Area Chart" width="500" height="250"
        type="area" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        areachart.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Stacked Area Chart

![Chart Stacked Area](/zk_component_ref/images/ZKComRef_Chart_Stacked_Area.png)

```xml
<chart id="sareachart" title="Stacked Area Chart" width="500"
        height="250" type="stacked_area" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        sareachart.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Waterfall Chart

![Chart Waterfall](/zk_component_ref/images/ZKComRef_Chart_Waterfall.png)

```xml
<chart id="waterfall" title="Waterfall Chart" width="500"
        height="250" type="waterfall" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        waterfall.setModel(catmodel);
    ]]></zscript>
</chart>
```

## Polar Chart

![Chart Polar](/zk_component_ref/images/ZKComRef_Chart_Polar.png)

```xml
<chart id="polar" title="Polar Chart" width="500" height="250"
        type="polar" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        polar.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Scatter Chart

![Chart Scatter](/zk_component_ref/images/ZKComRef_Chart_Scatter.png)

```xml
<chart id="scatter" title="Scatter Chart" width="500" height="250"
        type="scatter" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        scatter.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Time Series Chart

![Chart Timeseries](/zk_component_ref/images/ZKComRef_Chart_Timeseries.png)

```xml
<chart id="timeseries" title="Time Series Chart" width="500"
        height="250" type="time_series" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        timeseries.setModel(xymodel);
    ]]></zscript>
</chart>
```

## XY Area Chart

![Chart XY Area](/zk_component_ref/images/ZKComRef_Chart_XY_Area.png)

```xml
<chart id="xyarea" title="XY Area Chart" width="500" height="250"
        type="area" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        xyarea.setModel(xymodel);
    ]]></zscript>
</chart>
```

## XY Line Chart

![Chart XY Line](/zk_component_ref/images/ZKComRef_Chart_XY_Line.png)

```xml
<chart id="xyline" title="XY Line Chart" width="500" height="250"
        type="line" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        xyline.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Step Area Chart

![Chart Step Area](/zk_component_ref/images/ZKComRef_Chart_Step_Area.png)

```xml
<chart id="steparea" title="Step Area Chart" width="500"
        height="250" type="step_area" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        steparea.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Step Chart

![Chart Step](/zk_component_ref/images/ZKComRef_Chart_Step.png)

```xml
<chart id="step" title="Step Chart" width="500" height="250"
        type="step" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
         public Date time(int year, int month, int day, int hour, int minute, int second) {
            final java.util.Calendar calendar = java.util.Calendar.getInstance(TimeZone.getTimeZone("GMT"));
            calendar.set(year, month-1, day, hour, minute, second);
            final Date result = calendar.getTime();
            return result;
        }
        XYModel datemodel = new SimpleXYModel();
        datemodel.addValue("2001", new Long(time(2001, 5, 2, 1, 10, 15).getTime()), new Integer(120));
        datemodel.addValue("2001", new Long(time(2001, 5, 2, 2, 10, 15).getTime()), new Integer(135));
        datemodel.addValue("2001", new Long(time(2001, 5, 2, 3, 10, 15).getTime()), new Integer(140));
        datemodel.addValue("2001", new Long(time(2001, 5, 2, 4, 10, 15).getTime()), new Integer(160));
        
        datemodel.addValue("2002", new Long(time(2001, 5, 2, 1, 10, 20).getTime()), new Integer(125));
        datemodel.addValue("2002", new Long(time(2001, 5, 2, 2, 10, 20).getTime()), new Integer(130));
        datemodel.addValue("2002", new Long(time(2001, 5, 2, 3, 10, 20).getTime()), new Integer(120));
        datemodel.addValue("2002", new Long(time(2001, 5, 2, 4, 10, 20).getTime()), new Integer(180));
        step.setModel(datemodel);
    ]]></zscript>
</chart>
```

## XY Stacked Area Chart

![Chart XY Stacked Area](/zk_component_ref/images/ZKComRef_Chart_XY_Stacked_Area.png)

```xml
<chart id="xystackedarea" title="XY Stacked Area Chart" width="500"
        height="250" type="stacked_area" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        xystackedarea.setModel(xymodel);
    ]]></zscript>
</chart>
```

## XY Bar Chart

![Chart XY Bar](/zk_component_ref/images/ZKComRef_Chart_XY_Bar.png)

```xml
<chart id="xybar" title="XY Bar Chart" width="500" height="250"
        type="bar" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        xybar.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Histogram Chart

![Chart Histogram](/zk_component_ref/images/ZKComRef_Chart_Histogram.png)

```xml
<chart id="histogram" title="Histogram Chart" width="500"
        height="250" type="histogram" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(50), new Integer(135));
        xymodel.addValue("2002", new Integer(70), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        histogram.setModel(xymodel);
    ]]></zscript>
</chart>
```

## Candlestick Chart

![Chart Candlestick](/zk_component_ref/images/ZKComRef_Chart_Candlestick.png)

```xml
<chart id="candlestick" title="Candlestick Chart" width="500"
        height="250" type="candlestick" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        HiLoModel hilomodel = new SimpleHiLoModel();
        long d = System.currentTimeMillis();
        hilomodel.addValue(new Date(d),  new Double(45.5),  new Double(54.2), new Double(19.9), new Double(42.8), new Double(20));
        hilomodel.addValue(new Date(d+1000),  new Double(46.5),  new Double(55.2),  new Double(43.8), new Double(50.9),   new Double(32));
        hilomodel.addValue(new Date(d+2000),  new Double(47.5),  new Double(56.2),  new Double(44.8), new Double(51.9),   new Double(33));
        hilomodel.addValue(new Date(d+3000),  new Double(48.5),  new Double(57.2),  new Double(45.8), new Double(52.9),   new Double(34));
        hilomodel.addValue(new Date(d+4000),  new Double(49.5),  new Double(58.2),  new Double(46.8), new Double(53.9),   new Double(35));
        hilomodel.addValue(new Date(d+5000),  new Double(50.5),  new Double(59.2),  new Double(47.8), new Double(54.9),   new Double(36));
        hilomodel.addValue(new Date(d+6000),  new Double(51.5),  new Double(60.2),  new Double(48.8), new Double(55.9),   new Double(37));
        hilomodel.addValue(new Date(d+7000),  new Double(52.5),  new Double(61.2),  new Double(49.8), new Double(56.9),   new Double(38));
        hilomodel.addValue(new Date(d+8000),  new Double(53.5),  new Double(62.2),  new Double(50.8), new Double(57.9),   new Double(39));
        hilomodel.addValue(new Date(d+9000),  new Double(54.5),  new Double(63.2),  new Double(51.8), new Double(58.9),   new Double(40));
        hilomodel.addValue(new Date(d+10000),  new Double(55.5),  new Double(64.2),  new Double(52.8), new Double(59.9),   new Double(41));
        hilomodel.addValue(new Date(d+11000),  new Double(56.5),  new Double(65.2),  new Double(53.8), new Double(60.9),   new Double(42));
        hilomodel.addValue(new Date(d+12000),  new Double(57.5),  new Double(66.2),  new Double(54.8), new Double(61.9),   new Double(43));
        hilomodel.addValue(new Date(d+13000),  new Double(58.5),  new Double(67.2),  new Double(55.8), new Double(62.9),   new Double(44));
        hilomodel.addValue(new Date(d+14000),  new Double(59.5),  new Double(68.2),  new Double(56.8), new Double(63.9),   new Double(45));
        hilomodel.addValue(new Date(d+15000),  new Double(60.5),  new Double(69.2),  new Double(57.8), new Double(64.9),   new Double(46));
        hilomodel.addValue(new Date(d+16000),  new Double(61.5),  new Double(70.2),  new Double(58.8), new Double(65.9),   new Double(47));
        hilomodel.addValue(new Date(d+17000),  new Double(62.5),  new Double(71.2),  new Double(59.8), new Double(66.9),   new Double(48));
        hilomodel.addValue(new Date(d+18000),  new Double(63.5),  new Double(72.2),  new Double(60.8), new Double(67.9),   new Double(49));
        candlestick.setModel(hilomodel);
    ]]></zscript>
</chart>
```

## High Low Chart

![Chart Highlow](/zk_component_ref/images/ZKComRef_Chart_Highlow.png)

```xml
<chart id="highlow" title="High Low Chart" width="500" height="250"
        type="highlow" threeD="false" fgAlpha="128" dateFormat="yyyy/MM/dd">
    <zscript><![CDATA[
        HiLoModel hilomodel = new SimpleHiLoModel();
        long d = System.currentTimeMillis();
        hilomodel.addValue(new Date(d),  new Double(45.5),  new Double(54.2), new Double(19.9), new Double(42.8), new Double(20));
        hilomodel.addValue(new Date(d+1000),  new Double(46.5),  new Double(55.2),  new Double(43.8), new Double(50.9),   new Double(32));
        hilomodel.addValue(new Date(d+2000),  new Double(47.5),  new Double(56.2),  new Double(44.8), new Double(51.9),   new Double(33));
        hilomodel.addValue(new Date(d+3000),  new Double(48.5),  new Double(57.2),  new Double(45.8), new Double(52.9),   new Double(34));
        hilomodel.addValue(new Date(d+4000),  new Double(49.5),  new Double(58.2),  new Double(46.8), new Double(53.9),   new Double(35));
        hilomodel.addValue(new Date(d+5000),  new Double(50.5),  new Double(59.2),  new Double(47.8), new Double(54.9),   new Double(36));
        hilomodel.addValue(new Date(d+6000),  new Double(51.5),  new Double(60.2),  new Double(48.8), new Double(55.9),   new Double(37));
        hilomodel.addValue(new Date(d+7000),  new Double(52.5),  new Double(61.2),  new Double(49.8), new Double(56.9),   new Double(38));
        hilomodel.addValue(new Date(d+8000),  new Double(53.5),  new Double(62.2),  new Double(50.8), new Double(57.9),   new Double(39));
        hilomodel.addValue(new Date(d+9000),  new Double(54.5),  new Double(63.2),  new Double(51.8), new Double(58.9),   new Double(40));
        hilomodel.addValue(new Date(d+10000),  new Double(55.5),  new Double(64.2),  new Double(52.8), new Double(59.9),   new Double(41));
        hilomodel.addValue(new Date(d+11000),  new Double(56.5),  new Double(65.2),  new Double(53.8), new Double(60.9),   new Double(42));
        hilomodel.addValue(new Date(d+12000),  new Double(57.5),  new Double(66.2),  new Double(54.8), new Double(61.9),   new Double(43));
        hilomodel.addValue(new Date(d+13000),  new Double(58.5),  new Double(67.2),  new Double(55.8), new Double(62.9),   new Double(44));
        hilomodel.addValue(new Date(d+14000),  new Double(59.5),  new Double(68.2),  new Double(56.8), new Double(63.9),   new Double(45));
        hilomodel.addValue(new Date(d+15000),  new Double(60.5),  new Double(69.2),  new Double(57.8), new Double(64.9),   new Double(46));
        hilomodel.addValue(new Date(d+16000),  new Double(61.5),  new Double(70.2),  new Double(58.8), new Double(65.9),   new Double(47));
        hilomodel.addValue(new Date(d+17000),  new Double(62.5),  new Double(71.2),  new Double(59.8), new Double(66.9),   new Double(48));
        hilomodel.addValue(new Date(d+18000),  new Double(63.5),  new Double(72.2),  new Double(60.8), new Double(67.9),   new Double(49));
        highlow.setModel(hilomodel);
    ]]></zscript>
</chart>
```

## Bubble Chart

![Chart Bubble](/zk_component_ref/images/ZKComRef_Chart_Bubble.png)

```xml
<chart id="bubble" title="Bubble Chart" width="500" height="250"
        type="bubble" threeD="false" fgAlpha="128">
    <zscript><![CDATA[  
        XYZModel xyzmodel = new SimpleXYZModel();
        xyzmodel.addValue("2001", new Integer(20), new Integer(120), new Integer(8));
        xyzmodel.addValue("2001", new Integer(40), new Integer(135), new Integer(10));
        xyzmodel.addValue("2001", new Integer(60), new Integer(140), new Integer(6));
        xyzmodel.addValue("2001", new Integer(80), new Integer(160), new Integer(12));
        
        xyzmodel.addValue("2002", new Integer(30), new Integer(120), new Integer(4));
        xyzmodel.addValue("2002", new Integer(50), new Integer(135), new Integer(5));
        xyzmodel.addValue("2002", new Integer(70), new Integer(140), new Integer(3));
        xyzmodel.addValue("2002", new Integer(90), new Integer(160), new Integer(6));
        bubble.setModel(xyzmodel);
    ]]></zscript>
</chart>
```

## Horizontal Bubble Chart

![Chart HBubble](/zk_component_ref/images/ZKComRef_Chart_HBubble.png)

```xml
<chart id="hbubble" title="Horizontal Bubble Chart" width="500"
        height="250" type="bubble" threeD="false" fgAlpha="128" orient="horizontal">
    <zscript><![CDATA[  
        XYZModel xyzmodel = new SimpleXYZModel();
        xyzmodel.addValue("2001", new Integer(20), new Integer(120), new Integer(8));
        xyzmodel.addValue("2001", new Integer(40), new Integer(135), new Integer(10));
        xyzmodel.addValue("2001", new Integer(60), new Integer(140), new Integer(6));
        xyzmodel.addValue("2001", new Integer(80), new Integer(160), new Integer(12));
        
        xyzmodel.addValue("2002", new Integer(30), new Integer(120), new Integer(4));
        xyzmodel.addValue("2002", new Integer(50), new Integer(135), new Integer(5));
        xyzmodel.addValue("2002", new Integer(70), new Integer(140), new Integer(3));
        xyzmodel.addValue("2002", new Integer(90), new Integer(160), new Integer(6));
        hbubble.setModel(xyzmodel);
    ]]></zscript>
</chart>
```

## Wafer Map Chart

![Chart Wafer Map](/zk_component_ref/images/ZKComRef_Chart_Wafer_Map.png)

```xml
<chart id="wafermap" title="Wafer Map Chart" width="500"
        height="400" type="wafermap" threeD="false" fgAlpha="128">
    <zscript><![CDATA[  
        final int xdim = 30;
        final int ydim = 20;
        final Random random = new Random();
        WaferMapModel wafermodel = new WaferMapModel(xdim, ydim);
        for (int x = 0; x < xdim; x++) {
            for (int y = 0; y < ydim; y++) {
                wafermodel.addValue(random.nextInt(5), x, y);
            }
        }
        wafermap.setModel(wafermodel);
    ]]></zscript>
</chart>
```

## Gantt Chart

![Chart Gantt](/zk_component_ref/images/ZKComRef_Chart_Gantt.png)

```xml
<chart id="gantt" title="Gantt Chart" width="700" height="400"
        type="gantt" threeD="false" fgAlpha="128" dateFormat="yyyy/MM/dd" >
    <zscript><![CDATA[  
        import org.zkoss.zul.GanttModel.GanttTask;
        
        public Date date(int year, int month, int day) {
            final java.util.Calendar calendar = java.util.Calendar.getInstance();
            calendar.set(year, month-1, day);
            final Date result = calendar.getTime();
            return result;
        }
        //series, task (task description, start, end, complete percentage)
        GanttModel ganttmodel = new GanttModel();
        ganttmodel.addValue("Scheduled", new GanttTask("Write Proposal", date(2008,4,1), date(2008,4,5), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Obtain Approval", date(2008,4,9), date(2008,4,9), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Requirements Analysis", date(2008,4,10), date(2008,5,5), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Design Phase", date(2008,5,6), date(2008,5,30), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Design Signoff", date(2008,6,2), date(2008,6,2), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Alpha Implementation", date(2008,6,3), date(2008,7,31), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Design Review", date(2008,8,1), date(2008,8,8), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Revised Design Signoff", date(2008,8,10), date(2008,8,10), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Beta Implementation", date(2008,8,12), date(2008,9,12), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Testing", date(2008,9,13), date(2008,10,31), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Final Implementation", date(2008,11,1), date(2008,11,15), 0.0));
        ganttmodel.addValue("Scheduled", new GanttTask("Signoff", date(2008,11,28), date(2008,11,30), 0.0));
        
        ganttmodel.addValue("Actual", new GanttTask("Write Proposal", date(2008,4,1), date(2008,4,3), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Obtain Approval", date(2008,4,9), date(2008,4,9), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Requirements Analysis", date(2008,4,10), date(2008,5,15), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Design Phase", date(2008,5,15), date(2008,6,17), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Design Signoff", date(2008,6,30), date(2008,6,30), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Alpha Implementation", date(2008,7,1), date(2008,9,12), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Design Review", date(2008,9,12), date(2008,9,22), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Revised Design Signoff", date(2008,9,25), date(2008,9,27), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Beta Implementation", date(2008,8,12), date(2008,9,12), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Testing", date(2008,10,31), date(2008,11,17), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Final Implementation", date(2008,11,18), date(2008,12,5), 0.0));
        ganttmodel.addValue("Actual", new GanttTask("Signoff", date(2008,12,10), date(2008,12,11), 0.0));
        gantt.setModel(ganttmodel);
    ]]></zscript>
</chart>
```

## Wind Chart

![Chart Wind](/zk_component_ref/images/ZKComRef_Chart_Wind.png)

```xml
<chart id="wind" title="Wind Plot" width="700" height="400"
        type="wind" threeD="false" fgAlpha="128" dateFormat="yyyy/MM/dd" >
    <zscript><![CDATA[
        
        public Date date(int year, int month, int day) {
            final java.util.Calendar calendar = java.util.Calendar.getInstance();
            calendar.set(year, month-1, day);
            final Date result = calendar.getTime();
            return result;
        }
        XYZModel windmodel = new SimpleXYZModel();
        //series, date, direction (0-12), force(0-12)
        windmodel.addValue("Wind!", new Long(date(2008, 1, 3).getTime()), new Double(0d), new Double(10.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 4).getTime()), new Double(1d), new Double(8.5));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 5).getTime()), new Double(2.0), new Double(10.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 6).getTime()), new Double(3.0), new Double(10.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 7).getTime()), new Double(4.0), new Double(7.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 8).getTime()), new Double(5.0), new Double(10.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 9).getTime()), new Double(6.0), new Double(8.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 10).getTime()), new Double(7.0), new Double(11.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 11).getTime()), new Double(8.0), new Double(10.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 12).getTime()), new Double(9.0), new Double(11.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 13).getTime()), new Double(10.0), new Double(3.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 14).getTime()), new Double(11.0), new Double(9.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 15).getTime()), new Double(12.0), new Double(11.0));
        windmodel.addValue("Wind!", new Long(date(2008, 1, 16).getTime()), new Double(0.0), new Double(0.0));
        wind.setModel(windmodel);
    ]]></zscript>
</chart>
```

## Dial Chart

![Chart Dial](/zk_component_ref/images/ZKComRef_Chart_Dial.png)

```xml
<window onOK="doOK()" width="350px">
    <chart id="dial" title="Dial Plot" width="300" height="300" type="dial" threeD="false" fgAlpha="128">
    <zscript><![CDATA[
        
        import org.zkoss.zul.DialModel;
        import org.zkoss.zul.DialModelScale;
    
        int val= 40;
    
        DialModel dialmodel = new DialModel();
        DialModelScale scale = dialmodel.newScale(0.0, 100.0, -120.0, -300.0, 10.0, 4);//scale's configuration data
        scale.setText("Temperature");
        scale.newRange(80, 100, "#FF0000", 0.83, 0.89);
        scale.newRange(60, 80, "#FFC426", 0.83, 0.89);
        scale.setValue(val);
    
        doOK() {
            val = dbx.getValue();
            if (val > 100) {
                val = 100;
            } else if (val < 0) {
                val = 0;
            }
            dbx.value = val;
            slx.curpos = val;
            scale.setValue(val);
            if (val > 80) {
                scale.setNeedleColor(scale.getRange(0).getRangeColor());
            } else if (val > 60) {
                scale.setNeedleColor(scale.getRange(1).getRangeColor());
            } else {
                scale.setNeedleColor(dialmodel.getFrameFgColor());
            }
        }
        dial.setModel(dialmodel);
        ]]></zscript>
    </chart>
    <hbox>
        <slider id="slx" curpos="${val}" onScroll="dbx.value=self.curpos; doOK()"/>
        <intbox id="dbx" value="${val}" onChange="doOK()"/>
    </hbox>
</window>
```

# Properties

## Type

**Default Value:** `"pie"`

Sets the chart type. The value must be one of the type constants defined on `Chart`. The model assigned via `model` must match the chosen type; see the type-model compatibility table in the Employment/Purpose section.

| Value | Required Model | 3D Support |
|---|---|---|
| `area` | `CategoryModel` or `XYModel` | No |
| `bar` | `CategoryModel` | Yes |
| `bubble` | `XYZModel` | No |
| `candlestick` | `HiLoModel` | No |
| `dial` | `DialModel` | No |
| `gantt` | `GanttModel` | No |
| `highlow` | `HiLoModel` | No |
| `histogram` | `XYModel` | No |
| `line` | `CategoryModel` or `XYModel` | Yes |
| `pie` | `PieModel` | Yes |
| `polar` | `XYModel` | No |
| `ring` | `PieModel` | No |
| `scatter` | `XYModel` | No |
| `stacked_area` | `CategoryModel` or `XYModel` | No |
| `stacked_bar` | `CategoryModel` | Yes |
| `step` | `XYModel` | No |
| `step_area` | `XYModel` | No |
| `time_series` | `XYModel` | No |
| `wafermap` | `WaferMapModel` | No |
| `waterfall` | `CategoryModel` | No |
| `wind` | `XYZModel` | No |

```xml
<chart type="bar" width="500px" height="250px"/>
```

## ThreeD

**Default Value:** `false`

Sets whether to render the chart in three dimensions. Only chart types that have a 3D peer (`bar`, `line`, `pie`, `stacked_bar`) support this; all other types silently ignore it.

```xml
<chart type="pie" threeD="true" width="500px" height="250px"/>
```

## Title

**Default Value:** `null` (no title displayed)

Sets the text shown as the chart's title.

```xml
<chart type="bar" title="Monthly Sales" width="500px" height="250px"/>
```

## XAxis

**Default Value:** `null`

Sets the label text displayed along the x-axis.

```xml
<chart type="bar" xAxis="Quarter" width="500px" height="250px"/>
```

## YAxis

**Default Value:** `null`

Sets the label text displayed along the y-axis.

```xml
<chart type="bar" yAxis="Revenue (USD)" width="500px" height="250px"/>
```

## ShowLegend

**Default Value:** `true`

Controls whether the chart legend is displayed.

```xml
<chart type="pie" showLegend="false" width="500px" height="250px"/>
```

## ShowTooltiptext

**Default Value:** `true`

Controls whether a tooltip is popped when the user hovers over a chart area.

```xml
<chart type="bar" showTooltiptext="false" width="500px" height="250px"/>
```

## PaneAlpha

**Default Value:** `255` (fully opaque)

Sets the transparency of the chart pane (plot background). Values range from `0` (fully transparent) to `255` (fully opaque). Values outside this range are silently clamped to `255`.

```xml
<chart type="bar" paneAlpha="180" width="500px" height="250px"/>
```

## PaneColor

**Default Value:** `null` (engine default, typically `#EEEEEE`)

Sets the background color of the chart pane (plot area). Specify the color in `#RRGGBB` hexadecimal format. Set to `null` to restore the engine default.

```xml
<chart type="bar" paneColor="#FFFFFF" width="500px" height="250px"/>
```

## FgAlpha

**Default Value:** `255` (fully opaque)

Sets the transparency of the chart foreground (data series rendering). Values range from `0` (fully transparent) to `255` (fully opaque). Values outside this range are silently clamped to `255`.

```xml
<chart type="bar" fgAlpha="200" width="500px" height="250px"/>
```

## BgAlpha

**Default Value:** `255` (fully opaque)

Sets the transparency of the overall chart background. Values range from `0` (fully transparent) to `255` (fully opaque). Values outside this range are silently clamped to `255`.

```xml
<chart type="pie" bgAlpha="128" width="500px" height="250px"/>
```

## BgColor

**Default Value:** `null` (engine default, typically `#FFFFFF`)

Sets the overall background color of the chart. Specify the color in `#RRGGBB` hexadecimal format. Set to `null` to restore the engine default.

```xml
<chart type="bar" bgColor="#F5F5F5" width="500px" height="250px"/>
```

## Orient

**Default Value:** `"vertical"`

Sets the chart orientation. Applicable to chart types that support an orientation axis (e.g. `bar`).

| Value | Meaning |
|---|---|
| `vertical` | Category axis runs horizontally; value axis runs vertically (default) |
| `horizontal` | Category axis runs vertically; value axis runs horizontally |

```xml
<chart type="bar" orient="horizontal" width="500px" height="250px"/>
```

## TimeZone

**Default Value:** `null` (uses `TimeZones.getCurrent()`)

Sets the `java.util.TimeZone` used to render date/time axes in a `time_series` chart. When `null`, the default time zone determined by `org.zkoss.util.TimeZones.getCurrent()` is applied. This property is set programmatically — it cannot be set inline in ZUL because `TimeZone` has no string constructor; use a composer or MVVM binding.

```xml
<chart id="tsChart" type="time_series" period="day"
       width="700px" height="300px"/>
```

## Period

**Default Value:** `null` (treated as `"millisecond"` when unspecified)

Sets the time period unit used on the time axis of a `time_series` chart.

| Value | Meaning |
|---|---|
| `millisecond` | Millisecond granularity (default when unset) |
| `second` | Second granularity |
| `minute` | Minute granularity |
| `hour` | Hour granularity |
| `day` | Day granularity |
| `week` | Week granularity |
| `month` | Month granularity |
| `quarter` | Quarter granularity |
| `year` | Year granularity |

```xml
<chart type="time_series" period="day" dateFormat="yyyy-MM-dd"
       width="700px" height="300px"/>
```

## DateFormat

**Default Value:** `null` (engine default format)

Sets the date format pattern used on date-related chart axes (e.g. `time_series`). The pattern follows `java.text.SimpleDateFormat` conventions.

```xml
<chart type="time_series" period="month" dateFormat="MMM yyyy"
       width="700px" height="300px"/>
```

## Model

**Default Value:** `null` (a default model is auto-created when the chart draws)

Associates a `ChartModel` with this chart. The model type must match the chosen `type`; see the type-model compatibility table above. Assigning a new model (even the same instance) always triggers a redraw. Set to `null` to dissociate the current model.

Build the model in a `<zscript>` block (declared before the chart) and reference it via EL:

```xml
<zscript><![CDATA[
    import org.zkoss.zul.*;
    CategoryModel categoryModel = new SimpleCategoryModel();
    categoryModel.setValue("2024", "Q1", new Integer(25));
    categoryModel.setValue("2024", "Q2", new Integer(38));
    categoryModel.setValue("2024", "Q3", new Integer(42));
    categoryModel.setValue("2024", "Q4", new Integer(55));
]]></zscript>
<chart type="bar" model="${categoryModel}" width="500px" height="250px"/>
```

## TitleFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the chart title. Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically — it cannot be specified as a ZUL attribute string.

```xml
<chart id="myChart" type="bar" title="Sales Report"
       width="500px" height="250px"/>
```

## LegendFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the chart legend. Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically — it cannot be specified as a ZUL attribute string.

```xml
<chart id="myChart" type="pie" showLegend="true"
       width="500px" height="250px"/>
```

## XAxisTickFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the tick number labels on the x-axis. Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically.

```xml
<chart id="myChart" type="bar" xAxis="Quarter"
       width="500px" height="250px"/>
```

## XAxisFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the x-axis label (the text set via `xAxis`). Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically.

```xml
<chart id="myChart" type="bar" xAxis="Quarter"
       width="500px" height="250px"/>
```

## YAxisTickFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the tick number labels on the y-axis. Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically.

```xml
<chart id="myChart" type="bar" yAxis="Revenue"
       width="500px" height="250px"/>
```

## YAxisFont

**Default Value:** `null` (engine default)

Sets the `java.awt.Font` used to render the y-axis label (the text set via `yAxis`). Useful when the default font does not support the required character set (e.g. Chinese). This property must be set programmatically.

```xml
<chart id="myChart" type="bar" yAxis="Revenue"
       width="500px" height="250px"/>
```

## Engine

**Default Value:** determined by library property `org.zkoss.zul.chart.engine.class`

Sets the `ChartEngine` implementation responsible for rendering the chart image. ZK PE/EE ships a JFreeChart-based engine by default. You can supply a custom engine by passing a `ChartEngine` instance or a fully-qualified class name string.

```xml
<chart type="bar" engine="com.example.MyChartEngine"
       width="500px" height="250px"/>
```

## AreaListener

**Default Value:** `null` (no custom renderer)

Sets a `ChartAreaListener` that is called when chart areas are rendered, allowing custom per-area drawing logic. Changing the listener does not automatically trigger a redraw; call `smartDraw()` explicitly if needed. You can supply a `ChartAreaListener` instance or a fully-qualified class name string.

```xml
<chart type="bar" areaListener="com.example.MyAreaListener"
       width="500px" height="250px"/>
```

# Clicked Area: Series, Legend

In an onClick listener, you can call
[org.zkoss.zk.ui.event.MouseEvent#getX()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html#getX()) and
[org.zkoss.zk.ui.event.MouseEvent#getY()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html#getY()) to
get coordinates.

Call
[org.zkoss.zk.ui.event.MouseEvent#getAreaComponent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html#getAreaComponent())
to retrieve the area component ([org.zkoss.zul.Area](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Area.html))
which users click on.

There are several attributes you can get from the clicked Area:

- `series`: series name
- `category`: category name, e.g. GanttTask's description
- `entity`: could be `DATA` or `LEGEND`
- `percent`: percentage of complete of a gantt task
- `start`: start value of a gannt task
- `end`: end value of a gannt task

```java
    
    @Listen("onClick = #gantt")
    public  void drilldown(MouseEvent event) {
        final Area area = (Area)event.getAreaComponent();
        if (area != null)
            Messagebox.show(area.getAttribute("category")+": "+area.getTooltiptext());
    }
```

# Charts Support Setting the Font

We can now specify what font we want a chart to use. This is useful when
employing a foreign language within your chart. The example demonstrates
setting a font and using it with a foreign language, in this case
Chinese.

![Chart Font Examples](/zk_component_ref/images/ZKComRef_Chart_Font_Examples.png)

```xml
    <zscript>
        import java.awt.Font;
        String fontname = "Dialog";
        Font tfont = new Font(fontname, Font.BOLD, 16); //for title
        Font lfont = new Font(fontname, Font.PLAIN, 10); //for legend
        Font lbfont = new Font(fontname, Font.PLAIN, 12); //for label


        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "第一季", new Integer(20));
        catmodel.setValue("2001", "第二季", new Integer(35));
        catmodel.setValue("2001", "第三季", new Integer(40));
        catmodel.setValue("2001", "第四季", new Integer(55));
        catmodel.setValue("2002", "第一季", new Integer(40));
        catmodel.setValue("2002", "第二季", new Integer(60));
        catmodel.setValue("2002", "第三季", new Integer(70));
        catmodel.setValue("2002", "第四季", new Integer(90));
    </zscript>

    <chart id="barchart" title="長條圖  Bar Chart" width="500" height="250" type="bar" threeD="false" fgAlpha="128"
    titleFont="${tfont}" legendFont="${lfont}" xAxisFont="${lbfont}" xAxisTickFont="${lbfont}" model="${catmodel}"/>
```

# Customize Chart

You can customize a chart's appearance by providing your own
`ChartEngine`. It can save your effort by extending `JFreeChartEngine`
and override its `prepareJFreeChart()`. Then manipulate the passed
`JFreeChart` to change a chart's rendering. You also need to find
related API in [JFreeChart JavaDoc](http://javadox.com/org.jfree/jfreechart/1.0.19/overview-summary.html).

```xml
<chart engine="foo.MyJfreeChartEngine"/>
```

# Supported Events

- Inherited Supported Events: [ Imagemap]({{site.baseurl}}/zk_component_ref/imagemap#Supported_Events)

# Supported Children

`*NONE`
