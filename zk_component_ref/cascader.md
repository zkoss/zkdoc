---
title: "Cascader"
---

- **Demonstration:** [Cascader](https://www.zkoss.org/zkdemo/combobox/cascader)
- **Java API:** [org.zkoss.zkmax.zul.Cascader](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Cascader.html)
- **JavaScript API:** [zkmax.inp.Cascader](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.inp.Cascader.html)

{% include edition-availability.html edition="pe" %}
{% include supported-since.html version="9.0.0" %}

# Employment/Purpose

Cascader is used to select an item from a hierarchical structure of
data. It accepts a TreeModel.

## Common Use Cases

- **Category / region drill-down** — Present a multi-level hierarchy such as Country → Province → City in a compact single input, letting users progressively narrow selection without displaying the full tree at once.
- **Product attribute selection** — Allow users to pick a configuration path (e.g. Electronics → Phones → Android) and capture only the final leaf as the selected value.
- **Administrative area pickers** — Embed inside forms that require a structured geographic or organisational path (division → department → team) where the valid options at each level depend on the parent selection.
- **Menu-driven navigation** — Trigger a `<cascader>` from a toolbar to let users jump to a deeply nested section of a document or data set without exposing the full tree UI.

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

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowLeft / ArrowRight | Navigate options. |
| ArrowDown | Open the popup or navigate options |
| Enter / Spacebar | Select the options |
| Escape | Close the popup |
| Backspace / Delete | Clear selection |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Properties

## ItemConverter

Specify a full qualified class name that implements
[org.zkoss.util.Converter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Converter.html). The default implementation
is joining all the `toString()` result of items by slashes `/`.

By implementing your own one, you can generate a custom text that
represents the selected item.

{% include   CustomItemRendering.md component=cascader %}

## ItemRenderer

Sets a custom renderer that returns the HTML snippet shown for each item in the dropdown panel when a `model` is set; when `null`, the default renderer uses the tree node data's `toString()`. Because it is a Java object (`org.zkoss.zul.ItemRenderer`), supply it from a `<zscript>` block, composer, or ViewModel and reference it via EL — or pass a fully-qualified class-name string.

```xml
<cascader model="${treeModel}" itemRenderer="${myRenderer}"/>
```

See the **Custom Item Rendering** section on this page and [Item Renderer]({{site.baseurl}}/zk_dev_ref/mvc/item_renderer) for the renderer interface, escaping rules, and a complete example.

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

| Name | Event Type | Description |
|---|---|---|
| `onSelect` | [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) | Fires when the cascader's selection changes at the client. |
| `onOpen` | [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | Fires when the cascader is opened or closed at the client. |
| `onFocus` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Fires when the cascader gains input focus. |
| `onBlur` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Fires when the cascader loses input focus. |

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`* None`
