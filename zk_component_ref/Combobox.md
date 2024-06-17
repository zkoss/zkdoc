# Combobox

- Demonstration: [Combobox](http://www.zkoss.org/zkdemo/combobox)
- Java API: <javadoc>org.zkoss.zul.Combobox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.inp.Combobox</javadoc>
- Style Guide: [
  Combobox](ZK_Style_Guide/XUL_Component_Specification/Combobox)

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
[Searchbox](ZK_Component_Reference/Input/Searchbox) component
instead.

# Examples

## Selection Only

Recommend to use
[Searchbox](ZK_Component_Reference/Input/Searchbox), [
Listbox select
mold](ZK_Component_Reference/Data/Listbox#Select_Mold) or [
Selectbox](ZK%20Component%20Reference/Essential%20Components/Selectbox).

``` xml
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

``` xml
 <combobox>
     <comboitem label="Simple and Rich"/>
     <comboitem label="Cool!"/>
     <comboitem label="Ajax and RIA"/>
 </combobox>
```

When you type 'C', it will auto-complete with "Cool".
![](ZKComRef_Combobox_Example.PNG "ZKComRef_Combobox_Example.PNG")

Be aware that a user still can enter a non-existing item.

## Default Selection

<figure>
<img src="combobox_onAfterRender.png"
title="combobox_onAfterRender.png" />
<figcaption>combobox_onAfterRender.png</figcaption>
</figure>

``` xml
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

``` xml
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

# Properties

## Value and selectedItem

The `value` stores the selected \`comboitem\`'s `label` value and
`selectedItem` stores the selected \`comboitem\`'s `value` value:

If you select the 1st item:

``` xml
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

``` xml
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
<javadoc type="interface">org.zkoss.zul.ListSubModel</javadoc> and set
it to Combobox. There are 2 ways:

#### Use <javadoc>org.zkoss.zul.SimpleListModel</javadoc>

Unlike <javadoc>org.zkoss.zul.ListModelList</javadoc> and others,
<javadoc>org.zkoss.zul.SimpleListModel</javadoc> implements
<javadoc type="interface">org.zkoss.zul.ListSubModel</javadoc> by
default. You can use <javadoc>org.zkoss.zul.SimpleListModel</javadoc>
directly but it handles only an array of data.

#### Convert <javadoc>org.zkoss.zul.ListModel</javadoc> with <javadoc method="toListSubModel(org.zkoss.zul.ListModel)">org.zkoss.zul.ListModels</javadoc>

The methods convert ListModel to ListSubModel which proxies the original
ListModel.

For example,

``` xml
<combobox apply="org.zkoss.reference.component.input.MyAutoCompleteComposer"/>
```

``` java
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
<javadoc method="toListSubModel(org.zkoss.zul.ListModel, java.util.Comparator, int)">org.zkoss.zul.ListModels</javadoc>
instead.

> ------------------------------------------------------------------------
>
> **Note**: Passing an instance of
> <javadoc>org.zkoss.zul.ListModelList</javadoc> directly to a combobox
> will show up all items in the list model, since it doesn't implement
> <javadoc>org.zkoss.zul.ListSubModel</javadoc>.

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

``` xml
<combobox autodrop="true"/>
```

If you prefer to drop down the list when gaining the focus, you could
provide a client-side listener as follows.

``` xml
<combobox w:onFocus="this.open()" xmlns:w="client"/>
```

## Description

You are able to add a description to each combo item to make it more
descriptive or assign an image to every item.

``` xml
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

<figure>
<img src="ZKComRef_Combobox_Description.PNG"
title="ZKComRef_Combobox_Description.PNG" />
<figcaption>ZKComRef_Combobox_Description.PNG</figcaption>
</figure>

Akin to other components that support images, you are able to use the
`setImageContent` method to assign a dynamically generated image to the
`comboitem` component. Please refer to the **Image** section for
details.

## The onOpen Event

The `onOpen` event is sent to the application when a user opens the
drop-down list. To defer the creation of combo items, you can use the
`fulfill` attribute as shown below.

<figure>
<img src="ZKComRef_Combobox_Example.PNG"
title="ZKComRef_Combobox_Example.PNG" />
<figcaption>ZKComRef_Combobox_Example.PNG</figcaption>
</figure>

``` xml
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

``` xml
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

``` xml
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
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc>.

## Constraint

Please see
[ZK_Component_Reference/Base_Components/InputElement#Constraint](ZK_Component_Reference/Base_Components/InputElement#Constraint).

## PopupWidth

By specifying this property, the width of the popup will be set and
ignore the default behavior.  
If percentage is specified to this property, the width of the popup will
be calculated with the width of the bandbox.  
For example, if it's set to 130%, and the width of the bandbox is 300px,
the popup of the bandbox will be 300px \* 130% = 390px  
If others is specified, it will be set to the width of the popup
directly.  

## InstantSelect

By default, any change of selection using the keyboard will trigger
`onSelect` and `onChange` events instantly. Once set this property
`false`, users need to confirm the change by pressing Enter key or make
combobox lose its focus so `onSelect` and `onChange` events will be
triggered. And pressing Esc key can abort the change and revert to
previous selection.

## IconSclass

Specify the sclass name of the Combobox button icon.

# Inherited Functions

Please refer to [
Textbox](ZK_Component_Reference/Input/Textbox) for inherited
functions.

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
<p>onSelect</p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc></p>
<p>Represents an event caused by user's the list selection is changed at
the client.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Denotes that the user has opened or closed a component. Note: unlike
<code>onClose</code>, this event is only a notification. The client
sends this event after opening or closing the component.</p>
<p>It is useful to implement <em>load-on-demand</em>by listening to the
<code>onOpen</code>event, and creating components when the first time
the component is opened. |-</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  Textbox](ZK_Component_Reference/Input/Textbox#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td><figure>
<img src="combobox_mold_default.png"
title="combobox_mold_default.png" />
<figcaption>combobox_mold_default.png</figcaption>
</figure></td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td><p><img src="combobox_mold_rounded.png"
title="combobox_mold_rounded.png" alt="combobox_mold_rounded.png" />
</p></td>
</tr>
</tbody>
</table>

# Supported Children

`* `[` Comboitem`](ZK_Component_Reference/Input/Combobox/Comboitem)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date         | Content                                                                                                                                                                                       |
|---------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 8.6.1   | January 2019 | [ZK-4185](https://tracker.zkoss.org/browse/ZK-4185): Combobox: provide option to reduce onSelect/onChange events when using keyboard                                                          |
| 5.0.4   | August 2010  | <javadoc>org.zkoss.zul.ListModels</javadoc> was introduced to simply the implementation of autocomplete.                                                                                      |
| 5.0.4   | July 2010    | Combobox supported <javadoc type="interface">org.zkoss.zul.ext.Selectable</javadoc> if it is also implemented with the specified <javadoc type="interface">org.zkoss.zul.ListModel</javadoc>. |
| 5.0.4   | July 2010    | Supported onAfterRender event                                                                                                                                                                 |
