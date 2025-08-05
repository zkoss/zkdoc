---
title: "Event Queues"
---

An event queue is an event-based publish-subscribe solution for the
application information delivery and messaging. It provides asynchronous
communication for different modules/roles in a loosely-coupled and
autonomous fashion.

By publishing, a module (publisher) sends out messages without
explicitly specifying or having knowledge of intended recipients. By
subscribing, a receiving module (subscriber) receives messages that the
subscriber has registered an interest in, without explicitly specifying
or knowing the publisher.

![]({{site.baseurl}}/zk_dev_ref/images/eventqueue-concept.jpg)

ZK generalizes the event queue to support the server push. The use is
straightforward: specifying the scope of a given event queue as
[org.zkoss.zk.ui.event.EventQueues#APPLICATION](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueues.html#APPLICATION)
(or
[org.zkoss.zk.ui.event.EventQueues#SESSION](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueues.html#SESSION),
but rare). For example,

```java
EventQueue que = EventQueues.lookup("chat", EventQueues.APPLICATION, true);
```

For more information about event queues, please refer to the [Event Handling: Event Queues]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
section.

For the information about low-level API, please refer to [Asynchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/asynchronous_tasks)
section, if the task can execute asynchronously; or [Synchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/synchronous_tasks)
if it must execute synchronously.

# Version History

| Version | Date          | Content                                                                                                                           |
|---------|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6   | November 2010 | The event queue won't start any working threads and they are serializable, so it is safe to use them in a clustering environment. |
