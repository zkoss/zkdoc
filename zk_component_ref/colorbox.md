---
title: "Colorbox"
---

- **Demonstration:** [Colorbox](http://www.zkoss.org/zkdemo/input/color_picker)
- **Java API:** [org.zkoss.zkex.zul.Colorbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Colorbox.html)
- **JavaScript API:** [zkex.inp.Colorbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.inp.Colorbox.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A Colorbox used to retrieve an input that the user can select a color.

## Common Use Cases

- **Theme or style pickers** — let users choose a foreground or background color for a UI element, storing the hex value in a ViewModel and applying it via an EL expression.
- **Inline color selection in menus** — embed a Colorbox inside a `<menu>` using the `content="#color=..."` shorthand to surface a compact color picker without a dedicated dialog.
- **Form fields with color metadata** — use the `onChange` event to capture the selected hex value and persist it alongside other form data (e.g. tag colors, label colors in project management UIs).

# Example

![](/zk_component_ref/images/ZKComRef_Colorbox_Examples.PNG)

```xml
<colorbox color="#FFFFFF" />
```

# Key control

{% include supported-since.html version="6.0.0" %}

Pressing left, right, up, or down arrow keys to change the selected color.

# Colorbox in Menu

By setting `content` attribute of `<menu>` to create a colorbox in menu.

![](/zk_component_ref/images/ZKComRef_Colorbox_Examples2.PNG)

```xml
<menubar id="menubar" >
    <menu label="Color" iconSclass="z-icon-binoculars">
        <menupopup>
            <menuitem label="Index" onClick="alert(self.label)" />
            <menu label="Color Picker" content="#color=#184dc6"/>
        </menupopup>
    </menu>
</menubar>
```

# Properties

## color

**Default Value:** `#000000`

Sets the selected color as a hexadecimal string in `#RRGGBB` format. Providing a value that does not match this seven-character format (leading `#` followed by exactly six hex digits) raises a runtime error.

```xml
<colorbox color="#1A73E8" />
```

## value

**Default Value:** `#000000`

Alias for `color` — sets the selected color in `#RRGGBB` hexadecimal format. `getValue()` and `getColor()` return the same string. Prefer `color` for new code; `value` exists for consistency with other input components that expose a generic `value` attribute.

```xml
<colorbox value="#FF5733" />
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| onChange | [InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) | Notifies the application when the selected color is changed. |

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`
