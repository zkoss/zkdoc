**Listener:**

`org.zkoss.zk.ui.util.ExecutionCleanup`

A listener could implement
[org.zkoss.zk.ui.util.ExecutionCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionCleanup.html)
to cleanup an execution that is being destroyed.

When ZK Loader is going to destroy an execution, it invokes the
`cleanup` method of this interface such that developers could plug the
application-specific codes to cleanup an execution.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
