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

# Obtaining a Desktop Reference from an External Servlet

If your application includes a separate servlet or service component running outside ZK's execution context, it may need to interact with ZK Desktops — for example, to close a window, refresh the UI, or check whether a desktop is still active.

## Why `ZK_SESSION` Attribute Is Null

When you attempt to retrieve a ZK session from an external servlet:

```java
Object session = request.getSession().getAttribute(org.zkoss.zk.ui.sys.Attributes.ZK_SESSION);
// session is null
```

The attribute is `null` because it is only set when ZK has processed at least one request within that HTTP session. If your external servlet operates on a different HTTP session — due to a different domain, a separate session management scheme, or because ZK's filter chain was not involved — the attribute will not be populated.

## When the Servlet Shares the User's Session: Use ZK's Desktop Cache

If the external servlet is deployed in the same web application and the incoming request carries the same HTTP session as the user's ZK pages, you do not need to build any custom infrastructure. ZK already keeps track of the session and its desktops, and the servlet can read that bookkeeping directly: fetch the ZK session from the standard session attribute, then enumerate the desktops ZK tracks for it through the desktop cache.

```java
// Retrieve the ZK session bound to the current HTTP session
org.zkoss.zk.ui.Session zkSession = (org.zkoss.zk.ui.Session)
        request.getSession().getAttribute(org.zkoss.zk.ui.sys.Attributes.ZK_SESSION);

if (zkSession != null) {
    // Enumerate all desktops ZK currently tracks for this session
    java.util.Collection<org.zkoss.zk.ui.Desktop> desktops =
            ((org.zkoss.zk.ui.sys.WebAppCtrl) org.zkoss.zk.ui.WebApps.getCurrent())
                    .getDesktopCache(zkSession).getAllDesktops();
}
```

Keep the following points in mind when using this technique:

- **Read-only access.** These attributes and the desktop cache are the same structures ZK uses internally to manage sessions and desktops. Reading them is safe, but never write to them — adding, replacing, or removing entries interferes with ZK's own session and desktop management.
- **Null until the first desktop exists.** The `ZK_SESSION` attribute is only populated after at least one ZK page has created a desktop in that session, so always check for `null` as shown above.
- **Do not cache the results.** Use the retrieved `Session` and `Desktop` objects within the current request only. Holding long-lived references prevents proper cleanup once a desktop or session is destroyed.
- **Requires a shared session.** If the third-party caller arrives on a different HTTP session — for example, from another domain or without the user's session cookie — this lookup returns nothing. In that case, use the explicit registry described in the next subsection instead.

Once you have a `Desktop` reference, interacting with its UI follows the same pattern as any working thread: wrap your updates between `Executions.activate(desktop)` and `Executions.deactivate(desktop)` as described in [Update UI in a Working Thread](#update-ui-in-a-working-thread).

## Solution: Maintain an Explicit Desktop Registry

The recommended approach is to store Desktop references in a shared, application-level structure when the desktop is created or becomes active in your ZK application. Use a `WeakReference` wrapper to prevent memory leaks when desktops are garbage-collected after being closed.

### Step 1: Create a Shared Desktop Registry

```java
public class DesktopRegistry {
    private static final Map<String, WeakReference<Desktop>> desktops = new ConcurrentHashMap<>();

    public static void register(String desktopId, Desktop desktop) {
        desktops.put(desktopId, new WeakReference<>(desktop));
    }

    public static Desktop lookup(String desktopId) {
        WeakReference<Desktop> ref = desktops.get(desktopId);
        return (ref != null) ? ref.get() : null;
    }

    public static void unregister(String desktopId) {
        desktops.remove(desktopId);
    }
}
```

### Step 2: Register Desktops in Your ZK Application

When a desktop is initialized, register it with a unique identifier:

```java
public class MyComposer extends SelectorComposer<Window> {
    @Override
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        Desktop desktop = comp.getDesktop();
        DesktopRegistry.register(desktop.getId(), desktop);
        desktop.enableServerPush(true);
    }
}
```

### Step 3: Look Up and Activate the Desktop from the External Servlet

```java
public class ExternalServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String desktopId = request.getParameter("desktopId");
        Desktop desktop = DesktopRegistry.lookup(desktopId);

        if (desktop == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Desktop not found or already closed");
            return;
        }

        try {
            Executions.activate(desktop);
            try {
                // Update UI here, same as any event listener
            } finally {
                Executions.deactivate(desktop);
            }
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }

        response.getWriter().write("OK");
    }
}
```

A `WeakReference` lets the JVM reclaim a closed desktop's memory while the registry retains the mapping. Always check that `lookup()` does not return `null` before calling `Executions.activate()` — a `null` result means the desktop has already been closed and collected.
