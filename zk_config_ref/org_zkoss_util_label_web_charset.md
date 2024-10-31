**Property:**

`org.zkoss.util.label.web.charset`

`Default: UTF-8`

It defines the charset used to encode zk-label.properties if the file is
located in a Web application (i.e., `WEB-INF/zk-label*.properties`).
Notice that all properties specified in [the label-location
element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_label-location_Element)
must be encoded in the same encoding as specified here.

To define the charset for zk-label.properties located in classpath
(i.e., part of a JAR file), please refer to [the
org.zkoss.util.label.classpath.charset
property]({{site.baseUrl}}/zk_config_ref/The_Library_Properties/org.zkoss.util.label.classpath.charset).

Please refer to [ZK Developer's Reference:
Internationalization](ZK_Developer's_Reference/Internationalization/Labels)
for more information about zk-label.properties.
