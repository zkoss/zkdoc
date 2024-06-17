**Property:**

`org.zkoss.zul.grid.rod`

Set render-on-demand for grid components. Using render on demand, the
grid components will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See
\[<https://www.zkoss.org/wiki/ZK_Developer's_Reference/Performance_Tips/Listbox,_Grid_and_Tree_for_Huge_Data/Turn_on_Render_on_Demand#ROD:_Grid>,
performance documentation\] for additional information.

`Default: false`

``` xml
<grid>
  <custom-attributes org.zkoss.zul.grid.rod="true"/>
...
```

``` xml
<library-property>
    <name>org.zkoss.zul.grid.rod</name>
    <value>true</value>
</library-property>
...
```

# Version History
