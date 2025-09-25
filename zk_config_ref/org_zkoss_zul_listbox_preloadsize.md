---
title: "org.zkoss.zul.listbox.preloadSize"
---

**Property:**

`org.zkoss.zul.listbox.preloadSize `
{% include all-scopes-available.html %}
Default: `50`  
{% include version-badge.html version="6.0.1" %}

Default: `7`  
{% include version-badge.html version="5.0.8" %}

Specifies the number of items to preload when receiving the rendering
request from the client. It is used only if live data
([org.zkoss.zul.Listbox#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#setModel(ListModel)))
and not paging
([org.zkoss.zul.Listbox#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.preloadSize="10"/>
...
```

# Version History

| Version | Date      | Content                                                                                          |
|---------|-----------|--------------------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Deprecated setPreloadSize, instead with a custom attributes "org.zkoss.zul.listbox.preloadSize". |
