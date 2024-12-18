**Listener:**

`org.zkoss.zk.ui.event.EventThreadSuspend `

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.event.EventThreadSuspend</javadoc>,
suthc that it will be called before an event processing thread is going
to be suspended.

> ------------------------------------------------------------------------
>
> Notice that it is useless unless [the event processing
> threads]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Event_Threads)
> are enabled (it is disabled by default).

If a listener implements this interface, an instance is created, and
then the `beforeSuspend` method, when an event processing thread is
going to suspended. It executes in the event processing thread.

A developer can prevent can prevent an event processing thread from
being suspended by throwing an exception.

A typical use of this feature is to limit the number of suspended
threads.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
