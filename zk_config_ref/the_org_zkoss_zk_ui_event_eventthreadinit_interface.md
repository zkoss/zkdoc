**Listener:**

`org.zkoss.zk.ui.event.EventThreadInit`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.event.EventThreadInit</javadoc>
to initialize an event processing thread, before an event is dispatched
to it for processing.

> ------------------------------------------------------------------------
>
> Notice that it is useless unless [the event processing
> threads]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
> are enabled (it is disabled by default).

If a listener implements this interface, an instance is created, and
then the `prepare` method is called in the main thread (aka., the
servlet thread), before processing an event. Then, the `init` method is
called in the event processing thread.

If a developer wants to prevent an event from being processed, he can
throw an exception in the `prepare` method or the `init` method.

A typical use of this feature is to implement auto-authentication. For
example, [JBoss](http://www.jboss.org) required you to call
`SecurityAssociation.setPrincipal` to grant permissions of a user to the
event processing thread.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
