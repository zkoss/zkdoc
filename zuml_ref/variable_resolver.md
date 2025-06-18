**Syntax:**

<?variable-resolver class="..." 
   [''arg0''="..."] [''arg1''="..."] [''arg2''="..."] [''arg3''="..."]?>

Specifies the variable resolver that could be used by the `zscript`
interpreter and the EL expressions to resolve unknown variables. The
specified class must implement the
<javadoc type="interface">org.zkoss.xel.VariableResolver</javadoc>
interface.

You can specify multiple variable resolvers with multiple
`variable-resolver` directives. The later declared one has higher
priority.

Notice that the `variable-resolver` directives are evaluated before the
`init` directives, so the `zscript` codes referenced by the `init`
directives are affected by the variable resolver.

The following is an example when using ZK with the Spring framework. It
resolves Java Beans declared in the Spring framework, such that you
access them directly.

```xml
 <?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
```

Notice that if you have a variable resolver used for every page, you
don't have to declare it on every page. Rather, you could register a
system-level variable resolver. For more information, please refer to
[ZK Developer's Reference: System-level Variable
Resolvers]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/el_expressions#System-level_Variable_Resolver).

# class

`[Required]`

A class name that must implement the
<javadoc type="interface">org.zkoss.xel.VariableResolver</javadoc>
interface. Unlike the `init` directive, the class name cannot be the
class that is defined in zscript codes.

# arg0, arg1...

`[Optional]`

You could specify any number of arguments. If not specified, the default
constructor is assumed. If specified, it will look for the constructor
with the signature in the following order:

1.  Foo(Map args)
2.  Foo(Object\[\] args)
3.  Foo()

If the first signature is found, the arguments with the name and value
are passed to the constructor as an instance of `Map`. If the second
signature is found, the values of arguments are passed to the
constructor as an array of objects.

```xml
<?variable-resolver class="foo.Foo" whatever="anything"?>
```

will cause `Foo(Map args)` being called with a map, which has an entry:
`whatever=anything`. If not found, `Foo(Object[] args)` will be called
with a single-item array and the value of the item is `anything`.

Prior to ZK 3.6.2, only the second signature is checked if one or more
argument is specified, and it assumes `arg0` as the first argument,
`arg1` as the second, and so on.
