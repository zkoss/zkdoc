

Another way to add data to a chart is through
<javadoc directory="zkcharts">org.zkoss.chart.Series</javadoc>. You have
to use `Series` to combine multiple types of chart in one chart
component like [this demo](https://www.zkoss.org/zkchartsdemo/combo)
because each `Series` can be rendered as different chart types.

# Create a Series

You don't need to instantiate `Series` by yourselves, just call
`getSeries(index)` and its underlying implementation creates for you:

``` java
Charts chart;
...
Series series0 = chart.getSeries(0);
...
Series series1 = chart.getSeries(1);
```

# Add Data Into a Series

Call `setData()` to add data points to the series, and data could be
Double, Integer, Number. If you want to show category, pass
<javadoc directory="zkcharts">org.zkoss.chart.Point</javadoc> as
parameters.

Here is a simple example.

[SeriesComposer.java](https://github.com/zkoss/zkchartsessentials/blob/master/src/main/java/org/zkoss/zkcharts/essentials/SeriesComposer.java)

``` java
public class SeriesComposer extends SelectorComposer<Window> {

    @Wire
    Charts chart;
    
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        initData();
    }

    private void initData() {
        chart.getXAxis().setType("category");
        Series series0 = chart.getSeries(0);
        series0.setData(new Point("apples", 5), new Point("pears", 9), new Point("oragnes", 4), new Point("bannas", 8), new Point("grapes", 10));
        series0.setType("area");
        series0.setName("John");
        
        Series series1 = chart.getSeries(1);
        series1.setData(new Point("apples", 2),  new Point("pears", 1),new Point("oragnes", 3), new Point("bannas", 5), new Point("grapes", 9));
        series1.setType("column");
        series1.setName("Peter");
    }
}
```

- Line 14: If there is missing points, just pass null like
  `new Point("category", null)`

# Clear/Remove Series

``` java
    @Listen("onClick = #clear")
    public void clear(){
        int seriesSize = chart.getSeriesSize();
        for (int i = 0; i < seriesSize; i++){
            chart.getSeries().remove();
        }
    }
```

- `getSeriesSize()` changes for each removal
