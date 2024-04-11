# paramValues - java.util.Map

A map of parameters of the request, `Map<String, String[]>`, returned by
\[<http://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getParameterValues(java.lang.String>)
ServletRequest.getParameterValues()\]

To retrieve the first value of a parameter if any, use `param` instead.

``` xml
${param.something}
${paramValues.something[1]}
```

Notice that, in zscript, there is no `paramValues`. `Param` is a map of
possible values, `Map<String, String[]>`.

``` xml
<zscript>
String[] values = param.get("something");
</zscript>
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
