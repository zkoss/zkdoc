---
title: "Rangeslider"
---


- Demonstration:
- Java API:
  [Rangeslider](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Rangeslider.html)
- JavaScript API:
  [Rangeslider](http://www.zkoss.org/javadoc/latest/jsdoc/zkex/slider/Rangeslider.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version=9.0.0 %}

# Employment/Purpose

A rangeslider component represents a slider with a start and an end
value. A rangeslider accepts a range of value starting from 0 to a
certain maximum value. The default maximum value of rangeslider is 100.
You can change the maximum allowed value by setting the max property.
Notice that the value of max property is always larger than the value of
min property.

# Example

![](/zk_component_ref/images/ZKComRef_Rangeslider.png)

```xml
  <rangeslider startValue="10" endValue="90"/>

  <rangeslider orient="vertical" startValue="20" endValue="80" markScale="20" />
```

# Properties

## Disabled

{% include DefaultValue.md value=false %}

If the rangeslider is disabled, then users can not drag the slider
buttons.

## Orient

{% include DefaultValue.md value=horizontal %}

Sets it either "horizontal" or "vertical" to display rangslider.

## Marks

{% include DefaultValue.md value=null %}

Sets the marks information map for displaying value marks. In this map,
the key represents the number value of slider, and the value represents
the displayed scale text.

## MarkScale

{% include DefaultValue.md value=20 %}

Sets the marks information for displaying value marks.

By default, the value marks will be displayed every 20 starting from the
minimum value. (if min is 0, then it displays "0 20 40 ...")

If the MarkScale is 0 and there is no Map information in Marks (see
above), the marks will be empty.

![](/zk_component_ref/images/ZKComRef_RangesliderNoMarks.png)

## Max

{% include DefaultValue.md value=100 %}

Rangeslider supports maximal position, which can be changed by the max
property.

## Min

{% include DefaultValue.md value=0 %}

Rangeslider supports minimal position, which can be changed by the min
property.

## StartValue, EndValue

{% include DefaultValue.md value=0 %}

Represent the range value of Rangeslider.

## Step

{% include DefaultValue.md value=1 %}

By default, the rangeslider will scroll to the position continuously
when a user drags it. If you prefer to scroll a discrete fixed amount at
each step, you can set the amount of value using the step property.

## TooltipVisible

{% include DefaultValue.md value=false %}

The tooltip displays the value of a slider button in the rangeslider. If
the tooltipvisible is true, the tooltips of the slider buttons will
always be visible.

# Supported Events

| Name | Event Type |
|---|---|
| onRangeValueChange | <strong>Event:</strong>
[org.zkoss.zkex.zul.event.RangeValueChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/event/RangeValueChangeEvent.html)
Denotes the range value of a component has been changed by the
user. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`


