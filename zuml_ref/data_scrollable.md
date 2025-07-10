
# `data-scrollable="true"`

If you specify the attribute with `true` on a
[ContainerWidget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.ContainerWidget.html)
or
[MeshWidget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.MeshWidget.html)
including
<window>`, `<groupbox>`, `<panelchildren>`, `<tabpanel>`, `<grid>`, `<listbox>`, `<tree> (a scrollable container),
the **error message box** (poped up by violating rules in `constraint`
attribute), combobox popup, datebox popup, inside the container
component will also move by scrolling[^1]. Those popups will disappear
when you scroll them out of the visible area.

![](images/errobox-scrollable.gif)

**Usage example**

```xml
<div xmlns:ca="client/attribute">
    <window height="100px" contentStyle="overflow:auto" ca:data-scrollable="true">
        <textbox constraint="no empty"/>
        <separator height="100px"/>
    </window>
</div>
```

- Try to trigger an error box of the Textbox and scroll down.

If you specify `true` on a
[ContainerWidget](http://www.zkoss.org/javadoc/7.0.3/jsdoc/zul/ContainerWidget.html)
or
[MeshWidget](http://www.zkoss.org/javadoc/7.0.3/jsdoc/zul/mesh/MeshWidget.html),
the **popup** inside the container component will also move by
scrolling.

**Usage example**

```xml
<div xmlns:ca="client/attribute">
    <window height="100px" contentStyle="overflow:auto" ca:data-scrollable="true">
        <label value="Left click" popup="pop"/><separator/>
        <separator height="20px"/>
        <popup id="pop">
            popup
        </popup>
    </window>
</div>
```

- Click the label, trigger a popup, and scroll down.

```xml
<div xmlns:ca="client/attribute">
    <window height="100px" contentStyle="overflow:auto" ca:data-scrollable="true">
        <label value="Right click" context="ctx"/>
        <separator height="20px"/>
        <popup id="ctx">
            popup
        </popup>
    </window>
</div>
```

- Right click the label, trigger a popup, and scroll down.

# `data-scrollable="false"`

When a user swipes on the content of Listbox, Grid, Tree in a tablet
device, the friendly scrollbar will appear. To disable the friendly
scrollbar, please use the following setting[^2].

`tablet only`

```xml
<div xmlns:ca="client/attribute">
    <listbox ca:data-scrollable="false"/>
</div>
```

# references/
* For more information, please refer to https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.ContainerWidget.html

* For more information, please refer to [ZK Component Reference Tablet Devices: Listbox]({{site.baseurl}}/zk_component_ref/tablet_devices/listbox#Friendly_Scrolling_Support),
    [ZK Component Reference Tablet Devices: Grid]({{site.baseurl}}/zk_component_ref/tablet_devices/grid#Friendly_Scrolling_Support),
    [ZK Component Reference Tablet Devices: Tree]({{site.baseurl}}/zk_component_ref/tablet_devices/tree#Friendly_Scrolling_Support).
