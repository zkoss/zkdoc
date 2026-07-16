---
title: "HtmlBasedComponent"
description: "HtmlBasedComponent: The HtmlBasedComponent serves as a basic implementation for HTML-based components."
---

- **Java API:** [org.zkoss.zk.ui.HtmlBasedComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html)
- **JavaScript API:** [zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)

# Employment/Purpose

The HtmlBasedComponent serves as a basic implementation for HTML-based components. It simplifies the process of implementing methods and functionalities that are common to HTML-based components. This component provides a foundation for building custom components in ZK that are based on HTML elements.

# Properties

These properties are inherited by virtually every ZK component (anything that extends `HtmlBasedComponent`). The examples below use `<div>` as a representative concrete component.

## Action

> **Deprecated since 10.0.0** — use [`clientAction`](#clientaction) instead. `action` is retained only for backward compatibility and simply delegates to `clientAction`.

Specifies the client-side action (CSA). See [ClientAction](#clientaction) for the format and the full list of acceptable values.

{% include supported-since.html version="5.0.6" %}

## ClientAction

Specifies the client-side action (CSA): a visual effect that runs on the client when the component becomes visible or invisible, without a server round trip.

{% include supported-since.html version="10.0.0" %}

**Default Value:** `null` (no CSA)

**Format:** a semicolon-separated list of `condition: effect` pairs.

The condition accepts exactly two values:

| Condition | When the effect runs |
|---|---|
| `show` | the component is becoming visible |
| `hide` | the component is becoming invisible |

The *effect* is the name of a method defined in [`zk.eff.Actions`](https://www.zkoss.org/javadoc/latest/jsdoc/variables/zk.eff.Actions.html) (for example `slideDown` or `slideUp`), and may take options, e.g. `slideDown({duration:1000})`.

```xml
<div clientAction="show: slideDown; hide: slideUp"/>
```

> **Security:** the value is not encoded and may contain JavaScript. If you let users supply it, encode it yourself.

## Draggable

**Default Value:** `false`

Denotes whether the component is draggable, or names the type of draggable object.

| Value | Meaning |
|---|---|
| `false`, `""`, or unset | not draggable |
| `true` | draggable with an anonymous type |
| any other non-empty string | draggable, using that string as the draggable-type identifier |

```xml
<div draggable="true"/>
```

## Droppable

**Default Value:** `false`

Denotes whether the component accepts dropped objects, or which draggable types it accepts.

| Value | Meaning |
|---|---|
| `false`, `""`, or unset | not droppable |
| `true` | accepts any draggable type |
| a comma-separated list of identifiers (e.g. `dg1, dg2`) | accepts only those draggable types |

```xml
<div droppable="dg1, dg2"/>
```

## Height

The height of the component. If null, the best fit is used.

```xml
<div height="100px"/>
```

## Hflex

Horizontal flex hint: how the component's container distributes remaining horizontal space among its flexible children, by ratio.

| Value | Meaning |
|---|---|
| a positive integer (e.g. `1`, `2`) | flex ratio — larger values receive more space, relative to sibling flex values |
| `true` | same as `1` |
| `false`, `0`, or a negative value | no flex (same as leaving it unset) |
| `min` | give only the minimum space needed to enclose the children |

> You cannot set `hflex` and `width` on the same component unless `hflex="min"`.

```xml
<div hflex="1"/>
```

## Left

The left position of the component.

```xml
<div left="10px"/>
```

## Renderdefer

The number of milliseconds before rendering this component at the client.

**Default Value:** `-1`

{% include supported-since.html version="5.0.2" %}

```xml
<div renderdefer="500"/>
```

## Sclass

The CSS class(es) for the component. Used for small adjustments such as changing the font size.

```xml
<div sclass="custom-style"/>
```

## Style

The CSS style for the component.

```xml
<div style="color: blue; font-size: 14px;"/>
```

## Tabindex

**Default Value:** `0`

The tab order of the component.

```xml
<div tabindex="2"/>
```

## Tooltiptext

The text to display as a tooltip for the component.

```xml
<div tooltiptext="This is a tooltip"/>
```

## Top

The top position of the component.

```xml
<div top="10px"/>
```

## Vflex

Vertical flex hint: how the component's container distributes remaining vertical space among its flexible children, by ratio.

| Value | Meaning |
|---|---|
| a positive integer (e.g. `1`, `2`) | flex ratio — larger values receive more space, relative to sibling flex values |
| `true` | same as `1` |
| `false`, `0`, or a negative value | no flex (same as leaving it unset) |
| `min` | give only the minimum space needed to enclose the children |

```xml
<div vflex="1"/>
```

## Width

The width of the component. If null, the best fit is used.

```xml
<div width="200px"/>
```

## Zclass

The ZK Cascading Style class for this component. It usually depends on the implementation of the mold.

{% include supported-since.html version="3.5.1" %}

```xml
<div zclass="custom-class"/>
```

## Zindex

Specifies the Z index of this component, i.e. the stacking order used to decide which overlapping component appears in front. A larger value is rendered above components with smaller values. A negative value means the Z index is not set.

**Default Value:** `-1`

{% include supported-since.html version="3.5.2" %}

```xml
<div zindex="100"/>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| `onClick` | [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html) | Denotes a user has clicked a component. |
| `onDoubleClick` | [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html) | Denotes a user has double-clicked a component. |
| `onRightClick` | [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html) | Denotes a user has right-clicked a component. |
| `onOk` | [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html) | Denotes a user has pressed the ENTER key. |
| `onCancel` | [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html) | Denotes a user has pressed the ESC key. |
| `onCtrlKey` | [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html) | Denotes a user has pressed a special key combined with the Ctrl or Alt key. |
| `onDrop` | [DropEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/DropEvent.html) | Denotes a user has dropped the dragged target to a component. |
| `onMouseOver` | [MoveEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MoveEvent.html) | Denotes a user has hovered over the component. |
| `onMouseOut` | [MoveEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MoveEvent.html) | Denotes a user has moved out of a component. |
| `onSwipe` | [SwipeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SwipeEvent.html) | Fired when a user swipes the component on a touch device. |
| `onAfterSize` | [AfterSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/AfterSizeEvent.html) | Fired after a user resizes a sizable component in a browser or when a component calculates its size in a browser. |

# Supported Children

`*ALL`: Indicates that the `HtmlBasedComponent` can have any kind of ZK component as its child element. This means that you can include any ZK component within the custom component that extends `HtmlBasedComponent`, providing flexibility and customization options for your designs.