---
title: "Detail"
description: "Detail: The detail component is used to display a detailed section where a master row and multiple detail rows are on the same row."
---

- **Demonstration:** [Grid (Master detail)](http://www.zkoss.org/zkdemo/grid/master_detail)
- **Java API:** [org.zkoss.zul.Detail](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Detail.html)
- **JavaScript API:** [zkex.grid.Detail](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.grid.Detail.html)

{% include edition-availability.html edition="pe" %}

# Employment/Purpose

The detail component is used to display a detailed section where a master row and multiple detail rows are on the same row.

## Common Use Cases

- **Master-detail grid rows** — Place a `<detail>` as the first child of a `<row>` inside a `<grid>` to let users expand individual rows and see supplementary information (images, specs, audit trails) without leaving the page.
- **Load-on-demand detail panels** — Listen to the `onOpen` event and create child components on first expansion, avoiding the cost of rendering hidden content for every row up front.
- **Pre-expanded rows** — Set `open="true"` on specific rows (for example, the first result or a flagged record) so that key detail is immediately visible when the page loads.

# Example

![Detail](/zk_component_ref/images/detail.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<zk>
    Please open/close the +/- button, and the layout of this page shows
    properly.
    <grid fixedLayout="true" width="600px">
        <columns>
            <column width="40px" />
            <column>Product Name</column>
            <column>Price</column>
            <column>Item location</column>
        </columns>
        <rows>
            <row>
                <detail>
                    <hlayout>
                        <image width="200px" height="200px" src="/img/icon_update.png" />
                        <vlayout>
                            <label value="Item Specifics - Item Condition    " style="font-weight:bold;font-style: italic;" />
                            <hlayout>
                                <label value="Condition:" />
                                <label value="Used" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Brand:" />
                                <label value="Apple" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Technology:" />
                                <label value="DVI" style="font-weight:bold;" />
                            </hlayout>
                            <hlayout>
                                <label value="Monitor Type:" />
                                <label value="LCD/Flat Panel" style="font-weight:bold;" />
                            </hlayout>
                        </vlayout>
                    </hlayout>
                </detail>
                <label value="Apple 20-inch Aluminum Cinema Display M9177/A" />
                <label style="color:green;float:right;" value="US $202.50" />
                <label value="tulsa, ok, United States" />
            </row>
        </rows>
    </grid>
</zk>
```

# Properties

## ContentSclass

**Default Value:** `null`

Sets an additional CSS class name applied to the content block of the detail panel. Use this to style the expanded area independently from the detail toggle icon itself.

```xml
<detail contentSclass="my-detail-content">
    <label value="Expanded row detail"/>
</detail>
```

## ContentStyle

**Default Value:** `null`

Sets an inline CSS style applied to the content block of the detail panel. Use this to apply one-off styles (such as padding or background colour) to the expanded area without defining a separate CSS class.

```xml
<detail contentStyle="padding: 8px; background: #f5f5f5;">
    <label value="Expanded row detail"/>
</detail>
```

## Open

**Default Value:** `false`

Controls whether the detail panel is expanded (open) or collapsed (closed). Set to `true` to render the detail initially expanded. The user can toggle the state by clicking the +/- icon; the server is notified via the `onOpen` event.

```xml
<detail open="true">
    <label value="This detail starts expanded"/>
</detail>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| `onOpen` | [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | Denotes user has opened or closed a component. Unlike `onClose`, this event is only a notification. The client sends this event after opening or closing the component. It is useful to implement load-on-demand by listening to the `onOpen` event, and creating components when the component is opened. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
