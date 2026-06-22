---
title: "Timepicker"
---

- **Demonstration:** [Timepicker](https://www.zkoss.org/zkdemo/input/timepicker)
- **Java API:** [org.zkoss.zkmax.zul.Timepicker](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Timepicker.html)
- **JavaScript API:** [zkmax.inp.Timepicker](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.inp.Timepicker.html)

{% include edition-availability.html edition="ee" %}

{% include supported-since.html version="8.0.0" %}

# Employment/Purpose

A selection box for holding a time (a java.util.Date Object), but only Hour, Minute, and Second are used.

## Common Use Cases

- **Appointment or scheduling forms** — present a constrained set of selectable slots (e.g. business hours only) using `min`/`minInLocalTime` and `max`/`maxInLocalTime` together with `interval`.
- **Time-of-day input without free text** — set `readonly="true"` so users must pick from the generated dropdown, preventing malformed input.
- **12-hour or locale-sensitive display** — specify `format="a hh:mm"` (AM/PM) or one of the named styles (`format="short"` / `format="medium"`) to match regional conventions.
- **Java 8 time API integration** — use `minInLocalTime` / `maxInLocalTime` to bind directly with `LocalTime` values from a ViewModel without converting to `java.util.Date`.

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

## Min

**Default Value:** `null` (no minimum — options start at 00:00:00)

By default, the options of timepicker start at 00:00, you can specify another minimum time by using a `java.util.Date` object.

```xml
<zscript>
    import java.util.Date;
    Date min = new Date();
    min.setTime(0);
</zscript>
<timepicker format="HH:mm a" min="${min}" />
```

## Max

**Default Value:** `null` (no maximum — options end just before 24:00:00)

By default, the options of timepicker end just before 24:00, you can specify another maximum time by using a `java.util.Date` object.

```xml
<zscript>
    import java.util.Date;
    Date max = new Date();
    max.setTime(0);
</zscript>
<timepicker format="HH:mm a" max="${max}" />
```

## MinInLocalTime

**Default Value:** `null` (no minimum — options start at 00:00:00)

{% include supported-since.html version="9.0.0" %}

Sets the minimum selectable time using a `java.time.LocalTime` value. This is the preferred alternative to the `Date`-based `min` property when working with the Java 8 time API. Pass `null` to remove any lower bound.

The value is a `LocalTime` object; construct it in a `<zscript>` block or a composer/ViewModel and reference it via EL.

```xml
<zscript>
    import java.time.LocalTime;
    LocalTime earliest = LocalTime.of(8, 0);
</zscript>
<timepicker minInLocalTime="${earliest}" format="HH:mm" />
```

## MaxInLocalTime

**Default Value:** `null` (no maximum — options end just before 24:00:00)

{% include supported-since.html version="9.0.0" %}

Sets the maximum selectable time using a `java.time.LocalTime` value. This is the preferred alternative to the `Date`-based `max` property when working with the Java 8 time API. Pass `null` to remove any upper bound.

The value is a `LocalTime` object; construct it in a `<zscript>` block or a composer/ViewModel and reference it via EL.

```xml
<zscript>
    import java.time.LocalTime;
    LocalTime latest = LocalTime.of(18, 0);
</zscript>
<timepicker maxInLocalTime="${latest}" format="HH:mm" />
```

## Readonly

**Default Value:** `false`

When set to `true`, the user cannot type directly into the input box; the time can only be chosen from the dropdown options. The component remains enabled and its value can still be changed programmatically.

```xml
<timepicker readonly="true" format="HH:mm" />
```

## Interval

By default, the interval of the options in timepicker is one hour, you
could specify the interval by using an integer (unit: 1 second).

```xml
<timepicker format="HH:mm a" interval="600" />
```

# Supported Events

- Inherited Supported Events: [FormatInputElement]({{site.baseurl}}/zk_component_ref/formatinputelement#Supported_Events)

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [FormatInputElement]({{site.baseurl}}/zk_component_ref/formatinputelement) for inherited functions.
