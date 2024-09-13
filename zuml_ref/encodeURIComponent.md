``` java
java.lang.String encodeURIComponent(java.lang.String)
```

  
i.e.,
<javadoc method="encodeURIComponent(java.lang.String)">org.zkoss.web.servlet.http.Encodes</javadoc>

Does the HTTP encoding for an URI query parameter. For example, '/' is
translated to '%2F'. Both name and value must be encoded separately.
Example, encodeURIComponent(name) + '=' + encodeURIComponent(value).


