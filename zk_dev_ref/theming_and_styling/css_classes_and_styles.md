---
title: "CSS Classes and Styles"
---



CSS ([Cascading Style Sheets](http://en.wikipedia.org/wiki/Cascading_Style_Sheets)) is a style
sheet language used to describe the presentation of a (HTML) document.
It is an important part of ZK to customize component's look and feel. If
you are not familiar with CSS, please refer to [CSS Tutorial](http://www.w3schools.com/css/default.asp).

There are a set of methods that could be used to set CSS styles for an
individual component.

- [org.zkoss.zk.ui.HtmlBasedComponent#setStyle(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setStyle(java.lang.String))
  assigns CSS styles directly to a component.
- [org.zkoss.zk.ui.HtmlBasedComponent#setSclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setSclass(java.lang.String))
  (i.e., sclass) assigns one or multiple CSS style classes to a
  component.
- [org.zkoss.zk.ui.HtmlBasedComponent#setZclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setZclass(java.lang.String))
  (i.e., zclass) assigns the main CSS style class to a component. Unlike
  style and sclass, if zclass is changed, all default CSS styles won't
  be applied.
- Some components have a so-called content area and they have a separate
  set of methods to change the CSS style of the content area, such as
  [org.zkoss.zul.Window#setContentStyle(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setContentStyle(java.lang.String))
  and
  [org.zkoss.zul.Window#setContentSclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setContentSclass(java.lang.String)).

Notice that the DOM structures of many ZUL components are complicate,
and CSS customization might depend on the DOM structure. For more
information about how individual component is styled, please refer to
[ZK Style Guide](/zk_style_customization_guide/introduction).

# style

Specifying the style is straightforward:

```xml
<textbox style="color: red; font-style: oblique;"/>
```

or, in Java:

```xml
Textbox tb = new Textbox();
tb.setStyle("color: red; font-style: oblique;");
```

# sclass

In addition, you could specify the style class by use of
[org.zkoss.zk.ui.HtmlBasedComponent#setSclass(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setSclass(java.lang.String)),
such that you could apply the same CSS style to multiple components.

```xml
<window>
    <style>
        .red {
            color: blue;
            font-style: oblique;
        }
    </style>
    <textbox sclass="red" /> <!-- first textbox -->
    <textbox sclass="red" /> <!-- another textbox -->
</window>
```

You could apply multiple style classes too. As shown below, just
separate them with a space.

```xml
<textbox sclass="red error"/>
```

# zclass

Like sclass, zclass is used to specify the CSS style class. However,
zclass is the main CSS that each mold of each component has. If it is
changed, all default CSS of the given component won't be applied. In
other words, you have to provide a full set of CSS rules that a
component's mold has.

Rule of thumb: specify zclass if you want to customize the look
completely. Otherwise, use sclass to customize one or a few CSS styles.

For more information, please refer to [ZK Style Guide]({{site.baseurl}}/zk_style_customization_guide/zclass).

# content style and sclass

Some container components such as
[window]({{site.baseurl}}/zk_component_ref/window),
[groupbox]({{site.baseurl}}/zk_component_ref/groupbox),
[detail]({{site.baseurl}}/zk_component_ref/detail) have a
content block, you have to use `contentStyle` to set its style.

For example,

```xml
<window title="below is content"  contentStyle="background:yellow">
    Hello, World!    
</window>
```

## Scrollable Window

A typical use of contentStyle is to make a window scrollable as follows.

```xml
<window title="Scroll Example" width="150px" height="100px" contentStyle="overflow:auto" >
This is a long line to spread over several lines, and more content to display.
Finally, the scrollbar becomes visible.
This is another line.
</window>
```
