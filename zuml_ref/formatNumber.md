The default method:

```java
String formatNumber(Object number, String pattern);
```

  
i.e.,
<javadoc method="formatNumber(java.lang.Object, java.lang.String)">org.zkoss.xel.fn.CommonFns</javadoc>

Formats a number (Integer, BigDecimal...) into a string with the given
pattern.

For example,

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<zk>
    <label value="${c:formatNumber(2332315231, '$ ###,###,###.00')}" />
</zk>
```

There is another extended built-in function, not declared in taglib:
<javadoc method="formatNumber(java.lang.Object, java.lang.String, java.util.Locale)">org.zkoss.xel.fn.CommonFns</javadoc>.

You can call it by [
EL](ZUML_Reference/EL_Expressions/Static_Fields_and_Methods)
or declaring a [
xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method).

**Parameters:** In both default and extended functions:

- number - the Number to format
- pattern - the pattern to apply

In extended function only:

- locale - the locale to apply
