

# Tabpanels

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: [org.zkoss.zul.Tabpanels](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabpanels.html)
- JavaScript API: [zul.tab.Tabpanels](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabpanels.html)


# Employment/Purpose

A `tabpanels` is the container for the tab panels, i.e., a collection of
tabpanel components.

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

[ Tabpanel]({{site.baseurl}}/zk_component_ref/containers/tabbox/tabpanel)

# Use Cases

[ Tabbox]({{site.baseurl}}/zk_component_ref/containers/tabbox#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


