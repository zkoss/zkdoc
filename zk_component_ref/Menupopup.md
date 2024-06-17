# Menupopup

- Demonstration: [Menu](http://www.zkoss.org/zkdemo/menu)
- Java API: <javadoc>org.zkoss.zul.Menupopup</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.menu.Menupopup</javadoc>
- Style Guide: [
  Menupopup](ZK_Style_Guide/XUL_Component_Specification/Menupopup)

# Employment/Purpose

A container is used to display menus. It should be placed inside a Menu.

Supported event: onOpen.

Note: to have better performance, onOpen is sent only if non-deferrable
event listener is registered (see Deferrable).

To load the content dynamically, you can listen to the onOpen event, and
then create menuitem when OpenEvent.isOpen() is true.

Default HtmlBasedComponent.getSclass(): menupopup.

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

# Toggle Menupopup

` Since 7.0.1`

If you assign a menupopup to a target component and add `type=toggle` to
its popup or context attribute, it will toggle the visibility of
menupopup by click. That means if you click the target component, it
will cause the menupopup to show up, click on the target component again
will hide the menupopup.

``` xml
<button label="left click" popup="mp, type=toggle"/>
<menupopup id="mp">
    <menuitem label="menupopup"/>
</menupopup>
```

# Highlight position

` Since 8.6.0`

We can highlight position in a `menupopup` by using `setActive(int)`
method. Notice that we can only highlight `menuitem` or `menu` that is
neither disabled nor invisible.

The `setActive` will not cause a `menupopup` to be opened. An explicit
`open` is needed if the `menupopup` is not showed.

``` xml
<button label="Highlight Index" onClick="mnuHelp.open(); mnuHelp.getMenupopup().setActive(0);" />
<menubar>
    <menu label="Help" id="mnuHelp">
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
  Popup](ZK_Component_Reference/Essential_Components/Popup#Supported_Events)

# Supported Children

`*`[` Menu `](ZK_Component_Reference/Essential_Components/Menu)`, `[` Menuitem `](ZK_Component_Reference/Essential_Components/Menu/Menuitem)`, `[` Menuseparator`](ZK_Component_Reference/Essential_Components/Menu/Menuseparator)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date     | Content                                                                                                 |
|---------|----------|---------------------------------------------------------------------------------------------------------|
| 7.0.1   | Dec 2013 | [Menupopup support toggle type](http://tracker.zkoss.org/browse/ZK-2049)                                |
| 8.6.0   | Oct 2018 | [ZK-3551: Menupopup active/highlight position from serverside](http://tracker.zkoss.org/browse/ZK-3551) |
