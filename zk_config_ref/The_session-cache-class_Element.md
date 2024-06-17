**Syntax:**

<session-cache-class>*`a_class_name`*</session-cache-class>

`[Default: `<javadoc>`org.zkoss.zk.ui.http.SimpleSessionCache`</javadoc>`]`

It specifies the session cache used to store ZK sessions. It must
implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.SessionCache</javadoc>
interface.

By default, <javadoc>org.zkoss.zk.ui.http.SimpleSessionCache</javadoc>
is used and it stores the ZK session in an attribute of the native
session (i.e., `HttpSession` or `PortletSession`).

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
