---
title: "The org.zkoss.zk.ui.util.ExecutionMonitor interface"
---

**Listener:**

`org.zkoss.zk.ui.util.ExecutionMonitor`

An application-level listener to monitor executions on activation,
deactivation, or waiting for activation. It can also monitors event
processing , enabling it to gather information on the event processing
order and performance, while PerformanceMeter can be used to monitors
the AU requests.

A listener could implement
[org.zkoss.zk.ui.util.ExecutionMonitor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionMonitor.html)
to monitor executions.

**Instantiation:** Please note that a single listener is used for the
whole application. It should be thread-safe and efficient to avoid
reducing general performance. In addition, it shouldn't throw any
exception, and shouldn't hold a reference to executions. If references
to desktops are held, they should be cleaned up when
desktopDestroy(org.zkoss.zk.ui.Desktop) is called.
