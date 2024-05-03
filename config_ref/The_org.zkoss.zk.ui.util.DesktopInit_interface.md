**Listener:**

`org.zkoss.zk.ui.util.DesktopInit`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc> to
initialize a new desktop.

When ZK Loader created a new desktop, it invokes the `init` method of
this interface such that developers could plug the application-specific
codes to initialize a desktop.

A developer can prevent a desktop from being created by throwing an
exception in the `init` method.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
