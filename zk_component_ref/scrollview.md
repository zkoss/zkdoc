---
title: "Scrollview"
description: "Scrollview: The following example creates a vertically scrolling container and a horizontally scrolling container, each holding several labels:"
---

- **Demonstration:** [Scrollview](https://www.zkoss.org/zkdemo/...)
- **Java API:** [org.zkoss.zkmax.zul.Scrollview](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Scrollview.html)
- **JavaScript API:** [zkmax.layout.Scrollview](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Scrollview.html)

{% include supported-since.html version="6.5.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

# Employment/Purpose

`Scrollview` is a container that scrolls its child components. The scrolling direction is controlled by the `orient` attribute — either `"vertical"` (default) or `"horizontal"`. On touch devices it provides touch-based scrolling with a bounce effect. On non-touch devices it uses native browser scrolling (`overflow: auto`), so scrollbars and the mouse wheel work. Only scrolling along the axis set by `orient` fires its events.

To get scrolling, set a `height` (vertical) or `width` (horizontal) that is smaller than the content. Without one, the `scrollview` grows with its content.

## Common Use Cases

- Wrapping a long list of items in a mobile application so users can scroll through the content.
- Creating a horizontally scrollable photo strip or card carousel.
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
| `onScroll` | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | On a touch device, fired after the user finishes scrolling; `isOutOfBound()` is `true` when the position is outside the component boundary (bounce effect). On a non-touch device, fired when the scroll position reaches either end (start or end) of the scroll range, and `isOutOfBound()` is `true` at that point. The `ScrollEvent` carries the new scroll position (`getPos()` / `getPosInDouble()`). |
| `onScrolling` | [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) | Fired while the user is scrolling, on both touch and non-touch devices (scroll in progress). Carries the same position data as `onScroll`. Use this event for live feedback; use `onScroll` for the final position. |

# Supported Children

`*ALL`: Any ZK component may be placed inside a `scrollview`.
