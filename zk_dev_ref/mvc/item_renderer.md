
For those components that have no child components e.g.
[Chosenbox]({{site.baseurl}}/zk_component_ref/chosenbox),
[Selectbox]({{site.baseurl}}/zk_component_ref/selectbox),
[Cascader]({{site.baseurl}}/zk_component_ref/cascader), and
[Searchbox]({{site.baseurl}}/zk_component_ref/searchbox), their built-in
renderers will directly wrap your data into an HTML snippet. Hence if your
model data contains
[those characters that need to be escaped](https://www.w3.org/International/questions/qa-escapes#use)
like `<`, `>`, `&`, you must escape them. You can call ZK's
[XMLs.escapeXML()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xml/XMLs.html#escapeXML-java.lang.String-)
or
[Strings.escapeJavaScript()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/lang/Strings.html#escapeJavaScript-java.lang.String-).

Implementing your own
([org.zkoss.zul.ItemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ItemRenderer.html))
can customize how a component renders data in a browser without javascript.
(For the concepts about component, model, and renderer, please refer to
[the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/list_model#Model-driven_Display)).
Notice that `ItemRenderer` should return an HTML snippet that is different from
[org.zkoss.zul.ListitemRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListitemRenderer.html)
that creates components.

**Render an item with a tooltip**

```java
public class TooltipRenderer implements ItemRenderer {
    @Override
    public String render(Component owner, Object data, int index) throws Exception {
        return String.format("<span title=\"%s\" style=\"width: 100%%;display: inline-block;\">%s</span>", data, data);
    }
}
```

# Usage

Assume we have a tree model ([org.zkoss.zul.TreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/TreeModel.html))
called `district`, and an instance of a custom renderer called
`districtRenderer`, we can put them together in a ZUML document as
follows:

```xml
<cascader model="${district}" itemRenderer="${districtRenderer}"/>
```

Specify FQCN at `itemRenderer`

```xml
<cascader model="${model}" itemRenderer="org.zkoss.reference.component.input.TooltipRenderer"/>
```
