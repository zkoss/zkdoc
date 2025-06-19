Here we describe how to implement a custom renderer for a tabbox
(<javadoc type="interface">org.zkoss.zul.TabboxRenderer</javadoc>). For
the concepts about component, model and renderer, please refer to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

When a tabbox ([org.zkoss.zul.Tabbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabbox.html)) is assigned with
a model, a default renderer is assigned too. The default renderer will
assume that each tab has only one tabpanel, and it converts the data
into a string directly[^1]. If you want to display a rich tabpanel or
retrieve a particular field of the data, you have to implement
<javadoc type="interface">org.zkoss.zul.TabboxRenderer</javadoc> to
handle the rendering.

For example,

```java
public class MyRenderer implements TabboxRenderer{
    public void renderTab(Tab tab, Object data, int index) {
        tab.setLabel("New -- " + data);
    }
    public void renderTabpanel(Tabpanel tabpanel, Object data, int index) {
        tabpanel.appendChild(new Label("New -- " + data));
    }
}
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: If the tabbox is assigned a template called `model:tab` and
    `model:tabpanel`, then the template will be used to render the
    tabbox. For more information, please refer to [the Tabbox Template section]({{site.baseurl}}/zk_dev_ref/mvc/view/template/tabbox_template).
