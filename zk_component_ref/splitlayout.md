---
title: "Splitlayout"
---


- Demonstration:
  [Spltlayout](https://www.zkoss.org/zkdemo/layout/split_layout)
- Java API: [org.zkoss.zkmax.zul.Splitlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Splitlayout.html)
- JavaScript API:
  [zkmax.layout.Splitlayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Splitlayout.html)
- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Splitlayout is a layout container, which is used to divide a component
into two components.

These two components inside Splitlayout, the splitlayouts, are placed
either horizontally or vertically by setting the orientation, and users
can easily resize these two viewports by dragging the splitter bar.
Also, like other ZK layout components, it supports hflex and vflex,
indicating that users can divide the area into three or more spaces by
putting the splitlayouts into the outer Splitlayout.

Comparing to [ Splitter](/zk_component_ref/splitter), this
component has several advantages:

1.  [ Splitter](/zk_component_ref/splitter)
    can only be used inside [ Hbox](/zk_component_ref/hbox)/[ Vbox](/zk_component_ref/vbox).
    Splitlayout has no such limitation.
2.  Hbox/Vbox are both rendered with HTML which is heavy for a browser.
    Splitlayout is rendered with div which is more light-weighted.

# Example

![](/zk_component_ref/images/ZKComRef_Splitlayout_Examples.PNG)

```xml
    <splitlayout  vflex="1" hflex="1">
        <div sclass="area" hflex="1" vflex="1">
            <label value="Area 1"/>
        </div>
        <splitlayout vflex="1" hflex="1" orient="horizontal" >
            <div sclass="area" vflex="1" hflex="1">
                <label value="Area 2"/>
            </div>
            <div sclass="area" vflex="1"  hflex="2">
                <label value="Area 3"/>
            </div>
        </splitlayout>
    </splitlayout>
```

# Properties and Features

## Orientation

Default: `vertical`

Supported values: (default) “vertical” or “horizontal”.

The property specifies the layout orientation, determining how its two
child containers are displayed in the component.

## Collapse

The collapse property
([org.zkoss.zkmax.zul.Splitlayout#setCollapse(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Splitlayout.html#setCollapse(java.lang.String)))
specifies which side of the splitter is collapsed when its grippy
(button) is clicked. If this property is not specified, the splitter
will not cause a collapse.

Supported value: (default) “none”, “before” or "after". "before" means
that the splitter in splitlayout would collapse to the left/top, and
"after means splitter in splitlayout would collapse to the right/button.

## Open

This method would not be able to work if the "collapse" attribute is not
specified.

### onOpen Event

When a splitlayout is collapsed or opened by a user, the `onOpen` event
([org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)) is sent to the
application.

## Widths and Heights

specify `widths` or `heights` with a list of numbers(in pixel) separated
by a comma to denote the width/height of two areas in splitlayout.
Notice that you should use them while using flex in the children
component.

### Specify Children Size in Proportion

Specify `hflex`/`vflex` on 2 children like:

```xml
        <splitlayout  vflex="1" >
            <div sclass="area" vflex="2">
                ...
            </div>
            <div sclass="area" vflex="3">
               ...
            </div>
        </splitlayout>
```

## MinWidths and MinHeights

User setMinWidths(String minWidths) and setMinHeights(String minHeights)
to sets the minimum widths/heights in the same format of
setWidths/setHeights. When user drag the splitter, the two areas will
not be smaller than the minWidths/minHeights.

# Supported Events

| Name | Event Type |
|---|---|
| `onOpen` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
When a splitter is collapsed or opened by a user, the
`onOpen` event is sent to the application. |
| `onDivisionSize` | <strong>Event:</strong>
[org.zkoss.zkmax.zul.event.DivisionSizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/DivisionSizeEvent.html)
Represents an event that indicates two inner size of
splitlayout. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Version History



| Version | Date          | Content             |
|---------|---------------|---------------------|
| 8.5.0   | October, 2017 | new added component |


