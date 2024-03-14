Though
<javadoc type="interface">org.zkoss.zk.ui.util.EventInterceptor</javadoc>
is designed to allow developer to intercept how an event is processed,
you could use it as callback to know how long it takes to process an
event. The event processing time can be calculated by subtracting the
time between
<javadoc method="beforeProcessEvent(org.zkoss.zk.ui.event.Event)" type="interface">org.zkoss.zk.ui.util.EventInterceptor</javadoc>
and
<javadoc method="afterProcessEvent(org.zkoss.zk.ui.event.Event)" type="interface">org.zkoss.zk.ui.util.EventInterceptor</javadoc>

Once implemented, you could register it by specifying the following in
`WEB-INF/zk.xml` (assume the class is called foo.MyEventMeter):

``` xml
<zk>
    <listener>
        <listener-class>foo.MyEventMeter</listener-class>
    </listener>
</zk>
```
