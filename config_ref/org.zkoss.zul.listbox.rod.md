**Property:**

`org.zkoss.zul.listbox.rod`

Set render-on-demand for listbox components. Using render on demand, the
listboxcomponents will automatically add and remove rows depending on
client scrolling. On large models, this will avoid sending the full
content during page rendering.

See
\[<https://www.zkoss.org/wiki/ZK_Developer's_Reference/Performance_Tips/Listbox,_Grid_and_Tree_for_Huge_Data/Turn_on_Render_on_Demand#ROD:_Listbox>,
performance documentation\] for additional information.

`Default: false`

**apply on one component**

``` xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.rod="true"/>
...
```

**apply globally**

``` xml
<library-property>
    <name>org.zkoss.zul.listbox.rod</name>
    <value>true</value>
</library-property>
...
```

# Version History
