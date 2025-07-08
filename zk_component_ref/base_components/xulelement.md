# Xul Element

- **Java API:** [org.zkoss.zul.impl.XulElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html)
- **JavaScript API:** [zul.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.Widget.html)

## Employment/Purpose
The `XulElement` class serves as the fundamental class for XUL elements in ZK. It extends the [`HtmlBasedComponent`](htmlbasedcomponent.md) class and provides essential functionality for XUL elements.

## Properties

### `ctrlKeys`
- **Description:** Specifies the keystrokes to intercept.
- **Default Value:** null
- **Example (Java):** 
  ```java
  xulElement.setCtrlKeys("^a^d@c#f10#left#right");
  ```
- **Example (ZUL):**
  ```zul
  <textbox ctrlKeys="^a^d@c#f10#left#right" />
  ```

### `context`
- **Description:** Sets the ID of the popup (Popup) that should appear when the user right-clicks on the element.
- **Default Value:** null (no context menu)
- **Example (Java):** 
  ```java
  xulElement.setContext("id, start_before");
  ```
- **Example (ZUL):**
  ```zul
  <textbox context="id, start_before" />
  ```

### `contextAttributes`
- **Description:** Sets the attributes for the context popup such as position, coordinates, and type.
- **Example (Java):**
  ```java
  xulElement.setContextAttributes(popup, "after_start", "50", null, "toggle");
  ```

### `popup`
- **Description:** Sets the ID of the popup (Popup) that should appear when the user clicks on the element.
- **Default Value:** null (no popup)
- **Example (Java):** 
  ```java
  xulElement.setPopup("id, start_before");
  ```
- **Example (ZUL):**
  ```zul
  <textbox popup="id, start_before" />
  ```

### `popupAttributes`
- **Description:** Sets the attributes for the popup such as position, coordinates, and type.
- **Example (Java):**
  ```java
  xulElement.setPopupAttributes(popup, "after_start", "50", null, "toggle");
  ```

### `tooltip`
- **Description:** Sets the ID of the popup (Popup) that should be used as a tooltip when the mouse hovers over the element.
- **Default Value:** null (no tooltip)
- **Example (Java):**
  ```java
  xulElement.setTooltip("id, start_before");
  ```
- **Example (ZUL):**
  ```zul
  <textbox tooltip="id, start_before" />
  ```

### `tooltipAttributes`
- **Description:** Sets the attributes for the tooltip popup such as position, coordinates, and delay time.
- **Example (Java):**
  ```java
  xulElement.setTooltipAttributes(tooltipPopup, "after_start", "50", null, 500);
  ```