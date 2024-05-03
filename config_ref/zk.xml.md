\_\_TOC\_\_

`WEB-INF/zk.xml` is the configuration descriptor of ZK. This file is
optional. If you want to configure ZK differently from the default, you
need to provide a file called `zk.xml` under the `WEB-INF` directory.

The root element must be <zk>. Then, you could specify any combination
of the following elements under the root element.

# File Location

You can place zk.xml in either a WAR file or a JAR file.

## WEB-INF/zk.xml

`zk.xml` is usually packed with a Web application and it should be
located under `WEB-INF`.

## metainfo/zk/zk.xml

For library providers, `zk.xml` is better to pack with a JAR file. This
can be done by placing zk.xml in the `metainfo/zk` directory
identifiable by the classpath (i.e., in a JAR file).

## Additional Configuration File

In addition, you could specify an additional configuration file in a
library or system property called `org.zkoss.zk.config.path`. It is
useful if some of the configuration can not be part of the WAR file
(such as depending on the deployment environment). For more information,
please refer to [this
section](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zk.config.path).

Notice that `zk.xml` found in the classpath is parsed first, then
`WEB-INF/zk.xml`, and finally the additional configuration file. It
means the additional configuration file, if any, has the highest
priority, and `WEB-INF/zk.xml` (since the later will overrides the
previous one if conflicts).

# XML Schema Definition

You could specify the XML schema in the zk.xml as shown below. Many XML
editors works better, such as when with auto-complete, if XML schema is
specified correctly.

``` xml
<zk xmlns="http://www.zkoss.org/2005/zk/config"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.zkoss.org/2005/zk/config http://www.zkoss.org/2005/zk/config/zk.xsd">
```

The ZK schema can be downloaded from
[<http://www.zkoss.org/2005/zk/config/zk.xsd>](http://www.zkoss.org/2005/zk/config/zk.xsd).
In addition, you can find `zk.xsd` under the `dist/xsd` directory in the
[ZK binary
distribution](https://www.zkoss.org/wiki/ZK_Installation_Guide/ZK_Background/The_Content_of_ZK_Binary_Distribution).
