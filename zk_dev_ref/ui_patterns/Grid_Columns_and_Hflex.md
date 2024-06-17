\_\_TOC\_\_

This section introduces the usage of ZK auto sizing APIs. All of these
can apply to the following components:

<table>
<tbody>
<tr class="odd">
<td><ul>
<li><a href="ZK_Component_Reference/Data/Listbox"
title="wikilink">Listbox</a>
<ul>
<li><a href="ZK_Component_Reference/Data/Listbox/Listhead"
title="wikilink">Listhead</a></li>
<li><a href="ZK_Component_Reference/Data/Listbox/Listheader"
title="wikilink">Listheader</a></li>
</ul></li>
</ul></td>
<td><ul>
<li><a href="ZK_Component_Reference/Data/Grid" title="wikilink">Grid</a>
<ul>
<li><a href="ZK_Component_Reference/Data/Grid/Columns"
title="wikilink">Columns</a></li>
<li><a href="ZK_Component_Reference/Data/Grid/Column"
title="wikilink">Column</a></li>
</ul></li>
</ul></td>
<td><ul>
<li><a href="ZK_Component_Reference/Data/Tree" title="wikilink">Tree</a>
<ul>
<li><a href="ZK_Component_Reference/Data/Tree/Treecols"
title="wikilink">Treecols</a></li>
<li><a href="ZK_Component_Reference/Data/Tree/Treecol"
title="wikilink">Treecol</a></li>
</ul></li>
</ul></td>
</tr>
</tbody>
</table>

# Hflex and Width

There are basically two approaches to control the width of a column:
width and hflex. They could be specified in the column's header, such as
[column](ZK_Component_Reference/Data/Grid/Column "wikilink") and
[listheader](ZK_Component_Reference/Data/Listbox/Listheader "wikilink").
).

