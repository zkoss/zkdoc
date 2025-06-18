Here is the sample web.xml for servers that support Servlet 2.3 only.

  
Notice that the ZK demo distribution has two web.xml files under the
MyApp/WebContent/WEB-INF directory: web.xml (for servers supporting
Servlet 2.4 or later), and web.servlet-2.3.xml (for servers supporting
only Servlet 2.3). You could copy one of them instead of creating from
scratch.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE web-app
    PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
    "http://java.sun.com/dtd/web-app_2_3.dtd">

<web-app>
    <description><![CDATA[My ZK Application]]></description>
    <display-name>MyApp</display-name>
    
    <listener>
        <listener-class>org.zkoss.zk.ui.http.HttpSessionListener23</listener-class>
    </listener>
    <servlet>
        <servlet-name>zkLoader</servlet-name>
        <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>
        <init-param>
            <param-name>update-uri</param-name>
            <param-value>/zkau</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet>
        <servlet-name>auEngine</servlet-name>
        <servlet-class>org.zkoss.zk.au.http.DHtmlUpdateServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>zkLoader</servlet-name>
        <url-pattern>*.zul</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>zkLoader</servlet-name>
        <url-pattern>*.zhtml</url-pattern>
    </servlet-mapping>

    <!-- Optional. Uncomment it if you want to use richlets.
    <servlet-mapping>
        <servlet-name>zkLoader</servlet-name>
        <url-pattern>/zk/*</url-pattern>
    </servlet-mapping>
    -->
    <servlet-mapping>
        <servlet-name>auEngine</servlet-name>
        <url-pattern>/zkau/*</url-pattern>
    </servlet-mapping>

    <welcome-file-list>
        <welcome-file>index.zul</welcome-file>
        <welcome-file>index.zhtml</welcome-file>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
    </welcome-file-list>
</web-app>
```


