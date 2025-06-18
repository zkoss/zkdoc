

# Listhead

- Demonstration: [Listbox
  (Sorting)](http://www.zkoss.org/zkdemo/listbox/sorting)
- Java API: <javadoc>org.zkoss.zul.Listhead</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.sel.Listhead</javadoc>


# Employment/Purpose

A list headers used to define multi-columns and/or headers. Can only
surpport Listheader as its child.

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

# Properties

## Menupopup

{% include version-badge.html version=6.5.0 %}

Default: `none`

- `auto`: show a default menu for the listhead.
- `auto-keep`: {% include version-badge.html version=8.6.1 %} the default menu will
  keep open after setting column visibility.

Or you can provide your own menupopup by specifying a menupopup's ID.

### Auto

![](/zk_component_ref/images/ZKComRef_Listbox_Columns_Menu.PNG)

```xml
<zk>
    <listbox>
        <listhead menupopup="auto">
            <listheader label="Author" sort="auto"/>
            <listheader label="Title" sort="auto"/>
            <listheader label="Publisher" sort="auto"/>
            <listheader label="Hardcover" sort="auto"/>
        </listhead>
        // omitted...
    </listbox>
</zk>
```

`listItem`s will be categorized by the label of its children
(`listcell`s). You could extend
(<javadoc>org.zkoss.zul.ListitemComparator</javadoc>) and assign to the
`listheader` ([sorting
properties]({{site.baseurl}}/zk_component_ref/data/listbox#The_SortAscending_and_SortDescending_Properties))
to change this default behavior.

### Customized Menupopup

![](/zk_component_ref/images/ZKComRef_Listbox_Columns_Customized_Menu.png)

```xml
    <menupopup id="editPopup">
        <menuitem label="Group" image="~./zul/img/grid/menu-group.png"/>
        <menuitem label="Sort Ascending" image="~./zul/img/grid/menu-arrowup.png"/>
        <menuitem label="Sort Descending" image="~./zul/img/grid/menu-arrowdown.png"/>
    </menupopup>
    <listbox>
        <listhead menupopup="editPopup">
            <listheader label="Author" sort="auto"/>
            <listheader label="Title" sort="auto"/>
            <listheader label="Publisher" sort="auto"/>
            <listheader label="Hardcover" sort="auto"/>
        </listhead>
        // omitted...
    </listbox>
```

As you can see, the example above specifies a customized menu popup to
the columns as its column menu.

## Invisible Listhead for Alignment

Sometimes you want to use the listheader with a size or hflex value, but
you don't want to show it up on the page, you can specify all the
listheaders in the same listhead with an empty string.

For example,

```xml
<listbox width="200px">
    <listhead>
        <listheader hflex="1" />
        <listheader hflex="2" />
        <listheader hflex="1" />
    </listhead>
    <auxhead>
        <auxheader colspan="3">
            auxheader (listheaders hidden)
        </auxheader>
    </auxhead>
    <listitem>
        <listcell>hflex 1</listcell>
        <listcell>hflex 2</listcell>
        <listcell>hflex 1</listcell>
    </listitem>
    <listitem>
        <listcell>hflex 1</listcell>
        <listcell>hflex 2</listcell>
        <listcell>hflex 1</listcell>
    </listitem>
</listbox>
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
  HeadersElement]({{site.baseurl}}/zk_component_ref/base_components/headerselement#Supported_Events)

# Supported Children

`*`[` Listheader `]({{site.baseurl}}/zk_component_ref/data/listbox/listheader)

# Use Cases

| Version | Description          | Example Location                              |
|---------|----------------------|-----------------------------------------------|
| 5.0     | Multiline Listheader | <http://www.zkoss.org/forum/listComment/6864> |

# Version History



| Version | Date      | Content                                                                                |
|---------|-----------|----------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-120](http://tracker.zkoss.org/browse/ZK-120): Provide menupopup="auto" for listbox |


