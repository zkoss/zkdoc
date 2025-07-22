# Panelchildren

- Demonstration: [Panel Demo](https://www.zkoss.org/zkdemo/window/panel)
- Java API: [org.zkoss.zul.Panelchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Panelchildren.html)
- JavaScript API: [zul.wnd.Panelchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wnd.Panelchildren.html)

## Employment/Purpose

Panelchildren is a component used within the Panel component to manage each child element that will be displayed within the body of the Panel. It ensures that the size of Panelchildren is automatically calculated by the Panel, making properties such as `setWidth(String)`, `setHeight(String)`, `setHflex(String)`, and `setVflex(String)` read-only.

## Example

The following example demonstrates the usage of Panelchildren within Panel components:

![Panel Simple Examples](images/ZKComRef_Panel_Simple_Examples.png)

```xml
<zk>
    <panel height="100px" width="200px" style="margin-bottom:10px"
       title="Panel1" border="normal" maximizable="true"
       collapsible="true">
       <panelchildren>PanelContent1</panelchildren>
    </panel>
    <panel height="100px" width="200px" title="Panel2"
       border="normal" maximizable="true" style="margin-bottom:10px">
       <panelchildren>PanelContent2</panelchildren>
    </panel>
</zk>
```

Try it

* [Panelchildren Example](https://zkfiddle.org/sample/260lpts/1-ZK-Component-Reference-Panelchildren-Example?v=latest&t=Iceblue_Compact)


In the above example:
- Two Panel components are created with specified attributes such as height, width, title, border, and more.
- Inside each Panel, Panelchildren elements are used to define the content to be displayed within the Panel body.

## Supported Children

`*ALL`: Indicates that the `Panelchildren` component can have any kind of ZK component as its child element. This allows you to include any ZK component within the `Panelchildren`, providing flexibility and customization options for your designs.
