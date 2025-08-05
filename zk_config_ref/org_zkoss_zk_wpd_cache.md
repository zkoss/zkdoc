---
title: "org.zkoss.zk.WPD.cache"
---

**Property:**

`org.zkoss.zk.WPD.cache`

Default:  `true`

Specifies whether to cache the result of ZK WPD files (the JavaScript
code for widgets) at the server. By default, it is enabled. It means the
JavaScript code specified in a WPD file is loaded and cached at the
server. The performance is good. However, if you are debugging the
widget's client-side code and you'd like to modify the content without
restarting the server, you could disable the caching of WPD files.

Notice that you don't have to turn it off if you restart the server each
time you modify the widget's client-side code.
