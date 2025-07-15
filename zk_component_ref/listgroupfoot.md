

# Listgroupfoot

- Demonstration: N/A
- Java API: [org.zkoss.zul.Listgroupfoot](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listgroupfoot.html)
- JavaScript API:
  [zkex.sel.Listgroupfoot](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.sel.Listgroupfoot.html)

- {% include edition-availability.html edition="pe" %}

# Employment/Purpose

GroupFooter serves as a summary listitem of listgroup.

# Example

![](/zk_component_ref/images/ZKComRef_Listgroup_Example.PNG)

```xml
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

- Inherited Supported Events: [ Listitem]({{site.baseurl}}/zk_component_ref/listitem#Supported_Events)

# Supported Children

[`org.zkoss.zul.Listcell`](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zul/Listcell`.html)
