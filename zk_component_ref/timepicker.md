---
title: "Timepicker"
---


{% include supported-since.html version="8.0.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="ee" %}

- Java API: [org.zkoss.zkmax.zul.Timepicker](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Timepicker.html)
- JavaScript API:
  [zkmax.inp.Timepicker](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.inp.Timepicker.html)


# Employment/Purpose

A selection box for holding a time (a java.util.Date Object) , but only
Hour, Minute, and Second are used.

# Example

![](/zk_component_ref/images/ZKCompRef_Timepicker.png)

```xml
<timepicker/>
```

{% include IntegrateMomentjs.md %}

# Properties

## Format

Use *a* to signify it is *am* or *pm*. The input string follows the
formatting of the
[SimpleDateFormat](http://java.sun.com/j2se/1.5.0/docs/api/java/text/SimpleDateFormat.html).

Below is an example of using *a* within the format.

```xml
<zk>
    <window title="Test">
        <timepicker format="a hh:mm:ss"/>
    </window>
</zk>
```

{% include supported-since.html version="5.0.7" %} In addition to specifying the format
explicitly, you could specify the styling. There are two different types
of styling: short, and medium (representing the styling of
java.text.DateFormat). For example, you could specify the styling rather
than the real format as follows.

```xml
<timepicker format="short"/>
<timepicker format="medium"/>
```

Then the real format of the timepicker will be decided at run time
depending the configuration. For more information, please refer to [ZK Developer's Reference: Date and Time Formatting]({{site.baseurl}}/zk_dev_ref/internationalization/date_and_time_formatting).

## Minimum Time

By default, the options of timepicker start at 0:00 AM, you could
specify another minimum time by using a java.util.Date Object.

```xml
<zscript>
    import java.util.Date;
    Date min = new Date();
    min.setTime(0);
</zscript>
<timepicker format="HH:mm a" min="${min}" />
```

## Maximum Time

By default, the options of timepicker end before 12:00 AM, you could
specify another maximum time by using a java.util.Date Object.

```xml
<zscript>
    import java.util.Date;
    Date max = new Date();
    max.setTime(0);
</zscript>
<timepicker format="HH:mm a" max="${max}" />
```

## Interval

By default, the interval of the options in timepicker is one hour, you
could specify the interval by using an integer (unit: 1 second).

```xml
<timepicker format="HH:mm a" interval="600" />
```

# Inherited Functions

Please refer to [ FormatInputElement]({{site.baseurl}}/zk_component_ref/formatinputelement)
for inherited functions.

# Supported Events

- Inherited Supported Events: [ FormatInputElement]({{site.baseurl}}/zk_component_ref/formatinputelement#Supported_Events)

# Supported Children

`*NONE`
