---
title: "Biglistbox Renderer"
---

The implementation of a custom renderer for a Biglistbox
([org.zkoss.zkmax.zul.MatrixRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/MatrixRenderer.html))
is straightforward[^1]:

```java
public class DataRenderer implements org.zkoss.zkmax.zul.MatrixRenderer<List<String>> {
 
    @Override
    public String renderCell(Component owner, List<String> data,
            int rowIndex, int colIndex) throws Exception {
        String d = data.get(colIndex);
        d = d.replace("ZK", "<span class='red' title='ZK'>ZK</span>")
                .replace("Hello", "<span class='blue' title='Hello'>Hello</span>");
        return "<div class='images_" + (colIndex%28) + "' title='x=" +
        colIndex + ",y=" + rowIndex + "'>" + d + "</div>";
    }
 
    @Override
    public String renderHeader(Component owner, List<String> data,
            int rowIndex, int colIndex) throws Exception {
        return "<div class='images_" + (colIndex % 28) + "' title='"
                + images[colIndex % 28] + "'>" + data.get(colIndex)
                + "</div>";
    }
}
```

Then, if we have a list model
([org.zkoss.zkmax.zul.MatrixModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/MatrixModel.html)) called `data`, and
an instance of a custom renderer called `dataRenderer`, then we can put
them together in a ZUML document as follows:

```xml
<biglistbox model="${data}" matrixRenderer="${dataRenderer}"/>
```

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date       | Content                    |
|---------|------------|----------------------------|
| 6.0.1   | March 2012 | Biglistbox was introduced. |

[^1]: For the concept about component, model and renderer, please refer
    to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/list_model#Model-driven_Display).
