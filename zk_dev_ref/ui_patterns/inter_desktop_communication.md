---
title: "Inter-Desktop Communication"
---

Unlike pages, you cannot access two desktops at the same time. You
cannot send or post an event from one desktop to another directly
either. Rather, we have to use [an event queue]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
with a proper scope, such as group, session or application -- depending
on where the other desktop is located.

# Desktops in the Same Browser Window

In most cases, each browser window has at most one desktop. However, it
is still possible to have multiple desktops in one browser window:

- Use HTML IFRAME or FRAMESET to integrate multiple ZUML pages
- Use a portal server to integrate multiple ZK portlets
- Assemble multiple ZUML pages at the client, such as the templating
  technology described in [this section]({{site.baseurl}}/zk_dev_ref/integration/foreign_templating_framework)

In this case, you could communicate among desktops by the use of an
event queue with the group scope
([org.zkoss.zk.ui.event.EventQueues#GROUP](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueues.html#GROUP)).

```java
EventQueue que = EventQueues.lookup("groupTest", EventQueues.GROUP, true);
que.subscribe(new EventListener() {
    public void onEvent(Event evt) {
        //receive event from this event queue (within the same group of desktops)
    }
});
```

Notice that the desktop-scoped event queue does not require [Server Push]({{site.baseurl}}/zk_dev_ref/server_push/server_push), so there is no
performance impact at all.

Here is a dumb example: chat among iframes.

```xml
<!-- main -->
<window title="main" border="normal" onOK="publish()">
    <zscript>
    EventQueue que = EventQueues.lookup("groupTest", "group", true);
    que.subscribe(new EventListener() {
        public void onEvent(Event evt) {
            o.setValue(o.getValue() + evt.getData() + "\n");
        }
    });
    void publish() {
        String text = i.getValue();
        if (text.length() > 0) {
            i.setValue("");
            que.publish(new Event("onGroupTest", null, text));
        }
    }
    </zscript>
    Please enter:
    <textbox id="i" onChange="publish()"/>      
    <textbox id="o" rows="6"/>
    <separator/>
    <iframe src="includee.zul" height="500px" width="30%"/>
    <iframe src="includee.zul" height="500px" width="30%"/>
    <iframe src="includee.zul" height="500px" width="30%"/>
</window>
```

And, this is the ZUML page being referenced (by iframe).

```xml
<!-- includee.zul -->
<window title="frame2" border="normal" onOK="publish()">
    <zscript>
        EventQueue que = EventQueues.lookup("groupTest", "group", true);
        que.subscribe(new EventListener() {
            public void onEvent(Event evt) {
                o.setValue(o.getValue() + evt.getData() + "\n");
            }
        });
        void publish() {
            String text = i.getValue();
            if (text.length() > 0) {
                i.setValue("");
                que.publish(new Event("onGroupTest", null, text));
            }
        }
    </zscript>
    <textbox id="i" onChange="publish()"/>      
    <textbox id="o" rows="6"/>
</window>
```

# Desktop in Different Sessions

Similarly, we could use an event queue to communicate among desktops
belonging to different sessions. The only difference is to specify
[org.zkoss.zk.ui.event.EventQueues#APPLICATION](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueues.html#APPLICATION)
as the scope.

```java
EventQueue que = EventQueues.lookup("groupTest", EventQueues.APPLICATION, true);
```
