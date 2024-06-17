**Property:**

`org.zkoss.zul.grid.autoSort`

`Default: false`  
`[Since 5.0.7]`

Specifies whether to sort the model when the following cases:

- <javadoc method="setModel(ListModel)">org.zkoss.zul.Grid</javadoc>is
  called and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Column</javadoc>
  is set.
- <javadoc method="setSortDirection(String)">org.zkoss.zul.Column</javadoc>
  is called.
- Model receives <javadoc>org.zkoss.zul.event.ListDataEvent</javadoc>and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Column</javadoc>
  is set.

If you want to ignore sort when receiving
<javadoc>org.zkoss.zul.event.ListDataEvent</javadoc>, you can specify
the value to be **ignore.change**.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<grid>
  <custom-attributes org.zkoss.zul.grid.autoSort="true"/>
...
```

# Version History

| Version | Date       | Content                                       |
|---------|------------|-----------------------------------------------|
| 5.0.7   | April 2011 | Grid shall sort model based on current state. |
