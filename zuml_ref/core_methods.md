---
title: "Core Methods"
description: "The complete list of ZK EL core methods (built-in TLD functions) — string, number, date, i18n, URL-encoding and reflection helpers — with their signatures."
---

This section describes the EL functions defined in the built-in TLD called
`http://www.zkoss.org/dsp/web/core`. Declare the taglib once, then call any
function with its prefix:

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>

<window title="${c:l('app.title')}">
 ...
</window>
```

The table below lists every core function with its signature and purpose; click
a name for full details, parameters, and examples.

| Function | Signature | Description |
|---|---|---|
| [attr](/zuml_ref/attr) | `String attr(String name, Object value)` | Generates an HTML/XML attribute `name="value"`; empty value yields `""`. |
| [boolean](/zuml_ref/boolean) | `boolean boolean(Object value)` | Converts an object to a boolean. |
| [browser](/zuml_ref/browser) | `boolean browser(String type)` | Tests whether the current request comes from a browser of the given type. |
| [cat](/zuml_ref/cat) | `String cat(String s1, String s2)` | Concatenates two strings (null treated as empty). |
| [cat3](/zuml_ref/cat3) | `String cat3(String s1, String s2, String s3)` | Concatenates three strings. |
| [cat4](/zuml_ref/cat4) | `String cat4(String s1, ..., String s4)` | Concatenates four strings. |
| [cat5](/zuml_ref/cat5) | `String cat5(String s1, ..., String s5)` | Concatenates five strings. |
| [char](/zuml_ref/char) | `char char(Object value)` | Converts an object to a character. |
| [class](/zuml_ref/class) | `Class class(String className)` | Returns the class for the given class name. |
| [decimal](/zuml_ref/decimal) | `BigDecimal decimal(Object value)` | Converts an object to a `BigDecimal`. |
| [eatQuot](/zuml_ref/eatquot) | `String eatQuot(String s)` | Removes single and double quotes to avoid JavaScript injection. |
| [encodeThemeURL](/zuml_ref/encodethemeurl) | `String encodeThemeURL(String url)` | Encodes a URL with the theme-specific prefix and session info. |
| [encodeURIComponent](/zuml_ref/encodeuricomponent) | `String encodeURIComponent(String s)` | HTTP-encodes a URI query parameter (e.g. `/` → `%2F`). |
| [encodeURL](/zuml_ref/encodeurl) | `String encodeURL(String uri)` | Encodes a URL, resolving `*` to the current locale/browser. |
| [endsWith](/zuml_ref/endswith) | `boolean endsWith(String value, String suffix)` | Tests whether the string ends with the suffix. |
| [escapeXML](/zuml_ref/escapexml) | `String escapeXML(String s)` | Escapes special characters to be HTML/XML-safe (`<` → `&lt;`, …). |
| [formatDate](/zuml_ref/formatdate) | `String formatDate(Date date, String pattern)` | Formats a `Date` into a string with the given pattern. |
| [formatNumber](/zuml_ref/formatnumber) | `String formatNumber(Object number, String pattern)` | Formats a number into a string with the given pattern. |
| [getCurrentLocale](/zuml_ref/getcurrentlocale) | `Locale getCurrentLocale()` | Returns the locale of the current request; never null. |
| [indexOf](/zuml_ref/indexof) | `int indexOf(Object value, Object element)` | The first index of the element within the value. |
| [int](/zuml_ref/int) | `int int(Object value)` | Converts an object to an int. |
| [isInstance](/zuml_ref/isinstance) | `boolean isInstance(Object class, Object value)` | Tests whether the value is an instance of the given class. |
| [join](/zuml_ref/join) | `String join(Object[] value, String separator)` | Joins an array into a string with the separator. |
| [l](/zuml_ref/l) | `String l(String key)` | Returns the i18n label for the key (current locale). |
| [l2](/zuml_ref/l2) | `String l2(String key, Object[] args)` | Returns the i18n label for the key and formats it with args. |
| [lastIndexOf](/zuml_ref/lastindexof) | `int lastIndexOf(Object value, Object element)` | The last index of the element within the value. |
| [length](/zuml_ref/length) | `int length(Object value)` | The length of a string, array, collection, or map. |
| [new](/zuml_ref/new) | `Object new(Object cls)` | Instantiates a class via its default constructor. |
| [new1](/zuml_ref/new1) | `Object new1(Object cls, Object arg)` | Instantiates a class with one constructor argument. |
| [new2](/zuml_ref/new2) | `Object new2(Object cls, Object arg1, Object arg2)` | Instantiates a class with two constructor arguments. |
| [new3](/zuml_ref/new3) | `Object new3(Object cls, Object arg1, Object arg2, Object arg3)` | Instantiates a class with three constructor arguments. |
| [number](/zuml_ref/number) | `Number number(Object value)` | Converts an object to a number. |
| [parseDate](/zuml_ref/parsedate) | `Date parseDate(String source, String pattern)` | Parses a string into a `Date` with the given pattern. |
| [parseNumber](/zuml_ref/parsenumber) | `Number parseNumber(String source, String pattern)` | Parses a string into a number with the given pattern. |
| [property](/zuml_ref/property) | `String property(String key)` | Returns the value of the given library property, or null. |
| [render](/zuml_ref/render) | `void render(ActionContext ac)` | Renders a DSP fragment. |
| [replace](/zuml_ref/replace) | `String replace(String src, String from, String to)` | Replaces all occurrences of `from` in `src` with `to`. |
| [split](/zuml_ref/split) | `String[] split(String value, String regex)` | Splits the string by the given regular expression. |
| [startsWith](/zuml_ref/startswith) | `boolean startsWith(String value, String prefix)` | Tests whether the string starts with the prefix. |
| [string](/zuml_ref/string) | `String toString(Object value)` | Converts an object to a string. |
| [substring](/zuml_ref/substring) | `String substring(String s, int from, int to)` | Returns a substring of the given string. |
| [testCurrentLocale](/zuml_ref/testcurrentlocale) | `boolean testCurrent(String lang, String country)` | Tests whether the current locale matches the language/country. |
| [toLowerCase](/zuml_ref/tolowercase) | `String toLowerCase(String value)` | Converts the string to lowercase using the current locale. |
| [toUpperCase](/zuml_ref/touppercase) | `String toUpperCase(String value)` | Converts the string to uppercase using the current locale. |
| [trim](/zuml_ref/trim) | `String trim(String value)` | Returns the string with leading and trailing whitespace removed. |
