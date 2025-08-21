---
title: "Tooltips, Context Menus and Popups"
---

The support of tooltips, context menus and popups is generic. Any
components inherited from
[org.zkoss.zul.impl.XulElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html) can handle them in the
same way.

To enable any of them, you have to prepare a component representing the
customized look, and then specify this component or its ID in the
corresponding properties (such as
[org.zkoss.zul.impl.XulElement#setTooltip(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setTooltip(java.lang.String)))
in the target component. Then, when the user triggers it (such as moving
the mouse over the target component), the component representing the
customized look is shown.

The component representing the customized look must be a
[Popup]({{site.baseurl}}/zk_component_ref/popup)
component or one of derives, such as
[Menupopup]({{site.baseurl}}/zk_component_ref/menupopup),
while the target component (which causes the customized look to show up)
can be any kind of component.

| What          | Condition                                                                 | API                                                                                                                                                                                 |
|---------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tooltips[^1]  | When the user moves the mouse point over the target component for a while | [org.zkoss.zul.impl.XulElement#setTooltip(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setTooltip(java.lang.String)) or [org.zkoss.zul.impl.XulElement#setTooltip(org.zkoss.zul.Popup)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setTooltip(org.zkoss.zul.Popup)) |
| Context Menus | When the user clicks the *right* button on the target component           | [org.zkoss.zul.impl.XulElement#setContext(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setContext(java.lang.String)) or [org.zkoss.zul.impl.XulElement#setContext(org.zkoss.zul.Popup)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setContext(org.zkoss.zul.Popup)) |
| Popups        | When the user clicks the *left* button on the target component            | [org.zkoss.zul.impl.XulElement#setPopup(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setPopup(java.lang.String)) or [org.zkoss.zul.impl.XulElement#setPopup(org.zkoss.zul.Popup)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setPopup(org.zkoss.zul.Popup))     |


# Tooltips

To provide a custom tooltip, you could specify the ID of the custom
tooltip in the target component's `tooltip`
([org.zkoss.zul.impl.XulElement#setTooltip(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setTooltip(java.lang.String))
or
[org.zkoss.zul.impl.XulElement#setTooltip(org.zkoss.zul.Popup)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setTooltip(org.zkoss.zul.Popup))).
For example,

```xml
<zk>
    <image src="/img/earth.png" tooltip="msg"/>

    <menupopup id="msg">
        <menuitem label="Undo"/>
        <menuitem label="Redo"/> 
        <menu label="Sort">
            <menupopup>
                <menuitem label="Sort by Name" autocheck="true"/>
                <menuitem label="Sort by Date" autocheck="true"/>
            </menupopup>
        </menu>
    </menupopup>
</zk>
```

Then, when the user moves the mouse pointer over the image for a while,
the menupopup will show up as shown below.

![]({{site.baseurl}}/zk_dev_ref/images/drtooltip.png)

The time to wait before showing up the tooltip can be configured. Please
refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_tooltip_delay_element)
for more information.

# Context Menus

Providing a customized context menu is the same, except it uses the
`context` property instead. For example,

```xml
<zk>
    <listbox>
        <listitem label="Right Click Me!" context="status"/>
    </listbox>

    <popup id="status" width="300px">
        <vlayout>
            This user is online now !
            <a label="Mail him/her"/>
        </vlayout>
    </popup>
</zk>
```

![]({{site.baseurl}}/zk_dev_ref/images/drcontext.png)

As shown above, you could use [org.zkoss.zul.Popup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Popup.html) so
the context menu is not limited to a menupopup.

Here is another example: context menus versus right clicks.

```xml
<zk>
    <menupopup id="editPopup">
        <menuitem label="Undo"/>
        <menuitem label="Redo"/>
        
        <menu label="Sort">
            <menupopup>
                <menuitem label="Sort by Name" autocheck="true"/>
                <menuitem label="Sort by Date" autocheck="true"/>
            </menupopup>
        </menu>
    </menupopup>
    
    <label value="Right Click Me!" context="editPopup"/>
    <separator bar="true"/>
    <label value="Right Click Me!" onRightClick="alert(self.value)"/>
</zk>
```

![](/zk_dev_ref/images/100000000000017500000052E60F488A.png)

Notice that the `menupopup` is not visible until a user right-clicks on
a component that is associated with its' ID.

**Tip:** If you want to disable browser's default context menu, you can
set the `context` attribute of a component to a non-existent ID.

The `popup` component is a generic popup and you are able to place any
kind of component inside of popup. For example,

```xml
<zk>
    <label value="Right Click Me!" context="any"/>
</zk>
```

```xml
<zk>
    <label value="Right Click Me!" context="any"/>
    
    <popup id="any" width="300px">
        <vbox>
             It can be anything.
            <toolbarbutton label="ZK" href="http://www.zkoss.org/"/>
        </vbox>
    </popup>
</zk>
```

# Popups

Providing a customized popup is the same, except it uses the `popup`
property instead. For example,

```xml
<zk>
    <label value="Click Me!" popup="status"/>

    <popup id="status" width="300px">
        <vlayout>
            This user is online now !
            <a label="Mail him/her"/>
        </vlayout>
    </popup>
</zk>
```

## Position of Popup

The context-menu/tooltip/popups can be shown by a position from Popup or
the location of x and y, you can specify position with the following
format:

```xml
<zk>
    <label value="Click Me!" popup="status, at_pointer"/>
    <label value="Click Me!" popup="status, after_pointer"/>
    <label value="Click Me!" popup="status, position=before_start"/><!-- And other 20 positions -->
    <label value="Click Me!" popup="status, x=30, y=30"/><!-- Fixed positions -->

    <popup id="status" width="300px">
        <vlayout>
            This user is online now !
            <a label="Mail him/her"/>
        </vlayout>
    </popup>
</zk>
```

Check [Popup Component]({{site.baseurl}}/zk_component_ref/popup#A_Way_to_Specify_the_Position_of_the_Popup_Component)
for detailed description.

The position is now more customizable and can be done by specifying a
formula that executes on client side, for example,

```xml
<zk>
    <!-- bottom right of mouse pointer -->
    <label value="Click Me!" popup="status, x=(zk.currentPointer[0] + 30), y=(zk.currentPointer[1] + 50)"/>

    <popup id="status" width="300px">
        <vlayout>
            This user is online now !
            <a label="Mail him/her"/>
        </vlayout>
    </popup>
</zk>
```

With `x=(zk.currentPointer[0] + 30), y=(zk.currentPointer[1] + 50)`
arguments, the popup position will be on the bottom right of the current
mouse pointer.

**Note:** The parentheses '()' are required to dynamically calculate
position on the client side.

## Scrolling Behavior with `data-scrollable`

For popups displayed within scrollable containers, the client-side `data-scrollable` attribute can be used to control whether the popup scrolls along with the container. This attribute is particularly relevant for error boxes, combobox popups, and datebox popups.

For more details, refer to the [`data-scrollable` client attribute documentation](/zuml_ref/data_scrollable).

## Toggle Popup

The context-menu/popup supports toggle type in ZK 7.0.0. Check [ Popup Component]({{site.baseurl}}/zk_component_ref/popup#Toggle_Popup)
for detailed description.

## Override the Reference Component

The reference component of the position can be overridden in ZK 9.5.0.
For example, you want the popup to stick to the `Textbox`, not the
triggering button.

```xml
<zk>
  <inputgroup>
    <textbox id="addr"/>
    <button label="more" popup="pp, ref=addr, position=after_start"/>
  </inputgroup>

  <!-- Your popup -->
  <popup id="pp">
    show something
  </popup>
</zk>
```

# Limitation of iOS

## Tooltips

Since there is no mouse move event in iOS, the tooltip won't be shown.

## Context Menu

ZK Client Engine will simulate the context menu, if the user touches the
DOM element associated with the contextmenu property and holds for a
while.

![]({{site.baseurl}}/zk_dev_ref/images/events_1_finger.jpg)

## Popup

Like onClick, ZK Client Engine simulates the click, if the user touches
the DOM element associated with the popup property.

For more information, please refer to [Safari Developer Library](http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW1).

# Version History

| Version | Date           | Content                                                                                                         |
|---------|----------------|-----------------------------------------------------------------------------------------------------------------|
| 5.0.7   | May 2011       | Context Menus supported with iOS                                                                                |
| 9.5.0   | September 2020 | [ZK-4551](https://tracker.zkoss.org/browse/ZK-4551): Support ref override for position of Popup/Tooltip/Context |

[^1]: Notice that if you'd like to have different text for the tooltip
    (rather than a fully customized look), you shall use
    [org.zkoss.zk.ui.HtmlBasedComponent#setTooltiptext(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setTooltiptext(java.lang.String))
    instead (which is easier to use).
