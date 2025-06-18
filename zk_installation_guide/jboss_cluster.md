# Before You Start

You have to configure the following setting for
[Web](#web.xml) and [JBoss](#jboss-web.xml).

## web.xml

- According to JBoss' tutorial, it is required to add the following
  settings in `WEB-INF/web.xml` if you are doing clustering in JBoss.

```xml
<?xml version="1.0"?>
<web-app  xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
    version="2.5">
    
    <distributable/>

</web-app>
```

## jboss-web.xml

- Create `jboss-web.xml` file under under XXX/WEB-INF folder(XXX is like
  **ZKsandbox** in the war file) if *fileupload* component is used in
  your app.

For example,

```xml
<jboss-web>
    <context-root>warFileName</context-root> <!-- context-root should be the same with war file name -->    
    <replication-config>
        <cache-name>standard-session-cache</cache-name>
        <replication-trigger>SET_AND_GET</replication-trigger>
        <replication-granularity>SESSION</replication-granularity>
        <replication-field-batch-mode>true</replication-field-batch-mode>
        <use-jk>true</use-jk>
        <max-unreplicated-interval>30</max-unreplicated-interval>
        <snapshot-mode>INSTANT</snapshot-mode>
        <snapshot-interval>1000</snapshot-interval>
    </replication-config>
    <max-active-sessions>5</max-active-sessions>
    <passivation-config>
        <use-session-passivation>true</use-session-passivation>
        <passivation-min-idle-time>60</passivation-min-idle-time>
        <passivation-max-idle-time>600</passivation-max-idle-time>
    </passivation-config>
</jboss-web>
```

# Setting up JBoss 5.1.0 Clusters with Apache Load Balance

After you have done the settings above, please follow JBoss' official
document to set up a JBoss Clustered Server
[here](http://docs.jboss.org/jbossclustering/cluster_guide/5.1/html-single/index.html).

# Version History
