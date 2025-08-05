---
title: "Zclass"
---

ZK Class (aka., zclass) is a naming pattern. The name assigned to zclass
([org.zkoss.zk.ui.HtmlBaseComponent#setZclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBaseComponent.html#setZclass(java.lang.String)))
will be used to name the CSS classes associated with the DOM structure
of a component, including the root and the children. In addition, each
kind of components is assigned with a unique zclass and shipped with all
the required CSS rules.

Since zclass is used to name the CSS classes associated DOM elements,
all the default CSS rules won't be applied if zclass is assigned with a
different value. Thus, it is used to custom a component with a totally
different look.

For example, assign zclass **btn** to a button component in zul page
like this

```xml
<!-- index.zul -->
<button zclass="btn"/>
```

will generate the following output

```html
<!-- HTML output -->
<button class="btn" />
```

```html
<!-- ZK default HTML output -->
<button class="z-button" />
```

As you can see the default z-button class is missing, which means all
CSS rules is removed.


