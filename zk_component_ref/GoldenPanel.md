

# GoldenPanel

- Java API: <javadoc>org.zkoss.zkmax.zul.GoldenPanel</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.GoldenPanel</javadoc>
- {% include edition-availability.html edition=pe %}

{% include version-badge.html version=8.6.0 %}

# Employment/Purpose

GoldenPanel is the only child type of GoldenLayout. It allows us to
rearrange them by dragging the tab.

# Example

<figure>
<img src="ZKCompRef_GoldenLayout.png" title="ZKCompRef_GoldenLayout.png"
width="910" />
<figcaption>ZKCompRef_GoldenLayout.png</figcaption>
</figure>

``` xml
    <goldenlayout vflex="1" hflex="1">
        <attribute name="areas">
            A A B
            A A B
            C C D
        </attribute>
        <goldenpanel area="A" title="Panel A">
            <window vflex="1" title="Window inside GoldenPanel A" border="normal"/>
        </goldenpanel>
        <goldenpanel area="B" title="Panel B">
            <button label="Button inside GoldenPanel B"/>
        </goldenpanel>
        <goldenpanel area="C" title="Panel C">
            <vlayout>
                SplitLayout inside GoldenPanel C
                <splitlayout hflex="1" height="500px">
                    <tbeditor vflex="1"/>
                    <window border="normal" title="Window" vflex="1"/>
                </splitlayout>
            </vlayout>
        </goldenpanel>
        <goldenpanel area="D" title="Panel D">
            <vlayout>
                Rating inside GoldenPanel D
                <rating max="10" rating="8"/>
            </vlayout>
        </goldenpanel>
    </goldenlayout>
```

# Properties and Features

## Area

The `area` attribute is a sugar for initializing the layout. The
GoldenPanels with the same `area` will be stacked together with the
added order. And will be placed at the position of the area in the
`areas` attribute of it's parent GoldenLayout.

## Title

The `title` attribute is the text on the tab of the GoldenPanel. If not
specified, tab will still be rendered but with default title `Panel`.

## Draggable

If false is specified, This GoldenPanel will not be able to dragged.

## Droppable

If false is specified, No other GoldenPanel is allowed to be dropped on
this GoldenPanel.

## Closable

If false is specified, This GoldenPanel will not be able to be close by
user action. And also the close icon will not show.

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
<p><code>onActive</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has
activated this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onPanelDrop</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has dropped
this GoldenPanel.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onFlexSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has resized
this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onClose</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has closed
this GoldenPanel.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onMaximize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has
maximized this GoldenPanel.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onMinimize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has
minimized this GoldenPanel.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`* All`

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


