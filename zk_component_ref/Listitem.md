# Listitem

- Demonstration: [Listbox (Keystroke
  Command)](http://www.zkoss.org/zkdemo/listbox/keystroke_command)
- Java API: <javadoc>org.zkoss.zul.Listitem</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Listitem</javadoc>
- Style Guide: [
  Listitem](ZK_Style_Guide/XUL_Component_Specification/Listitem)

# Employment/Purpose

A list item.

# Example

<figure>
<img src="ZKComRef_Listbox_Example.png"
title="ZKComRef_Listbox_Example.png" />
<figcaption>ZKComRef_Listbox_Example.png</figcaption>
</figure>

``` xml
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

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

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
<td>![](listbox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>select</p>
</center></td>
<td>![](listbox_mold_select.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*`[` Listcell`](ZK_Component_Reference/Data/Listbox/Listcell)

# Use Cases

See [
Listbox](ZK_Component_Reference/Data/Listbox#Use_Cases).

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
