

# Listheader

- Demonstration: [Listbox (Sorting)](http://www.zkoss.org/zkdemo/listbox/sorting)
- Java API: [org.zkoss.zul.Listheader](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listheader.html)
- JavaScript API:
  [zul.sel.Listheader](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.sel.Listheader.html)


# Employment/Purpose

The list header which defines the attributes and header of a columen of
a list box. Its parent must be `Listhead`.

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

| Name | Event Type |
|---|---|
| `onSort` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html) Denotes user has
sorted the row of this column. |
| `onGroup` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html)
`[ZK PE]`
{% include version-badge.html version=6.5.0 %} Denotes user has grouped all the
cells under a column. |
| `onUngroup` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SortEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SortEvent.html) <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}
{% include version-badge.html version=6.5.0 %} Denotes user has ungrouped all the
cells under a column. |

- Inherited Supported Events: [ HeaderElement]({{site.baseurl}}/zk_component_ref/headerelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description          | Example Location                              |
|---------|----------------------|-----------------------------------------------|
| 5.0     | Multiline Listheader | <http://www.zkoss.org/forum/listComment/6864> |

# Version History



| Version | Date      | Content                                                                                  |
|---------|-----------|------------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-120](http://tracker.zkoss.org/browse/ZK-120): Provide menupopup="auto" for listbox   |
| 6.5.0   | June 2012 | [ZK-147](http://tracker.zkoss.org/browse/ZK-147): Support ungroup for grid's column menu |


