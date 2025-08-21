---
title: "The xel-config Element"
---

The allowed child elements include `evaluator-class`. At most one
`xel-config` element is allowed for each `zk.xml`.

```xml
 <xel-config>
     <evaluator-class>my.MyExpressionFactory</evaluator-class>
 </xel-config>
```

## The evaluator-class Element

`[Default: `org.zkoss.xel.zel.ELFactory`]`

It specifies the class used to evaluate XEL (Extensible Expression
Language) expressions. The specified class must implement the
<javadoc type ="interface">org.zkoss.xel.ExpressionFactory</javadoc>
interface.

Since ZK 6, if not specified, ZK uses the new XEL implementation from
the ZK EL Library (i.e., `zel.jar`), which supports new features seen in
 Unified Expression Language 2.2 such as method calls and l-value.
If ZK cannot find the `zel.jar` in your class-path, ZK will degrade to
use the original ZK Commons EL(`zcommons-el.jar`).

If your Web server uses another implementation, you can do one of the
following:

1.  If you prefer the implementation based on Apache JSP 2.1 EL, you
    have to specify the
    `org.zkoss.zkmax.xel.el.ApacheELFactory` class. If
    the Web server doesn't support Apache JSP 2.1 EL, you have to copy
    `el-api.jar` (JSP 2.1 API[^1]) and `jasper-el.jar` (Apache's
    implementation) to your Web application.
2.  If you prefer the implementation based on Apache Commons EL (JSP 2.0
    EL), you have to specify the
    `org.zkoss.zkmax.xel.el.ApacheELFactory` class. If
    the Web server doesn't support Apache Commons EL, you have to copy
    `commons-el.jar` to your Web application.
3.  If you want a different implementation, you can extend from
    `org.zkoss.xel.el.ELFactory` or
    `org.zkoss.zkmax.xel.el.ApacheELFactory` by simply
    overriding the `newExpressionEvaluator` method. Of course, if you
    prefer, you can implement the
    [org.zkoss.xel.ExpressionFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/ExpressionFactory.html)
    interface directly.

**Notes**



## Version History

| Version | Date      | Content                                                                                              |
|---------|-----------|------------------------------------------------------------------------------------------------------|
| 6.0.0   | Sep. 2011 | Support those new features seen in Unified Expression Language 2.2 such as method calls and l-value. |

[^1]: Required only if you are using the Web server that supports only
    JSP 2.0.
