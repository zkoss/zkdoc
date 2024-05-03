**Listener:**

`org.zkoss.zk.ui.event.EventThreadResume`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.event.EventThreadResume</javadoc>,
such that it will be called after an event processing thread is resumed
or aborted.

> ------------------------------------------------------------------------
>
> Notice that it is useless unless [the event processing
> threads](ZK_Developer's_Reference/UI_Patterns/Event_Threads)
> are enabled (it is disabled by default).

If a listener implements this interface, an instance is created, and
then the `beforeResume` method is called in the main thread (aka., the
servlet thread), when a suspended event thread is being resumed. Then,
the `afterResume` method is called in the event processing thread after
the thread is resumed successfully.

If a developer wants to prevent an event from being resumed, he can
throw an exception in the `beforeResume` method.

Notice that `beforeResume` executes in the main thread, so it shares the
same thread-local storage with the main thread. On the other hand,
`afterResume` executes in the event processing thread, so it shares the
same thread-local storage with the event thread (and application event
listeners).

In addition to resuming normally, a suspended event processing thread
might be aborted abnormally. For example, when the desktop is destroyed,
all the suspended event threads will be aborted. When the suspended
event processing thread is aborted, an instance is created, and the
`abortResume` method is called in the main thread.

**Note**: If a suspended event thread is aborted, none of the
`beforeResume` and `afterResume` is called. Moreover, the `cleanup` and
`complete` methods of `EventThreadCleanup` won't be called, either.
Thus, you have to handle all necessary cleanups in `abortResume`.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
