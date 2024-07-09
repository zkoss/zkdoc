

# Combobutton

- Demonstration:
- Java API: <javadoc>org.zkoss.zul.Combobutton</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.wgt.Combobutton</javadoc>
- Style Guide: [
  Combobutton](ZK_Style_Guide/XUL_Component_Specification/Combobutton)

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

<figure>
<img src="images/ZKComRef_Combobutton_with_Popup.jpg
title="ZKComRef_Combobutton_with_Popup.jpg" />
<figcaption>ZKComRef_Combobutton_with_Popup.jpg</figcaption>
</figure>

``` xml
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

<figure>
<img src="images/ZKComRef_Combobutton_with_Menupopup.jpg
title="ZKComRef_Combobutton_with_Menupopup.jpg" />
<figcaption>ZKComRef_Combobutton_with_Menupopup.jpg</figcaption>
</figure>

``` xml
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

<figure>
<img src="images/ZKComRef_Combobutton_ToolbarbuttonMold.png‎
title="ZKComRef_Combobutton_ToolbarbuttonMold.png‎" />
<figcaption>ZKComRef_Combobutton_ToolbarbuttonMold.png‎</figcaption>
</figure>

``` xml
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

<javadoc method="setAutodrop(boolean)">org.zkoss.zul.Combobutton</javadoc>
is used to set whether the child popup should drop down automatically
while mouseover the right drop down icon of Combobutton.

The simplest use is to specify it with `self` as follows. Then, the
button is disabled when it is clicked.

``` xml
<combobutton label="popup" autodrop="true" />
```

Moreover, it support other [ properties inherited from
Button](ZK_Component_Reference/Essential_Components/Button#Properties)
in stead of upload.

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onClick</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.MouseEvent</javadoc></p>
<p>Denotes when left button of Combobutton is clicked.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Denotes when the child popup is opened or closed, it will not be
fired if open or close child popup by call
<javadoc method="setOpen(boolean)">org.zkoss.zul.Combobutton</javadoc>
directly.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  Button](ZK_Component_Reference/Essential_Components/Button#Supported_Events)

# Supported Molds

- The default mold
- The tbbtn mold

`{% include version-badge.html version=6.5.0 %}`

The **tbbtn** mold is renamed to **toolbar** mold

# Supported Children

[ Popup](ZK_Component_Reference/Essential_Components/Popup) [
Menupopup](ZK_Component_Reference/Essential_Components/Menu/Menupopup)

# Use Cases

| Version | Description               | Example Location                                              |
|---------|---------------------------|---------------------------------------------------------------|
| 6.0.0+  | Combobutton with Colorbox | [blog post](http://blog.zkoss.org/index.php/tag/combobutton/) |

# Version History



| Version | Date           | Content                                           |
|---------|----------------|---------------------------------------------------|
| 6.5.0   | September 2012 | The **tbbtn** mold is renamed to **toolbar** mold |


