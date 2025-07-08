

# Listitem

- Demonstration: [Listbox (Keystroke Command)](http://www.zkoss.org/zkdemo/listbox/keystroke_command)
- Java API: [org.zkoss.zul.Listitem](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listitem.html)
- JavaScript API: [zul.sel.Listitem](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Listitem.html)


# Employment/Purpose

A list item.

# Example

![](/zk_component_ref/images/ZKComRef_Listbox_Example.png)

```xml
 <window title="listbox demo" border="normal" width="250px">
    <listbox id="box">
        <listhead sizable="true">
            <listheader label="name" sort="auto" />
            <listheader label="gender" sort="auto" />
        </listhead>
        <listitem>
            <listcell label="Mary" />
            <listcell label="FEMALE" />
        </listitem>
        <listitem>
            <listcell label="John" />
            <listcell label="MALE" />
        </listitem>
        <listitem>
            <listcell label="Jane" />
            <listcell label="FEMALE" />
        </listitem>
        <listitem>
            <listcell label="Henry" />
            <listcell label="MALE" />
        </listitem>
        <listfoot>
            <listfooter>
                <label value="This is footer1" />
            </listfooter>
            <listfooter>
                <label value="This is footer2" />
            </listfooter>
        </listfoot>
    </listbox>
</window>
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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar. The mold of listitem is decided by the mold of listbox.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/listbox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>select</p>
</center></td>
<td>![](/zk_component_ref/images/listbox_mold_select.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*`[` Listcell`]({{site.baseurl}}/zk_component_ref/listcell)

# Use Cases

See [ Listbox]({{site.baseurl}}/zk_component_ref/listbox#Use_Cases).

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


