{% include ZKComponentReferencePageHeader %}

# Listfoot

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Listfoot</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Listfoot</javadoc>
- Style Guide: [
  Listfooter](ZK_Style_Guide/XUL_Component_Specification/Listfooter)

# Employment/Purpose

Like [
Listhead](ZK_Component_Reference/Data/Listbox/Listhead), each
listbox has at most one `Listfoot`.

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
                 <listheader label="name" sort="auto"/>
                 <listheader label="gender" sort="auto"/>
             </listhead>
             <listitem>
                 <listcell label="Mary"/>
                 <listcell label="FEMALE"/>
             </listitem>
             <listitem>
                 <listcell label="John"/>
                 <listcell label="MALE"/>
             </listitem>
             <listitem>
                 <listcell label="Jane"/>
                 <listcell label="FEMALE"/>
             </listitem>
             <listitem>
                 <listcell label="Henry"/>
                 <listcell label="MALE"/>
             </listitem>
             <listfoot >
                 <listfooter><label value="This is footer1"/></listfooter>
                 <listfooter><label value="This is footer2"/></listfooter>
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

# Supported Children

`*`[` Listfooter`](ZK_Component_Reference/Data/Listbox/Listfooter)

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
