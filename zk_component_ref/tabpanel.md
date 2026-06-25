---
title: "Tabpanel"
---

- **Demonstration:** [Tabbox](https://www.zkoss.org/zkdemo/tabbox)
- **Java API:** [org.zkoss.zul.Tabpanel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabpanel.html)
- **JavaScript API:** [zul.tab.Tabpanel](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabpanel.html)

### Employment/Purpose

A `tabpanel` serves as the content container for a single tab within a tabbox. It is used to organize and display a group of components under a specific tab. Each `tabpanel` is associated with a specific tab within the tabbox, with the first `tabpanel` corresponding to the first tab, the second `tabpanel` corresponding to the second tab, and so on.

## Common Use Cases

### Placing a Full Layout Inside a Tab

Because `tabpanel` accepts any child component, you can nest a complete layout (such as `borderlayout` or `vlayout`) inside a single tab to build complex, multi-zone UIs.

```xml
<tabbox vflex="1" hflex="1">
    <tabs>
        <tab label="Dashboard" />
    </tabs>
    <tabpanels>
        <tabpanel>
            <borderlayout>
                <north size="80px"><label value="Header" /></north>
                <center><grid hflex="1" vflex="1" /></center>
            </borderlayout>
        </tabpanel>
    </tabpanels>
</tabbox>
```

### Scrollable Panel Content

Set a fixed `height` (via `style`) on `tabpanel` and let content overflow with `overflow: auto` to create a scrollable region within the tab, keeping the tab bar always visible.

```xml
<tabbox width="400px">
    <tabs>
        <tab label="Long List" />
    </tabs>
    <tabpanels>
        <tabpanel style="overflow:auto;height:200px;">
            <listbox>
                <listitem label="Item 1" />
                <listitem label="Item 2" />
                <!-- more items ... -->
            </listbox>
        </tabpanel>
    </tabpanels>
</tabbox>
```

### Example

The example demonstrates the usage of `tabpanel` within a tabbox and tabpanels in ZK:

- Two tabboxes with tabs labeled 'Tab 1' and 'Tab 2'.
- Corresponding tabpanels displaying 'This is panel 1' and 'This is panel 2'.
- Another tabbox with accordion mold and tabs labeled 'Tab 3' and 'Tab 4'.
- Tabpanels within the accordion tabbox showcasing 'This is panel 3' and 'This is panel 4'.

![Tabs](images/zkcomref_containers_tabs.png)

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

`*ALL`: The `Tabpanel` component is a container component that can hold various kinds of components. It allows you to add any kind of component as its child.