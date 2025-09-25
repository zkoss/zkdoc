---
title: "The desktop-timeout Element"
---

**Syntax:**

```xml
<desktop-timeout>a_number</desktop-timeout>
```

[Default: `3600]`

It specifies the time, in **seconds**, between client requests before a
desktop is invalidated. A negative time indicates the desktop should
never timeout.

In 9.x and before, it only works when the current desktop count exceeds
`max-desktops-per-session` and while adding a new desktop (both
conditions should match).

It works regardless of the current desktop count.
