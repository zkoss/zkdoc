---
title: "Listgroup"
---


- Demonstration: N/A
- Java API: [org.zkoss.zul.Listgroup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listgroup.html)
- JavaScript API:
  [zkex.sel.Listgroup](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.sel.Listgroup.html)

- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Adds the ability for single level grouping to the Listbox.

# Example

![](/zk_component_ref/images/ZKComRef_Listgroup_Example.PNG)

```xml
 <?xml version="1.0" encoding="UTF-8"?>
 <zk>
     Listbox support Grouping
     <listbox id="listbox" width="250px">
         <listhead sizable="true" id="h">
             <listheader id="h1" label="name" sort="auto" />
             <listheader id="h2" label="gender" sort="auto" />
         </listhead>
         <listgroup id="gp1" open="false">
             <listcell label="Group1"/>
             <listcell label="Group2"/>
         </listgroup>
         <listitem>
             <listcell label="a Mary" />
             <listcell label="a FEMALE" />
         </listitem>
         <listitem>
             <listcell label="b Mary" />
             <listcell label="b FEMALE" />
         </listitem>
         <listitem id="li1">
             <listcell label="c Mary1" />
             <listcell label="c FEMALE1" />
         </listitem>
         <listitem>
             <listcell label="d Mary" />
             <listcell label="d FEMALE" />
         </listitem>
         <listitem>
             <listcell label="e John" />
             <listcell label="e MALE" />
         </listitem>
         <listgroup id="g2" label="Grouping 2" />
         <listitem>
             <listcell label="Jane" />
             <listcell label="FEMALE" />
         </listitem>
         <listitem>
             <listcell label="Henry" />
             <listcell label="MALE" />
         </listitem>
 
     </listbox>
 </zk>
```

# Supported Events

| Name | Event Type |
|---|---|
| `onOpen` | **Event:**
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) Denotes user has
opened or closed a component. Note:
unlike `onClose`, this event is only a notification. The
client sends this event after opening or closing the component.
It is useful to implement load-on-demand by listening to the
`onOpen` event, and creating components when the first time
the component is opened. |

- Inherited Supported Events: [ Listitem]({{site.baseurl}}/zk_component_ref/listitem#Supported_Events)

# Supported Children

`*`[` Listcell`]({{site.baseurl}}/zk_component_ref/listcell)
