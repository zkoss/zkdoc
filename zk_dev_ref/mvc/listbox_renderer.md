Here we describe how to implement a custom renderer for a listbox
(<javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc>).
For the concepts about component, model and renderer, please refer to
[the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

When a listbox ([org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html)) is assigned
with a model, a default renderer is assigned too. The default renderer
will assume that each list item has only one column, and it converts the
data into a string directly[^1]. If you want to display multiple columns
or retrieve a particular field of the data, you have to implement
<javadoc type="interface">org.zkoss.zul.ListitemRenderer</javadoc> to
handle the rendering.

For example,

```java
public class MyRenderer implements ListitemRenderer{
    public void render(Listitem listitem, Object data, int index) {
        Listcell cell = new Listcell();
        listitem.appendChild(cell);
        if (data instanceof String[]){
            cell.appendChild(new Label(((String[])data)[0].toString()));
        } else if (data instanceof String){
            cell.appendChild(new Label(data.toString()));
        } else {
            cell.appendChild(new Label("UNKNOW:"+data.toString()));
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

[^1]: If the listbox is assigned a template called `model`, then the
    template will be used to render the listbox. For more information,
    please refer to [the Listbox Template section]({{site.baseurl}}/zk_dev_ref/mvc/view/template/listbox_template).
