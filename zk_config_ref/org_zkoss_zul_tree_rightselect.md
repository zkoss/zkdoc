---
title: "org.zkoss.zul.tree.rightSelect"
---

**Property:**

`org.zkoss.zul.tree.rightSelect`
{% include all-scopes-available.html %}
Default: `true`  
{% include version-badge.html version="5.0.5" %}

If a tree's checkmark
([org.zkoss.zul.Tree#isCheckmark()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tree.html#isCheckmark())) is
enabled, the selection will be toggled when the user right clicks item.

If you prefer not to select/deselect item on right click, you could
specify false to this library property.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<tree>
  <custom-attributes org.zkoss.zul.tree.rightSelect="false"/>
...
```

# Version History

| Version | Date         | Content                                                                                                                                                                                                                            |
|---------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.5   | October 2010 | org.zkoss.zul.listbox.rightSelect and org.zkoss.zul.tree.rightSelect are introduced to control whether to toggle item selection or not when an item is right clicked on a tree or a listbox with checkmark.                        |
| 5.0.7   | April 2011   | org.zkoss.zul.listbox.rightSelect and org.zkoss.zul.tree.rightSelect could be specified as component's attribute ([org.zkoss.zk.ui.Component#getAttribute(java.lang.String, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#getAttribute(java.lang.String, boolean))). |
