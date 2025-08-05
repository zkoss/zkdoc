---
title: "evaluator"
---



**Syntax:**

<?evaluator [name="..."] [class="..."] [import="..."]?>

It specifies how to evaluate XEL expressions.

# name

`[Optional][Default: `*`none`*`][Case insensitive]`

The name of the implementation used to evaluate the XEL expressions.
There are two ways to specify the implementation. One is the name
attribute. The other is the class attribute.

For example, if you want to use MVEL[^1], you can specify the name as
follows.

```xml
 <?evaluator name="mvel"?>
 <window id="w" title="MVEL Demo">
     ${new org.zkoss.zul.Textbox().setParent(w)}
 </window>
```

Here is a list of built-in implementations:

| Name | Class / Description |
|:----:|:-------------------|
| default | org.zkoss.xel.el.ELFactory<br><br>The default implementation. It is based on ZK Commons EL (`zcommons-el.jar`), which is a performance enhancement version of Apache Commons EL. |
| zel | org.zkoss.xel.zel.ELFactory<br><br>The implementation based on The ZK EL Library(`zel.jar`), which supports new features seen in *Unified Expression Language 2.2* such as method calls and l-value.<br><br>*[Since ZK 6, ZK uses this evaluator as the default one.]* |
| mvel | org.zkoss.zkmax.xel.mvel.MVELFactory<br><br>The implementation based on MVEL, [http://mvel.codehaus.org](http://mvel.codehaus.org).<br><br>*[available only if zkmax.jar is loaded]* |
| ognl | org.zkoss.zkmax.xel.ognl.OGNLFactory<br><br>The implementation based on OGNL, [http://www.ognl.org](http://www.ognl.org/).<br><br>*[available only if zkmax.jar is loaded]* |
| commons-el | org.zkoss.zkmax.xel.el.ApacheELFactory<br><br>The implementation that is based on Apache Commons EL, org.apache.commons.el.ExpressionEvaluatorImpl.<br><br>*[available only if zkmax.jar is loaded]* |
| japser-el | org.zkoss.zkmax.xel.el21.ApacheELFactory<br><br>The implementation that is based on Apache JSP 2.1 EL, org.apache.el.ExpressionFactoryImpl.<br><br>*[available only if zkmax.jar is loaded]* |

You can provide additional implementation by the use of the `class`
attribute, as described in the following section. The class must
implement the
[org.zkoss.xel.ExpressionFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/ExpressionFactory.html)
interface. Or, you can specify the following content in
`metainfo/xel/config.xml`.

```xml
 <config>
     <xel-config>
         <evaluator-name>Super</evaluator-name><!-- case insensitive -->
         <evaluator-class>my.SuperEvaluator</evaluator-class>
     </xel-config>
 </config>
```

**Notes**

<references/>

# class

`[Optional][Default: `*`dependind on how xel-config is specified`*`]`

The implementation used to evaluate the XEL expressions. In addition to
the name attribute, you can specify the class directly. For example, you
can use MVEL by specifying class as follows.

```xml
 <?evaluator class="org.zkoss.zkmax.xel.mvel.MVELFactory"?>
 <window id="w" title="MVEL Demo">
     ${new org.zkoss.zul.Textbox().setParent(w)}
 </window>
```

# import

`[Optiona][Default: `*`what are defined in taglib`*`]`

Specifies a list of classes separated with comma to import for
evaluating the expression in this page. For example, with MVEL:

```xml
 <?evaluator class="org.zkoss.zkmax.xel.mvel.MVELFactory"
 import="org.zkoss.zul.Datebox,org.zkoss.zul.Combobox"?>
 <window id="w" title="MVEL Demo">
     ${new Datebox().setParent(w)}
 </window>
```

Notice that not all evaluators support the import of classes. For
example, all EL-based the evaluators, including the system default one,
do *not* support it. In other words, the `import` attribute is
meaningless to them (since they don't have the concept of
instantiation).

In addition, the class's names specified in the import attribute must be
a fully qualified name (including the package's name). In other words,
it ignores the classes imported by [the import directive](/zuml_ref/import).

# Version History

| Version | Date           | Content                                                                                              |
|---------|----------------|------------------------------------------------------------------------------------------------------|
| 6.0.0   | September 2011 | Support those new features seen in Unified Expression Language 2.2 such as method calls and l-value. |

[^1]: MVEL is a powerful expression language. Refer to
    [<http://mvel.codehaus.org/>](http://mvel.codehaus.org/) for more
    information.
