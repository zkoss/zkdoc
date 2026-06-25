---
title: "Portallayout"
---

- **Demonstration:** [Portallayout](http://www.zkoss.org/zkdemo/layout/portal_layout)
- **Java API:** [org.zkoss.zkmax.zul.Portallayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Portallayout.html)
- **JavaScript API:** [zkmax.layout.Portallayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Portallayout.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A `portallayout` lays out a container which can have multiple columns,
and each column might have any number panels placed vertically with
different heights. `Portallayout` allows users to drag-and-drop a panel
to change its location.

When using `Portallayout`, you have to assign the width (either
percentage or pixel) to each `Portalchildren`, or the result might
depend on the browser, and not as expected.

## Common Use Cases

- **Dashboard layout**: Place multiple panels (charts, grids, forms) in a multi-column portal so users can drag and rearrange them to suit their workflow.
- **Column-based maximization**: Use `maximizedMode="column"` (default) so a maximized panel fills only its column, keeping other columns visible.
- **Full-screen panel expansion**: Set `maximizedMode="whole"` so a maximized panel overlays the entire portallayout, useful for detail-on-demand scenarios.
- **Horizontal portals**: Use `orient="horizontal"` when portal items should flow as rows rather than columns.
- **Programmatic panel placement**: Call `setPanel(panel, col, row)` in a composer or ViewModel to populate or rearrange panels at runtime without user drag-and-drop.

# Example

![](/zk_component_ref/images/zkcomref_portallayout.gif)

```xml
    <portallayout height="100%">
        <portalchildren width="50%">
            <panel height="50%" title="Calendar" border="normal">
                <panelchildren>
                    <calendar/>
                </panelchildren>
            </panel>
            <panel height="50%" title="Colorbox" border="normal">
                <panelchildren>
                    <colorbox/>
                </panelchildren>
            </panel>
        </portalchildren>
        <portalchildren width="50%">
            <panel height="100%" title="Editor" border="normal">
                <panelchildren>
                    <tbeditor/>
                </panelchildren>
            </panel>
        </portalchildren>
    </portallayout>
```

# Draggable Panel by Default

`<panel>` is `draggable="true"` without explicitly specifying when it's
inside a Portallayout. You can disable this by `draggable="false"`.

# Properties

## orient

{% include supported-since.html version="7.0.0" %}

**Default Value:** `vertical`

Controls the layout direction of the portallayout. Accepted values are `vertical` (columns stack panels top-to-bottom) and `horizontal` (columns are arranged left-to-right as rows).

| Value | Meaning |
|---|---|
| `vertical` | Panels are stacked vertically within each column (default) |
| `horizontal` | Columns are arranged as rows; panels flow horizontally |

```xml
<portallayout orient="horizontal">
    <portalchildren width="50%">
        ...
    </portalchildren>
    <portalchildren width="50%">
        ...
    </portalchildren>
</portallayout>
```

## maximizedMode

{% include supported-since.html version="5.0.0" %}

**Default Value:** `column`

Sets the reference frame used when a panel inside this portallayout is maximized. When set to `"whole"`, the panel expands relative to the portallayout container itself. When set to `"column"`, the panel expands relative to the enclosing `portalchildren` column.

| Value | Meaning |
|---|---|
| `column` | Maximized panel fills its parent `portalchildren` column (default) |
| `whole` | Maximized panel fills the entire portallayout container |

```xml
<portallayout maximizedMode="whole">
    <portalchildren width="50%">
        <panel maximizable="true" title="Full-width panel" border="normal">
            <panelchildren>Content</panelchildren>
        </panel>
    </portalchildren>
</portallayout>
```

## panel

Returns or places a specific `Panel` at a given column and row position within the portallayout. This is a programmatic (Java/ViewModel) accessor — column and row indices are zero-based. It cannot be set as a plain ZUL attribute; construct and position panels in `<zscript>` or a composer/ViewModel.

```xml
<zscript>
    import org.zkoss.zul.Panel;
    Panel pnl = new Panel();
    pnl.setTitle("Inserted Panel");
    pnl.setBorder("normal");
    // Place the panel at column 0, row 1 (returns false if position is out of bounds)
    myPortal.setPanel(pnl, 0, 1);
</zscript>
<portallayout id="myPortal" height="400px">
    <portalchildren width="50%">
        <panel title="First Panel" border="normal" height="200px">
            <panelchildren>Existing content</panelchildren>
        </panel>
    </portalchildren>
    <portalchildren width="50%"/>
</portallayout>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onPortalDrop` | [org.zkoss.zkmax.ui.event.PortalDropEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/event/PortalDropEvent.html) | Represents an event after a portal is dropped and before a portal is moved. {% include supported-since.html version="9.5.1" %} |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

* [` Portalchildren`]({{site.baseurl}}/zk_component_ref/portalchildren)