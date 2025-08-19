---
title: "Combobox"
---


- Demonstration: [Combobox](http://www.zkoss.org/zkdemo/combobox)
- Java API: [org.zkoss.zul.Combobox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobox.html)
- JavaScript API: [zul.inp.Combobox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Combobox.html)


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

# Examples

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

# Keyboard Navigation Combobox

- `Alt+DOWN` to pop up the list.
- `Alt+UP` or `ESC` to close the list.
- `UP` and `DOWN` to change the selection of the items from the list.
- `ENTER` to confirm the change of selection.
- `ESC` to abort the change of selection. It is meaningful if
  `instantSelect` is false.

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

{% include version-badge.html version="5.0.4" %}

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

{% include version-badge.html version="8.0.3" %} By specifying this property, the
width of the popup will be set and ignore the default behavior.  
If percentage is specified to this property, the width of the popup will
be calculated with the width of the bandbox.  
For example, if it's set to 130%, and the width of the bandbox is 300px,
the popup of the bandbox will be 300px \* 130% = 390px  
If others is specified, it will be set to the width of the popup
directly.  

## InstantSelect

{% include version-badge.html version="8.6.1" %} By default, any change of selection
using the keyboard will trigger `onSelect` and `onChange` events
instantly. Once set this property `false`, users need to confirm the
change by pressing Enter key or make combobox lose its focus so
`onSelect` and `onChange` events will be triggered. And pressing Esc key
can abort the change and revert to previous selection.

## IconSclass

{% include version-badge.html version="8.6.2" %} Specify the sclass name of the
Combobox button icon.

# Inherited Functions

Please refer to [ Textbox]({{site.baseurl}}/zk_component_ref/textbox) for inherited
functions.

# Supported Events

| Name | Event Type |
|---|---|
| onSelect | **Event:**
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)
Represents an event caused by user's the list selection is changed at
the client. |
| `onOpen` | **Event:**
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
Denotes that the user has opened or closed a component. Note: unlike
`onClose`, this event is only a notification. The client
sends this event after opening or closing the component.
It is useful to implement <em>load-on-demand</em>by listening to the
`onOpen`event, and creating components when the first time
the component is opened. |
| `onAfterRender` | **Event:**
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) |

- Inherited Supported Events: [ Textbox]({{site.baseurl}}/zk_component_ref/textbox#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot                                                |
|---|---------------------------------------------------------|
| default | ![](/zk_component_ref/images/Combobox_mold_default.png) |
| rounded | ![](/zk_component_ref/images/Combobox_mold_rounded.png) 
{% include version-badge.html version="5.0.0" %} |

# Supported Children

`* `[` Comboitem`]({{site.baseurl}}/zk_component_ref/comboitem)



# Version History



| Version | Date         | Content                                                                                                                                                                                       |
|---------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 8.6.1   | January 2019 | [ZK-4185](https://tracker.zkoss.org/browse/ZK-4185): Combobox: provide option to reduce onSelect/onChange events when using keyboard                                                          |
| 5.0.4   | August 2010  | [org.zkoss.zul.ListModels](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModels.html) was introduced to simply the implementation of autocomplete.                                                                                      |
| 5.0.4   | July 2010    | Combobox supported [org.zkoss.zul.ext.Selectable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/Selectable.html) if it is also implemented with the specified [org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html). |
| 5.0.4   | July 2010    | Supported onAfterRender event                                                                                                                                                                 |


