---
title: "Combobutton"
---


- Demonstration:
- Java API: [org.zkoss.zul.Combobutton](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobutton.html)
- JavaScript API:
  [zul.wgt.Combobutton](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Combobutton.html)


# Employment/Purpose

A Combobutton is a special Button that embeds a popup or menupopup
child.

You could assign a `label` and an `image` to a Combobutton by the
`label` and `image` properties. If both are specified, the `dir`
property control which is displayed up front, and the `orient` property
controls whether the layout is horizontal or vertical, the `autodrop`
property control whether the child popup/menupopup open while mouseover
and close while mouseout the right side drop down icon of Combobutton
automatically.

When the user clicks the drop down icon of Combobutton, the child
popup/menupopup of the Combobutton will be displayed.

# Example

- Combobutton with Popup

![](/zk_component_ref/images/ZKComRef_Combobutton_with_Popup.jpg)

```xml
    <combobutton label="popup" image="/img/network.gif">
        <popup>
            <vbox>
                <hbox>
                    Search
                    <textbox />
                </hbox>
                <listbox width="200px">
                    <listhead>
                        <listheader label="Name" />
                        <listheader label="Description" />
                    </listhead>
                    <listitem>
                        <listcell label="John" />
                        <listcell label="CEO" />
                    </listitem>
                    <listitem>
                        <listcell label="Joe" />
                        <listcell label="Engineer" />
                    </listitem>
                </listbox>
            </vbox>
        </popup>
    </combobutton>
```

- Combobutton with Menupopup

![](/zk_component_ref/images/ZKComRef_Combobutton_with_Menupopup.jpg)

```xml
    <combobutton label="menu popup" image="/img/network.gif">
        <menupopup>
            <menuitem label="Index"/>
            <menu label="Menu">
                <menupopup>
                    <menu label="Color Picker" content="#color=#029BCB" />
                </menupopup>
            </menu>
        </menupopup>
    </combobutton>
```

- Combobutton as Toolbarbutton

![](/zk_component_ref/images/ZKComRef_Combobutton_ToolbarbuttonMold.png)

```xml
<zk>
    <window border="normal" title="test win"
        width="300px">
        <toolbar>
            <toolbarbutton label="Left" image="/img/network.gif" />
            <space />
            <toolbarbutton label="Right" image="/img/network.gif"
                dir="reverse" />
            <combobutton label="menu popup" image="/img/network.gif"
                mold="tbbtn">
                <menupopup>
                    <menuitem label="Index"/>
                    <menu label="Menu">
                        <menupopup>
                            <menu label="Color Picker" content="#color=#029BCB" />
                        </menupopup>
                    </menu>
                </menupopup>
            </combobutton>
        </toolbar>
    </window>
</zk>
```

# Properties

## Autodrop

[org.zkoss.zul.Combobutton#setAutodrop(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobutton.html#setAutodrop(boolean))
is used to set whether the child popup should drop down automatically
while mouseover the right drop down icon of Combobutton.

The simplest use is to specify it with `self` as follows. Then, the
button is disabled when it is clicked.

```xml
<combobutton label="popup" autodrop="true" />
```

Moreover, it support other [ properties inherited from Button]({{site.baseurl}}/zk_component_ref/button#Properties)
in stead of upload.

# Supported Events

| Name | Event Type |
|---|---|
| `onClick` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.MouseEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MouseEvent.html)
Denotes when left button of Combobutton is clicked. |
| `onOpen` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
Denotes when the child popup is opened or closed, it will not be
fired if open or close child popup by call
[org.zkoss.zul.Combobutton#setOpen(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobutton.html#setOpen(boolean))
directly. |

- Inherited Supported Events: [ Button]({{site.baseurl}}/zk_component_ref/button#Supported_Events)

# Supported Molds

- The default mold
- The tbbtn mold

`{% include version-badge.html version="6.5.0" %}`

The **tbbtn** mold is renamed to **toolbar** mold

# Supported Children

[ Popup]({{site.baseurl}}/zk_component_ref/popup) [ Menupopup]({{site.baseurl}}/zk_component_ref/menupopup)

# Use Cases

| Version | Description               | Example Location                                              |
|---------|---------------------------|---------------------------------------------------------------|
| 6.0.0+  | Combobutton with Colorbox | [blog post](http://blog.zkoss.org/index.php/tag/combobutton/) |

# Version History



| Version | Date           | Content                                           |
|---------|----------------|---------------------------------------------------|
| 6.5.0   | September 2012 | The **tbbtn** mold is renamed to **toolbar** mold |


