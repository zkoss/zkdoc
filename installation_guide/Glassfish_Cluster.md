# Setup Glassfish Cluster environment

Refer to this
[blog](http://weblogs.java.net/blog/amyroh/archive/2012/02/15/running-glassfish-312-apache-http-server)
to set up glassfish cluster environment.

# Additional setting in ZK project

You have to configure the following settings to make ZK project work in
glassfish cluster environment.

## web.xml

- Add the `distributable` element in `WEB-INF/web.xml`.

``` xml
<?xml version="1.0"?>
<web-app  xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
    version="2.5">
    
    <distributable/>

</web-app>
```

## sun-web.xml

- Create `sun-web.xml` under projectName/WEB-INF folder to replicate
  session between cluster nodes.

For example,

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sun-web-app PUBLIC "-//Sun Microsystems, Inc.//DTD GlassFish Application Server 3.0 Servlet 3.0//EN" 
        "http://www.sun.com/software/appserver/dtds/sun-web-app_3_0-0.dtd">
<sun-web-app>
    <context-root>projectName</context-root>
    <session-config>
        <session-manager persistence-type="replicated">
            <manager-properties>
                <property name="persitencerequency" value="web-method" />
            </manager-properties>
            <store-properties>
                <property name="persistenceScope" value="session" />
            </store-properties>
        </session-manager>
    </session-config>
</sun-web-app>
```

# Version History
