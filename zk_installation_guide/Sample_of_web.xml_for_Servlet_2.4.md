After the ZK libraries have been deployed to a Web application, we have
to configure web.xml to install the required Servlets, listener and
mapping: <javadoc>org.zkoss.zk.ui.http.DHtmlLayoutServlet</javadoc>,
<javadoc>org.zkoss.zk.au.http.DHtmlUpdateServlet</javadoc>, and
<javadoc>org.zkoss.zk.ui.http.HttpSessionListener</javadoc>.

Here is the sample web.xml for servers that support Servlet 2.4 and
later.

  
Notice that if you are using Servlet 3, you generally don't need to set
up `web.xml` unless you'd like to configure it different.

Notice that the ZK demo distribution has several web.xml files under the
MyApp/WebContent/WEB-INF directory: web.servlet-3.xml (for servers
supporting only Servlet 3), web.servlet-2.4.xml (for servers supporting
Servlet 2.4 or later), and web.servlet-2.3.xml (for servers supporting
only Servlet 2.3). You could copy one of them instead of creating from
scratch.

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app version="2.4" xmlns="http://java.sun.com/xml/ns/j2ee"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"> 

    <description><![CDATA[My ZK Application]]></description>
    <display-name>MyApp</display-name>

    <listener>
        <description>ZK listener for session cleanup</description>
        <listener-class>org.zkoss.zk.ui.http.HttpSessionListener</listener-class>
    </listener>
    <servlet>
        <description>ZK loader for ZUML pages</description>
        <servlet-name>zkLoader</servlet-name>
        <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>

        <init-param>
            <param-name>update-uri</param-name>
            <param-value>/zkau</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
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
    <servlet>
        <description>The asynchronous update engine for ZK</description>
        <servlet-name>auEngine</servlet-name>
        <servlet-class>org.zkoss.zk.au.http.DHtmlUpdateServlet</servlet-class>
    </servlet>
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

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
