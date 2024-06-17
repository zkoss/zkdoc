# Layout Region

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.LayoutRegion</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.layout.LayoutRegion</javadoc>

# Employment/Purpose

This class represents a region in a layout manager.

# Example

N/A

# Supported events

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
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc> When a layout is
collapsed or opened by a user, the onOpen event is sent to the
application.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SizeEvent</javadoc> When a layout is
resized by a user, the onSize event is sent to the application.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onSlide</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SlideEvent</javadoc> When a collapsed
layout is slided (preview) by a user, the onSlide event is sent to the
application.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*ALL`

# Version History

| Version | Date       | Content                                                                                           |
|---------|------------|---------------------------------------------------------------------------------------------------|
| 8.0.3   | 2016/04/22 | [ZK-3166](http://tracker.zkoss.org/browse/ZK-3166): BorderLayout slide action server-side support |
|         |            |                                                                                                   |
