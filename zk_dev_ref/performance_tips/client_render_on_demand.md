---
title: "Client Render on Demand"
---



With Enterprise Edition, widgets[^1] will delay the rendering of DOM
elements until really required. For example, the DOM elements of
`comboitem` won't be created until the drop down is shown. It improves
the performance a lot for a sophisticated user interface.

This feature is transparent to the application developers. All widgets
are still instantiated (though DOM elements might not), so they can be
accessed without knowing if this feature is turned on.


# Client ROD: Tree

A tree node only renders its children node's DOM elements when it's
open. If you close the node, it will remove those DOM elements. Thus, to
have the best performance (particularly for a huge tree), it is better
to make all tree item closed initially. You can observe this behavior
with developer tool.

```xml
<treeitem forEach="${data}" open="false">
    <treerow>
        <treecell label="${each.name}"/>
        <treecell label="${each.description}"/>
    </treerow>
    <treechildren>
        <treeitem forEach="${each.detail}" open="false">
            <treerow>
                <treecell label="${each.name}"/>
                <treecell label="${each.description}"/>
            </treerow>
            <treechildren>
                <treeitem forEach="${each.fine}" open="false">
                    <treerow>
                        <treecell label="${each.name}"/>
                        <treecell label="${each.description}"/>
                    </treerow>
                </treeitem>
            </treechildren>
        </treeitem>
    </treechildren>
</treeitem>
```

# Client ROD: Groupbox

Client ROD is enabled only if a groupbox is closed. Thus, to have the
best performance (particularly with sophisticated content), it is better
to make the groupbox closed initially if proper.

# Client ROD: Panel

Client ROD is enabled only if a panel is closed. Thus, to have the best
performance (particularly with sophisticated content), it is better to
make the panel closed initially if proper.

# Client ROD: Tabbox

Client ROD is enabled for the invisible tabpanels. After the tabpanel
becomes active, its content will be rendered and attached to the DOM
tree.

# Client ROD: Organigram

Client ROD is enabled only if an orgitem is closed. Thus, to have the
best performance (particularly with sophisticated content), it is better
to make the orgitem closed initially if proper.

# Enable or Disable Client ROD

If you want to disable Client ROD for the whole application, you can
specify a library property called
[`org.zkoss.zul.client.rod`]({{site.baseurl}}/zk_config_ref/org_zkoss_zul_client_rod)
with false. For example, specify the following in zk.xml:

```xml
<library-property>
    <name>org.zkoss.zul.client.rod</name>
    <value>false</value>
</library-property>
```

Or, if you prefer to disable it for a particular page, then specify
false to a page's attribute called `org.zkoss.zul.client.rod`, such as

```xml
<custom-attributes org.zkoss.zul.client.rod="false" scope="page"/>
```

Or, if you prefer to disable it for all descendants of a particular
component, then specify false to a component's attribute. And, you can
enable it for a subset of the descendants. For example,

```xml
<window>
  <custom-attributes org.zkoss.zul.client.rod="false"/> <!-- disable it for descendants of window -->
  <div>
    <custom-attributes org.zkoss.zul.client.rod="true"/> <!-- enable it for descendants of div -->
..
  </div>
</window>
```

{{ ZKDevelopersReferencePageFooter}}

[^1]: A widget is the (JavaScript) object running at the client to
    represent a component
