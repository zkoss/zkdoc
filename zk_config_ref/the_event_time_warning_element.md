**Syntax:**

```xml
<event-time-warning>a_number</event-time-warning>
```

`[Default: 600]`

It specifies the time, in seconds, to show a warning message if an event
has been processed longer than it.

Notice that this option is applicable only if the event processing
thread is enabled (it is disabled by default). Please refer to [the disable-event-thread element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_disable-event-thread_Element)
for details.


