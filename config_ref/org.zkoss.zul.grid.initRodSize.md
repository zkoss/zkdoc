**Property:**

`org.zkoss.zul.grid.initRodSize`

`Default: 100`  
`[Since 5.0.8]`

Specifies the number of rows rendered when the Grid first render. It is
used only for live data
(<javadoc method="setModel(ListModel)">org.zkoss.zul.Grid</javadoc>) but
not paging
(<javadoc method="getPagingChild()">org.zkoss.zul.Grid</javadoc>).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<grid>
  <custom-attributes org.zkoss.zul.grid.initRodSize="30"/>
...
```

# Version History

| Version | Date      | Content                                                                               |
|---------|-----------|---------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Add a custom attributes "org.zkoss.zul.grid.initRodSize" for control ROD render size. |
