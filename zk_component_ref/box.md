# Box

- Demonstration: [Box](http://www.zkoss.org/zkdemo/layout/box)
- Java API: [org.zkoss.zul.Box](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Box.html)
- JavaScript API: [zul.box.Box](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.box.Box.html)


# Employment/Purpose

The box model of XUL is used to divide a portion of the display into a
series of boxes. Components inside a box will orient themselves
horizontally or vertically. By combining a series of boxes and
separators, you can control the layout of the visual presentation.

A box can lay out its children in one of two orientations, either
horizontally or vertically. A horizontal box lines up its components
horizontally and a vertical box orients its components vertically. You
can think of a box as one row or one column from an HTML table.

A box is the generic component that can be used for horizontal and
vertical layouts. However, it is generally more convenient by the use of
[hbox]({{site.baseurl}}/zk_component_ref/hbox) and
[vbox]({{site.baseurl}}/zk_component_ref/vbox) directly.

Notice that [hbox]({{site.baseurl}}/zk_component_ref/hbox) and
[vbox]({{site.baseurl}}/zk_component_ref/vbox) are designed to
provide more sophisticated layout, such as splitter, alignment and
packing. If you need only the layout feature, it is suggest to use [ Hlayout]({{site.baseurl}}/zk_component_ref/hlayout) and [ Vlayout]({{site.baseurl}}/zk_component_ref/vlayout) instead,
since the performance is much better (due to the use of HTML DIV instead
of TABLE).

# Example

![](/zk_component_ref/images/ZKComRef_Box_Example.png)

```xml
 <zk>
     <box orient="vertical">
         <button label="Button 1"/>
         <button label="Button 2"/>
     </box>
     <box  orient="horizontal">
         <button label="Button 3"/>
         <button label="Button 4"/>
     </box>
 </zk>
```

# Properties

## Spacing

You can control the spacing among children of the `box` control. For
example, the following example puts `5em` at both the upper margin and
the lower margin. Notice: the total space between two input fields is
`10em`.

```xml
<vbox spacing="5em">
    <textbox/>
    <datebox/>
</vbox>
```

Another example illustrated an interesting layout by the use of zero
spacing.

![](/zk_component_ref/images/100000000000009300000077C9A14E08.png)

```xml
<window title="Box Layout Demo" border="normal">
    <hbox spacing="0">
        <window border="normal">0</window>
        <vbox spacing="0">
            <hbox spacing="0">
                <window border="normal">1</window>
                <window border="normal">2</window>
                <vbox spacing="0">
                    <window border="normal">3</window>
                    <window border="normal">4</window>
                </vbox>
            </hbox>
            <hbox spacing="0">
                <vbox spacing="0">
                    <window border="normal">5</window>
                    <window border="normal">6</window>
                </vbox>
                <window border="normal">7</window>
                <window border="normal">8</window>
                <window border="normal">9</window>
            </hbox>
        </vbox>
    </hbox>
</window>
```

## Heights and Widths

{% include RemovedSince.html version=10.0.0 %} 
{% include Notice.html text='Deprecated. As of release 5.0.0, use Cell instead.' %}

You can control the width for each cell inside a `hbox` with `widths`
attribute as follows (don't specify on each cell):

```xml
    <hbox  height="100px" widths="10%,20%,30%,40%" pack="stretch">
        <label value="10%"/>
        <label value="20%"/>
        <label value="30%"/>
        <label value="40%"/>
    </hbox>
    <vbox  height="500px" heights="10%,20%,30%,40%" pack="stretch">
        <label value="10%"/>
        <label value="20%"/>
        <label value="30%"/>
        <label value="40%"/>
    </vbox>
```

The value is a comma-separated list of widths. If any value is missed,
no width is generated for the corresponding cell and the real width is
up to the browser.

Similarly, you can specify the height of each cell inside a `vbox` using
the `heights` attribute. These two properties are the same since the
orientation of a box can be horizontal or vertical depending on the
`orient` property.

## Align and Pack

![](/zk_component_ref/images/ZKComRef_Vbox_Simple_Example_align_pack.PNG)

```xml
<zk xmlns:n="http://www.zkoss.org/2005/zk/native">
    <zscript><![CDATA[
        Map map = new LinkedHashMap();
        String[] packs = new String[]{"", "start", "center", "end"};
        String[] aligns = new String[]{"", "stretch", "start", "center", "end"};
        
        for (int i = 0; i < aligns.length; i++) {
            String align = aligns[i];
            List list = new ArrayList();
            for (int j = 0; j < packs.length; j++) {
                list.add(packs[j]);
            }
            map.put(align, list);
        }
        
    ]]></zscript>
    | Name | Snapshot |
|---|---|
| horizontal | ![](/zk_component_ref/images/box_mold_horizontal.png) |
| vertical | ![](/zk_component_ref/images/box_mold_vertical.png) |

# Supported Children

`*ALL`


# Version History

| Version | Date         | Content                                                     |
|---------|--------------|-------------------------------------------------------------|
| 5.0.4   | August, 2010 | Add a sizedByContent method for splitter to resize smoothly |
