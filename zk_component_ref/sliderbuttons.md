

# Sliderbuttons

- Demonstration:
- Java API:
  [Sliderbuttons](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Sliderbuttons.html)
- JavaScript API:
  [Sliderbuttons](http://www.zkoss.org/javadoc/latest/jsdoc/zkex/slider/Sliderbuttons.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version=9.0.0 %}

# Employment/Purpose

A pair of draggable buttons defining the start value and the end value
in a Multislider.

# Example

![](/zk_component_ref/images/ZKComRef_Sliderbuttons.png)

```xml
<zk>
  <multislider>
    <sliderbuttons startValue="10" endValue="70"/>
  </multislider>
</zk>
```

# Properties

## StartValue, EndValue

Represent the range value. (Default: 0)

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
<p>onRangeValueChange</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkex.zul.event.RangeValueChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/event/RangeValueChangeEvent.html)
Denotes the range value of a component has been changed by the
user.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`


