**Preference:**

`org.zkoss.zk.ui.WebApp.name`

`Default: ``ZK`

It specifies the application name. It is the return value of
<javadoc method="getAppName()" type="interface">org.zkoss.zk.ui.WebApp</javadoc>.
It also determins the default title of
[Messagebox](ZK_Component_Reference/Supporting_Classes/Messagebox)
and build-in warning/error dialogs e.g. file upload size exceeding
error.

For example,

``` xml
<!-- in WEB-INF/zk.xml -->
<preference>
    <name>org.zkoss.zk.ui.WebApp.name</name>
    <value>My Killer Application</value>
</preference>
```

In addition, you could change the application's name in Java by invoking
<javadoc method="setAppName(java.lang.String)" type="interface">org.zkoss.zk.ui.WebApp</javadoc>.

# Version History

| Version | Date           | Content    |
|---------|----------------|------------|
| 5.0.6   | Feburary, 2011 | Introduced |
