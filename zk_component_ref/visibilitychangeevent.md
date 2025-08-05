---
title: "VisibilityChangeEvent"
---


- Demonstration: N/A
- Java API:
  [org.zkoss.zk.ui.event.VisibilityChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/VisibilityChangeEvent.html)
- JavaScript API: N/A

# Employment/Purpose

This event is fired when users change a browser page visibility e.g.
switch to another tab or switch back. You should listen to this event on
the root component of a page.

ZK implements it based on [W3C page visibility](http://www.w3.org/TR/page-visibility/).

# Example

## Basic

```xml
<window title="window" border="normal">
    <attribute name="onVisibilityChange">
        if (!event.isHidden())
        lbl.setValue("Welcome back");
    </attribute>
    <label id="lbl"></label>
</window>
```

## Chatroom

In a chatroom application, you detect a user who switches to another
tab, then notify other users. Please check the [complete source](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/events/chatroom.zul).
![](/zk_component_ref/images/chatroom.png)

# Version History

| Version | Date             | Content                                                                                                                                      |
|---------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| 6.5.1   | December 2, 2012 | introduced in [Control page visibility with HTML5 API in ZK](http://blog.zkoss.org/2012/12/02/control-page-visibility-with-html5-api-in-zk/) |


