# Modal Windows with Servlet Thread

When the event is processed in the Servlet thread (default), the
execution cannot be suspended. Thus, the modal window behaves the same
as the highlited window
([org.zkoss.zul.Window#doHighlighted()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#doHighlighted())). At
the client side, the visual effect is the same: a semi-transparent mask
blocks the end user from access components other than the modal window.
However, at the server side, it works just like the overlapped mode – it
returns immediately without waiting for user's closing the window.

```java
 win.doModal(); //returns once the mode is changed; not suspended
 System.out.println("next");
```

The "next" message will be printed to the console before the end user
closes the modal window.

## Migrate Your Code from Event Thread

With the Event thread, you might write your business logic right after
`doModal()`.

```java
win.doModal(); 
doMyTask(); //your business logic, need to move it for a servlet thread
```

Since now servlet thread doesn't stop at `doModal()`, you need to move
your code to another place. You can put it at:

- Window's `onClose` event listener
- add a button in the modal window and call `doMyTask()` in an `onClick`
  listener and close the modal window.

# Modal Windows with Event Thread

If the event thread is enabled,
[org.zkoss.zul.Window#doModal()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#doModal()) will suspend
the current thread. Thus, the "next" message won't be shown, until the
modal window is closed.

When the event thread is suspended, the Servlet thread will be resumed
and continue to loork another event thread to process other events, if
any. Thus, the end user still have the control (such that he can close
the modal window if he want).
