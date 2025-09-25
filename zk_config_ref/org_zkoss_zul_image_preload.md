---
title: "org.zkoss.zul.image.preload"
---

**Property:**

`org.zkoss.zul.image.preload`

{% include all-scopes-available.html %}

Default: `false`  
{% include version-badge.html version="6.5.2" %}

It specifies the image will be preloaded or not for
[LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement)
and
[Image]({{site.baseurl}}/zk_component_ref/image)
component.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<image>
    <custom-attributes org.zkoss.zul.image.preload="true"/>
...
<button image="src.png">
    <custom-attributes org.zkoss.zul.image.preload="true"/>
...
```

# Version History

| Version | Date       | Content                                      |
|---------|------------|----------------------------------------------|
| 6.5.2   | March 2013 | Preload image is now configurable in zk.xml. |
