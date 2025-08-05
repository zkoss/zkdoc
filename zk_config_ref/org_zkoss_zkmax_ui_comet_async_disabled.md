---
title: "org.zkoss.zkmax.ui.comet.async.disabled"
---

**Property:**

`org.zkoss.zkmax.ui.comet.async.disabled`

Default:  `auto`

It specifies whether to disable the use of Servlet 3's Asynchronous
Support for handling Comet-based server push.

By default, ZK detects if the server supports Servlet 3 and then uses
Asynchronous Support if available. The memory use of Asynchronous
Support is much more efficient since it doesn't hold any pending thread.
However, if you prefer to disable it, you could specify this library
property to true.
