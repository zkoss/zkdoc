---
title: "testCurrentLocale"
---

```java
boolean testCurrent(String lang, String country);
```

  
i.e.,
[org.zkoss.util.Locales#testCurrent(java.lang.String, java.lang.String) ](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Locales.html#testCurrent(java.lang.String, java.lang.String) )

Returns whether the current locale
([getCurrentLocale()](/zuml_ref/getcurrentlocale))
belongs to the specified language and/or country.

**Parameters:**

- lang - the language code, e.g., en and zh. Ignored if null.
- country - the country code, e.g., US. Ignored if null. If empty, it
  means no country code at all.


