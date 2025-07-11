# Prepare the server

## Install Tomcat

First, you have to prepare a Web server. You can use any Web servers
that support Java Servlet (2.3 or later). Here we introduce the
installation of [Tomcat](http://tomcat.apache.org). For other servers
and more information, please refer to [Setting up Servers](setting_up_servers).

1.  Visit [Tomcat Official Site](http://tomcat.apache.org/)
2.  Select the correct binary distribution for your environment and
    download
    - For Windows, you might download and execute [32-bit/64-bit Windows Service Installer](http://apache.stu.edu.tw//tomcat/tomcat-6/v6.0.29/bin/apache-tomcat-6.0.29.exe),
      and then follow the instructions
    - For any download/installation problems, please refer to
      <http://tomcat.apache.org/tomcat-6.0-doc/index.html>

## Download ZK Libraries

ZK libraries can be downloaded from [ZK Download](http://www.zkoss.org/download/zk.dsp) and then save it to a
proper location.

# Create your first application

Here shows you how to create a web application manually without IDE or
other tools.

## Create Web application

ZK Web Applications use a standard directory structure defined in the
Servlet specification.

When developing ZK web applications, you must follow this structure so
that the application can be deployed in any J2EE compliant web servers.

*All you need to do is create a web application directory with related
files.* ![](images/J2EEWebApplication.jpg)

- Now i create one for example named
  <span style="color:green">**myZK**</span>

### Install Library Distribution

1.  Unzip zk-bin-x.x.x.zip (the *x.x.x* is the latest version)
2.  Copy JAR files under following list to <u>**myZK**/WEB-INF/lib</u>
    :\* {YOUR_ZK_UNZIP_FOLDER}/dist/lib

    :\* {YOUR_ZK_UNZIP_FOLDER}/dist/lib/ext

    :\* {YOUR_ZK_UNZIP_FOLDER}/dist/lib/zkforge

### Create Deployment Descriptor(Web.xml)

<u>web.xml</u> is called the web application deployment descriptor. This
is an XML file that defines servlets, servlet mappings, listeners,
filters, welcome files etc.

The deployment descriptor is a heart of any J2EE web applications, so
*every web application **must have** a web.xml deployment descriptor
directly under <u>WEB-INF</u> folder*.

- For the content of <u>web.xml</u>, please refer to [Sample of web.xml for Servlet 3.0](sample_of_web_xml_for_servlet_3_0),
  [Sample of web.xml for Servlet 2.4](sample_of_web_xml_for_servlet_2_4)
  or [Sample of web.xml for Servlet 2.3](sample_of_web_xml_for_servlet_2_3),
  depending on your Web server support.

### Create First ZUL file

Here is a simple zul file named **hello.zul**.

```xml
 <window title="My First ZK Application" border="normal">
    Hello World!
 </window>
```

### Pack your project

1.  Compress the **myZK** directory(e.g. **myZK.zip**)
2.  Rename **myZK.zip** to **myZK.war**
3.  Done!!

## Confirm your ZK Web Archive (WAR) file

     myZK.war
     ¦  hello.zul
     ¦  
     - WEB-INF
         ¦  web.xml
         ¦  
         - lib
              *.jar

## Run your ZK WAR file (Deploy to Tomcat)

To run the application in Tomcat you have to copy the myZK.war into the
folder TOMCAT_DIR/webapps/. Then start the application server using
TOMCAT_DIR/bin/startup.bat (or startup.sh on linux). For additional
information please check the [Tomcat deployment documentation](http://tomcat.apache.org/tomcat-6.0-doc/deployer-howto.html).

After Tomcat is started the application should be available under
(assuming the default tomcat configuration):

<http://localhost:8080/myZK/hello.zul>


