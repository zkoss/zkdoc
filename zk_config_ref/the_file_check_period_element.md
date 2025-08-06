---
title: "The file-check-period Element"
---

**Syntax:**

```xml
<file-check-period>a_number</file-check-period>
```  
  
`[Default: 5]`  


It specifies the time, in seconds, to wait before checking whether a
file is modified.

For better performance, ZK has employed a cache to store the parsed ZUML
file. The time specified here controls how often ZK checks whether a
file is modified. The larger the number the better the performance.


