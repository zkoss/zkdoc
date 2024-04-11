# applicationScope - java.util.Map

A map of custom attributes associated with the Web application. It is
the same as calling
[WebApp.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getAttributes--).

A web application is a WAR, and each web application has an independent
set of custom attributes. These attributes are used mainly to
communicate among different desktops and sessions.

If the client is based on HTTP, such as a Web browser, this is the same
map of attributes stored in `javax.servlet.ServletContext`. In other
words, you could use it to communicate with other servlets, such as JSF.
