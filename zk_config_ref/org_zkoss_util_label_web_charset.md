---
title: "org.zkoss.util.label.web.charset"
---

**Property:**

`org.zkoss.util.label.web.charset`

`Default: UTF-8`

It defines the charset used to encode zk-label.properties if the file is
located in a Web application (i.e., `WEB-INF/zk-label*.properties`).
Notice that all properties specified in [the label-location element]({{site.baseurl}}/zk_config_ref/the_label_location_element)
must be encoded in the same encoding as specified here.

To define the charset for zk-label.properties located in classpath
(i.e., part of a JAR file), please refer to [the org.zkoss.util.label.classpath.charset property]({{site.baseurl}}/zk_config_ref/org_zkoss_util_label_classpath_charset).

Please refer to [ZK Developer's Reference: Internationalization]({{site.baseurl}}/zk_dev_ref/internationalization/labels)
for more information about zk-label.properties.
