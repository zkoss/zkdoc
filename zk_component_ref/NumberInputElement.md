

# Number Input Element

- Demonstration: [Number Input
  Element](http://www.zkoss.org/zkdemo/userguide/#f2)
- Java API: <javadoc>org.zkoss.zul.impl.NumberInputElement</javadoc>
- JavaScript API: N/A

# Employement/Purpose

A skeletal implementation for number-type input box.

# Example

N/A

# Per-component Locale

{% include versionSince\|5.0.8 %} You can add a locale per component for
all of the NumberInputElement.

For example,

<figure>
<img src="NumberInputElement-Locales.png"
title="NumberInputElement-Locales.png" />
<figcaption>NumberInputElement-Locales.png</figcaption>
</figure>

``` xml
<grid width="550px">
        <columns>
            <column hflex="min" label="Locale(Correct Result)" />
            <column hflex="min" label="Doublebox" />
            <column hflex="min" label="Decimalbox" />
            <column hflex="min" label="Doublespinner" />
        </columns>
        <rows id="rows">
            <row>
                TW (Taiwan): 2,000.02
                <doublebox format="#,###.00" locale="zh_TW"
                    value="2000.02" />
                <decimalbox format="#,###.00" locale="zh_TW" value="2000.02"/>
                <doublespinner format="#,###.00" locale="zh_TW" value="2000.02" step="0.5"/>
            </row>
            <row>
                FR (French): 2 000,02
                <doublebox format="#,###.00" locale="fr"
                    value="2000.02" />
                <decimalbox format="#,###.00" locale="fr" value="2000.02"/>
                <doublespinner format="#,###.00" locale="fr" value="2000.02" step="0.5"/>
            </row>
            <row>
                <label pre="true">IT (Italian):    2.000,02</label>
                <doublebox format="#,###.00" locale="it"
                    value="2000.02" />
                <decimalbox format="#,###.00" locale="it" value="2000.02"/>
                <doublespinner format="#,###.00" locale="it" value="2000.02" step="0.5"/>
            </row>
        </rows>
    </grid>
    <button label="Change all locales to Taiwan">
        <attribute name="onClick"><![CDATA[
            for(Iterator it = rows.getChildren().iterator(); it.hasNext();) {
                for(Iterator itt = it.next().getChildren().iterator(); itt.hasNext();) {
                        Component c = itt.next();
                        if (c instanceof org.zkoss.zul.impl.NumberInputElement)
                            c.setLocale("zh_TW");
                }
            }
            ]]></attribute>
    </button>
```

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Inherited From</p>
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
  FormatInputElemen](ZK_Component_Reference/Base_Components/FormatInputElement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date     | Content                       |
|---------|----------|-------------------------------|
| 5.0.8   | May 2011 | Support locale per component. |


