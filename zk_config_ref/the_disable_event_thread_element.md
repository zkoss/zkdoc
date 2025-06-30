**Syntax:**

```xml
<disable-event-thread>true|false</disable-event-thread>
```

`Deprecated to enable the event thread according to Java Servlet Specification that may prohibit the creation of new threads`

`[Default: false]`

`[Default: true](disabled)`

It specifies whether to disable the use of the event processing thread.
If disabled, no event processing thread will be used at all. In other
words, all events are processed in the same thread that serves HTTP
requests (so-called Servlet thread) directly.

For better performance (and better compatibility with other frameworks),
it is recommended to disable the use of the event processing thread.
Please refer to [ZK Developer's Reference: Event Threads]({{site.baseurl}}/zk_dev_ref/ui_patterns/event_threads)
for more information.

Enable the event thread only if the project does not need to integrate
other frameworks (such as Spring), uses
`org.zkoss.zul.Messagebox` and modal windows a lot, and
does not have a lot of concurrent users.
