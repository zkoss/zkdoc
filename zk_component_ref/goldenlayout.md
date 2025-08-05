---
title: "GoldenLayout"
---


{% include version-badge.html version=8.6.0 %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

- Java API: [org.zkoss.zkmax.zul.GoldenLayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/GoldenLayout.html)
- JavaScript API:
  [zkmax.layout.GoldenLayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.GoldenLayout.html)

# Browser Support

- Due to the limitation of the 3rd party library used in this component,
  GoldenLayout is not supported in mobile devices.

# Employment/Purpose

GoldenLayout is a layout container which layouts panels as docker type
and is used to represent [GoldenLayout](http://golden-layout.com/).
GoldenLayout is the parent component, and its children component can
only be GoldenPanel.

A GoldenLayout could be nested to another GoldenLayout (actually, almost
all kinds of components) to form a complicated layout.

# Example

![](/zk_component_ref/images/ZKCompRef_GoldenLayout.png )

```xml
    <goldenlayout vflex="1" hflex="1">
        <attribute name="areas">
            A A B
            A A B
            C C D
        </attribute>
        <goldenpanel area="A" title="Panel A">
            <window vflex="1" title="Window inside GoldenPanel A" border="normal"/>
        </goldenpanel>
        <goldenpanel area="B" title="Panel B">
            <button label="Button inside GoldenPanel B"/>
        </goldenpanel>
        <goldenpanel area="C" title="Panel C">
            <vlayout>
                SplitLayout inside GoldenPanel C
                <splitlayout hflex="1" height="500px">
                    <tbeditor vflex="1"/>
                    <window border="normal" title="Window" vflex="1"/>
                </splitlayout>
            </vlayout>
        </goldenpanel>
        <goldenpanel area="D" title="Panel D">
            <vlayout>
                Rating inside GoldenPanel D
                <rating max="10" rating="8"/>
            </vlayout>
        </goldenpanel>
    </goldenlayout>
```

# Properties and Features

The goldenLayout is layouted as docker type, and is usually construct
with a tree structure, which is hard to layout in zul. ZK change the
structure for initial rendering to a one layer design. All the
GoldenPanels are in one layer inside GoldenLayout, and the panels layout
pattern will be specified by the `areas` attribute of GoldenLayout and
`area` attribute of GoldenPanel. The order added to the GoldenLayout
only represents the stacking order if they are stacked together in the
same area.

## Areas

The `areas` attribute is a sugar for initializing the layout. In the
example code above, we have the areas in line 2 specified as

A A B

A A B

C C D

The GoldenPanels which `area` attribute is specified as A, will be
positioned at the A position of the `areas` attribute.

Note that, A A B will result as `hflex` A is 2 and `hflex` B is 1. Same
with vflex. But if `hflex` or `vflex` attribute is specified on the
GoldenPanel which area is A, it overrides the flex size calculated by
the GoldenLayout's `areas` attribute.

## Orient

The orient indicates the initial splitting orientation if you layout it
by the area attribute. Supported value: (default) “vertical” or
“horizontal”.

From the example above, it's possible to divide in two ways.

| areas | vertical | horizontal |
|---|---|---|
| ![](/zk_component_ref/images/ZKCompRef_GoldenLayout_areas.png) | ![](/zk_component_ref/images/ZKCompRef_GoldenLayout_vertical.png) | ![](/zk_component_ref/images/ZKCompRef_GoldenLayout_horizontal.png) |

## Adding GoldenPanels

By user's drag drop, the GoldenPanels are usually dropped to a region
like `north`, `east`, `south`, `west` and `stack` of a GoldenPanel. So
we provide some GoldenPanel adding APIs to simulate these actions.
Please refer to the addPanel APIs like
[org.zkoss.zkmax.zul.GoldenLayout#addPanel(GoldenPanel, GoldenPanel, String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/GoldenLayout.html#addPanel(GoldenPanel, GoldenPanel, String))
in [org.zkoss.zkmax.zul.GoldenLayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/GoldenLayout.html).

north

![](/zk_component_ref/images/ZKCompRef_GoldenLayout_region_north.png)

east

![](/zk_component_ref/images/ZKCompRef_GoldenLayout_region_east.png)

south

![](/zk_component_ref/images/ZKCompRef_GoldenLayout_region_south.png)

west

![](/zk_component_ref/images/ZKCompRef_GoldenLayout_region_west.png)

stack

![](/zk_component_ref/images/ZKCompRef_GoldenLayout_region_stack.png)

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` GoldenPanel`]({{site.baseurl}}/zk_component_ref/goldenpanel)



