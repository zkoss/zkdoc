---
title: "Hlayout"
---

- **Java API:** [org.zkoss.zul.Hlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Hlayout.html)
- **JavaScript API:** [zul.box.Hlayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.box.Hlayout.html)

# Employment/Purpose

The hlayout component is a simple horizontal oriented layout. It layouts
its child components horizontally in a row.

Notice that hlayout and vlayout do **not** support a splitter inside. If
you need it, please use [ Hbox]({{site.baseurl}}/zk_component_ref/hbox) and [ Vbox]({{site.baseurl}}/zk_component_ref/vbox) instead.

# Example

![Hlayout Simple Example](/zk_component_ref/images/ZKComRef_Hlayout_Simple_Example.PNG)

```xml
<zk>
     <vlayout>
         <button label="Button 1"/>
         <button label="Button 2"/>
     </vlayout>
     <hlayout>
         <button label="Button 3"/>
         <button label="Button 4"/>
     </hlayout>
</zk>
```

# Spacing

The default spacing between two child components is `0.3em`. You are
allowed to modify it if you like:

```xml
<vlayout spacing="0">
  <textbox/>
  <button label="Click Me"/>
</vlayout>
```

# Vertical Alignment

{% include supported-since.html version="5.0.5" %} By default, the vertical alignment is
*middle*. You can change it to *top* by specifying
`sclass="z-valign-top"`, and to *bottom* by `sclass="z-valign-bottom"`.
For example,

```xml
<vlayout>
    <hlayout>
        center: <textbox/>
    </hlayout>
    <hlayout sclass="z-valign-top">
        top: <textbox/>
    </hlayout>
    <hlayout sclass="z-valign-bottom">
        bottom: <textbox/>
    </hlayout>
</vlayout>
```

{% include supported-since.html version="6.0.0" %}

The default value of alignment has been changed to *top*. You can change
it to *middle* by specifying `valign="middle"`, and
*bottom* by `valign="bottom"`. For example,

```xml
    <hlayout id="hlOne" height="100px">
        <button id="lbOne" label="align top" />
        <window width="100px" height="100px" title="test window" border="normal" />
    </hlayout>
    <hlayout id="hlTwo" valign="middle" height="100px">
        <button id="lbTwo" label="align middle" />
        <window width="100px" height="100px" title="test window" border="normal" />
    </hlayout>
    <hlayout id="hlThree" valign="bottom" height="100px">
        <button id="lbThree" label="align bottom" />
        <window width="100px" height="100px" title="test window" border="normal" />
    </hlayout>
```

## IE6 Limitation

Notice that, since the vertical alignment is specified in the CSS class
([org.zkoss.zk.ui.Component#setSclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setSclass(java.lang.String))),
there are some limitations for IE6. First, the vertical alignment is
inherited to the inner hlayout. Thus, you have to specify the middle
alignment explicitly in the inner hlayout if needed. For example,

```xml
<hlayout sclass="z-valign-bottom">
    bottom: <textbox/>
    <vlayout>
        <hlayout sclass="z-valign-middle">inner: <textbox/></hlayout>
    </vlayout>
</hlayout>
```

# Properties

## Valign

**Default Value:** `top`

Sets the vertical alignment applied to all child components inside the hlayout. Accepted values are:

| Value | Meaning |
|-------|---------|
| `top` | Align children to the top of the row (default) |
| `middle` | Center children vertically |
| `bottom` | Align children to the bottom of the row |

{% include supported-since.html version="6.0.0" %}

```xml
<hlayout valign="top" height="100px">
    <button label="align top" />
    <window width="100px" height="100px" title="test" border="normal" />
</hlayout>
<hlayout valign="middle" height="100px">
    <button label="align middle" />
    <window width="100px" height="100px" title="test" border="normal" />
</hlayout>
<hlayout valign="bottom" height="100px">
    <button label="align bottom" />
    <window width="100px" height="100px" title="test" border="normal" />
</hlayout>
```

# Supported Events

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*ALL`
