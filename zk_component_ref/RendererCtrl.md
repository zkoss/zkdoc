

# RendererCtrl

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.RendererCtrl</javadoc>
- JavaScript API: N/A

# Employment/Purpose

This interface defines the methods components like Listbox used to
notify the renderer for several circumstance.

Though
`ListitemRenderer.render(org.zkoss.zul.Listitem, java.lang.Object)` is
called one item a timer, a request might have several items to render.
And, if the renderer implements this interface, `doTry()` will be called
before any rendering, and `doFinally()`will be called after all
rendering. If any exception occurs, `doCatch(java.lang.Throwable)` will
be called.

A typical use is to start a transaction and use it for rendering all
items from the same request.

# Example

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*N/A`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |


