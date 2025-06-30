**Property:**

`org.zkoss.zul.listbox.rod`

Set render-on-demand for listbox components. Using render on demand, the
listboxcomponents will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See
\[<{{site.baseurl}}/zk_dev_ref/performance_tips/listbox,_grid_and_tree_for_huge_data/turn_on_render_on_demand#ROD:_Listbox>,
performance documentation\] for additional information.

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
...
```

# Version History
