

# Columnchildren

- Demonstration:
  [Columnlayout](http://www.zkoss.org/zkdemo/layout/column_layout)
- Java API: <javadoc>org.zkoss.zkex.zul.Columnchildren</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkex.layout.Columnchildren</javadoc>
- Style Guide: [
  Columnlayout](ZK_Style_Guide/XUL_Component_Specification/Columnlayout)
- {% include ZK PE and EE %}

# Employment/Purpose

Columnchildren can only allow Panel as its child.

{% include versionSince\|6.0.0 %}

- Columnchildren can allow any Component as its child.

# Example

<figure>
<img src="ZKComRef_Columnlayout_Example.png"
title="ZKComRef_Columnlayout_Example.png" />
<figcaption>ZKComRef_Columnlayout_Example.png</figcaption>
</figure>

``` xml
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

`*`[` Panel`](ZK_Component_Reference/Containers/Panel)

{% include versionSince\|6.0.0 %}

`*Any`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


