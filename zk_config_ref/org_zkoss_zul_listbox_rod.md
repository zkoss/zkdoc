---
title: "org.zkoss.zul.listbox.rod"
---

**Property:**
`org.zkoss.zul.listbox.rod`

{% include all-scopes-available.html %}
Set render-on-demand for listbox components. Using render on demand, the
listboxcomponents will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See [turn on render on demand]({{site.baseurl}}/zk_dev_ref/performance_tips/turn_on_render_on_demand#ROD:_Listbox) for additional information.

Default: `false`

**apply on one component**

```xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.rod="true"/>
...
```

**apply globally**

```xml
<library-property>
    <name>org.zkoss.zul.listbox.rod</name>
    <value>true</value>
</library-property>
```
