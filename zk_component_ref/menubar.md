

# Menubar

- Demonstration: [Menu](http://www.zkoss.org/zkdemo/menu)
- Java API: [org.zkoss.zul.Menubar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Menubar.html)
- JavaScript API: [zul.menu.Menubar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.menu.Menubar.html)


# Employment/Purpose

A container usually contains more than one menu elements.

# Example

![](/zk_component_ref/images/ZKComRef_Menubar.png)

```xml
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

![](/zk_component_ref/images/scrollableMenu.gif)

```xml
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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Menu`]({{site.baseurl}}/zk_component_ref/menu)`, `[` Menuitem`]({{site.baseurl}}/zk_component_ref/menuitem)`, `[` Menuseparator`]({{site.baseurl}}/zk_component_ref/menuseparator)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


