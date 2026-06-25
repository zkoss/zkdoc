---
title: "Tab"
---

- **Demonstration:** [Tabbox Demo](https://www.zkoss.org/zkdemo/tabbox)
- **Java API:** [`org.zkoss.zul.Tab`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tab.html)
- **JavaScript API:** [`zul.tab.Tab`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tab.html)

## Employment/Purpose

The ZK Tab component is used to represent a specific tab within a tab container. Clicking on a tab brings the corresponding tab panel to the front. Tabs can be customized with labels and images using the `label` and `image` properties.

## Common Use Cases

### Pre-selecting a Tab on Load

Use `selected="true"` to make a specific tab active when the page first renders. This is useful when you want to open the page with the second or third tab in focus rather than the default first tab.

```xml
<tabbox width="400px">
    <tabs>
        <tab label="Summary" />
        <tab label="Details" selected="true" />
        <tab label="History" />
    </tabs>
    <tabpanels>
        <tabpanel>Summary content</tabpanel>
        <tabpanel>Details content (shown first)</tabpanel>
        <tabpanel>History content</tabpanel>
    </tabpanels>
</tabbox>
```

### Tagging Tabs with Application Data

Use the `value` property to attach a domain object or identifier to each tab. In an `onSelect` event listener you can then read `event.getSelectedItem().getValue()` to find which entity the activated tab represents, without relying on tab labels or indices.

```xml
<zscript>
    import java.util.Arrays;
    java.util.List ids = Arrays.asList("order-1", "order-2", "order-3");
</zscript>
<tabbox width="400px" onSelect="label.setValue(self.getSelectedTab().getValue().toString())">
    <tabs>
        <tab label="Order 1" value="${ids.get(0)}" />
        <tab label="Order 2" value="${ids.get(1)}" />
        <tab label="Order 3" value="${ids.get(2)}" />
    </tabs>
    <tabpanels>
        <tabpanel>Order 1 details</tabpanel>
        <tabpanel>Order 2 details</tabpanel>
        <tabpanel>Order 3 details</tabpanel>
    </tabpanels>
</tabbox>
<label id="label" value="Selected: order-1" />
```

## Example

The example below demonstrates a `tabbox` with two tabs, each displaying a label and an image. The first tab is not closable, while the second tab is closable with a close button that allows the user to remove it.

![Tab Example](images/ZKComRef_Containers_Tab.png)

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

Try it

* [Tab Example](https://zkfiddle.org/sample/o3cb45/1-ZK-Component-Reference-Tab-Example?v=latest&t=Iceblue_Compact)

# Properties

## Selected

**Default Value:** `false`

Sets whether this tab is currently selected. Setting `selected="true"` makes the tab the active tab when the page loads. Within a `tabbox`, only one tab can be selected at a time; selecting a tab programmatically deselects the previously selected one.

```xml
<tabbox width="400px">
    <tabs>
        <tab label="Tab 1" />
        <tab label="Tab 2" selected="true" />
    </tabs>
    <tabpanels>
        <tabpanel>This is panel 1</tabpanel>
        <tabpanel>This is panel 2 (shown by default)</tabpanel>
    </tabpanels>
</tabbox>
```

## Value

{% include supported-since.html version="7.0.0" %}

**Default Value:** `null`

Stores an application-defined value on the tab. The value is a generic Java object (`<T>`) and has no effect on rendering — it is purely for the application to associate arbitrary data with a tab (for example, an entity ID or a domain object). The value must be constructed in a `<zscript>` block or in a composer/ViewModel and referenced via EL.

```xml
<zscript>
    String tabData = "order-42";
</zscript>
<tabbox width="400px">
    <tabs>
        <tab label="Order 42" value="${tabData}" />
    </tabs>
    <tabpanels>
        <tabpanel>Order details here</tabpanel>
    </tabpanels>
</tabbox>
```

## Caption

Tabs can have a caption by declaring a child component called `caption`. The example below shows a tab with a search caption containing a textbox component. This feature is available in ZK Enterprise Edition starting from version 6.5.0.

![Tab Caption Example](images/ZKComRef_Containers_Tab_Caption.png)

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

Try it

* [Tab Caption](https://zkfiddle.org/sample/ale2h1/1-ZK-Component-Reference-Tab-Caption-Example?v=latest&t=Iceblue_Compact)

## Closable

By setting the `closable` property to true, a close button is displayed on the tab. When clicked, the tab and its corresponding tab panel are detached from the component. An `onClose` event is triggered, which can be handled to perform custom actions upon tab closure.

## Dynamically-created Tab

In ZK version 7.0.0 and above, when dynamically creating tabs using a model, special handling is required. To remove the corresponding item from the model upon tab closure, developers need to listen to the `onClose` event and manually remove the item. The example below demonstrates how to handle the `onClose` event when using a model in the MVC pattern.

```xml
<zk>
  <tabbox id="tabbox" apply="pkg$.TabboxComposer">
      <template name="model:tab">
          <tab closable="true" label="${each}" onClose="self.detach()"/>
      </template>
  </tabbox>
</zk>
```

```java
public class TabboxComposer extends SelectorComposer {

  	@Wire
  	Tabbox tabbox;
  
	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);
		ListModelList model = new ListModelList();
        model.add("Tab1");
        model.add("Tab2");
        model.add("Tab3");
        tabbox.setModel(model);
	}
}
```

Try it

* [Tab Model](https://zkfiddle.org/sample/37ktdo8/1-ZK-Component-Reference-Panel-Toolbar-Example?v=latest&t=Iceblue_Compact)

# Supported Events

| Name          | Event Type                                       |Description |
|---------------|--------------------------------------------------|------------|
| `onSelect`    | Event: [SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) | Denotes user has selected a tab. onSelect is sent to both tab and tabbox.             |
| `onClose`     | Event: [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes the close button is pressed by a user, and the component shall detach itself.                 |

# Supported Children
- [`Caption`](caption): Indicates that the `Tab` component can only have one child component of type `Caption`.