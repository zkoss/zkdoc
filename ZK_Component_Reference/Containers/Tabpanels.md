# Tabpanels

- **Demonstration**: [Tabbox Demo](https://www.zkoss.org/zkdemo/tabbox)
- **Java API**: [org.zkoss.zul.Tabpanels](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabpanels.html)
- **JavaScript API**: [zul.tab.Tabpanels](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabpanels.html)

## Employment/Purpose

A `tabpanels` component is a container for tab panels, which are a collection of tabpanel components.

## Example

The example below demonstrates the usage of the `tabpanels` component within a `tabbox`. In this example, two sets of tabs and tab panels are defined within separate `tabbox` components. The first `tabbox` displays tabs horizontally, while the second `tabbox` uses an accordion-style layout.

![Tabpanels Example](ZKComRef_Containers_Tabs.png)

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

Try it

* [Tabbox](https://zkfiddle.org/sample/cd1tff/1-ZK-Component-Reference-Tabbox-Example?v=latest&t=Iceblue%20Compact)


## Supported Children

[`Tabpanel`](Tabpanel.md): Represents a single `Tabpanel` within the `Tabpanels` component. The `Tabpanels` component can include multiple `Tabpanel` components as its children.