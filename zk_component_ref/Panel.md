

# Panel

- Demonstration: [Panel](http://www.zkoss.org/zkdemo/window/panel)
- Java API: <javadoc>org.zkoss.zul.Panel</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wnd.Panel</javadoc>
- Style Guide: [
  Panel](ZK_Style_Guide/XUL_Component_Specification/Panel)

# Employment/Purpose

Panel is a container that has specific functionality and structural
components that make it the perfect building block for
application-oriented user interfaces. Panel contains bottom, top, and
foot toolbars, along with separate header, footer and body sections. It
also provides built-in collapsible, closable, maximizable, and
minimizable behavior, along with a variety of pre-built tool buttons
that can be wired up to provide other customized behavior. Panel can be
easily embedded into any kind of ZUL component that is allowed to have
children or layout component. Panel also provides specific features like
float and move. Unlike Window, Panel can only be floated and moved
inside its parent node, which is not using zk.setVParent() function at
client side. In other words, if Panel's parent node is a relative
position, the floated panel is only inside its parent, not the whole
page. The second difference from Window is that Panel is not an
independent ID space (by implementing IdSpace), so the ID of each child
can be used throughout the panel.

# Example

<figure>
<img src="images/ZKComRef_Panel_Simple_Examples.PNG
title="ZKComRef_Panel_Simple_Examples.PNG" />
<figcaption>ZKComRef_Panel_Simple_Examples.PNG</figcaption>
</figure>

``` xml
    <panel height="20%"  style="margin-bottom:10px"
           title="Panel1" border="normal" maximizable="true" closable="true"
           collapsible="true">
        <caption iconSclass="z-icon-home"/>
        <panelchildren>PanelContent</panelchildren>
    </panel>
```

## Java Example

``` java
Panel panel = new Panel();
panel.setTitle("Here is Title");
panel.setBorder("normal");
panel.setFramable(true);

Panelchildren pc = new Panelchildren();
pc.setParent(panel);
pc.appendChild(new Label("Here is Content"));
```

# Properties

## Sizable

The panel can now be resized as long as the attribute sizable is set to
true. The example ZUL below shows a panel which can be resized.

``` xml
<panel sizable="true" id="panel" framable="true" width="500px" height="400px"
    title="Panel"
    maximizable="true" minimizable="true" border="normal"
    collapsible="true" closable="true">
    <panelchildren>
        <textbox  height="100%" />
    </panelchildren>
</panel>
```

{% include version-badge.html version=5.0.0 %}

## Draggable

When used with [
Portallayout](ZK_Component_Reference/Layouts/Portallayout),
the draggable property
(<javadoc method="setDraggable(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>)
can be used to control whether the panel is draggable under the portal
layout.

``` xml
<portallayout>
   <portalchildren style="padding: 5px" width="30%">
      <panel height="150px" title="Google Tools" border="normal"
           collapsible="true" closable="true" maximizable="true"
           style="margin-bottom:10px">
         <panelchildren>
 
         </panelchildren>
      </panel>
      <panel height="300px" title="LabPixies Clock" border="normal"
           collapsible="true" closable="true" maximizable="true"
           style="margin-bottom:10px"
           draggable="false">
          <panelchildren>
             This is not draggable. 
          </panelchildren>
      </panel>
   </portalchildren>
</portallayout>
```

{% include version-badge.html version=5.0.3 %}

## Border

It specifies whether to display the border. Currently, it supports
`none`, `normal`, `rounded` and `rounded+`. The default is `none`, i.e.,
no border.

Here is the effect with different borders:

![](images/DrPanelBorder.png)

> ------------------------------------------------------------------------
>
> Backward Compatibility: ZK 5.0.5 and prior shall use the combination
> of the border and framable property as follows.
>
> | Border in 5.0.6   | The equivalent combination in 5.0.5 and prior | Description                    |
> |-------------------|-----------------------------------------------|--------------------------------|
> | border="none"     | border="none"                                 | framable is default to `false` |
> | border="normal"   | border="normal"                               | framable is default to `false` |
> | border="rounded"  | framable="true"                               | border is default to `none`    |
> | border="rounded+" | border="normal" framable="true"               |                                |
>
> - Notice that the use of the border and framable combination still
>   works in 5.0.6 (backward compatible).

## Title

Besides this attribute, you could use [
Caption](ZK_Component_Reference/Containers/Caption) to define
a more sophisticated caption (aka., title). If the panel has a caption
whose label <javadoc method="getLabel()">org.zkoss.zul.Caption</javadoc>
is not empty, then this attribute is ignored. (Default: empty).

## Closable

Specify whether to show a close button on the title bar or not. If
closable, a button is displayed and the onClose event
(<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc>) is sent if a user
clicks the button. (Default: false)

# Miscellaneous

## Scrollable Panel

To make the scrollbar appear when content exceeds panel height, specify
`style="overflow: auto"` on Panelchildren.

``` xml
<panel height="200px">
    <panelchildren style="overflow: auto">
        <div style="background: #999966" height="195px" />
        <div style="background: #669999">Div Content</div>
    </panelchildren>
</panel>
```

## Toolbar positions

Panel supports three kinds of <javadoc>org.zkoss.zul.Toolbar</javadoc>
positions: `Top`, `Bottom` and `Foot`. For example:

![](images/Panel-des.gif)

``` xml
<panel id="panel" framable="true" width="500px" height="550px"
    title="Panel component" floatable="true" movable="true"
    maximizable="true" minimizable="true" border="normal"
    collapsible="true" closable="true">
        <toolbar>
          ... // Top Toolbar of the panel
        </toolbar>
        <panelchildren>
          ... // Each added child will show in the body content of the panel
        </panelchildren>
        <toolbar>
          ... // Bottom Toolbar of the panel
        </toolbar>
        <toolbar>
          ... // Foot Toolbar of the panel
        </toolbar>
</panel>
```

- Top Toolbar (Line 5): It is used to show the top toolbar close to the
  body content of the panel. (It is an option)
- Bottom Toolbar (Line 11): It is used to show the bottom toolbar close
  to the body content of the panel. (It is an option)
- Foot Toolbar (Line 14): It is used to show the operating button under
  the body content with a few padding. (It is an option)

Please refer
[Small_Talks/2008/July/Using_Panel_to_Lay_out_Your_Website](Small_Talks/2008/July/Using_Panel_to_Lay_out_Your_Website)
for details.

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
<p><code>onMove</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.MoveEvent</javadoc></p>
<p>Denotes the position of the window is moved by a user.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Denotes user has opened or closed a component.</p>
<p><strong><code>Note:</code></strong></p>
<p>Unlike <code>onClose</code>, this event is only a notification.
The</p>
<p>client sends this event after opening or closing the</p>
<p>component.</p>
<p>It is useful to implement load-on-demand by listening to</p>
<p>the <code>onOpen</code> event, and creating components the</p>
<p>first time the component is opened.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onMaximize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.MaximizeEvent</javadoc></p>
<p>Denotes user has maximized a component.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onMinimize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.MinimizeEvent</javadoc></p>
<p>Denotes user has minimized a component.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onClose</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Denotes the close button is pressed by a user, and the</p>
<p>component shall detach itself.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SizeEvent</javadoc></p>
<p>Denotes the panel's size is updated by a user.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onZIndex</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ZIndexEvent</javadoc></p>
<p>Denotes the panel's zindex is updated by a user.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

- [
  Panelchildren](ZK_Component_Reference/Containers/Panel/Panel_Children)

# Use Cases

| Version | Description                     | Example Location                               |
|---------|---------------------------------|------------------------------------------------|
| 5.0     | Portallayout, panels and events | <http://www.zkoss.org/forum/listComment/10765> |

# Version History



| Version | Date          | Content                                                                                           |
|---------|---------------|---------------------------------------------------------------------------------------------------|
| 5.0.3   | July, 2010    | The draggable property can be used to control the drag-ability in a portal layout.                |
| 5.0.6   | January, 2010 | The framable property was deprecated. Please refer to [\#Border](#Border) for details. |


