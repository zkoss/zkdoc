**Syntax:**

`use="`*`a-class-name`*`"`  
`use="${`*`EL_returns_a_class_or_a_class_name`*`}"`  
`use="${`*`a_component`*`}"`

It specifies a class to create a component instead of the default one.
In the following example, `MyWindow` is used instead of the default
class, <javadoc type="interface">org.zkoss.zul.Window</javadoc>.

``` xml
<window use="MyWindow"/>
```

If an EL expression is used, it can return a class name, a class
instance, or a component instance. Notice that, if the expression
returns a component, the component should not belong to any pages.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
