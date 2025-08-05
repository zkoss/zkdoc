
- *Demonstration*: [Tabbox](https://www.zkoss.org/zkdemo/tabbox)
- Java API: [org.zkoss.zul.Tabs](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabs.html)
- JavaScript API: [zul.tab.Tabs](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabs.html)

## Employment/Purpose
The `tabs` component serves as a container for multiple `tab` components. It allows organizing content within a tabbed interface where users can switch between different sections or views by clicking on tabs.

## Example

The example below demonstrates the usage of the `Tabs` component in a ZK application:

![Tabs Example](images/ZKComRef_Containers_Tabs.png)

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

* [Tabbox](https://zkfiddle.org/sample/cd1tff/1-ZK-Component-Reference-Tabbox-Example?v=latest&t=Iceblue_Compact)

## Supported Children

[`Tab`](tab): Represents a single tab within the `Tabs` component. The `Tabs` component can include multiple `Tab` components as its children.
