

# Foot

- Demonstration: [Grid (Header and
  footer)](http://www.zkoss.org/zkdemo/grid/header_and_footer)
- Java API: <javadoc>org.zkoss.zul.Foot</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.grid.Foot</javadoc>


# Employment/Purpose

Defines a set of footers ( [
Footer]({{site.baseurl}}/zk_component_ref/data/grid/footer)) for a grid
( [ Grid]({{site.baseurl}}/zk_component_ref/data/grid)).

# Example

![](/zk_component_ref/images/ZKComRef_Foot_Example.png)

```xml
<grid width="300px">
    <columns>
        <column label="Type" width="50px"/>
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
    </rows>
    <foot>
        <footer>footer1</footer>
        <footer>footer2</footer>
    </foot>
</grid>
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
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[` Footer`]({{site.baseurl}}/zk_component_ref/data/grid/footer)

# Use Cases

[ Grid]({{site.baseurl}}/zk_component_ref/data/grid#Use_Cases)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


