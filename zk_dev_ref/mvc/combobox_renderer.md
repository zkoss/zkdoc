---
title: "Combobox Renderer"
---

When a combobox ([org.zkoss.zul.Combobox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobox.html)) is assigned
with a model, a default renderer is assigned too[^1]. The default
renderer will assume that the combobox displays the data as a
string[^2]. If you want to display more sophisticated information or
retrieve a particular field of the data, you have to implement
[org.zkoss.zul.ComboitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ComboitemRenderer.html) to
handle the rendering.

For example,

```java
public class MyRenderer implements ComboitemRenderer {
    public void render(Comboitem item, Object data, int index) throws Exception {
        item.setLabel(((User)data).getName());
        item.setDescription(((User)data).getDescription());
    }
}
```


# Version History

| Version | Date          | Content                            |
|---------|---------------|------------------------------------|
| 6.0.0   | February 2012 | The index argument was introduced. |

[^1]: For the concept about component, model and renderer, please refer
    to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/list_model#Model-driven_Display).

[^2]: If the tree is assigned a template called `model`, then the
    template will be used to render the tree. For more information,
    please refer to [the Tree Template section]({{site.baseurl}}/zk_dev_ref/mvc/tree_template).
