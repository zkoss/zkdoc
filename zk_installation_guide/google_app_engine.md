# Get Your App Engine Account Ready

First, you have to sign up an [App Engine](http://code.google.com/appengine/) account and download the App
Engine SDK. Refer to [the official website](http://code.google.com/appengine/) for details.

To use Google App Engine for Java, you have to take one additional step:
[sign up here](http://appengine.google.com/promo/java_runtime).

**In addition, since GAE is a clustered platform, your application must
be ready for clustering, such as implementing serializable. For more
information, please refer to [ZK Developer's Reference: Clustering/Programming Tips]({{site.baseurl}}/zk_dev_ref/clustering/programming_tips).**

# Configure Your App Engine Project

Here we assume you created a App Engine project. If not, please refer
[here](http://code.google.com/appengine/docs/java/gettingstarted/).

There are three files that you have to configure: `web.xml`, `zk.xml`
and `appengine-web.xml`. They all reside in the `WEB-INF` directory.

## The web.xml File

The content is similar to other ZK application except the AU engine has
to be mapped to `/zkau`, too (in additions to `/zkau/*`. Otherwise, AU
requests won't be sent to the AU engine. Here is is an example.

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="2.5">
    <listener>
        <description>ZK listener for session cleanup</description>
        <listener-class>org.zkoss.zk.ui.http.HttpSessionListener</listener-class>
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
        <servlet-name>auEngine</servlet-name>
        <url-pattern>/zkau/*</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>auEngine</servlet-name>
        <url-pattern>/zkau</url-pattern>
    </servlet-mapping>
    <welcome-file-list>
        <welcome-file>index.zul</welcome-file>
        <welcome-file>index.zhtml</welcome-file>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
</web-app>
```

## The zk.xml File

Google App Engine is a cloud service, so you have to enable the
clustering: disable event threads and use serializable UI factory. In
addition, Google App Engine doesn't allow users to create a working
thread, so we have to disable the resend mechanism.

Here is an example.

```xml
<zk>
    <!-- clustering environment -->
    <system-config>
        <disable-event-thread/>
        <ui-factory-class>org.zkoss.zk.ui.http.SerializableUiFactory</ui-factory-class>
    </system-config>
    <!-- clustering environment (available since ZK 5.0.8)-->
    <listener>
        <listener-class>org.zkoss.zkplus.cluster.ClusterSessionPatch</listener-class>
    </listener>
    <!-- [Required if ZK 5] disable the use of LogManager (prohibited by GAE). -->
    <library-property>
        <name>org.zkoss.util.logging.hierarchy.disabled</name>
        <value>true</value>
    </library-property>

    <!-- GAE doesn't allow user's thread -->
    <client-config>
        <resend-delay>-1</resend-delay>
    </client-config>
</zk>
```

With ZK 6 or later, you don't have to specify the library property
called org.zkoss.util.logging.hierarchy.disabled. Rather, just *not* to
configure the logging at all (i.e., do *not* use any feature specified
in ZK Developer's Reference/Supporting Utilities/Logger). Then,
`java.util.logging.LogManager` won't be used (which is prohibited by
GAE).

## The appengine-web.xml File

App Engine requires one addition configuration file named
`appengine-web.xml`. It resides in the `WEB-INF` directory.

```xml
<sessions-enabled>true</sessions-enabled>

<static-files>
    <exclude path="/**.zul"/>
    <exclude path="/**.zhtml"/>
</static-files>
<resource-files>
    <include path="/**.zul"/>
    <include path="/**.zhtml"/>
</resource-files>
```

# More Information

Due to the way App Engine serializes sessions, you have to use ZK 3.6.2
or later. In additions, there are some other limitations.

- You cannot define functions in zscript, since BeanShell's method can
  not be serialized correctly<ref>

It runs correctly locally but not if uploaded. It could be done by
specifying as a [library property]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_scripting_bsh_method_serializable)
to disable the serializing of zscript methods for the whole application.

</ref>

.

- You cannot use captcha due to the limit support of `java.awt`
  package[^1]

When it comes to [Server Push]({{site.baseurl}}/zk_dev_ref/server_push),
since App Engine doesn't allow creating new threads, so session scope or
application scope event queue cannot be used with App Engine. If you
require server push feature, you should use
[timer]({{site.baseurl}}/zk_component_ref/timer)
instead of [event queue]({{site.baseurl}}/zk_dev_ref/ui_patterns/use_event_queues)
in an App Engine environment.

------------------------------------------------------------------------

<references/>

# Memory Limitation and Solutions

GAE limits the session memory to 1 mega bytes. If a user visits several
pages (with different URLs) in the same browser session, there would be
several desktops created and stored in the session, and it might run out
the 1 mega bytes. To avoid this, you can implement
[org.zkoss.zk.ui.util.DesktopInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopInit.html) to
remove other desktops in the desktop cache and specify it in
WEB-INF/zk.xml as a listener. For example,

```java
public class MyDesktopInit implements DesktopInit {
  public void init(Desktop desktop, Object req) throws Exception {    
    HttpServletRequest request = (HttpServletRequest) req;     
    //Remove old Desktop   
    String oldDesktopId = (String) request.getSession().getAttribute("currentDesktopId");   
    WebAppCtrl ctrl = (WebAppCtrl)Executions.getCurrent().getDesktop().getWebApp();   
    DesktopCache dc = ctrl.getDesktopCache(desktop.getSession());   
    dc.removeDesktop(dc.getDesktop(oldDesktopId));       
    //Add new Desktop
    request.getSession().setAttribute("currentDesktopId", desktop.getId()); 
  }
}
```

# Sample

[Download](http://sourceforge.net/projects/zk1/files/ZK_for_Google_App_Engine/)
a sample application named zk-gae.

In additions, you could visit
[Bitbucket](https://bitbucket.org/antiso/zktest/src/143186a3ae8b/src/main/).
It is a sample project developed by Vladimir Sosnin, and the working
demo is [here](http://tags42.appspot.com/borderlayout/borderlayout.zul).

# Version History

| Version | Date           | Content                                                                                                                                                                                                                                                                                                                                                                                                                             |
|---------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.8   | June 2011      | Add ClusterSessionPatch listener to zk.xml for enforce GAE to write session.                                                                                                                                                                                                                                                                                                                                                        |
| 5.0.9   | September 2011 | In 5.0.7/5.0.8, we introduced a feature allowing developers to log the serialization. Unfortunately, it broke one of GAE restriction: java.util.logging.LogManager is not accessible. It is fixed in 5.0.9 but specifying a library property called [org.zkoss.util.logging.hierarchy.disabled]({{site.baseurl}}/zk_config_ref/org_zkoss_util_logging_hierarchy_disabled) in `WEB-INF/zk.xml`. |

[^1]: You will see a warning, `... Component captcha ignored.`, in the
    application log, refer to the JRE [white list](http://developers.google.com/appengine/docs/java/jrewhitelist).
