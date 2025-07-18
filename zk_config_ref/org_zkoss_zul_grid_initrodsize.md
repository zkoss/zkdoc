**Property:**

`org.zkoss.zul.grid.initRodSize`

`Default: 100`  
{% include version-badge.html version=5.0.8 %}

Specifies the number of rows rendered when the Grid first render. It is
used only for live data
([org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))) but
not paging
([org.zkoss.zul.Grid#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<grid>
  <custom-attributes org.zkoss.zul.grid.initRodSize="30"/>
...
```

# Version History

| Version | Date      | Content                                                                               |
|---------|-----------|---------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Add a custom attributes "org.zkoss.zul.grid.initRodSize" for control ROD render size. |
