# Setting up Liferay

There are several ways in which an application can be set up within
Liferay, the first one being to simply go to
[Liferay](http://www.liferay.com) and download the pre-bundled liferay
tomcat bundle (other app server bundles are also available but
experiences indicate that other ones might be trickier to begin with as
the configuration is usually more lengthy), however, this option is not
ideal if the user already have an existing tomcat server.

If the user already has a tomcat server on hand and does not
particularly feel like deploying another one, the second option would be
to download "liferay war". Typically, Liferay's installation removes the
ROOT folder from the server, to avoid this situation, please stick to
the following steps closely.

- Download the non-bundled liferay war (Liferay Portal Professional
  4.2.1 WAR) from [Liferay](http://www.liferay.com)

<!-- -->

- Download the additional file called Liferay Portal 4.2.1 Dependencies,
  and unzip it to shared/lib

<!-- -->

- In order to keep the ROOT folder, extract the contents of the war into
  a folder, call it 'myportal' for instance.

<!-- -->

- Under the WEB-INF folder, create a 'classes' folder, in this folder
  create a file called 'portal-ext.properties', and in this file place
  the following (note that users may of course change the portal.ctx
  and/or the lucene and jackrabbit directory depending on later
  configurations):

``` text
portal.release=professional
portal.ctx=/myportal
auto.deploy.dest.dir=../webapps
portal.instances=1
lucene.dir=C:/home/liferay/lucene
jcr.jackrabbit.repository.root=C:/home/liferay/jackrabbit
omniadmin.users=
```

- Go back to the WEB-INF folder and edit the web.xml - change the
  root_path to have a param value of '/myportal', so that the top of the
  web.xml will look as follows:

``` xml
<?xml version="1.0"?>

<web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd" version="2.4">
    <context-param>
        <param-name>company_id</param-name>
        <param-value>liferay.com</param-value>
    </context-param>
    <context-param>
        <param-name>root_path</param-name>
        <param-value>/myportal</param-value>
    </context-param>
    <filter>
        <filter-name>Auto Login Filter</filter-name>
        <filter-class>com.liferay.portal.servlet.filters.autologin.AutoLoginFilter</filter-class>
    </filter>
.
.
.
```

- Now go into the META-INF folder and add a file called 'context.xml'
  and add the following (configure this according to own specifics, just
  make sure that the context path attribute is '/myportal', if the user
  does not use mysql database and wants liferay to use hSQLdb, strip out
  the first Resource element):

``` xml
<Context path="/myportal" reloadable="true" >
    <Resource
        name="jdbc/LiferayPool"
        auth="Container"
        type="javax.sql.DataSource"
        driverClassName="com.mysql.jdbc.Driver"
      url="jdbc:mysql://localhost/lportal?useUnicode=true&amp;characterEncoding=UTF-8"
        username="liferay"
        password="yarefil"
        maxActive="100"
        maxIdle="30"
        maxWait="10000"
    />
    <Resource
                name="mail/MailSession"
                auth="Container"
                type="javax.mail.Session"
                mail.transport.protocol="smtp"
                mail.smtp.host="localhost"
    />
    <Realm 
                className="org.apache.catalina.realm.JAASRealm"
                appName="PortalRealm"
                userClassNames="com.liferay.portal.security.jaas.PortalPrincipal"
                roleClassNames="com.liferay.portal.security.jaas.PortalRole"
                debug="99"
                useContextClassLoader="false"
    />
</Context>
```

- Now for the real trick, liferay 4.2 has a small bug when changing the
  context to something other than the ROOT. In the folder html/portal,
  find a file called load_render_portlet.jsp, open the file up and go to
  line 55-56 and it should look like the following:

``` javascript
    function <%= namespace %>loadPortlet() {
        var path = "/c/portal/render_portlet";
```

however it should look as follows:

``` javascript
    function <%= namespace %>loadPortlet() {
        var path = "/myportal/c/portal/render_portlet";
```

- If the user wishes to use mySQL, modify the context.xml to the user's
  own configurations, the user will also need to download the
  liferay-mysql script file and run it against the user's database.

<!-- -->

- Now, in the ROOT folder (i.e. C:\\ for windows, / for UNIX/LINUX),
  create a 'home' folder (if it doesn't already exist) and in that
  folder, create a 'liferay' folder. Make sure tomcat has permission to
  modify the folder.

<!-- -->

- Now, re zip the folder and rename the zip file to myportal.war, drop
  it into tomcat's webapps deploy directory and (hopefully) a working
  liferay portal will appear.

# Deploying a ZK portlet

Here, this guide assumes that users are familiar with and have created a
ZK war.

- First, in order to tell liferay about the portlet, create a class that
  looks like this:

``` java
/**
 * Copyright (c) 2000-2006 Liferay, LLC. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package za.co.mypackage.portlet;

import java.io.IOException;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.GenericPortlet;
import javax.portlet.PortletException;
import javax.portlet.PortletRequestDispatcher;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @author  Brian Wing Shun Chan
 * @modified Glenn Keith
 */
public class JSPPortlet extends GenericPortlet {

    public void init() throws PortletException {
        editJSP = getInitParameter("edit-jsp");
        helpJSP = getInitParameter("help-jsp");
        viewJSP = getInitParameter("view-jsp");
    }

    public void doDispatch(RenderRequest req, RenderResponse res)
        throws IOException, PortletException {

        String jspPage = req.getParameter("jspPage");

        if (jspPage != null) {
            include(jspPage, req, res);
        }
        else {
            super.doDispatch(req, res);
        }
    }

    public void doEdit(RenderRequest req, RenderResponse res)
        throws IOException, PortletException {

        if (req.getPreferences() == null) {
            super.doEdit(req, res);
        }
        else {
            include(editJSP, req, res);
        }
    }

    public void doHelp(RenderRequest req, RenderResponse res)
        throws IOException, PortletException {

        include(helpJSP, req, res);
    }

    public void doView(RenderRequest req, RenderResponse res)
        throws IOException, PortletException {

        include(viewJSP, req, res);
    }

    protected void include(String path, RenderRequest req, RenderResponse res)
        throws IOException, PortletException {

        PortletRequestDispatcher prd =
            getPortletContext().getRequestDispatcher(path);

        if (prd == null) {
            _log.error(path + " is not a valid include");
        }
        else {
            prd.include(req, res);
        }
    }

    protected String editJSP;
    protected String helpJSP;
    protected String viewJSP;

    private static Log _log = LogFactory.getLog(JSPPortlet.class);

}
```

- Next, create a 'liferay-display.xml' file that looks like the
  following in WEB-INF:

``` xml
<?xml version="1.0"?>
<!DOCTYPE display PUBLIC "-//Liferay//DTD Display 4.0.0//EN" "http://www.liferay.com/dtd/liferay-display_4_0_0.dtd">

<display>
    <category name="category.test">
        <portlet id="portletone" />
    </category>
</display>
```

- Now, also in the WEB-INF, create a file called 'liferay-portlet.xml'
  that looks like the following:

``` xml
<?xml version="1.0"?>
<!DOCTYPE liferay-portlet-app PUBLIC "-//Liferay//DTD Portlet Application 4.1.0//EN" "http://www.liferay.com/dtd/liferay-portlet-app_4_1_0.dtd">

<liferay-portlet-app>
    <portlet>
        <portlet-name>portletone</portlet-name>
        <instanceable>true</instanceable>
    </portlet>
    <role-mapper>
        <role-name>administrator</role-name>
        <role-link>Administrator</role-link>
    </role-mapper>
    <role-mapper>
        <role-name>guest</role-name>
        <role-link>Guest</role-link>
    </role-mapper>
    <role-mapper>
        <role-name>power-user</role-name>
        <role-link>Power User</role-link>
    </role-mapper>
    <role-mapper>
        <role-name>user</role-name>
        <role-link>User</role-link>
    </role-mapper>
</liferay-portlet-app>
```

- **Liferay 5.2.\***: Liferay 5.2 adds cache filters to users' web.xml
  when deployed on the liferay server. These, however, blocks the zk
  javascript (\*.js) communication. To avoid this, add the property
  "speed-filters-enabled=false" in the liferay-plugin-package.properties
  file in the WEB-INF directory.

<!-- -->

- Now again in WEB-INF create a 'portlet.xml' file that looks as
  follows:

``` xml
<?xml version="1.0"?>

<portlet-app xmlns="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd" version="1.0"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd">
    <portlet>
        <portlet-name>portletone</portlet-name>
        <display-name>Sample JSP Portlet</display-name>
        <portlet-class>za.co.mypackage.JSPPortlet</portlet-class>
        <init-param>
            <name>view-jsp</name>
            <value>/view.zul</value>
        </init-param>
        <expiration-cache>0</expiration-cache>
        <supports>
            <mime-type>text/html</mime-type>
        </supports>
        <portlet-info>
            <title>Sample JSP Portlet</title>
            <short-title>Sample JSP Portlet</short-title>
            <keywords>Sample JSP Portlet</keywords>
        </portlet-info>
        <security-role-ref>
            <role-name>guest</role-name>
        </security-role-ref>
        <security-role-ref>
            <role-name>power-user</role-name>
        </security-role-ref>
        <security-role-ref>
            <role-name>user</role-name>
        </security-role-ref>
    </portlet>
</portlet-app>
```

- Note that the /view.zul reference in this file is the 'index' file of
  the portlet, and all these files have been referenced as 'portletone',
  please change this as the name of the war file.

<!-- -->

- Finally, at the top of the web.xml file after <web-app> add the
  following (followed by the typical ZK stuff):

``` xml
.
.
.
    <display-name>sample-jsp-portlet</display-name>
    <context-param>
        <param-name>company_id</param-name>
        <param-value>liferay.com</param-value>
    </context-param>
    <listener>
        <listener-class>com.liferay.portal.kernel.servlet.PortletContextListener</listener-class>
    </listener>
.
.
.
```

Notice that company_id is left as liferay.com.This is because changing
the value would also mean digging around the liferay database and it
would be hard to find all the places to modify the values.

- Deploy the resulting war into /home/liferay/deploy directory,

<!-- -->

- Access and sign in to the user's portal, click on 'Add Content' link,
  under the category 'Test' add 'Sample JSP Portlet'.

## Running ZK 5 with Liferay 5.2

Version: Liferay: 5.2.1 and ZK 5

**Steps**  
1.Download Liferay-Tomcat bundle (this example uses
liferay-portal-tomcat-6.0-5.2.1)  
2.Create a ZK 5 Project  
3. Inside the WEB-INF folder, in order to run the ZK application, set up
the following four xml files in Liferay.

In order to integrate Liferay with ZK, add the following settings to the
**portlet.xml** setting:

- **<portlet-class>org.zkoss.zk.ui.http.DHtmlLayoutPortlet</portlet-class>**
- And create a **zk_page** called **hello.zul**
- .hello.zul

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<?page title="Hello"?>
<zk>
<window title="My First window" border="normal" width="200px">
    Hello, World!
    <button label="Hi" onClick='alert("Welcome")'/>
</window>
</zk>
```

- portlet.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<portlet-app version="1.0" xmlns="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd">
<portlet>
   <description xml:lang="EN">HelloZK</description>
   <portlet-name>HelloZK</portlet-name>
   <display-name xml:lang="EN">HelloZK</display-name>
   <portlet-class>org.zkoss.zk.ui.http.DHtmlLayoutPortlet</portlet-class>
   <expiration-cache>0</expiration-cache>
   <supports>
      <mime-type>text/html</mime-type>
      <portlet-mode>view</portlet-mode>
   </supports>
   <supported-locale>en</supported-locale>
   <portlet-info>
      <title>HelloZK Portlet</title>
      <short-title>HelloZK</short-title>
      <keywords>zk</keywords>
      </portlet-info>
   <portlet-preferences>
   <preference>
      <name>zk_page</name>
      <value>/hello.zul</value>
   </preference>
   </portlet-preferences>
   <security-role-ref>
      <role-name>power-user</role-name>
      </security-role-ref>
      <security-role-ref>
      <role-name>user</role-name>
      </security-role-ref>
   <security-role-ref>
      <role-name>administrator</role-name>
   </security-role-ref>
</portlet>
</portlet-app>
```

- liferay-display.xml

``` xml
<?xml version="1.0"?>
<!DOCTYPE display PUBLIC "-//Liferay//DTD DISPLAY 2.0.0//EN" "http://www.liferay.com/dtd/liferay-display_2_0_0.dtd">
<display>
<category name="category.sample">
    <portlet id="HelloZK" />
</category>
</display>
```

- liferay-portlet.xml

``` xml
<?xml version="1.0"?>
<!DOCTYPE liferay-portlet-app PUBLIC "-//Liferay//DTD Portlet Application 5.2.0//EN" "http://www.liferay.com/dtd/liferay-portlet-app_5_2_0.dtd">
<liferay-portlet-app>
   <portlet>
     <portlet-name>HelloZK</portlet-name>
     <header-portlet-javascript>/zkau/web/js/zk.wpd</header-portlet-javascript>
   </portlet>
   <role-mapper>
      <role-name>user</role-name>
      <role-link>User</role-link>
   </role-mapper>
   <role-mapper>
      <role-name>power-user</role-name>
      <role-link>Power User</role-link>
   </role-mapper>
   <role-mapper>
      <role-name>administrator</role-name>
      <role-link>Administrator</role-link>
   </role-mapper>
   </liferay-portlet-app>
```

- liferay-plugin-package.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plugin-package PUBLIC "-//Liferay//DTD Plugin Package 4.3.6//EN" "http://www.liferay.com/dtd/liferay-plugin-package_4_3_0.dtd">
<plugin-package>
 <name>Hello ZK</name>
 <module-id>/com/demo/test/hellozk/war</module-id>
 <types>
  <type>portlet</type>
 </types>
 <tags>
    <tag>Hello ZK</tag>
 </tags>
 <short-description>
  Hello ZK
 </short-description>
 <change-log>
  Initial Deployment
 </change-log>

 <author>Sam</author>
 <licenses>
  <license osi-approved="true">GPL</license>
 </licenses>
 <liferay-versions>
  <liferay-version>5.1.1+</liferay-version>
  <liferay-version>5.2.1+</liferay-version>
 </liferay-versions>
</plugin-package>
```

  
4.Add library-property setting to zk.xml for Liferay

Reason: under IE, using Liferay with ZK will cause HTML Parsing Error
(KB927917)  
Solution: use **jQueryPatch** and set appropriate **time delay value**
for browser.  
\*zk.xml

``` xml
<zk>
.
.
.
    <library-property>
        <name>org.zkoss.zk.portlet.PageRenderPatch.class</name>
        <value>org.zkoss.zkplus.liferay.JQueryRenderPatch</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zkplus.liferary.jQueryPatch</name>
        <value>500</value>
    </library-property>
.
.
.
</zk>
```

  
5. Export war file  
Export a war file called **DEPLOY_TO\_\_HelloZK.war**, and put this war
file under the **deploy** folder

Liferay deploys war files by its name, when the name
**DEPLOY_TO\_\_HelloZK.war** is used, liferay will deploy this war file
to folder **HelloZK**

**Download**  
[DEPLOY_TO\_\_HelloZK.war](https://sourceforge.net/projects/zkforge/files/Small%20Talks/How%20to%20Install%20ZK%20on%20Liferay/DEPLOY_TO__HelloZK.war/download)

## Running ZK 5 with Liferay 6

Version: Liferay: 6.0+ and ZK 5

Steps

1\. Download Liferay version **bundled with Tomcat** from
[Liferay](http://www.liferay.com/)

2\. Create a ZK 5 Project

3\. Inside the WEB-INF folder, in order to run ZK, users need to add
four xml files to set up Liferay. **JQueryRenderCachedPatch** needs to
be added to the zk.xml setting

The main difference between Liferay 5.2 and Liferay 6.0 is
**liferay-portlet.xml** and **zk.xml**

- web.xml:

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.4" xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
    <display-name>HelloZK2</display-name>
    <listener>
        <description>Used to cleanup when a session is destroyed</description>
        <display-name>ZK Session cleaner</display-name>
        <listener-class>org.zkoss.zk.ui.http.HttpSessionListener</listener-class>
    </listener>
    <servlet>
        <description>The ZK loader for ZUML pages</description>
        <servlet-name>zkLoader</servlet-name>
        <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>
        <init-param>
            <param-name>update-uri</param-name>
            <param-value>/zkau</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet>
        <description>The asynchronous update engine for ZK</description>
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
    <servlet-mapping>
        <servlet-name>auEngine</servlet-name>
        <url-pattern>/zkau/*</url-pattern>
    </servlet-mapping>
    <session-config>
        <session-timeout>60</session-timeout>
    </session-config>
    <welcome-file-list>
        <welcome-file>index.zul</welcome-file>
        <welcome-file>index.zhtml</welcome-file>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
    </welcome-file-list>
</web-app>
```

- zk.xml:
- use **JQueryRenderCachedPatch**

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<zk>
    <library-property>
        <name>org.zkoss.zk.portlet.PageRenderPatch.class</name>
        <value>org.zkoss.zkplus.liferay.JQueryRenderCachedPatch</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zkplus.liferary.jQueryPatch</name>
        <value>1500</value>
    </library-property>
</zk>
```

`[since 5.0.11]`

- use **NonRootContextJQueryRenderPatch** instead of
  **JQueryRenderCachedPatch** if the home page of Liferay is not under
  the root(/) path

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<zk>
    <library-property>
        <name>org.zkoss.zk.portlet.PageRenderPatch.class</name>
        <value>org.zkoss.zkplus.liferay.NonRootContextJQueryRenderPatch</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zkplus.liferary.jQueryPatch</name>
        <value>1500</value>
    </library-property>
</zk>
```

- liferay-portlet.xml:

add this to the setting
**<header-portlet-javascript>/zkau/web/js/zk.wpd</header-portlet-javascript>**

` [Since 7.0.3]`

- You don't need
  **<header-portlet-javascript>/zkau/web/js/zk.wpd</header-portlet-javascript>**
  setting any more.

``` xml
<liferay-portlet-app>
    <portlet>
        <portlet-name>HelloZK2</portlet-name>
        <!-- don't need this since ZK 7.0.3 -->
        <header-portlet-javascript>/zkau/web/js/zk.wpd</header-portlet-javascript>
    </portlet>
    <role-mapper>
        <role-name>user</role-name>
        <role-link>User</role-link>
    </role-mapper>
    <role-mapper>
        <role-name>power-user</role-name>
        <role-link>Power User</role-link>
    </role-mapper>
    <role-mapper>
        <role-name>administrator</role-name>
        <role-link>Administrator</role-link>
    </role-mapper>
</liferay-portlet-app>
```

- liferay-display.xml

``` xml
<?xml version="1.0"?>
<!DOCTYPE display PUBLIC "-//Liferay//DTD DISPLAY 2.0.0//EN" "http://www.liferay.com/dtd/liferay-display_2_0_0.dtd">

<display>
<category name="category.sample">
    <portlet id="HelloZK2" />
</category>
</display>
```

- liferay-plugin-package.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plugin-package PUBLIC "-//Liferay//DTD Plugin Package 4.3.6//EN" "http://www.liferay.com/dtd/liferay-plugin-package_4_3_0.dtd">
<plugin-package>
    <name>Hello ZK2</name>
    <module-id>/com/demo/test/hellozk2/war</module-id>
    <types>
        <type>portlet</type>
    </types>
    <tags>
        <tag>Hello ZK2</tag>
    </tags>
    <short-description>
        Hello ZK2
 </short-description>
    <change-log>
        Initial Deployment
 </change-log>

    <author>Sam</author>
    <licenses>
        <license osi-approved="true">GPL</license>
    </licenses>
    <liferay-versions>
        <liferay-version>6.0.0+</liferay-version>
        <liferay-version>6.0.0+</liferay-version>
    </liferay-versions>
</plugin-package>
```

- portlet.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<portlet-app version="1.0"
    xmlns="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd http://java.sun.com/xml/ns/portlet/portlet-app_1_0.xsd">
    <portlet>
        <description xml:lang="EN">HelloZK2</description>
        <portlet-name>HelloZK2</portlet-name>
        <display-name xml:lang="EN">HelloZK2</display-name>
        <portlet-class>org.zkoss.zk.ui.http.DHtmlLayoutPortlet</portlet-class>
        <expiration-cache>0</expiration-cache>
        <supports>
            <mime-type>text/html</mime-type>
            <portlet-mode>view</portlet-mode>
        </supports>
        <supported-locale>en</supported-locale>
        <portlet-info>
            <title>HelloZK2 Portlet</title>
            <short-title>HelloZK2</short-title>
            <keywords>zk2</keywords>
        </portlet-info>
        <portlet-preferences>
            <preference>
                <name>zk_page</name>
                <value>/hello.zul</value>
            </preference>
        </portlet-preferences>
        <security-role-ref>
            <role-name>power-user</role-name>
        </security-role-ref>
        <security-role-ref>
            <role-name>user</role-name>
        </security-role-ref>
        <security-role-ref>
            <role-name>administrator</role-name>
        </security-role-ref>
    </portlet>
</portlet-app>
```

Please download the following war file to view this example in detail

**Download**
[DEPLOY_TO\_\_HelloZK2.war](https://sourceforge.net/projects/zkforge/files/Small%20Talks/How%20to%20Install%20ZK%20on%20Liferay/DEPLOY_TO__HelloZK2.war/download)

## See also

<http://devenphillips.blogspot.com/2009/04/developing-liferay-portlets-with-zk.html>

[ZK 5 / Liferay Integration - jquery
conflict](http://www.zkoss.org/forum/listComment/11051)


