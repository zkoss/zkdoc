---
title: "Implementing the Widget"
toc: true
---

## Widget Base Classes

Every widget class in ZK must extend from `zk.Widget` or one of its derived classes. ZK provides several skeletal implementations that serve as base classes for different types of widgets:

![](images/ZKComDevEss_widget_hierarchy.png)

### Widget Hierarchy Overview

The widget class hierarchy is structured as follows:

```
zk.Widget (base for all widgets)
├── zul.Widget (standard UI widgets)
├── zul.XulElement (container/layout widgets)
├── zul.HTMLElement (for rendering raw HTML)
└── ... (other specialized bases)
```

**zk.Widget** - The base class for all widgets. Provides:
- Widget lifecycle methods: `bind_()`, `unbind_()`, `redraw()`
- Property management and event firing: `fire()`, `$define`
- DOM manipulation: `$n()` (get root element)
- Event listener management: `domListen_()`, `domUnlisten_()`

**zul.Widget** - Most common base for standard widgets
- Extends `zk.Widget`
- Used for most custom widgets like buttons, labels, inputs
- Provides standard widget behavior and styling

**zul.XulElement** - Base for container and layout widgets
- Extends `zul.Widget`
- Used for widgets that contain other widgets (panels, divs, etc.)
- Handles child widget management

---

## Basic Widget Class Structure

For this tutorial, we'll implement a widget named `com.foo.SimpleLabel` that extends `zul.Widget`. Here's the complete structure:

```javascript
zk.$package('com.foo');

com.foo.SimpleLabel = zk.$extends(zul.Widget, {
    // 1. Property definitions
    $define: {
        value: null
    },

    // 2. Render HTML
    redraw: function(out) {
        out.push('<span', this.domAttrs_(), '>',
                 this.getValue() || '',
                 '</span>');
    },

    // 3. Lifecycle: Attach to DOM
    bind_: function() {
        this.$supers('com.foo.SimpleLabel', 'bind_', arguments);
        // Initialize event listeners here
    },

    // 4. Lifecycle: Detach from DOM
    unbind_: function() {
        // Clean up event listeners here
        this.$supers('com.foo.SimpleLabel', 'unbind_', arguments);
    }
});
```

---

## Widget Implementation Components

A complete widget implementation typically includes these components:

### 1. Package Declaration

```javascript
zk.$package('com.foo');
```

- Organizes your widgets into a namespace
- Prevents global namespace pollution
- Convention: matches server-side Java package

### 2. Class Definition

```javascript
com.foo.SimpleLabel = zk.$extends(zul.Widget, {
    // implementation
});
```

- Use `zk.$extends(baseClass, members, staticMembers)`
- Choose appropriate base class:
  - `zul.Widget` for most widgets
  - `zul.XulElement` for containers
  - `zk.Widget` for low-level custom widgets

### 3. Property Definitions

```javascript
$define: {
    value: null,
    enabled: true,
    visible: null
}
```

Defines widget properties with automatic getters/setters. The `$define` keyword is processed by ZK to generate:
- `getValue()` / `setValue(value)`
- `isEnabled()` / `setEnabled(boolean)`
- `isVisible()` / `setVisible(boolean)`

See [Implementing a Widget Property](implementing_a_widget_property) for detailed property patterns.

### 4. The `redraw()` Method

```javascript
redraw: function(out) {
    out.push('<span', this.domAttrs_(), '>',
             zUtl.encodeXML(this.getValue() || ''),
             '</span>');
}
```

Generates the HTML for the widget. Called by ZK framework to render the widget in the browser.

Key methods:
- `out.push()` - Append HTML strings to output
- `this.domAttrs_()` - Generate standard DOM attributes (id, class, style, etc.)
- `zUtl.encodeXML()` - Safely encode values for HTML content

See [The Redraw Method](the_redraw_method) for more details.

### 5. Lifecycle Methods

**`bind_()` - Called when widget attaches to DOM**

