---
title: "org.zkoss.web.classWebResource.cache"
---

**Property:**

`org.zkoss.web.classWebResource.cache`

`Default: true`  
{% include version-badge.html version="3.6.3" %}

It specifies whether to allow the browsers to cache so-called class Web
resources[^1].

By default, it is true. It means the static class Web resources are
cached in browsers if possible, unless you upgrade ZK to a different
version.

`Notice the you can control the immutable period of the CSS files of class Web resources with`  
`another property called `org.zkoss.web.classWebResource.cache.CSS.hours`.`

If you are developing a component, it is better to turn it off (so you
can force browser to load modified CSS and JS files by pressing F5).

```xml
<library-property>
    <name>org.zkoss.web.classWebResource.cache</name>
    <value>false</value>
</library-property>
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: Class Web resources are resources that can be loaded by use of
    "~./\*".
