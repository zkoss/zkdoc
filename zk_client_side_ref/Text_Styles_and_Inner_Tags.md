This section is about how to pass the text styles to the inner HTML
tags.

# Issue

In general, the styles
(<javadoc directory="jsdoc" method="setStyle(_global_.String)">zk.Widget</javadoc>)
are generated directly to the outer DOM element by the use of
<javadoc directory="jsdoc" method="domAttrs_(_global_.Map)">zk.Widget</javadoc>.

However, for some DOM structure, the text-related styles must be
specified in some of the inner tags that contain the text. Otherwise, it
won't have any effect to the text's styles.

For example, assume that the widget's HTML representation is as follows.

``` xml
<span><input type="checkbox"/><label>Text</label></span>
```

# Solution

It can be resolved as follows.

First, generates the style for the inner tag (i.e., <label> in the above
case) by calling zk.Widget#domTextStyleAttr\_

``` javascript
out.push('<label', this.domTextStyleAttr_(), '>',...);
```

Second, override
<javadoc directory="jsdoc" method="getTextNode_()">zk.Widget</javadoc>
to return the DOM element that embeds the text.

``` javascript
getTextNode_: function () {
    return zDom.firstChild(this.getNode(), "LABEL");
}
```


