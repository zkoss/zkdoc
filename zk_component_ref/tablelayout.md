

# Tablelayout

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

- Demonstration:
  [Tablelayout](http://www.zkoss.org/zkdemo/layout/table_layout)
- Java API: [org.zkoss.zkmax.zul.Tablelayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Tablelayout.html)
- JavaScript API:
  [zkmax.layout.Tablelayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Tablelayout.html)


# Employment/Purpose

Tablelayout lays out a container as an HTML table in which the columns
can be specified, and rowspan and colspan of its child can also be
specified to create complex layouts within the table.

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

The child of tablechildren can be any component:

![](/zk_component_ref/images/ZKComRef_Tablelayout_Example_ZK6.PNG)

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

`*`[` Tablechildren`]({{site.baseurl}}/zk_component_ref/tablechildren)
