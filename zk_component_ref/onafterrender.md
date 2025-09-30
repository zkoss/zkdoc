
# onAfterRender Event

The `onAfterRender` event is fired by components that support models after the data from the model has been rendered. This event is useful for performing actions after the UI has been updated with the model's data.

## Supported Components

The `onAfterRender` event is supported by the following components:

* `Combobox`
* `Grid`
* `Listbox`
* `Tree`
* `Biglistbox`
* `Cascader`
* `Linelayout`
* `Organigram`
* `Searchbox`
* `Stepbar`

## Use Case

A common use case for the `onAfterRender` event is to manipulate the rendered items, such as selecting an item by default or applying specific styles.

### Example: Select the first item in a Listbox

In this example, we have a `Listbox` that is populated from a `ListModel`. After the items are rendered, we want to select the first item.

**In the ZUL file:**

```xml
<listbox id="myListbox" model="${myModel}">
</listbox>
```

**In the Controller (Java):**

```java
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Listbox;
import org.zkoss.zul.event.ZulEvents;

public class MyController extends SelectorComposer<Component> {

    @Wire
    private Listbox myListbox;

    @Listen("onAfterRender = #myListbox")
    public void afterRender(Event event) {
        if (myListbox.getItemCount() > 0) {
            myListbox.setSelectedIndex(0);
        }
    }
}
```

## Event Details

The `onAfterRender` event is an instance of `org.zkoss.zk.ui.event.Event`. It does not carry any specific data, but it serves as a notification that the rendering process is complete.

### Event Firing

The event is fired in the following components under these conditions:

*   **`Combobox`**: After the items from the `ListModel` are rendered.
*   **`Grid`**: After the rows from the `ListModel` or `GroupsModel` are rendered.
*   **`Listbox`**: After the items from the `ListModel` or `GroupsModel` are rendered.
*   **`Tree`**: After the items from the `TreeModel` are rendered.

The event is defined in `org.zkoss.zul.event.ZulEvents` as `ON_AFTER_RENDER`.

## See Also

*   [ZK Developer's Reference: Model-driven Display](/zk_dev_ref/mvc/model)
*   [org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zul/org/zkoss/zul/Listbox.html)
*   [org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zul/org/zkoss/zul/Grid.html)
*   [org.zkoss.zul.Combobox](https://www.zkoss.org/javadoc/latest/zul/org/zkoss/zul/Combobox.html)
*   [org.zkoss.zul.Tree](https://www.zkoss.org/javadoc/latest/zul/org/zkoss/zul/Tree.html)
