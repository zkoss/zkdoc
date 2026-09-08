---
title: "CSS Variables from ZK 10.3 to 11"
toc: true
---

{% include supported-since.html version="11.0.0" %}

ZK 11 renames CSS variables whose old names did not describe their purpose consistently. Values remain unchanged unless noted below. If a custom theme overrides an old name, replace it with the new name when upgrading.

# Direct Renames

These variables keep the same meaning and value:

| ZK 10.3 variable | ZK 11 variable |
|---|---|
| `--zk-text-color-default3` | `--zk-text-color-inverse` |
| `--zk-color-background1` | `--zk-color-background-subtle` |
| `--zk-color-background3` | `--zk-color-background-base` |
| `--zk-checked-color` | `--zk-checked-accent-color` |
| `--zk-container-background` | `--zk-container-background-color` |
| `--zk-container-header-text-size` | `--zk-container-header-font-size` |
| `--zk-container-body-text-size` | `--zk-container-body-font-size` |
| `--zk-input-text-size` | `--zk-input-font-size` |
| `--zk-input-disable-color` | `--zk-input-disabled-color` |
| `--zk-input-disable-background-color` | `--zk-input-disabled-background-color` |
| `--zk-button-disable-color` | `--zk-button-disabled-color` |
| `--zk-button-disable-background-color` | `--zk-button-disabled-background-color` |
| `--zk-button-disable-border-color` | `--zk-button-disabled-border-color` |
| `--zk-button-disable-separator-border-color` | `--zk-button-disabled-separator-border-color` |
| `--zk-scrollbar-bar-hover-background` | `--zk-scrollbar-bar-hover-background-color` |
| `--zk-scrollbar-button-background` | `--zk-scrollbar-button-background-color` |
| `--zk-scrollbar-button-hover-background` | `--zk-scrollbar-button-hover-background-color` |
| `--zk-splitter-button-text-size` | `--zk-splitter-button-font-size` |
| `--zk-tabbox-tab-separator-color` | `--zk-tabbox-tab-separator-border-color` |
| `--zk-tabbox-selected-radius` | `--zk-tabbox-selected-border-radius` |
| `--zk-menu-background` | `--zk-menu-background-color` |
| `--zk-menu-item-background` | `--zk-menu-item-background-color` |
| `--zk-menu-item-hover-background` | `--zk-menu-item-hover-background-color` |
| `--zk-menu-item-active-background` | `--zk-menu-item-active-background-color` |
| `--zk-menu-popup-background` | `--zk-menu-popup-background-color` |
| `--zk-menu-popup-item-background` | `--zk-menu-popup-item-background-color` |
| `--zk-menu-popup-item-hover-background` | `--zk-menu-popup-item-hover-background-color` |
| `--zk-menu-popup-item-active-background` | `--zk-menu-popup-item-active-background-color` |
| `--zk-menu-popup-separator-border` | `--zk-menu-popup-separator-border-color` |
| `--zk-nav-separator-color` | `--zk-nav-separator-border-color` |
| `--zk-multislider-button-color2` | `--zk-multislider-button-secondary-color` |
| `--zk-multislider-button-hover-color2` | `--zk-multislider-button-secondary-hover-color` |
| `--zk-multislider-button-active-color2` | `--zk-multislider-button-secondary-active-color` |
| `--zk-multislider-disabled-button-color2` | `--zk-multislider-disabled-button-secondary-color` |
| `--zk-pdfviewer-toolbar-separator-color` | `--zk-pdfviewer-toolbar-separator-border-color` |
| `--zk-searchbox-disable-border-color` | `--zk-searchbox-disabled-border-color` |
| `--zk-searchbox-disable-background-color` | `--zk-searchbox-disabled-background-color` |
| `--zk-searchbox-disable-color` | `--zk-searchbox-disabled-color` |
| `--zk-searchbox-disable-icon-color` | `--zk-searchbox-disabled-icon-color` |
| `--zk-portalchildren-frame-radius` | `--zk-portalchildren-frame-border-radius` |
| `--zk-portalchildren-frame-title-font-color` | `--zk-portalchildren-frame-title-color` |
| `--zk-portalchildren-counter-radius` | `--zk-portalchildren-counter-border-radius` |
| `--zk-portalchildren-counter-background` | `--zk-portalchildren-counter-background-color` |
| `--zk-portalchildren-frame-panel-header-text-size` | `--zk-portalchildren-frame-panel-header-font-size` |
| `--zk-linelayout-point-radius` | `--zk-linelayout-point-border-radius` |
| `--zk-coachmark-mask-background` | `--zk-coachmark-mask-background-color` |
| `--zk-cascader-separator-color` | `--zk-cascader-separator-border-color` |
| `--zk-cascader-disable-color` | `--zk-cascader-disabled-color` |
| `--zk-cascader-disable-background-color` | `--zk-cascader-disabled-background-color` |

