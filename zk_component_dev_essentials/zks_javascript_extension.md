---
title: "ZK's JavaScript Extension"
toc: true
---

To make it easier for JavaScript objects to represent widgets, ZK has introduced a class concept to JavaScript. This guide covers the `zk.$extends()` method which is the foundation for defining widgets and custom classes in ZK.

## Basic Class Definition

To define a class in ZK JavaScript, use the `zk.$extends()` method. This creates a proper class hierarchy with support for inheritance and method overriding.

### Simple Class Example

```javascript
zk.$package('com.foo');

com.foo.Location = zk.$extends(zk.Object, {
  x: 0,
  y: 0,
  distance: function (loc) {
    return Math.sqrt(Math.pow(this.x - loc.x, 2) + Math.pow(this.y - loc.y, 2));
  }
}, {
  find: function (name) {
    if (name == 'ZK')
      return new com.foo.Location(10, 10);
    throw 'unknown: ' + name;
  }
});
```

### `$extends()` Syntax

The `zk.$extends(baseClass, members, staticMembers)` method takes three arguments:

1. **baseClass** (required): The parent class to extend from
   - For general objects: `zk.Object` (root of the class hierarchy)
   - For widgets: `zk.Widget` or other widget base classes
   - Example: `zk.$extends(zul.Widget, ...)`

2. **members** (required): Object containing instance methods and properties
   - Regular data fields: `x: 0, y: 0`
   - Methods: `distance: function() { ... }`
   - Special lifecycle methods: `bind_()`, `unbind_()`, `redraw()`
   - Property definitions: `$define: { ... }`

3. **staticMembers** (optional): Object containing static methods
   - Omit this argument if no static methods are needed
   - Static methods are called on the class itself: `MyClass.staticMethod()`
   - Example: `find: function(name) { ... }`

---

## Defining Widget Classes

For ZK widget development, you typically extend `zk.Widget` or a specific widget base class:

```javascript
zk.$package('mycomponent');

// Define a widget class
mycomponent.true = zk.$extends(zul.Widget, {
    $define: {
        text: null
    },

    redraw: function(out) {
        out.push('<span>', this.getText(), '</span>');
    },

    bind_: function() {
        this.$supers('bind_', arguments);
        // Initialize event listeners
    },

    unbind_: function() {
        this.$supers('unbind_', arguments);
        // Clean up event listeners
    }
}, {
    // Optional: static methods
    getVersion: function() {
        return '1.0.0';
    }
});
```

### Key Components for Widgets

**Instance Members:**
- `$define: {}` - Define properties using the shortcut
- `redraw(out)` - Generate HTML for the widget
- `bind_()` - Called when widget attaches to DOM
- `unbind_()` - Called when widget detaches from DOM
- Regular methods and properties

**Static Members** (optional):
- Class-level utilities and constants
- Called as: `mycomponent.true.getVersion()`

---

## Method Inheritance with `$supers()`

When overriding methods from parent classes, use `$supers()` to call the parent implementation:

```javascript
bind_: function() {
    // Call parent class bind_ method
    this.$supers('bind_', arguments);

    // Then add your own logic
    this.domListen_(this.$n(), "onClick", '_doClick');
}
```

**Usage Pattern:**
- `this.$supers(className, methodName, arguments)` - Call parent method
- Always call `$supers()` for lifecycle methods like `bind_()` and `unbind_()`
- The first parameter can be the class name or omitted (uses current class)

---

## Package Organization

Use `zk.$package()` to organize your widgets into namespaces:

```javascript
// Declare package
zk.$package('mycomponent');

// Define classes within the package
mycomponent.MyWidget = zk.$extends(zul.Widget, {
    // ...
});

mycomponent.AnotherWidget = zk.$extends(zul.XulElement, {
    // ...
});
```

**Benefits:**
- Avoids global namespace pollution
- Organizes related components together
- Matches Java package structure for easier server-side binding

---

## Naming Conventions in ZK

Following ZK's naming conventions helps keep code consistent and clear:

| Prefix/Suffix | Meaning | Example |
|---------------|---------|---------|
| `_` (prefix) | Private member | `_value` |
| `_` (suffix) | Protected method | `bind_()`, `unbind_()` |
| `$` (prefix) | ZK framework method | `$extends()`, `$define`, `$n()` |
| No prefix | Public method | `getValue()`, `setValue()` |

**Examples from ZK:**
- `_value` - Private property storage
- `bind_()` - Protected lifecycle method
- `redraw()` - Public method to override
- `$extends()` - ZK framework utility

---

## Inheritance Hierarchy for Widgets

Common widget base classes to extend from:

```
zk.Object (root)
  ├── zk.Widget (base for all widgets)
  │   ├── zul.Widget (standard UI widgets)
  │   ├── zul.XulElement (container widgets)
  │   └── ... (other specialized widget bases)
  ├── zk.Desktop (client-side desktop)
  └── ... (other ZK objects)
```

For custom widgets, typically extend `zul.Widget`:

```javascript
// Most common - extends zul.Widget which extends zk.Widget
mycomponent.true = zk.$extends(zul.Widget, { ... });

// Alternative - extends a specific widget base
mycomponent.advanced = zk.$extends(zul.XulElement, { ... });
```

---

## Complete Widget Example

Here's a complete widget showing all the key pieces:

```javascript
zk.$package('mycomponent');

mycomponent.MyWidget = zk.$extends(zul.Widget, {
    // Properties
    $define: {
        text: null,
        enabled: true
    },

    // Lifecycle: Generate HTML
    redraw: function(out) {
        out.push('<div class="my-widget">');
        out.push('<span id="text">', this.getText() || '', '</span>');
        out.push('</div>');
    },

    // Lifecycle: Attach to DOM
    bind_: function() {
        this.$supers('mycomponent.MyWidget', 'bind_', arguments);
        this.domListen_(this.$n(), "onClick", '_doClick');
    },

    // Event handler
    _doClick: function(evt) {
        this.fire('onFoo', {data: 'clicked'});
    },

    // Lifecycle: Detach from DOM
    unbind_: function() {
        this.domUnlisten_(this.$n(), "onClick", '_doClick');
        this.$supers('mycomponent.MyWidget', 'unbind_', arguments);
    },

    // Custom method
    doSomething: function() {
        if (this.desktop) {
            this.setText('Updated!');
        }
    }
}, {
    // Static method
    getWidgetVersion: function() {
        return '1.0.0';
    }
});
```

---

## Widget Class Reference

The `zk.$extends()` method is the foundation implemented in `zk.ts`. This provides:

- Proper prototype-based inheritance
- Method overriding support
- The `$supers()` method for calling parent methods
- Static member support

---

## Related Documentation

- [Implementing the Widget](implementing_the_widget.md) - Detailed widget structure and methods
- [Implementing a Widget Property](implementing_a_widget_property.md) - Using `$define` for properties
- [The Redraw Method](the_redraw_method.md) - Generating widget HTML
- [How we Implement the Event](how_we_implement_the_event.md) - Event handling with `bind_()` and `unbind_()`