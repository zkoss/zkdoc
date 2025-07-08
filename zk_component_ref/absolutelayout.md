

# Absolutelayout

- Demonstration: N/A
- Java API: [org.zkoss.zul.Absolutelayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Absolutelayout.html)
- JavaScript API:
  [zul.layout.Absolutelayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Absolutelayout.html)


{%include version-badge.html version="6.0.0" %}

# Employment/Purpose

An Absolutelayout component can contain absolute positioned multiple
absolutechildren components.

# Example

![](/zk_component_ref/images/ZKComRef_Absolutelayout_Example.png)

```xml
<?component name="window" extends="window" border="normal" width="300px" height="300px"?>
<zk>
    <absolutelayout>
        <absolutechildren id="w1" x="60" y="100">
            <window title="X=60, Y=100">
            Window 1
            </window>
        </absolutechildren>
        <absolutechildren id="w2" x="160" y="200">
            <window title="X=160, Y=200">
            Window 2
            </window>
        </absolutechildren>
        <absolutechildren id="w3" x="260" y="300">
            <window title="X=260, Y=300">
            Window 3
            </window>
        </absolutechildren>
    </absolutelayout>
</zk>
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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[`Absolutechildren`]({{site.baseurl}}/zk_component_ref/absolutechildren)

