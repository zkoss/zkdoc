---
title: "Use Event Queues"
---



The [event queue]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues)
provides a simple way to execute a so-called asynchronous event listener
in parallel to other event listeners. Thus, it won't block the user from
accessing other functions even if the asynchronous event listener takes
a lot of time to execute.

The event queue starts a working thread to invoke the asynchronous event
listener, though it is transparent to the caller. Thus, it cannot be
used in the environment that does not allow the use of working threads,
such as [Google App Engine](http://code.google.com/appengine/).

In addition, it will start [a server push]({{site.baseurl}}/zk_dev_ref/server_push/server_push) automatically to
send the UI updates back when it is ready. If you prefer to use the
client polling or a particular implementation, you could start it
manually by use of
[org.zkoss.zk.ui.sys.DesktopCtrl#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/DesktopCtrl.html#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)),
such as:

```java
((DesktopCtrl)desktop).enableServerPush(
    new org.zkoss.zk.ui.impl.PollingServerPush(2000,5000,-1));
```

# Example

We provide two implementations to illustrate how to use the event
queue's asynchronous listener for executing a long operation. The first
approach is more generic that you can modify it to use in more diverse
situations. On the other hand, the second approach is much simpler. If
you don't have time, you could skip the first approach and study the
second approach.

## A Generic Approach

A typical use case is to subscribe an asynchronous event listener for
doing the long operation, and to subscribe a synchronous event listener
to update the user interface. Then, when starting a long operation, an
event is posted to the asynchronous event listener for processing. Since
the invocation is asynchronous, the user can still interact with ZK
smoothly. At the end of the invocation of the asynchronous event
listener, it publishes an event to the synchronous event listener to
update the result of the long operation back to the browser.

For example,

```xml
<window title="test of long operation" border="normal">
    <html><![CDATA[
    <ul>
    <li>Click the button it will start a long operation.</li>
    <li>With this implementation, you can press the button again even if
    the long operation is still being processed</li>
    </ul>
    ]]></html>
    <zscript>
    void print(String msg) {
        new Label(msg).setParent(inf);
    }
    </zscript>
    <button label="async long op">
        <attribute name="onClick"><![CDATA[
   if (EventQueues.exists("longop")) {
     print("It is busy. Please wait");
     return; //busy
   }

   EventQueue eq = EventQueues.lookup("longop"); //create a queue
   String result;

   //subscribe async listener to handle long operation
   eq.subscribe(new EventListener() {
     public void onEvent(Event evt) {
       if ("doLongOp".equals(evt.getName())) {
         org.zkoss.lang.Threads.sleep(3000); //simulate a long operation
         result = "success"; //store the result
         eq.publish(new Event("endLongOp")); //notify it is done
       }
     }
   }, true); //asynchronous

   //subscribe a normal listener to show the resul to the browser
   eq.subscribe(new EventListener() {
     public void onEvent(Event evt) {
       if ("endLongOp".equals(evt.getName())) {
         print(result); //show the result to the browser
         EventQueues.remove("longop");
       }
     }
   }); //synchronous

   print("Wait for 3 seconds");
   eq.publish(new Event("doLongOp")); //kick off the long operation
        ]]></attribute>
    </button>
    <vbox id="inf"/>
</window>
```

An asynchronous event listener is <i>not</i> allowed to access the
desktop, but it is allowed to invoke
[org.zkoss.zk.ui.event.EventQueue#publish(org.zkoss.zk.ui.event.Event)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueue.html#publish(org.zkoss.zk.ui.event.Event))
to publish an event.

## A Simpler Approach

While subscribing the asynchronous and synchronous event listeners
separately is generic, as illustrated above, the event queue provides a
simple method to allow you to register them in one invocation:
[org.zkoss.zk.ui.event.EventQueue#subscribe(org.zkoss.zk.ui.event.EventListener, org.zkoss.zk.ui.event.EventListener)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventQueue.html#subscribe(org.zkoss.zk.ui.event.EventListener, org.zkoss.zk.ui.event.EventListener)).
In addition, you don't need to publish an event at the end of the
asynchronous event listener -- the synchronous event listener is invoked
automatically.

```xml
<window title="test of long operation" border="normal">
    <zscript>
    void print(String msg) {
        new Label(msg).setParent(inf);
    }
    </zscript>
    <button label="async long op">
        <attribute name="onClick"><![CDATA[
   if (EventQueues.exists("longop")) {
     print("It is busy. Please wait");
     return; //busy
   }

   EventQueue eq = EventQueues.lookup("longop"); //create a queue
   String result;

   //subscribe async listener to handle long operation
   eq.subscribe(new EventListener() {
     public void onEvent(Event evt) { //asynchronous
       org.zkoss.lang.Threads.sleep(3000); //simulate a long operation
       result = "success"; //store the result
     }
   }, new EventListener() { //callback
     public void onEvent(Event evt) {
       print(result); //show the result to the browser
       EventQueues.remove("longop");
     }
   });

   print("Wait for 3 seconds");
   eq.publish(new Event("whatever")); //kick off the long operation
        ]]></attribute>
    </button>
    <vbox id="inf"/>
</window>
```

# Better Feedback with Button's autodisable

In the above example, we displayed a message if the button was pressed
twice. If you prefer to simply disable the button, you could use
[org.zkoss.zul.Button#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setAutodisable(java.lang.String)).
For example,

```xml
  <button label="async long op" autodisable="+self">
...
```

Then, the button will be disabled automatically when it is pressed.
Notice that we prefix `self` with `+`, and it means you have to enable
it manually (once it is OK to run again).

```java
if (ready)
    button.setDisabled(false); //enable it when ready
```
