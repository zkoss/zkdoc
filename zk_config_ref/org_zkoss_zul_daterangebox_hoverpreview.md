---
title: "org.zkoss.zul.daterangebox.hoverPreview"
description: "org.zkoss.zul.daterangebox.hoverPreview: Sets whether hovering a candidate end date previews the range in the calendar of a Daterangebox by default."
---

**Property:**

`org.zkoss.zul.daterangebox.hoverPreview`

{% include global-scope-only.html %}
Default: `true`  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [hoverPreview](/zk_component_ref/daterangebox#popup-and-input-options) of every Daterangebox in the application. When it is enabled, hovering a candidate end date highlights the range that would be selected. Set the value to `false` to turn the preview off. The value is case-insensitive. Any other value enables the preview.

A component's own `hoverPreview` attribute overrides this property.

```xml
<library-property>
    <name>org.zkoss.zul.daterangebox.hoverPreview</name>
    <value>false</value>
</library-property>
```
