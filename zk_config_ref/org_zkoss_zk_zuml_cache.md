---
title: "org.zkoss.zk.ZUML.cache"
---

**Property:**

`org.zkoss.zk.ZUML.cache`
{% include global-scope-only.html %}
Default:  `true`

Specifies whether to cache the result of ZK ZUML files (the \*.zul files
in the classpath loaded by `ZumlExtendlet`) at the server. By default,
it is enabled. It means the ZUML code specified in a zul file is loaded
and cached at the server. The performance is good. However, if you are
debugging the ZUML code and you'd like to modify the content without
restarting the server, you could disable the caching of ZUML files.
