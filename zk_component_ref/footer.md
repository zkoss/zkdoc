

# Footer

- Demonstration: [Grid (Header and footer)](http://www.zkoss.org/zkdemo/grid/header_and_footer)
- Java API: [org.zkoss.zul.Footer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Footer.html)
- JavaScript API: [zul.grid.Footer](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Footer.html)


# Employment/Purpose

A column of the footer of a grid ([ Grid]({{site.baseurl}}/zk_component_ref/data/grid)). Its parent must be
[ Foot]({{site.baseurl}}/zk_component_ref/data/grid/foot).

Unlike Column, you could place any child in a grid footer.

# Example

![](/zk_component_ref/images/ZKComRef_Foot_Example.png)

```xml
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

- Inherited Supported Events: [ FooterElement]({{site.baseurl}}/zk_component_ref/base_components/footerelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[ Grid]({{site.baseurl}}/zk_component_ref/data/grid#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


