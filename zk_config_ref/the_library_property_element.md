---
title: "The library-property Element"
description: "The library-property Element: Species a library-level property with the library-property element."
---

**Syntax:**

```xml
<library-property>  
    <name>any name</name>  
    <value>any value</value>  
</library-property>
```

Species a library-level property with the `library-property` element.

The same element is accepted in both `WEB-INF/zk.xml` and a JAR's
`metainfo/zk/config.xml`, with identical syntax in either file. Please refer to
[zk.xml]({{site.baseurl}}/zk_config_ref/zk_xml) and
[JAR File's config.xml]({{site.baseurl}}/zk_config_ref/jar_files_config_xml)
for more information.

**Multiple values**

Use `<list>` in place of `<value>` to assign several values to one property. Specifying
both `<value>` and `<list>` in the same element is an error.

```xml
<library-property>
    <name>org.zkoss.bind.proxy.IgnoredProxyClasses</name>
    <appendable>true</appendable>
    <list>
        <value>java.util.Date</value>
        <value>java.sql.Date</value>
        <value>java.sql.Timestamp</value>
        <value>java.math.BigDecimal</value>
        <value>java.math.BigInteger</value>
    </list>
</library-property>
```

`<appendable>` is optional and defaults to `false`, which replaces whatever value the
property already has. Set it to `true` to append to the existing value(s) instead. It
applies to both the `<value>` and the `<list>` form.

For a complete list of available library properties, please refer to
[the Library Properties section]({{site.baseurl}}/zk_config_ref/the_library_properties).
