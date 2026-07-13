---
title: "Rangeslider"
---

- **Demonstration:** [Rangeslider](https://www.zkoss.org/zkdemo/input/slider)
- **Java API:** [org.zkoss.zkex.zul.Rangeslider](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Rangeslider.html)
- **JavaScript API:** [zkex.slider.Rangeslider](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.slider.Rangeslider.html)

{% include edition-availability.html edition="ee" %}
{% include supported-since.html version="9.0.0" %}

# Employment/Purpose

A rangeslider component represents a slider with a start and an end
value. A rangeslider accepts a range of value starting from 0 to a
certain maximum value. The default maximum value of rangeslider is 100.
You can change the maximum allowed value by setting the max property.
Notice that the value of max property is always larger than the value of
min property.

## Common Use Cases

### Price or Date Range Filter

Use a rangeslider when users need to set both a lower and upper bound simultaneously — for example, filtering a product listing by price band or narrowing search results to a date range. The component's dual-thumb design makes the intent clear without requiring two separate inputs.

```xml
<rangeslider min="0" max="500" startValue="50" endValue="300"
             onRangeValueChange="updateFilter(event.startValue, event.endValue)"/>
```

### Configuring a Numeric Window or Tolerance

When the domain requires a symmetric or asymmetric tolerance window (e.g. audio equaliser bands, temperature thresholds, data-quality score ranges), a rangeslider lets the user drag both ends of the window in one control.

```xml
<rangeslider min="-20" max="20" startValue="-5" endValue="5" step="1"
             markScale="5" tooltipVisible="true"/>
```

### Vertical Layout for Timelines or Axes

Set `orient="vertical"` to embed the rangeslider alongside a chart axis or timeline, letting users zoom in to a sub-range while the axis orientation stays consistent with the chart.

```xml
<rangeslider orient="vertical" min="0" max="24" startValue="8" endValue="18"
             markScale="4"/>
```

# Example

![](/zk_component_ref/images/ZKComRef_Rangeslider.png)

```xml
  <rangeslider startValue="10" endValue="90"/>

  <rangeslider orient="vertical" startValue="20" endValue="80" markScale="20" />
```

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowDown | Move the slider button. |
| ArrowLeft / ArrowRight | Move the slider button. |
| Home / End | Move the slider button to the minimum/maximum. |
| PageUp / PageDown | Move the slider button in the large step. |

## ARIA Attributes

| Attributes | Description |
|---|---|
| data-ariaStartLabel | Describe the the slider button (start). |
| data-ariaEndLabel | Describe the the slider button (end). |
| data-largeStep-multiplier (optional) | Describe the moving step of pressing PageUp/PageDown. |

## ARIA Example

```xml
<zk xmlns:ca="client/attribute">
  <rangeslider ca:aria-label="range value" ca:data-ariaStartLabel="minimal range value"
      ca:data-ariaEndLabel="maximal range value"/>
</zk>
```

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Properties

## Orient

{% include DefaultValue.md value="horizontal" %}

Sets it either "horizontal" or "vertical" to display rangslider.

## Marks

{% include DefaultValue.md value="null" %}

Sets the marks information map for displaying value marks. In this map,
the key represents the number value of slider, and the value represents
the displayed scale text.

## MarkScale

{% include DefaultValue.md value="20" %}

Sets the marks information for displaying value marks.

By default, the value marks will be displayed every 20 starting from the
minimum value. (if min is 0, then it displays "0 20 40 ...")

If the MarkScale is 0 and there is no Map information in Marks (see
above), the marks will be empty.

![](/zk_component_ref/images/ZKComRef_RangesliderNoMarks.png)

## Max

{% include DefaultValue.md value="100" %}

Rangeslider supports maximal position, which can be changed by the max
property.

## Min

{% include DefaultValue.md value="0" %}

Rangeslider supports minimal position, which can be changed by the min
property.

## StartValue

**Default Value:** `0`

Represents the starting value of the rangeslider range.

```xml
<rangeslider startValue="10" endValue="90"/>
```

## EndValue

**Default Value:** `0`

Represents the ending value of the rangeslider range.

```xml
<rangeslider startValue="10" endValue="90"/>
```

## Step

{% include DefaultValue.md value="1" %}

By default, the rangeslider will scroll to the position continuously
when a user drags it. If you prefer to scroll a discrete fixed amount at
each step, you can set the amount of value using the step property.

## TooltipVisible

{% include DefaultValue.md value="false" %}

The tooltip displays the value of a slider button in the rangeslider. If
the tooltipvisible is true, the tooltips of the slider buttons will
always be visible.

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| onRangeValueChange | [RangeValueChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/event/RangeValueChangeEvent.html) | Denotes the range value of a component has been changed by the user. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`
