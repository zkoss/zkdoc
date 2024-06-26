

# Rows

- Demonstration: [Grid (Simple
  Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: <javadoc>org.zkoss.zul.Rows</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.grid.Rows</javadoc>
- Style Guide: [
  Rows](ZK_Style_Guide/XUL_Component_Specification/Row)

# Employment/Purpose

Defines the rows of a grid. Each child of a rows element should be a
<javadoc>org.zkoss.zul.Row</javadoc> element.

# Example

<figure>
<img src="ZKComRef_Grid_Example.png‎"
title="ZKComRef_Grid_Example.png‎" />
<figcaption>ZKComRef_Grid_Example.png‎</figcaption>
</figure>

``` xml
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
            <column label="Type" sortAscending="&#36;{asc}"
                sortDescending="&#36;{dsc}" width="50px"/>
            <column label="Content" />
        </columns>
        <rows>
            <row>
                <label value="File:" />
                <textbox width="99%" />
            </row>
            <row>
                <label value="Type:" />
                <hbox>
                    <listbox rows="1" mold="select">
                        <listitem label="Java Files,(*.java)" />
                        <listitem label="All Files,(*.*)" />
                    </listbox>
                    <button label="Browse..." />
                </hbox>
            </row>
            <row>
                <label value="Options:" />
                <textbox rows="3" width="99%" />
            </row>
        </rows>
    </grid>
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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Row`](ZK_Component_Reference/Data/Grid/Row)`, `[` Group`](ZK_Component_Reference/Data/Grid/Group)`, `[` Groupfoot`](ZK_Component_Reference/Data/Grid/Groupfoot)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


