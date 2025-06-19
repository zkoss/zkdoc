# Caption

- **Demonstration**: [Groupbox](https://www.zkoss.org/zkdemo/layout/group_box)
- **Java API**: [org.zkoss.zul.Caption](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Caption.html)
- **JavaScript API**: [zul.wgt.Caption](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Caption.html)

## Employment/Purpose

The Caption component serves as a header for various UI components such as Groupbox, Window, Panel, Tab, and LayoutRegion. It provides the functionality to display a simple text label using the `setLabel` method or to include child elements for a more complex caption design.

### Preload Image

**Since**: 6.0.0

The preload image feature is applicable to all LabelImageElement and Image components. By default, the preload function is disabled, and users need to specify custom attributes and set them to true. For instance:

```xml
<caption image="xxx.png" label="caption">
  <custom-attributes org.zkoss.zul.image.preload="true"/>
</caption>
```

Alternatively, the custom attributes can be specified below the root component as shown in the following example:

```xml
<window>
  <custom-attributes org.zkoss.zul.image.preload="true"/>
  <caption image="xxx.png" label="caption">
    <image src="xxx.png"/>
  </caption>
</window>
```

The custom attributes will be checked recursively in the component tree.

## Example

The example showcases the usage of the Caption component within a Window and Groupbox components, both of which support Caption as their title.

![Caption Example](ZKComRef_Caption_Example.png)

```xml
<zk>
    <window border="normal" width="350px">
        <caption label="This is a caption"/>
        <groupbox width="300px">
            <caption label="fruits"/>
            <radiogroup onCheck="fruit.value = self.selectedItem.label">
                <radio label="Apple"/>
                <radio label="Orange"/>
                <radio label="Banana"/>  
            </radiogroup>
        </groupbox>
    </window>
</zk>
```

Try it
*  [Caption with Window](https://zkfiddle.org/sample/3scdgri/1-ZK-Component-Reference-Caption-Example?v=latest&t=Iceblue_Compact)

## Supported Children
`*ALL`: Indicates that the Caption component can have any kind of ZK component as its child element. This means that you can include any ZK component within the Caption component, allowing for flexible and customizable caption designs.
