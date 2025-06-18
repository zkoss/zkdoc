Sometimes there is no hurry to update the result to a client. Rather,
the UI update could be sent back when the user, say, clicks a button or
triggers some request to the server. This technique is called
*piggyback*.

In piggyback, all you need to do is to register an event listener for
the `onPiggyback` event to one of the **root components**. Then, the
listener will be invoked each time ZK Update Engine has processed an AU
request.

For example, suppose we have a long operation that is processed in a
working thread, then:

```xml
<window id="main" title="Working Thread" onPiggyback="checkResult()">
    <zscript>
     List result = Collections.synchronizedList(new LinkedList());
 
     void checkResult() {
         while (!result.isEmpty())
             main.appendChild(result.remove(0));
     }
    </zscript>
    <timer id="timer" />
    <button label="Start Working Thread">
        <attribute name="onClick">
            timer.start();
            new test.WorkingThread(desktop, result).start();
        </attribute>
    </button>
</window>
```

The advantage of the piggyback is no extra traffic between the client
and the server. However, the user sees no updates if they don't have any
activity, such as clicking. Whether it is proper is really up to the
application requirements.

> ------------------------------------------------------------------------
>
> **Note**: A deferrable event won't be sent to the client immediately,
> so the `onPiggyback` event is triggered only if a non-deferrable event
> is fired. For more information, please refer to the [Deferrable Event
> Listeners]({{site.baseurl}}/zk_dev_ref/event_handling/event_listening#Deferrable_Event_Listeners)
> section.
