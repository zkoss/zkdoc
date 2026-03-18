# String Concatenation

{% include supported-since.html version="8.0.0" %}

String concatenation has been introduced to make it easy to construct
strings within EL expressions.

```xml
    <zscript><![CDATA[

String firstname = "Hawk";
String lastname = "Chen";

    ]]></zscript>

${'Hi, ' += firstname += ' ' += lastname} 
```
