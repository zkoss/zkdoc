**Syntax:**

<session-cache-class>a_class_name</session-cache-class>

`[Default: `org.zkoss.zk.ui.http.SimpleSessionCache`]`

It specifies the session cache used to store ZK sessions. It must
implement the
[org.zkoss.zk.ui.sys.SessionCache](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/SessionCache.html)
interface.

By default, `org.zkoss.zk.ui.http.SimpleSessionCache`
is used and it stores the ZK session in an attribute of the native
session (i.e., `HttpSession` or `PortletSession`).


