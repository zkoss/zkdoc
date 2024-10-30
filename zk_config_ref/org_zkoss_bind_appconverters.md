**Property:**

`org.zkoss.bind.appConverters`

`Default: `none

Register application level converters and only have one instance shard
between all binders.

Sample usage: add the following settings in zk.xml:

``` xml
<library-property>
    <name>org.zkoss.bind.appConverters</name>
    <value>foo=my.FooConverter,bar=my.BarConverter</value>
</library-property>
```

Then use them by converter name.

``` xml
<label value="@load(vm.message) @converter('foo')"/>
<label value="@load(vm.message) @converter('bar')"/>
```

This is useful if the converter is required in many place.

# Version History

| Version | Date      | Content    |
|---------|-----------|------------|
| 6.0.1   | May, 2012 | Introduced |
