Here we describe how to implement a chart model
([org.zkoss.zul.ChartModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ChartModel.html)). For the
concept of component, model and render, please refer to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

Depending on the type of chart you want, you could implement one of
[org.zkoss.zul.PieModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/PieModel.html),
[org.zkoss.zul.XYModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/XYModel.html),
[org.zkoss.zul.GanttModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GanttModel.html),
[org.zkoss.zul.HiLoModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/HiLoModel.html), etc. In
addition, there are default implementations for them you could use
directly, such as [org.zkoss.zul.SimplePieModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimplePieModel.html),
[org.zkoss.zul.SimpleXYModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleXYModel.html), etc.

For example, we could have a composer as follows.

```java
public class ProgrammerModelComposer extends SelectorComposer<Component> {
    public void doAfterCompose(Component comp) throws Exception {
        PieModel piemodel = new SimplePieModel();
        piemodel.setValue("C/C++", new Double(12.5));
        piemodel.setValue("Java", new Double(50.2));
        piemodel.setValue("VB", new Double(20.5));
        piemodel.setValue("PHP", new Double(15.5));
        ((Chart) comp).setModel(piemodel);
    }
}
```

Then, you could use it in a ZUML document:

```xml
<chart title="Pie Chart" width="500" height="250" type="pie" threeD="false" fgAlpha="128"
 apply="foo.ProgrammerModelComposer"/>
```
