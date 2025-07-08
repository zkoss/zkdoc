

# Organigram

- Java API: [org.zkoss.zkmax.zul.Organigram](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Organigram.html)
- JavaScript API: [zkmax.layout.Organigram](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Organigram.html)

{% include edition-availability.html edition="pe" %} {% include version-badge.html version=8.6.0 %}

# Employment/Purpose

`Organigram` is a component for showing organizational chart by using
tree data structure, it also support TreeModel to hold data, Organigram
only accept one `Orgchildren` as child, developers can put
`Orgchildren`, `Orgitem` and `Orgnode` in `Organigram` to display data.

`Organigram` supports [Client Render on Demand]({{site.baseurl}}/zk_dev_ref/performance_tips/client_render_on_demand)

# Browser Support

- For IE, this component only supports 11+, it is based on [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex),
  please check browser compatibility before using it.

# Example

![](/zk_component_ref/images/Organigram_example.png)

```xml
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

![](/zk_component_ref/images/Organigram_example2.png)

```xml
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

[org.zkoss.zkmax.zul.Organigram#setSelectedItem(org.zkoss.zkmax.zul.Orgitem)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Organigram.html#setSelectedItem(org.zkoss.zkmax.zul.Orgitem))
,
[org.zkoss.zkmax.zul.Orgitem#setSelected(java.lang.Boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#setSelected(java.lang.Boolean)).

When an Orgitem is selected, the onSelect event will sent back to the
server to notify the application, you can call
[org.zkoss.zkmax.zul.Organigram#getSelectedItem()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Organigram.html#getSelectedItem())
to get the selected Orgitem.

Example:

![](/zk_component_ref/images/Organigram_selection.png)

```xml
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

[Organigram Template]({{site.baseurl}}/zk_dev_ref/mvc/organigram_template)

[Organigram Renderer]({{site.baseurl}}/zk_dev_ref/mvc/organigram_renderer)

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
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Notifies one that
the user has selected a new item in the organigram.</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[` Orgchildren`]({{site.baseurl}}/zk_component_ref/orgchildren)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


