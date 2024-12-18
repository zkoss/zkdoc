**Property:**

`org.zkoss.zk.ui.composer.autowire.zscript`

`Default: `true` (it is default to `false` in 6.0)`

It specifies whether
`org.zkoss.zk.ui.util.GenericAutowireComposer` (and
`org.zkoss.zk.ui.util.GenericForwardComposer`) should
wire the variables defined in zscript.

Some people reported that the wiring of zscript variables might cause
some performance degrade if there are a lot of zscript code used in a
page. You could specify this library variable as the follows to turn it
off.

``` xml
<!-- in WEB-INF/zk.xml -->
<library-property>
    <name>org.zkoss.zk.ui.composer.autowire.zscript</name>
    <value>false</value>
</library-property>
```

Notice that, to have the best performance, it is recommended not to use
zscript at all. For more more details, please refer to [ZK Developer's
Reference: Performance
Tips]({{site.baseurl}}/zk_dev_ref/Performance_Tips/Use_Compiled_Java_Codes).

If you don't use any zscript, this option does not matter since ZK is
smart enough to skip the wiring of zscript variables automatically.

# Version History

| Version | Date           | Content    |
|---------|----------------|------------|
| 5.0.6   | Feburary, 2011 | Introduced |
