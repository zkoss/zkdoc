---
title: "Div"
---


- **Java API:** [org.zkoss.zul.Div](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Div.html)
- **JavaScript API:** [zul.wgt.Div](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Div.html)

## Employment/Purpose
The `Div` component is a lightweight container used to group child components for various purposes such as assigning CSS styles or creating more complex layouts. It functions similarly to an HTML `<div>` tag, displaying as a block element with line breaks before and after it. This component is commonly used for organizing content and defining structure within a ZK application.

## Example
The example demonstrates the usage of the `Div` component by creating two separate div containers, each containing a `doublebox` component. The first `div` aligns its content to the left within a width of 300px, while the second `div` aligns its content to the right within the same width.

![Div Example](images/ZKComRef_Div_Example.png)

```xml
<zk>
    <div style="text-align:left" width="300px">
        <doublebox />
    </div>
    <div style="text-align:right" width="300px">
        <doublebox />
    </div>
</zk>
```

Try it
*  [Div with text alignment](https://zkfiddle.org/sample/1d30bqc/1-ZK-Component-Reference-Div-Example?v=latest&t=Iceblue_Compact)

## Supported Children

`*ALL`: Indicates that the Div component can have any kind of ZK component as its child element. This allows you to include any ZK component within the Div, providing flexibility and customization options for your designs.
