The widget implementation must be placed in an independent JavaScript
file. The file must be placed under the directory,
**/web/js/package-path**, in the Java class path. Since the widget name
is SimpleLabel and the package name is com.foo, the file path is
**/web/js/com/foo/SimpleLabel.js**.

```javascript
com.foo.SimpleLabel = zk.$extends(zk.Widget, {
    _value : '', // default value

    getValue : function() {
        return this._value;
    },

    setValue : function(value) {
        if (this._value != value) {
            this._value = value;
            if (this.desktop)
                this.$n().innerHTML = zUtl.encodeXML(value);
        }
    }

});
```

Having set-up the ability to handle states we now need to create the
component view. This can be accomplished using two methods.
