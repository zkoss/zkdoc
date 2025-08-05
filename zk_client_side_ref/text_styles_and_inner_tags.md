---
title: "Text Styles and Inner Tags"
---

This section is about how to pass the text styles to the inner HTML
tags.

# Issue

In general, the styles
([zk.Widget#setStyle(_global_.String)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#setStyle(_global_.String)))
are generated directly to the outer DOM element by the use of
[zk.Widget#domAttrs_(_global_.Map)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#domAttrs_(_global_.Map)).

However, for some DOM structure, the text-related styles must be
specified in some of the inner tags that contain the text. Otherwise, it
won't have any effect to the text's styles.

For example, assume that the widget's HTML representation is as follows.

```xml
<span><input type="checkbox"/><label>Text</label></span>
```

# Solution

It can be resolved as follows.

First, generates the style for the inner tag (i.e., <label> in the above
case) by calling zk.Widget#domTextStyleAttr\_

```javascript
out.push('<label', this.domTextStyleAttr_(), '>',...);
```

Second, override
[zk.Widget#getTextNode_()](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#getTextNode_())
to return the DOM element that embeds the text.

```javascript
getTextNode_: function () {
    return zDom.firstChild(this.getNode(), "LABEL");
}
```


