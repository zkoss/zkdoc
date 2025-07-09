# Groupbox

- **Demonstration:** [Groupbox Demo](https://www.zkoss.org/zkdemo/layout/group_box)
- **Java API:** [org.zkoss.zul.Groupbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Groupbox.html)
- **JavaScript API:** [zul.wgt.Groupbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Groupbox.html)

## Employment/Purpose
The Groupbox component in ZK is used to group related components together visually. It provides a border around the components to indicate their relationship. The label displayed at the top of the group box can be created using the [Caption](caption.md) component, similar to the HTML legend element. Unlike the [Window](window.md) component, a group box does not own the ID space and cannot be overlapped or popped up.

## Example
In the provided example, a Groupbox is used to group a set of Radio components under the label "Fruits."

![Groupbox_Example](ZKComRef_Groupbox_Example.png)
```xml
 <groupbox width="350px">
     <caption label="Fruits"/>
     <radiogroup>
         <radio label="Apple"/>
         <radio label="Orange"/>
         <radio label="Banana"/>
     </radiogroup>
 </groupbox>
```

Try it
*  [Groupbox with Caption](https://zkfiddle.org/sample/1j5b78e/1-ZK-Component-Reference-Groupbox-Example?v=latest&t=Iceblue_Compact)


### Java Example
In the Java code example, a Groupbox is created and customized with a Caption, a specific width, content, and an event listener for the onOpen event.

```java
Groupbox gb = new Groupbox();

new Caption("Here is Caption").setParent(gb);

gb.setMold("3d");
gb.setWidth("200px");
gb.appendChild(new Label("Here is Content"));

// Register an onOpen event.
gb.addEventListener(Events.ON_OPEN, new EventListener() {
    public void onEvent(Event event) throws Exception {
        if (((OpenEvent)event).isOpen()) {
            // Do something you want.
        }
    }
});
gb.setParent(outer);
```

## Properties
### ContentStyle
Specifies the CSS style for the content block of the groupbox.

![Groupbox_ContentStyle](ZKComRef_Groupbox_ContentStyle.png)

```xml
<groupbox width="350px" mold="3d"
    contentStyle="border: 3px blue dashed;border-top:0px">
    <caption label="Fruits"/>
    <radiogroup>
        <radio label="Apple"/>
        <radio label="Orange"/>
        <radio label="Banana"/>
    </radiogroup>
</groupbox>
```

Try it

*  [Groupbox ContentStyle](https://zkfiddle.org/sample/1k2vv2g/1-ZK-Component-Reference-Groupbox-ContentStyle-Example?v=latest&t=Iceblue_Compact)


### ContentSclass
Specifies the CSS class for the content block of the groupbox.

![Groupbox_ContentStyle](ZKComRef_Groupbox_ContentStyle.png)

```xml
<zk>
    <style>
    .mygroupbox-cnt {
        border: 3px blue dashed;
        border-top:0px
    }
    </style>
    <groupbox width="350px" mold="3d"
        contentSclass="mygroupbox-cnt">
        <caption label="Fruits"/>
        <radiogroup>
            <radio label="Apple"/>
            <radio label="Orange"/>
            <radio label="Banana"/>
        </radiogroup>
    </groupbox>
</zk>
```

Try it

* [Groupbox ContentSclass](https://zkfiddle.org/sample/304je74/1-ZK-Component-Reference-Groupbox-ContentSclass-Example?v=latest&t=Iceblue_Compact)

### Closable
Default: `true`.

Specifies whether the groupbox can be collapsed or not.

For example,

```xml
<groupbox width="350px" mold="3d" closable="true">
```
**Note**: the function can only be applied when the [Caption](caption.md) or the title attribute exists.

### Open/Close
Default: `true`.

Specifies the display of the groupbox, whether it is open or closed.

For example,

```xml
<groupbox width="250px" mold="3d" open="false">
```
**Note**: false means the groupbox is closed, i.e., no content can appear.

### Configure to Use the 3d Mold as Default
To set the 3d mold as the default for all Groupbox components, add the following configuration to `/WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.zul.Groupbox.mold</name>
    <value>3d</value>
</library-property>
```

## Supported Events

| Name**   | Event Type                            |Description |
|----------|-----------------------------------------|------------|
| `onOpen` | **Event:** [OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | The `onOpen` event signifies that the user has opened or closed a component. Unlike the `onClose` event, `onOpen` serves as a notification event sent after the opening or closing of the component. |

## Supported Molds
The available molds for the Groupbox component are:

| Name    | Snapshot                            |
|---------|-------------------------------------------|
| `default`   | ![Groupbox_mold_default](Groupbox_mold_default.png)|
| `3d`   | ![Groupbox_mold_3d](Groupbox_mold_3d.png)|

## Supported Children

`*ALL`: Indicates that the Groupbox component can have any kind of ZK component as its child element. This allows you to include any ZK component within the Groupbox, providing flexibility and customization options for your designs.

Note: Only one [`Caption`](caption.md) component is allowed in the `Groupbox` and it must be the first component.