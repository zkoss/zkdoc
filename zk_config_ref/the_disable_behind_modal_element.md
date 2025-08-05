---
title: "The disable-behind-modal Element"
---

**Syntax:**

```xml
<disable-behind-modal>true|false</disable-behind-modal>
```

`[Default: `false`]`  
`[Deprecated as of release 5.0.0]`

It specifies whether to disable all elements behind the modal window at
the browser. If disabled, the performance is better.

**Tip**: This option can be considered as obsolete since 3.0.4. The user
is almost impossible to change focus to an element behind the modal
window, without disabling them.

**Note**: in ZK 3.0.3 and earlier, the option is default to true.


