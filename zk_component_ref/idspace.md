

# Idspace

- Demonstration: N/A
- Java API: [org.zkoss.zul.Idspace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Idspace.html)
- JavaScript API: [zul.wgt.Idspace](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Idspace.html)

# Employment/Purpose

`Idspace` is just like a
[Div]({{site.baseurl}}/zk_component_ref/containers/div) but implements
the [ID space]({{site.baseurl}}/zk_dev_ref/ui_composing/id_space), all
descendant components of Idspace (including the Idspace itself) form an
independent ID space. Thus, you could use an idspace as the topmost
component to group components. This way developers only need to maintain
the uniqueness of each subset separately.

{% include version-badge.html version=8.0.3 %}

To group components without rendering a Div, `Idspace` provides "nodom"
mold. It would render no-dom widget in client-side. It only renders
comment nodes for positioning.

Notice that it's not recommended to use hflex/vflex in the children of
nodom element.

# Example

![](/zk_component_ref/images/ZKComRef_Idspace_Example.png)

```xml
<idspace>
    <window border="normal">
        <button id="btn" label="button" />
    </window>
    <div>
        <button id="btn" label="button" />
    </div>
</idspace>
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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


