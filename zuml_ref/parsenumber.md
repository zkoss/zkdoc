The default method:

```java
Number parseNumber(String source, String pattern);
```

  
i.e.,
[org.zkoss.xel.fn.CommonFns#parseNumber(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#parseNumber(java.lang.String, java.lang.String))

Parses text from the beginning of the given string to produce a number
with the given pattern.

There is another extended built-in function,
[org.zkoss.xel.fn.CommonFns#parseNumber(java.lang.String, java.lang.String, java.util.Locale)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/fn/CommonFns.html#parseNumber(java.lang.String, java.lang.String, java.util.Locale)),
not declared in taglib. Parses text from the beginning of the given
string to produce a number with the given pattern and locale.

You can call it by [ EL](ZUML_Reference/EL_Expressions/Static_Fields_and_Methods)
or declaring a [ xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method).

**Parameters:** In both default and extended function:

- source - the text to parse
- pattern - the pattern to apply

In extended function only:

- locale - the locale to apply

# Version History

| Version | Date | Content |
|---------|------|---------|
| 6.0.1   |      |         |
