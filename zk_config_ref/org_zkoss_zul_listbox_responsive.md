---
title: "org.zkoss.zul.listbox.responsive"
description: "org.zkoss.zul.listbox.responsive: Sets the default responsive policy, stacking or none, of the listboxes that do not set responsive themselves."
---

**Property:**

`org.zkoss.zul.listbox.responsive`

{% include all-scopes-available.html %}
Default: unset (no responsive mode)  
{% include supported-since.html version="11.0.0" %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

Sets the default [responsive](/zk_component_ref/listbox#responsive) policy of the listboxes that do not set `responsive` themselves. Allowed values:

* `stacking`: each list item becomes a card of label and value pairs when the listbox is narrower than the breakpoint.
* `none`: no responsive behavior.

An invalid value is ignored with a warning in the server log, and the listbox keeps the normal table layout.

A listbox's own `responsive` attribute always wins. Set this property in `zk.xml` to apply stacking to the whole application:

```xml
<library-property>
    <name>org.zkoss.zul.listbox.responsive</name>
    <value>stacking</value>
</library-property>
```

Or set it as a custom attribute on a page or a component subtree:

```xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.responsive="stacking"/>
...
```

Stacking itself is provided by ZK EE (zkmax). Community Edition stores the value but does not stack the items.

See also [org.zkoss.zul.listbox.responsive.columns](org_zkoss_zul_listbox_responsive_columns) and [Responsive Stacking Listbox](/zk_component_ref/listbox#responsive-stacking-listbox-ee).
