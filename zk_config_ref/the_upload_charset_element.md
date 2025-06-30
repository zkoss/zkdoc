**Syntax:**

```xml
<upload-charset>a_charset|UTF-8`</upload-charset>
```

`[Default: UTF-8]`

It specifies the charset (aka., encoding) for the uploaded text files if
no charset is specified with the content type.

If the uploaded file is binary, there is no encoding issue at all.

Notice that the `upload-charset-finder-class` element has the higher
priority.


