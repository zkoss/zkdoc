---
title: "Synchronous Tasks"
---



Server push is a technology to actively *push* data to the client. For
ZK, the data is usually the UI updates or its variants. Thus, for the
sake of understanding, we could consider the task to be about updating
UI in parallel with regular Ajax requests (poll-type requests). For
example, in a chat application, once a message is entered by a
participant, the server has to *push* it to all clients that are
involved in the conversation.

If the task of updating UI takes place in a working thread, it is
generally more convenient to execute it synchronously as described
later. On the other hand, if the task can be encapsulated as an event
listener
([org.zkoss.zk.ui.event.EventListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/EventListener.html)),
you could execute it asynchronously -- please refer to the [Asynchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/asynchronous_tasks)
section for more information.

# Enable Server Push

By default, the server push is disabled (for better performance). Before
pushing data for a given desktop, you have to enable the server push for
it.

It can be done by use of
[org.zkoss.zk.ui.Desktop#enableServerPush(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Desktop.html#enableServerPush(boolean)):

```java
desktop.enableServerPush(true);
```

After the server push of a given desktop is enabled, you could use any
number of working threads to update the desktop concurrently as
described in the following section[^1].


# Update UI in a Working Thread

To update the UI synchronously in a working thread, we have to do as
follows.

1.  Invoke
    [org.zkoss.zk.ui.Executions#activate(org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#activate(org.zkoss.zk.ui.Desktop)).
    It has two purposes:
    1.  It grants the right to access the UI of the given desktop to the
        caller's thread.
          
        Notice that, for each desktop, at most one thread is allowed to
        access at the same time.
    2.  It establishes a connection with the client (the browser window
        displaying the desktop), such that the update will be sent to
        the client after finished.
2.  Update UI any way you want, just like any regular event listener.
3.  Invoke
    [org.zkoss.zk.ui.Executions#deactivate(org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#deactivate(org.zkoss.zk.ui.Desktop))
    to return the control, such that other threads could have a chance
    to update UI.

Here is an example code that illustrates the usages:

```java
public class WorkingThread extends Thread {
    public void run() {
        try {
            while (anyDataToShow()) {
                //Step 1. Prepare the data that will be updated to UI
                collectData(); //prepare the data to set to components

                //Step 2. Activate to grant the access of the given desktop
                Executions.activate(desktop);
                try {
                     //Step 3. Update UI
                     updateUI(); //implement the logic to change UI, call ZK component API or notify change
                } finally {
                    //Step 4. Deactivate to return the control of UI back
                     Executions.deactivate(desktop);
                }
            }
        } catch (InterruptedException ex) {
            //Interrupted. You might want to handle it
        }
    }

   /**
     * To update UI you can do one of the followings:
     * - to notify changes with {@link BindUtils#postNotifyChange(Object, String)} if changing a ViewModel's property
     * - call a component's setter
     * - If calling a {@link org.zkoss.zul.ListModel} method, it automatically updates for you without notifying
     */
    protected void updateUI() {
        data.clear();
        data.add("now " + System.currentTimeMillis());
    }
}
```

- Line 9-15: the task between
  [org.zkoss.zk.ui.Executions#activate(org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#activate(org.zkoss.zk.ui.Desktop))
  and
  [org.zkoss.zk.ui.Executions#deactivate(org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#deactivate(org.zkoss.zk.ui.Desktop))
  has to take less time, since it blocks others, including the end users
  (of the desktop), from accessing the UI. It is suggested to prepare
  the data before
  [org.zkoss.zk.ui.Executions#activate(org.zkoss.zk.ui.Desktop)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#activate(org.zkoss.zk.ui.Desktop)),
  such that it can be done in parallel with other threads.

For a real example, please refer to small talks: [Simple and Intuitive Server Push with a Chat Room Example](https://www.zkoss.org/wiki/Small_Talks/2007/August/Simple_and_Intuitive_Server_Push_with_a_Chat_Room_Example)
and [Server Push with a Stock Chart Example](https://www.zkoss.org/wiki/Small_Talks/2008/May/Server_Push_with_a_Stock_Chart_Example).

[^1]: For better performance, it is suggested to disable the server push
    if it is no longer used in the given desktop.
