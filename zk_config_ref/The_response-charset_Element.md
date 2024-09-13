**Syntax:**

<response-charset>*`a_charset`*`|`**`UTF-8`**</response-charset>

`[Default: UTF-8]`

It specifies the charset for the rendering result of a ZUML page. In
other words, it is used to load the ZUML page by the ZK Loader (i.e.,
DHtmlLayoutServlet).

If you want to use the container's default value, you can specify an
empty string as follows.

``` xml
<response-charset></response-charset>
```


