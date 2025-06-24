

# Grid

- Demonstration: [Grid](http://www.zkoss.org/zkdemo/grid/)
- Java API: [org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html)
- JavaScript API: [zul.grid.Grid](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Grid.html)

# Employment/Purpose

Components:
`grid, columns and column, rows and row, Auxhead and Auxheader`

A `grid` contains components that are aligned in rows like tables.
Inside a `grid` you place `columns`, `rows`, and `headers`.

`Columns` defines the header and `column` attributes. They are declared
with the `columns` component and assigned as a child element of the
`grid`. `Column` declares the common attributes of each `column` such as
the width and alignment. An optional column header may contain objects
such as a label and/or image. Although `columns` is optional, if it
exists, notice that the number of its child (`column`) should equal the
number of child in a `row`. If `columns` contains no child, the `grid`
will display nothing in its content.

`Rows` hold the content. They are declared with the `rows` component and
assigned as a child element of `grid`. Inside `rows` you should add one
`row` component for each `row` of the `grid`. Inside each `row` element
you should place child components which contain the content that you
want inside that `row`. Each child component should align with a
`column` of the specific `row`.

Additional `auxiliary headers` may be added with the `auxhead`
component. The `auxhead` must be closely tied with the `columns`
declaration. For more details see the section on Axillary Headers below.

# Example

![](/zk_component_ref/images/ZKComRef_Grid_Example.png)

```xml
 <window title="Grid Demo" border="normal" width="360px">
     <zscript>
     class Comp implements Comparator {
         private boolean _asc;
         public Comp(boolean asc) {
             _asc = asc;
         }
         public int compare(Object o1, Object o2) {
             String s1 = o1.getChildren().get(0).getValue(),
                 s2 = o2.getChildren().get(0).getValue();
             int v = s1.compareTo(s2);
             return _asc ? v: -v;
         }
     }
     Comp asc = new Comp(true), dsc = new Comp(false);
     </zscript>
     <grid>
         <columns sizable="true">
             <column label="Type" sortAscending="&#36;{asc}" sortDescending="&#36;{dsc}" width="50px"/>
             <column label="Content"/>
         </columns>
         <rows>
             <row>
                 <label value="File:"/>
                 <textbox width="99%"/>
             </row>
             <row>
                 <label value="Type:"/>
                 <hbox>
                     <listbox rows="1" mold="select">
                         <listitem label="Java Files,(*.java)"/>
                         <listitem label="All Files,(*.*)"/>
                     </listbox>
                     <button label="Browse..."/>
                 </hbox>
             </row>
             <row>
                 <label value="Options:"/>
                 <textbox rows="3" width="99%"/>
             </row>
         </rows>
     </grid>
 </window>
```

![](/zk_component_ref/images/grid_onAfterRender.png)

```xml
<zk>
    <zscript><![CDATA[
        ListModelList lm = new ListModelList(Arrays.asList(new String[] { "David",
                "Thomas", "Steven" }));
    ]]></zscript>
    
    <grid model="${lm}" width="300px"
        onAfterRender='gridCount.setValue("row count: "+self.getRows().getChildren().size()+"");' />
    <label id="gridCount" />
</zk>
```

# Paging

The `listbox` and `grid` components support the paging intrinsically, so
you don't need to specify a paging component explicitly as above unless
you want to have different visual layout or to control multiple
`listbox` and `grid`controls with one paging component.

## Data Model with Paging

{% include version-badge.html version=8.0.0 %}

If `listbox` or `grid` component is used with a data model, we recommend
you control paging from the model directly. Although specifying page
size and active page on the component is still supported, model now
provides api for paging control, which makes using model more
convenient.

```xml
    <zscript><![CDATA[
    import org.zkoss.zul.ext.Pageable;

    List model = new ListModelList(Locale.getAvailableLocales());
    public void next(){
         int activePage = ((Pageable)model).getActivePage();
        ((Pageable)model).setActivePage(activePage + 1);
    }

    public void previous(){
        int activePage = ((Pageable)model).getActivePage();
        if (--activePage < 0 ){
            activePage = 0;
        }
        ((Pageable)model).setActivePage(activePage);
    }
    ]]></zscript>
    <grid model="${model}" mold="paging" pageSize="5">
        <columns>
            <column label="Locale"/>
        </columns>
        <template name="model">
            <row>
                ${each}
            </row>
        </template>
    </grid>
    <button label="Next" onClick="next()"/>
    <button label="Previous" onClick="previous()"/>
```

## Grids with Paging

There are two ways to handle large content in a grid: scrolling and
paging. Scrolling is enabled by setting the `height` attribute as
discussed in the previous section. Paging is enabled by setting the
`mold` attribute to `paging`. Once paging is enabled, the grid separates
the content into several pages and displays one page at a time as
depicted below.

![](/zk_component_ref/images/ZKComRef_Grid_Paging.png)

```xml
 
<grid width="300px" mold="paging" pageSize="4">
    <columns>
        <column label="Left"/>
        <column label="Right"/>
    </columns>
    <rows>
        <row>
            <label value="Item 1.1"/><label value="Item 1.2"/>
        </row>
        <row>
            <label value="Item 2.1"/><label value="Item 2.2"/>
        </row>
        <row>
            <label value="Item 3.1"/><label value="Item 3.2"/>
        </row>
        <row>
            <label value="Item 4.1"/><label value="Item 4.2"/>
        </row>
        <row>
            <label value="Item 5.1"/><label value="Item 5.2"/>
        </row>
        <row>
            <label value="Item 6.1"/><label value="Item 6.2"/>
        </row>
        <row>
            <label value="Item 7.1"/><label value="Item 7.2"/>
        </row>
    </rows>
</grid>
```

Once the paging mold is set, the grid creates an instance of a `Paging`
component **as the Grid's child** and the paging component in turn
handles the `Grid`'s paging. Therefore, the number of the `Grid`'s
children includes the paging component. Also, if you remove all children
of the `grid`, the `paging` is also removed.

## The PageSize Property

Having set the `paging` mold, you can specify how many rows are visible
at a time (i.e., the page size) by setting the `pageSize` attribute to a
numeric value. By default, it is 20.

## The Paginal Property

If you prefer to place the [Paging](zk_component_ref/paging)
component in a different location or if you want to control two or more
grids with the same [Paging](zk_component_ref/paging), you
can assign the `paginal` attribute explicitly. Note: if it is not set
explicitly, it is the same as the `paging` property.

![](/zk_component_ref/images/ZKComRef_Grid_Paginal.png)

```xml
 
<vbox>
    <paging id="pg" pageSize="4"/>
    <hbox>
        <grid width="300px" mold="paging" paginal="${pg}">
            <columns>
                <column label="Left"/><column label="Right"/>
            </columns>
            <rows>
                <row>
                    <label value="Item 1.1"/><label value="Item 1.2"/>
                </row>
                <row>
                    <label value="Item 2.1"/><label value="Item 2.2"/>
                </row>
                <row>
                    <label value="Item 3.1"/><label value="Item 3.2"/>
                </row>
                <row>
                    <label value="Item 4.1"/><label value="Item 4.2"/>
                </row>
                <row>
                    <label value="Item 5.1"/><label value="Item 5.2"/>
                </row>
                <row>
                    <label value="Item 6.1"/><label value="Item 6.2"/>
                </row>
                <row>
                    <label value="Item 7.1"/><label value="Item 7.2"/>
                </row>
            </rows>
        </grid>
        <grid width="300px" mold="paging" paginal="${pg}">
            <columns>
                <column label="Left"/><column label="Right"/>
            </columns>
            <rows>
                <row>
                    <label value="Item A.1"/><label value="Item A.2"/>
                </row>
                <row>
                    <label value="Item B.1"/><label value="Item B.2"/>
                </row>
                <row>
                    <label value="Item C.1"/><label value="Item C.2"/>
                </row>
                <row>
                    <label value="Item D.1"/><label value="Item D.2"/>
                </row>
                <row>
                    <label value="Item E.1"/><label value="Item E.2"/>
                </row>
                <row>
                    <label value="Item F.1"/><label value="Item F.2"/>
                </row>
            </rows>
        </grid>
    </hbox>
</vbox>
```

## The Paging Property

It is a read-only attribute representing the child [ Paging](zk_component_ref/paging)
component that is created automatically. It is null if you assign
external paging via the `paginal` attribute. You rarely need to access
this attribute as it is generally better to use the `paginal` attribute.

## The PagingDisabled Property

{% include version-badge.html version=8.0.3 %} Once the `pagingDisabled` is set to
`true`, users will be blocked from navigating through the pagination.

## The onPaging Event and Method

Once a user clicks the page number of the `paging` component, an
`onPaging` event is sent the grid. It is then processed by the
`onPaging` method. By default, the method invalidates, i.e., redraws,
the content of `rows`.

If you want to implement "create-on-demand" feature, you can add a event
listener to the grid for the `onPaging` event. The line below
demonstrates how to add an EventListener.

```java
grid.addEventListener(org.zkoss.zul.event.ZulEvents.ON_PAGING, new MyListener());
```

## Autopaging

{% include version-badge.html version=5.0.2 %}

When using the paging mold and vflex, you could also turn on autopaging
([org.zkoss.zul.Grid#setAutopaging(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setAutopaging(boolean)))
such that the page size will be adjusted automatically based on the
available space.

For example,

```xml
<grid id="grid" autopaging="true" mold="paging" vflex="1">
    <columns>
        <column label="column1"/>
    </columns>
    <rows>
        <row forEach="${items}">
         ${each}
        </row>
    </rows>
</grid>
```

![](/zk_component_ref/images/Grid_autopageSize.png)

**Note:** Autopaging depends on a fixed row height for all rows (i.e.
you can't use line wrapping text in cells or the `<details>` component). Because of that, once enabled, ZK will apply fixed height
for each row with the following CSS by default. If you want to change
the height, please overwrite the CSS rule as your preference. But this
feature only works when each row has the same height.

```css
.z-grid-autopaging .z-row-cnt {
    height: 30px;
    overflow: hidden;
}
```

{% include version-badge.html version=5.0.8 %} **Note:** In ZK 7, we change the
naming *.z-row-cnt* to *.z-row-content*. {% include version-badge.html version=7.0.3
%}

# Sort

## Sorting

Grids support the direct sorting of rows. To enable ascending order
sorting for a particular column, you need to assign a
`java.util.Comparator` instance to the `sortAscending` attribute of the
column. Similarly, you assign a comparator to the `sortDescending`
property to enable the descending order.

As illustrated below, you first implement a comparator that compares any
two rows of the grid, and then assign its instances to the
`sortAscending` and/or `sortDescending` attributes. Notice: the
`compare` method is passed two [org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html)
instances.

```xml
<zk>
    <zscript>
         class MyRowComparator implements Comparator {
             public MyRowComparator(boolean ascending) {
             ...
             }
             public int compare(Object o1, Object o2) {
                 Row r1 = (Row)o1, r2 = (Row)o2;
                 ....
             }
         }
         Comparator asc = new MyRowComparator(true);
         Comparator dsc = new MyRowComparator(false);
    </zscript>
    <grid>
        <columns>
            <column sortAscending="${asc}" sortDescending="${dsc}"/>
 ...
```

### The onSort Event

When you assign at least one comparator to a column, an `onSort` event
is sent to the server if user clicks on it. The `column` component
implements a listener to automatically sort rows based on the assigned
comparator.

If you prefer to handle this manually, you can add your own listener to
the column for the `onSort` event. To prevent the default listener to
invoking the `sort` method, you have to call the `stopPropagation`
method for the event being received. Alternatively, you can override the
`sort` method, see below.

## The sortDirection Property

The `sortDirection` property controls whether to show an icon to
indicate the order of a particular column. If rows are sorted before
being added to the grid, you should set this property explicitly.

<column sortDirection="ascending"/>

It is then maintained automatically by the grid as long as you assign
the comparators to the corresponding column.

## The sort Method

The `sort` method is the underlying implementation of the default
`onSort` event listener. It is also useful if you want to sort the rows
using Java code. For example, you might have to call this method after
adding rows (assuming they not in the proper order).

```java
Row row = new Row();
row.setParent(rows);
row.appendChild(...);
...
if (!"natural".column.getSortDirection())
    column.sort("ascending".equals(column.getSortDirection()));
```

The default sorting algorithm is quick-sort (by use of the `sort` method
from the [org.zkoss.zk.ui.Components](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Components.html) class). You can
override it with your own implementation.

Note: the `sort` method checks the sort direction (by calling
`getSortDirection`). It sorts the rows only if the sort direction is
different. To enforce the sorting, do as follows.

```java
column.setSortDirection("natural");
sort(myorder);
```

The above code is equivalent to the following.

```java
sort(myorder, true);
```

See more about sorting [Multiple Field Sorting onListbox](http://books.zkoss.org/wiki/Small%20Talks/2009/January/Multiple%20Field%20Sorting%20on%20Listbox).

# Live Data

Like list boxes, grids support *live data*. With live data, developers
are able to separate the data from the view. In other words, developers
only need to provide the data by implementing the
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html) interface,
rather than manipulating the grid directly. The benefits are twofold.

- It is easier to use different views to show the same set of data.
- The grid sends the data to the client only if it is visible. It saves
  a lot of network traffic if the amount of data is large.

There are three steps to make use of live data.

1 Prepare the data in the form of a `ListModel`. ZK has a concrete
implementation called [org.zkoss.zul.SimpleListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleListModel.html)
for representing an array of objects. 2 Implement the
[org.zkoss.zul.RowRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/RowRenderer.html) interface
for rendering a row of data into the grid.

- - This is optional. If it is not specified the default renderer is
    used to render the data into the first column.
  - You can implement different renderers for representing the same data
    in different views.

3 Set the data in the `model` attribute and, optionally, the renderer in
the `rowRenderer` attribute.

In the following example, we prepared a list model called `strset`,
assign it to a grid using the `model` attribute. Then, the grid will do
the rest.

![](/zk_component_ref/images/ZKComRef_Grid_LiveData.png)

```xml
<window title="Live Grid" border="normal" width="100px">
    <zscript><![CDATA[
        String[] data = new String[30];
        for(int j=0; j < data.length; ++j) {
            data[j] = "option "+j;
        }
        ListModel strset = new SimpleListModel(data);
        ]]></zscript>
    <grid height="100px" model="${strset}">
        <columns>
            <column label="options"/>
        </columns>
    </grid>
</window>
```

## Sorting with Live Data

If you allow users to sort a grid with live data, you have to implement
the interface, [org.zkoss.zul.ListModelExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelExt.html), in
addition to the [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html).

```java
class MyListModel implements ListModel, ListModelExt {
    public void sort(Comparator cmpr, boolean ascending) {
        //do the real sorting
        //notify the grid (or listbox) that data is changed by use of ListDataEvent
    }
}
```

When a user wants to sort the grid, the grid will invoke the `sort`
method of `ListModelExt` to sort the data. In other words, the sorting
is done by the list model, rather than the grid.

After sorting, the list model will notify the grid by invoking the
`onChange` method of the grid's registered
[org.zkoss.zul.event.ListDataListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ListDataListener.html)
instances. These are registered by the `addListDataListener` method. In
most cases, all the data is changed, so the list model usually sends the
following event:

```java
new ListDataEvent(this, ListDataEvent.CONTENTS_CHANGED, -1, -1) 
```

## Scroll to a Specific Item

`{% include version-badge.html version=8.5.2 %}`

You can call `scrollToIndex(int)` to scroll a Grid to a specific item,
and this even works under ROD.

# Scrollable Grid

![](/zk_component_ref/images/ZKComRef_Grid_ScrollableGrid.png)

A grid can be scrollable and has a frozen header if you specify the
`height` attribute and there is not enough space to display all data.

```xml
<grid span="true" sizedByContent="true" width="500px" height="130px">
    <columns>
        <column label="Head 1"/>
        <column label="Head 2" align="center"/>
        <column label="Head 3" align="right"/>
    </columns>
    <rows>
        <row>
            <listbox mold="select">
                <listitem label="Faster"/>
                <listitem label="Fast"/>
                <listitem label="Average"/>
            </listbox>
            <datebox/>
            <textbox rows="2"/>
        </row>
        <row>
            <checkbox checked="true" label="Option 1"/>
            <checkbox label="Option 2"/>
            <radiogroup>
                <radio label="Apple"/>
                <radio label="Orange" checked="true"/>
                <radio label="Lemon"/>
            </radiogroup>
        </row>
        <row>
            <checkbox checked="true" label="Option 1"/>
            <checkbox label="Option 2"/>
            <radiogroup orient="vertical">
                <radio label="Apple"/>
                <radio label="Orange" checked="true"/>
                <radio label="Lemon"/>
            </radiogroup>
        </row>
    </rows>
</grid>
```

{% include version-badge.html version=7.0.0 %}

The browser's default scrollbar is replaced by floating scrollbar and it
is not visible unless user mouse over on the content. To turn off the
floating scrollbar and use original scrollbar, please add the following
configuration in zk.xml.

```xml
<library-property>
    <name>org.zkoss.zul.nativebar</name>
    <value>true</value>
</library-property>
```

**Note**: the value of org.zkoss.zul.nativebar is true by default (since
7.0.2)

# Auxiliary Headers

In addition to column headers, you can specify auxiliary headers with
the `auxhead` and `auxheader` components as follows.

![](/zk_component_ref/images/ZKComRef_Grid_AuxiliaryHeaders.png)

```xml
<grid>
    <auxhead>
        <auxheader label="H1'07" colspan="6"/>
        <auxheader label="H2'07" colspan="6"/>
    </auxhead>
    <auxhead>
        <auxheader label="Q1" colspan="3"/>
        <auxheader label="Q2" colspan="3"/>
        <auxheader label="Q3" colspan="3"/>
        <auxheader label="Q4" colspan="3"/>
    </auxhead>
    <columns>
        <column label="Jan"/><column label="Feb"/><column label="Mar"/>
        <column label="Apr"/><column label="May"/><column label="Jun"/>
        <column label="Jul"/><column label="Aug"/><column label="Sep"/>
        <column label="Oct"/><column label="Nov"/><column label="Dec"/>
    </columns>
    <rows>
        <row>
        <label value="1,000"/><label value="1,100"/><label value="1,200"/>
        <label value="1,300"/><label value="1,400"/><label value="1,500"/>
        <label value="1,600"/><label value="1,700"/><label value="1,800"/>
        <label value="1,900"/><label value="2,000"/><label value="2,100"/>
        </row>
    </rows>
</grid>
```

The auxiliary headers support the `colspan` and `rowspan` attributes
that the column headers don't. Auxiliary headers must be placed in
relation to a `column`. Without the specific declaration of `columns`
auxiliary headers are ignored.

Unlike `column`/`columns`, which can only be used with `grid`,
`auxhead`/`auxheader` can be used with `grid`, `listbox` and `tree`.

## The Limitation of rowspan

For better performance, every instance of
[Column]({{site.baseurl}}/zk_component_ref/column) will create
an invisible HTML TH element called *faker*. However, with some complex
combination of `rowspan` and `colspan`, Grid might not be able to
generate the correct number of *faker* to represent each column.

For example, it is wrong if the number of the column components are not
the same as the number of columns in each row as shown below:

```xml
<grid width="200px">
    <auxhead>
        <auxheader label="A" rowspan="2" />
        <auxheader label="BC" colspan="2" />
        <auxheader label="D" rowspan="2" />
    </auxhead>
    <columns><!-- this is wrong since the number of column components is smaller -->
        <column label="B"/>
        <column label="C"/>
    </columns>
    <rows>
        <row>
            <label forEach="E,F,G,H" value="${each}"/><!-- four columns -->
        </row>
    </rows>
</grid>
```

![](/zk_component_ref/images/Auxheader_rowspan_limitation.jpg)

As shown above, the column with label C will be invisible, because the
fakers are not created correctly. Here is the result but wrong DOM
structure:

![](/zk_component_ref/images/Auxheader_rowspan_limitation01.jpg)

There is a simple workaround: specify all columns. If you don't want to
show all columns, you could use Auxheader instead of Column, and then
add an empty
[Columns]({{site.baseurl}}/zk_component_ref/columns). For
example, the code in the previous example can be fixed as follows:

```xml
<grid width="200px">
    <auxhead>
        <auxheader label="A" rowspan="2" />
        <auxheader label="BC" colspan="2" />
        <auxheader label="D" rowspan="2" />
    </auxhead>
    <auxhead>
        <auxheader label="B"/>
        <auxheader label="C"/>
    </auxhead>
    <columns/> <!-- use an empty columns to make fakers created correctly -->
    <rows>
        <row>
            <label forEach="E,F,G,H" value="${each}"/>
        </row>
    </rows>
</grid>
```

![](/zk_component_ref/images/Auxheader_rowspan_limitation02.jpg)

The other limitation is that the width of the Auxheader component will
depend the Column component. Thus, if you'd like to specify the width in
the Column component, please note that it will take some space even if
there are no label in all Column components. The workaround is simple:
make the empty Columns component invisible. For example,

```xml
<grid width="350px">
    <auxhead>
        <auxheader label="A" rowspan="2" />
        <auxheader label="BC" colspan="2" />
        <auxheader label="D" rowspan="2" />
    </auxhead>
    <auxhead>
        <auxheader label="B"/>
        <auxheader label="C"/>
    </auxhead>
    <columns visible="false"><!-- make it invisible -->
        <column width="100px"/><!-- specify width here -->
        <column width="150px"/>
        <column width="50px"/>
        <column width="50px"/>
    </columns>
    <rows>
        <row>
            <label forEach="E,F,G,H" value="${each}"/>
        </row>
    </rows>
</grid>
```

![](/zk_component_ref/images/Auxheader_rowspan_limitation03.jpg)

# Properties

## SizedByContent

By default, Grid evenly distributes the total width among each column,
so each column has the same width. However, if you specify this
attribute to true, Grid will adjust each column width to just fit its
content automatically. However, as it is controlled by a browser, you
will have no 100% control of it.

In general, we suggest specifying `hflex="min"` in a column, rather than
specifying `sizedByContent` a grid for a much more predictable result.

### Span

By default, when sizedByContent is true, a column only takes the
required space.

![](/zk_component_ref/images/ZKComRef_Grid_Nospan.png)

If you want to span the width of the columns to occupy the whole grid,
you could specify true to this attribute

![](/zk_component_ref/images/ZKComRef_Grid_Span.png)

```xml
    <grid sizedByContent="true" span="true" width="800px">
        <columns>
            <column label="Time Message" />
            <column label="Level" />
            <column label="Source " />
            <column label="Message" />
        </columns>
        <rows>
            <row>
                <label value="6/28/10 4:19:18 PM" />
                <label value="Info, long content.........................." />
                <label value="Server" />
                <label value="Merging recovery point 52 created 20 6/27/10 10 :11 PM" />
            </row>
        </rows>
    </grid>
```

### Conflict with hflex

`hflex` means to determine the width by specified proportion values, but
`sizedbyContent` means to determine the widths by content. By
definitions, these 2 attributes conflict with each other. You should use
either one of them.

## emptyMessage

{% include version-badge.html version=5.0.7 %} Specify a string at this attribute to
show a message when a Grid has no items.

```xml
        <grid emptyMessage="No items match your search">
        </grid>
```

## Sizable

If you allow users to resize the width of your columns, you can set the
`sizable` attribute of your columns as `true`. Once allowed, users can
resize the widths of columns by dragging the border between adjacent
`column` components.

```xml
<window>
    <grid>
        <columns id="cs" sizable="true">
            <column label="AA"/>
            <column label="BB"/>
            <column label="CC"/>
        </columns>
        <rows>
            <row>
                <label value="AA01"/>
                <label value="BB01"/>
                <label value="CC01"/>
            </row>
            <row>
                <label value="AA01"/>
                <label value="BB01"/>
                <label value="CC01"/>
            </row>
            <row>
                <label value="AA01"/>
                <label value="BB01"/>
                <label value="CC01"/>
            </row>
        </rows>
    </grid>
    <checkbox label="sizeable" checked="true" onCheck="cs.sizeable = self.checked"/>
</window>
```

### Auto Fitting Columns

{% include version-badge.html version=5.0.0 %} When you want to resize a column of a
Grid or Listbox, all you now need to do is double-click the column when
the mouse is over where the columns meet and the column will
automatically resize to fit its contents. To enable this functionality
Grid's columns need the attribute sizable="true". In other words, all
sizable column provides the auto-fitting functionality.

### The onColSize Event

Once a user resizes the width, the `onColSize` event is sent with an
instance of [org.zkoss.zul.event.ColSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ColSizeEvent.html). Notice
that the column's width is adjusted before the`onColSize` event is sent.
In other words, the event serves as a notification that you can ignore.
Of course, you can do whatever you want in the event listener.

## Spans

It is a list of comma-separated integers, controlling whether to span a
cell over several columns. The first number in the list denotes the
number of columns the first cell shall span. The second number denotes
the number of columns the second cell will span and so on. If a number
is omitted, 1 is assumed.

For example,

```xml
<grid>
    <columns>
        <column label="Left" align="left"/><column label="Center" align="center"/>
        <column label="Right" align="right"/><column label="Column 4"/>
        <column label="Column 5"/><column label="Column 6"/>
    </columns>
    <rows>
        <row>
            <label value="Item A.1"/><label value="Item A.2"/>
            <label value="Item A.3"/><label value="Item A.4"/>
            <label value="Item A.5"/><label value="Item A.6"/>
        </row>
        <row spans="1,2,2">
            <label value="Item B.1"/><label value="Item B.2"/>
            <label value="Item B.4"/><label value="Item B.6"/>
        </row>
        <row spans="3">
            <label value="Item C.1"/><label value="Item C.4"/>
            <label value="Item C.5"/><label value="Item C.6"/>
        </row>
        <row spans=",,2,2">
            <label value="Item D.1"/><label value="Item D.2"/>
            <label value="Item D.3"/><label value="Item D.5"/>
        </row>
    </rows>
</grid>
```

## Visible Rows

{% include version-badge.html version=8.5.0 %}

The `visibleRows` attribute is used to control how many rows are
visible. By setting it to zero, the grid will resize itself to hold as
many as items if possible.

## Sticky Header

{% include version-badge.html version=9.6.0 %}

After adding a sclass "z-sticky-header", when we scroll down a page and
make a Grid's header out of visible range in a viewport, the Grid's
header becomes floating and sticky on the top of the page.

```xml
  <grid sclass="z-sticky-header">
    <!-- columns, rows... -->
  </grid>
```

# Master Detail

{% include edition-availability.html edition=ee %} 
Grid supports master-detail layout which enables
developers to add more information on each row. For example,

![](/zk_component_ref/images/ZKComRef_Grid_Detail.png)


```xml
    <rows>
        <row>
            <detail open="true">
                <hlayout>
                    <image sclass="myimg" width="100px" height="100px"
                        src="/img/item1.jpg" />
                    // omitted...
                </hlayout>
            </detail>
```

- For further details, please refer to [ Detail component]({{site.baseurl}}/zk_component_ref/detail)
  directly.

# Columns Menu

For example,

![](/zk_component_ref/images/ZKComRef_Grid_Columns_Menu.png)

```xml
<zk>
    <grid>
        <columns menupopup="auto">
            <column label="Author" sort="auto"/>
            <column label="Title" sort="auto"/>
            <column label="Publisher" sort="auto"/>
            <column label="Hardcover" sort="auto"/>
        </columns>
        // omitted...
    </grid>
</zk>
```

- For further details, please refer to [ Columns component]({{site.baseurl}}/zk_component_ref/columns)
  directly.

## Ungroup Column Menu

When the user groups the content of the grid, the column's menu will
show an ungroup icon for user to reset the group. {% include edition-availability.html edition=pe %} {%
include version-badge.html version=6.5.0 %}

![](/zk_component_ref/images/ZKComRef_Grid_Columns_Menu_Ungroup.PNG)

**Note:** If the Grid contains with Model, *GroupsModel*, you have to
register an *onUngroup* event for column to show an ungroup icon and
then replace the current model with a *ListModel* to reset the group.

For example,

```xml
<zk>
    <zscript><![CDATA[
  int cnt = 0;
Object[][] foods = new Object[][] {
    new Object[] { "Vegetables", "Asparagus", "Vitamin K", 115, 43},
    new Object[] { "Vegetables", "Beets", "Folate", 33, 74},
    new Object[] { "Vegetables", "Tomatoes", "Vitamin C", 57, 37},
    new Object[] { "Seafood", "Salmon", "Tryptophan", 103, 261},
    new Object[] { "Seafood", "Cod", "Tryptophan", 90, 119}
};
public class FoodGroupRenderer implements RowRenderer {
    public void render(Row row, Object obj, int index) {
        if (row instanceof Group) {
            row.appendChild(new Label(obj.toString()));
        } else {
            Object[] data = (Object[]) obj;
            row.appendChild(new Label(data[0].toString()));
            row.appendChild(new Label(data[1].toString()));
            row.appendChild(new Label(data[2].toString()));
            row.appendChild(new Label(data[3].toString()));
            row.appendChild(new Label(data[4].toString()));
        }
    }
}
ListModelList listmodel = new ListModelList();
for (int i = 0; i < foods.length; i++)
    listmodel.add(foods[i]);
RowRenderer renderer = new FoodGroupRenderer();
GroupsModel model = new GroupsModelArray(foods, new ArrayComparator(0, true));
    ]]></zscript>
    <grid id="grid" model="${model}" rowRenderer="${renderer}">
        <columns menupopup="auto">
            <column label="Category" sort="auto(0)" onGroup='grid.setModel(model)' onUngroup='grid.setModel(listmodel);'/>
            <column label="Name" sort="auto(1)"/>
            <column label="Top Nutrients" sort="auto(2)"/>
            <column label="% of Daily" sort="auto(3)"/>
            <column label="Calories" sort="auto(4)"/>
        </columns>
    </grid>
</zk>
```

# Cell Component

In ZK5, we have introduced a new component named Cell which can be
embedded into a Grid or Box (Hbox and Vbox) to fully control the layout
and the style. You can now use the rowspan or the colspan property to
layout your Grid, for example a content cell can now cross over multiple
rows. The code below demonstrates how to do this:

```xml
<row>
    <cell sclass="years" rowspan="12">
        ...
    </cell>
</row>
```

{% include version-badge.html version=5.0.0 %}

- For further details, please refer to [ Cell component]({{site.baseurl}}/zk_component_ref/cell)
  directly.

# Group Component

Both Grid, and Listbox support Grouping concept, it enables developers
to display data in an advanced way. Moreover, live data are also
supported in Grouping Grid, and Listbox with the
[org.zkoss.zul.GroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModel.html) interface..

![](/zk_component_ref/images/ZKComRef_Grid_Grouping.png)

```xml
<zk>
    <zscript>
    import org.zkoss.zkdemo.userguide.*;
    Comparator asc = new RowLabelComparator(true),
        dsc = new RowLabelComparator(false);
    </zscript>
    <grid>
        <columns sizable="true">
            <column label="Brand" sortAscending="&#36;{asc}" sortDescending="&#36;{dsc}"/>
            <column label="Processor Type" width="150px"/>
            <column label="Memory (RAM)" width="120px"/>
            <column label="Price"  width="100px"/>
            <column label="Hard Drive Capacity" width="150px"/>
        </columns>
        <rows>
            <group label="Dell"/>
            <row>
                <label style="padding-left:15px" value="Dell E4500 2.2GHz"/>
                <label value="Intel Core 2 Duo"/>
                <label value="2GB RAM"/>
                <label value="$261.00" style="color:green"/>
                <label value="500GB"/>
            </row>
            <row>
                <label style="padding-left:15px" value="XP-Pro Slim Dell-Inspiron-530-s"/>
                <label value="Intel Core 2 Duo"/>
                <label value="2GB RAM"/>
                <label value="$498.93" style="color:green"/>
                <label value="500GB"/>              
            </row>
            <row>
                <label style="padding-left:15px" value="Dell P4 3.2 GHz"/>
                <label value="Intel Pentium 4"/>
                <label value="4GB RAM"/>
                <label value="$377.99" style="color:green"/>
                <label value="500GB"/>              
            </row>
            <group label="Compaq"/>
            <row>
                <label style="padding-left:15px" value="Compaq SR5113WM"/>
                <label value="Intel Core Duo"/>
                <label value="1GB RAM"/>
                <label value="$279.00" style="color:green"/>
                <label value="160GB"/>              
            </row>
            <row>
                <label style="padding-left:15px" value="Compaq HP XW4200"/>
                <label value="Intel Pentium 4"/>
                <label value="4GB RAM"/>
                <label value="$980" style="color:green"/>
                <label value="500GB"/>              
            </row>
            <groupfoot spans="5">
                <label value="This a summary about Compaq Desktop PCs"/>
            </groupfoot>
        </rows>
    </grid>
</zk>
```

`*`[`Available in ZK PE and EE only`](http://www.zkoss.org/product/edition.dsp)  

For more information, please take a look at these smalltalks,

- [ Learn About Grouping with Listbox and Grid](https://www.zkoss.org/wiki/Small_Talks/2008/May/Learn_About_Grouping_with_Listbox_and_Grid)
- [ About How Grouping Works with Live Data](https://www.zkoss.org/wiki/Small_Talks/2008/May/Learn_About_How_Grouping_Works_with_Live_Data)
- [ Add Summary Field For Grouping](https://www.zkoss.org/wiki/Small_Talks/2008/May/Add_Summary_Field_For_Grouping).

Or refer to [ Group component]({{site.baseurl}}/zk_component_ref/group) directly.

# Frozen Component

In ZK 5 you are now able to freeze columns within a Grid and Listbox.
This mirrors functionality seen within Excel and makes data in these
components easier to read, interpret and handle.

The following code demonstrates how to freeze a column within a Grid:

```xml
<grid>
    <frozen style="background: #dfded8" columns="3">
        ...
    </frozen>
</grid>
```

{% include version-badge.html version=5.0.0 %}

- For further details, please refer to [ Frozen component]({{site.baseurl}}/zk_component_ref/frozen)
  directly.

# Custom Attributes

## org.zkoss.zul.grid.rod

`[default: false]`  
`[inherit: true]`[^1]

It specifies whether to enable ROD (render-on-demand). For more
information, please refer to [ZK Developer's Reference: Performance Tips]({{site.baseurl}}/zk_dev_ref/performance_tips/turn_on_render_on_demand).

## org.zkoss.zul.grid.autoSort

`[default: false]`  
`[inherit: true]`[^2]

{% include version-badge.html version=5.0.7 %} Specifies whether to sort the model
when the following cases:

- [org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))is
  called and
  [org.zkoss.zul.Column#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Column.html#setSortDirection(String))
  is set.
- [org.zkoss.zul.Column#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Column.html#setSortDirection(String))
  is called.
- Model receives [org.zkoss.zul.event.ListDataEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ListDataEvent.html)and
  [org.zkoss.zul.Column#setSortDirection(String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Column.html#setSortDirection(String))
  is set.

If you want to ignore sort when receiving
[org.zkoss.zul.event.ListDataEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/ListDataEvent.html), you can specifies
the value as **ignore.change**.

## org.zkoss.zul.grid.preloadSize

`[default: 50]`  
`[inherit: true]`[^3]

{% include version-badge.html version=6.0.1 %} Specifies the number of rows to
preload when receiving the rendering request from the client. It is used
only if live data
([org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))) and
not paging
([org.zkoss.zul.Grid#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#getPagingChild())).

## org.zkoss.zul.grid.initRodSize

`[default: 50]`  
`[inherit: true]`[^4]

{% include version-badge.html version=6.0.1 %} Specifies the number of rows rendered
when the Grid first render. It is used only if live data
([org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))) and
not paging
([org.zkoss.zul.Grid#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#getPagingChild())).

## org.zkoss.zul.grid.autohidePaging

`[default: true]`  
`[inherit: true]`[^5]

{% include version-badge.html version=7.0.1 %}

It specifies whether to enable autohide property for internal paging
components.

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
<p><code>onAfterRender</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onPageSize</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zul.event.PageSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/PageSizeEvent.html) Notifies the paging
size has been changed when the autopaging
([org.zkoss.zul.Grid#setAutopaging(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setAutopaging(boolean)))
is enabled and user changed the size of the content.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

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
<td>![](/zk_component_ref/images/grid_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>paging</p>
</center></td>
<td>![](/zk_component_ref/images/grid_mold_paging.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*`[` Columns`]({{site.baseurl}}/zk_component_ref/columns)`, `[` Rows`]({{site.baseurl}}/zk_component_ref/rows)`, `[` Foot`]({{site.baseurl}}/zk_component_ref/foot)

# Version History

| Version | Date         | Content                                                                                                                                                                                         |
|---------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.2   | May 2010     | Support the autopaging                                                                                                                                                                          |
| 5.0.4   | July 2010    | Support onAfterRender event                                                                                                                                                                     |
| 5.0.5   | October 2010 | The span property was introduced to span the columns to occupy the whole grid.                                                                                                                  |
| 5.0.7   | April 2011   | Grid shall sort model based on current state.                                                                                                                                                   |
| 5.0.7   | April 2011   | The emptyMessage attribute supported                                                                                                                                                            |
| 5.0.7   | April 2011   | The onPageSize event was introduced.                                                                                                                                                            |
| 5.0.8   | June 2011    | Deprecated setPreloadSize, instead with a custom attributes "org.zkoss.zul.grid.preloadSize".                                                                                                   |
| 5.0.8   | June 2011    | Add a custom attributes "org.zkoss.zul.grid.initRodSize" for control ROD render size.                                                                                                           |
| 6.5.0   | June 2012    | [ZK-147](http://tracker.zkoss.org/browse/ZK-147): Support ungroup for grid's column menu                                                                                                        |
| 7.0.1   | January 2014 | [ZK-2079](http://tracker.zkoss.org/browse/ZK-2079): Add a custom attributes "org.zkoss.zul.grid.autohidePaging" for control autohide in internal paging component                               |
| 7.0.2   | April 2014   | Due to the better user-firendly for the scrollbar layout, we changed the org.zkoss.zul.nativebar of the library property to true by default for Grid, Listbox, Tree and Borderlayout component. |
| 7.0.3   | July 2014    | [ZK-2359](http://tracker.zkoss.org/browse/ZK-2359): Since ZK 7, the style class naming of autopaging has changed.                                                                               |
| 8.5.0   | Oct 2017     | [ZK-3690](http://tracker.zkoss.org/browse/ZK-3690): Added visibleRows property for Grid (the same as rows property of Listbox and Tree)                                                         |
| 9.6.0   | Mar 2021     | [ZK-4795](http://tracker.zkoss.org/browse/ZK-4795): Grid/Listbox/Tree supports sticky column headers                                                                                            |



[^1]: `The custom attribute could be specified in this component, or any of its ancestor. In addition, it could be specified as `[`a library property`]({{site.baseurl}}/zk_config_ref/the_library-property_element)` to enable or disable it for the whole application.`

[^2]: `Same as above.`

[^3]: `Same as above.`

[^4]: `Same as above.`

[^5]: `Same as above.`
