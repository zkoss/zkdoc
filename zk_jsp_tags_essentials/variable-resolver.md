## Variable-resolver

**Syntax**

`<zk:variable-resolver use="..." `  
` [arg0="..."] [arg1="..."] [arg2="..."] [arg3="..."] />`

It specifies the variable resolver that will be used by the zscript
interpreter.

The class must be specified in the `use` attribute[^1], and it must
implement
<javadoc type="interface">org.zkoss.xel.VariableResolver</javadoc>.

For more information please refer to [ZUML
Reference](ZUML_Reference/ZUML/Processing_Instructions/variable-resolver).

Fir example,

``` xml
<zk:variable-resolver use="foo.MyResolver"/>
...
<zk:page>
...
</zk:page>
```

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

[^1]: Unlike ZUML, the attribute is called `use`, rather than `class`,
    because of the limitation of JSP
