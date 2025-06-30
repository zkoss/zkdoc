**Property:**

`org.zkoss.zk.ui.macro.autowire.convention`

Default:  `false`

By default, the macro component will wire the UI components to the data
member automatically based on CSS selectors, as described in [ZK Developer's Reference: Wire Components]({{site.baseurl}}/zk_dev_ref/mvc/controller/wire_components).

If you prefer to wire by the name convention (as
`org.zkoss.zk.ui.GenericAutowireComposer` does), you
can specify this library to `true` as follows. Notice that
wiring-by-name-convention is the default approach taken by ZK 5.

```xml
<library-property>
    <name>org.zkoss.zk.ui.macro.autowire.convention</name>
        <value>true</value>
</library-property>
```

# Version History

| Version | Date          | Content                               |
|---------|---------------|---------------------------------------|
| 6.0.0   | February 2012 | This library property was introduced. |
