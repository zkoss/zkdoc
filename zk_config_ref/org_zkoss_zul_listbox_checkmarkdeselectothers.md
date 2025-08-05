---
title: "org.zkoss.zul.listbox.checkmarkDeselectOthers"
---

**Property:**

`org.zkoss.zul.listbox.checkmarkDeselectOthers`

Default: `false`  
{% include version-badge.html version=5.0.5 %}

If a Listbox's checkmark
([org.zkoss.zul.Listbox#isCheckmark()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#isCheckmark())) is
enabled, the selection will be toggled when an user clicks an item. In
other words, all other items will remain the same.

If you prefer to deselect all other items and select the item being
clicked (which the behavior of ZK 5.0.4 and earlier), you can specify
true to this library property. For the multiple-selection mode, you can
still press \*ctrl\* with clicking to select multiple items.

# Version History

| Version | Date           | Content                                                                                                                                                                                                                    |
|---------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 8.5.2   | 2018           | org.zkoss.zul.listbox.checkmarkDeselectOthers and org.zkoss.zul.tree.checkmarkDeselectOthers can now be used as custom attribute to set behaviors on individual tree or listbox components. Previously: only set globally. |
| 5.0.5   | September 2010 | org.zkoss.zul.listbox.checkmarkDeselectOthers and org.zkoss.zul.tree.checkmarkDeselectOthers are introduced to control how to select items when an item is clicked on a tree or a listbox with checkmark.                  |
