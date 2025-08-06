# Problem Decription

You see the error below in a browser developer tool \> Console tab:

`Uncaught Unknown widget: chart.Charts`

![](images/unknown_widget_chart.png)

# Why It Happens

ZK fails to instantiate a chart widget because the chart js isn't
loaded. (the widget class `chart.Charts` isn't registered successfully).

# Possible Causes and Solutions

There must be something at the client-side affecting the widget
registration.

## Load a JavaScript that interferes with widget loading

There are possibilities, e.g. if you load highcharts, bootstrap js by
yourselves, this might cause an error in chart.wpd and fail the widget
registration.

Remove the javascript or resolve the code that interferes zk widget
loading can solve this error.

## Mixing 2 different versions of ZK jar

Please check your jar and just make sure you include one version of ZK
jar in one application.

# Debugging Steps

- Check if chart.wpd is loaded successfully with developer tool \>
  Network tab.

![](images/chart_wpd.jpg)

- Check if you include any non-ZK javascript, remove them one by one to
  find the one that interferes ZK.
