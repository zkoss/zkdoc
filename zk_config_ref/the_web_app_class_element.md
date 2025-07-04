**Syntax:**

```xml
<web-app-class>a_class_name</web-app-class>
```

`[Default: `org.zkoss.zk.ui.http.SimpleWebApp`]`

It specifies which class is used to implement the Web application. The
class must have a default constructor (without any argument), and
implement both the
[org.zkoss.zk.ui.WebApp](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html) and
[org.zkoss.zk.ui.sys.WebAppCtrl](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/WebAppCtrl.html)
interfaces. Instead of implementing from scratch, you can extend it from
the `org.zkoss.zk.ui.impl.AbstractWebApp` or
`org.zkoss.zk.ui.http.SimpleWebApp` classes.

```xml
<system-config>
  <web-app-class>foo.MyKillerApp</web-app-class>
</system-config>
```

Alternatively, you could use [the web-app-factory-class element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_web-app-factory-class_Element)
instead. Notice, if both specified, [the web-app-factory-class element]({{site.baseUrl}}/zk_config_ref/The_system-config_Element/The_web-app-factory-class_Element)
has the higher priority.


