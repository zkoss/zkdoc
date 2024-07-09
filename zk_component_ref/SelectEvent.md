

# SelectEvent

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc>
- JavaScript API: N/A

# Employment/Purpose

Represents an event cause by user's the list selection is changed at the
client.

# Example

## Get Keys

It would be very helpful to add the getKeys() method of a MouseEvent to
SelectEvents. For example, if you're using a listbox and want to detect
if the CTRL key is being held when one of the listitems is selected.

<figure>
<img src="images/ZKComRef_SelectEvent_GetKeys.png
title="ZKComRef_SelectEvent_GetKeys.png" />
<figcaption>ZKComRef_SelectEvent_GetKeys.png</figcaption>
</figure>

``` xml
<zk>
    <label id="i"/>
    <listbox onSelect='i.value = "keys: "+event.getKeys()'>
        <listhead>
            <listheader label="Population"/>
            <listheader label="%"/>
        </listhead>
        <listitem value="A">
            <listcell>a</listcell>
            <listcell label="20%"/>
        </listitem>
        <listitem value="B">
            <listcell>b</listcell>
            <listcell>c</listcell>
        </listitem>
    </listbox>
</zk>
```

## Get the Previous Selected Items

If users want to know which of the selected items are newly added or
removed, they can use the *getPreviousSelectedItems* method to filter
out. (if a model exists and is in paging mold, it should return null)

## Get the Previous Selected Objects

{% include version-badge.html version=7.0.1 %} If users want to know which of the
selected objects are new added or removed, they can use the
*getPreviousSelectedObjects* method to filter out. The information is
available only when the target component has a model.

## Get the Unselected Items

{% include version-badge.html version=7.0.1 %} If users want to know which of the
selected items are deselected, they can use the *getUnselectedItems*
method to filter out. (if a model exists and is in paging mold, it
should return null)

## Get the Unselected Objects

{% include version-badge.html version=7.0.1 %} If users want to know which of the
selected objects are deselected, they can use the *getUnselectedObjects*
method to filter out. The information is available only when the target
component has a model.

# Supported events

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date           | Content                                                                                                                                                    |
|---------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 7.0.0   | October, 2013. | [Multiple selection component(listbox, chosenbox) support extra information for find out added item/removed item](http://tracker.zkoss.org/browse/ZK-1992) |
| 7.0.1   | January 2014.  | [SelectEvent support get UnselectedItems](http://tracker.zkoss.org/browse/ZK-2089)                                                                         |


