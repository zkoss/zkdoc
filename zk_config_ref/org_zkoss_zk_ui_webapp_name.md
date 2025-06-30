**Preference:**

`org.zkoss.zk.ui.WebApp.name`

Default: `ZK`

It specifies the application name. It is the return value of
[org.zkoss.zk.ui.WebApp#getAppName()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getAppName()).
It also determins the default title of
[Messagebox]({{site.baseurl}}/zk_component_ref/supporting_classes/messagebox)
and build-in warning/error dialogs e.g. file upload size exceeding
error.

For example,

```xml
<!-- in WEB-INF/zk.xml -->
<preference>
    <name>org.zkoss.zk.ui.WebApp.name</name>
    <value>My Killer Application</value>
</preference>
```

In addition, you could change the application's name in Java by invoking
[org.zkoss.zk.ui.WebApp#setAppName(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#setAppName(java.lang.String)).

# Version History

| Version | Date           | Content    |
|---------|----------------|------------|
| 5.0.6   | Feburary, 2011 | Introduced |
