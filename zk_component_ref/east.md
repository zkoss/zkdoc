---
title: "East"
---

- **Demonstration:** [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- **Java API:** [org.zkoss.zul.East](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/East.html)
- **JavaScript API:** [zul.layout.East](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.East.html)

# Employment/Purpose

An east region of a border layout and only allows one component as its
child.

## Common Use Cases

For common use cases such as collapsible panels, splittable regions, and nested border layouts, see [Borderlayout — Common Use Cases]({{site.baseurl}}/zk_component_ref/borderlayout#Common_Use_Cases).

# Example

![Borderlayout](/zk_component_ref/images/ZKCompRef_Borderlayout.jpg)

```xml
<borderlayout height="450px">
    <north title="North" maxsize="300" size="50%" splittable="true" collapsible="true">
        <borderlayout>
            <west title="West" size="25%" flex="true" maxsize="250" splittable="true" collapsible="true">
                <div style="background:#B8D335">
                    <label value="25%"
                        style="color:white;font-size:50px" />
                </div>
            </west>
            <center border="none">
                <div style="background:#E6D92C" vflex="1">
                    <label value="25%"
                        style="color:white;font-size:50px" />
                </div>
            </center>
            <east size="50%" border="none">
                <label value="Here is a non-border"
                    style="color:gray;font-size:30px" />
            </east>
        </borderlayout>
    </north>
    <center border="0">
        <borderlayout>
            <west maxsize="600" size="30%" border="0" splittable="true">
                <div style="background:#E6D92C" vflex="1">
                    <label value="30%"
                        style="color:white;font-size:50px" />
                </div>
            </west>
            <center>
                <label value="Here is a border"
                    style="color:gray;font-size:30px" />
            </center>
            <east title="East" size="30%" collapsible="true">
                <div style="background:#B8D335"  vflex="1">
                    <label value="30%"
                        style="color:white;font-size:50px" />
                </div>
            </east>
        </borderlayout>
    </center>
</borderlayout>
```

# How to Layout

For more details, please refer to
[Borderlayout]({{site.baseurl}}/zk_component_ref/borderlayout#How_to_Layout).

# Properties

## Size

Sets the width of the east region. This is a shortcut for the `width` attribute and accepts any valid CSS width value such as a fixed pixel amount or a percentage of the parent `borderlayout`.

```xml
<borderlayout height="400px">
    <east size="30%" title="East Panel">
        <label value="East content" />
    </east>
    <center>
        <label value="Center content" />
    </center>
</borderlayout>
```

Note that `height` cannot be set on an `east` region; its height is determined by the `north` and `south` sibling regions.

{% include LayoutCommonAttributes.md %}

# Supported Events

The east region does not define any events of its own; refer to [LayoutRegion]({{site.baseurl}}/zk_component_ref/layoutregion#Supported_Events) for inherited events.

# Supported Children

`*ALL`
