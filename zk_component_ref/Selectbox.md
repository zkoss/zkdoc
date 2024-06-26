

# Selectbox

- Demonstration:
  [selection_dropdown](https://www.zkoss.org/zkdemo/getting_started/selection_dropdown)
- Java API: <javadoc>org.zkoss.zul.Selectbox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Selectbox</javadoc>
- Style Guide: N/A

 {% include version-badge.html version=6.0.0 %}

# Employment/Purpose

Selectbox is a lightweight dropdown list and it can support ListModel,
Renderer, and Databinding as well. The benefit of it is not to create
child widgets for each data, so the memory usage is much lower at the
server.

# Example

![](selectbox9.png)

``` xml
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

``` java
model.addToSelection ("Tony");
```

## Data binding

Here is the MVVM way:

``` xml
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
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc> Notifies one that
the user has selected a new item in the selectbox.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HtmlBasedComponent](ZK_Component_Reference/Base_Components/HtmlBasedComponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version   | Date             | Content                               |
|-----------|------------------|---------------------------------------|
| 6.0.0     | October 4, 2011  | Add the new Selectbox component       |
| 6.0.0-RC2 | December 6, 2011 | Rename OptionRenderer to ItemRenderer |


