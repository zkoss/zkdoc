**Syntax:**

```xml
<stylesheet href="a_uri" type="text/css"/>  
<stylesheet>  
` `css_definitions  
</stylesheet>
```

It specifies a CSS file that should be loaded to the client, or the CSS
content. Notice that, if specified, the CSS file is always loaded.

Example,

```xml
<stylesheet href="~./zul/css/zk.wcs" type="text/css"/>
```

# href

`[Optional]`

It specifies the URI of the CSS file to load. The URI could contain
`~./` (such as "~./foo/whatever.js") to indicate that a JavaScript file
should be loaded from the classpath.

# type

`[Optional]`

The type of CSS. It is usually `text/css`.
