**Property:**

`org.zkoss.zul.tree.checkmarkDeselectOthers`

`Default: false`  
`[Since 5.0.5]`

If a tree's checkmark
(<javadoc method="isCheckmark()">org.zkoss.zul.Tree</javadoc>) is
enabled, the selection will be toggled when a user clicks an item. In
other words, all other items will remain the same.

If you prefer to deselect all other items and select the item being
clicked (which the behavior of ZK 5.0.4 and earlier), you could specify
true to this library property.

# Version History

| Version | Date           | Content                                                                                                                                                                                                   |
|---------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.5   | September 2010 | org.zkoss.zul.listbox.checkmarkDeselectOthers and org.zkoss.zul.tree.checkmarkDeselectOthers are introduced to control how to select items when an item is clicked on a tree or a listbox with checkmark. |
