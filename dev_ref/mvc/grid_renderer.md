When a <javadoc>org.zkoss.zul.Grid</javadoc> is assigned with a model, a
default renderer is assigned too (see [the Model-driven Display
](ZK_Developer's_Reference/MVC/Model/List_Model#Model-driven_Display)).
The default renderer will assume that each row has only one column, and
it converts the data into a string directly[^1]. If you want to display
multiple columns or retrieve a particular field of the data, you have to
implement <javadoc type="interface">org.zkoss.zul.RowRenderer</javadoc>
to handle the rendering and assign it by
[setRowRenderer()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setRowRenderer-org.zkoss.zul.RowRenderer-).

For example,

``` java
public class FoodGroupRenderer implements RowRenderer, java.io.Serializable {
    public void render(Row row, Object obj, int index) {
        if (row instanceof Group) {
            row.appendChild(new Label(obj.toString()));
        } else {
            User user = (User) obj;
            row.appendChild(new Label(user.getName()));
            row.appendChild(new Label(user.getDescription()));
            row.appendChild(new Label(user.getDomain()));
        }
    }
}
```

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date          | Content                            |
|---------|---------------|------------------------------------|
| 6.0.0   | February 2012 | The index argument was introduced. |

[^1]: If the grid is assigned a template called `model`, then the
    template will be used to render the grid. For more information,
    please refer to [the Grid Template
    section](ZK_Developer's_Reference/MVC/View/Template/Grid_Template).