While width
(<javadoc method="setWidth(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>)
specifies the width in precise number (such as width="100px"), hflex
(<javadoc method="setHflex(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>)
specifies the proportional width (such as `hflex="1"`) or the minimal
width (such as `hflex="min"`).

## Span

If the total width of all columns is smaller than the grid, there will
be some whitespace shown at the right side of the grid.

If you prefer to make each column's width a bit wider to cover the whole
grid, you could specify `span="true"` in grid/listbox/tree (such as
<javadoc method="setSpan(java.lang.String)">org.zkoss.zul.Grid</javadoc>).
If you want to make a particular column larger to cover the whole grid,
you could specify a number, such as `span="2"` to expand the third
column.

## sizedByContent

If you want to make each column as minimal as possible, you could
specify `hflex="min"` for each column. Alternatively, you could specify
`sizedByContent="true"` in the grid/listbox/tree
(<javadoc method="setSizedByContent(boolean)">org.zkoss.zul.Grid</javadoc>).
In other words, it implies the width of a column that is *not* assigned
with width and hflex shall be minimal.

In general, you will specify `span="true"` too to cover the whole
grid/listbox/tree.

# Use Cases

Here we take listbox with listheaders as an example to show some
different use cases.

## Data Length : Short

``` xml
<zk>
    <zscript><![CDATA[
    String[] msgs2 = {
            "Application Developer's Perspective",
            "Server+client Fusion architecture",
            "Component Developer's Perspective",
            "Execution Flow of Loading a Page",
            "Execution Flow of Serving an Ajax Request",
            "When to Send an Ajax Request"      
    };
    ]]></zscript>
    <listbox width="800px">
        <listhead>
            <listheader label="Product" />
            <listheader label="Description" />
            <listheader label="Comment" />
        </listhead>
        <listitem>
            <listcell><label value="${msgs2[0]}"></label></listcell>
            <listcell><label value="${msgs2[1]}"></label></listcell>
            <listcell><label value="${msgs2[2]}"></label></listcell>
        </listitem>
        <listitem>
            <listcell><label value="${msgs2[3]}"></label></listcell>
            <listcell><label value="${msgs2[4]}"></label></listcell>
            <listcell><label value="${msgs2[5]}"></label></listcell>
        </listitem>
    </listbox>
</zk>
```

- **Default** : Data component will show the data correctly, with no
  width specification. (the exact widths of columns are rendered by
  browser automatically)

<figure>
<img src="ZK5DevRef_GridColumn_Default.png"
title="ZK5DevRef_GridColumn_Default.png" />
<figcaption>ZK5DevRef_GridColumn_Default.png</figcaption>
</figure>

### Proportional Width

You can use the **hflex** we have mentioned in [previous
section](ZK_Developer's_Reference/UI_Patterns/Hflex_and_Vflex#Flexibility_and_Resizing "wikilink").

``` xml
    <listhead>
            <listheader label="Product" hflex="1"/>
            <listheader label="Description" hflex="2"/>
            <listheader label="Comment" hflex="1" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_hflex.png"
title="ZK5DevRef_GridColumn_hflex.png" />
<figcaption>ZK5DevRef_GridColumn_hflex.png</figcaption>
</figure>

### Minimum Flexibility

In the case of **hflex=min**, column's width will just fit the contents.
As you can see, there might be blank space on the right of the listbox.

``` xml
        <zscript><![CDATA[
    String[] msgs2 = {
            "Application Developer's Perspective",
            "Very Short Text",
            "Server+client Fusion architecture",
            "Execution Flow of Serving an Ajax Request",
            "Very Short Text",
            "When to Send an Ajax Request (Addition Text )"
    };
        ]]></zscript>
    <listbox width="800px">
    <listhead>
            <listheader label="Product" hflex="min"/>
            <listheader label="Description" hflex="min"/>
            <listheader label="Comment" hflex="min" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_nospan.png"
title="ZK5DevRef_GridColumn_nospan.png" />
<figcaption>ZK5DevRef_GridColumn_nospan.png</figcaption>
</figure>

- If you want your contents to fill the whole grid to eliminate the
  blank space, you can set **span=true** to make it proportionally
  expanded.

``` xml
    <listbox width="800px" span="true">
    <listhead>
            <listheader label="Product" hflex="min"/>
            <listheader label="Description" hflex="min"/>
            <listheader label="Comment" hflex="min" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_span.png"
title="ZK5DevRef_GridColumn_span.png" />
<figcaption>ZK5DevRef_GridColumn_span.png</figcaption>
</figure>

- If you want the rest of the space to be assigned to one of the
  columns, set **span** to a number. The number is 0-based index of
  columns.

``` xml
    <listbox width="800px" span="0">
    <listhead>
            <listheader label="Product" hflex="min" />
            <listheader label="Description" hflex="min" />
            <listheader label="Comment" hflex="min" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_span0.png"
title="ZK5DevRef_GridColumn_span0.png" />
<figcaption>ZK5DevRef_GridColumn_span0.png</figcaption>
</figure>

- If you want the size of the Listbox determined by its content, assign
  **hflex=min** on the Grid, and make sure all the Listheaders either
  have **hflex=min** or a fixed **width**.

``` xml
    <listbox hflex='min'>
    <listhead>
            <listheader label="Product" hflex="min" />
            <listheader label="Description" hflex="min" />
            <listheader label="Comment" hflex="min" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_sizedByCnt.png"
title="ZK5DevRef_GridColumn_sizedByCnt.png" />
<figcaption>ZK5DevRef_GridColumn_sizedByCnt.png</figcaption>
</figure>

## Data Length : Long

``` xml
        <zscript><![CDATA[
        String[] msgs2 = {
            "Application Developer's Perspective", 
            "Very Long Long Long Long Long Long Long Long Long Long Text",
            "Server+client Fusion architecture",
            "Execution Flow of Serving an Ajax Request",
            "Very Long Long Long Long Long Long Long Long Long Long Text",
            "When to Send an Ajax Request" 
        };
        ]]></zscript>
```

- **Default** : ZK data component will wrap the text to fit the width of
  column.

<figure>
<img src="ZK5DevRef_GridColumn_DefaultLong.png"
title="ZK5DevRef_GridColumn_DefaultLong.png" />
<figcaption>ZK5DevRef_GridColumn_DefaultLong.png</figcaption>
</figure>

### Scrollbar

When the sum of content width is larger than Grid width. The scroll
appears **if and only if**

1.  The Columns and Column component are presented.
2.  Each of the Column components is given an **hflex** or **width**
    value.

### Specify Width

This is a simple way to avoid text wrapped by given proper width.
However, it can be difficult if you don't know the content length
beforehand.

``` xml
    <listhead>
            <listheader label="Product" width="250px"/>
            <listheader label="Description" width="470px"/>
            <listheader label="Comment" width="280px" />
    </listhead>
```

<figure>
<img src="ZK5DevRef_GridColumn_DefaultWidth.png"
title="ZK5DevRef_GridColumn_DefaultWidth.png" />
<figcaption>ZK5DevRef_GridColumn_DefaultWidth.png</figcaption>
</figure>

### Minimum Flexibility

- Set **hflex=min** and ZK will calculate the length of content and set
  proper width to the column accordingly.
- **Notes**: Remember to set every column with **hflex**=**min** or
  specify a specific **width**; otherwise those columns without setting
  minimum hflex or specifying a width could disappear if not enough
  space in the listbox.

``` xml
    <listhead>
            <listheader label="Product" hflex="min" />
            <listheader label="Description" hflex="min" />
            <listheader label="Comment" hflex="min" />
    </listhead>
 
```

<figure>
<img src="ZK5DevRef_GridColumn_LongHflex.png"
title="ZK5DevRef_GridColumn_LongHflex.png" />
<figcaption>ZK5DevRef_GridColumn_LongHflex.png</figcaption>
</figure>

### Mixed Flexibility and width

#### Width + Hflex proportion

``` xml
    <listhead>
            <listheader label="Product" width="120px" />
            <listheader label="Description" hflex="2" />
            <listheader label="Comment" hflex="1" />
    </listhead>
 
```

<figure>
<img src="ZK5DevRef_GridColumn_MixhflexnumWidth.png"
title="ZK5DevRef_GridColumn_MixhflexnumWidth.png" />
<figcaption>ZK5DevRef_GridColumn_MixhflexnumWidth.png</figcaption>
</figure>

#### Width + Hflex min

``` xml
    <listhead>
            <listheader label="Product" width="150px" />
            <listheader label="Description" hflex="min" />
            <listheader label="Comment" hflex="min" />
    </listhead>
 
```

<figure>
<img src="ZK5DevRef_GridColumn_MixhflexMinWidth.png"
title="ZK5DevRef_GridColumn_MixhflexMinWidth.png" />
<figcaption>ZK5DevRef_GridColumn_MixhflexMinWidth.png</figcaption>
</figure>

#### Width + Hflex min + Hflex proportion

``` xml
    <listhead>
            <listheader label="Product" width="120px" />
            <listheader label="Description" hflex="min" />
            <listheader label="Comment" hflex="1" />
    </listhead>
 
```

<figure>
<img src="ZK5DevRef_GridColumn_MixhflAllh.png"
title="ZK5DevRef_GridColumn_MixhflAllh.png" />
<figcaption>ZK5DevRef_GridColumn_MixhflAllh.png</figcaption>
</figure>

## Data Length : Dynamic

If users can't control the data size, that means, you should take both
the [short data](#Data_Length_:_Short "wikilink") and the [long
data](#Data_Length_:_Long "wikilink") situation into consideration.

Now we have several attributes, rules, and situations, please choose the
right solution for your case.

- **(Blank)** : Doesn't matter
- **V** : Must set
- **X** : Must not set
- **!** : Acceptable but something needs notice.

| Specification                         | Span=true                       | Hflex proportion                                          | Hflex=min | Specific Width |
|---------------------------------------|---------------------------------|-----------------------------------------------------------|-----------|----------------|
| Fill whole Grid                       | One of these attributes was set |                                                           | X         | !              |
| No Scrollbar Grid                     |                                 | V                                                         | X         | !              |
| No Content Wrapping Column            |                                 |                                                           | V         | !              |
| Fill whole Grid + No Scrollbar Grid   |                                 | V                                                         | X         | !              |
| Fill whole Grid + No Content Wrapping | V                               | All Column components should have one of these attributes |           |                |

- ! : Specific width must not be more than grid's width.

# Version History

| Version | Date          | Content                              |
|---------|---------------|--------------------------------------|
| 5.0.6   | February 2011 | New specification of hflex and span. |
