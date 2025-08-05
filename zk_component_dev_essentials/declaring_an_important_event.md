---
title: "Declaring an Important Event"
---

The third argument of <mp>addClientEvent</mp> is used to declare an
event as import. The argument is a combination of integer flags that
indicate how to handle the event. The ***CE_IMPORTANT*** flag is used to
indicate that this event is very important and should be sent to the
server even if there is no server side listener registered for the
event. For other flags such as CE_NON_DEFERRABLE (send immediately) or
CE_REPEAT_IGNORE please refer to the Java API:
[org.zkoss.zk.ui.sys.ComponentCtrl](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ComponentCtrl.html).

For example, we require the <mp>onClear</mp> event to be sent to the
server at all times so we are required to declare the following:

```java
static {
        addClientEvent(SimpleLabel.class, ClearEvent.NAME, CE_IMPORTANT);
    }
```

Now the *ClearEvent* is guaranteed to be sent to the server which solves
our syncing problem. We have a simple label with some additional
features which works as advertised. This label has served as a good
introduction to component development with ZK.
