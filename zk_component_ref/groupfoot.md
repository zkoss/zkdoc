

# Groupfoot

- Demonstration: [Group](http://www.zkoss.org/zkdemo/grid/grouping)
- Java API: [org.zkoss.zul.Groupfoot](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Groupfoot.html)
- JavaScript API:
  [zkex.grid.Groupfoot](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.grid.Groupfoot.html)

- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Adds the ability for single level grouping to the Grid. Default
getSclass(): the same as grid's sclass.

# Example

![](/zk_component_ref/images/ZKComRef_Group_Example.png)

```xml
 <?xml version="1.0" encoding="UTF-8"?>
 <zk>
     Grid support Groupfoot in Group

     <grid id="grid" width="500px">
         <columns id="h" sizable="true">
             <column id="col1" label="Type"/>
             <column id="col2" label="Content"/>
         </columns>
         <rows id="rows">
             <group id="gp1">
             <label value="Group1: (gp1)"/>
             <label value="Group1:"/>
             </group>
             <row>
                 <label value="File:"/>
                 <label value="File:"/>
             </row>
             <row id="row1">
                 <label value="Type:"/>
                 <hbox>
                     <listbox rows="1" mold="select">
                         <listitem label="Java Files,(*.java)"/>
                         <listitem label="All Files,(*.*)"/>
                     </listbox>
                     <button label="Browse..."/>
                 </hbox>
             </row>
             <groupfoot>
                 <label value="2 Java Files"/>
                 <label value="10 Files"/>
             </groupfoot>
             <group id="gp2" label="Group 2 (gp2)" onOpen='alert("Group is open: "+self.open);'/>
             <row>
                 <label value="Options:"/>
                 <label value="Options:"/>
             </row>
             <groupfoot>    
                 <label value="2 Options"/>
                 <label value="10 Options"/>
             </groupfoot>
         </rows>
     </grid>
 </zk>
```

# Supported Events

- Inherited Supported Events: [ Listitem]({{site.baseurl}}/zk_component_ref/listitem#Supported_Events)

# Supported Children

`*ALL`
