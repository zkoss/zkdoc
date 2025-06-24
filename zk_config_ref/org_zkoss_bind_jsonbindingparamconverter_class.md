**Property:**

`org.zkoss.bind.jsonBindingParamConverter.class`

`Default: org.zkoss.zkmax.bind.JacksonConverter ( JavaDoc: `org.zkoss.zkmax.bind.JacksonConverter`)`

`Default: org.zkoss.zkmax.bind.GsonConverter (JavaDoc: `org.zkoss.zkmax.bind.GsonConverter`)`

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
