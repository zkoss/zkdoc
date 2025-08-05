---
title: "function"
---

**syntax**

```xml
<function class="foo.MyClass" singature="java.lang.String funcName(Class0, Class1)"/>
```

Specifies a static method (aka., a function) that should be called when
a WPD file is interpreted. The returned string will be generated
directly to the output. In other words, it must be a valid JavaScript
code snippet.

Example,

```xml
<package name="zul.lang" cacheable="false">
    <script src="msgzul*.js"/>
    <function class="org.zkoss.zul.impl.Utils"
        signature="java.lang.String outLocaleJavaScript()"/>
</package>
```

# class

`[Required]`

The name of the class where the static method is declared.

# signature

`[Required]`

The signature of the static method. The return type has to be a string
and the return value should be a valid JavaScript code snippet.

The method might have arbitrary numbers of arguments. WPD will check the
type of each argument and assign a proper value if possible. The
following is the type WPD recognized:

| Argument Type                             | Value                        |
|-------------------------------------------|------------------------------|
| javax.servlet.ServletRequest and derives  | The current request.         |
| javax.servlet.ServletResponse and derives | The current response.        |
| javax.servlet.ServletContext              | The current servlet context. |
| Others                                    | null                         |


