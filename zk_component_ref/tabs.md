---
title: "Tabs"
---

- **Demonstration:** [Tabbox](https://www.zkoss.org/zkdemo/tabbox)
- **Java API:** [org.zkoss.zul.Tabs](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabs.html)
- **JavaScript API:** [zul.tab.Tabs](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabs.html)

## Employment/Purpose
The `tabs` component serves as a container for multiple `tab` components. It allows organizing content within a tabbed interface where users can switch between different sections or views by clicking on tabs.

## Example

The example below demonstrates the usage of the `Tabs` component in a ZK application:

![Tabs Example](/zk_component_ref/images/ZKComRef_Containers_Tabs.png)

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

## Common Use Cases

### Horizontal Tab Bar (Default)

The standard use of `tabs` is as a child of `tabbox`, containing one `tab` per panel:

```xml
<tabbox width="400px">
    <tabs>
        <tab label="Profile" />
        <tab label="Settings" />
        <tab label="Notifications" />
    </tabs>
    <tabpanels>
        <tabpanel>Profile content</tabpanel>
        <tabpanel>Settings content</tabpanel>
        <tabpanel>Notifications content</tabpanel>
    </tabpanels>
</tabbox>
```

### Vertical Tabs

When the parent `tabbox` uses `orient="vertical"`, the `tabs` bar is rendered on the left side:

```xml
<tabbox orient="vertical" width="400px">
    <tabs>
        <tab label="Tab 1" />
        <tab label="Tab 2" />
    </tabs>
    <tabpanels>
        <tabpanel>Panel 1</tabpanel>
        <tabpanel>Panel 2</tabpanel>
    </tabpanels>
</tabbox>
```

# Properties

## Align

**Default Value:** `"start"`

Sets the alignment of the tabs within the tab bar. Accepts one of three values:

| Value | Meaning |
|---|---|
| `start` | Tabs are aligned to the start (left in LTR layouts). This is the default. |
| `center` | Tabs are centered within the tab bar. |
| `end` | Tabs are aligned to the end (right in LTR layouts). |

> **Note:** This property is reserved for future extension and is not visually supported yet.

```xml
<tabbox width="400px">
    <tabs align="center">
        <tab label="Tab 1" />
        <tab label="Tab 2" />
    </tabs>
    <tabpanels>
        <tabpanel>This is panel 1</tabpanel>
        <tabpanel>This is panel 2</tabpanel>
    </tabpanels>
</tabbox>
```

## Supported Children

[`Tab`](tab): Represents a single tab within the `Tabs` component. The `Tabs` component can include multiple `Tab` components as its children.
