---
title: "Scrollview"
description: "Scrollview: The following example creates a vertically scrolling container and a horizontally scrolling container, each holding several labels:"
---

- **Demonstration:** [Scrollview](https://www.zkoss.org/zkdemo/...)
- **Java API:** [org.zkoss.zkmax.zul.Scrollview](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Scrollview.html)
- **JavaScript API:** [zkmax.layout.Scrollview](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Scrollview.html)

{% include supported-since.html version="6.5.0" %}
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

`Scrollview` is a container that enables touch-based scrolling of its child components on mobile and tablet devices. When used on a non-touch device it renders as a plain `<div>` with no scroll behaviour. The scrolling direction is controlled by the `orient` attribute — either `"vertical"` (default) or `"horizontal"`.

## Common Use Cases

- Wrapping a long list of items in a mobile application so users can swipe vertically through the content.
- Creating a horizontally scrollable photo strip or card carousel on touch devices.
- Nesting a `scrollview` inside a fixed-height region to confine scrolling to a specific area without affecting the page layout.

# Example

The following example creates a vertically scrolling container and a horizontally scrolling container, each holding several labels:

```xml
<zk>
    <!-- Vertical scroll (default orient) -->
    <scrollview height="200px">
        <vlayout>
            <label value="Item 1"/>
            <label value="Item 2"/>
            <label value="Item 3"/>
            <label value="Item 4"/>
            <label value="Item 5"/>
        </vlayout>
    </scrollview>

    <!-- Horizontal scroll -->
    <scrollview orient="horizontal" width="300px">
        <hlayout>
            <div width="150px"><label value="Panel A"/></div>
            <div width="150px"><label value="Panel B"/></div>
            <div width="150px"><label value="Panel C"/></div>
        </hlayout>
    </scrollview>
</zk>
```

# Properties

## Orient

**Default Value:** `"vertical"`

Sets the scroll direction of the `scrollview`. Only the two values listed below are accepted; any other value throws a `WrongValueException`.

| Value | Meaning |
|---|---|
| `"vertical"` | (default) Children scroll top-to-bottom. |
| `"horizontal"` | Children scroll left-to-right. |

```xml
<!-- Vertical scrollview (default) -->
<scrollview height="200px">
    <vlayout>
        <label value="Row 1"/>
        <label value="Row 2"/>
    </vlayout>
</scrollview>

<!-- Horizontal scrollview -->
<scrollview orient="horizontal" width="300px">
    <hlayout>
        <div width="200px"><label value="Col A"/></div>
        <div width="200px"><label value="Col B"/></div>
    </hlayout>
</scrollview>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onScroll` | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | Fired after the user finishes scrolling on a touch device. The `ScrollEvent` carries the new scroll position (`getPos()` / `getPosInDouble()`) and an `isOutOfBound()` flag that is `true` when the position is outside the component boundary (bounce effect). |
| `onScrolling` | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | Fired continuously while the user is scrolling on a touch device (scroll in progress, not yet finished). Carries the same position data as `onScroll`. Use this event for live feedback; use `onScroll` for final position. |

# Supported Children

`*ALL`: Any ZK component may be placed inside a `scrollview`.
