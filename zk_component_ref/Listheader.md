

# Listheader

- Demonstration: [Listbox
  (Sorting)](http://www.zkoss.org/zkdemo/listbox/sorting)
- Java API: <javadoc>org.zkoss.zul.Listheader</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.sel.Listheader</javadoc>


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
<td><center>
<p><code>onSort</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc> Denotes user has
sorted the row of this column.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onGroup</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc></p>
<p><code>[ZK PE]</code></p>
<p>{% include version-badge.html version=6.5.0 %} Denotes user has grouped all the
cells under a column.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onUngroup</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SortEvent</javadoc> {% include edition-availability.html edition="pe" %}
{% include version-badge.html version=6.5.0 %} Denotes user has ungrouped all the
cells under a column.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HeaderElement]({{site.baseurl}}/zk_component_ref/base_components/headerelement#Supported_Events)

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


