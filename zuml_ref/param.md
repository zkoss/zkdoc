# param - java.util.Map

It's a map (`Map<String, String>`) of HTTP request parameter like the
one returned by
\[<http://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getParameterMap>()
ServletRequest.getParameterMap()\]

If you visit a page with the URL like

` `[`http://localhost:8080/mypage.zul?p1=v1&p2=v2`](http://localhost:8080/mypage.zul?p1=v1&p2=v2)

Then you can retrieve parameters' value with the syntax below:

```xml
${param.p1}
${param.p2}
```

And the reulst will be:

```xml
v1
v2
```

To retrieve all possible parameter values, use `paramValues` instead.

```xml
${param.something}
${paramValues.something[0]}
```

Notice that, in zscript, there is no `paramValues`. `Param` is a map of
possible values, `Map<String, String[]>`.

```xml
<zscript>
String[] values = param.get("something");
</zscript>
```


