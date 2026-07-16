---
title: "West"
description: "West: A west region of a border layout and only allows one component as its child."
---

- **Demonstration:** [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- **Java API:** [org.zkoss.zul.West](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/West.html)
- **JavaScript API:** [zul.layout.West](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.West.html)

# Employment/Purpose

A west region of a border layout and only allows one component as its
child.

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

{% include LayoutCommonAttributes.md %}

## Size

Specifies the width of the west region. This is a shortcut for the standard `width` attribute — setting `size` is equivalent to setting `width` on the `<west>` element. Accepts any valid CSS width value such as a pixel count or a percentage of the parent borderlayout.

```xml
<borderlayout height="400px">
    <west size="200px" splittable="true">
        <label value="Navigation" />
    </west>
    <center>
        <label value="Main content" />
    </center>
</borderlayout>
```

You can also use a percentage-based width:

```xml
<borderlayout height="400px">
    <west size="25%" collapsible="true">
        <label value="Sidebar" />
    </west>
    <center>
        <label value="Content area" />
    </center>
</borderlayout>
```

## Common Use Cases

**Navigation sidebar with fixed width**

Set a fixed pixel width on `<west>` and enable `splittable` so users can drag to resize:

```xml
<borderlayout height="500px">
    <west size="220px" splittable="true" title="Menu">
        <listbox>
            <listitem label="Dashboard" />
            <listitem label="Reports" />
            <listitem label="Settings" />
        </listbox>
    </west>
    <center>
        <label value="Main content area" />
    </center>
</borderlayout>
```

**Collapsible sidebar**

Allow the panel to collapse to free up horizontal space:

```xml
<borderlayout height="500px">
    <west size="30%" collapsible="true" title="Sidebar">
        <div>Sidebar content</div>
    </west>
    <center border="none">
        <div>Main content</div>
    </center>
</borderlayout>
```

For additional layout examples, see [Borderlayout]({{site.baseurl}}/zk_component_ref/borderlayout#Use_Cases).

# Supported Events

- Inherited Supported Events: [ LayoutRegion]({{site.baseurl}}/zk_component_ref/layoutregion#Supported_Events)

# Supported Children

`*ALL`