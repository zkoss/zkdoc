---
title: "Portallayout"
description: "Portallayout: A portallayout lays out a container which can have multiple columns, and each column might have any number panels placed vertically with…"
---

- **Demonstration:** [Portallayout](http://www.zkoss.org/zkdemo/layout/portal_layout)
- **Java API:** [org.zkoss.zkmax.zul.Portallayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Portallayout.html)
- **JavaScript API:** [zkmax.layout.Portallayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Portallayout.html)

<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

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

![Portallayout](/zk_component_ref/images/zkcomref_portallayout.gif)

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

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

## Move a Panel Without Dragging

Users can move a panel through a popup instead of dragging it. Press
Spacebar while the panel has the focus, or click its title bar
{% include supported-since.html version="11.0.0" %} (WCAG 2.5.7 Dragging
Movements). The popup lists the columns the panel can be moved to, that is,
the Portalchildren of the Portallayout. Choose a target column to move the
panel to it.

{% include supported-since.html version="11.0.0" %} If the target column
already holds panels, a second list asks where in that column the panel
goes: **Move to top** or **Move to bottom**. The panel moves once users
choose one. The panel's own column is listed too when it holds other panels,
with **Move up** and **Move down** as well. Only the moves that change the
panel's place are listed. In a horizontal Portallayout, the popup lists
rows, and the positions are **Move to start**, **Move to end**,
**Move left** and **Move right**.

## Keyboard Support

| Key | Description |
|---|---|
| Spacebar | When a panel has the focus, open the move popup. |
| ArrowUp / ArrowDown | Move through the columns, or through the positions of a column. |
| ArrowRight | On a column, show its positions. |
| ArrowLeft | On a position, go back to the columns. |
| Enter | On a column, show its positions, or move the panel there if the column is empty. On a position, move the panel there. |
| Esc | On a position, go back to the columns. Otherwise, close the popup. |
| Tab | Close the popup. |

When the popup closes, the focus returns to the panel.

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#supported-events)

# Supported Children

* [` Portalchildren`]({{site.baseurl}}/zk_component_ref/portalchildren)