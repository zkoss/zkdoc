---
title: "Implementing a Widget Property"
toc: true
---

Widget properties provide a way to store and manipulate widget data from both the server and client sides. ZK provides two approaches to implementing properties: the traditional manual getter/setter approach, and the modern `$define` shortcut.

## Using the `$define` Shortcut (Recommended)

The `$define` property definition is the preferred and most concise way to implement widget properties in ZK. It automatically generates getter and setter methods.

### Basic Property (Simple Getter/Setter)

The simplest form creates a property with automatic getter and setter methods:

```javascript
mycomponent.true = zk.$extends(zul.Widget, {
    $define: {
        value: null  // Creates: getValue(), setValue(), isValue()
    }
});
```

This single line automatically generates three methods:
- `getValue()` - Returns the property value
- `setValue(value)` - Sets the property value
- `isValue()` - Returns whether the property is set (for boolean-like checks)

### Property with Post-Processor

A post-processor function is called after the value is set. This is useful for updating the DOM when a property changes:

```javascript
mycomponent.true = zk.$extends(zul.Widget, {
    $define: {
        text: function() {
            if (this.desktop) {
                // This code runs after setText() is called
                this.$n().innerHTML = zUtl.encodeXML(this._text);
            }
        }
    }
});
```

**Post-processor behavior:**
- Called **after** the property value is stored in the internal field (e.g., `this._text`)
- Receives no parameters (the value is already stored)
- Can access the new value via the internal field (e.g., `this._text`)
- Common use case: Update DOM elements when properties change

### Property with Pre and Post-Processor

For more control, you can provide both a pre-processor and a post-processor:

```javascript
mycomponent.true = zk.$extends(zul.Widget, {
    $define: {
        value: [
            function(v) {
                // Pre-processor: validate/transform the value before storing
                return v != null ? v.trim() : '';
            },
            function() {
                // Post-processor: update DOM after value is stored
                if (this.desktop) {
                    this.rerender();
                }
            }
        ]
    }
});
```

**Pre-processor behavior:**
- Called **before** the property value is stored
- Receives the new value as a parameter
- Must **return** the value (or transformed value) to be stored
- Common use cases: Validation, transformation, normalization

**Post-processor behavior:**
- Called **after** the value is stored
- Can access the new value via the internal field
- Common use cases: DOM updates, event triggering

### Widget Class Reference

The `$define` shortcut is implemented in `zk.ts` and provides a convenient way to define properties following ZK's naming conventions.

---

## Manual Getter and Setter (Traditional Approach)

If you need complete custom control, you can implement getters and setters manually. This approach is rarely needed when using `$define`.

### Simple Getter

```javascript
_value: '', // default value

getValue: function () {
    return this._value;
}
```

### Setter with DOM Update

The setter must check if the widget is attached to the DOM before modifying it. A widget is attached when `this.desktop` is not null.

```javascript
setValue: function(value) {
    if (this._value != value) {
        this._value = value;
        if (this.desktop) {
            // Update DOM only if attached
            this.$n().innerHTML = zUtl.encodeXML(value);
        }
    }
}
```

**Key points:**
- Always check `if (this.desktop)` before updating the DOM
- The DOM node is accessed via `this.$n()`
- Use `zUtl.encodeXML()` to safely encode values for HTML content
- The internal field name is typically `_propertyName` (underscore prefix)

---

## Comparing Approaches

| Feature | `$define` | Manual |
|---------|-----------|--------|
| **Code conciseness** | 1-2 lines | 10+ lines |
| **Getter/Setter generation** | Automatic | Manual |
| **Validation** | Pre-processor | Custom logic |
| **DOM updates** | Post-processor | Custom logic |
| **Recommended for** | Most properties | Complex custom behavior |

---

## Complete Example

Here's a complete widget implementation showing multiple property types:

```javascript
mycomponent.mywidget = zk.$extends(zul.Widget, {
    $define: {
        // Simple property
        text: null,

        // Property with DOM update
        value: function() {
            if (this.desktop) {
                this.$n().textContent = this._value;
            }
        },

        // Property with validation and DOM update
        color: [
            function(v) {
                // Validate color format
                return (v && v.match(/^#[0-9A-Fa-f]{6}$/)) ? v : '#000000';
            },
            function() {
                // Update DOM color
                if (this.desktop) {
                    this.$n().style.color = this._color;
                }
            }
        ]
    }
});
```

This example demonstrates:
- `text` - A simple stored property with no special behavior
- `value` - Automatically updates the DOM when set
- `color` - Validates input and updates the DOM styling

---

## Implementation Details

When you use `$define`, ZK generates:

1. **Internal field**: `this._propertyName` stores the value
2. **Getter method**: `getPropertyName()` returns the stored value
3. **Setter method**: `setPropertyName(value)` sets the value and calls processors
4. **Check method**: `isPropertyName()` returns true if value is set

The auto-generated setter always checks if the value has changed before calling post-processors, helping optimize performance.

---

## Related Documentation

- [Implementing a Component Property](implementing_a_component_property) - Server-side property binding
- [The Redraw Method](the_redraw_method) - Generating initial HTML content
- [How we Implement the Event](how_we_implement_the_event) - Event handling in widgets
