Though
[org.zkoss.zk.ui.util.EventInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/EventInterceptor.html)
is designed to allow developer to intercept how an event is processed,
you could use it as callback to know how long it takes to process an
event. The event processing time can be calculated by subtracting the
time between
[org.zkoss.zk.ui.util.EventInterceptor#beforeProcessEvent(org.zkoss.zk.ui.event.Event)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/EventInterceptor.html#beforeProcessEvent(org.zkoss.zk.ui.event.Event))
and
[org.zkoss.zk.ui.util.EventInterceptor#afterProcessEvent(org.zkoss.zk.ui.event.Event)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/EventInterceptor.html#afterProcessEvent(org.zkoss.zk.ui.event.Event))

Once implemented, you could register it by specifying the following in
`WEB-INF/zk.xml` (assume the class is called foo.MyEventMeter):

```xml
<zk>
    <listener>
        <listener-class>foo.MyEventMeter</listener-class>
    </listener>
</zk>
```
