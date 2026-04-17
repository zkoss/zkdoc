---
title: "The send-client-errors Element"
---

**Syntax:**

```xml
<send-client-errors>true|false</send-client-errors>
```

`[Default: `false`]`
{% include supported-since.html version="10.0.0" %}

It specifies whether client errors should be sent to the server for
logging the page url where the error occurred and its stack trace. By
default, this element is set to false to mitigate potential Denial of
Service (DoS) attacks, as enabling it could allow clients to flood the
server with errors.
