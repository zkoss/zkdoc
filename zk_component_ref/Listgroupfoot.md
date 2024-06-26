

# Listgroupfoot

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Listgroupfoot</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkex.sel.Listgroupfoot</javadoc>
- Style Guide: [
  Listgroupfoot](ZK_Style_Guide/XUL_Component_Specification/Listgroupfoot)
- {% include ZK PE and EE %}

# Employment/Purpose

GroupFooter serves as a summary listitem of listgroup.

# Example

<figure>
<img src="ZKComRef_Listgroup_Example.PNG"
title="ZKComRef_Listgroup_Example.PNG" />
<figcaption>ZKComRef_Listgroup_Example.PNG</figcaption>
</figure>

``` xml
<?xml version="1.0" encoding="UTF-8"?>
 <zk>
     Listbox support Grouping
     <listbox id="listbox" width="250px">
         <listhead sizable="true" id="h">
             <listheader id="h1" label="name" sort="auto" />
             <listheader id="h2" label="gender" sort="auto" />
         </listhead>
         <listgroup id="gp1" open="false">
             <listcell label="Group1"/>
             <listcell label="Group2"/>
         </listgroup>
         <listitem>
             <listcell label="a Mary" />
             <listcell label="a FEMALE" />
         </listitem>
         <listitem>
             <listcell label="b Mary" />
             <listcell label="b FEMALE" />
         </listitem>
         <listitem id="li1">
             <listcell label="c Mary1" />
             <listcell label="c FEMALE1" />
         </listitem>
         <listitem>
             <listcell label="d Mary" />
             <listcell label="d FEMALE" />
         </listitem>
         <listitem>
             <listcell label="e John" />
             <listcell label="e MALE" />
         </listitem>
         <listgroupfoot id="f1">
             <listcell label="10 emails" />
             <listcell label="zk1" />
         </listgroupfoot>
         <listgroup id="g2" label="Grouping 2" />
         <listitem>
             <listcell label="Jane" />
             <listcell label="FEMALE" />
         </listitem>
         <listitem>
             <listcell label="Henry" />
             <listcell label="MALE" />
         </listitem>

     </listbox>
 </zk>
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
  Listitem](ZK_Component_Reference/Data/Listbox/Listitem#Supported_Events)

# Supported Children

<javadoc>`org.zkoss.zul.Listcell`</javadoc>

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


