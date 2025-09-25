---
title: "org.zkoss.zul.grid.rod"
---

**Property:**

`org.zkoss.zul.grid.rod`
{% include all-scopes-available.html %}

Set render-on-demand for grid components. Using render on demand, the
grid components will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See [turn on render on demand](/zk_dev_ref/performance_tips/turn_on_render_on_demand#grid) for additional information.

Default: `false`

```xml
<grid>
  <custom-attributes org.zkoss.zul.grid.rod="true"/>
...
```

```xml
<library-property>
    <name>org.zkoss.zul.grid.rod</name>
    <value>true</value>
</library-property>
...
```

# Version History
