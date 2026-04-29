---
title: "Unknown widget: chart.Charts"
---

# Problem Description

You see the error below in a browser developer tool \> Console tab:

`Uncaught Unknown widget: chart.Charts`

![](images/unknown_widget_chart.png)

# Why It Happens

ZK fails to instantiate a chart widget because the chart js isn't
loaded. (the widget class `chart.Charts` isn't registered successfully).

# Possible Causes and Solutions

There must be something on the client side affecting the widget
registration.

## Load a JavaScript that interferes with widget loading

For example, if you load Highcharts or bootstrap.js manually, it may
cause an error in chart.wpd and fail the widget registration.

Removing the JavaScript, or fixing the code that interferes with ZK
widget loading, will resolve this error.

## Mixing 2 different versions of ZK jar

Please check your jar and just make sure you include one version of ZK
jar in one application.

# Debugging Steps

- Check if chart.wpd is loaded successfully with developer tool \>
  Network tab.

![](images/chart_wpd.jpg)

- Check if you include any non-ZK JavaScript; remove them one by one to
  find the one that interferes with ZK.
