

# Progressmeter

- Demonstration:
  [Progressmeter](http://www.zkoss.org/zkdemo/effects/upload_effect)
- Java API: <javadoc>org.zkoss.zul.Progressmeter</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.wgt.Progressmeter</javadoc>


# Employment/Purpose

A progress meter is a bar that indicates how much of a task has been
completed. The value property must be in the range between 0 and 100.

# Example

![](/zk_component_ref/images/ZKComRef_Progressmeter_Example.PNG)

```xml
     <progressmeter value="10"/>
```

# Properties

## Indeterminate

`{% include version-badge.html version=8.6.1 %}`

If true, the progressmeter will show an indeterminate animation and the
real value of the progressmeter will be hidden.(default false)

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
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date      | Content                                                                                                            |
|---------|-----------|--------------------------------------------------------------------------------------------------------------------|
|         |           |                                                                                                                    |
| 8.6.1   | Jan, 2019 | [ZK-3629](https://tracker.zkoss.org/browse/ZK-3629): use the progressmeter to indicate a long operation is so hard |


