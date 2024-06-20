{% include ZKComponentReferencePageHeader %}

# Cascader

- [Demonstration](https://www.zkoss.org/zkdemo/combobox/cascader)
- Java API: <javadoc>org.zkoss.zkmax.zul.Cascader</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.inp.Cascader</javadoc>

{% include ZK EE %} {% include versionSince\| 9.0.0 %}

# Employment/Purpose

Cascader is used to select an item from a hierarchical structure of
data. It accepts a TreeModel.

# Example

![](cascader-basic.png)

``` xml
    <zscript><![CDATA[
    DefaultTreeModel treeModel = new DefaultTreeModel(new DefaultTreeNode("ROOT",
            Arrays.asList(new DefaultTreeNode[]{
                    new DefaultTreeNode("USA",
                            Arrays.asList(new TreeNode[]{new DefaultTreeNode("New York"),new DefaultTreeNode("Los Angelas")})),
                    new DefaultTreeNode("Japan",
                            Arrays.asList(new TreeNode[]{new DefaultTreeNode("Tokyo"),new DefaultTreeNode("Kyoto")})),
                    new DefaultTreeNode("New Zealand",
                            Arrays.asList(new TreeNode[]{new DefaultTreeNode("Auckland"),new DefaultTreeNode("Queenstown")}))}
            )));
    ]]></zscript>
    <cascader width="300px" model="${treeModel}"/>
```

Users can select in layers, and the selected items are converted into
text. (Default: joining by slashes, i.g. "A/B/C")

{% include CustomItemRendering \|cascader %}

# Properties

## Disabled

Sets whether it is disabled. A disabled component can't interact with
users.

## ItemConverter

Specify a full qualified class name that implements
<javadoc>org.zkoss.util.Converter</javadoc>. The default implementation
is joining all the `toString()` result of items by slashes `/`.

By implementing your own one, you can generate a custom text that
represents the selected item.

{% include CustomItemRendering \|cascader %}

## Model

The tree model associated with this cascader.

## Open

Drops down or closes the list of items.

## Placeholder

When the selected item is empty, the placeholder text would be
displayed. (Default: empty)

## SelectedItem

Represents the selected item, or null if no item is selected.

Items are selected only if the leaf item is selected. For example, in an
A - B - C structure, selected item remains null until the leaf node C is
selected.

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
<p><code>onAfterRender</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSelect</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc></p>
<p>Represents an event caused by user's the selection changed at the
client.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Represents an event that indicates an open state that is changed at
the client.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HtmlBasedComponent](ZK_Component_Reference/Base_Components/HtmlBasedComponent#Supported_Events)

# Supported Children

`* None`

{% include ZKComponentReferencePageFooter %}
