---
title: "Notifications"
---

In this section, we discuss the notifications on the client side.

There are 3 ways to notify:

1.  widget events ([zk.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Event.html))
      
    A widget event is a widget-level event. It is used either to
    encapsulate a DOM event, or to represent a notification specific to
    a widget, or to an application.
2.  DOM events ([jq.Event](https://www.zkoss.org/javadoc/latest/jsdoc/classes/jq.Event.html))
      
    A DOM event (Event) is the DOM-level (i.e., low-level) event that is
    usually triggered by the browser. It is usually listened by a widget
    itself, rather than the client application.
3.  client activity watches
      
    A client activity watch is a notification for special activities
    that are not available as DOM events or widget events, for example,
    the notification when a widget is becoming invisible.

It is generally suggested to listen to widget events (rather than DOM
events) if possible since it is easier and more efficient.

They are mainly used for component development. Application developers
**rarely need** it. For a complete reference, please refer to
[JavaScript APIs](http://zkoss.org/javadoc/latest/jsdoc/).
