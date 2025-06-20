**Listener:**

`org.zkoss.zk.ui.util.DesktopCleanup`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>
to cleanup a desktop when it is being destroyed.

When ZK Loader is going to destroy a desktop, it invokes the `cleanup`
method of this interface so that developers could plug the
application-specific codes to cleanup a desktop.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
