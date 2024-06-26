

# Html Based Component

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zk.ui.HtmlBasedComponent</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zk.Widget</javadoc>

# Employment/Purpose

A skeletal implementation for HTML based components. It simplifies to
implement methods common to HTML based components.

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
<p><code>onDrop</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.DropEvent</javadoc> Denotes a user has
dropped the dragged target to a component.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onClick</code></p>
</center></td>
<td><p><strong>Event:</strong> <javadoc>
org.zkoss.zk.ui.event.MouseEvent</javadoc></p>
<p>Denotes a user has clicked a component.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onDoubleClick</code></p>
</center></td>
<td><p><strong>Event:</strong> <javadoc>
org.zkoss.zk.ui.event.MouseEvent</javadoc> Denotes a user has
double-clicked a component.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onRightClick</code></p>
</center></td>
<td><p><strong>Event:</strong> <javadoc>
org.zkoss.zk.ui.event.MouseEvent</javadoc> Denotes a user has
right-clicked a component.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onMouseOver</code></p>
</center></td>
<td><p><strong>Event:</strong> <javadoc>
org.zkoss.zk.ui.event.MoveEvent</javadoc> {% include versionSince| 5.0.3
%} Denotes a user has hovered over the component.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onMouseOut</code></p>
</center></td>
<td><p><strong>Event:</strong> <javadoc>
org.zkoss.zk.ui.event.MoveEvent</javadoc> {% include versionSince| 5.0.3
%} Denotes a user has moved out a component.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onOK</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.KeyEvent</javadoc></p>
<p>Denotes a user has pressed the <strong>ENTER</strong> key.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onCancel</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.KeyEvent</javadoc></p>
<p>Denotes a user has pressed the <strong>ESC</strong> key.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onCtrlKey</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.KeyEvent</javadoc></p>
<p>Denotes a user has pressed a special key, such as PgUp, Home, and a
key combined with the Ctrl or Alt key. Refer to the
<code>ctrlKeys</code> Property section below for details.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onAfterSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.AfterSizeEvent</javadoc> It's fired
after</p>
<ul>
<li>a user resizes a sizable component in a browser</li>
<li>a component calculates its size in a browser</li>
</ul></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onCreate</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.CreateEvent</javadoc></p></td>
</tr>
</tbody>
</table>

# Supported Children

`*ALL`

# Version History

| Version | Date      | Content                                              |
|---------|-----------|------------------------------------------------------|
| 5.0.3   | June 2010 | The onMouseOver and onMouseOut events are supported. |


