---
title: "EL Expressions"
---

The syntax of an EL expressions is `${expr}`. For example,

```xml
 <element attr1="${bean.property}".../>
 ${map[entry]}
 <another-element>${3+counter} is ${empty map}</another-element>
```

When an EL expression is used as an attribute value, it could return any
kind of objects as long as the component accepts it. For example, the
following expression will be evaluated as a Boolean object.

```xml
 <window if="${some > 10}">
```

# Associate with Java

There are several ways to associate Java objects with EL expressions.

1.  Implement a variable resolver
    ([org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html))
    and specify it with the
    [variable-resolver](/zuml_ref/variable_resolver)
    directive.
2.  Return the object in a static method and specify it in the
    [xel-method](/zuml_ref/xel_method)
3.  Declare multiple static methods in a taglib and declare it in
    [taglib](/zuml_ref/taglib)
4.  Construct them in
    [zscript](/zuml_ref/zscript)

Here is the detailed information for each feature. For introductory,
please refer to [ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/ui_composing/el_expressions).

## Lambda Expressions

{% include supported-since.html version="8.0.0" %}

ZK 8 supports lambda expressions in EL, allowing for anonymous functions within ZUL.

```xml
<textbox value="@load((x -> (x * 100) / 2.54)(vm.value))" 
         onOK="@command('click', key=((x -> (x * 2.54) / 100)(self.value)))" />
```

A lambda expression can also be named and evaluated later using the assignment and semicolon operators:

```xml
<label value="@load((incr = x -> x + 1; incr(5)))" />
```

## Collection Operations

{% include supported-since.html version="8.0.0" %}

EL 3 allows direct use of collection chain operations and streaming API.

```xml
<listbox model="@load((vm.names.stream().filter(x -> x.contains(vm.filter)).toList()))">
```

You can also construct collections directly in an expression:

```xml
<label value="@load(([1, 2, 3, 4].stream().sum()))" />
```

