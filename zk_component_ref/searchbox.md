---
title: "Searchbox"
---


- Demonstration:
  [zkoss-demo/zksearchbox-demo](https://github.com/zkoss-demo/zksearchbox-demo)
- Java API: [org.zkoss.zkmax.zul.Searchbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Searchbox.html)
- JavaScript API:
  [zkmax.inp.Searchbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.inp.Searchbox.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version="9.0.0" %}

# Employment/Purpose

A dropdown list that allows users to search and select items. Since it
contains a separate search field (unlike [ Combobox](/zk_component_ref/combobox)), it can
avoid end-users from inputting a non-existed item.

# Example

![](/zk_component_ref/images/Searchbox-example.png)

```xml
<zscript>
ListModel model = new ListModelArray(new String[] {
  "North America", "South America", "Europe", "Asia", "Africa", "Oceania", "Antarctica"
});
</zscript>
<searchbox model="${model}" placeholder="An unknown place" autoclose="true">
   <template name="model">
       <html><![CDATA[
       <i class="z-icon-globe"></i> ${each}
       ]]></html>
   </template>
</searchbox>
```

# Keyboard Navigation Searchbox

- `UP` or `DOWN` to pop up the list if being focused.
- `ESC` to close the list.
- `UP`, `DOWN`, `HOME`, `END`, `PAGE UP` and `PAGE DOWN` to change the
  selection of the item from the list.
- `ENTER` to confirm the change of selection.
- {% include version-badge.html version="9.5.0" %} `DELETE` or `BACKSPACE` to clear
  the selection.

# Properties

## Autoclose

{% include DefaultValue.md value=false %}

Sets whether to automatically close the list if a user selects any item.
It means even if the user selects an item, the list still remains open.
You might want to set it as `true` in single selection mode
(multiple=false).

## Disabled

Sets whether it is disabled. A list can still be opened programmatically
by calling `open()` even if the component is in the disabled state.

## ItemConverter

By implementing your own [org.zkoss.util.Converter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Converter.html)
using the `org.zkoss.util.Converter` interface, you can generate the
label that represents the selected items. The default implementation is
joining all the `toString()` result of items by commas.

Can accept a Class name as a string, in which case an instance of that
class will be created automatically, or an object already instantiated.

```xml
    <searchbox model="${model}" itemConverter="foo.bar.MyConverter" />
    <searchbox model="${model}" itemConverter="${myConverterObject}" />
```

## Model

Since this component doesn't accept any child, you must specify a model
object.

### Search at Client-side

If you assign a
[ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html),
it renders all data to a browser and searches the matched items in
JavaScript.

### Search at Server-side

When a [org.zkoss.zul.ListSubModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListSubModel.html) is provided, not
all items are rendered to the client initially. Instead, as a user types
into the search input, the entered text is sent to the server where it
is used to filter the ListSubModel and retrieve only the subset of items
that match the search term. The default String-based filtering uses
`startsWith()` for a simple prefix-match search.

## Multiple

Sets whether multiple selections are allowed.

If you assign a model object to a searchbox, you should enable multiple
selections with ListModel API, e.g. `model.setMultiple(true)`. Please do
not set multiple on searchbox directly. You should set multiple on the
model instead.

```java
List Items = new ArrayList();
for (int i = 0; i < 1000; i++) {
    Items.add("data "+i);
}
ListModelList model = new ListModelList(Items);
model.setMultiple(true);
```

## Open

Drops down or closes the list of items.

## Placeholder

Sets the placeholder text that is displayed when there's nothing
selected.

## SearchMessage

Sets the placeholder message of the search text field. The default is
"Type to search".

## SelectedItem

Returns the selected item, or null if no item is selected. When multiple
is true, it returns the first of the selected items.

Don't use MVVM annotations in both `selectedItem` and `selectedItems` at
the same time since `@save` `selectedItem` will deselect all of the
currently selected items first.

## SelectedItems

Returns all selected items.

{% include   CustomItemRendering.md component=searchbox %}

# Supported Events

| Name | Event Type |
|---|---|
| `onAfterRender` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) |
| `onSelect` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)
Represents an event caused by the user that the list selection is
changed at the client. |
| `onOpen` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
Denotes that the user has opened or closed a component. Note: unlike
`onClose`, this event is only a notification. The client
sends this event after opening or closing the component. |
| `onSearching` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html)
Notifies one that the user is searching by keywords. |

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`* none`

# Version History



| Version | Date           | Content                                                                                                               |
|---------|----------------|-----------------------------------------------------------------------------------------------------------------------|
| 9.0.0   | September 2019 | [ZK-4380](https://tracker.zkoss.org/browse/ZK-4380): Provide a Searchbox component                                    |
| 9.5.0   | August 2020    | [ZK-4497](https://tracker.zkoss.org/browse/ZK-4497): searchbox: improve clearing selection, key shortcut / clear icon |


