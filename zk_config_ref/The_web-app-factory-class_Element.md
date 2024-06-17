**Syntax:**

<web-app-factory-class>*`a_class_name`*</web-app-factory-class>

`[Default: none (and `<javadoc>`org.zkoss.zk.ui.http.SimpleWebApp`</javadoc>` is used)]`

It specifies which class is used to instantiate the instance of the
implementation of the Web application. The class must have a default
constructor (without any argument), and implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.WebAppFactory</javadoc>
interface.

``` xml
<system-config>
  <web-app-factory-class>foo.MyKillerAppFactory</web-app-factory-class>
</system-config>
```

Alternatively, you could use [the web-app-class
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_web-app-class_Element)
instead. Notice, if both specified, [the web-app-factory-class
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_web-app-factory-class_Element)
has the higher priority.

# Version History

| Version | Date           | Content                     |
|---------|----------------|-----------------------------|
| 6.0.0   | September 2011 | This feature was introduced |
