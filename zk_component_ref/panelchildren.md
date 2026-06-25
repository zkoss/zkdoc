---
title: "Panelchildren"
---

- **Demonstration:** [Panel Demo](https://www.zkoss.org/zkdemo/window/panel)
- **Java API:** [org.zkoss.zul.Panelchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Panelchildren.html)
- **JavaScript API:** [zul.wnd.Panelchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wnd.Panelchildren.html)

## Employment/Purpose

Panelchildren is a component used within the Panel component to manage each child element that will be displayed within the body of the Panel. It ensures that the size of Panelchildren is automatically calculated by the Panel, making properties such as `hflex`, `vflex`, `width`, and `height` unsupported on panelchildren—the Panel controls the sizing automatically.

## Common Use Cases

- **Wrapping Panel body content**: Use `<panelchildren>` as the direct child of `<panel>` whenever you need to place arbitrary ZK components (grids, forms, charts) inside the Panel body area.
- **Scrollable content area**: Because `panelchildren` fills the Panel body automatically, it is the right place to apply `overflow: auto` via `style` when the body content may exceed the Panel's fixed height.
- **Multiple panels sharing a layout**: Combine several `<panel>` / `<panelchildren>` pairs inside a `<vlayout>` or `<hlayout>` to build multi-pane dashboards where each panel manages its own body children independently.

## Example

The following example demonstrates the usage of Panelchildren within Panel components:

![Panel Simple Examples](images/ZKComRef_Panel_Simple_Examples.png)

```xml
<zk>
    <panel height="100px" width="200px" style="margin-bottom:10px"
       title="Panel1" border="normal" maximizable="true"
       collapsible="true">
       <panelchildren>PanelContent1</panelchildren>
    </panel>
    <panel height="100px" width="200px" title="Panel2"
       border="normal" maximizable="true" style="margin-bottom:10px">
       <panelchildren>PanelContent2</panelchildren>
    </panel>
</zk>
```

Try it

* [Panelchildren Example](https://zkfiddle.org/sample/260lpts/1-ZK-Component-Reference-Panelchildren-Example?v=latest&t=Iceblue_Compact)

In the above example:
- Two Panel components are created with specified attributes such as height, width, title, border, and more.
- Inside each Panel, Panelchildren elements are used to define the content to be displayed within the Panel body.

# Properties

## Hflex

> **Note:** Setting `hflex` directly on `<panelchildren>` is **unsupported** — the setter throws an `UnsupportedOperationException`. The horizontal flex of the body area is controlled automatically by the parent `<panel>`. To set horizontal flex, use `hflex` on the enclosing `<panel>` instead.

{% include supported-since.html version="6.0.0" %}

The getter delegates to the parent Panel: the value returned reflects whatever `hflex` is set on the surrounding `<panel>`. Do not set this attribute on `<panelchildren>` directly.

```xml
<!-- Correct: set hflex on the panel, not on panelchildren -->
<panel hflex="1">
    <panelchildren>
        <!-- body content here -->
    </panelchildren>
</panel>
```

## Vflex

> **Note:** Setting `vflex` directly on `<panelchildren>` is **unsupported** — the setter throws an `UnsupportedOperationException`. The vertical flex of the body area is controlled automatically by the parent `<panel>`. To set vertical flex, use `vflex` on the enclosing `<panel>` instead.

{% include supported-since.html version="6.0.0" %}

The getter delegates to the parent Panel: the value returned reflects whatever `vflex` is set on the surrounding `<panel>`. Do not set this attribute on `<panelchildren>` directly.

```xml
<!-- Correct: set vflex on the panel, not on panelchildren -->
<panel vflex="1">
    <panelchildren>
        <!-- body content here -->
    </panelchildren>
</panel>
```

# Supported Children

`*ALL`: Indicates that the `Panelchildren` component can have any kind of ZK component as its child element. This allows you to include any ZK component within the `Panelchildren`, providing flexibility and customization options for your designs.
