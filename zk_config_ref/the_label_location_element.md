---
title: "The label-location Element"
description: "The label-location Element: It specifies the location of the properties file for the internationalization labels."
---

**Syntax:**

```xml
<label-location>a_uri</label-location>
```

[Default: `/WEB-INF/zk-label.properties`]
{% include supported-since.html version="5.0.7" %}

It specifies the location of the properties file for [the internationalization labels]({{site.baseurl}}/zk_dev_ref/internationalization/labels).
If you have multiple properties files, you could specify them one by
one. For example,

```xml
<system-config>
    <label-location>/WEB-INF/labels/order.properties</label-location>
    <label-location>/WEB-INF/labels/invoice.properties</label-location>
</system-config>
```

Notice that, once specified, `WEB-INF/zk-labels.properties` is ignored.
In other words, ZK loads only the files specified in the label-location
element. If you still want to load it, you have to specify it in
`WEB-INF/zk.xml` too.

```xml
<system-config>
    <label-location>/WEB-INF/zk-label.properties</label-location><!-- if you still need zk-label.properties -->
    <label-location>/WEB-INF/labels/order.properties</label-location>
    <label-location>/WEB-INF/labels/invoice.properties</label-location>
</system-config>
```

# Classpath Label Resources

{% include supported-since.html version="11.0.0" %}

Use the `~./` prefix to load a label bundle from the classpath's `/web` directory. This is useful for JAR-packaged applications and addons. For example, place the default file at `src/main/resources/web/labels/messages.properties` and configure:

```xml
<system-config>
    <label-location>~./labels/messages.properties</label-location>
</system-config>
```

Locale-specific variants, such as `messages_zh_TW.properties`, belong beside the default file and follow the normal label-bundle lookup rules. The same prefix is supported by the [org.zkoss.util.label.web.location]({{site.baseurl}}/zk_config_ref/org_zkoss_util_label_web_location) library property.

Files under the classpath's `/web` directory are public web resources. Keep confidential values outside this directory; `/WEB-INF` remains suitable for label files that must not be downloadable.
