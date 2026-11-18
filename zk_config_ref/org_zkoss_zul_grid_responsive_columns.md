---
title: "org.zkoss.zul.grid.responsive.columns"
description: "org.zkoss.zul.grid.responsive.columns: Sets the default responsive columns token string that controls how many cards a stacking grid shows per row at each breakpoint."
---

**Property:**

`org.zkoss.zul.grid.responsive.columns`

{% include all-scopes-available.html %}
Default: unset (the client uses `sm-1 md-none`)  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [responsiveColumns](/zk_component_ref/grid#responsivecolumns) of the grids that do not set `responsiveColumns` themselves. The value is a whitespace-separated list of tokens in the form `<breakpoint>-<value>`:

* `<breakpoint>` is one of `sm`, `md`, `lg` or `xl`.
* `<value>` is either the number of cards per row, or `none` to show a table from that breakpoint up.

For example, the following value shows one card per row below the `md` breakpoint and a table from `md` up:

```xml
<library-property>
    <name>org.zkoss.zul.grid.responsive.columns</name>
    <value>sm-1 md-none</value>
</library-property>
```

When the property is unset, the client uses the default `sm-1 md-none`. The client ignores invalid tokens silently. If no token gives a number of cards and the `sm` breakpoint is missing, the client also uses the default.

This property has no effect unless stacking is enabled, either by [org.zkoss.zul.grid.responsive](org_zkoss_zul_grid_responsive) or by the grid's own `responsive` attribute.

Stacking itself is provided by ZK EE (zkmax).
