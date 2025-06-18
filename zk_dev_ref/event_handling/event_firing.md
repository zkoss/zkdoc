Events are usually fired (aka., triggered) by a component (when serving
the user at the client). However, applications are allowed to fire
events too.

There are three ways to trigger an event: post, send and echo.

# Post an Event

Posting is the most common way to trigger an event. By posting, the
event is placed at the end of the system event queue[^1]. Events stored
in the system event queue are processed one-by-one in first-in-first-out
order. Each desktop has one system event queue and all events are
handled sequentially.

To trigger an event, you could invoke
<javadoc method="postEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.event.Events</javadoc>.
For example,

```java
Events.postEvent("onClick", button, null); //simulate a click
```

In addition to posting an event to the end of the system event queue,
you could specify a priority with
<javadoc method="postEvent(int, java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.event.Events</javadoc>.
By default, the priority is 0. The higher the priority the earlier an
event is processed.

Notice that the invocation returns after placing the event in the system
event queue. In other words, the event won't be processed unless all
other events posted earlier or with higher priority are processed.

> ------------------------------------------------------------------------
>
> <references/>

# Send an Event

If you prefer to trigger an event to a component directly and process it
immediately, rather than placing it in the system event queue and
waiting for execution, you could use
<javadoc method="sendEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.event.Events</javadoc>
to trigger the event.

```java
Events.sendEvent("onMyEvent", component, mydata);
```

<javadoc method="sendEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.event.Events</javadoc>
won't return until all handlers and listeners registered for this event
have been processed. You could image it as a method of invocation. Also
notice that the event handlers and listeners are invoked directly
without starting any event threads (no matter whether the event thread
is enabled or not[^2]).

> ------------------------------------------------------------------------
>
> <references/>

# Echo an Event

Echoing is a way to delay event processing until the next AU request
(aka., Ajax) is received.

More precisely, the event being echoed won't be queued into the system
event queue. Rather, it asks the client to send back an AU request
immediately. Furthermore, after the server receives the AU request, the
event is then posted to the system event queue for processing.

In other words, the event won't be processed in the current execution.
Rather, it is processed in the following request when the event is
<i>echoed</i> back from the client. Here is an example of using
<javadoc method="echoEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zk.ui.event.Events</javadoc>:

```java
   Events.echoEvent("onMyEvent", component, mydata);
```

Event echoing is useful for implementing a long operation. HTTP is a
request-and-response protocol, so the user won't receive any feedback
until the request has been served and responded. Thus, we could send
back some busy messages to let the user know what has happened, and echo
back an event to do the long operation. For more information, please
refer to the [Long Operations: Use Echo
Events]({{site.baseurl}}/zk_dev_ref/ui_patterns/long_operations/use_echo_events)
section.

[^1]: Please don't confuse it with the event queues discussed in the [
    event
    queues]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
    section, which are application-specific, while the system event
    queue is invisible to application developers.

[^2]: By default, the event thread is disabled. Please refer to the
    [Event
    Threads]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
    section for more information.
