---
title: "org.zkoss.zk.ui.jsonServiceParamConverter.class"
---

**Property:**

`org.zkoss.zk.ui.jsonServiceParamConverter.class`

Default: [`org.zkoss.zkmax.ui.JacksonConverter`](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/JacksonConverter.html)` `

Default: [`org.zkoss.zkmax.ui.GsonConverter`](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/GsonConverter.html)

It specifies the name of the class used to provide the default JSON
converter for service command. The class must implement the
[org.zkoss.util.Converter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Converter.html) interface.

You can implement your own JSON converter for non-EE version or use the
built-in converter in EE version. In EE version, you can switch the
implementation of the json converter in zk.xml

```xml 
<library-property>
    <name>org.zkoss.zk.ui.jsonServiceParamConverter.class</name>  
    <value>org.zkoss.zkmax.ui.GsonConverter</value>
</library-property>
```

