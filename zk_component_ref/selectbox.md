---
title: "Selectbox"
---

- **Demonstration:** [selection_dropdown](https://www.zkoss.org/zkdemo/getting_started/selection_dropdown)
- **Java API:** [org.zkoss.zul.Selectbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Selectbox.html)
- **JavaScript API:** [zul.wgt.Selectbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Selectbox.html)

{% include supported-since.html version="6.0.0" %}

# Employment/Purpose

Selectbox is a lightweight dropdown list and it can support ListModel,
Renderer, and Databinding as well. The benefit of it is not to create
child widgets for each data, so the memory usage is much lower at the
server.

## Common Use Cases

- **Lightweight dropdown from a list model** — use `<selectbox>` instead of `<listbox>` when you need a compact dropdown that binds to a `ListModelList`; memory cost is far lower because no child widget is created per item.
- **MVVM index binding** — bind `selectedIndex` with `@bind` to track or pre-select an item in a ViewModel without managing item objects directly.
- **Custom label rendering** — supply an `ItemRenderer` (or a `<template name="model">`) to format each option label without creating a full `<listitem>` hierarchy.

# Example

![Selectbox9](/zk_component_ref/images/selectbox9.png)

```xml
<zk>
    <zscript>
        <![CDATA[
        String[] userName = { "Tony", "Ryan", "Jumper", "Wing", "Sam" };
        ListModelList model = new ListModelList(userName);
    ]]></zscript>
    <selectbox model="${model}" onSelect='alert(model.get(event.getData()));'>
        <template name="model">
            Name is ${each}
        </template>
    </selectbox>
</zk>
```

To give the selectbox an initial value, for example, Tony, add the
following code after the model is created:

```java
model.addToSelection ("Tony");
```

{% include   CustomItemRendering.md component=selectbox %}

# Data Binding

Here is the MVVM way:

```xml
    <zscript><![CDATA[
    public class MyUserBean {
        private String[] userList = { "Tony", "Ryan", "Jumper", "Wing", "Sam" };
        private int index = 0;

        public ListModelList getUserList() {
            return new ListModelList(Arrays.asList(userList));
        }

        public void setUserList() {
        }

        public void setIndex(int ind) {
            index = ind;
        }

        public int getIndex() {
            return index;
        }

    }
    MyUserBean mybean = new MyUserBean();
/**   Implements ItemRenderer without using template
       org.zkoss.zul.ItemRenderer render = new org.zkoss.zul.ItemRenderer() {
        public String render(Component owner, Object data, int index) throws Exception {
            return data.toString();
        }
    };
*/
    ]]></zscript>
    <div apply="org.zkoss.bind.BindComposer">
        Select User:
        <selectbox id="box" model="@init(mybean.userList)"
                   selectedIndex="@bind(mybean.index)">
            <template name="model">${each}</template>
        </selectbox>

    Selected:
    <label id="val" value="@load(mybean.index)" />
    </div>
```

# Properties

## SelectedIndex

**Default Value:** `-1` (no item selected)

Sets the zero-based index of the currently selected item. Pass `-1` to clear the selection. Values below `-1` are treated as `-1`.

```xml
<zscript>
    import org.zkoss.zul.ListModelList;
    ListModelList model = new ListModelList(new String[]{"Apple", "Banana", "Cherry"});
</zscript>
<selectbox model="${model}" selectedIndex="1"/>
```

## ItemRenderer

**Default Value:** `null` (built-in renderer is used)

Sets a custom renderer that returns the HTML snippet shown for each element of the `model`; when `null`, the default renderer uses the data's `toString()` (or a `<template name="model">` if one is defined). Because it is a Java object (`org.zkoss.zul.ItemRenderer`), supply it from a `<zscript>` block, composer, or ViewModel and reference it via EL.

```xml
<selectbox model="${model}" itemRenderer="${myRenderer}"/>
```

See the **Custom Item Rendering** section on this page and [Item Renderer]({{site.baseurl}}/zk_dev_ref/mvc/item_renderer) for the renderer interface, escaping rules, and a complete example.

## Model

**Default Value:** `null`

Sets the `ListModel` that provides the dropdown options. The model must also implement `org.zkoss.zul.ext.Selectable`; `ListModelList` satisfies this requirement. Assigning a new model (even the same instance) always triggers a full re-render and resets `selectedIndex` to `-1`.

The value is a Java object (`ListModel<T>`); construct it in a `<zscript>` block or a composer/ViewModel and reference it via EL.

```xml
<zscript>
    import org.zkoss.zul.ListModelList;
    ListModelList model = new ListModelList(
        new String[]{"Tony", "Ryan", "Jumper", "Wing", "Sam"});
</zscript>
<selectbox model="${model}">
    <template name="model">${each}</template>
</selectbox>
```

## Name

**Default Value:** `null`

Sets the HTML `name` attribute rendered on the underlying `<select>` element. This is intended only for legacy servlet-based web applications that read form fields by name from the HTTP request. It has no effect in ZK's event-driven model and should be omitted in MVVM or MVC applications.

```xml
<selectbox name="userChoice" model="${model}"/>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onSelect` | [SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) | Notifies one that the user has selected a new item in the selectbox. |
| `onFocus` | [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Fired when the selectbox receives focus. |
| `onBlur` | [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Fired when the selectbox loses focus. |

- Inherited Supported Events: [ HtmlBasedComponent](/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`
