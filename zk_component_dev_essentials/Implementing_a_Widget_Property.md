A property usually has a getter and a setter. The getter is
straightforward:

```javascript
_value: '', //default value
 
getValue: function () {
 return this._value;
}
```

The setter is defined in a similar manner except we have to modify the
DOM tree if it has been attached. A widget inherits a property called
node which is assigned a reference to a DOM element if the widget has
been attached to the DOM tree. If a widget is attached to DOM,
<mp>this.desktop</mp> will be a reference to the desktop
(<javadoc directory="jsdoc">zk.Desktop</javadoc>) it belongs. Otherwise,
it is null.

How we update depends on the DOM content. In this example, we use HTML's
span to enclose the value, so we only need to change innerHTML.

```javascript
setValue: function(value) {
 if (this._value != value) {
  this._value = value;
  if (this.desktop) this.$n().innerHTML = zUtl.encodeXML(value);
 }
}
```
