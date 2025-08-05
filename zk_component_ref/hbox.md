
- Demonstration: [Hbox](http://www.zkoss.org/zkdemo/layout/box)
- Java API: [org.zkoss.zul.Hbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Hbox.html)
- JavaScript API: [zul.box.Box](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.box.Box.html)


# Employment/Purpose

The hbox component is used to layout its child components horizontally
and control those children's horizontal and vertical position..

## Recommend Hlayout

Notice that hbox and vbox are designed to provide a more sophisticated
layout, such as splitter, alignment, and packing. ZK renders these 2
components with an HTML table. If you only need the components for
layout, we suggest using [ Hlayout]({{site.baseurl}}/zk_component_ref/hlayout) and [ Vlayout]({{site.baseurl}}/zk_component_ref/vlayout) instead,
since the performance is much better (due to the use of HTML DIV instead
of TABLE).

# Example

![](/zk_component_ref/images/ZKComRef_Hbox_Simple_Examples.PNG)

```xml
<zk>
    <vbox>
        <button label="Button 1" />
        <button label="Button 2" />
    </vbox>
    <hbox>
        <button label="Button 3" />
        <button label="Button 4" />
    </hbox>
</zk>
```

# Properties

- **Inherited Properties**: [ Box]({{site.baseurl}}/zk_component_ref/box#Properties)

## Align and Pack

![](/zk_component_ref/images/ZKComRef_Hbox_Simple_Examples_align_pack.PNG)

```xml
<zk xmlns:n="native">
    <style content=".box {| class='wikitable' | 
    <custom-attributes 
        packs="${['', 'start', 'center', 'end']}"
        aligns="${['', 'stretch', 'start', 'center', 'end']}"
    />

    <vlayout>
        <hlayout height="70px" width="900px">
            <div hflex="1" vflex="1" sclass="box">
              <n:h3>pack / align</n:h3>
            </div>
            <div forEach="${packs}" hflex="1" vflex="1" sclass="box">
              <n:h3>${each}</n:h3>
            </div>
        </hlayout>
        <hlayout forEach="${aligns}" height="100px" width="900px">
            <custom-attributes align="${each}"/> 
            <div hflex="1" vflex="1" sclass="box">
              <n:h3>${align}</n:h3>
            </div>
          
            <hbox forEach="${packs}" align="${align}" pack="${each}" hflex="1" vflex="1" sclass="box">
                <button label="1" />
                <button label="2" />
                <button label="3" />
            </hbox>
        </hlayout>
    </vlayout>
</zk>
```

{% include version-badge.html version=5.0.0 %}

# Cell Component

In ZK5, we have introduced a new component named Cell which can be
embedded into a Grid or Box (Hbox and Vbox) to fully control the layout
and the style. You can now use the rowspan or the colspan property to
layout your Grid, for example a content cell can now cross over multiple
rows. The code below demonstrates how to do this:

```xml
<hbox>
    <cell sclass="years">
        ...
    </cell>
</hbox>
```

{% include version-badge.html version=5.0.0 %}

# Limitation

Box component is consisted by Table element. Therefore, when put Input
element like Textbox, Combobox inside Box component, specify width and
height to Box component will be ignored when browser try to render table
element.

For example,

```xml
<hbox height="200px" width="200px" style="border: 1px solid red">
    <textbox hflex="1" value="1" />
    <textbox hflex="1" value="1" />
</hbox>
```

You will see the Box width exceed 200px. Also check the
[sample](http://jsfiddle.net/A5g9q/) with pure HTML in jsfiddle.

# Supported Events

- Inherited Supported Events: [ Box]({{site.baseurl}}/zk_component_ref/box#Supported_Events)

# Supported Children

`*ALL`
