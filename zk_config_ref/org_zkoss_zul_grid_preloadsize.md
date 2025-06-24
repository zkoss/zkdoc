**Property:**

`org.zkoss.zul.grid.preloadSize `

`Default: 50`  
`[Since 6.0.1]`

`Default: 7`  
`[Since 5.0.8]`

Specifies the number of rows to preload when receiving the rendering
request from the client. It is used only for live data
([org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))) but
not paging
([org.zkoss.zul.Grid#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#getPagingChild())).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<grid>
  <custom-attributes org.zkoss.zul.grid.preloadSize="10"/>
...
```

# Version History

| Version | Date      | Content                                                                                       |
|---------|-----------|-----------------------------------------------------------------------------------------------|
| 5.0.8   | June 2011 | Deprecated setPreloadSize, instead with a custom attributes "org.zkoss.zul.grid.preloadSize". |
