```java
boolean testCurrent(String lang, String country);
```

  
i.e.,
<javadoc method="testCurrent(java.lang.String, java.lang.String) ">org.zkoss.util.Locales</javadoc>

Returns whether the current locale
([getCurrentLocale()](ZUML_Reference/EL_Expressions/Core_Methods/getCurrentLocale))
belongs to the specified language and/or country.

**Parameters:**

- lang - the language code, e.g., en and zh. Ignored if null.
- country - the country code, e.g., US. Ignored if null. If empty, it
  means no country code at all.


