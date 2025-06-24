**Listener:**

`org.zkoss.zk.ui.util.WebAppInit`

A listener could implement
[org.zkoss.zk.ui.util.WebAppInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html) to
initialize a ZK application when it has been loaded.

When a ZK application has been loaded, it invokes the `init` method of
this interface such that developers could plug the application-specific
codes to initialize the application.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
