

In this section we describe how to configure the logging of ZK internal
functions. You can generally ignore it, unless you'd like to know how ZK
operates internally.

Notice that, if you are using Google App Engine, you can *not* configure
the logging as described in this chapter. For more information, please
refer to [Setting up Google App
Engine](ZK_Installation_Guide/Setting_up_Servers/Google_App_Engine).

# How to Configure Logging

ZK uses [SLF4J](http://www.slf4j.org/) as its internal logging system,
and developers can follow the [SLF4J
document](http://www.slf4j.org/manual.html) to use the logging in ZK.

By default, ZK maven setting will bundle the **slf4j-jdk14**
implementation as its default logging.[^1] If developers want to change
that implementation for **Log4j**, **Simple**, or **Logback**, they have
to exclude the dependency first like:

``` xml
<dependency>
    <groupId>org.zkoss.common</groupId>
    <artifactId>zcommon</artifactId>
    <version>${zk.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-jdk14</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

ZK maven dropped the transitive dependency of **slf4j-jdk14**. If a
developer decides to enable logging, include either **Log4j**,
**Simple**, or **Logback** implementation in their maven pom.xml file,
e.g.

``` xml
<dependency> 
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>${logback.version}</version>
</dependency>
```

ZK uses [the standard
logger](http://docs.oracle.com/javase/1.4.2/docs/guide/util/logging/overview.html)
to log messages. You could control what to log by configuring the
logging of the Web server you are using. The configuration usually
varies from one server to another. However, you could use the
configuration mechanism provided by ZK as described in this section. It
shall work with most Web servers.

There are basically two steps to configure the standard logger with ZK's
configuration mechanism:

1.  Prepare a logging configuration file
2.  Specify the configuration file in a library property

## Prepare a logging configuration file

A logging configuration file is a standard properties file. Each line is
a key-value pair in the following format:

``` xml
''a.package.or.a.class'' = ''level''
```

Here is an example of a configuration file.

``` xml
 org.zkoss.zk.ui.impl.UiEngineImpl=FINER
    #Make the log level of the specified class to FINER
 org.zkoss.zk.ui.http=DEBUG
    #Make the log level of the specified package to DEBUG
 org.zkoss.zk.ui=OFF
    #Turn off the log for the specified package
 org.zkoss=WARNING
    #Make all log levels of ZK classes to WARNING except those specified here
```

### Allowed Levels

<table>
<thead>
<tr class="header">
<th><center>
<p>Level</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>OFF</p>
</center></td>
<td><p>Indicates no message at all.</p></td>
</tr>
<tr class="even">
<td><center>
<p>ERROR | SEVERE</p>
</center></td>
<td><p>Indicates providing error messages.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>WARNING</p>
</center></td>
<td><p>Indicates providing warning messages. It also implies
ERROR.</p></td>
</tr>
<tr class="even">
<td><center>
<p>INFO</p>
</center></td>
<td><p>Indicates providing informational messages. It also implies ERROR
and WARNING.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>DEBUG | FINE</p>
</center></td>
<td><p>Indicates providing tracing information for debugging purpose. It
also implies ERROR, WARNING and INFO.</p></td>
</tr>
<tr class="even">
<td><center>
<p>FINER</p>
</center></td>
<td><p>Indicates providing fairly detailed tracing information for
debugging purpose. It also implies ERROR, WARNING, INFO and
DEBUG</p></td>
</tr>
</tbody>
</table>

### Specify the handler for Jetty and servers that don't turn on the standard logger

Some Web servers, such as Jetty, don't turn on the standard logger by
default. Thus, in the logging configuration file, you have to configure
the handler too. For example, you can turn on the
`java.util.logging.ConsoleHandler` to write the logs to the console by
adding the following lines to the logging configuration file:

``` xml
handlers = java.util.logging.ConsoleHandler

java.util.logging.ConsoleHandler.level = FINER
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter
```

Here is another example that configures the console and a file to be the
target of the logs:

``` xml
handlers = java.util.logging.FileHandler, java.util.logging.ConsoleHandler

java.util.logging.ConsoleHandler.level = FINER
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter

java.util.logging.FileHandler.formatter = java.util.logging.SimpleFormatter
java.util.logging.FileHandler.pattern = /var/log/jetty6/solr-%u.log
java.util.logging.FileHandler.level = FINER

org.zkoss.zk.ui.impl.UiEngineImpl=FINER
org.zkoss.bind=FINE
```

## Specify the configuration file in a library property

To let ZK load the logging configuration file, you have to specify in a
library property called
[org.zkoss.util.logging.config.file](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.util.logging.config.file).
For example,

``` xml
<library-property>
    <name>org.zkoss.util.logging.config.file</name>
    <value>conf/zk-log.properties</value>
</library-property>
```

If a relative path is specified, it will look for the classpath first.
If not found, it will assume it is related to the current directory,
i.e., the directory specified in the system property called `user.dir`.

You could specify an absolute path, such as
`/usr/jetty/conf/zk-log.properties`, if you are not sure what the
current directory is.

<references/>

# Disable All Logs

If you want to disable all loggers completely or change the level for
all loggers, you don't need to prepare a logging configuration file.
Rather, you can configure
<javadoc>org.zkoss.zk.ui.http.DHtmlLayoutServlet</javadoc> in
`WEB-INF/web.xml` as follows.

``` xml
<servlet>
    <servlet-name>zkLoader</servlet-name>
    <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>
    <init-param>
        <param-name>log-level</param-name>
        <param-value>OFF</param-value>
    </init-param>
</servlet>
```

For more information, please refer to [ZK Configuration
Reference](ZK_Configuration_Reference/web.xml/ZK_Loader).

# How to Log

Class: <javadoc>org.zkoss.util.logging.Log</javadoc>

The logger used by ZK is based on the standard logger,
`java.util.logging.Logger`. However, we wrap it as
<javadoc>org.zkoss.util.logging.Log</javadoc> to make it more efficient.

> ------------------------------------------------------------------------
>
> To log the message to the client rather than the console at the
> server, you could use
> <javadoc method="log(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>

The typical use is as follows.

``` java
 import org.zkoss.util.logging.Log;
 class MyClass {
     private static final Log log = Log.lookup(MyClass.class);
     public void f(Object v) {
         if (log.debugable()) log.debug("Value is "+v);
     }
 }
```

# Reference

- [Apache Log4j Security
  Vulnerabilities](https://logging.apache.org/log4j/2.x/security.html)

# Version History

| Version | Date          | Content                    |
|---------|---------------|----------------------------|
| 6.0.0   | February 2012 | LogService was deprecated. |

[^1]: <https://docs.oracle.com/cd/E19717-01/819-7753/gcbkm/index.html>
