If you need to display large number of data points. There are several
ways to handle it:

# Show Horizontal Scrollbar

give a large width and allow overflow-x:

``` xml
<charts id="chart" type="line"  width="3000"/>
<style>
    .z-charts{
        overflow-x: auto !important;
    }
</style>
```

# Enable X-axis Zoom

After enabling the x-axis zoom:

``` java
chart.setZoomType("x");
```

You can select a range by drag-and-drop to zoom in on a chart

See
<https://github.com/zkoss/zkchartsessentials/blob/master/src/main/webapp/event/events.zul>

# Load Data of 1 Page One Time

Define your size of data points for 1 page, then just load 1-page of
data at the beginning. Provide 2 buttons for the next and previous page.
When users click paging buttons, load the corresponding page of data.

# Change X Extremes Range

Load all the data first. Set the X-axis data range like
`chart.getXAxis().setExtremes(1, 10)`, so it only shows the first 10
points. Provide 2 buttons for the next and previous page. When users
click the paging buttons, change x data extremes to a different range.
