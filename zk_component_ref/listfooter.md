
- Demonstration: N/A
- Java API: [org.zkoss.zul.Listfooter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listfooter.html)
- JavaScript API:
  [zul.sel.Listfooter](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Listfooter.html)


# Employment/Purpose

A column of the footer of a list box (`Listbox`). Its parent must be
`Listfoot`. Unlike `Listheader`, you could place any child in a list
footer.

Note: `Listcell` also accepts children.

# Example

![](/zk_component_ref/images/ZKComRef_Listbox_Example.png)

```xml
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

- Inherited Supported Events: [ FooterElement]({{site.baseurl}}/zk_component_ref/footerelement#Supported_Events)

# Supported Children

`*ALL`
