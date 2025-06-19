

# Biglistbox

- Demonstration: [ Demo](https://www.zkoss.org/wiki/Small_Talks/2012/March/Handling_a_Trillion_Data_Using_ZK)
- Java API: [org.zkoss.zkmax.zul.Biglistbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Biglistbox.html)
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.big.Biglistbox</javadoc>

- {% include edition-availability.html edition="pe" %}

# Employment/Purpose

A component to handle a huge data sets and provides the same and as many
as the functionalities of [ Listbox]({{site.baseurl}}/zk_component_ref/data/listbox) including
selection, sorting, keystroke navigation, ROD(rendering-on-demand), and
so on..

# Example

![](/zk_component_ref/images/ZKComRef_Biglistbox.PNG)

```xml
<biglistbox hflex="1" vflex="1">
    <!-- Template example
    <template name="heads">
        <html><![CDATA[
    <div class="images_${matrixInfo[0]%28}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template>
    <template name="rows">
        <html><![CDATA[
     <div class="images_${matrixInfo[0]%28}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template> -->
</biglistbox>
```

As you can see, we utilize two attributes - *rowIndex & colIndex* from
the *matrixInfo* object to receive the current index during template
rendering phase.

# Mouseless Entry Listbox

- Press `UP` and `DOWN` to move the selection up and down by one item.
- Press `LEFT` and `RIGHT` to move the selection left and right by one
  item.
- Press `PgUp` and `PgDn` to move the selection up and down by one page.
- Press `HOME` to move the selection to the first item, and `END` to
  move to the last item.

# Model/Renderer

## MatrixModel

By default, ZK does not provide a built-in model implementation class
for [org.zkoss.zkmax.zul.MatrixModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/MatrixModel.html) because
Biglistbox is designed to handle unlimited data set, therefore, there is
no need to handle model data in memory. This usage is
application-dependent and varies from case to case. However, you can
extend your own implementation from the
[org.zkoss.zul.AbstractListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractListModel.html) skeleton class. For
more details, please refer to this
[smalltalk](https://www.zkoss.org/wiki/Small_Talks/2012/March/Handling_a_Trillion_Data_Using_ZK#Demo_Code_Details).

## MatrixRenderer

Here is an implementation example of
[org.zkoss.zkmax.zul.MatrixRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/MatrixRenderer.html)

```java
new MatrixRenderer<List<String>>() {

    @Override
    public String renderCell(Component owner, List<String> data,
            int rowIndex, int colIndex) throws Exception {
        String d = data.get(colIndex);
        d = d.replace("ZK", "<span class='red' title='ZK'>ZK</span>")
                .replace("Hello", "<span class='blue' title='Hello'>Hello</span>");
        return "<div class='images_" + (colIndex%28) + "' title='x=" + 
        colIndex + ",y=" + rowIndex + "'>" + d + "</div>";
    }

    @Override
    public String renderHeader(Component owner, List<String> data,
            int rowIndex, int colIndex) throws Exception {
        return "<div class='images_" + (colIndex % 28) + "' title='"
                + images[colIndex % 28] + "'>" + data.get(colIndex)
                + "</div>";
    }
}
```

As you can see, we must implement two methods - *renderCell* and
*renderHeader* defined by <i><b>MatrixRenderer</b></i> to generate the
HTML output string for cells and headers. In the
<i><b>MatrixRenderer</b></i> interface, the two methods we designed
allow developers to generate any kind of HTML result for display, you
can use either <i><b>MatrixRenderer</b></i> interface or
<i><b>Template</b></i> function to render the content for Biglistbox.

## Properties

![](/zk_component_ref/images/Capture1.PNG)

- **cols**: specify column size for viewport.
- **rows**: specify row size for viewport.
- **colWidth**: specify column width for each column.
- **rowHeight**: specify row height for each row.
- **matrixRenderer**: specify matrix renderer.
- **model**: specify matrix model.
- **oddRowSclass**: specify sclass for this component to stripe.
- **frozenCols**: specify how many columns are frozen.
- **fixFrozenCols**: specify whether to enable the fix frozen columns
  that user cannot change the columns size dynamically.
- **autoCols**: specify whether to enable the auto-adjusting cols' size.
  Default: **true**
- **autoRows**: specify whether to enable the auto-adjusting rows' size.
  Default: **true**

# Custom Attributes

## org.zkoss.zkmax.zul.biglistbox.preloadSize

`[default: 50]`  
`[inherit: true]`[^1]

It specifies the number of items to preload when receiving the rendering
request from the client. It is used only if live data
(<javadoc method="setModel(org.zkoss.zkmax.zul.MatrixModel)">org.zkoss.zkmax.zul.Biglistbox</javadoc>).

> ------------------------------------------------------------------------
>
> <references/>

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
<p><code>onSelect</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)</p>
<p>Represents an event cause by user's the list selection is changed at
the client.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSort</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.SortEventExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/SortEventExt.html)</p>
<p>Represents an event that indicates a sorting request to data for
Biglistbox and provides more information about the column
index.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onScroll</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.ScrollEventExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/ScrollEventExt.html)</p>
<p>Represents an event caused by that user is scrolling or has scrolled
at the client for Biglistbox component and provides more information
about the position X and Y data.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onScrollX</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.ScrollEventExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/ScrollEventExt.html)</p>
<p>Represents an event caused by that user is scrolling or has scrolled
the X-axis at the client for Biglistbox component and provides more
information about the position X and Y data.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onScrollY</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.ScrollEventExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/ScrollEventExt.html)</p>
<p>Represents an event caused by that user is scrolling or has scrolled
the Y-axis at the client for Biglistbox component and provides more
information about the position X and Y data.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onCellClick</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.CellClickEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/CellClickEvent.html)</p>
<p>Represents an event that indicates a clicking on a cell data for a
matrix data component like Biglistbox, and provides more information
about the row index and the column index.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onAfterRender</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Molds

- The default mold

# Supported Children

`None`

# Use Cases

| Version | Description                       | Example Location                                                                   |
|---------|-----------------------------------|------------------------------------------------------------------------------------|
| 6.0.1+  | Handling a Trillion Data Using ZK | [Small Talks](https://www.zkoss.org/wiki/Small_Talks/2012/March/Handling_a_Trillion_Data_Using_ZK) |

# Version History



[^1]: `The custom attribute could be specified in this component, or any of its ancestor. In addition, it could be specified as `[`a library property`]({{site.baseurl}}/zk_config_ref/the_library-property_element)` to enable or disable it for the whole application.`
