---
title: "Auxheader"
---

- **Demonstration:** [Grid (Merged Header)](http://www.zkoss.org/zkdemo/grid/merged_header)
- **Java API:** [org.zkoss.zul.Auxheader](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Auxheader.html)
- **JavaScript API:** [zul.mesh.Auxheader](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.mesh.Auxheader.html)

# Employment/Purpose

The auxiliary headers support the colspan and rowspan properties which
allows itself to be spanned across several columns/rows. Auxiliary
headers should be accompanied with columns/listhead/treecols when used
with grid/listbox/tree. {% include supported-since.html version="8.0.0" %} Noted that it is forbidden to set
width/height/hflex/vflex in Auxheader.

## Common Use Cases

- **Multi-level column grouping:** Use multiple `<auxhead>` rows with `colspan` to group related columns under a shared label — for example, grouping monthly columns under quarterly headers, and quarterly under half-year headers.
- **Row-spanning labels:** Use `rowspan` to pin a header label across multiple `<auxhead>` rows when one logical grouping spans both header rows (e.g. a fixed identifier column that spans all header levels).
- **Works with Grid, Listbox, and Tree:** `<auxhead>/<auxheader>` can be placed inside any of these components to add a descriptive header band above the primary column headers.

# Example

An auxiliary header.

![](/zk_component_ref/images/ZKComRef_Auxheader.png)

```xml

<grid>
    <auxhead>
        <auxheader label="H1'07" colspan="6" />
        <auxheader label="H2'07" colspan="6" />
    </auxhead>
    <auxhead>
        <auxheader label="Q1" colspan="3" />
        <auxheader label="Q2" colspan="3" />
        <auxheader label="Q3" colspan="3" />
        <auxheader label="Q4" colspan="3" />
    </auxhead>
    <columns>
        <column label="Jan" />
        <column label="Feb" />
        <column label="Mar" />
        <column label="Apr" />
        <column label="May" />
        <column label="Jun" />
        <column label="Jul" />
        <column label="Aug" />
        <column label="Sep" />
        <column label="Oct" />
        <column label="Nov" />
        <column label="Dec" />
    </columns>
    <rows>
        <row>
            <label value="1,000" />
            <label value="1,100" />
            <label value="1,200" />
            <label value="1,300" />
            <label value="1,400" />
            <label value="1,500" />
            <label value="1,600" />
            <label value="1,700" />
            <label value="1,800" />
            <label value="1,900" />
            <label value="2,000" />
            <label value="2,100" />
        </row>
    </rows>
</grid>
```

# Properties

## Colspan

**Default Value:** `1`

Sets the number of columns this header spans — equivalent to the `colspan` attribute of an HTML `<td>` element. The value must be a positive integer (1 or greater); a value of zero or less throws a `WrongValueException`.

```xml
<grid>
    <auxhead>
        <auxheader label="H1'07" colspan="6" />
        <auxheader label="H2'07" colspan="6" />
    </auxhead>
    <columns>
        <column label="Jan" /><column label="Feb" /><column label="Mar" />
        <column label="Apr" /><column label="May" /><column label="Jun" />
        <column label="Jul" /><column label="Aug" /><column label="Sep" />
        <column label="Oct" /><column label="Nov" /><column label="Dec" />
    </columns>
</grid>
```

## Rowspan

**Default Value:** `1`

Sets the number of rows this header spans — equivalent to the `rowspan` attribute of an HTML `<td>` element. The value must be a positive integer (1 or greater); a value of zero or less throws a `WrongValueException`. See [The Limitation of rowspan](#the-limitation-of-rowspan) for known layout constraints when combining `rowspan` and `colspan`.

```xml
<grid>
    <auxhead>
        <auxheader label="A" rowspan="2" />
        <auxheader label="BC" colspan="2" />
        <auxheader label="D" rowspan="2" />
    </auxhead>
    <auxhead>
        <auxheader label="B" />
        <auxheader label="C" />
    </auxhead>
    <columns/>
</grid>
```

# The Limitation of rowspan

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

The other limitation is that the width of the Auxheader component depend
on the Column component. Thus, if you'd like to specify the width in the
Column component, it means it will take some space even when there are
no label in all Column components. The workaround is simple: make the
empty Columns component invisible. For example,

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

# Supported Events

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/headerelement#Supported_Events)

# Supported Children

`*ALL`
