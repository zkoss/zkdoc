---
title: "HtmlBasedComponent"
---



- Java API: [org.zkoss.zk.ui.HtmlBasedComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html)
- JavaScript API: [zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)

## Employment/Purpose

The HtmlBasedComponent serves as a basic implementation for HTML-based components. It simplifies the process of implementing methods and functionalities that are common to HTML-based components. This component provides a foundation for building custom components in ZK that are based on HTML elements.

## Properties

### `Zclass`
- **Description:** The ZK Cascading Style class for this component. It usually depends on the implementation of the mold.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setZclass("custom-class");
  ```
- **Example (ZUL):**
  ```xml
  <component zclass="custom-class" />
  ```

### `Sclass`
- **Description:** The CSS class(es) for the component. Used for small adjustments like changing the font size.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setSclass("custom-style");
  ```
- **Example (ZUL):**
  ```xml
  <component sclass="custom-style" />
  ```

### `Tooltiptext`
- **Description:** The text to display as a tooltip for the component.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setTooltiptext("This is a tooltip");
  ```
- **Example (ZUL):**
  ```xml
  <component tooltiptext="This is a tooltip" />
  ```

### `Style`
- **Description:** The CSS style for the component.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setStyle("color: blue; font-size: 14px;");
  ```
- **Example (ZUL):**
  ```xml
  <component style="color: blue; font-size: 14px;" />
  ```

### `Draggable`
- **Description:** Denotes whether the component is draggable or specifies an identifier for the type of draggable object.
- **Default Value:** `"false"`
- **Example (Java):** 
  ```java
  component.setDraggable("true");
  ```
- **Example (ZUL):**
  ```xml
  <component draggable="true" />
  ```

### `Droppable`
- **Description:** Denotes whether the component is droppable or specifies identifiers of draggable types of objects that can be dropped onto this component.
- **Default Value:** `"false"`
- **Example (Java):** 
  ```java
  component.setDroppable("true");
  ```
- **Example (ZUL):**
  ```xml
  <component droppable="true" />
  ```

### `Width`
- **Description:** The width of the component. If null, the best fit is used.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setWidth("200px");
  ```
- **Example (ZUL):**
  ```xml
  <component width="200px" />
  ```

### `Height`
- **Description:** The height of the component. If null, the best fit is used.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setHeight("100px");
  ```
- **Example (ZUL):**
  ```xml
  <component height="100px" />
  ```

### `Left`
- **Description:** The left position of the component.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setLeft("10px");
  ```
- **Example (ZUL):**
  ```xml
  <component left="10px" />
  ```

### `Top`
- **Description:** The top position of the component.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setTop("10px");
  ```
- **Example (ZUL):**
  ```xml
  <component top="10px" />
  ```

### `ZIndex`
- **Description:** The Z index of the component.
- **Default Value:** `-1`
- **Example (Java):** 
  ```java
  component.setZIndex(100);
  ```
- **Example (ZUL):**
  ```xml
  <component zIndex="100" />
  ```

### `Vflex`
- **Description:** Vertical flexibility hint of the component. It indicates how the container distributes remaining empty space among its children vertically.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setVflex("1");
  ```
- **Example (ZUL):**
  ```xml
  <component vflex="1" />
  ```

### `Hflex`
- **Description:** Horizontal flexibility hint of the component. It indicates how the container distributes remaining empty space among its children horizontally.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setHflex("min");
  ```
- **Example (ZUL):**
  ```xml
  <component hflex="min" />
  ```

### `Renderdefer`
- **Description:** The number of milliseconds before rendering the component at the client.
- **Default Value:** `-1`
- **Example (Java):** 
  ```java
  component.setRenderdefer(500);
  ```
- **Example (ZUL):**
  ```xml
  <component renderdefer="500" />
  ```

### `ClientAction`
- **Description:** The client-side action (CSA) for the component.
- **Default Value:** `null`
- **Example (Java):** 
  ```java
  component.setClientAction("show: slideDown; hide: slideUp");
  ```
- **Example (ZUL):**
  ```xml
  <component action="show: slideDown; hide: slideUp" />
  ```

### `Tabindex`
- **Description:** The tab order of the component.
- **Default Value:** `0`
- **Example (Java):** 
  ```java
  component.setTabindex(2);
  ```
- **Example (ZUL):**
  ```xml
  <component tabindex="2" />
  ```
  
## Supported Events

| Name            | Event Type                                 | Description                                                                                            |
|-----------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `onDrop`          | **Event:** [DropEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/DropEvent.html)                | Denotes a user has dropped the dragged target to a component.                                          |
| `onClick`         | **Event:** [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html)             | Denotes a user has clicked a component.                                                                |
| `onDoubleClick`   | **Event:** [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html)             | Denotes a user has double-clicked a component.                                                         |
| `onRightClick`    | **Event:** [MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html)             | Denotes a user has right-clicked a component.                                                         |
| `onMouseOver`     | **Event:** [MoveEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MoveEvent.html)               | Denotes a user has hovered over the component. (Available since ZK 5.0.3)                                |
| `onMouseOut`      | **Event:** [MoveEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MoveEvent.html)               | Denotes a user has moved out of a component. (Available since ZK 5.0.3)                                 |
| `onOK`            | **Event:** [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html)                  | Denotes a user has pressed the 'ENTER' key.                                                            |
| `onCancel`        | **Event:** [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html)                  | Denotes a user has pressed the 'ESC' key.                                                              |
| `onCtrlKey`       | **Event:** [KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html)                  | Denotes a user has pressed a special key combined with the Ctrl or Alt key. Refer to the `ctrlKeys` property for details. |
| `onAfterSize`     | **Event:** [AfterSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/AfterSizeEvent.html)    | Fired after a user resizes a sizable component in a browser or when a component calculates its size in a browser. |
| `onCreate`        | **Event:** [CreateEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/CreateEvent.html)          | Event fired when the component is created.                                                            |

## Supported Children

`*ALL`: Indicates that the `HtmlBasedComponent` can have any kind of ZK component as its child element. This means that you can include any ZK component within the custom component that extends `HtmlBasedComponent`, providing flexibility and customization options for your designs.