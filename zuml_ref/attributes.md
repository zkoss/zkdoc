Each attribute, except special attributes like `if` and `forEach`,
represents a value that should be assigned to a property of a component
after it is created. For example, when an attribute, say, `foo`, is
specified, ZK Loader will assume there is a method called `setFoo` that
accepts a single argument. If there are multiple methods with the same
name, ZK Loader will use the one that matches the argument most (in term
of the argument's class).

For example, suppose `${foo}` is evaluated to an integer in the
following example, ZK Loader will invoke
[org.zkoss.zul.Window#setMode(int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setMode(int)), rather
than
[org.zkoss.zul.Window#setMode(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setMode(java.lang.String)).

```xml
<window mode="${foo}">
...
```

The values of attributes usually consist of EL expressions. For example,

```xml
<listbox forEach="${matrix}">
    <listitem label="${forEachStatus.previous.each.label}: ${each}" forEach=${each.items}/> <!-- nested-->
</listbox>
```

There are several ways to associate Java objects with EL
expressions[^1].

1.  Implement a variable resolver
    ([org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html))
    and specify it with the
    [variable-resolver](zuml_ref/zuml/processing_instructions/variable-resolver)
    directive.
2.  Return the object in a static method and specify it in
    [xel-method](zuml_ref/zuml/processing_instructions/xel-method)
3.  Declare multiple static methods in a taglib and declare it in
    [taglib](zuml_ref/zuml/processing_instructions/taglib)
4.  Construct them in
    [zscript](zuml_ref/zuml/elements/zscript)

In the following sections, we will discuss the special attributes
one-by-one.

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For introductory, please refer to [ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/ui_composing/el_expressions).
