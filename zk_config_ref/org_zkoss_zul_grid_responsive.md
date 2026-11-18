---
title: "org.zkoss.zul.grid.responsive"
description: "org.zkoss.zul.grid.responsive: Sets the default responsive policy, stacking or none, of the grids that do not set responsive themselves."
---

**Property:**

`org.zkoss.zul.grid.responsive`

{% include all-scopes-available.html %}
Default: unset (no responsive mode)  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [responsive](/zk_component_ref/grid#responsive) policy of the grids that do not set `responsive` themselves. Allowed values:

* `stacking`: each row becomes a block of label and value pairs when the grid is narrower than the breakpoint.
* `none`: no responsive behavior.

An invalid value is ignored with a warning in the server log, and the grid keeps the normal table layout.

A grid's own `responsive` attribute always wins. Set this property in `zk.xml` to apply stacking to the whole application:

```xml
<library-property>
    <name>org.zkoss.zul.grid.responsive</name>
    <value>stacking</value>
</library-property>
```

Or set it as a custom attribute on a page or a component subtree:

```xml
<grid>
  <custom-attributes org.zkoss.zul.grid.responsive="stacking"/>
...
```

Stacking itself is provided by ZK EE (zkmax). Community Edition stores the value but does not stack the rows.

See also [org.zkoss.zul.grid.responsive.columns](org_zkoss_zul_grid_responsive_columns) and [Responsive Stacking Grid](/zk_component_ref/grid#responsive-stacking-grid-ee).
