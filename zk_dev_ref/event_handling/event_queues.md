An event queue is an event-based publish-subscribe solution for the
application information delivery and messaging. It provides asynchronous
communication for different modules/roles in a loosely-coupled and
autonomous fashion.

By publishing, a module (publisher) sends out messages without
explicitly specifying or having knowledge of intended recipients. By
subscribing, a receiving module (subscriber) receives messages that the
subscriber has registered an interest in, without explicitly specifying
or knowing the publisher.
![]({{site.baseurl}}/zk_dev_ref/images/Eventqueue-concept.jpg "Eventqueue-concept.jpg")

ZK generalizes the event queue to support the server push. The use is
straightforward: specifying the scope of a given event queue as
<javadoc method="APPLICATION">org.zkoss.zk.ui.event.EventQueues</javadoc>
(or
<javadoc method="SESSION">org.zkoss.zk.ui.event.EventQueues</javadoc>,
but rare). For example,

``` java
EventQueue que = EventQueues.lookup("chat", EventQueues.APPLICATION, true);
```

For more information about event queues, please refer to the [Event
Handling: Event
Queues](ZK_Developer's_Reference/Event_Handling/Event_Queues)
section.

For the information about low-level API, please refer to [Asynchronous
Tasks](ZK_Developer's_Reference/Server_Push/Asynchronous_Tasks)
section, if the task can execute asynchronously; or [Synchronous
Tasks](ZK_Developer's_Reference/Server_Push/Synchronous_Tasks)
if it must execute synchronously.

# Version History

| Version | Date          | Content                                                                                                                           |
|---------|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6   | November 2010 | The event queue won't start any working threads and they are serializable, so it is safe to use them in a clustering environment. |
