ZK supports Servlet 3.0 Pluggability, so you don't have to configure
ZK's servlets and listeners in `WEB-INF/web.xml` at all. (Make sure you
include
[zkwebfragment.jar](https://mavensync.zkoss.org/eval/org/zkoss/zk/zkwebfragment/))

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
    version="3.0">

    <description><![CDATA[My ZK Application]]></description>
    <display-name>MyApp</display-name>
</web-app>
```

On the other hand, if `metadata-complete=“true”` was specified in
`WEB-INF/web.xml` (i.e., the support of pluggability is disabled), you
have to configure ZK servlets and listeners manually as described in
[the Sample of web.xml for Servlet 2.4](ZK_Background/Sample_of_web.xml_for_Servlet_2.4).
