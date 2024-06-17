\_\_TOC\_\_

Here is a list of supported library properties that ZK supports. There
are several different scopes you can configure for a library property.
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
[
zk.xml](ZK_Configuration_Reference/zk.xml/The_library-property_Element).

For example,

**Single value**

``` xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```

**Multiple values**

``` xml
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

``` xml
<custom-attributes org.zkoss.zul.listbox.rod="false"/>

<listbox id="box1">
</listbox>

<listbox id="box2">
</listbox>
```

# Component Scope

Notice that **not all properties support this scope**, please check each
property's page. Put <custom-attributes> under a specific component:

``` xml

<listbox>
    <custom-attributes org.zkoss.zul.listbox.rod="false"/>
    ...
</listbox>
```
