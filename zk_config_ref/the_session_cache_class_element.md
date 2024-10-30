**Syntax:**

<session-cache-class>a_class_name</session-cache-class>

`[Default: `org.zkoss.zk.ui.http.SimpleSessionCache`]`

It specifies the session cache used to store ZK sessions. It must
implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.SessionCache</javadoc>
interface.

By default, `org.zkoss.zk.ui.http.SimpleSessionCache`
is used and it stores the ZK session in an attribute of the native
session (i.e., `HttpSession` or `PortletSession`).


