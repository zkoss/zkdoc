``` java
boolean browser(String type);
```

  
i.e.,
<javadoc method="isBrowser(java.lang.String)">org.zkoss.web.fn.ServletFns</javadoc>

Returns if the current request comes from the browser of the specified
type.

**Parameters:**

- type - the type of the browser.

  
Allowed values include "robot", "ie", "ie6", "ie6-", "ie7", "ie8",
"ie9", "ie7-", "ie8-",

"gecko", "gecko2", "gecko3", "gecko2-", "opera", "safari"

Note: "ie6-" means Internet Explorer 6 only; not Internet Explorer 7 or
other.


