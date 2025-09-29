---
title: "org.zkoss.web.classWebResource.cache.etag"
---

**Property:**

`org.zkoss.web.classWebResource.cache.etag`
{% include global-scope-only.html %}
Default: `false`  
{% include supported-since.html version="5.0.1" %}

It specifies whether to use ETag to detect and return 304 for matched
resource.

If turned on, the cached resource won't be reloaded if the user presses
F5 to reload.
