---
title: "The session-timeout Element"
---

**Syntax:**

```xml
<session-timeout>a_number_in_seconds</session-timeout>
```

`[Default: 0 `(depending on the Web server)`]`

It specifies the time, in seconds, between client requests before a
session is invalidated. A negative time indicates the session should
never timeout. The default zero means to use the system default (which
is usually specified in `web.xml`).


