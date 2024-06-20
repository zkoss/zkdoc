{% include ZKComponentReferencePageHeader %}

# Chosenbox

- [Demonstration](https://www.zkoss.org/zkdemo/zk_pe_and_ee/combobox_chosenbox)
- Java API: <javadoc>org.zkoss.zkmax.zul.Chosenbox</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.inp.Chosenbox</javadoc>
- Style Guide: [
  Chosenbox](ZK_Style_Guide/XUL_Component_Specification/Chosenbox)
- {% include ZK EE %}

# Employment/Purpose

A component similar to [
Combobox](ZK_Component_Reference/Input/Combobox) but handles
the multi-selection and the select order.

# Example

## Typical Usage

- <b>creatable</b> attribute denotes whether or not to display
  <b>createMessage</b> when a user inputs a value that is non-existing
  in the model, and sends it back to the server along with an
  <b>onSearch</b> event when user clicks the ENTER key or separator.
- <b>emptyMessage</b> will be displayed as a placeholder if nothing is
  selected or focused.
- <b>noResultText</b> will be displayed if nothing matches the input
  value and it cannot be created either; syntax "{0}" will be replaced
  with the input value at client side.
- <b>createMessage</b> will be displayed in popup if nothing matches the
  input value but can be created as new label; syntax "{0}" will be
  replaced with the input value at the client-side.

When no item is selected or focused, <b>emptyMessage</b> is visible.

<figure>
<img src="CompREF_Chosenbox_msgEx_01.png"
title="CompREF_Chosenbox_msgEx_01.png" />
<figcaption>CompREF_Chosenbox_msgEx_01.png</figcaption>
</figure>

When there is no data to be shown in the model and data 0 already
selected, <b>noResultText</b> appears.

<figure>
<img src="CompREF_Chosenbox_msgEx_02.png"
title="CompREF_Chosenbox_msgEx_02.png" />
<figcaption>CompREF_Chosenbox_msgEx_02.png</figcaption>
</figure>

When there is no item in the model but it is creatable,
<b>createMessage</b> appears.

<figure>
<img src="CompREF_Chosenbox_msgEx_03.png"
title="CompREF_Chosenbox_msgEx_03.png" />
<figcaption>CompREF_Chosenbox_msgEx_03.png</figcaption>
</figure>

``` xml
    <zscript>
        ListModelList model = new ListModelList(Locale.getAvailableLocales());
    </zscript>
    <chosenbox width="400px"
               model="${model}" creatable="true"
               emptyMessage=" Please select some items."
               noResultsText=" No such item - {0} - and it is already in the model."
               createMessage=" No such item -{0} - but it is not in model either, you can try to create it.">
        <attribute name="onSearch">
            Object obj = event.getValue();
            ((ListModelList)model).add(obj);
            self.addItemToSelection(obj);
        </attribute>
    </chosenbox>
```

## Rendering All

Here, all the content will be sent to and processed at the client side.
The rendering process is pretty fast with a few items but may cause
performance issue when the model exceeds 40,000 items and rendering them
all at once.

![](CompREF_Chosenbox_01.png)

``` xml
    <zscript>
        ListModelList model = new ListModelList(Locale.getAvailableLocales());
    </zscript>
    <chosenbox width="400px" model="${model}"/>
```

## Lazy Rendering

With `ListSubModel`, Chosenbox doesn't render any DOM elements in the
drop-down list at first. Until a user enters a character, it retrieves
'matched' items from the server-side and renders them in the drop-down
list. This might produce some delay at the client side because of server
processing time and network latency.

See also:
[Combobox#Autocomplete_by_ListSubModel](http://books.zkoss.org/wiki/ZK_Component_Reference/Input/Combobox#Autocomplete_by_ListSubModel)

``` xml
    <zscript><![CDATA[
        ListModelList model = new ListModelList(Locale.getAvailableLocales());
        ListSubModel subModel = ListModels.toListSubModel(model);
    ]]></zscript>
    <chosenbox width="400px" model="${subModel}"/>
```

{% include CustomItemRendering \|chosenbox %}

# Keyboard Navigation Chosenbox

- Press `UP` and `DOWN` to move the focus up and down by one option.
- Press `LEFT` and `RIGHT` to move focus between selected item(s) and
  the input field.
- Press `ESC` to clear input and close drop-down list.
- Press `DELETE` to delete the focused item and move focus to next item
  if any or input field.
- Press `BACKSPACE` to delete the focused item and move focus to
  previous item if any or input field.
- Press `ENTER` or `specified separator` to select the focused option.

# Properties

- **creatable**: specify whether to send an event to server when user
  inputs an non-existing value by clicking ENTER or separator. Default:
  **false**
- **createMessage**: displayed in popup if nothing matches the input
  value and creatable is true; syntax "{0}" will be replaced with the
  input value at client side
- **disabled**: specify whether or not it is disabled. Default:
  **false**
- **emptyMessage**: displayed as place holder in input if nothing is
  selected or focused
- **model**: specify the <b>ListModel</b> of this <b>chosenbox</b>

<!-- -->

- If you set <b>ListModelList</b> to the model of <b>chosenbox</b>, all
  the content will be sent to and processed at the client-side, The
  rendering process is pretty fast with a few items but may cause
  performance issue when the model exceeds 40,000 items and rendering
  them all at once
- If you set <b>ListSubModel</b> to the <b>chosenbox</b> model, the
  content of the drop-down list will not be rendered to the
  client-side,and will remain blank until user enters an input. The
  server will then provide a 'matched' content for the input. This will
  cause some delay at the client side because of server processing time
  and network transfer time

<li>

**name**: specify the name of the input element of this component

</li>
<li>

**noResultsText**: displayed in popup window if nothing matches the
input value and creatable is false; syntax "{0}" will be replaced with
the input value at client-side

</li>
<li>

**open**: specify whether or not to open the drop-down list. Default:
**false**

</li>
<li>

**tabindex**: specify the tab order of the input node of this component.
Default: **0**

</li>
<li>

**separator**: the separate characters will work as 'Enter' key when
clicked on; it will not be considered as an input value. Upon releasing
the key, it will an send onSearch or onSelect event depending on the
situation. Supports: 0-9, A-Z (case insensitive), and `,.;'[]/\-=`

</li>
</ul>

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
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc></p>
<p>Represents an event caused by user's the selection changed at the
client.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Represents an event that indicates an open state that is changed at
the client.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onSearch</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p>Represents an event that indicates users inputting an non-existing
value by clicking ENTER or separator.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSearching</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p>Represents an event sent back to the server caused by user's input
text.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onItemClick</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Represents an event sent back to the server caused by clicking a
selected tag.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HtmlBasedComponent](ZK_Component_Reference/Base_Components/HtmlBasedComponent#Supported_Events)

# Supported Molds

- The default mold

# Supported Children

`None`

# Use Cases

| Version | Description         | Example Location                                                                                                                                                                               |
|---------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6.0.1+  | Creatable Chosenbox | [Chosenbox – A beautiful and powerful multiple combobox](http://blog.zkoss.org/index.php/2012/02/09/zk-6-0-new-feature-highlight-part-4-chosenbox-a-beautiful-and-powerful-multiple-combobox/) |

# Version History

{% include LastUpdated %}

| Version | Date          | Content                         |
|---------|---------------|---------------------------------|
| 6.0.1   | April 3, 2012 | Add the new Chosenbox component |
| 8.0.2   | May 24, 2016  | Add the new Event - onItemClick |

{% include ZKComponentReferencePageFooter %}
