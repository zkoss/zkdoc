

# Panel Children

- Demonstration: [Panel](http://www.zkoss.org/zkdemo/window/panel)
- Java API: [org.zkoss.zul.Panelchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Panelchildren.html)
- JavaScript API:
  <javadoc directory="jsdoc">zul.wnd.Panelchildren</javadoc>


# Employment/Purpose

Panelchildren is used for Panel component to manage each child who will
be shown in the body of Panel. Note that the size of Panelchildren is
automatically calculated by Panel so both setWidth(String) and
setHeight(String) are read-only.

# Example

![](/zk_component_ref/images/ZKComRef_Panel_Simple_Examples.PNG)

```xml
<panel height="100px" width="200px" style="margin-bottom:10px"
     title="Panel1" border="normal" maximizable="true"
     collapsible="true">
     <panelchildren>PanelContent1</panelchildren>
</panel>
<panel height="100px" width="200px" framable="true" title="Panel2"
     border="normal" maximizable="true" style="margin-bottom:10px">
     <panelchildren>PanelContent2</panelchildren>
</panel>
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

[ Panel]({{site.baseurl}}/zk_component_ref/containers/panel#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


