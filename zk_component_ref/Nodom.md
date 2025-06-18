

# Nodom

- Demonstration: N/A

# Employment/Purpose

`Nodom` is a ZK Component but only has server-side Java object and
doesn't render any DOM elements and JavaScript widget at the
client-side. It only renders comment nodes for positioning. Thus, if you
want to control a group of components without unnecessary DOM elements,
you can use a <nodom> as the outermost component to group components
under a controller (composer/ViewModel) instead of a `Window` or a
`Div`.

## Limitation

<nodom> does not support using `hflex/vflex` in itself and its children
component.

# Example

![](/zk_component_ref/images/ZKComRef_Idspace_Example.png)

```xml
<nodom viewModel="@id('vm')@init('foo.MyViewModel')">
    <window border="normal">
        <button id="btn" label="@init(vm.label)" />
    </window>
    <div>
        <button id="btn" label="@init(vm.label)" />
    </div>
</nodom>
```

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date       | Content                     |
|---------|------------|-----------------------------|
| 8.0.3   | 2016/09/21 | Add the new Nodom component |
|         |            |                             |


