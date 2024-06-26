{% include ZKDevelopersReferencePageHeader %}

# Organigram

- Java API: <javadoc>org.zkoss.zkmax.zul.Organigram </javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.layout.Organigram
  </javadoc>

{% include ZK EE %} {% include versionSince\| 8.6.0 %}

# Employment/Purpose

`Organigram` is a component for showing organizational chart by using
tree data structure, it also support TreeModel to hold data, Organigram
only accept one `Orgchildren` as child, developers can put
`Orgchildren`, `Orgitem` and `Orgnode` in `Organigram` to display data.

`Organigram` supports [Client Render on
Demand](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Performance_Tips/Client_Render_on_Demand)

# Browser Support

- For IE, this component only supports 11+, it is based on [CSS
  Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex),
  please check browser compatibility before using it.

# Example

![](Organigram_example.png)

``` xml
    <organigram width="600px">
        <orgchildren>
            <orgitem label="Item1">
                <orgchildren>
                    <orgitem label="Item2">
                        <orgchildren>
                            <orgitem label="Item3"/>
                            <orgitem label="Item4">
                                <orgchildren>
                                    <orgitem label="Item5"/>
                                </orgchildren>
                            </orgitem>
                        </orgchildren>
                    </orgitem>
                    <orgitem label="Item6">
                        <orgchildren>
                            <orgitem label="Item7"/>
                            <orgitem label="Item8"/>
                        </orgchildren>
                    </orgitem>
                </orgchildren>
            </orgitem>
        </orgchildren>
    </organigram>
```

# Model-Driven Display

![](Organigram_example2.png)

``` xml
    <zscript><![CDATA[
        DefaultTreeNode root = new DefaultTreeNode(null, new DefaultTreeNode[]{
            new DefaultTreeNode("Item1", new DefaultTreeNode[]{
                new DefaultTreeNode("Item2"), new DefaultTreeNode("Item3"), new DefaultTreeNode("Item4")
            })
        });
        DefaultTreeModel model = new DefaultTreeModel(root);
        model.addOpenPath(new int[]{0});
    ]]></zscript>
    <organigram width="600px" model="${model}"/>
```

# Selection

`Organigram` supports single selection, Orgitem can be selected by users
clicking or by programming:

<javadoc method="setSelectedItem(org.zkoss.zkmax.zul.Orgitem)">org.zkoss.zkmax.zul.Organigram</javadoc>
,
<javadoc method="setSelected(java.lang.Boolean)">org.zkoss.zkmax.zul.Orgitem</javadoc>.

When an Orgitem is selected, the onSelect event will sent back to the
server to notify the application, you can call
<javadoc method="getSelectedItem()">org.zkoss.zkmax.zul.Organigram</javadoc>
to get the selected Orgitem.

Example:

![](Organigram_selection.png)

``` xml
    <organigram width="600px" onSelect="Clients.log(self.getSelectedItem().getLabel())">
        <orgchildren>
            <orgitem label="Item1">
                <orgchildren>
                    <orgitem label="Item2"/>
                    <orgitem label="Item3" selected="true"/>
                    <orgitem label="Item4"/>
                </orgchildren>
            </orgitem>
        </orgchildren>
    </organigram>
```

# Custom Orgitem

you can also render Organigram with your customized Renderer and
Template, please refer to:

[Organigram
Template](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/MVC/View/Template/Organigram_Template)

[Organigram
Renderer](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/MVC/View/Renderer/Organigram_Renderer)

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
<p><code>onSelect</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc> Notifies one that
the user has selected a new item in the organigram.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Orgchildren`](ZK_Component_Reference/Layouts/Organigram/Orgchildren)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


