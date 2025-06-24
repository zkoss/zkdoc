

# Layout Region

- Demonstration: N/A
- Java API: [org.zkoss.zul.LayoutRegion](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/LayoutRegion.html)
- JavaScript API:
  [zul.layout.LayoutRegion](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.LayoutRegion.html)

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
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) When a layout is
collapsed or opened by a user, the onOpen event is sent to the
application.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SizeEvent.html) When a layout is
resized by a user, the onSize event is sent to the application.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onSlide</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SlideEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SlideEvent.html) When a collapsed
layout is slided (preview) by a user, the onSlide event is sent to the
application.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Version History

| Version | Date       | Content                                                                                           |
|---------|------------|---------------------------------------------------------------------------------------------------|
| 8.0.3   | 2016/04/22 | [ZK-3166](http://tracker.zkoss.org/browse/ZK-3166): BorderLayout slide action server-side support |
|         |            |                                                                                                   |


