# Deploy a ZK Porlet

## web.xml

Define the definition of porlet in web.xml

``` xml
<web-app> 
    <display-name>ZK Portlets</display-name> 
 
    <servlet> 
        <description>ZK loader for ZUML pages</description> 
        <servlet-name>zkLoader</servlet-name> 
        <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class> 
        <init-param> 
            <param-name>update-uri</param-name> 
            <param-value>/zkau</param-value> 
        </init-param> 
        <load-on-startup>1</load-on-startup><!-- Must --> 
    </servlet> 
 
    <servlet-mapping> 
        <servlet-name>zkLoader</servlet-name> 
        <url-pattern>*.zul</url-pattern> 
    </servlet-mapping>  
    <servlet-mapping> 
        <servlet-name>zkLoader</servlet-name> 
        <url-pattern>/zk/*</url-pattern> 
    </servlet-mapping> 
 
    <servlet> 
        <description>The asynchronous update engine for ZK</description> 
        <servlet-name>auEngine</servlet-name> 
        <servlet-class>org.zkoss.zk.au.http.DHtmlUpdateServlet</servlet-class> 
    </servlet> 
    <servlet-mapping> 
        <servlet-name>auEngine</servlet-name> 
        <url-pattern>/zkau/*</url-pattern> 
    </servlet-mapping> 

    <servlet> 
        <servlet-name>zkportlet</servlet-name> 
        <servlet-class>org.apache.pluto.core.PortletServlet</servlet-class> 
        <init-param> 
            <param-name>portlet-name</param-name> 
            <param-value>zkportlet</param-value> 
        </init-param> 
        <load-on-startup>1</load-on-startup> 
    </servlet>
 
    <servlet-mapping> 
        <servlet-name>zkportlet</servlet-name> 
        <url-pattern>/PlutoInvoker/zkportlet</url-pattern> 
    </servlet-mapping>
 
    <session-config> 
        <session-timeout>120</session-timeout> 
    </session-config> 
 
    <welcome-file-list> 
        <welcome-file>index.zul</welcome-file> 
        <welcome-file>index.zhtml</welcome-file> 
        <welcome-file>index.html</welcome-file> 
        <welcome-file>index.htm</welcome-file> 
    </welcome-file-list> 

    <security-role> 
        <role-name>tomcat</role-name> 
    </security-role> 
</web-app> 
```

## portlet.xml

Define a ZK portlet in portlet.xml.

``` xml
<portlet-app 
xmlns="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd" 
version="1.0" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd 
http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd"> 
 
 
    <portlet> 
        <description>ZKloader for ZUML pages</description> 
        <portlet-name>zkportlet</portlet-name> 
        <display-name>ZK Portlet Loader</display-name> 
        <portlet-class>org.zkoss.zk.ui.http.DHtmlLayoutPortlet</portlet-class> 
        <init-param> 
            <name>zk_page</name> 
            <value>/index.zul</value> 
        </init-param> 
        <expiration-cache>0</expiration-cache> 
 
        <supports> 
            <mime-type>text/html</mime-type> 
            <portlet-mode>VIEW</portlet-mode> 
        </supports> 
 
        <supported-locale>en</supported-locale> 
 
        <portlet-info> 
            <title>ZK</title> 
            <short-title>ZK</short-title> 
            <keywords>ZK,ZUML</keywords> 
        </portlet-info> 
 
        <security-role-ref> 
            <role-name>plutoTestRole</role-name> 
            <role-link>tomcat</role-link> 
        </security-role-ref> 
    </portlet>  
</portlet-app> 
```

# How to resolve Session Timeout

The cause of this problem is that ZK cannot find the desktop from its
session. Why? ZK desktop was stored in the session of pluto instead of
ZK webapp because pluto pass its session to ZK webapp while doing
cross-context in Tomcat. This breaks the spec of servlet. So far, there
is no good solution. But here is a workaround that ZK stores desktop in
application scope instead of session scope to avoid the problem. Please
add the following lines in your zk.xml

``` xml
<system-config> 
    <cache-provider-class>org.zkoss.zk.ui.impl.GlobalDesktopCacheProvider</cache-provider-class> 
</system-config> 
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
