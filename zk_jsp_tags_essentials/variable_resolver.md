---
title: "variable-resolver"
---

## Variable-resolver

**Syntax**

`<zk:variable-resolver use="..." `  
`[arg0="..."] [arg1="..."] [arg2="..."] [arg3="..."] />`

It specifies the variable resolver that will be used by the zscript
interpreter.

The class must be specified in the `use` attribute[^1], and it must
implement
[org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html).

For more information please refer to [ZUML Reference](/zuml_ref/variable_resolver).

Fir example,

```xml
<zk:variable-resolver use="foo.MyResolver"/>
...
<zk:page>
...
</zk:page>
```

Unlike ZUML, the attribute is called `use`, rather than `class`, because of the limitation of JSP

