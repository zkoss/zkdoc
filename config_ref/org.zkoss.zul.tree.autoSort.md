**Property:**

`org.zkoss.zul.tree.autoSort`

`Default: false`  
`[Since 5.0.7]`

Specifies whether to sort the model when the following cases:

- <javadoc method="setModel (TreeModel)">org.zkoss.zul.Tree</javadoc>is
  called and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is set.
- <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is called.
- Model receives <javadoc>org.zkoss.zul.event.TreeDataEvent</javadoc>
  and
  <javadoc method="setSortDirection(String)">org.zkoss.zul.Treecol</javadoc>
  is set.

If you want to ignore sorting when receiving
<javadoc>org.zkoss.zul.event.TreeDataEvent</javadoc>, you can specifies
the value as **ignore.change**.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<tree>
  <custom-attributes org.zkoss.zul.tree.autoSort="true"/>
...
```

# Version History

| Version | Date | Content | 5.0.7 | April 2011 | Tree shall sort model based on current state. |
|---------|------|---------|-------|------------|-----------------------------------------------|
