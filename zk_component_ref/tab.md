

# Tab

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: [org.zkoss.zul.Tab](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tab.html)
- JavaScript API: <javadoc directory="jsdoc">zul.tab.Tab</javadoc>


# Employment/Purpose

A specific tab. Clicking on the tab brings the tab panel to the front.
You could put a label and an image on it by `label`and
`image`properties.

# Example

![](/zk_component_ref/images/ZKComRef_Containers_Tab.PNG)

```xml
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
component called caption. {% include edition-availability.html edition="pe" %} {% include
version-badge.html version=6.5.0 %}
![](/zk_component_ref/images/ZKComRef_Containers_Tab_Caption.PNG)

```xml
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

`{% include version-badge.html version=7.0.0 %}`

If you assign a model to a Tabbox, it will do nothing for an onClose
event. Therefore, developers have to listen an onClose event to remove
the corresponding item in the model instead of Tab itself.

When using model, Tabs are dynamically created, so you **can't just
listen to onClose event** like `@Listen("onClose = tab")` because a Tab
is not created when wiring a listener. You can forward onClose event to
its parent like:

```xml
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
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)</p>
<p>Denotes user has selected a tab. onSelect is sent to both tab and
tabbox.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onClose</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.ui.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/ui/zk/ui/event/Event.html)</p>
<p>Denotes the close button is pressed by a user, and the component
shall detach itself.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

[ Tabbox]({{site.baseurl}}/zk_component_ref/containers/tabbox#Use_Cases)

# Version History



| Version | Date       | Content                                                                                                     |
|---------|------------|-------------------------------------------------------------------------------------------------------------|
| 6.5.0   | June, 2012 | [ZK-970](http://tracker.zkoss.org/browse/ZK-970): The Tab component support caption component as it's label |


