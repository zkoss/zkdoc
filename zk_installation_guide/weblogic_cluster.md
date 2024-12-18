# Before You Start

You have to configure the following setting for [ZK](#zk.xml)
and [Weblogic](#weblogic.xml).

## zk.xml

- Turn on Serializable UI Factory for ZK, please refer to [ this
  documentation]({{site.baseurl}}/zk_dev_ref/Clustering/ZK_Configuration).

``` xml
<zk>
    <system-config>
        <ui-factory-class>org.zkoss.zk.ui.http.SerializableUiFactory</ui-factory-class>
    </system-config>
    <!-- clustering environment, since ZK 5.0.8-->
    <listener>
        <listener-class>org.zkoss.zkplus.cluster.ClusterSessionPatch</listener-class>
    </listener>
</zk>
```

## weblogic.xml

- Add a weblogic.xml under XXX/WEB-INF folder(XXX is like **ZKsandbox**
  in the war file)

For example,

``` xml
<!DOCTYPE weblogic-web-app PUBLIC "-//BEA Systems, Inc.//DTD Web Application 8.1//EN"
 "http://www.bea.com/servers/wls810/dtd/weblogic810-web-jar.dtd">

<weblogic-web-app>
  <session-descriptor>
    <session-param>
      <param-name>PersistentStoreType</param-name>
      <param-value>replicated</param-value>
    </session-param>
  </session-descriptor>
</weblogic-web-app>
```

For Weblogic version 12c

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<wls:weblogic-web-app
    xmlns:wls="http://xmlns.oracle.com/weblogic/weblogic-web-app"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd http://xmlns.oracle.com/weblogic/weblogic-web-app http://xmlns.oracle.com/weblogic/weblogic-web-app/1.5/weblogic-web-app.xsd">
    <wls:session-descriptor>
        <wls:persistent-store-type>replicated</wls:persistent-store-type>
    </wls:session-descriptor>
</wls:weblogic-web-app>
```

As mentioned in [Weblogic's
document](http://download.oracle.com/docs/cd/E12840_01/wls/docs103/webapp/weblogic_xml.html#wp1071982)

**`replicated`**` — Same as memory, but session data is replicated across the clustered servers.`

# Setting up Weblogic Clusters

After those things done above, please follow the official document to
set up a Weblogic Cluster Server
[here](http://download.oracle.com/docs/cd/E12840_01/wls/docs103/cluster/setup.html).

# Including zul in JSP in Weblogic

Weblogic JSP writer implementation uses response#getOutputStream for JSP
blocks. Using the

    <jsp:include src="foo/bar/mypage.zul">

tag in weblogic will cause the ZK layout servlet to write the zul file
to response#getWriter.

This will cause an error "Cannot call outputStream because getWriter was
already called"

Instead, use

    <%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
    <c:import var = "data" url = "foo/bar/mypage.zul"/><c:import>​

- <distributable/> in web.xml is not used by WebLogic Server 12c.
  (https://docs.oracle.com/cd/E24329_01/web.1211/e21049/web_xml.htm#WBAPP510)

# Version History

| Version | Date      | Content                                                                           |
|---------|-----------|-----------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Add ClusterSessionPatch listener to zk.xml for enforce Weblogic to write session. |
