# Subscribe by `@Subscribe`

A method (as if in an EventListener) in
[SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html)
can subscribe to an [ EventQueue]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
by
[@Subscribe](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/select/annotation/Subscribe.html).
For example,

```java
// in sender composer
public void publish() {
    EventQueue<Event> eq = EventQueues.lookup("queue1", EventQueues.DESKTOP, true);
    eq.publish(new Event("onMyEvent", component, data));
}
```

```java
// in receiver composer
@Subscribe("queue1")
public void receive(Event event) {
    // this method will be called when EventQueue "queue1" of Desktop scope is published
    Object data = event.getData();
    Component target = event.getTarget();
}
```

- Notice the queue name should match.
- ZK executes both methods in a servlet thread, so if they execute a
  time-consuming operation, they will block users.

In the example above, when you publish an event in the EventQueue, the
subscribed method will be called. This is a useful mechanism to
communicate among composers. See also
[org.zkoss.zk.ui.event.EventQueue](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueue.html).

# EventQueue Scope

You can subscribe to EventQueue of different scopes.

```java
@Subscribe(value = "queue2", scope = EventQueues.SESSION)
public void method2(Event event) {
    // this method will be called when EventQueue "queue2" of Session scope is published
}
public void publish() {
    EventQueue<Event> eq = EventQueues.lookup("queue2", EventQueues.SESSION, true);
    eq.publish(new Event("onMyEvent", component, data));
}
```

Available scopes are: Desktop, Group, Session, Application. Note that
Group scope requires ZK EE. See also
[org.zkoss.zk.ui.event.EventQueues](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueues.html).

# Event Name

You can also listen to a specified event name.

```java
@Subscribe(value = "queue2", eventName = "event1")
public void method2(Event event) {
    // this method will be called when EventQueue "queue2" of Session scope is published
}
public void publish() {
    EventQueue<Event> eq = EventQueues.lookup("queue2", EventQueues.DESKTOP, true);
    eq.publish(new Event("event1", component, data));
}
```

# Subscriber Method Parameter

The method which subscribes to the EventQueue takes either no parameter
or one parameter of a type Event.

```java
@Subscribe("queue3")
public void method3() { // the event parameter can be omitted
    // ...
}
```

ZK automatically maps event data into the method parameters in order.

```java
@Subscribe("queue3")
public void method3(int i, String s) { 
    // i will be 100, s will be "eventData"
    // ...
}

public void publish() {
    EventQueue<Event> eq = EventQueues.lookup("queue3", EventQueues.DESKTOP, true);
    eq.publish(new Event("event1", component, new Object[]{100, "eventData"}));
}
```

If you put the event at the first one, it also works well.

```java
@Subscribe("queue3")
public void method3(Event event, int i, String s) { 
    // ...
}
```

To recap, we now have four ways to use a parameter:

- method()
- method(Event event)
- method(Event event, int d1, String d2, ....)
- method(int d1, String d2, ...)

# Auto-Unsubscribed

`@Subscribe` will unsubscribe the subscribed event-queue automatically
when the applied component (or its ancestor) of a composer is detached.

# Version History

| Version | Date       | Content                                                                                                                                              |
|---------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6.0.1   | April 2012 | @Subscribe was introduced.                                                                                                                           |
| 7.0.3   | June 2014  | [ZK-2076](http://tracker.zkoss.org/browse/ZK-2076) Enhance Subscribe annotation to map java method by the event name and the parameter type in order |
