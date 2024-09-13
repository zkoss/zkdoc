``` java
String escapeXML(String s);
```

  
i.e.,
<javadoc method="escapeXML(java.lang.String)">org.zkoss.xml.XMLs</javadoc>

Encodes a string that special characters are quoted to be compatible
with HTML/XML. For example,

  
`<` is translated to `&lt;`

`>` to `&gt;`

`&` to `&amp;`

`"` to `&#034;`

`'` to `&#039;`

**Parameters:**

- s - the string to encode


