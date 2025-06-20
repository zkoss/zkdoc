**Listener:**

`org.zkoss.zk.ui.util.WebAppCleanup`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.WebAppCleanup</javadoc>
to cleanup a ZK application, when it is being destroyed.

When a ZK application is going to be destroyed, it invokes the `cleanup`
method of this interface such that developers could plug the
application-specific codes to cleanup the application.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
