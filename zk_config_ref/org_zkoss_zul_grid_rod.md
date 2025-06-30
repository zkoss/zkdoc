**Property:**

`org.zkoss.zul.grid.rod`

Set render-on-demand for grid components. Using render on demand, the
grid components will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See
\[<{{site.baseurl}}/zk_dev_ref/performance_tips/listbox,_grid_and_tree_for_huge_data/turn_on_render_on_demand#ROD:_Grid>,
performance documentation\] for additional information.

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
