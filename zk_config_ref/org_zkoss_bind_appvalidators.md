**Property:**

`org.zkoss.bind.appValidators`

Default: none

Register application level validators and only have one instance shared
between all binders.

Sample usage: add the following settings in zk.xml:

```xml
<library-property>
    <name>org.zkoss.bind.appValidators</name>
    <value>foo=my.FooValidator,bar=my.BarValidator</value>
</library-property>
```

Then use them by converter name.

```xml
<textbox value="@load(vm.name) @validator('foo')"/>
<textbox value="@load(vm.value) @validator('bar')"/>
```

# Version History

| Version | Date      | Content    |
|---------|-----------|------------|
| 6.0.1   | May, 2012 | Introduced |
