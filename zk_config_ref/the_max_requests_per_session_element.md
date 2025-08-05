---
title: "The max-requests-per-session Element"
---

**Syntax:**

```xml
<max-requests-per-session>a_number</max-requests-per-session>
```

`[Default: 5]`

It specifies the maximum allowed number of concurrent requests per
session. Each time a user types an URL at the browser, it creates a
request and the request ends after the response is sent to the browser.
In other words, this number controls how many concurrent requests the
same user can send.

If the current request exceeds this max number, you will get "HTTP ERROR
503" and `Too many concurrent requests`.

A negative number means no limitation at all, but it is not recommended
due to the possibility of the denial-of-service (DoS) attacks.


