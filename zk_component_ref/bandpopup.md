# Bandpopup

- Demonstration: [Bandbox](http://www.zkoss.org/zkdemo/combobox/customizable_combobox)
- Java API: [org.zkoss.zul.Bandpopup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Bandpopup.html)
- JavaScript API: [zul.inp.Bandpopup](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Bandpopup.html)


# Employment/Purpose

The popup that belongs to a `Bandbox` instance.

Developers usually listen to the `onOpen` event that is sent to
`Bandbox` and then creates proper components as children of this
component.

# Example

![](/zk_component_ref/images/ZKComRef_Bandbox_Example.png)

```xml
   
<bandbox id="bd">
    <bandpopup>
        <vbox>
            <hbox>
                Search
                <textbox />
            </hbox>
            <listbox width="200px"
                onSelect="bd.value=self.selectedItem.label;bd.close();">
                <listhead>
                    <listheader label="Name" />
                    <listheader label="Description" />
                </listhead>
                <listitem>
                    <listcell label="John" />
                    <listcell label="CEO" />
                </listitem>
                <listitem>
                    <listcell label="Joe" />
                    <listcell label="Engineer" />
                </listitem>
                <listitem>
                    <listcell label="Mary" />
                    <listcell label="Supervisor" />
                </listitem>
            </listbox>
        </vbox>
    </bandpopup>
</bandbox>
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

`*All`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


