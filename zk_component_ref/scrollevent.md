---
title: "ScrollEvent"
---


- Demonstration: N/A
- Java API: [org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html)
- JavaScript API: N/A

# Employment/Purpose

Represents an event caused by that user is scrolling or has scrolled at
the client.

`ScrollEvent` will be sent wih name as "`onScroll`" after
`setCurposByClient(int)` is called to notify application developers that
it is called by user (rather than by codes).

For components that might also support ScrollEvent with "`onScrolling`".
It is used to notified the server that user is changing its content
(changing is on progress and not finished).

The components which are supported this event are:
[org.zkoss.zul.Slider](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Slider.html).

# Example

N/A

# Supported events

Check inherited events

# Supported Children

`*NONE`



# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |


