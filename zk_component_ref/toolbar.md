---
title: "Toolbar"
---


- Demonstration: [Toolbar](http://www.zkoss.org/zkdemo/menu/toolbar)
- Java API: [org.zkoss.zul.Toolbar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Toolbar.html)
- JavaScript API: [zul.wgt.Toolbar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Toolbar.html)


# Employment/Purpose

A `toolbar` is used to place a series of buttons, such as
`toolbarbutton`or `button.`The toolbar buttons could be used without
toolbars, so a toolbar could be used without tool buttons. However, the
tool buttons change their appearance if they are placed inside a
toolbar.

The toolbar has two orientation: `horizontal`and `vertical.`It controls
how the buttons are placed.

See also : [ Button]({{site.baseurl}}/zk_component_ref/button),
[ Toolbarbutton]({{site.baseurl}}/zk_component_ref/toolbarbutton)

# Example

![](/zk_component_ref/images/ZKComRef_Toolbar_Example.png)

```xml
<window title="Toolbar window" border="normal" width="300px">
    <toolbar>
        <toolbarbutton label="Left" />
        <space />
        <toolbarbutton label="Right" image="/img/network.gif"
            dir="reverse" />
    </toolbar>
    <toolbar orient="vertical">
        <button label="Left" image="/img/network.gif" width="125px" />
        <toolbarbutton label="Right" image="/img/network.gif"
            dir="reverse" />
    </toolbar>
</window>
```

# overflowPopup

{% include version-badge.html version=8.6.0 %}

When `overflowPopup="true"`, a toolbar will have a `...` symbol that
shows a popup that contains those buttons not fitting in the toolbar.

Default: false.

![](/zk_component_ref/images/Toolbar-overflowPopup.png)

```xml
    <toolbar overflowPopup="true" width="350px" style="border: 1px black solid;">
        <toolbarbutton label="one" iconSclass="z-icon-home"/>
        <toolbarbutton label="two" iconSclass="z-icon-home"/>
        <toolbarbutton label="three" iconSclass="z-icon-home"/>
        <toolbarbutton label="four" iconSclass="z-icon-home"/>
        <toolbarbutton label="five" iconSclass="z-icon-home"/>
        <toolbarbutton label="six" iconSclass="z-icon-home"/>
    </toolbar>
```

# overflowPopupIconSclass

{% include version-badge.html version=9.6.0 %}

When overflowPopup="true", you can customize a toolbar `...` symbol just
specify the `overflowPopupIconSclass` attribute. For a complete list of
icons, please refer to [FontAwesome Cheatsheet](http://fontawesome.io/cheatsheet/).

Default: `...` symbol

![](/zk_component_ref/images/Toolbar-overflowPopupIconSclass.png)

```xml
    <toolbar overflowPopup="true" overflowPopupIconSclass="z-icon-plus-square" width="350px" style="border: 1px black solid;">
        <toolbarbutton label="one" iconSclass="z-icon-home"/>
        <toolbarbutton label="two" iconSclass="z-icon-home"/>
        <toolbarbutton label="three" iconSclass="z-icon-home"/>
        <toolbarbutton label="four" iconSclass="z-icon-home"/>
        <toolbarbutton label="five" iconSclass="z-icon-home"/>
        <toolbarbutton label="six" iconSclass="z-icon-home"/>
    </toolbar>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar. It is suggested to set mold to panel while toolbar is in the
footer of a panel.

| Name | Snapshot |
|---|---|
| default | ![](/zk_component_ref/images/toolbar_mold_default.png) |
| panel | ![](/zk_component_ref/images/toolbar_mold_panel.png) |

# Supported Children

`*ALL`


