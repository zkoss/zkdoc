**Syntax:**

```xml
<web-app-factory-class>a_class_name</web-app-factory-class>
```

`[Default: none (and `org.zkoss.zk.ui.http.SimpleWebApp` is used)]`

It specifies which class is used to instantiate the instance of the
implementation of the Web application. The class must have a default
constructor (without any argument), and implement the
[org.zkoss.zk.ui.sys.WebAppFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/WebAppFactory.html)
interface.

```xml
<system-config>
  <web-app-factory-class>foo.MyKillerAppFactory</web-app-factory-class>
</system-config>
```

Alternatively, you could use [the web-app-class element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_web-app-class_Element)
instead. Notice, if both specified, [the web-app-factory-class element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_web-app-factory-class_Element)
has the higher priority.

# Version History

| Version | Date           | Content                     |
|---------|----------------|-----------------------------|
| 6.0.0   | September 2011 | This feature was introduced |
