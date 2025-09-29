---
title: "Selectbox"
---


- Demonstration:
  [selection_dropdown](https://www.zkoss.org/zkdemo/getting_started/selection_dropdown)
- Java API: [org.zkoss.zul.Selectbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Selectbox.html)
- JavaScript API: [zul.wgt.Selectbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Selectbox.html)


 {% include supported-since.html version="6.0.0" %}

# Employment/Purpose

Selectbox is a lightweight dropdown list and it can support ListModel,
Renderer, and Databinding as well. The benefit of it is not to create
child widgets for each data, so the memory usage is much lower at the
server.

# Example

![](/zk_component_ref/images/selectbox9.png)

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

## Data binding

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

{% include   CustomItemRendering.md component=selectbox %}

# Supported Events

| Name | Event Type |
|---|---|
| `onSelect` | **Event:**
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Notifies one that
the user has selected a new item in the selectbox. |

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`



# Version History



| Version   | Date             | Content                               |
|-----------|------------------|---------------------------------------|
| 6.0.0     | October 4, 2011  | Add the new Selectbox component       |
| 6.0.0-RC2 | December 6, 2011 | Rename OptionRenderer to ItemRenderer |


