---
title: "Event Handling"
---

An event ([org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)) is used to
abstract an activity made by a user, a notification made by an
application, and an invocation of server push. Thus, the application can
handle different kinds of notifications and sources with a universal
mechanism. By and large, developers can even use the same approach to
handle, say, message queues.

In this section we will discuss how to handle events, such as listening,
posting and forwarding.
