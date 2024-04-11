**Syntax**

`apply="`*`a-class-name`*`"`  
`apply="`*`class1`*`, `*`class2`*`,..."`  
`apply="${`*`EL_returns_a_class_or_a_collection_of_classes`*`}"`  
`apply="${`*`EL_returns_an_instance_or_a_collection_of_Composer_instances`*`}"`

It specifies a class, a collection of classes that are used to
initialize the component. The class must implement the
<javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc>
interface. And then, you can do the initialization in the
`doAfterCompose` method, since it is called after the component and all
its children are instantiated.

``` xml
 <window apply="foo.MyComposer"/>
```

In addition, you specify a `Composer` instance, or a collection of
`Composer` instances by the use of EL expressions.

**Note:** the EL expressions are, if specified, evaluated before the
component is instantiated. So you cannot reference to the component.
Moreover, the `self` variable references to the parent component, if
any, or the current page, if it is the root component, in the EL
expressions specified in this attribute.

If you want more control such as handling the exception, you can also
implement the
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>
interface.

If you have a composer that you'd like to apply to every page, you don't
need to specify it in every page. Rather, you could register a
system-level composer. For more information, please refer to [ZK
Developer's Reference: System-level
Composers](ZK_Developer's_Reference/MVC/Controller/Composer#System-level_Composer).

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
