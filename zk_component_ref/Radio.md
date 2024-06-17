# Radio

- Demonstration: [Radio](http://www.zkoss.org/zkdemo/input/radio_button)
- Java API: <javadoc>org.zkoss.zul.Radio</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Radio</javadoc>
- Style Guide: [
  Radio](ZK_Style_Guide/XUL_Component_Specification/Radio)

# Employment/Purpose

A `radio` button is a component that can be turned on and off. Radio
buttons are grouped together in a group, called `radiogroup`. Only one
radio button with the same group may be selected at a time.

# Example

![](ZKComRef_radio.png)

``` xml
    <vlayout>
        <radiogroup onCheck="fruit.value = self.selectedItem.label">
            <radio label="Apple"/>
            <radio label="Orange"/>
            <radio label="Banana"/>
        </radiogroup>
        You have selected :
        <label id="fruit" style="color:red"/>
    </vlayout>
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
  Checkbox](ZK_Component_Reference/Input/Checkbox#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description                                    | Example Location                                                                             |
|---------|------------------------------------------------|----------------------------------------------------------------------------------------------|
| 3.6     | Radio buttons with Listitems                   | [<http://www.zkoss.org/forum/listComment/3867>](http://www.zkoss.org/forum/listComment/3867) |
| 3.6     | Radiogroup radio's in seperate table/grid rows | [<http://www.zkoss.org/forum/listComment/9002>](http://www.zkoss.org/forum/listComment/9002) |

See also: [
Radiogroup](ZK_Component_Reference/Input/Radiogroup#Use_Cases)

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
