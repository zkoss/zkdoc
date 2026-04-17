---
title: "org.zkoss.bind.defaultComposer.class"
---

**Property:** 

`org.zkoss.bind.defaultComposer.class`

{% include global-scope-only.html %}

Default: `org.zkoss.bind.BindComposer`
{% include supported-since.html version="10.0.0" %}

Auto apply the composer when a component setting `viewModel` without `apply`.

For example:

```xml
<div viewModel="org.zkoss.TestViewModel" >
    <!-- other components -->
</div>
```

If the library property is set (ex. "org.zkoss.TestBindComposer") , the
above ZUL is equivalent to:

```xml
<div apply="org.zkoss.TestBindComposer" viewModel="org.zkoss.TestViewModel" >
    <!-- other components -->
</div>
```
