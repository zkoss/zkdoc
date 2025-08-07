---
title: "class.mold"
---

**Property:**

[component-full-qualified-class-name]`.mold`

`Default: none`  
{% include version-badge.html version="5.0.0" %}

It specified the default mold of the specified component. The property
name is a concatenation of the class name of the component and `mold`.
For example, the property for the button's default mold is called
`org.zkoss.zul.Button.mold`.

```xml
<library-property>
    <name>org.zkoss.zul.Button.mold</name>
    <value>trendy</value>
</library-property>
```
