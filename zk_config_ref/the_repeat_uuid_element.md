---
title: "The repeat-uuid Element"
---

**Syntax:**

```xml
<repeat-uuid>true|false</repeat-uuid>
```

`[Default: false]`  
{% include version-badge.html version=3.6.0 %}

It specifies whether to use the same UUID sequence for desktops for each
reboot. By default, it is turned off so the desktop's UUID is completely
different after reboot. It helps to avoid the consistency between the
browser and the server. However, it is useful to turn this option on if
you want to debug and test the application.


