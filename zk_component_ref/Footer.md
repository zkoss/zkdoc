{% include ZKComponentReferencePageHeader %}

# Footer

- Demonstration: [Grid (Header and
  footer)](http://www.zkoss.org/zkdemo/grid/header_and_footer)
- Java API: <javadoc>org.zkoss.zul.Footer</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.grid.Footer</javadoc>
- Style Guide: [
  Footer](ZK_Style_Guide/XUL_Component_Specification/Footer)

# Employment/Purpose

A column of the footer of a grid ([
Grid](ZK_Component_Reference/Data/Grid)). Its parent must be
[ Foot](ZK_Component_Reference/Data/Grid/Foot).

Unlike Column, you could place any child in a grid footer.

# Example

<figure>
<img src="ZKComRef_Foot_Example.png"
title="ZKComRef_Foot_Example.png" />
<figcaption>ZKComRef_Foot_Example.png</figcaption>
</figure>

``` xml
 <grid width="300px">
     <columns>
         <column label="Type" width="50px"/>
         <column label="Content"/>
     </columns>
     <rows>
         <row>
             <label value="File:"/>
             <textbox width="99%"/>
         </row>
         <row>
             <label value="Type:"/>
             <hbox>
                 <listbox rows="1" mold="select">
                     <listitem label="Java Files,(*.java)"/>
                     <listitem label="All Files,(*.*)"/>
                 </listbox>
                 <button label="Browse..."/>
             </hbox>
         </row>
     </rows>
     <foot>
         <footer>footer1</footer>
         <footer>footer2</footer>
     </foot>
 </grid>
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
  FooterElement](ZK_Component_Reference/Base_Components/FooterElement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[ Grid](ZK_Component_Reference/Data/Grid#Use_Cases)

# Version History

{% include LastUpdated %}

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

{% include ZKComponentReferencePageFooter %}
