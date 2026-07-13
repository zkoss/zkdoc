---
title: "Combobox"
---

- **Demonstration:** [Combobox](http://www.zkoss.org/zkdemo/combobox)
- **Java API:** [org.zkoss.zul.Combobox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobox.html)
- **JavaScript API:** [zul.inp.Combobox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Combobox.html)

# Employment/Purpose

Components: `combobox` and `comboitem`.

A `combobox` is a special text box that embeds a drop-down list. With
`comboboxes`, users are allowed to select from a drop-down list, in
addition to entering the text manually.

The authoritative field of the combobox is the text value accessed by
the value field. While the Combobox provides a selectedItem field and
onSelect event, the selected item may be null if the user typed in any
text that is not part of the list of prefilled values.

For the use case of searching and selecting items in a list of options,
without allowing custom text, refer to the
[Searchbox]({{site.baseurl}}/zk_component_ref/searchbox) component
instead.

## Common Use Cases

- **Free-text entry with suggestions** — users can type any value or pick from a pre-populated list; the authoritative field is always the text `value`.
- **Autocomplete from a large dataset** — assign a `ListSubModel`-backed model so the drop-down filters as the user types, avoiding loading thousands of items at once.
- **Constrained selection with read-only mode** — set `readonly="true"` to prevent free-text entry while still letting users pick from the list (for strict selection without free-text, prefer [Searchbox]({{site.baseurl}}/zk_component_ref/searchbox)).
- **Dynamic list population** — listen to `onOpen` or `onChanging` to build or refresh the list of `comboitem` children on demand.

# Example

## Selection Only

Recommend to use
[Searchbox]({{site.baseurl}}/zk_component_ref/searchbox), [ Listbox select mold]({{site.baseurl}}/zk_component_ref/listbox#Select_Mold) or [ Selectbox](/zk_component_ref/selectbox).

```xml
<style>
.z-combobox-readonly>input{
    background-color: initial;
}
</style>

<combobox model="${model}" readonly="true"/>
```

- a read-only combobox can avoid users from entering non-existed items

## AutoComplete by Default

When you type a character, this component will auto-complete your typing
with first-matched, existing items.

Assume you create a combobox like:

```xml
 <combobox>
     <comboitem label="Simple and Rich"/>
     <comboitem label="Cool!"/>
     <comboitem label="Ajax and RIA"/>
 </combobox>
```

When you type 'C', it will auto-complete with "Cool".
![](/zk_component_ref/images/ZKComRef_Combobox_Example.PNG)

Be aware that a user still can enter a non-existing item.

## Default Selection

![](/zk_component_ref/images/Combobox_onAfterRender.png)

```xml
    <zscript><![CDATA[
        ListModelList model = new ListModelList(Arrays.asList(new String[] { "David",
                "Thomas", "Steven" }));
        model.addToSelection(model.get(2));
    ]]></zscript>
    
    <combobox model="${model}"/>
```

- Line 4: When you assign a model object to a component, set the
  selection through the model object e.g. `model.addToSelection()`

# Accessibility

## Keyboard Support

| Key | Description |
|---|---|
| Alt + ArrowDown | Open the popup list. |
| Alt + ArrowUp / Escape | Close the popup list. |
| ArrowUp / ArrowDown | Change the selection of the items in the list. |
| Enter | Confirm the change of selection. |
| Escape | Abort the change of selection (meaningful if `instantSelect` is false). |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Live Data

## Selectable

By specifying the selection, you can invoke the addSelection() to select
a default value, For example,

```xml
<combobox id="combobox" width="100px">
    <attribute name="onCreate"><![CDATA[
        List list2 = new ArrayList();
        list2.add("David");
        list2.add("Thomas");
        list2.add("Steven");
        ListModelList lm2 = new ListModelList(list2);
        lm2.addToSelection(lm2.get(0));
        combobox.setModel(lm2);
    ]]></attribute>
</combobox>
```

{% include supported-since.html version="5.0.4" %}

# Properties

## Value and selectedItem

The `value` stores the selected \`comboitem\`'s `label` value and
`selectedItem` stores the selected \`comboitem\`'s `value` value:

If you select the 1st item:

```xml
        <combobox value="@bind(vm.inputValue)" selectedItem="@bind(vm.selectedValue)" >
            <comboitem label="label 1" value="value1" />
            <comboitem label="label 2" value="value2" />
        </combobox>
```

- `vm.inputValue` is `label 1`.
- `vm.selectedValue` is `value1`.

## Autocomplete

By default, it will autocomplete your input with the first item in the
list that has the same starting string in a case-insensitive way.

### Autocomplete in a Brute-force Way

The straightforward way to implement the autocomplete feature is to
listen to the onChanging event. For example,

```xml
<combobox>
  <attribute name="onChanging"><![CDATA[
  self.getChildren().clear(); //remove all children
  for (String value: getMatched(event.getValue())
    self.appendChild(new Comboitem(value));
  ]]></attribute>
</combobox>
```

Line 4: We assume `getMatched()` is an application-specific method that
returns a collection of matched values.

### Autocomplete by ListSubModel

To separate the data from the view (Combobox) better, we can implement
[org.zkoss.zul.ListSubModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListSubModel.html) and set
it to Combobox. There are 2 ways:

#### Use [org.zkoss.zul.SimpleListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleListModel.html)

Unlike [org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html) and others,
[org.zkoss.zul.SimpleListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleListModel.html) implements
[org.zkoss.zul.ListSubModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListSubModel.html) by
default. You can use [org.zkoss.zul.SimpleListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleListModel.html)
directly but it handles only an array of data.

#### Convert [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html) with [org.zkoss.zul.ListModels#toListSubModel(org.zkoss.zul.ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModels.html#toListSubModel(org.zkoss.zul.ListModel))

The methods convert ListModel to ListSubModel which proxies the original
ListModel.

For example,

```xml
<combobox apply="org.zkoss.reference.component.input.MyAutoCompleteComposer"/>
```

```java
public class MyAutoCompleteComposer extends SelectorComposer<Component> {
    @Wire("combobox")
    private Combobox combobox;
    private List<Locale> items = Arrays.asList(Locale.getAvailableLocales());

    @Override
    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        combobox.setModel(ListModels.toListSubModel(new ListModelList(getAllItems())));
    }

    List getAllItems() {
        return items;
    }
}
```

#### Default Matching Rule

By default, it shows the first 15 items whose prefix starts with the
user input. If you want to have a different value or a different
comparator to find out matched items, you can invoke
[org.zkoss.zul.ListModels#toListSubModel(org.zkoss.zul.ListModel, java.util.Comparator, int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModels.html#toListSubModel(org.zkoss.zul.ListModel, java.util.Comparator, int))
instead.

> ------------------------------------------------------------------------
>
> **Note**: Passing an instance of
> [org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html) directly to a combobox
> will show up all items in the list model, since it doesn't implement
> [org.zkoss.zul.ListSubModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListSubModel.html).

## Readonly

`Default:false`

Once set, a user is not allowed to type characters, but he still can
select the items in the Combobox.

## Autodrop

By default, the drop-down list won't be opened until the user clicks the
button, or presses Alt+DOWN. However, you could set the autodrop
property to true, meaning as soon as the user types a character the
drop-down list will be opened. This is helpful for novice users, but it
might be annoying for experienced users.

If you prefer the combobox to drop down the list when the user types a
character, you could specify the autodrop attribute as follows.

```xml
<combobox autodrop="true"/>
```

If you prefer to drop down the list when gaining the focus, you could
provide a client-side listener as follows.

```xml
<combobox w:onFocus="this.open()" xmlns:w="client"/>
```

## Description

You are able to add a description to each combo item to make it more
descriptive or assign an image to every item.

```xml
<zk>
    <combobox>
        <comboitem label="Simple and Rich"
            image="/img/Centigrade-Widget-Icons/GoldBar-32x32.gif"
            description="The simplest way to make Web applications rich" />
        <comboitem label="Cool!"
            image="/img/Centigrade-Widget-Icons/CogwheelEye-32x32.gif"
            description="The coolest technology" />
        <comboitem label="Ajax and RIA"
            image="/img/Centigrade-Widget-Icons/WindowGlobe-32x32.gif"
            description="Rich Internet Application by Ajax" />
    </combobox>
</zk>
```

![](/zk_component_ref/images/ZKComRef_Combobox_Description.PNG)

Akin to other components that support images, you are able to use the
`setImageContent` method to assign a dynamically generated image to the
`comboitem` component. Please refer to the **Image** section for
details.

## The onOpen Event

The `onOpen` event is sent to the application when a user opens the
drop-down list. To defer the creation of combo items, you can use the
`fulfill` attribute as shown below.

![](/zk_component_ref/images/ZKComRef_Combobox_Example.PNG)

```xml
<zk>
    <combobox fulfill="onOpen">
        <comboitem label="Simple and Rich"/>
        <comboitem label="Cool!"/>
        <comboitem label="Ajax and RIA"/>
    </combobox> 
</zk>
```

Alternatively, you can listen to the `onOpen` event and prepare the
drop-down list or change it dynamically as demonstrated below.

```xml
<zk>
    <zscript>
        void prepare() 
        {
            if (combo.getItemCount() == 0) 
            {
                combo.appendItem("Simple and Rich");
                combo.appendItem("Cool!");
                combo.appendItem("Ajax and RIA");
            }
        }
    </zscript>
    <combobox id="combo" onOpen="prepare()" />      
</zk>
```

The `appendItem` method is equivalent to creating a combo item and then
setting the combobox as its parent.

## The onChanging Event

Since a combobox is also a text box, you are also able to listen to an
`onChanging` event. By listening to this event, you can manipulate the
drop-down list as demonstrated by Google Suggests
(http://www.google.com/webhp?complete=1&hl=en). This feature is
sometimes called auto-complete.

As illustrated below, you can populate the drop-down list based on what
user is entering.

```xml
<zk>
    <zscript>
         void suggest() 
         {
             combo.getItems().clear();
             if (event.value.startsWith("A")) {
                 combo.appendItem("Ace");
                 combo.appendItem("Ajax");
                 combo.appendItem("Apple");
             } else if (event.value.startsWith("B")) {
                 combo.appendItem("Best");
                 combo.appendItem("Blog");
             }
         }
    </zscript>
    
    <combobox id="combo" autodrop="true" onChanging="suggest()"/>
</zk>
```

Notice that, when the `onChanging` event is received, the content of the
combobox has not changed. Therefore, you cannot use the `value` property
of the combobox. Instead, you should use the `value` property of the
[org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html).

## Constraint

Please see
[{{site.baseurl}}/zk_component_ref/inputelement#Constraint]({{site.baseurl}}/zk_component_ref/inputelement#Constraint).

## PopupWidth

{% include supported-since.html version="8.0.3" %} By specifying this property, the
width of the popup will be set and ignore the default behavior.  
If percentage is specified to this property, the width of the popup will
be calculated with the width of the bandbox.  
For example, if it's set to 130%, and the width of the bandbox is 300px,
the popup of the bandbox will be 300px \* 130% = 390px  
If others is specified, it will be set to the width of the popup
directly.  

## InstantSelect

{% include supported-since.html version="8.6.1" %} By default, any change of selection
using the keyboard will trigger `onSelect` and `onChange` events
instantly. Once set this property `false`, users need to confirm the
change by pressing Enter key or make combobox lose its focus so
`onSelect` and `onChange` events will be triggered. And pressing Esc key
can abort the change and revert to previous selection.

## IconSclass

{% include supported-since.html version="8.6.2" %} Specify the sclass name of the
Combobox button icon.

## ButtonVisible

**Default Value:** `true`

Controls whether the drop-down button on the right side of the text field is rendered. Set to `false` to hide the button while still allowing the drop-down list to open via keyboard shortcut (`Alt+DOWN`) or programmatically.

```xml
<combobox buttonVisible="false"/>
```

## EmptySearchMessage

**Default Value:** `null`

{% include supported-since.html version="8.5.1" %}

Sets the message displayed in the drop-down popup when a model-backed search yields no matching items. This property is only meaningful when a `model` is assigned; it has no effect on a static list of `comboitem` children.

```xml
<zscript>
    ListModel model = new ListModelList(new String[]{"Apple", "Banana", "Cherry"});
</zscript>
<combobox model="${model}" emptySearchMessage="No results found"/>
```

## ItemRenderer

{% include supported-since.html version="3.0.2" %}

Assigns a custom `ComboitemRenderer` that controls how each model element is rendered as a `Comboitem` when a `model` is set. When `null` (the default), ZK uses a built-in renderer that calls `toString()` on each element.

Note: changing the renderer after a model has already been rendered does **not** automatically re-render the list. To force a re-render, re-assign the same model: `combobox.setModel(combobox.getModel())`.

```xml
<zscript>
    // both the model and the renderer are Java objects; build them in code and reference via EL
    ListModel model = new ListModelList(new String[]{"Option A", "Option B", "Option C"});
    ComboitemRenderer renderer = new MyCustomRenderer();
</zscript>
<combobox model="${model}" itemRenderer="${renderer}"/>
```

## Model

{% include supported-since.html version="3.0.2" %}

Assigns a `ListModel` as the data source for the combobox, replacing any statically declared `comboitem` children. The model must also implement `Selectable`; if it does not, an `UiException` is thrown at runtime.

For autocomplete with filtering, use a model that implements `ListSubModel` (e.g. `SimpleListModel`, or wrap any `ListModel` with `ListModels.toListSubModel(...)`). A plain `ListModelList` does **not** implement `ListSubModel` and will show all items regardless of user input.

Assigning a new model (even the same instance) always triggers a full re-render of the drop-down items.

```xml
<zscript>
    ListModel model = new ListModelList(new String[]{"Option A", "Option B", "Option C"});
</zscript>
<combobox model="${model}"/>
```

## Open

**Default Value:** `false`

{% include supported-since.html version="6.0.0" %}

Controls whether the drop-down list is currently open. Setting this property to `true` opens the list; `false` closes it. The setter only has an effect while the component is visible; calling `setOpen` on a hidden combobox is a no-op.

For unconditional programmatic control (bypassing the visibility check), use the `open()` and `close()` Java methods directly.

```xml
<combobox open="true">
  <comboitem label="Option A"/>
  <comboitem label="Option B"/>
</combobox>
```

## SelectedIndex

**Default Value:** `-1` (nothing selected)

{% include supported-since.html version="3.0.2" %}

Deselects the currently selected item and selects the `Comboitem` at the given zero-based index. Pass `-1` to clear the selection. Throws `UiException` if the index is out of range.

When using a `ListSubModel` for autocomplete, the displayed list is a filtered subset of the full model, so the index refers to the rendered items, not the underlying model positions.

```xml
<combobox selectedIndex="0">
  <comboitem label="Option A"/>
  <comboitem label="Option B"/>
</combobox>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| onSelect | [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) | Represents an event caused by user's the list selection is changed at the client. |
| onOpen | [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | Denotes that the user has opened or closed a component. Note: unlike `onClose`, this event is only a notification. The client sends this event after opening or closing the component. It is useful to implement <em>load-on-demand</em> by listening to the `onOpen` event, and creating components when the first time the component is opened. |

- Inherited Supported Events: [Textbox]({{site.baseurl}}/zk_component_ref/textbox#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot                                                |
|---|---------------------------------------------------------|
| default | ![](/zk_component_ref/images/Combobox_mold_default.png) |
| rounded | ![](/zk_component_ref/images/Combobox_mold_rounded.png) {% include supported-since.html version="5.0.0" %} |

# Supported Children

`* ` [Comboitem]({{site.baseurl}}/zk_component_ref/comboitem)

# Inherited Functions

Please refer to [Textbox]({{site.baseurl}}/zk_component_ref/textbox) for inherited functions.