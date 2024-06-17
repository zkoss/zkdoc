If you run an application logic in a task thread (not in a servlet
thread), and you don't want to update UI in the same thread. All you
need to do is:

1.  enable server push
2.  Implement the UI updates in an event listener (implement
    <javadoc type="interface">org.zkoss.zk.ui.event.EventListener</javadoc>
    or
    <javadoc type="interface">org.zkoss.zk.ui.event.SerializableEventListener</javadoc>).
3.  Execute the listener asynchronously by
    <javadoc method="schedule(org.zkoss.zk.ui.Desktop, org.zkoss.zk.ui.event.EventListener, org.zkoss.zk.ui.event.Event)">org.zkoss.zk.ui.Executions</javadoc>.

Here is the code snippet:

``` java
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
long operation to do, you could use [event queue's asynchronous event
listener](ZK_Developer's_Reference/Event_Handling/Event_Queues#Asynchronous_Event_Listener),
or implement it as [a synchronous
task](ZK_Developer's_Reference/Server_Push/Synchronous_Tasks)
and handle lengthy operation outside of the activation block.

# Version History

| Version | Date          | Content                                                                                                                                                                                                                                   |
|---------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.6   | November 2010 | This feature was introduced. With 5.0.5 or prior, you have to use [Event Queues](ZK_Developer's_Reference/Server_Push/Event_Queues) or [Synchronous Tasks](ZK_Developer's_Reference/Server_Push/Synchronous_Tasks). |
