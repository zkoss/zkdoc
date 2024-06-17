**Property:**

`org.zkoss.zul.listbox.rightSelect`

`Default: true`

If a listbox's checkmark
(<javadoc method="isCheckmark()">org.zkoss.zul.Listbox</javadoc>) is
enabled, the selection will be toggled when the user right clicks on an
item.

If you prefer not to select/deselect an item with a right click, you
could specify false to this library property.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<listbox>
  <custom-attributes org.zkoss.zul.listbox.rightSelect="false"/>
...
```

# Version History

| Version | Date         | Content                                                                                                                                                                                                                            |
|---------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.5   | October 2010 | org.zkoss.zul.listbox.rightSelect and org.zkoss.zul.tree.rightSelect are introduced to control whether to toggle item selection or not when an item is right clicked on a tree or a listbox with checkmark.                        |
| 5.0.7   | April 2011   | org.zkoss.zul.listbox.rightSelect and org.zkoss.zul.tree.rightSelect could be specified as component's attribute (<javadoc type="interface" method="getAttribute(java.lang.String, boolean)">org.zkoss.zk.ui.Component</javadoc>). |
