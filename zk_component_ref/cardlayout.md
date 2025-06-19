

# Cardlayout

- Demonstration: N/A
- Java API: [org.zkoss.zkmax.zul.Cardlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Cardlayout.html)
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.Cardlayout</javadoc>

- {% include edition-availability.html edition="pe" %}

# Employment/Purpose

`Cardlayout` is a layout that allows end-users to change component like
changing cards. The `selectedIndex` will decide which component will be
shown in the view port. When the value of `selectedIndex` changes or
when `next()` or `previous()` is called, transition of components
through animation will occur whereas the `orient` attribute decides
whether the direction of the animation is horizontal or vertical.

![](/zk_component_ref/images/ZKComRef_Cardlayout_Horizontal.png)
![](/zk_component_ref/images/ZKComRef_Cardlayout_Vertical.png)

# Example

![](/zk_component_ref/images/cardlayout.gif)

```xml
    <cardlayout id="card" width="300px" height="200px" style="border:3px solid orange" selectedIndex="1">
        <div vflex="1" hflex="1" style="background-color:yellow;padding:20px">card 1</div>
        <div vflex="1" hflex="1" style="background-color:green;padding:20px">card 2</div>
        <div vflex="1" hflex="1" style="background-color:skyblue;padding:20px">card 3</div>
    </cardlayout>
    <hlayout>
        <button onClick="card.previous()">previous</button>
        <button onClick="card.next()">next</button>
        <button 
          onClick='card.setOrient("horizontal".equals(card.getOrient()) ? "vertical" : "horizontal")'>
          change orient
        </button>
    </hlayout>
```

# Size Issue

If `Cardlayout` of `hflex` is set as `"min"`, it's width will be decided
by the selected component's size when initializing. On the other hand,
if the child component of `Cardlayout` sets `hflex="1"`, its width will
equal to `Cardlayout`'s width.

# Swipe Distance Issue

On tablet, think for user experience `Cardlayout` will change component
if swipe distance bigger than one-third of it's width/height. If
`Cardlayout`'s width/height is smaller than 90px, the minimum trigger
distance will be 30px. Another case is `Image`. If `Cardlayout`'s child
component is `Image`, it will use default swipe distance trigger
setting.

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content                                                           |
|---------|--------------|-------------------------------------------------------------------|
| 6.5.0   | August, 2012 | [org.zkoss.zkmax.zul.Cardlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Cardlayout.html) was introduced. |


