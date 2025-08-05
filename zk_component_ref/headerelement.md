
- Java API: [org.zkoss.zul.impl.HeaderElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/HeaderElement.html)
- JavaScript API: [`zul.mesh.HeaderWidget`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.HeaderWidget.html)

## Employment/Purpose
The Header Element is a skeletal implementation for a header in ZK applications. It is used to create headers within components such as grids or tables to provide structure and organization to data.

## Supported Events

| Name                | Event Type                                 | Description                        |
|---------------------|--------------------------------------------|------------------------------------|
| `onColSize`         | **Event:** [ColSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ColSizeEvent.html) | Notifies the parent of a group of headers that the widths of two of its children are changed by the user.|

## Supported Children

`*ALL`: Indicates that the HeaderElement can have any kind of ZK component as its child element. This means that you can include any ZK component within the custom component that extends HeaderElement, providing flexibility and customization options for your designs.