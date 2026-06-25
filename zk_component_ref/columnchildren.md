---
title: "Columnchildren"
---

- **Demonstration:** [Columnlayout](http://www.zkoss.org/zkdemo/layout/column_layout)
- **Java API:** [org.zkoss.zkex.zul.Columnchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Columnchildren.html)
- **JavaScript API:** [zkex.layout.Columnchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.layout.Columnchildren.html)

{% include edition-availability.html edition="pe" %}

{% include supported-since.html version="6.0.0" %}

# Employment/Purpose

Columnchildren can allow any Component as its child.

## Common Use Cases

- **Multi-column dashboard layout** — Place `<columnchildren>` elements inside a `<columnlayout>` to define independently scrollable columns of varying widths, each holding panels, grids, or any other ZK component.
- **Flexible column widths** — Use the `width` attribute on each `<columnchildren>` to control the proportional or fixed width of each column within the layout, for example mixing a narrow 30% sidebar with a wider 40% main content area.
- **Mixed-content columns** — Because `<columnchildren>` accepts any ZK component as a child (not only `<panel>`), you can freely mix panels, grids, charts, forms, and other components within a single column.

```xml
<columnlayout>
    <columnchildren width="30%" style="padding: 5px">
        <panel title="Sidebar" border="normal">
            <panelchildren>Navigation</panelchildren>
        </panel>
    </columnchildren>
    <columnchildren width="70%" style="padding: 5px">
        <grid />
    </columnchildren>
</columnlayout>
```

# Example

![](/zk_component_ref/images/ZKComRef_Columnlayout_Example.png)

```xml
<columnlayout>
    <columnchildren width="30%" style="padding: 5px">
        <panel height="100px" style="margin-bottom:10p" title="column1-1"
            border="normal" maximizable="true" collapsible="true">
            <panelchildren>Panel</panelchildren>
        </panel>
        <panel height="100px" framable="true" title="column1-2" border="normal"
        maximizable="true" style="margin-bottom:10px">
            <panelchildren>Panel</panelchildren>
        </panel>
        <panel height="100px" title="column1-3" border="normal"
            closable="true">
            <panelchildren>Panel</panelchildren>
        </panel>
    </columnchildren>
    <columnchildren width="40%" style="padding: 10px">
        <panel title="Data" maximizable="true" border="normal"
            style="margin-bottom:10px">
            <panelchildren>
                <grid fixedLayout="true" style="border:0px" height="100%">
                    <columns>
                        <column label="category" />
                        <column label="value" />
                    </columns>
                    <rows>
                        <row>
                            <label id="c0" value="C/C++" />
                            <decimalbox id="v0" value="21." constraint="no empty"
                                onChange="update(0)" />
                        </row>
                        <row>
                            <label id="c1" value="VB" />
                            <decimalbox id="v1" value="10." constraint="no empty"
                                onChange="update(1)" />
                        </row>
                        <row>
                            <label id="c2" value="Java" />
                            <decimalbox id="v2" value="40." constraint="no empty"
                                onChange="update(2)" />
                        </row>
                        <row>
                            <label id="c3" value="PHP" />
                            <decimalbox id="v3" value="28." constraint="no empty"
                                onChange="update(3)" />
                        </row>
                    </rows>
                </grid>
            </panelchildren>
        </panel>
        <panel border="normal">
            <panelchildren>
                <checkbox label="3D Chart" checked="true"
                    onCheck="mychart.setThreeD(self.isChecked())" />
                <chart id="mychart" title="Pie Chart Demo" width="320px" type="pie" threeD="true" fgAlpha="128">
                    <attribute name="onClick">
                                                String areaid = event.getArea();
                                                if(areaid!= null) {
                                                   Area area = self.getFellow(areaid);
                           alert(""+area.getAttribute("entity")+":"+area.getTooltiptext());
                                                }
                    </attribute>
                    <zscript> void update(int rowIndex) { Label lb = (Label)
                        self.getFellow("c"+rowIndex); Decimalbox db =
                        (Decimalbox)self.getFellow("v"+rowIndex); model.setValue(lb.value,
                        new Double(db.getValue().doubleValue())); } PieModel model = new
                        SimplePieModel(); for(int j=0; j &lt; 4; ++j) { update(j); }
                             mychart.setModel(model);
                         </zscript>
                 </chart>
             </panelchildren>
         </panel>
     </columnchildren>
 </columnlayout>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Panel`]({{site.baseurl}}/zk_component_ref/panel)

{% include supported-since.html version="6.0.0" %}

`*Any`
