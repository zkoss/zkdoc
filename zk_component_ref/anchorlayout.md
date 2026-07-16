---
title: "Anchorlayout"
description: "Anchorlayout: An anchorlayout lays out a container which can resize it's children base on its width and height"
---

- **Java API:** [org.zkoss.zul.Anchorlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Anchorlayout.html)
- **JavaScript API:** [zul.layout.Anchorlayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Anchorlayout.html)

{% include supported-since.html version="6.0.0" %}

# Employment/Purpose

An anchorlayout lays out a container which can resize it's children base
on its width and height

## Common Use Cases

### Fixed-Size Dashboard Panels

Use `anchorlayout` with `vflex="1"` to fill a container, then give each `<anchorchildren>` a fixed pixel height and a percentage-or-offset anchor width so all panels resize together when the browser window changes size.

```xml
<window title="Dashboard" border="normal" height="100%">
    <anchorlayout vflex="1" style="overflow:auto">
        <anchorchildren height="300px" anchor="50%">
            <window title="Left Panel" border="normal" height="100%">
                Left half, 300 px tall
            </window>
        </anchorchildren>
        <anchorchildren height="300px" anchor="50%">
            <window title="Right Panel" border="normal" height="100%">
                Right half, 300 px tall
            </window>
        </anchorchildren>
    </anchorlayout>
</window>
```

### Offset-Based Sizing

A negative offset value in `anchor` shrinks the child by that many pixels relative to the layout's current width or height. This is useful when you need gutters or margins without hard-coding exact widths.

```xml
<anchorlayout vflex="1">
    <anchorchildren height="200px" anchor="-40">
        <!-- child is always (layout width - 40px) wide -->
        <div style="background:#eee;height:100%">Full-width minus margin</div>
    </anchorchildren>
</anchorlayout>
```

# Example

![Anchorlayout example]({{site.baseurl}}/zk_component_ref/images/zkcomref_anchorlayout_example.png)

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

# Supported Children

* [Anchorchildren]({{site.baseurl}}/zk_component_ref/anchorchildren)
