**Property:**

`org.zkoss.zul.grid.preloadSize `

`Default: 50`  
`[Since 6.0.1]`

`Default: 7`  
`[Since 5.0.8]`

Specifies the number of rows to preload when receiving the rendering
request from the client. It is used only for live data
(<javadoc method="setModel(ListModel)">org.zkoss.zul.Grid</javadoc>) but
not paging
(<javadoc method="getPagingChild()">org.zkoss.zul.Grid</javadoc>).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<grid>
  <custom-attributes org.zkoss.zul.grid.preloadSize="10"/>
...
```

# Version History

| Version | Date      | Content                                                                                       |
|---------|-----------|-----------------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Deprecated setPreloadSize, instead with a custom attributes "org.zkoss.zul.grid.preloadSize". |
