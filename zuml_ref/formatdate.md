The default method:

```java
String formatDate(Date date, String pattern);
```

  
i.e.,
[org.zkoss.xel.fn.CommonFns#formatDate(java.util.Date, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#formatDate(java.util.Date, java.lang.String))

Formats a Date into a date/time string with the given pattern. For
example,

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<zk>
    <zscript>
        java.util.Date date = new java.util.Date();
    </zscript>
    <label value="${c:formatDate(date, 'MM/dd/yyyy')}" />
</zk>
```

There is another extended built-in function:
[org.zkoss.xel.fn.CommonFns#formatDate(Date, String, Locale, TimeZone, String, String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#formatDate(Date, String, Locale, TimeZone, String, String)),
not declared in taglib.

Formats a Date into a date/time string with the given pattern, locale,
timezone, date style, and time style.

You can call it by [ EL](ZUML_Reference/EL_Expressions/Static_Fields_and_Methods)
or declaring a [ xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method).

> ------------------------------------------------------------------------
>
> Note: If the date style/time style is applied, the pattern will be
> ignored.

**Parameters:** In both default and extended function:

- date - the Date to format
- pattern - the pattern to apply

In extended function only:

- locale - the locale to apply
- timezone - the timezone to apply
- dateStyle - the date style to apply
- timeStyle - the time style to apply

# Version History

| Version | Date | Content |
|---------|------|---------|
| 6.0.0   |      |         |
