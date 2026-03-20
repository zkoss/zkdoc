---
title: "Accessibility"
---

ZK Charts includes an accessibility module to help make your charts more usable for people with disabilities.

## Enabling Accessibility Module

By default, the Highcharts accessibility module is not loaded. If it's missing, you might see a warning in the browser console:

> Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning.

To enable this module and eliminate the warning, you can set the following library property in `zk.xml`:

```xml
<library-property>
    <name>org.zkoss.chart.modules.accessibility</name>
    <value>true</value>
</library-property>
```

When this property is set to `true`, ZK Charts will automatically include the `accessibility.js` module from Highcharts.

## Configuring Accessibility

Once the module is enabled, you can further configure accessibility options through the `Accessibility` object in Java:

```java
Charts chart = new Charts();
chart.getAccessibility().setEnabled(true);
// ... other accessibility settings
```

For more details on available accessibility options, please refer to the [Accessibility JavaDoc](https://www.zkoss.org/javadoc/latest/zkcharts/org/zkoss/chart/Accessibility.html).
