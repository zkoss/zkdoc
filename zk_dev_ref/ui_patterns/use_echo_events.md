Event echoing is useful for implementing a long operation.

As described in the previous section, HTTP is a request-and-response
protocol, so the user won't see any feedback until the request has been
served and responded. Thus, if the processing of a request takes too
long to execute, the user has no idea if the request is being processed,
or they didn't, say, click the button successfully. The user usually
tends to click again to ensure it is really clicked, but it only causes
the server to respond much slower.

The better approach is to send back some busy messages to let the user
know what happens during processing the long operation. It can be done
easily with event echoing. If you prefer to allow the user to keep
accessing other functions, please refer to the [Use Event Queues]({{site.baseurl}}/zk_dev_ref/ui_patterns/use_event_queues)
section, which is powerful but more sophisticated to implement.

Event echoing for a long operation basically takes three steps

1.  Invoke
    [org.zkoss.zk.ui.util.Clients#showBusy(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showBusy(java.lang.String))
    to show a busy message and block the user from accessing any
    function
    - Of course, you could have any effect you like, such as showing [a modal window]({{site.baseurl}}/zk_component_ref/window).
      [org.zkoss.zk.ui.util.Clients#showBusy(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showBusy(java.lang.String))
      is yet a built-in approach for showing the busy message.
2.  Invoke
    [org.zkoss.zk.ui.event.Events#echoEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Events.html#echoEvent(java.lang.String, org.zkoss.zk.ui.Component, java.lang.Object))
    to echo an event
3.  Listen to the event being echoed and do the long operation in the
    listener
    - At the end of the event listener, remember to remove the busy
      message, and update the UI if necessary

For example, assume the long operation is called `doLongOperation`,
then:

```xml
<window id="w" width="200px" title="Test echoEvent" border="normal">
  <attribute name="onLater">
  doLongOperation(); //take long to execute
  Clients.clearBusy(); //remove the busy message
  </attribute>
 
  <button label="Echo Event">
  <attribute name="onClick">
  Clients.showBusy("Execute..."); //show a busy message to user
  Events.echoEvent("onLater", w, null); //echo an event back 
  </attribute>
  </button>
</window>
```

# Better Feedback with Button's autodisable

With event echoing, it might still take hundreds of milliseconds to have
the busy message, especially with the slow connection. The feedback to
user can be further improved by the use of
[org.zkoss.zul.Button#setAutodisable(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html#setAutodisable(java.lang.String)).
For example,

```xml
  <button label="Echo Event" autodisable="self">
...
```

Then, the button will be disabled automatically when it is pressed, and
enabled automatically when the request has been served.
