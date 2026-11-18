---
title: "org.zkoss.zul.daterangebox.numberOfMonths.max"
description: "org.zkoss.zul.daterangebox.numberOfMonths.max: Sets the largest number of calendar months a Daterangebox can show side by side in its popup."
---

**Property:**

`org.zkoss.zul.daterangebox.numberOfMonths.max`

{% include global-scope-only.html %}
Default: `12`  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the largest value that [numberOfMonths](/zk_component_ref/daterangebox#numberofmonths) can take in the application. Use it when a Daterangebox needs wider panels, for example an 18-month travel picker. The value must be an integer from `1` to `24`. The framework caps the popup at `24` panels, so a larger value is refused.

A value outside that range, or a value that is not an integer, is ignored with a warning in the server log, and the default `12` is used.

```xml
<library-property>
    <name>org.zkoss.zul.daterangebox.numberOfMonths.max</name>
    <value>18</value>
</library-property>
```

See also [org.zkoss.zul.daterangebox.numberOfMonths](org_zkoss_zul_daterangebox_numberofmonths).
