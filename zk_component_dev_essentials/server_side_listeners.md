Then we move on and fire the <mp>"onClear"</mp> event. To fully
understand what happens next we now need to investigate server side
listeners which handle these events. A client event will not be sent to
the server if it has not been registered. To give the developer the
ability to register an event listener at the serverside we need to
declare the events. We can do this using a function called
addClientEvent.

The following example demonstrates declaring a clear event at the
server.

```java
static {
        addClientEvent(SimpleLabel.class, ClearEvent.NAME, 0);
    }
```

We have noted that if an event is not registered at the server side then
it will not be sent from the client. However, in our example there is a
problem if the event is not sent back. Let’s cast our mind back to the
service method we implemented.

```java
public void service(org.zkoss.zk.au.AuRequest request, boolean everError) {
        final String cmd = request.getCommand();

        if (cmd.equals(ClearEvent.NAME)) {
            ClearEvent evt = ClearEvent.getClearEvent(request);
            _cleared = evt.getCleared();
            Events.postEvent(evt);
        } else
            super.service(request, everError);
    }
```

Notice that on the receipt of the <mp>ClearEvent</mp> we update the
<mp>\_cleared</mp> property at the server side. Imagine if this event is
not sent then we have a problem as the client and the server side will
be out of sync. To get around this we can register the event as
important.
