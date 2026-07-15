---
title: "Slider"
---

- **Demonstration:** [Slider](https://www.zkoss.org/zkdemo/input/slider)
- **Java API:** [org.zkoss.zul.Slider](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Slider.html)
- **JavaScript API:** [zul.inp.Slider](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Slider.html)

{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A slider component represents a slider with a scale and a knob. It can be used to let user select a value by sliding the knob along the scale. A slider accepts a range of values from a minimum to maximum position. The default range is 0 to 100, but both bounds are configurable via the `minpos` and `maxpos` properties.

## Common Use Cases

- **Volume or brightness control** — bind `curpos` to a ViewModel property and display the value in a label next to the slider.
- **Price or age range filter** — set `minpos` and `maxpos` to the filter bounds; use `step` to restrict selection to whole numbers.
- **Progress indicator (read-only)** — disable the slider and drive `curpos` from a background task to show completion percentage.
- **Circular knob input** — switch to `mold="knob"` and tune `angleArc`, `strokeWidth`, and `scaleInput` for a dial-style control (e.g. audio equaliser, thermostat UI).

# Example

![Slider](/zk_component_ref/images/ZKComRef_Slider.png)

```xml
  <slider id="slider" orient="vertical"/>
  <slider curpos="1" maxpos="20"  />
```

# Minimal Position

{% include supported-since.html version="7.0.1" %} Slider supports minimal position,
which can be changed by the minpos property as follows.

![Min slider](/zk_component_ref/images/min_slider.png)

```xml
  <slider minpos="30"/>
```

Slider also provides `setRange(int, int)` and `setRange(double, double)`
methods to help user change the range from minimal position to maximum
position.

# Decimal Mode

{% include supported-since.html version="7.0.1" %} Set the mode property to "decimal"
will enable decimal slider. So the slider can represent decimal number.

![Dec slider](/zk_component_ref/images/dec_slider.png)

```xml
  <slider mode="decimal" step="0.1"/>
```

# Page Increment

By default, the slider will move to the position of the try on which an
user clicks. If you prefer to move in a fixed amount (like the scrollbar
does), you could specify the amount of value to move by use of
[org.zkoss.zul.Slider#setPageIncrement(int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Slider.html#setPageIncrement(int)).

```xml
  <slider pageIncrement="10"/>
```

# Step

{% include supported-since.html version="7.0.1" %} By default, the slider will scroll to
the position continuously when an user drags it. If you prefer to scroll
a discrete fixed amount on each step, you can set the amount of value of
the `step` property. Step property is useful in decimal mode, slider's
position value could be rounded to a fixed number by specifying step
property. For example, if we want to retrieve the value from decimal
slider in the range of 10.0 to 12.0. As the below picture shows, the
default decimal show the value contains only one digit in fractional
part.

![Dec slider no step](/zk_component_ref/images/dec_slider_no_step.png)

If we want to retrieve the value which contains two digits in fractional
part, we can set the step value to 0.01. Then the value will increase as
10.01, 10.02, 10.02 on each step when scrolling the slider. If step is
0.05, the value will increase as 10.05, 10.10, 10.15 on each step, as
below.

![Dec slider step](/zk_component_ref/images/dec_slider_step.png)

```xml
  <slider mode="decimal" minpos="10.0" maxpos="12.0" step="0.05"/>
```

# Knob Mold

{% include supported-since.html version="8.6.0" %} Set the mold property to "knob" to enable the knob slider, which acts as a circular dial. The knob can be controlled by wheel, drag, click, or by entering a value directly into the input element.

![Knob360](/zk_component_ref/images/knob360.png)

```xml
<slider mold="knob" minpos="0.0" maxpos="100.0" curpos="80.5" step="0.5" strokeWidth="40"/>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| onScroll | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | Denotes that the user has finished scrolling the slider. The component's position has been updated on the server. |
| onScrolling | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | Denotes that the user is actively scrolling the slider. The component's content (at the server) is not updated until onScroll is received. Use `getPos()` in the ScrollEvent to retrieve the temporary position while dragging. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in zul.jar.

**default**

![Slider mold default](/zk_component_ref/images/slider_mold_default.png)

**sphere**

![Slider mold sphere](/zk_component_ref/images/slider_mold_sphere.png)

**scale**

{% include supported-since.html version="7.0.0" %} The scale mold is deprecated because designs have been changed.

![Slider mold scale](/zk_component_ref/images/slider_mold_scale.png)

**knob**

{% include supported-since.html version="8.6.0" %}

![Knob270](/zk_component_ref/images/knob270.png)

# Supported Children

`*None`

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowRight | Increases the value of the slider by one step. |
| ArrowDown / ArrowLeft | Decreases the value of the slider by one step. |
| Home | Sets slider to its minimum value. |
| End | Sets slider to its maximum value. |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Properties

## Curpos

**Default Value:** `0`

Sets the current position of the slider knob. The value is clamped to the range `[minpos, maxpos]`: a negative value is treated as `0`, and a value larger than `maxpos` is reduced to `maxpos`. Fractional (decimal) positions are accepted in `decimal` mode (see [Decimal Mode](#decimal-mode)).

```xml
<slider curpos="30" maxpos="100"/>
```

## Minpos

**Default Value:** `0`

Sets the minimum position of the slider. Must not be negative — a negative value throws a `WrongValueException`. If the current `curpos` is below the new minimum, `curpos` is raised to match.

```xml
<slider minpos="10" maxpos="100"/>
```

## Maxpos

**Default Value:** `100`

Sets the maximum position of the slider. Must be greater than `0` — a zero or negative value throws a `WrongValueException`. If the current `curpos` exceeds the new maximum, `curpos` is lowered to match.

```xml
<slider minpos="0" maxpos="50"/>
```

## PageIncrement

**Default Value:** `-1`

Sets the amount `curpos` changes by when the user clicks the slider tray (like a scrollbar page jump). The default `-1` (any negative value) makes the slider jump directly to the clicked position instead of moving by a fixed amount.

```xml
<slider pageIncrement="10" maxpos="100"/>
```

## Orient

**Default Value:** `"horizontal"`

Sets the orientation of the slider. Accepted values:

| Value | Meaning |
|-------|---------|
| `horizontal` | Slider runs left-to-right (default) |
| `vertical` | Slider runs top-to-bottom |

Note: the `scale` mold does not support `vertical` orientation — a `WrongValueException` is thrown if you combine them.

{% include supported-since.html version="3.5.0" %}

```xml
<slider orient="vertical" curpos="30" maxpos="100"/>
```

## Slidingtext

**Default Value:** `"{0}"`

Sets the template text shown in the tooltip while the user is dragging the slider knob. The placeholder `{0}` is replaced with the current position value at the client side. If set to an empty string or `null`, it reverts to `"{0}"`.

{% include supported-since.html version="3.0.1" %}

```xml
<slider slidingtext="Volume: {0}" curpos="50" maxpos="100"/>
```

## Step

**Default Value:** `-1`

Sets the discrete step size used when the user drags the slider. Any non-positive value is treated as `-1`, which means the slider moves freely to wherever the user drags. In `decimal` mode, when `step` is `-1`, the fractional part is limited to one digit.

{% include supported-since.html version="7.0.1" %}

```xml
<slider step="5" minpos="0" maxpos="100" curpos="0"/>
```

## Name

**Default Value:** `null`

Sets the `name` attribute submitted with an HTML form. This is intended for legacy web applications that process user input through servlets and HTML-based form submission. It has no effect in pure ZK event-driven applications.

```xml
<slider name="volume" curpos="50" maxpos="100"/>
```

## AngleArc

**Default Value:** `360.0`

Sets the sweep angle (in degrees) of the arc drawn for the knob mold. Must be greater than `0` and no greater than `360`; values outside this range throw a `WrongValueException`. Use values less than `360` to create a partial-arc (e.g. horseshoe-shaped) knob. This property has no visual effect in non-knob molds.

{% include supported-since.html version="8.6.0" %}

```xml
<slider mold="knob" angleArc="270" curpos="50" maxpos="100"/>
```

## StrokeWidth

**Default Value:** `10.0`

Sets the stroke (ring) width of the knob slider arc, in SVG user units. Must be greater than `0`; a non-positive value throws a `WrongValueException`. This property has no visual effect in non-knob molds.

{% include supported-since.html version="8.6.0" %}

```xml
<slider mold="knob" strokeWidth="6.0" curpos="50" maxpos="100"/>
```

## ScaleInput

**Default Value:** `1.0`

Sets the scale ratio applied to the numeric input element displayed inside the knob mold. A value greater than `1.0` enlarges the input; a value between `0` and `1.0` shrinks it. Must be greater than `0`. This property has no visual effect in non-knob molds.

{% include supported-since.html version="8.6.0" %}

```xml
<slider mold="knob" scaleInput="1.5" curpos="50" maxpos="100"/>
```