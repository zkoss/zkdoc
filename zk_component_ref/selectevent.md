---
title: "SelectEvent"
---


- Demonstration: N/A
- Java API: [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)
- JavaScript API: N/A

# Employment/Purpose

Represents an event cause by user's the list selection is changed at the
client.

# Example

## Get Keys

It would be very helpful to add the getKeys() method of a MouseEvent to
SelectEvents. For example, if you're using a listbox and want to detect
if the CTRL key is being held when one of the listitems is selected.

![](/zk_component_ref/images/ZKComRef_SelectEvent_GetKeys.png)

```xml
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

{% include supported-since.html version="7.0.1" %} If users want to know which of the
selected objects are new added or removed, they can use the
*getPreviousSelectedObjects* method to filter out. The information is
available only when the target component has a model.

## Get the Unselected Items

{% include supported-since.html version="7.0.1" %} If users want to know which of the
selected items are deselected, they can use the *getUnselectedItems*
method to filter out. (if a model exists and is in paging mold, it
should return null)

## Get the Unselected Objects

{% include supported-since.html version="7.0.1" %} If users want to know which of the
selected objects are deselected, they can use the *getUnselectedObjects*
method to filter out. The information is available only when the target
component has a model.

# Supported events

Check inherited events

# Supported Children

`*NONE`



# Version History

| Version | Date           | Content                                                                                                                                                    |
|---------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 7.0.0   | October, 2013. | [Multiple selection component(listbox, chosenbox) support extra information for find out added item/removed item](http://tracker.zkoss.org/browse/ZK-1992) |
| 7.0.1   | January 2014.  | [SelectEvent support get UnselectedItems](http://tracker.zkoss.org/browse/ZK-2089)                                                                         |