# New Component-Specific Variables

Several components no longer borrow another component's variable. The new variable defaults to the old variable, so a `:root` override remains effective. Use the new variable for independent or selector-scoped customization.

| Component | Previously borrowed | ZK 11 variable |
|---|---|---|
| Toolbarbutton | `--zk-button-border-width` | `--zk-toolbar-button-border-width` |
| Toolbarbutton | `--zk-button-border-radius` | `--zk-toolbar-button-border-radius` |
| Toolbarbutton | `--zk-button-hover-color` | `--zk-toolbar-button-hover-color` |
| Toolbarbutton | `--zk-button-hover-border-color` | `--zk-toolbar-button-hover-border-color` |
| Toolbarbutton | `--zk-button-hover-background-color` | `--zk-toolbar-button-hover-background-color` |
| Toolbarbutton | `--zk-button-focus-border-color` | `--zk-toolbar-button-focus-border-color` |
| Toolbarbutton | `--zk-button-active-color` | `--zk-toolbar-button-active-color` |
| Toolbarbutton | `--zk-button-active-border-color` | `--zk-toolbar-button-active-border-color` |
| Toolbarbutton | `--zk-button-active-background-color` | `--zk-toolbar-button-active-background-color` |
| Toolbarbutton | `--zk-button-disabled-color` | `--zk-toolbar-button-disabled-color` |
| Toolbarbutton | `--zk-button-disabled-border-color` | `--zk-toolbar-button-disabled-border-color` |
| Toolbarbutton | `--zk-button-disabled-background-color` | `--zk-toolbar-button-disabled-background-color` |
| Slider button | `--zk-button-background-color` | `--zk-slider-button-background-color` |
| Slider button | `--zk-button-hover-background-color` | `--zk-slider-button-hover-background-color` |
| Slider button | `--zk-button-active-background-color` | `--zk-slider-button-active-background-color` |
| Button, Combobutton, Signature tool | `--zk-input-font-size` | `--zk-button-font-size` |
| Button, Combobutton, Signature tool | `--zk-input-border-radius` | `--zk-button-border-radius` |
| Listbox and Tree check mark | `--zk-checkbox-size` | `--zk-mesh-checkable-size` |
| Listbox and Tree check mark | `--zk-checkbox-hover-border-color` | `--zk-mesh-checkable-hover-border-color` |

# Variables Without Compatibility Fallbacks

The following variables have distinct semantics in ZK 11. An override of the old variable no longer styles the listed element:

| Element | Old variable | New variable |
|---|---|---|
| Checkbox and Radio tick | `--zk-checked-background-color` | `--zk-checked-icon-color` |
| Checked Menu item | `--zk-checked-background-color` | `--zk-menu-checked-color` |
| Grid, Listbox, and Tree outer background | `--zk-mask-background-color` | `--zk-mesh-outer-background-color` |

`--zk-checked-background-color` now describes only the surface of an unchecked Listbox, Tree, or Menu check mark. The tick painted over the selected surface uses `--zk-checked-icon-color`.

`--zk-mask-background-color` continues to style the mask itself. Use `--zk-mesh-outer-background-color` for the surrounding mesh area.

# Changed Default

`--zk-searchbox-popup-background-color` now defaults to `--zk-popup-background-color`. This makes Searchbox popups follow the active popup palette, including dark themes.

# Migration Example

Replace the variable name without changing its value:

```css
/* ZK 10.3 */
:root {
    --zk-input-disable-color: #8c8c8c;
}

/* ZK 11 */
:root {
    --zk-input-disabled-color: #8c8c8c;
}
```
