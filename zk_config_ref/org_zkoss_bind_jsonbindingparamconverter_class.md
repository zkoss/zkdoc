---
title: "org.zkoss.bind.jsonBindingParamConverter.class"
---

**Property:**

`org.zkoss.bind.jsonBindingParamConverter.class`
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

{% include version-badge.html version="8.0.0" %} `Default: org.zkoss.zkmax.bind.JacksonConverter` [org.zkoss.zkmax.bind.JacksonConverter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/bind/JacksonConverter.html)

{% include version-badge.html version="8.5.1" %} `Default: org.zkoss.zkmax.bind.GsonConverter` [org.zkoss.zkmax.bind.GsonConverter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/bind/GsonConverter.html)

It specifies the name of the class used to provide the default JSON
converter for ZK Bind command. The class must implement the
[org.zkoss.bind.Converter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/bind/Converter.html) interface.

You can implement your own JSON converter for non-EE version or use the
built-in converter in EE version. In EE version, you can switch the
implementation of the json converter in zk.xml

```xml
<library-property>
    <name>org.zkoss.bind.jsonBindingParamConverter.class</name>
    <value>org.zkoss.zkmax.bind.GsonConverter</value>
</library-property>
```
