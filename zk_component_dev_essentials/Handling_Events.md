The next logical step is to add an event to our ZK component. For this
we are going to add some more functionality to the SimpleLabel. A new
div will be added which when clicked should clear the displayed text and
fire a custom event named <mp>onClear</mp>.

This means that firstly we need to change the mold of the label to
include a div which can be used as a target. The code below satisfies
this requirement:

```javascript
function (out) {
 out.push('<span', this.domAttrs_(), '><div id="value" style="float:left;">', this.getValue(), '</div><div id="target" style="float:left;cursor: pointer; cursor: hand;height:20px;width:20px;background-color:red;"></div></span>');
}
```

As you can see we have now split the contents of label into two by
introducing two div tags, one will be used to display the value and the
other will be a click target.
