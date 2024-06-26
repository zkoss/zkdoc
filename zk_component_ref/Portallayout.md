

# Portallayout

- Demonstration:
  [Portallayout](http://www.zkoss.org/zkdemo/layout/portal_layout)
- Java API: <javadoc>org.zkoss.zkmax.zul.Portallayout</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.Portallayout</javadoc>
- Style Guide: [
  Portallayout](ZK_Style_Guide/XUL_Component_Specification/Portallayout)

{% include ZK EE %}

# Employment/Purpose

A `portallayout` lays out a container which can have multiple columns,
and each column might have any number panels placed vertically with
different heights. `Portallayout` allows users to drag-and-drop a panel
to change its location.

When using `Portallayout`, you have to assign the width (either
percentage or pixel) to each `Portalchildren`, or the result might
depend on the browser, and not as expected.

# Example

![](zkcomref_portallayout.gif)

``` xml
    <portallayout height="100%">
        <portalchildren width="50%">
            <panel height="50%" title="Calendar" border="normal">
                <panelchildren>
                    <calendar/>
                </panelchildren>
            </panel>
            <panel height="50%" title="Colorbox" border="normal">
                <panelchildren>
                    <colorbox/>
                </panelchildren>
            </panel>
        </portalchildren>
        <portalchildren width="50%">
            <panel height="100%" title="Editor" border="normal">
                <panelchildren>
                    <tbeditor/>
                </panelchildren>
            </panel>
        </portalchildren>
    </portallayout>
```

# orient

{% include versionSince\|7.0.0 %}

`Default: vertical`

If you want the portallayout to be displayed as a row-based layout, you
can specify `orient="horizontal"`.

``` xml
<portallayout orient="horizontal">
    <portalchildren width="50%">
        ...
    </portalchildren>
    <portalchildren width="50%">
                ...
    </portalchildren>
</portallayout>
```

# Draggable Panel by Default

<panel> is `draggable="true"` without explicitly specifying when it's
inside a Portallayout. You can disable this by `draggable="false"`.

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
<p>onPortalDrop</p>
</center></td>
<td><p>{% include versionSince| 9.5.1 %} <strong>Event:</strong>
<javadoc>org.zkoss.zkmax.ui.event.PortalDropEvent</javadoc></p>
<p>Represents an event after a portal is dropped and before a portal is
moved.</p></td>
</tr>
<tr class="even">
<td><center>
<p>onPortalMove</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zkmax.ui.event.PortalMoveEvent</javadoc> Represents
an event caused by a portal being moved.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Portalchildren`](ZK_Component_Reference/Layouts/Portallayout/Portalchildren)

# Version History

| Version | Date           | Content                                                                                                                            |
|---------|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| 7.0.0   | October, 2013  | [Portallayout supports row based orientation](http://tracker.zkoss.org/browse/ZK-1687)                                             |
| 9.5.1   | November, 2020 | [Kanban missing options to listen to portallayout onPortalMove without affecting the UI](https://tracker.zkoss.org/browse/ZK-4423) |


