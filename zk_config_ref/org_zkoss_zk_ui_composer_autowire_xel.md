**Property:**

`org.zkoss.zk.ui.composer.autowire.xel`

Default: true` (it is default to `false` in 6.0)`

It specifies whether
`org.zkoss.zk.ui.util.GenericAutowireComposer` (and
`org.zkoss.zk.ui.util.GenericForwardComposer`) should
wire the variables defined in variable resolvers (XEL, see also [the variable-resolver directive](zuml_ref/ZUML/Processing_Instructions/variable-resolver)).

For example, You could specify this library variable as follows to turn
it off.

```xml
<!-- in WEB-INF/zk.xml -->
    <library-property>
        <name>org.zkoss.zk.ui.composer.autowire.xel</name>
        <value>false</value>
    </library-property>
```

# Version History

| Version | Date           | Content    |
|---------|----------------|------------|
| 5.0.6   | Feburary, 2011 | Introduced |
