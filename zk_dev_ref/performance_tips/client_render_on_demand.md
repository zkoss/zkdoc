---
title: "Client Render on Demand"
description: "Client Render on Demand: with Enterprise Edition, widgets delay the creation of their DOM elements until they are really required, e.g. a closed groupbox or an invisible include."
---

With Enterprise Edition, widgets[^1] will delay the rendering of DOM
elements until really required. For example, the DOM elements of
`comboitem` won't be created until the drop down is shown. It improves
the performance a lot for a sophisticated user interface.

This feature is transparent to the application developers. All widgets
are still instantiated (though DOM elements might not), so they can be
accessed without knowing if this feature is turned on.

# Tree

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

# Groupbox

Client ROD is enabled only if a groupbox is closed. Thus, to have the
best performance (particularly with sophisticated content), it is better
to make the groupbox closed initially if proper.

# Panel

Client ROD is enabled only if a panel is closed. Thus, to have the best
performance (particularly with sophisticated content), it is better to
make the panel closed initially if proper.

# Tabbox

Client ROD is enabled for the invisible tabpanels. After the tabpanel
becomes active, its content will be rendered and attached to the DOM
tree.

# Organigram

Client ROD is enabled only if an orgitem is closed. Thus, to have the
best performance (particularly with sophisticated content), it is better
to make the orgitem closed initially if proper.

# Invisible Window, Panel, Div and Include

Apart from the collapsible components above, `window`, `panel`, `div` and
`include` apply Client ROD whenever they are **invisible**. Such a component
sends nothing but an empty placeholder to the browser

```html
<div id="jSQ50" style="display:none" class="z-div"></div>
```

and creates its real DOM elements the first time it becomes visible (or is
maximized, in the case of `window` and `panel`). Therefore, for the content
that is not shown initially, `visible="false"` is preferable to hiding it with
CSS: only the former enables Client ROD.

# Include

An `include` is rendered on demand as soon as it is invisible, and its
[mode]({{site.baseurl}}/zk_component_ref/include#mode) makes no difference.
`instant`, `defer` with a ZUL source, and `defer` with a plain HTML fragment
all keep the included content out of the DOM until the `include` is shown.

```xml
<!-- none of the three creates a DOM element for its content at page load -->
<include id="incInstant" mode="instant" src="includedInstant.zul" visible="false"/>
<include id="incDefer" mode="defer" src="includedDefer.zul" visible="false"/>
<include id="incHtml" mode="defer" src="includedFragment.html" visible="false"/>

<button label="Show them">
    <attribute name="onClick">
        incInstant.setVisible(true);
        incDefer.setVisible(true);
        incHtml.setVisible(true);
    </attribute>
</button>
```

## It Doesn't Skip the Server Side

Client ROD only defers the work at the browser. An invisible `include` still
evaluates its `src` while the page is rendering, and still transfers the
result to the client: in `instant` mode the included ZUL becomes child
components of the `include`, and in `defer` mode the included output is sent
along with the page and held aside by the widget until it is needed. What
Client ROD saves is creating the DOM elements and binding the widgets, not
including the page.

If the server-side cost is what you want to avoid, don't specify `src` until
the content is really needed, e.g.

```java
@Listen("onClick = #show")
public void showDetail() {
    include.setSrc("detail.zul"); // the page is included only now
}
```

# Components without Client ROD

Client ROD is implemented per component, so being collapsed or hidden doesn't
guarantee it. For example, a grid row
[detail]({{site.baseurl}}/zk_component_ref/detail) has no its
children are already in the DOM when the page loads, even with `open="false"`.
Keep such a `detail` light, or create its content upon the `onOpen` event.

# Verifying Client ROD

To tell whether a widget's DOM elements were really skipped, check these two
internal flags at the browser console:

- `zkmax.rod(wgt)`: whether Client ROD is allowed for that widget
- `wgt.z_rod`: `true` while the widget's DOM elements are skipped

For example, `zkmax.rod(zk.Widget.$('$incDefer'))`. They are internal APIs,
intended for debugging only.

Two runnable pages that probe the above are available in github:
[clientRodInclude.zul](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/performanceTips/clientRodInclude.zul)
counts how much of an invisible `include` reaches the DOM in each mode, and
[clientRodDetail.zul](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/performanceTips/clientRodDetail.zul)
compares `detail` against `groupbox`, `tabpanel` and `window`.

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

{% include Notice.html text="If you set the page attribute in Java instead of ZUML, the value has to be the string false. Boolean.FALSE leaves Client ROD enabled." %}

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

[^1]: A widget is the (JavaScript) object running at the client to
    represent a component
