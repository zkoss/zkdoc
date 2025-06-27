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
