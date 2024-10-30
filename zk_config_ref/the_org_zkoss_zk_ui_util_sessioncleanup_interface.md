**Listener:**

`org.zkoss.zk.ui.util.SessionCleanup`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.SessionCleanup</javadoc>
to cleanup a session that is being destroyed.

When ZK Loader is going to destroy a session, it invokes the `cleanup`
method of this interface such that developers could plug the
application-specific codes to cleanup a session.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
