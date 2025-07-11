When an organigram ([org.zkoss.zkmax.zul.Organigram](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Organigram.html))
is assigned with a model, a default renderer is assigned too[^1]. The
default renderer will assume that each Orgitem has one Orgnode, and it
converts the data into a string directly[^2]. If you want to change
render style or retrieve a particular field of the data, you have to
implement
[org.zkoss.zkmax.zul.OrgitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/OrgitemRenderer.html)
to handle the rendering.

For example,

```java
    public class MyRenderer implements OrgitemRenderer {
        public void render(Orgitem orgitem, Object data, int index) throws Exception {
            final Button button = new Button(Objects.toString(data));
            button.addEventListener(Events.ON_CLICK, new EventListener<Event>() {
                public void onEvent(Event event) {
                    Clients.showNotification(button.getLabel());
                }
            });

            Orgnode orgnode = new Orgnode();
            button.setParent(orgnode);
            orgnode.setParent(orgitem);
        }
    }
```

> ------------------------------------------------------------------------
>
> <references/>

[^1]: For the concept about component, model and renderer, please refer
    to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/list_model#Model-driven_Display).

[^2]: If the Organigram is assigned a template called `model`, then the
    template will be used to render the Organigram. For more
    information, please refer to [the Organigram Template section]({{site.baseurl}}/zk_dev_ref/mvc/organigram_template).
