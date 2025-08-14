

# How ROD Improves Performance

With ZK EE, you can enable <b>Render on Demand</b> for Grid, Listbox, or
Tree to boost performance when showing a huge amount of data. Grid and
Listbox will load only the necessary data chunk from associated
ListModel, render required Row(s)/Listitem(s) on the server, then create
only the required corresponding widgets and render the DOM elements
really needed in the browser. It improves the performance and saves
memory significantly on both the server and browser sides.
![]({{site.baseurl}}/zk_dev_ref/images/Rod_demonstration.gif)

# Prerequisite

If you want to fully leverage the power of ROD, using a ZK model object
like `ListModel` is necessary.

ROD actually brings a performance boost on both the client-side and
server-side. However, if you use `forEach` to populate Rows or
Listitems, the components will be all in memory, which does not give you
any performance benefits on the server-side. (The client-side still
enjoys a boost.)

Notice that you can [ enable this feature in different scopes]({{site.baseurl}}/zk_config_ref/the_library_properties).

# Grid

If you want to enable Grid ROD for the whole application, you can
specify a library property called [org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html)
rod with `true`. For example, specify the following in zk.xml:

```xml
<library-property>
    <name>org.zkoss.zul.grid.rod</name>
    <value>true</value>
</library-property>
```

Or, if you prefer to enable it for a particular page, then specify
`true` to a page's attribute called
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html) rod, such as

```xml
<custom-attributes org.zkoss.zul.grid.rod="true" scope="page"/>
```

Or, if you prefer to enable it for all descendant grids of a particular
component, then specify `true` to the component's attribute. You can
enable it for a subset of the descendant grids. For example,

```xml
<window>
  <custom-attributes org.zkoss.zul.grid.rod="true"/> <!-- enable it for descendant grids of window -->
  <grid ...>
    ..
  </grid>
  <div>
    <custom-attributes org.zkoss.zul.grid.rod="false"/> <!-- disable it for descendant grids of div -->
      <grid ...>
        ..
      </grid>
      ..
  </div>
</window>
```

## Fixed Viewport is Required

Note that Grid ROD will not work unless the Grid is configured with a
limited <b>viewport</b>, so the user can see only a portion of rows;
i.e. you have to set one of the following attributes:

- `height`
- `vflex`
- `mold="paging"`
- `visibleRows`

## Specifies the number of rows rendered

`[default: 100]`  
`[inherit: true]`

Specifies the minimum number of rows rendered on the client. It is only
considered if Grid is using live data
([org.zkoss.zul.Grid#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#setModel(ListModel))) and
not using paging mold
([org.zkoss.zul.Grid#getPagingChild()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html#getPagingChild())).

```xml
<custom-attributes org.zkoss.zul.grid.initRodSize="30"/>
```

# Listbox

If you want to enable Listbox ROD for the whole application, you can
specify a library property called
[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) rod with `true`. For example,
specify the following in zk.xml:

```xml
<library-property>
    <name>org.zkoss.zul.listbox.rod</name>
    <value>true</value>
</library-property>
```

Or, if you prefer to enable it for a particular page, then specify
`true` to a page's attribute called
[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) rod, such as

```xml
<custom-attributes org.zkoss.zul.listbox.rod="true" scope="page"/>
```

Or, if you prefer to enable it for all descendant listboxs of a
particular component, then specify `true` to the component's attribute.
And, you can enable it for a subset of the descendant listboxs. For
example,

```xml
<window>
  <custom-attributes org.zkoss.zul.listbox.rod="true"/> <!-- enable it for descendant listboxs of window -->
  <listbox ...>
    ..
  </listbox>
  <div>
    <custom-attributes org.zkoss.zul.listbox.rod="false"/> <!-- disable it for descendant listboxs of div -->
      <listbox ...>
        ..
      </listbox>
      ..
  </div>
</window>
```

## Fixed Viewport is Required

Note that Listbox ROD will not work unless the Listbox is configured
with a limited <b>viewport</b>, so the user can see only a portion of
listitems; i.e. you have to set one of the following attributes:

- `height`
- `vflex`
- `rows`
- `mold="paging"`

## Specifies the number of items rendered

`[default: 100]`  
`[inherit: true]`

Specifies the number of items rendered when the Listbox first renders.
It is used only if live data
([org.zkoss.zul.Listbox#setModel(ListModel)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html#setModel(ListModel)))
and not paging (\<mold="paging"\>).

```xml
<custom-attributes org.zkoss.zul.listbox.initRodSize="30"/>
```

# Tree

To turn off ROD for a tree, you need to specify [ org.zkoss.zul.tree.initRodSize]({{site.baseurl}}/zk_config_ref/org_zkoss_zul_tree_initrodsize)
with -1:

```xml
<custom-attributes org.zkoss.zul.tree.initRodSize="-1"/>
```

# Limitation

`hflex="min"` [ has a not-resizing limitation]({{site.baseurl}}/zk_dev_ref/ui_patterns/hflex_and_vflex#Minimum_Flexibility_Doesn.27t_Change_a_Component.27s_Size_Dynamically),
so if you specify it on a <grid>`/`<column>
(<listbox>`/`<listheader>`, or `<tree>`/`<treecol>), a component doesn't
resize the column when you scrolls down to see a wider item. Because the
wider item is not rendered initially for render-on-demand. At the moment
of calculating the width, the component doesn't count the wider item
into width calculation.

Grid and Listbox will enlarge their columns when you scroll down and
render a wider item.

{{ ZKDevelopersReferencePageFooter}}
