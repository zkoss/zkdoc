---
title: "Carousel"
---

- **Java API:** [org.zkoss.zul.Carousel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Carousel.html)
- **JavaScript API:** [zul.wgt.Carousel](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Carousel.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Carousel` presents one `Carouselitem` at a time. It supports arrow and indicator navigation, autoplay, keyboard control, horizontal or vertical layout, and slide or fade transitions.

# Example

```xml
<carousel width="480px" height="240px"
          autoplay="true" interval="3000" pause="true"
          onSelect='Clients.log("slide=" + event.data.index)'>
    <carouselitem label="First slide">
        <image src="/img/slide1.jpg"/>
    </carouselitem>
    <carouselitem label="Second slide">
        <image src="/img/slide2.jpg"/>
    </carouselitem>
</carousel>
```

# Properties

| Property | Default | Description |
|---|---:|---|
| `activeIndex` | `0` | Zero-based index of the displayed slide. |
| `autoplay` | `false` | Advances slides automatically. |
| `interval` | `5000` | Autoplay interval in milliseconds; must be at least `500`. |
| `showArrows` | `true` | Displays previous and next controls. |
| `showIndicators` | `true` | Displays slide indicators. |
| `loop` | `true` | Continues from the last slide to the first. |
| `pause` | `true` | Pauses autoplay while the pointer is over the carousel. |
| `keyboard` | `true` | Enables arrow-key navigation when focused. |
| `orient` | `horizontal` | Accepts `horizontal` or `vertical`. |
| `effect` | `slide` | Accepts `slide`, `fade`, or `none`. |

`getSelectedItem()` returns the active `Carouselitem`, or `null` when the carousel is empty.

# Carouselitem

`Carouselitem` inherits `label`, `image`, and `iconSclass` from `LabelImageElement` and accepts arbitrary ZK children.

```xml
<carouselitem label="Account summary">
    <vlayout>
        <label value="Current balance"/>
        <button label="View details"/>
    </vlayout>
</carouselitem>
```

# Supported Events

| Name | Event Type |
|---|---|
| `onChanging` | **Event:** [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Fired when a transition begins. Read `event.previousValue` and `event.value` for the previous and target indexes. The event is not cancellable. |
| `onSelect` | **Event:** [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Fired after the transition. The selected item is the event reference and `event.data.index` contains its index. |

# Limitations

- The component displays one slide at a time.
- Touch navigation supports a single pointer rather than multi-finger gestures.
- In `fade` and `none` modes, looping directly switches from the last slide to the first.

# Supported Children

- `Carousel` accepts only `Carouselitem`.
- `Carouselitem` accepts any ZK component and must be placed inside `Carousel`.
