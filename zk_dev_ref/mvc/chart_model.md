Here we describe how to implement a chart model
(<javadoc type="interface">org.zkoss.zul.ChartModel</javadoc>). For the
concept of component, model and render, please refer to [the
Model-driven Display
section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

Depending on the type of chart you want, you could implement one of
<javadoc type="interface">org.zkoss.zul.PieModel</javadoc>,
<javadoc type="interface">org.zkoss.zul.XYModel</javadoc>,
<javadoc type="interface">org.zkoss.zul.GanttModel</javadoc>,
<javadoc type="interface">org.zkoss.zul.HiLoModel</javadoc>, etc. In
addition, there are default implementations for them you could use
directly, such as <javadoc>org.zkoss.zul.SimplePieModel</javadoc>,
<javadoc>org.zkoss.zul.SimpleXYModel</javadoc>, etc.

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
