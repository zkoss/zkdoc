---
title: "Anchorchildren"
---

- **Demonstration:** N/A
- **Java API:** [org.zkoss.zul.Anchorchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Anchorchildren.html)
- **JavaScript API:** [zul.layout.Anchorchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Anchorchildren.html)

{% include supported-since.html version="6.0.0" %}

# Employment/Purpose

The children of Anchorlayout that can anchor to the position that
according to the size of the Anchorlayout.

## Common Use Cases

### Proportional Grid Layout

Use percentage anchors on multiple `<anchorchildren>` inside one `<anchorlayout>` to build a fluid grid. The percentages should sum to 100% per row so children fill the available space without overflow.

```xml
<anchorlayout vflex="1">
    <anchorchildren anchor="50% 50%">
        <window title="Top-left" border="normal" height="100%"/>
    </anchorchildren>
    <anchorchildren anchor="50% 50%">
        <window title="Top-right" border="normal" height="100%"/>
    </anchorchildren>
    <anchorchildren anchor="50% 50%">
        <window title="Bottom-left" border="normal" height="100%"/>
    </anchorchildren>
    <anchorchildren anchor="50% 50%">
        <window title="Bottom-right" border="normal" height="100%"/>
    </anchorchildren>
</anchorlayout>
```

### Fixed-offset Panel

Use a negative pixel offset when a child should occupy almost all of the parent but leave room for a fixed-height header or toolbar.

```xml
<anchorlayout vflex="1">
    <!-- width fills parent, height = parent minus 40 px -->
    <anchorchildren anchor="100% -40">
        <div style="overflow:auto; height:100%">
            <label value="Scrollable content area"/>
        </div>
    </anchorchildren>
</anchorlayout>
```

> **Note:** `Anchorchildren` and `Anchorlayout` are deprecated since ZK 10.0.0. For new projects, use `<vlayout>` / `<hlayout>` with `vflex` / `hflex` attributes instead.

# Example

![]({{site.baseurl}}/zk_component_ref/images/zkcomref_anchorlayout_example.png)

```xml
<window title="anchorlayout Demo" border="normal" 
    height="100%">
    <anchorlayout id="al"  vflex="1"
        style="overflow:auto">
        <anchorchildren height="200px" anchor="-100">
            <window title="win1" border="normal" 
                height="100%">
                height is "200px" and width is its parent size minus 100
            </window>
        </anchorchildren>
        <anchorchildren anchor="50% -200">
            <window title="win2" border="normal" 
                height="100%">
                width is its parent size's 50%, and height is its parent
                size minus 200
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win3" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win4" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win5" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win6" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
    </anchorlayout>
</window>
```

# Properties

## Anchor

**Default Value:** `""` (empty string — no anchor constraint)

Sets the width and height of this `<anchorchildren>` relative to its parent `<anchorlayout>`. The value is a space-separated string of one or two tokens; the first token controls width and the second controls height.

Each token may be:
- A percentage (e.g. `"50%"`) — sizes the dimension to that fraction of the `<anchorlayout>`.
- A signed integer (e.g. `"-100"`) — sizes the dimension as that many pixels offset from the full parent size (`-100` means parent width/height minus 100 px).

If only one token is provided it applies to width only; height is unconstrained.

```xml
<!-- width = 50% of parent, height = parent minus 200 px -->
<anchorlayout>
    <anchorchildren anchor="50% -200">
        <label value="Half-wide, near-full-height"/>
    </anchorchildren>
</anchorlayout>

<!-- width = parent minus 100 px, height fixed by CSS -->
<anchorlayout>
    <anchorchildren anchor="-100" height="200px">
        <label value="Almost full-width"/>
    </anchorchildren>
</anchorlayout>

<!-- both dimensions as percentages -->
<anchorlayout>
    <anchorchildren anchor="25% 20%">
        <label value="Quarter-wide, fifth-tall"/>
    </anchorchildren>
</anchorlayout>
```

# Supported Events

This component fires no events of its own. For inherited events, see [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events).

# Supported Children

All