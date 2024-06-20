{% include ZKComponentReferencePageHeader %}

# Menubar

- Demonstration: [Menu](http://www.zkoss.org/zkdemo/menu)
- Java API: <javadoc>org.zkoss.zul.Menubar</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.menu.Menubar</javadoc>
- Style Guide: [
  Menubar](ZK_Style_Guide/XUL_Component_Specification/Menubar)

# Employment/Purpose

A container usually contains more than one menu elements.

# Example

![](ZKComRef_Menubar.png)

``` xml
<menubar id="menubar">
    <menu label="File">
        <menupopup onOpen="alert(self.id)">
            <menuitem label="New" onClick="alert(self.label)" />
            <menuitem label="Open" onClick="alert(self.label)" />
            <menuitem label="Save" onClick="alert(self.label)" />
            <menuseparator />
            <menuitem label="Exit" onClick="alert(self.label)" />
        </menupopup>
    </menu>
    <menu label="Help">
        <menupopup>
            <menuitem label="Index" onClick="alert(self.label)" />
            <menu label="About">
                <menupopup>
                    <menuitem label="About ZK" onClick="alert(self.label)" />
                    <menuitem label="About Potix" onClick="alert(self.label)" />
                </menupopup>
            </menu>
        </menupopup>
    </menu>
</menubar>
```

# Properties

## Scrollable

The code below demonstrates how easy it is to make the Menubar
scrollable!

![](scrollableMenu.gif)

``` xml
<menubar width="200px" scrollable="true">
 ...
</menubar>
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

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Menu`](ZK_Component_Reference/Essential_Components/Menu)`, `[` Menuitem`](ZK_Component_Reference/Essential_Components/Menu/Menuitem)`, `[` Menuseparator`](ZK_Component_Reference/Essential_Components/Menu/Menuseparator)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

{% include ZKComponentReferencePageFooter %}
