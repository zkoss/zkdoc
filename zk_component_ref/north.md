---
title: "North"
description: "North: A north region of a border layout and only allows one component as its child."
---

- **Demonstration:** [Borderlayout](https://www.zkoss.org/zkdemo/layout/border_layout)
- **Java API:** [org.zkoss.zul.North](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/North.html)
- **JavaScript API:** [zul.layout.North](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.North.html)

# Employment/Purpose

A north region of a border layout and only allows one component as its
child.

## Common Use Cases

### Fixed-height header bar

Use the north region with a fixed pixel height for a persistent page header:

```xml
<borderlayout height="600px">
    <north size="60px" border="none">
        <toolbar>
            <toolbarbutton label="Home"/>
            <toolbarbutton label="About"/>
        </toolbar>
    </north>
    <center autoscroll="true">
        <label value="Main content"/>
    </center>
</borderlayout>
```

### Collapsible north panel

Allow users to collapse the north region to reclaim vertical space:

```xml
<borderlayout height="500px">
    <north size="120px" collapsible="true" title="Summary Panel">
        <label value="Summary information"/>
    </north>
    <center>
        <label value="Detail view"/>
    </center>
</borderlayout>
```

### Splittable north region

Enable drag-to-resize with `splittable="true"` so users can adjust the north region's height at runtime:

```xml
<borderlayout height="500px">
    <north size="150px" splittable="true" minsize="50" maxsize="300">
        <label value="Resizable header content"/>
    </north>
    <center>
        <label value="Main content"/>
    </center>
</borderlayout>
```

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

**Default Value:** `null`

Sets the height of the north region. This is a shortcut for the `height` attribute — any valid CSS height value is accepted (e.g. `"200px"`, `"30%"`).

```xml
<borderlayout height="400px">
    <north size="150px">
        <label value="Header area"/>
    </north>
    <center>
        <label value="Content area"/>
    </center>
</borderlayout>
```

> **Note:** The `width` attribute is not applicable to `<north>` because its width is determined by sibling `<west>` and `<east>` regions. Use `size` (or equivalently `height`) to control the north region's dimension.

{% include LayoutCommonAttributes.md %}

# Supported Events

- Inherited Supported Events: [ LayoutRegion]({{site.baseurl}}/zk_component_ref/layoutregion#Supported_Events)

# Supported Children

`*ALL`