**Syntax:**

<max-spare-threads>*`a_number`*</max-spare-threads>

`[Default: 100]`

It specifies the maximum allowed number of the thread pool for queuing
the idle event processing threads. ZK will reuse the idle event
processing threads by keeping them in a thread pool. The number
specified here then controls the maximum size of the pool.

A negative value indicates that there is no limit. Zero means no pool at
all.

Notice this option is applicable only if the event processing thread is
enabled (it is disabled by default). Please refer to [the
disable-event-thread
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_disable-event-thread_Element)
for details.