```javascript
bind_: function() {
    this.$supers('com.foo.SimpleLabel', 'bind_', arguments);
    // Initialize event listeners
    this.domListen_(this.$n(), 'onClick', '_doClick');
}
```

Called after `redraw()` completes and widget is inserted into the DOM. Use this to:
- Register event listeners with `domListen_()`
- Initialize widget state
- Set up timers or resource bindings

**`unbind_()` - Called when widget detaches from DOM**

```javascript
unbind_: function() {
    this.domUnlisten_(this.$n(), 'onClick', '_doClick');
    this.$supers('com.foo.SimpleLabel', 'unbind_', arguments);
}
```

Called when widget is removed from the DOM. Use this to:
- Clean up event listeners with `domUnlisten_()`
- Release resources
- Prevent memory leaks

See [How we Implement the Event](how_we_implement_the_event) for event handling details.

### 6. Event Handlers

```javascript
_doClick: function(evt) {
    // Handle the click event
    this.fire('onSimpleClick', {data: 'clicked'});
}
```

Private methods (starting with `_`) that handle DOM events registered in `bind_()`. These methods:
- Are called automatically when their registered event occurs
- Can update widget state
- Can fire custom events using `this.fire()`

---

## Complete Widget Template

Here's a template you can use as a starting point:

```javascript
zk.$package('com.example');

com.example.MyWidget = zk.$extends(zul.Widget, {
    // Properties
    $define: {
        text: null,
        enabled: true,
        style: null
    },

    // Generate HTML
    redraw: function(out) {
        out.push('<div', this.domAttrs_(), ' class="my-widget">',
                 zUtl.encodeXML(this.getText() || ''),
                 '</div>');
    },

    // Setup when attached to DOM
    bind_: function() {
        this.$supers('com.example.MyWidget', 'bind_', arguments);
        // Register listeners
        this.domListen_(this.$n(), 'onClick', '_doClick');
        this.domListen_(this.$n(), 'onMouseover', '_doHover');
    },

    // Event handlers
    _doClick: function(evt) {
        this.fire('onMyClick', {});
    },

    _doHover: function(evt) {
        // Handle hover
    },

    // Cleanup when detached from DOM
    unbind_: function() {
        this.domUnlisten_(this.$n(), 'onClick', '_doClick');
        this.domUnlisten_(this.$n(), 'onMouseover', '_doHover');
        this.$supers('com.example.MyWidget', 'unbind_', arguments);
    }
});
```

---

## Key Implementation Details

### Using `this.desktop` to Check Widget State

Always check if the widget is attached before updating the DOM:

```javascript
setValue: function(value) {
    this._value = value;
    if (this.desktop) {  // Only update DOM if attached
        this.$n().textContent = value;
    }
}
```

- `this.desktop` is null if widget is not attached
- `this.desktop` is the `zk.Desktop` instance if widget is attached
- Used to prevent DOM updates before rendering

### Using `this.$n()` to Access DOM Element

```javascript
this.$n()  // Returns the root DOM element of the widget
```

From a rendered widget like `<span id="z_xyz_3">content</span>`, `$n()` returns the `<span>` element.

### Calling Parent Methods with `$supers()`

```javascript
this.$supers('com.foo.SimpleLabel', 'methodName', arguments);
```

Always call parent class methods for lifecycle functions to maintain proper inheritance chain.

---

## Widget Class Reference

The widget implementation framework is defined in `zk.ts`, providing:

- `zk.$extends()` - Class definition
- `zk.Widget` - Base widget class with lifecycle methods
- `$define` - Property definition processor
- Lifecycle: `redraw()`, `bind_()`, `unbind_()`

---

## Related Documentation

- [ZK's JavaScript Extension](zks_javascript_extension) - Class definition with `$extends()`
- [Implementing a Widget Property](implementing_a_widget_property) - Property implementation and `$define`
- [The Redraw Method](the_redraw_method) - HTML generation with `redraw()`
- [How we Implement the Event](how_we_implement_the_event) - Event handling with `bind_()` and `unbind_()`
- [The Widget Package Descriptor](the_widget_package_descriptor) - Widget registration and dependencies
