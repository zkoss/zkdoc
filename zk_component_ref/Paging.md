{% include ZKComponentReferencePageHeader %}

# Paging

- Demonstration: [Paging (with
  Grid)](http://www.zkoss.org/zkdemo/grid/paging), [Paging (with
  Listbox)](http://www.zkoss.org/zkdemo/listbox/paging), [Paging (with
  Tree)](http://www.zkoss.org/zkdemo/tree/paging)
- Java API: <javadoc>org.zkoss.zul.Paging</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.mesh.Paging</javadoc>
- Style Guide: [
  Paging](ZK_Style_Guide/XUL_Component_Specification/Paging)

# Employment/Purpose

A `paging` component is used with another component to separate long
content into multiple pages. If a component has long content to display,
you could separate them into pages, and then use a paging component as a
controller to allow the user decide which page to display.

The [listbox](ZK_Component_Reference/Data/Listbox),
[grid](ZK_Component_Reference/Data/Grid) and
[tree](ZK_Component_Reference/Data/Tree) components support
the paging intrinsically, so you don't need to specify a paging
component explicitly. In other words, they will instantiate and manage a
paging component automatically if the paging mold is specified. Of
course, you could specify an external paging component, if you want to
have different visual layout, or to control multiple listboxes, grids
and/or trees with one single paging component.

# Example

For example, suppose you have 100 items and prefer to show 20 items at a
time, then you can use the paging components as follows.

``` xml
<paging totalSize="100" pageSize="20"/>
```

![](paging_mold_default.png)

When a user clicks on the hyperlinks, the `onPaging` event is sent with
an instance of <javadoc>org.zkoss.zul.event.PagingEvent</javadoc> to the
paging component. To decide which portion of your 100 items are visible,
you should add a listener to the paging component. Please note that the
code below is pseudo code. For real examples, please refer to [User
Cases](#Use_Cases) below.

``` xml
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

{% include versionSince\| 8.0.3 %}

<javadoc method="setDisabled(boolean)">org.zkoss.zul.Paging</javadoc> is
used to disable the paging component. It can block the user from
navigating through the pagination. For example,

``` xml
<paging pageSize="2" disabled="true"/>
```

## PageIncrement

`Default: 10 (desktop), 5 (mobile)`

Under `os` mold, the component renders a list of paging anchors for
users to jump to the specific page:
![](PagingAnchor.jpg "PagingAnchor.jpg")

This attribute determines the max number of rendered paging anchors.

# Limitation

Paging can not apply [
stubonly](ZK_Developer's_Reference/Performance_Tips/Specify_Stubonly_for_Client-only_Components)
at the same time. For example,

``` xml
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
[invalidate](ZK_Developer's_Reference/UI_Composing/Component-based_UI#Invalidate_a_Component)
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
<javadoc>org.zkoss.zul.event.PagingEvent</javadoc></p>
<p>Notifies one of the pages of a multi-page component is selected by
the user.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

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
<td>![](paging_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>os</p>
</center></td>
<td>![](paging_mold_os.png)</td>
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

# Version History

{% include LastUpdated %}

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

{% include ZKComponentReferencePageFooter %}
