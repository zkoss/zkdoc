---
title: "org.zkoss.zul.daterangebox.separator"
description: "org.zkoss.zul.daterangebox.separator: Sets the default text shown between the begin and end inputs of a Daterangebox."
---

**Property:**

`org.zkoss.zul.daterangebox.separator`

{% include global-scope-only.html %}
Default: `~`  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [separator](/zk_component_ref/daterangebox#popup-and-input-options) of every Daterangebox in the application. The separator is the text rendered between the begin and the end inputs, such as `~` or `to`.

A component's own `separator` attribute overrides this property.

```xml
<library-property>
    <name>org.zkoss.zul.daterangebox.separator</name>
    <value>to</value>
</library-property>
```
