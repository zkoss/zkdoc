Here is a list of supported preferences that ZK recognizes.

To define a preference, you can configure it in `WEB-INF/zk.xml`[^1].
The preferences are similar to the library properties: they are
application-specific name/value pairs. You could use them to configure
your application and ZK engine. However, unlike the library properties,
preferences are stored in
`org.zkoss.zk.ui.util.Configuration` and can be
retrieved by use of
<javadoc method="getPreference(java.lang.String, java.lang.String)">org.zkoss.zk.ui.util.Configuration</javadoc>.

For example,

``` xml
<preference>
    <name>org.zkoss.zk.ui.WebApp.name</name>
    <value>My Killer Application</value>
</preference>
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For more information, please refer to [ The preference
    Element](ZK_Configuration_Reference/zk.xml/The_preference_Element).
