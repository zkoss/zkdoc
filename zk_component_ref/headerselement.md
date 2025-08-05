---
title: "HeadersElement"
---


- Demonstration:[Headers Element](http://www.zkoss.org/zkdemo/userguide/#g13)
- Java API: [`org.zkoss.zul.impl.HeadersElement`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/HeadersElement.html)
- JavaScript API: [`zul.mesh.HeadWidget`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.HeadWidget.html)

## Employment/Purpose

Headers Element serves as a skeletal implementation for headers, acting as the parent of a group of HeaderElement components. It is primarily used to define the structure and behavior of headers within a UI component.


## Supported Events

| Name      | Event Type                                     | Description |
|-----------|------------------------------------------------|-------------|
| `onColSize` | **Event:** [ColSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ColSizeEvent.html) | The `onColSize` event signifies when a user resizes one of the columns, triggering a `ColSizeEvent` that can be captured and processed within the application logic.|

## Supported Children

[`HeaderElement`](headerelement): Indicates that the `HeadersElement` can contain one or more header elements within it.
