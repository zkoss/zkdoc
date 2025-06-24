When a widget is attached to the DOM tree,
[zk.Widget#redraw(_global_.Array)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#redraw(_global_.Array))
is called to generate the HTML content. For example, assume you want to
use <mp>HTML SPAN</mp> tag to house the content, we can do as follows.

```javascript
redraw: function (out) {
 out.push('<span', this.domAttrs_(), '>', this.getValue(), '</span>');
}
```

The default implementation of
[zk.Widget#redraw(_global_.Array)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#redraw(_global_.Array))
delegates to a mold method depending on the mold. In this instance we
override the function to provide one implementation of redraw which
doesn’t use molds.
