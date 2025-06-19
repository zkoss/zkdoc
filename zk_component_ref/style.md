

# Style

- Demonstration:
  [Style](http://www.zkoss.org/zkdemo/styling/custom_style)
- Java API: [org.zkoss.zul.Style](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Style.html)
- JavaScript API: <javadoc directory="jsdoc">zul.utl.Style</javadoc>


# Employment/Purpose

The style component used to specify `CSS` styles for the owner desktop.

**Note:**

- a `style` component can appear anywhere in a zul page, but it affects
  all components in the same `desktop`.
- `getContent()` simply gets the string that is set by setContent(). If
  you call setSrc() or call the constructor of Style(), getContent()
  still gets null.

# Example

  
![](/zk_component_ref/images/ZKComRef_Style_Example.png)

```xml
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

- Inherited Supported Events: [ AbstractComponent]({{site.baseurl}}/zk_component_ref/base_components/abstractcomponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date      | Content                          |
|---------|-----------|----------------------------------|
| 5.0.3   | June 2010 | The media property is supported. |


