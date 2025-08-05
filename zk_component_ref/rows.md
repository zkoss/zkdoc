
- Demonstration: [Grid (Simple Grid)](http://www.zkoss.org/zkdemo/grid/simple)
- Java API: [org.zkoss.zul.Rows](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Rows.html)
- JavaScript API: [zul.grid.Rows](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.grid.Rows.html)


# Employment/Purpose

Defines the rows of a grid. Each child of a rows element should be a
[org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html) element.

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

`*`[` Row`]({{site.baseurl}}/zk_component_ref/row)`, `[` Group`]({{site.baseurl}}/zk_component_ref/group)`, `[` Groupfoot`]({{site.baseurl}}/zk_component_ref/groupfoot)
