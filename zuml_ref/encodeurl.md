```java
String encodeURL(String uri);
```

  
i.e.,
[org.zkoss.web.fn.ServletFns#encodeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ServletFns.html#encodeURL(java.lang.String))

Encodes a URL.

If an URI contains "\*", it will be replaced with a proper Locale. For
example, if the current Locale is zh_TW and the resource is named
"ab\*.cd", then it searches "ab_zh_TW.cd", "ab_zh.cd" and then "ab.cd",
until any of them is found.

> ------------------------------------------------------------------------
>
> Note: "\*" must be right before ".", or the last character. For
> example, "ab\*.cd" and "ab\*" are both correct, while "ab\*cd" and
> "ab\*\\cd" are ignored.

If an URI contains two "\*", the first "\*" will be replaced with a
browser code and the second with a proper locale. The browser code
depends on what browser the user are used to visit the web site.
Currently, the code for Internet Explorer is "ie", Safari is "saf",
Opera is "opr" and all others are "moz". Thus, in the above example, if
the resource is named "ab\*\*.cd" and Firefox is used, then it searches
"abmoz_zh_TW.cd", "abmoz_zh.cd" and then "abmoz.cd", until any of them
is found.

**Parameters:**

- uri - the URI to encode


