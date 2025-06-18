A widget can have several molds. Each mold needs to be placed in an
independent JavaScript file. Under a subdirectory named mold. The full
path of the directory in this example will be
**/web/js/com/foo/mold/simple-label.js**.

Let us assume we want to generate the following DOM content:

```html
<span>value</span>
```

Then, the content of simple-label.js will be as follows.

```javascript
function (out) {
 out.push('<span', this.domAttrs_(), '>', this.getValue(), '</span>');
}
```

As shown above, the mold is actually a JavaScript method. More
precisely, it is a method member of the widget class (the name is
assigned by ZK Client Engine automatically), so you can access the
widget object by the use of this.

The mold method takes an argument named out, which behaves like a writer
in Java. The out object at least implements the push and unshift method
to write the content to the end or to the beginning. It is by default an
array, but the client application might use different kinds of objects.

<mp>domAttrs\_</mp> is a (protected) method inherited from
<javadoc  directory="jsdoc">zk.Widget</javadoc>. It returns all HTML
attributes required, such as style, id and so on. You can override it if
you want.

If we do not require multiple styles per component we can just implement
the redraw method directly.

# Multiple Molds

Need to declare each mold in [ language
addon]({{site.baseurl}}/zk_component_dev_essentials/creating_the_configuration_files/the_language-addon).
