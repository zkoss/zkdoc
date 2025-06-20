# each - java.lang.Object

The current item of the collection being iterated, when ZK evaluates an
iterative element. An iterative element is an element with the forEach
attribute.

```xml
<listbox width="100px">
    <listitem label="${each}" forEach="${contacts}" />
</listbox>
```

## Nested forEach

To retrieve the index of the iteration, or the previous `each` object in
nested forEach, you have to use another implicit object called
[forEachStatus](ZUML_Reference/EL_Expressions/Implicit_Objects/forEachStatus).

```xml
<listbox forEach="${matrix}">
    <listitem label="${forEachStatus.previous.each.label}: ${each}" forEach=${each.items}/> <!-- nested-->
</listbox>
```

## In Java

You could access the `each` object directly in zscript such as:

```xml
<window>
    <button label="${each}" forEach="apple, orange">
        <zscript>
   self.parent.appendChild(new Label("" + each));
        </zscript>
    </button>
</window>
```

The `each` object is actually stored in the parent component's
attribute, so you could retrieve it in pure Java as follows.

```java
public class Foo implements Composer {
    public void doAfterCompose(Component comp) throws Exception {
        Object each = comp.getParent().getAttribute("each"); //retrieve the each object
        ForEachStatus forEachStatus = (ForEachStatus)comp.getParent().getAttribute("forEachStatus");
        //...
    }
}
```

If the component is a root, you could retrieve them from page's
attributes
(<javadoc method="getAttribute(java.lang.String)" type="interface">org.zkoss.zk.ui.Page</javadoc>).

However, the value of `each` is reset after the XML element that
`forEach` is associated has been evaluated. Thus, you cannot access it
in an event listener, unless you store the value first. For more
information, please refer to [ZK Developer's Reference: Iterative Evaluation]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/iterative_evaluation).


