\_\_TOC\_\_

There are several settings below we recommend you to specify during
development time that can improve your developer experience. They can
show you more debugging information and disable various caches to get
the latest change without restarting a server.

# Disable Browser Cache

Since you change pages and codes frequently during development, in order
to see the latest change, it's better to disable the browser cache.

# Separate zk.xml for Development

Put these development-time settings in a separate file, so that you can
easily remove it for production in the future.

**zk.xml**

``` xml
    <library-property>
        <name>org.zkoss.zk.config.path</name>
        <value>/WEB-INF/zk-dev.xml</value>
    </library-property>
```

**zk-dev.xml**

``` xml
    <system-config>
        <disable-zscript>false</disable-zscript>
    </system-config>
    <!-- show debug information -->
    <client-config>
        <debug-js>true</debug-js>
    </client-config>
    <library-property>
        <name>org.zkoss.zk.ui.versionInfo.enabled</name>
        <value>true</value>
    </library-property>
    <!-- disable various caches -->
    <library-property>
        <name>org.zkoss.zk.ZUML.cache </name>
        <value>false</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zk.WPD.cache</name>
        <value>false</value>
    </library-property>
    <library-property>
        <name>org.zkoss.zk.WCS.cache</name>
        <value>false</value>
    </library-property>
    <library-property>
        <name>org.zkoss.web.classWebResource.cache</name>
        <value>false</value>
    </library-property>
    <library-property>
        <name>org.zkoss.util.label.cache</name>
        <value>false</value>
    </library-property>
```

# Reloading Modified Java Class without Restarting a Server

Running your application with
[TravaOpenJDK11](https://github.com/TravaOpenJDK/trava-jdk-11-dcevm)
with hot-swap supported JDK can achieve it. Run it with JVM option
`-XX:HotswapAgent`. When you modify your java code, re-compile it, the
JDK can automatically reload(hot-swap) the new class file that saves the
time of restarting an application server.

# Use a Server without Packaging and Deploying WAR

Configure [Jetty maven
plugin](https://wiki.eclipse.org/Jetty/Feature/Jetty_Maven_Plugin) in a
`pom.xml` can start your project in a few seconds which speeds up the
iteration of writing code and testing.

\<syntaxhighlight lang='xml\> <build>

`   `<plugins>  
`       `  
`       `<plugin>  
`           `<groupId>`org.eclipse.jetty`</groupId>  
`           `<artifactId>`jetty-maven-plugin`</artifactId>  
`           `<version>`9.4.27.v20200227`</version>  
`       `</plugin>  
`   `</plugins>

</build>

</syntaxhighlight>

# Spring Boot

With Spring Boot, please reference [this development
config](https://github.com/zkoss/zkspringboot/blob/master/zkspringboot-demos/zkspringboot-demo-jar/src/main/java/org/zkoss/zkspringboot/demo/DevelopmentConfig.java).
