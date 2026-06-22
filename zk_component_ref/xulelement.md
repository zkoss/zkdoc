---
title: "XulElement"
---

- **Java API:** [org.zkoss.zul.impl.XulElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html)

# Employment/Purpose

The fundamental class for XUL elements.

## Common Use Cases

`XulElement` is the abstract base class for ZUL components. On top of `HtmlBasedComponent` it adds common client-side capabilities — tooltips, context menus, drag-and-drop, and keystroke interception (`ctrlKeys`). You don't use `<xulelement>` directly; these features are available on the concrete components that extend it (e.g. `<div>`, `<button>`, `<window>`).

# Example

```xml
<div ctrlKeys="^a" tooltip="myTip"/>
```

# Properties

These properties are inherited by every component that extends `XulElement` (e.g. `<div>`, `<button>`, `<window>`). The examples below use `<div>` as a representative concrete component.

## CtrlKeys

{% include supported-since.html version="3.0.6" %}

Specifies the keystrokes to intercept and forward to the server as an `onCtrlKey` event. The value concatenates keystrokes built from these prefixes:

| Prefix | Meaning | Example |
|---|---|---|
| `^k` | Ctrl + key (`k` = `a`–`z`, `0`–`9`, or a `#`-key) | `^a` = Ctrl+A |
| `@k` | Alt + key | `@c` = Alt+C |
| `$#k` | Shift + special key (`$a`–`$z` are **not** supported) | `$#f1` = Shift+F1 |
| `%k` | Mac Command ⌘ + key (since 8.5.0) | `%a` = ⌘+A |
| `#name` | a special key — one of `#home #end #ins #del #bak #left #right #up #down #pgup #pgdn #tab` (since 9.5.1) or `#f1`…`#f12` | `#f10` = F10 |

For example, `^a^d@c#f10#left#right` intercepts Ctrl+A, Ctrl+D, Alt+C, F10, Left and Right; `^#left` means Ctrl+Left. The combinations Ctrl+Alt, Shift+Ctrl, and Shift+Alt are not supported. See [Keystroke Handling]({{site.baseurl}}/zk_dev_ref/ui_patterns/keystroke_handling) for the full reference.

```xml
<div ctrlKeys="^a^d@c#f10"/>
```

## Tooltip

{% include supported-since.html version="3.0.2" %}

Specifies the [popup]({{site.baseurl}}/zk_component_ref/popup) to show as a tooltip when the mouse hovers over the component. The value is the popup's **id** — or `uuid(popup_uuid)` to reference it by UUID across ID spaces — optionally followed by comma-separated arguments:

| Argument | Meaning |
|---|---|
| `position` | where the tooltip opens relative to the component, using the popup position keywords (e.g. `before_start`, `after_start`, `start_before`, `after_end`); see [Popup]({{site.baseurl}}/zk_component_ref/popup) for the full list |
| `x` / `y` | absolute pixel coordinates (since 3.6.3); each may be a parenthesised JS expression, e.g. `x=(zk.currentPointer[0]+10)` (since 6.5.2) |
| `delay` | milliseconds to wait before the tooltip appears |

Examples: `myTip`, `myTip, after_start`, `myTip, position=before_start, delay=500`, `myTip, x=15, y=20`.

```xml
<popup id="myTip">
    <label value="Tooltip content"/>
</popup>
<div tooltip="myTip, after_start, delay=500"/>
```

# Supported Events

[Inherited Supported Events from HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*ALL`
