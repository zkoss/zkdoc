The default method:

``` java
Date parseDate(String source, String pattern);
```

  
i.e.,
<javadoc method="parseDate(java.lang.String, java.lang.String)">org.zkoss.xel.fn.CommonFns</javadoc>

Parses text from the beginning of the given string to produce a date
with the given pattern.

There is another extended built-in function,
<javadoc method="parseDate(java.lang.String, java.lang.String, java.util.Locale, java.util.TimeZone, java.lang.String, java.lang.String)">org.zkoss.xel.fn.CommonFns</javadoc>,
not declared in the taglib. Parses text from the beginning of the given
string to produce a date with the given pattern, locale, timezone, date
style and time style.

You can call it by [
EL](ZUML%20Reference/EL%20Expressions/Static%20Fields%20and%20Methods)
or declaring a [
xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method).

> ------------------------------------------------------------------------
>
> Note: If the date style / time style is applied, the pattern will be
> ignored.

**Parameters:** In both default and extended function:

- source - the text to parse
- pattern - the pattern to apply

In extended function only:

- locale - the locale to apply
- timezone - the timezone to apply
- dateStyle - the date style to apply
- timeStyle - the time style to apply

# Version History

| Version | Date | Content |
|---------|------|---------|
| 6.0.0   |      |         |
