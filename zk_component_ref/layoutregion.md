# Layout Region


- Java API: [org.zkoss.zul.LayoutRegion](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/LayoutRegion.html)
- JavaScript API: [zul.layout.LayoutRegion](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.LayoutRegion.html)

## Employment/Purpose
The `LayoutRegion` class in ZK represents a region within a layout manager. It is used to define specific areas within a layout where components can be placed. These regions can have different behaviors such as collapsing, resizing, and sliding, providing flexibility in designing user interfaces.

## Supported Events

| Name        | Event Type                                     | Description                                                                                         |
|-------------|------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| onOpen      | **Event:** [OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | Sent when a layout is collapsed or opened by a user.                                            |
| onSize      | **Event:** [SizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SizeEvent.html) | Sent when a layout is resized by a user.                                                        |
| onSlide     | **Event:** [SlideEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SlideEvent.html) | Sent when a collapsed layout is slid (previewed) by a user.                                    |

## Supported Children
`*ALL`: Represents support for all ZK components. This means that any ZK component can be placed within the `LayoutRegion` and will be properly rendered and managed by the layout manager.