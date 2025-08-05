---
title: "use"
---

**Syntax:**

`use="`*`a-class-name`*`"`  
`use="${`*`EL_returns_a_class_or_a_class_name`*`}"`  
`use="${`*`a_component`*`}"`

It specifies a class to create a component instead of the default one.
In the following example, `MyWindow` is used instead of the default
class, [org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html).

```xml
<window use="MyWindow"/>
```

If an EL expression is used, it can return a class name, a class
instance, or a component instance. Notice that, if the expression
returns a component, the component should not belong to any pages.


