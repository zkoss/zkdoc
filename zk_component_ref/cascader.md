---
title: "Cascader"
---


- [Demonstration](https://www.zkoss.org/zkdemo/combobox/cascader)
- Java API: [org.zkoss.zkmax.zul.Cascader](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Cascader.html)
- JavaScript API:
  [zkmax.inp.Cascader](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.inp.Cascader.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include supported-since.html version="9.0.0" %}

# Employment/Purpose

Cascader is used to select an item from a hierarchical structure of
data. It accepts a TreeModel.

# Example

![](/zk_component_ref/images/cascader-basic.png)

```xml
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

{% include CustomItemRendering.md component=cascader %}

# Properties

## Disabled

Sets whether it is disabled. A disabled component can't interact with
users.

## ItemConverter

Specify a full qualified class name that implements
[org.zkoss.util.Converter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Converter.html). The default implementation
is joining all the `toString()` result of items by slashes `/`.

By implementing your own one, you can generate a custom text that
represents the selected item.

{% include   CustomItemRendering.md component=cascader %}

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

| Name | Event Type                                                                                                                               |
|---|------------------------------------------------------------------------------------------------------------------------------------------|
| `onAfterRender` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)                   |
| `onSelect` | **Event:** [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Represents an event caused by user's the selection changed at the client. |
| `onOpen` | **Event:** [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) Represents an event that indicates an open state that is changed at the client. |

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`* None`


