---
title: "org.zkoss.zul.invalidateThreshold"
---

**Property:**

`org.zkoss.zul.invalidateThreshold`
{% include all-scopes-available.html %}
`Default: 10`  
{% include supported-since.html version="8.0.1" %}

It specifies the threshold number of changed items of a model to
invalidate a widget's DOM elements for **Grid, Listbox, Combobox**. If
the number of changed items (by adding or removing) is over the
threshold, client widget will redraw its DOM elements instead of just
rendering changed items only.

```xml
<listbox>
    <custom-attributes org.zkoss.zul.invalidateThreshold="200"/>
...
</listbox>
```
