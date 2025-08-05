---
title: "browser"
---

```java
boolean browser(String type);
```

  
i.e.,
[org.zkoss.web.fn.ServletFns#isBrowser(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ServletFns.html#isBrowser(java.lang.String))

Returns if the current request comes from the browser of the specified
type.

**Parameters:**

- type - the type of the browser.

  
Allowed values include "robot", "ie", "ie6", "ie6-", "ie7", "ie8",
"ie9", "ie7-", "ie8-",

"gecko", "gecko2", "gecko3", "gecko2-", "opera", "safari"

Note: "ie6-" means Internet Explorer 6 only; not Internet Explorer 7 or
other.


