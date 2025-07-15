

# Paging

- Demonstration: [Paging (with Grid)](http://www.zkoss.org/zkdemo/grid/paging), [Paging (with Listbox)](http://www.zkoss.org/zkdemo/listbox/paging), [Paging (with Tree)](http://www.zkoss.org/zkdemo/tree/paging)
- Java API: [org.zkoss.zul.Paging](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Paging.html)
- JavaScript API: [zul.mesh.Paging](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.Paging.html)


# Employment/Purpose

A `paging` component is used with another component to separate long
content into multiple pages. If a component has long content to display,
you could separate them into pages, and then use a paging component as a
controller to allow the user decide which page to display.

The [listbox]({{site.baseurl}}/zk_component_ref/listbox),
[grid]({{site.baseurl}}/zk_component_ref/grid) and
[tree]({{site.baseurl}}/zk_component_ref/tree) components support
the paging intrinsically, so you don't need to specify a paging
component explicitly. In other words, they will instantiate and manage a
paging component automatically if the paging mold is specified. Of
course, you could specify an external paging component, if you want to
have different visual layout, or to control multiple listboxes, grids
and/or trees with one single paging component.

# Example

For example, suppose you have 100 items and prefer to show 20 items at a
time, then you can use the paging components as follows.

```xml
<paging totalSize="100" pageSize="20"/>
```

![](/zk_component_ref/images/paging_mold_default.png)

When a user clicks on the hyperlinks, the `onPaging` event is sent with
an instance of [org.zkoss.zul.event.PagingEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/PagingEvent.html) to the
paging component. To decide which portion of your 100 items are visible,
you should add a listener to the paging component. Please note that the
code below is pseudo code. For real examples, please refer to [User Cases](#Use_Cases) below.

```xml
<zk>
    <div id="content"/> <!-- the long content is displayed here -->
    <paging id="paging" />
    
    <zscript>
    List result = new SearchEngine().find("ZK");
    //assume SearchEngine.find() will return a list of items.
    
    paging.setTotalSize(result.size());
    paging.addEventListener("onPaging", new org.zkoss.zk.ui.event.EventListener() {
        public void onEvent(Event event) {
            int pgno = event.getPaginal().getActivePage();
            int ofs = pgno * event.getPaginal().getPageSize();

            new Viewer().redraw(content,
                result, ofs, ofs + event.getPaginal().getPageSize() - 1);
            //assume redraw(Div content, List result, int b, int e) will display
            //the result to the content component from the b-th item to the e-th item
            }
        }
    );
    </zscript>
</zk>
```

# Properties

## Disabled

{% include version-badge.html version=8.0.3 %}

[org.zkoss.zul.Paging#setDisabled(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Paging.html#setDisabled(boolean)) is
used to disable the paging component. It can block the user from
navigating through the pagination. For example,

```xml
<paging pageSize="2" disabled="true"/>
```

## PageIncrement

`Default: 10 (desktop), 5 (mobile)`

Under `os` mold, the component renders a list of paging anchors for
users to jump to the specific page:
![](/zk_component_ref/images/PagingAnchor.jpg)

This attribute determines the max number of rendered paging anchors.

# Limitation

Paging can not apply [ stubonly]({{site.baseurl}}/zk_dev_ref/performance_tips/specify_stubonly_for_client_only_components)
at the same time. For example,

```xml
<listbox mold="paging" pageSize="1" >
    <listitem >
        <listcell stubonly="true"/>
    </listitem>
    <listitem>
        <listcell />
    </listitem>
</listbox>
```

Although paging will
[invalidate]({{site.baseurl}}/zk_dev_ref/ui_composing/component_based_ui#Invalidate_a_Component)
`listbox` and its children, `stubonly` needs the referred widget in
client side which is detached during paging and throws mounting error.

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
<p><code>onPaging</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zul.event.PagingEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/PagingEvent.html)</p>
<p>Notifies one of the pages of a multi-page component is selected by
the user.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/paging_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>os</p>
</center></td>
<td>![](/zk_component_ref/images/paging_mold_os.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use Cases

<table>
<thead>
<tr class="header">
<th><p>Version</p></th>
<th><p>Description</p></th>
<th><p>Example Location</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>3.6</p></td>
<td><p>Small talks</p></td>
<td><ul>
<li><a href="Small_Talks/2009/July/Handling_huge_data_using_ZK"
title="wikilink">Handling huge data using ZK</a></li>
<li><a href="Small_Talks/2009/May/Paging_Sorting_with_a_filter_object"
title="wikilink">Paging Sorting with a filter object</a></li>
<li><a
href="Small_Talks/2008/June/Use_Load-On-Demand_to_Handle_Huge_Data"
title="wikilink">Use Load-On-Demand to Handle Huge Data</a></li>
</ul></td>
</tr>
</tbody>
</table>



