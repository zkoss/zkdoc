**Syntax:**

<web-app-class>*`a_class_name`*</web-app-class>

`[Default: `<javadoc>`org.zkoss.zk.ui.http.SimpleWebApp`</javadoc>`]`

It specifies which class is used to implement the Web application. The
class must have a default constructor (without any argument), and
implement both the
<javadoc type="interface">org.zkoss.zk.ui.WebApp</javadoc> and
<javadoc type="interface">org.zkoss.zk.ui.sys.WebAppCtrl</javadoc>
interfaces. Instead of implementing from scratch, you can extend it from
the <javadoc>org.zkoss.zk.ui.impl.AbstractWebApp</javadoc> or
<javadoc>org.zkoss.zk.ui.http.SimpleWebApp</javadoc> classes.

``` xml
<system-config>
  <web-app-class>foo.MyKillerApp</web-app-class>
</system-config>
```

Alternatively, you could use [the web-app-factory-class
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_web-app-factory-class_Element)
instead. Notice, if both specified, [the web-app-factory-class
element](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_web-app-factory-class_Element)
has the higher priority.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
