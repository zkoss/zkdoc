---
title: "org.zkoss.zk.WCS.cache"
---

**Property:**

`org.zkoss.zk.WCS.cache`

Default:  `true`

Specifies whether to cache the result of ZK WCS files (the stylesheets
of components) at the server. By default, it is enabled. It means the
Stylesheet specified in a WCS file is loaded and cached at the server.
The performance is good. However, if you are debugging the widget
styling and you'd like to modify the content without restarting the
server, you could disable the caching of WCS files.

Notice that you don't have to turn it off if you restart the server each
time you modify the widget's css files.
