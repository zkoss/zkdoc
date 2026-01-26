---
layout: single
title: "Finding Elements"
permalink: /zk_webdriver/finding_elements
toc: true
---

# Finding Elements

ZK Webdriver provides three main ways to locate and interact with elements and ZK widgets on the client side: `jq`, `zk`, and `widget`.

## JQuery (`jq`)

The `jq()` method is the most commonly used locator. It wraps the powerful JQuery selector engine available in ZK.

### Usage

```java
// Find by ID
JQuery loginBtn = jq("#loginBtn");

// Find by ZK Component Type (using @)
JQuery listbox = jq("@listbox");

// Find by CSS Class
JQuery errorMsg = jq(".error-message");

// Complex Selectors
JQuery lastItem = jq("@listitem:last-child");
```

### Key Methods
- `isVisible()`: Returns true if the element is visible.
- `exists()`: Returns true if the element exists in the DOM.
- `text()`, `val()`, `attr(name)`, `css(name)`: Access element properties.
- `find(selector)`, `parent()`, `children()`: Navigate the DOM.

## ZK (`zk`)

The `zk()` method provides access to ZK-specific client-side functionality.

### Usage

```java
// Access ZK object for an element
ZK buttonZk = zk("@button");

// Check ZK version
String version = ZK.VERSION;
```

### Key Methods
- `focus()`: Sets focus to the element.
- `revisedOffset()`, `revisedWidth()`, `revisedHeight()`: Get component dimensions including border/padding.

## Widget (`widget`)

The `widget()` method allows you to interact directly with ZK's client-side Widget objects. This is powerful for accessing widget properties and states that aren't directly reflected in the DOM.

### Usage

```java
// Access a widget by its UUID or another locator
Widget myGrid = widget("@grid");

// Get a property (e.g., gets the value of myGrid.getWidth())
String width = myGrid.get("width");

// Set a property
myGrid.set("visible", false);
```

### Key Methods
- `get(propertyName)`: Calls the getter for the property (e.g., `get("width")` calls `getWidth()`).
- `set(propertyName, value)`: Calls the setter for the property.
- `is(propertyName)`: Calls the boolean getter (e.g., `is("vflex")` calls `isVflex()`).
- `$n()`: Returns the main DOM element of the widget.
- `$n("subname")`: Returns a sub-element of the widget (e.g., `$n("cave")`).

## Summary Comparison

| Method | Primary Purpose | Example |
| :--- | :--- | :--- |
| `jq()` | DOM selection and basic attributes | `jq("@button").click()` |
| `zk()` | ZK-specific positioning and focus | `zk("@textbox").focus()` |
| `widget()` | Accessing ZK Widget properties/state | `widget("@listbox").get("rows")` |
