---
title: "Orgitem"
---


- Java API: [org.zkoss.zkmax.zul.Orgitem](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html)
- JavaScript API: [zkmax.layout.Orgitem](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Orgitem.html)

`<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}`

{% include version-badge.html version="8.6.0" %}

# Employment/Purpose

`Orgitem`contains a node (`Orgnode),`and an optional Orgchildren.

If the component doesn't contain an `Orgchildren,`it is a leaf node that
doesn't accept any child items.

If it contains an `Orgchildren,`it is a branch node that might contain
other items.

For a branch node, an +/- button will appear at the bottom right of the
node, such that user could open and close the item by clicking on the
+/- button.

# Example

![](/zk_component_ref/images/Orgitem_example.png)

        <organigram width="600px">
            <orgchildren>
                <orgitem image="img/folder.gif" label="Item1">
                    <orgchildren>
                        <orgitem image="img/folder.gif" label="Item2" selected="true" open="false">
                            <orgchildren>
                                <orgitem label="Item4"/>
                            </orgchildren>
                        </orgitem>
                        <orgitem label="Item3"/>
                    </orgchildren>
                </orgitem>
            </orgchildren>
        </organigram>

# Open

Each Orgitem contains the open property which is used to control whether
to display its child items. The default value is true. By setting this
property to false, you are able to control what part of the Organigram
is invisible.

When a user clicks on the +/- button, he opens the Orgitem and makes its
children visible. The onOpen event is then sent to the server to notify
the application.

You can also open or close the Orgitem by calling
[org.zkoss.zkmax.zul.Orgitem#setOpen(java.lang.Boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#setOpen(java.lang.Boolean))
and get the open state by calling
[org.zkoss.zkmax.zul.Orgitem#isOpen()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#isOpen()).

Example:

        <organigram>
            <orgchildren>
                <orgitem label="Item1" open="false" onOpen="createChild()">
                    <orgchildren/>
                </orgitem>
            </orgchildren>
            <zscript><![CDATA[
                void createChild() {
                    if (event.isOpen())
                        new Orgitem("new item").setParent(self.getOrgchildren());
                }
            ]]></zscript>
        </organigram>

# Selected

By default, each Orgitem can be selected by users clicking or by
programing:

[org.zkoss.zkmax.zul.Organigram#setSelectedItem(org.zkoss.zkmax.zul.Orgitem)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Organigram.html#setSelectedItem(org.zkoss.zkmax.zul.Orgitem))
or
[org.zkoss.zkmax.zul.Orgitem#setSelected(java.lang.Boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#setSelected(java.lang.Boolean))

You can get the selected state by calling
[org.zkoss.zkmax.zul.Orgitem#isSelected()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#isSelected())

If you don't allow users to select Orgitem, you can write as following:

        <orgitem selectable="false"/>

or

        <orgitem disabled="true"/>

Disabled has more obvious style to prompt users.

# Label and Image

Orgitem provides
[org.zkoss.zkmax.zul.Orgitem#setImage(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#setImage(java.lang.String))
and
[org.zkoss.zkmax.zul.Orgitem#setLabel(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgitem.html#setLabel(java.lang.String))
to simplify the assignment of image and label to an Orgitem. However,
they are actually placed in the node (of the child Orgnode).
Furthermore, if the Orgnode is not created, they will be created
automatically. For example,

```xml
    <orgitem label="Hello"/>
```

is equivalent to

```xml
    <orgitem>
        <orgnode label="Hello"/>
    </orgitem>
```

It also means you cannot attach an Orgnode child to the Orgitem, after
setImage or setLabel was invoked. It means, though a bit subtle, the
following will cause an exception:

```xml
    <orgitem label="Hello"> <!-- Orgnode is created automatically because of setLabel -->
        <orgnode/> <!-- exception since only one Orgnode is allowed per Orgitem -->
    </orgitem>
```

When your Organigram only contains image and text, It is a convenient
way to create Organigram without Orgnode tags, if you want to put other
components in Orgnode, you could write like following:

```xml
    <zscript><![CDATA[
        Orgchildren orgchildren;
        void newItem(String label) {
            if (orgitem.getOrgchildren() == null) {
                orgchildren = new Orgchildren();
                orgchildren.setParent(orgitem);
            }
            new Orgitem(label).setParent(orgchildren);
        }
    ]]></zscript>
    <organigram>
        <orgchildren>
            <orgitem id="orgitem">
                <orgnode>
                    <textbox onOK="newItem(self.value)"/>
                </orgnode>
            </orgitem>
        </orgchildren>
    </organigram>
```

# Supported Events

| Name | Event Type |
|---|---|
| `onOpen` | **Event:**
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) Denotes user has
opened or closed a component. It is useful to implement load-on-demand
by listening to the onOpen event, and creating components when the first
time the component is opened. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Orgnode`]({{site.baseurl}}/zk_component_ref/orgnode)`, `[` Orgchildren`]({{site.baseurl}}/zk_component_ref/orgchildren)



