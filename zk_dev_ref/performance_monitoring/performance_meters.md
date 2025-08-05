---
title: "Performance Meters"
---



[org.zkoss.zk.ui.util.PerformanceMeter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html)
is a collection of callbacks that the implementation could know when a
request is sent, arrives or is processed.

![]({{site.baseurl}}/zk_dev_ref/images/performancemeter.png)

As shown above, T1-T5 identifies the following callbacks.

- T1:
  [org.zkoss.zk.ui.util.PerformanceMeter#requestStartAtClient (java.lang.String, org.zkoss.zk.ui.Execution, long)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html#requestStartAtClient (java.lang.String, org.zkoss.zk.ui.Execution, long))
- T2:
  [org.zkoss.zk.ui.util.PerformanceMeter#requestStartAtServer(java.lang.String, org.zkoss.zk.ui.Execution, long)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html#requestStartAtServer(java.lang.String, org.zkoss.zk.ui.Execution, long))
- T3:
  [org.zkoss.zk.ui.util.PerformanceMeter#requestCompleteAtServer(java.lang.String, org.zkoss.zk.ui.Execution, long)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html#requestCompleteAtServer(java.lang.String, org.zkoss.zk.ui.Execution, long))
- T4:
  [org.zkoss.zk.ui.util.PerformanceMeter#requestReceiveAtClient(java.lang.String, org.zkoss.zk.ui.Execution, long)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html#requestReceiveAtClient(java.lang.String, org.zkoss.zk.ui.Execution, long))
- T5:
  [org.zkoss.zk.ui.util.PerformanceMeter#requestCompleteAtClient(java.lang.String, org.zkoss.zk.ui.Execution, long)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html#requestCompleteAtClient(java.lang.String, org.zkoss.zk.ui.Execution, long))

Thus,

- Server Execution Time: T3 - T2
- Client Execution Time: T5 - T4
- Network Latency Time: (T4 - T3) + (T2 - T1)

# How it works

Notice that, when we make a connection to load a page for the first
time, only Server Execution Time is available. T4 and T5 will be saved
on the client-side and sent back along with the next request.

If you print the request ID and the method name, when zk calls a
performance monitor. You will see a different log between loading a zul
and sending an AU request.

## Request a ZUL

If load a zul 3 times:

```properties
# first load zul
requestId1st - requestStartAtServer
requestId1st - requestCompleteAtServer

# 2nd load zul
requestId1st - requestReceiveAtClient
requestId1st - requestCompleteAtClient
requestId2nd - requestStartAtServer
requestId2nd - requestCompleteAtServer

# 3rd load zul
requestId2nd - requestReceiveAtClient
requestId2nd - requestCompleteAtClient
requestId3rd - requestStartAtServer
requestId3rd - requestCompleteAtServer
```

## Send AU Requests

If you send 2 AU requests, you will see a log like:

```properties
# 1st au
requestId - requestReceiveAtClient
requestId - requestCompleteAtClient
requestId-0 - requestStartAtClient
requestId-0 - requestStartAtServer
requestId-0 - requestCompleteAtServer

# 2nd au
requestId-0 - requestReceiveAtClient
requestId-0 - requestCompleteAtClient
requestId-1 - requestStartAtClient
requestId-1 - requestStartAtServer
requestId-1 - requestCompleteAtServer
```

- only when sending au request, zk calls `requestStartAtClient()`

# Register as a Listener

Once implemented, you need to register it as a [ listener]({{site.baseurl}}/zk_config_ref/the_listener_element)
in `WEB-INF/zk.xml` to make it work: (assume the class is called
foo.MyMeter):

```xml
    <listener>
        <listener-class>foo.MyMeter</listener-class>
    </listener>
```
