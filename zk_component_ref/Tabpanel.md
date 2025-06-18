

# Tabpanel

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: <javadoc>org.zkoss.zul.Tabpanel</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.tab.Tabpanel</javadoc>


# Employment/Purpose

A `tabpanel`is the body of a single tab panel. You would place the
content for a group of components within a tab panel. The first
`tabpanel`corresponds to the first `tab,`the second
`tabpanel`corresponds to the second `tab`and so on.

# Example

![](/zk_component_ref/images/ZKComRef_Containers_Tabs.PNG)

```xml
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
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description                              | Example Location                                                                             |
|---------|------------------------------------------|----------------------------------------------------------------------------------------------|
| 3.6     | How to put a scrollbar inside a tabpanel | [<http://www.zkoss.org/forum/listComment/9889>](http://www.zkoss.org/forum/listComment/9889) |
| 3.6     | How to make a tabpanel loaded on demand  | [<http://www.zkoss.org/forum/listComment/6236>](http://www.zkoss.org/forum/listComment/6236) |

See also: [
Tabbox]({{site.baseurl}}/zk_component_ref/containers/tabbox#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


