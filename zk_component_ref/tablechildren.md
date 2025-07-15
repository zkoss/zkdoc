

# Tablechildren

- Demonstration:
  [Tablelayout](http://www.zkoss.org/zkdemo/layout/table_layout)
- Java API: [org.zkoss.zkmax.zul.Tablechildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Tablechildren.html)
- JavaScript API:
  [zkmax.layout.Tablechildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Tablechildren.html)

- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

# Employment/Purpose

The cell of Tablelayout. The child component of Tablechildren can only
be Panel.

{% include version-badge.html version=6.0.0 %}

The child of tablechildren can be any component.

# Example

![](/zk_component_ref/images/ZKComRef_Tablelayout_Example.PNG)

```xml
<tablelayout columns="2">
    <tablechildren>
        <panel title="Table 1" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 2" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 3" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
    <tablechildren>
        <panel title="Table 4" border="normal" maximizable="true"
            collapsible="true" width="200px" height="200px">
            <panelchildren>Panel Content</panelchildren>
        </panel>
    </tablechildren>
</tablelayout>
```

{% include version-badge.html version=6.0.0 %}

The child of tablechildren can be any component.

![](/zk_component_ref/images/ZKComRef_Tablelayout_Example_ZK6.PNG‎)

```xml
    <tablelayout columns="2">
        <tablechildren>
            <label value="Table 1" />
        </tablechildren>
        <tablechildren>
            <button label="Table 2" />
        </tablechildren>
        <tablechildren>
            <textbox value="Table 3" />
        </tablechildren>
        <tablechildren>
            <window border="normal">
                Table 4
            </window>
        </tablechildren>
    </tablelayout>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Panel`]({{site.baseurl}}/zk_component_ref/panel)

{% include version-badge.html version=6.0.0 %}

`* Any`

# Use Cases

[ Tablelayout ]({{site.baseurl}}/zk_component_ref/tablelayout#Use_Cases)



