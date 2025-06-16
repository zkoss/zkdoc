# Div

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Div</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Div</javadoc>

# Employment/Purpose

`Div` is one of the most lightweight containers to group child
components for, say, assigning CSS or making a more sophisticated
layout. It renders an HTML DIV tag in a browser. Div is displayed as a
block that the following sibling won't be displayed in the same vertical
position, as if there is a line break before and after it.

# align

To change the alignment of div, you can use CSS to achieve e.g.
`style="text-align:right"`

{% include RemovedSince.html version=10.0.0 %}

![](/zk_component_ref/images/ZKComRef_Div_Example.png)

``` xml
<div align="left" width="300px">
    <doublebox />
</div>
<div align="right" width="300px">
    <doublebox />
</div>
```

# Supported Events

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/XulElement#Supported_Events)

# Supported Children

`*ALL`

