
- Demonstration: [Grid (Simple Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: [org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html)
- JavaScript API: [zul.grid.Row](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Row.html)


# Employment/Purpose

A single row in a Rows element. Each child of the Row element is placed
in each successive cell of the grid. The row with the most child
elements determines the number of columns in each row.

Default getSclass(): the same as grid's sclass.

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
