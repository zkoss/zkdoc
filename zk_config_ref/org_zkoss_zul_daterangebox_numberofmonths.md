---
title: "org.zkoss.zul.daterangebox.numberOfMonths"
description: "org.zkoss.zul.daterangebox.numberOfMonths: Sets the default number of calendar months shown side by side in the popup of a Daterangebox."
---

**Property:**

`org.zkoss.zul.daterangebox.numberOfMonths`

{% include global-scope-only.html %}
Default: `2`  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [numberOfMonths](/zk_component_ref/daterangebox#numberofmonths) of every Daterangebox in the application, which is the number of consecutive calendar months shown side by side in the popup. The value must be an integer from `1` to the maximum set by [org.zkoss.zul.daterangebox.numberOfMonths.max](org_zkoss_zul_daterangebox_numberofmonths_max), which is `12` by default.

A value outside that range, or a value that is not an integer, is ignored with a warning in the server log, and the default `2` is used.

A component's own `numberOfMonths` attribute overrides this property.

```xml
<library-property>
    <name>org.zkoss.zul.daterangebox.numberOfMonths</name>
    <value>3</value>
</library-property>
```
