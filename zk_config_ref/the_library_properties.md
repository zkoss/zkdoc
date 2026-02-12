---
title: "The Library Properties"
---



Here is a list of supported library properties that ZK supports. There  are several different scopes you can configure for a library property.

# One Instance per class loader
ZK stores library properties in a static object, so there is only one instance of a library property per class loader. If you have multiple web applications running in the same web server, they will share the same library property if they are using the same class loader. Therefore, if you want to set a library property that only supports **application scope**, it will also affect other ZK applications. Only those properties that support **page** and **component** scope that don't affect others.

# Affected Scope
All properties support **system/application** scope, but some properties
support **page/component** scope. Please check each property's page to
know its supported scope.


# System Scope

If you define a library property as a system property within the
configuration file of your web server, though the system property
affects the whole system, not just one web application.

# Application Scope

To make a library property effective for the whole application,
configure it in `WEB-INF/zk.xml`. For more information, please refer to
[ zk.xml]({{site.baseurl}}/zk_config_ref/the_library_property_element).

For example,

**Single value**

```xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```

**Multiple values**

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

# Page scope

Notice that **not all properties support this scope**, please check each
property's page. Put <custom-attributes> in a zul out of any component:

```xml
<custom-attributes org.zkoss.zul.listbox.rod="false"/>

<listbox id="box1">
</listbox>

<listbox id="box2">
</listbox>
```

# Component Scope

Notice that **not all properties support this scope**, please check each
property's page. Put <custom-attributes> under a specific component:

```xml

<listbox>
    <custom-attributes org.zkoss.zul.listbox.rod="false"/>
    ...
</listbox>
```
