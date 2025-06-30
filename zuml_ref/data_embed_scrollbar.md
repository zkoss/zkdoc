To show the position of zk customized scrollbar, the mesh widget
component (like Grid, Listbox, and Tree) and the layout region component
(like Center, South, North, and so on) should apply data-embedscrollbar
attribute.

```xml
<div xmlns:ca="client/attribute">
<grid ca:data-embedscrollbar="false"></grid>
</div>
```

`Default value: `*`true`*` since 7.0.2`  
`Default value: `*`false`*` since 7.0.0`
