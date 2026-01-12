---
title: "How we Implement the Event"
toc: true
---

To implement a custom event in a ZK widget, you need to follow these essential steps. This guide ties together the widget lifecycle, event listener registration, and event firing mechanism.

## Overview

Implementing events in ZK widgets involves three key phases:

1. **Binding Phase**: Attach the widget to the DOM and register event listeners
2. **Event Handling Phase**: Respond to user interactions and fire custom events
3. **Unbinding Phase**: Clean up listeners to prevent memory leaks

---

## Step 1: Understanding the Widget Lifecycle

The `bind_()` and `unbind_()` methods are the entry points for event implementation. These methods are called by the ZK framework at specific times:

- **`bind_()`** - Called when the widget is attached to the DOM, after `redraw()` creates the HTML
- **`unbind_()`** - Called when the widget is detached from the DOM

For details on when these methods are called, see [Overriding bind and unbind](overriding_bind_and_unbind.md).

### Key Widget Class References

The implementation relies on these widget methods (from [`zk.Widget`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)):

- `bind_(desktop, skipper, childArray)` - Lifecycle method to override
- `unbind_(skipper, childArray)` - Cleanup lifecycle method to override
- `domListen_(domElement, eventName, callbackMethod)` - Register DOM event listeners
- `domUnlisten_(domElement, eventName, callbackMethod)` - Unregister DOM event listeners
- `fire(eventName, data)` - Fire custom events that communicate to the server
- [`$n()`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#_n) - Get the root DOM element of the widget
- [`$supers(className, methodName, arguments)`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#_supers) - Call parent class method


## Step 2: Override `bind_()` and Register Event Listeners

Override the `bind_()` method to register DOM event listeners. This is where you attach event listeners to handle user interactions.

```javascript
bind_: function() {
    // Call parent class bind_ first
    this.$supers('bind_', arguments);

    // Register event listener on DOM element
    // Parameters: domElement, eventName, callbackMethodName
    this.domListen_(this.$n().lastChild, "onClick", 'doClear');
},
```

**Key points:**
- Always call `this.$supers('bind_', arguments)` first to allow parent classes to bind properly
- Use `this.$n()` to get the root DOM element of your widget
- `domListen_(element, event, callback)` registers a listener that calls your callback method


## Step 3: Implement Event Handler Callbacks

Create the callback method that will be invoked when the DOM event occurs. This is where you update the widget state and fire custom events.

```javascript
doClear: function(evt) {
    // Update internal state
    this._cleared = !(this._cleared);

    // Update the UI
    if(this._cleared) {
        this.$n().firstChild.innerHTML = this._value;
    } else {
        this.$n().firstChild.innerHTML = "";
    }

    // Fire custom event to communicate with server
    // Parameters: eventName, eventData object
    this.fire("onClear", {cleared: this._cleared});
},
```

**Key points:**
- Update the DOM only if the widget is attached (`this.desktop` check is done inside `domListen_`)
- Use `this.fire(eventName, dataObject)` to fire custom events
- The event data is sent to the server-side component

For more details on firing events, see [Registering Appropriate Listeners](registering_appropriate_listeners.md).


## Step 4: Override `unbind_()` and Clean Up Listeners

Override the `unbind_()` method to remove event listeners when the widget is detached from the DOM. This prevents memory leaks.

```javascript
unbind_: function() {
    // Unregister event listeners
    // Parameters must match the domListen_ call
    this.domUnlisten_(this.$n().lastChild, "onClick", '_doClear');

    // Call parent class unbind_
    this.$supers('unbind_', arguments);
},
```

**Key points:**
- Always call `domUnlisten_()` before calling `$supers()` (reverse order of `bind_()`)
- The parameters to `domUnlisten_()` must exactly match the `domListen_()` call
- Always call `this.$supers('unbind_', arguments)` last to allow parent classes to clean up

---

## Complete Example

Here's a complete widget implementation that demonstrates event handling:

```javascript
mycomponent.true = zk.$extends(zul.Widget, {
    // Define properties using $define
    $define: {
        text: function() {
            if(this.desktop) {
                this.rerender();  // Re-render when text changes
            }
        }
    },

    // Bind event listeners when widget is attached to DOM
    bind_: function() {
        this.$supers('mycomponent.true', 'bind_', arguments);
        this.domListen_(this.$n(), "onClick", 'doClick');
    },

    // Handle the click event
    doClick: function(evt) {
        // Fire custom event to server
        this.fire('onFoo', {foo: 'myData'});
    },

    // Clean up when widget is detached from DOM
    unbind_: function() {
        this.domUnlisten_(this.$n(), "onClick", 'doClick');
        this.$supers('mycomponent.true', 'unbind_', arguments);
    }
});
```


## Related Documentation

- [Overriding bind and unbind](overriding_bind_and_unbind.md) - Detailed explanation of the widget lifecycle
- [Registering Appropriate Listeners](registering_appropriate_listeners.md) - Event listener registration patterns
- [Handling Events](handling_events.md) - Mold implementation for event targets
- [Server Side Listeners](server_side_listeners.md) - How to handle events on the server side
