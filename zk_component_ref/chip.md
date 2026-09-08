---
title: "Chip"
---

- **Java API:** [org.zkoss.zul.Chip](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Chip.html)
- **JavaScript API:** [zul.wgt.Chip](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Chip.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Chip` displays a compact label, category, status, or removable filter. It can include an image or icon and can notify the server when the user closes it.

# Example

```xml
<chip label="Information" severity="info"/>
<chip label="Approved" severity="success"/>
<chip label="Warning" severity="warning"/>
<chip label="Blocked" severity="danger"/>
<chip label="Filter" rounded="true" closable="true"
      onClose='Clients.log("closed")'/>
```

# Properties

## Label, Image, and IconSclass

These values are inherited from `LabelImageElement`. `image` and `iconSclass` add a leading visual to the label.

## Severity

**Default Value:** `info`

Allowed values are `info`, `success`, `warning`, `danger`, and `secondary`.

## Size

**Default Value:** `medium`

Allowed values are `small` and `medium`.

## Rounded

**Default Value:** `false`

Set it to `true` for a pill-shaped chip.

## Closable

**Default Value:** `false`

Shows a close button. Closing posts `onClose`; the default server behavior detaches the component.

## Disabled

**Default Value:** `false`

A disabled chip appears muted and does not fire `onClose`.

# Custom Colors

Override the chip variables inline or through an `sclass` rule:

```xml
<chip label="Brand" sclass="brand-chip"/>
<style>
    .brand-chip.z-chip {
        --zk-chip-background-color: #6366f1;
        --zk-chip-color: #fff;
        --zk-chip-border-color: #4f46e5;
    }
</style>
```

# Supported Events

| Name | Event Type |
|---|---|
| `onClose` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Fired when the close button is activated. The default handler detaches the chip. Call `event.stopPropagation()` to keep it attached. |

# Inherited Functions

Please refer to [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement) for inherited functions.

# Supported Children

`*NONE`
