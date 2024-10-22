

There are 2 scopes to customize the drag-and-drop effects: per-widget
and application scope.

# Per-Widget Customization

<javadoc directory="jsdoc">zk.Widget</javadoc> has a set of methods for
handling drag-and-drop. You could customize them based on your
requirement.

If you want to customize a particular widget, you could do as
follows[^1].

``` javascript
var superwgt = {};
zk.override(wgt, superwgt, {
    initDrag_: function () {
        //your implementation
        superwgt.initDrag_.apply(this, arguments); //if you want to call back the default implementation
    }
});
```

If you want to override all widgets of particular class, say, Combobox,
you could do as follows.

``` javascript
var supercomobox = {};
zk.override(zul.inp.Combobox.prototype, supercomobox, {
    initDrag_: function () {
        //your implementation
        supercomobox.initDrag_.apply(this, arguments); //if you want to call back the default implementation
    }
});
```

If you override <javadoc directory="jsdoc">zk.Widget</javadoc>, then all
widgets are affected[^2].

``` javascript
var supercomobox = {};
zk.override(zul.inp.Combobox.prototype, supercomobox, {
    initDrag_: function () {
        //your implementation
        supercomobox.initDrag_.apply(this, arguments); //if you want to call back the default implementation
    }
});
```

Custom widget class approach: you can extend a default ZK widget class
into your own extended widget class. This class can be assigned from zul
using the `xmlns:w="client"` namespace, and the
`w:use="custom.MyCustomClass"` [attribute on the target
component](ZK_Client-side_Reference/General_Control/Widget_Customization#Specify_Your_Own_Widget_Class),
or using
[component.setWidgetClass(...)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html#setWidgetClass-java.lang.String-)
from Java.

``` javascript
    zk.$package("custom");
    zk.afterLoad("zul.wgt", function () {
        custom.MyButton = zk.$extends(zul.wgt.Button, {
            dropEffect_: function (onHovering) {
              this.$supers("dropEffect_", arguments);
              if(onHovering){
                  jq(this).addClass("customdrop");
              }else{
                  jq(this).removeClass("customdrop");
              }
            }
      });
    });
```

Here is a list of methods you could override. For a complete list,
please refer to <javadoc directory="jsdoc">zk.Widget</javadoc>.

<table>
<thead>
<tr class="header">
<th><p>Method</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><javadoc method="dropEffect_(boolean)" directory="jsdoc">zk.Widget</javadoc></p></td>
<td><p>Called to have some visual effect when the user is dragging a
widget over this widget and this widget is droppable. Notice it is the
effect to indicate that a widget is droppable.</p></td>
</tr>
<tr class="even">
<td><p><javadoc method="onDrop_(zk.Draggable, zk.Event)" directory="jsdoc">zk.Widget</javadoc></p></td>
<td><p>Called to fire the onDrop event. You could override it to
implement some effects to indicate dropping.</p></td>
</tr>
<tr class="odd">
<td><p><javadoc method="getDragOptions_(_global_.Map)" directory="jsdoc">zk.Widget</javadoc></p></td>
<td><p>Returns the options used to instantiate
<javadoc directory="jsdoc">zk.Draggable</javadoc>. There is a lot what
you could customize with this method, since the options control many
effects, such <code>starteffect</code>, <code>endeffect</code>,
<code>change</code> and so on. Note: the dragOptions map received as
parameter in this function is a global "static" object shared by every
instances of drag and drop in the page. If you make modifications to
this object directly, they will apply to every drag and drop workflow
triggered subsequently. A simple way to do a punctual change to the drag
behavior is to copy the object, then modify and return the copy.</p>
<pre><code>                getDragOptions_: function(map) {
                    if(windowOptions == null){
                        windowOptions = zk.copy(new Map(),map);
                        //Commented out: chain effect from multiple overrides
                        //var oldstarteffect = map.starteffect;
                        windowOptions.starteffect = function(dg) {
                            //oldstarteffect.apply(this,arguments);
                            jq(dg.node).css(&quot;background-color&quot;,&quot;yellow&quot;);
                        }
                    }
                    return windowOptions;
                }</code></pre>
<p>Please refer to <javadoc directory="jsdoc">zk.Draggable</javadoc> and
the source code for more information.</p></td>
</tr>
<tr class="even">
<td><p><javadoc method="cloneDrag_(zk.Draggable, _global_.Offset)" directory="jsdoc">zk.Widget</javadoc></p></td>
<td><p>Called to create the visual effect representing what is being
dragged. In other words, it creates the DOM element that will be moved
with the mouse pointer when the user is dragging.</p></td>
</tr>
<tr class="odd">
<td><p><javadoc method="uncloneDrag_(zk.Draggable)" directory="jsdoc">zk.Widget</javadoc></p></td>
<td><p>Undo the visual effect created by
<javadoc method="cloneDrag_(zk.Draggable, _global_.Offset)" directory="jsdoc">zk.Widget</javadoc>.
In other words, it removes the DOM element that was created.</p></td>
</tr>
</tbody>
</table>

> ------------------------------------------------------------------------
>
> <references/>

## Droppable Visual Feedback

When you drag a listitem to a droppable component, it shows a plus icon:
![](images/is-droppable.png "is-droppable.png")

If drag it to a non-droppable component, it shows a ban icon:
![](images/not-droppable.png "not-droppable.png")

But other components don't provide this visual feedback by default, you
need to override a Widget's `getDragMessage_()` and return a text, see
[drag-feedback.js](https://github.com/zkoss/zkbooks/blob/master/clientreference/src/main/webapp/customization).

# Application Scope Customization

<javadoc directory="jsdoc">zk.DnD</javadoc> provides a collection of
drag-and-drop utilities. By customizing it, all widgets in the whole
application will be affected.

For example, if you would like to customize ''ghosting" of the DOM
element being dragged, you can override
<javadoc method="ghost(zk.Draggable, _global_.Offset, _global_.String)" directory="jsdoc">zk.DnD</javadoc>
as follows.

``` javascript
var superghost = zk.DnD.ghost;
zk.DnD.ghost = function (drag, ofs, msg) {
    if (msg != null)
        return superghost(drag, ofs, msg);
   //do whatever you want
}
```

[^1]: <javadoc method="override(java.lang.Object, _global_.Map, _global_.Map)" directory="jsdoc">\_global\_.zk</javadoc>
    is a utility to simplify the overriding of a method.

[^2]: It is also a browser-level customization
