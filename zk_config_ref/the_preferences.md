Here is a list of supported preferences that ZK recognizes.

To define a preference, you can configure it in `WEB-INF/zk.xml`[^1].
The preferences are similar to the library properties: they are
application-specific name/value pairs. You could use them to configure
your application and ZK engine. However, unlike the library properties,
preferences are stored in
`org.zkoss.zk.ui.util.Configuration` and can be
retrieved by use of
[org.zkoss.zk.ui.util.Configuration#getPreference(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Configuration.html#getPreference(java.lang.String, java.lang.String)).

For example,

```xml
<preference>
    <name>org.zkoss.zk.ui.WebApp.name</name>
    <value>My Killer Application</value>
</preference>
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For more information, please refer to [ The preference Element]({{site.baseurl}}/zk_config_ref/the_preference_element).
