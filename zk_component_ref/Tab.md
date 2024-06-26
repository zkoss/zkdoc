

# Tab

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: <javadoc>org.zkoss.zul.Tab</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.tab.Tab</javadoc>
- Style Guide: [
  Tabbox](ZK_Style_Guide/XUL_Component_Specification/Tabbox)

# Employment/Purpose

A specific tab. Clicking on the tab brings the tab panel to the front.
You could put a label and an image on it by `label`and
`image`properties.

# Example

<figure>
<img src="ZKComRef_Containers_Tab.PNG"
title="ZKComRef_Containers_Tab.PNG" />
<figcaption>ZKComRef_Containers_Tab.PNG</figcaption>
</figure>

``` xml
<tabbox width="400px">
    <tabs>
        <tab label="Tab 1" image="/img/folder.gif" />
        <tab label="Tab 2" image="/img/folder.gif" closable="true" />
    </tabs>
    <tabpanels>
        <tabpanel>This is panel 1</tabpanel>
        <tabpanel>This is panel 2</tabpanel>
    </tabpanels>
</tabbox>
```

# Properties and Features

## Caption

A tab might have a caption, which is specified by declaring a child
component called caption. {% include ZK EE %} {% include
versionSince\|6.5.0 %}
![](ZKComRef_Containers_Tab_Caption.PNG "ZKComRef_Containers_Tab_Caption.PNG")

``` xml
<tabbox width="400px">
    <tabs>
        <tab label="Tab 1" image="/img/folder.gif" />
        <tab label="Tab 2" image="/img/folder.gif" closable="true" />
        <tab>
            <caption hflex="min" label="search">
                <textbox />
            </caption>
        </tab>
    </tabs>
    <tabpanels>
        <tabpanel>This is panel 1</tabpanel>
        <tabpanel>This is panel 2</tabpanel>
        <tabpanel>This is panel 3</tabpanel>
    </tabpanels>
</tabbox>
```

## Closable

By setting the `closable` property to true, a close button is shown on a
tab, such that a user could close the tab and the corresponding tab
panel by clicking the button. Once a user clicks on the close button, an
`onClose` event is sent to the tab. It is processed by the onClose
method of Tab. Then, onClose, by default, detaches the tab itself and
the corresponding tab panel.

### Dynamically-created Tab

`{% include versionSince| 7.0.0 %}`

If you assign a model to a Tabbox, it will do nothing for an onClose
event. Therefore, developers have to listen an onClose event to remove
the corresponding item in the model instead of Tab itself.

When using model, Tabs are dynamically created, so you **can't just
listen to onClose event** like `@Listen("onClose = tab")` because a Tab
is not created when wiring a listener. You can forward onClose event to
its parent like:

``` xml
<tabbox id="tabbox">
    <template name="model:tab">
        <tab closable="true" forward="onClose=tabbox.onTabClose(${each})"/>
    </template>
```

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
<p>Denotes user has selected a tab. onSelect is sent to both tab and
tabbox.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onClose</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.ui.zk.ui.event.Event</javadoc></p>
<p>Denotes the close button is pressed by a user, and the component
shall detach itself.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

[ Tabbox](ZK_Component_Reference/Containers/Tabbox#Use_Cases)

# Version History



| Version | Date       | Content                                                                                                     |
|---------|------------|-------------------------------------------------------------------------------------------------------------|
| 6.5.0   | June, 2012 | [ZK-970](http://tracker.zkoss.org/browse/ZK-970): The Tab component support caption component as it's label |


