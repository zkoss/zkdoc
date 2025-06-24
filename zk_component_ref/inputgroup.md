

# Inputgroup

- Demonstration: [Inputgroup – organize your input components](https://blog.zkoss.org/2019/08/16/zk-9-preview-inputgroup-organize-your-input-components/)
- Java API: [org.zkoss.zul.Inputgroup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Inputgroup.html)
- JavaScript API:
  [zul.wgt.Inputgroup](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Inputgroup.html)


{% include version-badge.html version=9.0.0 %} 

# Employment/Purpose

Inputgroup can be used for prepending or appending some components to
the input component, merging them like a new form-input component.

# Example

![](/zk_component_ref/images/Inputgroup_basic.png)

```xml
<zk>
    <inputgroup>
        @<textbox />
    </inputgroup>
    
    <inputgroup>
        <textbox placeholder="Recipient's username"/>@example.com
    </inputgroup>
    
    <inputgroup>
        $<textbox/>.00
    </inputgroup>
    
    <inputgroup>
        With textarea
        <textbox multiline="true" rows="5" cols="30"/>
    </inputgroup>
</zk>
```

# Properties

## Orient

Specify the orientation.

![](/zk_component_ref/images/Inputgroup_vertical.png)

```xml
<inputgroup orient="vertical">
    First and last name<textbox/><textbox/>
</inputgroup>
 
<inputgroup orient="vertical">
    <button label="Button"/>
    <button label="Button"/>
    <button label="Button"/>
    <button label="Button"/>
</inputgroup>
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

- Inherited Supported Events from [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

- Label
- [InputElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/InputElement.html)
- [LabelImageElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelImageElement.html)

# Version History



| Version | Date         | Content                                                                              |
|---------|--------------|--------------------------------------------------------------------------------------|
| 9.0.0   | October 2019 | [ZK-4391](https://tracker.zkoss.org/browse/ZK-4391): Provide an inputgroup component |


