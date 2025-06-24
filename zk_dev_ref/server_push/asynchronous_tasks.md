If you run an application logic in a task thread (not in a servlet
thread), and you don't want to update UI in the same thread. All you
need to do is:

1.  enable server push
2.  Implement the UI updates in an event listener (implement
    [org.zkoss.zk.ui.event.EventListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventListener.html)
    or
    [org.zkoss.zk.ui.event.SerializableEventListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SerializableEventListener.html)).
3.  Execute the listener asynchronously by
    <javadoc method="schedule(org.zkoss.zk.ui.Desktop, org.zkoss.zk.ui.event.EventListener, org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.Executions</javadoc>.

Here is the code snippet:

```java
    @Listen("onClick = #start")
    public void start() throws ExecutionException, InterruptedException {
        // run in a separate thread
        CompletableFuture.runAsync(() -> {
            Threads.sleep(3000); //simulate a long task
            Executions.schedule(desktop,
                new EventListener<Event>() {
                    public void onEvent(Event event) {
                        //update UI
                        status.setValue("done at " + LocalDateTime.now());
                    }
                }, new Event("myEvent"));
        });
    }
```

- Line 10: You can manipulate ZK UI components in
  <javadoc type="interface" method="onEvent(org.zkoss.zk.ui.Event)">org.zkoss.zk.ui.event.EventListener</javadoc>.
  It is no different from any other event listener.

Notice that
<javadoc method="schedule(org.zkoss.zk.ui.Desktop, org.zkoss.zk.ui.event.EventListener, org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.Executions</javadoc>
can be called anywhere, including another event listener or a task
thread. In other words, you don't have to fork a new thread to use this
feature.

Notice that, since there is at most one thread to access the UI of a
given desktop, the event listener must NOT be time-consuming. Otherwise,
it will block other event listeners from execution. Thus, if you have a
long operation to do, you could use [event queue's asynchronous event listener]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues#Asynchronous_Event_Listener),
or implement it as [a synchronous task]({{site.baseurl}}/zk_dev_ref/server_push/synchronous_tasks)
and handle lengthy operation outside of the activation block.

# Version History

| Version | Date          | Content                                                                                                                                                                                                                                   |
|---------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6   | November 2010 | This feature was introduced. With 5.0.5 or prior, you have to use [Event Queues]({{site.baseurl}}/zk_dev_ref/server_push/event_queues) or [Synchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/synchronous_tasks). |
