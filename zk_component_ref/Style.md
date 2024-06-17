# Style

- Demonstration:
  [Style](http://www.zkoss.org/zkdemo/styling/custom_style)
- Java API: <javadoc>org.zkoss.zul.Style </javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.utl.Style</javadoc>
- Style Guide: N/A

# Employment/Purpose

The style component used to specify `CSS` styles for the owner desktop.

**Note:**

- a `style` component can appear anywhere in a zul page, but it affects
  all components in the same `desktop`.
- `getContent()` simply gets the string that is set by setContent(). If
  you call setSrc() or call the constructor of Style(), getContent()
  still gets null.

# Example

  
![](ZKComRef_Style_Example.png "ZKComRef_Style_Example.png")

``` xml
<style> a{ color:red; }</style>
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

- Inherited Supported Events: [
  AbstractComponent](ZK_Component_Reference/Base_Components/AbstractComponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date      | Content                          |
|---------|-----------|----------------------------------|
| 5.0.3   | June 2010 | The media property is supported. |
