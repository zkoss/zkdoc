---
title: "org.zkoss.util.logging.config.file"
---

**Property:**

`org.zkoss.util.logging.config.file`
{% include global-scope-only.html %}
Default: `none`  
{% include version-badge.html version="6.0.0" %}

It specifies the logging configuration file which is used to configure
the logging of ZK internal functions. You generally don't need it unless
you'd like to know how ZK operates internally. For more information,
please refer to [ZK Developer's Reference: Logger]({{site.baseurl}}/zk_dev_ref/supporting_utilities/logger).

For example,

```xml
<library-property>
    <name>org.zkoss.util.logging.config.file</name>
    <value>conf/zk-log.properties</value>
</library-property>
```

ZK looks for the configuration file with the order below:

1.  in the class path
2.  If the path is relative, it will assume it is relatuve to the
    directory specified in the system property called `user.dir`.
      
    If the path is absolute, ZK looks from the system root.

You could specify an absolute path, such as
`/usr/jetty/conf/zk-log.properties`, if you are not sure what the
current directory is.
