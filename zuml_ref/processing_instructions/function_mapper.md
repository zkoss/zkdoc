---
title: "function-mapper"
---

**Syntax:**
```xml
<?function-mapper class="..." 
   [arg0="..."] [arg1="..."] [arg2="..."] [arg3="..."]?>
```

Specifies the function mapper that will be used by the EL expressions to
resolve unknown functions. The specified class must implement the
[org.zkoss.xel.FunctionMapper](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/FunctionMapper.html)
interface.

You can specify multiple variable resolvers with multiple
`function-mapper` directives. The later declared one that has higher
priority.

Notice that the `function-mapper` directives are evaluated before the
`init` directives.

## class

`[Optional]`

A class name must implement the
[org.zkoss.xel.FunctionMapper](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/FunctionMapper.html)
interface. Unlike the `init` directive, the class name cannot be the
class that is defined in zscript codes.

## arg0, arg1...

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
constructor as an array of objects. For example,

```xml
<?function-mapper class="foo.Foo" whatever="anything"?>
```

Prior to ZK 3.6.2, only the second signature is checked if one or more
argument is specified, and it assumes `arg0` as the first argument,
`arg1` as the second, and so on.


