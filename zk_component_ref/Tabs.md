

# Tabs

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: <javadoc>org.zkoss.zul.Tabs</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.tab.Tabs</javadoc>
- Style Guide: [
  Tabbox](ZK_Style_Guide/XUL_Component_Specification/Tabbox)

# Employment/Purpose

A `tabs` is the container for the `tab` components.

# Example

<figure>
<img src="images/ZKComRef_Containers_Tabs.PNG
title="ZKComRef_Containers_Tabs.PNG" />
<figcaption>ZKComRef_Containers_Tabs.PNG</figcaption>
</figure>

``` xml
<zk>
    <tabbox width="400px">
        <tabs>
            <tab label="Tab 1" />
            <tab label="Tab 2" />
        </tabs>
        <tabpanels>
            <tabpanel>This is panel 1</tabpanel>
            <tabpanel>This is panel 2</tabpanel>
        </tabpanels>
    </tabbox>
    <space />
    <tabbox width="400px" mold="accordion">
        <tabs>
            <tab label="Tab 3" />
            <tab label="Tab 4" />
        </tabs>
        <tabpanels>
            <tabpanel>This is panel 3</tabpanel>
            <tabpanel>This is panel 4</tabpanel>
        </tabpanels>
    </tabbox>
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

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

[ Tab](ZK_Component_Reference/Containers/Tabbox/Tab)

# Use Cases

[ Tabbox](ZK_Component_Reference/Containers/Tabbox#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


