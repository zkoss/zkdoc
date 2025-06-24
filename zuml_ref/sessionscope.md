# sessionScope - java.util.Map

A map of custom attributes associated with the session. It is the same
as the `getAttributes` method in the
[org.zkoss.zk.ui.Session](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html) interface.

If the client is based on HTTP, such as a Web browser, this is the same
map of attributes stored in `javax.servlet.http.HttpSession`. In other
words, you could use it communicate with other servlets, such as JSF.


