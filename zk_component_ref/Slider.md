

# Slider

- Demonstration: [Slider](http://www.zkoss.org/zkdemo/input/slider)
- Java API: <javadoc>org.zkoss.zul.Slider</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.inp.Slider</javadoc>
- Style Guide: [
  Slider](ZK_Style_Guide/XUL_Component_Specification/Slider)

# Employment/Purpose

A slider component represents a slider with a scale and a knob. It can
be used to let user select a value by sliding the knob along the scale.
A slider accepts a range of value starting from 0 to certain maximum
value. The default maximum value of slider scale is 100. You could
change the maximum allowed value by the `maxpos` property. However the
default minimum is 0 and cannot be changed.

# Example

![](ZKComRef_Slider.png)

``` xml
  <slider id="slider" orient="vertical"/>
  <slider curpos="1" maxpos="20"  />
```

# Minimal Position

{% include version-badge.html version=7.0.1 %} Slider supports minimal position,
which can be changed by the minpos property as follows.

![](min_slider.png)

``` xml
  <slider minpos="30"/>
```

Slider also provides `setRange(int, int)` and `setRange(double, double)`
methods to help user change the range from minimal position to maximum
position.

# Decimal Mode

{% include version-badge.html version=7.0.1 %} Set the mode property to "decimal"
will enable decimal slider. So the slider can represent decimal number.

![](dec_slider.png)

``` xml
  <slider mode="decimal" step="0.1"/>
```

# Page Increment

By default, the slider will move to the position of the try on which an
user clicks. If you prefer to move in a fixed amount (like the scrollbar
does), you could specify the amount of value to move by use of
<javadoc method="setPageIncrement(int)">org.zkoss.zul.Slider</javadoc>.

``` xml
  <slider pageIncrement="10"/>
```

# Step

{% include version-badge.html version=7.0.1 %} By default, the slider will scroll to
the position continuously when an user drags it. If you prefer to scroll
a discrete fixed amount on each step, you can set the amount of value of
the `step` property. Step property is useful in decimal mode, slider's
position value could be rounded to a fixed number by specifying step
property. For example, if we want to retrieve the value from decimal
slider in the range of 10.0 to 12.0. As the below picture shows, the
default decimal show the value contains only one digit in fractional
part.

![](dec_slider_no_step.png)

If we want to retrieve the value which contains two digits in fractional
part, we can set the step value to 0.01. Then the value will increase as
10.01, 10.02, 10.02 on each step when scrolling the slider. If step is
0.05, the value will increase as 10.05, 10.10, 10.15 on each step, as
below.

![](dec_slider_step.png)

``` xml
  <slider mode="decimal" minpos="10.0" maxpos="12.0" step="0.05"/>
```

# Knob Mold

{% include edition-availability.html edition=pe %} {% include version-badge.html version=8.6.0 %} Set the mold
property to "knob" will enable knob slider. So the slider can act as a
normal knob. The knob can controlled by wheel, drag, click and enter a
value to the input element.

![](knob360.png)

``` xml
  <slider mold="knob" minpos="0.0" maxpos="100.0" curpos="80.5" step="0.5" strokeWidth="40"/>
```

## AngelArc, StrokeWidth and ScaleInput

AngelArc, strokeWidth and scaleInput are properties only for knob mold.
Set the angelArc property with a double for the angle of the knob
slider. Set the strokeWidth property with a double for the stroke width
of the knob. ScaleInput is the scale ratio of the input size.

![](knob270.png)

``` xml
  <slider mold="knob" strokeWidth="40" angelArc="270" scaleInput="1.3" minpos="0.0" maxpos="100.0" curpos="80.5" step="0.5"/>
```

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>onScroll</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ScrollEvent</javadoc> Denotes the content
of a scrollable component has been scrolled by the user.</p></td>
</tr>
<tr class="even">
<td><center>
<p>onScrolling</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ScrollEvent</javadoc> Denotes that the
user is scrolling a scrollable component. Notice that the component's
content (at the server) won't be changed until onScroll is received.
Thus, you have to invoke the <code>getPos</code> method in the
ScrollEvent class to retrieve the temporary position.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](slider_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>sphere</p>
</center></td>
<td>![](slider_mold_sphere.png)</td>
</tr>
<tr class="odd">
<td><center>
<p>scale</p>
</center></td>
<td>![](slider_mold_scale.png)</td>
</tr>
<tr class="even">
<td><center>
<p>{% include version-badge.html version=8.6.0 %}</p>
</center>
<center>
<p>knob</p>
</center></td>
<td>![](knob270.png)</td>
</tr>
</tbody>
</table>

{% include version-badge.html version=7.0.0 %} the scale mold is deprecated because
designs are changed.

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content                                                                                     |
|---------|--------------|---------------------------------------------------------------------------------------------|
| 5.0.4   | August 2010  | <javadoc method="setPageIncrement(int)">org.zkoss.zul.Slider</javadoc> is supported.        |
| 5.0.4   | August 2010  | Slider support for clicking to increment or decrement                                       |
| 7.0.1   | January 2014 | [Slider support minimal position and decimal mode](http://tracker.zkoss.org/browse/ZK-2085) |


