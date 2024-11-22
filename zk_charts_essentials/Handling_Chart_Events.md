ZK Charts fire events when a user is interacting with the chart, we can,
therefore, declare a method to listen to the event and handle the event
data.

# ChartsEvent

<javadoc directory="zkcharts">org.zkoss.chart.ChartsEvent</javadoc>
represents an event triggered by user's interaction. Please check out
`event.zul` in the example project to see events firing.

## Shifting Points Example

If we want to shift the point's position when user clicks the bubble, we
can listen the `onPlotClick` event and retrieve the point being clicked.
Then update the point's position like below:

### shift.zul

``` xml
<charts id="chart" type="bubble" apply="org.zkoss.zkcharts.essentials.ShiftComposer"/>
```

### ShiftComposer.java

``` java
public class ShiftComposer extends SelectorComposer<Window> {
    @Wire
    Charts chart;
    
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        // initial series data
        initPoints();
        // hide some unnecessary options
        hideOptions();
    }
     
    @Listen("onPlotClick = #chart")
    public void shiftPoint(ChartsEvent event) {
        // retrieve the point object.
        Point point = event.getPoint();
        // shift the point by updating its x value.
        point.setX(point.getX().intValue() + random() / 10);
    }

...
}
```

Congratulations! Now you can interact with the chart. Here is what it shows: ![](images/ShiftPoint.gif)

# ClickEvent Usage

What if we want to select the bubble and move it to the location where
the mouse was clicked? It can be done by modifying the previous sample
code as below:

``` java
    ...

    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        
        // initial series data
        initPoints();
        // hide some unnecessary options
        hideOptions();
        // allow point select
        chart.getPlotOptions().getBubble().setAllowPointSelect(true);
    }
     
    @Listen("onClick = #chart")
    public void movePoint(ChartsClickEvent event) {
        for (Point point: chart.getSelectedPoints()) {
            point.update(event.getXAxis(), event.getYAxis(), point.getHigh());
            point.setSelected(false);
        }
    }

    ...
```

- Line 17: you can get the x and y axis values of where the mouse was
  clicked from
  <javadoc directory="zkcharts">org.zkoss.chart.ChartsClickEvent</javadoc>
  which extends
  <javadoc directory="zk">org.zkoss.zk.ui.event.MouseEvent</javadoc>

# Supported ChartsEvent

<table>
<thead>
<tr class="header">
<th><p>EventName</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>onPlotClick</p></td>
<td><p>Fires when the series is clicked, and it will pass the nearest
point as a parameter.</p></td>
</tr>
<tr class="even">
<td><p>onPlotCheckboxClick</p></td>
<td><p>Fires when the checkbox next to the series' name in the legend is
clicked.</p></td>
</tr>
<tr class="odd">
<td><p>onPlotLegendItemClick</p></td>
<td><p>Fires when the legend item belonging to the series is clicked.
(<strong>Not applicable to pies</strong>).</p></td>
</tr>
<tr class="even">
<td><p>onPlotShow</p></td>
<td><p>Fires when the series is shown after chart generation time, by
clicking the legend item. (<strong>Not applicable to
pies</strong>).</p></td>
</tr>
<tr class="odd">
<td><p>onPlotHide</p></td>
<td><p>Fires when the series is hidden after chart generation time, by
clicking the legend item.<br />
(<strong>Not applicable to pies</strong>).</p></td>
</tr>
<tr class="even">
<td><p>onPlotMouseOver</p></td>
<td><p>Fires when the mouse enters the graph.</p></td>
</tr>
<tr class="odd">
<td><p>onPlotMouseOut</p></td>
<td><p>Fires when the mouse leaves the graph.</p></td>
</tr>
<tr class="even">
<td><p>onPlotSelect</p></td>
<td><p>Fires when selecting a point from a series.</p>
<p>The zkcharts doesn't send this event before you enable "point select"
by
<code>Charts.getPlotOptions().getSeries().setAllowPointSelect(true);</code>
Reference: <a
href="http://api.highcharts.com/highcharts#plotOptions.series.point.events">http://api.highcharts.com/highcharts#plotOptions.series.point.events</a></p></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p>onPlotUnselect</p></td>
<td><p>Fires when unselecting a point from a series.</p></td>
</tr>
<tr class="odd">
<td><p>onPlotDrillUp</p></td>
<td><p>Fires when drilling up from a drilldown series.</p></td>
</tr>
<tr class="even">
<td><p>onPlotDrillDown</p></td>
<td><p>Fires when a drilldown point is clicked, before the new series is
added.</p></td>
</tr>
<tr class="odd">
<td><p>onSelection</p></td>
<td><p>When you allow zooming by Charts.setZoomType(), it's fired when
you drag your pointer within the chart. ZK will pass a
<code>ChartsSelectionEvent</code> into an event listener.</p></td>
</tr>
<tr class="even">
<td><p>onClick</p></td>
<td><p>Fires when you click within a chart, ZK will pass
<code>ChartsClickEvent</code>.</p></td>
</tr>
</tbody>
</table>

**Note:**

- see
  <javadoc directory="zkcharts">org.zkoss.chart.ChartsEvents</javadoc>
  for more details.
- `onPlotShow`, `onPlotHide`, and `onPlotLegendItemClick` are not
  applicable on a pie chart because they are fired when a legend
  represents represents **a series**. But a legend in a pie chart
  represents **a point**, so ZKCharts doesn't fire those events for a
  pie chart.
