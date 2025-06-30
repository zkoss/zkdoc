**Syntax:**

```xml
<max-suspended-threads>a_number</max-suspended-threads>
```

`[Default: -1 `(no limit)`]`

It specifies the maximum allowed number of the suspended event
processing threads. A negative value indicates that there is no limit at
all.

An instance of
`org.zkoss.zk.ui.SuspendNotAllowedException` is thrown,
if an event processing thread is going to suspend and the number of
suspended threads exceeds the number specified here. You can use the
`error-page` element to control how to display this error, or catch the
exception and handle it in a different way.'

Notice that this option is applicable only if the event processing
thread is enabled (it is disabled by default). Please refer to [the disable-event-thread element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_disable-event-thread_Element)
for details.


