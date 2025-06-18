**Listener:**

`org.zkoss.zk.ui.event.EventThreadCleanup`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.event.EventThreadCleanup</javadoc>
to cleanup an event processing thread, after it has processed an event.

> ------------------------------------------------------------------------
>
> Notice that it is useless unless [the event processing
> threads]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
> are enabled (it is disabled by default).

If a listener implements this interface, an instance is created, and
then the `cleanup` method is called in the event processing thread after
the thread processes the event. Then, the `complete` method is called in
the main thread (aka., the servlet thread), after the main thread is
resumed.

**Note**: The `complete` method won't be called if the corresponding
`cleanup` method threw an exception.

A typical use of this feature is to clean up unclosed transaction.

Once registered, an instance is instantiated and the `cleanup` method is
called after leaving the event processing thread.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
