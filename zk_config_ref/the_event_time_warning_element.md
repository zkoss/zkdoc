---
title: "The event-time-warning Element"
---

**Syntax:**

```xml
<event-time-warning>a_number</event-time-warning>
```
{% include supported-since.html version="3.6.3" %}
`[Default: 600]`

It specifies the time, in seconds, to show a warning message if an event
has been processed longer than it.

Notice that this option is applicable only if the event processing
thread is enabled (it is disabled by default). Please refer to [the disable-event-thread element]({{site.baseurl}}/zk_config_ref/the_disable_event_thread_element)
for details.


