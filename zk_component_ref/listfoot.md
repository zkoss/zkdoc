---
title: "Listfoot"
description: "Listfoot: Like Listhead, each listbox has at most one Listfoot."
---

- **Java API:** [org.zkoss.zul.Listfoot](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listfoot.html)
- **JavaScript API:** [zul.sel.Listfoot](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Listfoot.html)

# Employment/Purpose

Like [ Listhead]({{site.baseurl}}/zk_component_ref/listhead), each
listbox has at most one `Listfoot`.

## Common Use Cases

- **Footer row for a Listbox** — Place a single `<listfoot>` inside a `<listbox>` to render a persistent footer row that spans the full width of the list. Each column footer cell is a `<listfooter>` child.
- **Summary or aggregate values** — Use the footer to display column totals, averages, or other summary information that supplements the data rows above it.
- **Static annotations** — Add non-interactive labels (e.g. data source notices, unit legends) that should remain visible regardless of how many rows the listbox contains.

```xml
<listbox>
    <listhead>
        <listheader label="Item"/>
        <listheader label="Amount"/>
    </listhead>
    <listitem>
        <listcell label="Widget A"/>
        <listcell label="100"/>
    </listitem>
    <listfoot>
        <listfooter label="Total"/>
        <listfooter label="100"/>
    </listfoot>
</listbox>
```

# Example

![Listbox Example](/zk_component_ref/images/ZKComRef_Listbox_Example.png)

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Listfooter`]({{site.baseurl}}/zk_component_ref/listfooter)
