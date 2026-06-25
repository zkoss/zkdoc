---
title: "South"
---

- **Demonstration:** [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- **Java API:** [org.zkoss.zul.South](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/South.html)
- **JavaScript API:** [zul.layout.South](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.South.html)

# Employment/Purpose

A south region of a border layout and only allows one component as its
child.

## Common Use Cases

**Fixed footer bar** — set a pixel `size` to pin the south region to a fixed height regardless of the available space:

```xml
<borderlayout height="500px">
    <center>
        <label value="Main content" />
    </center>
    <south size="60px" title="Status Bar">
        <label value="Ready" />
    </south>
</borderlayout>
```

**Collapsible panel with a percentage size** — combine `size` with `collapsible="true"` and `splittable="true"` so users can resize or hide the panel:

```xml
<borderlayout height="500px">
    <center>
        <label value="Main content" />
    </center>
    <south size="30%" collapsible="true" splittable="true" title="Details">
        <label value="Detail panel" />
    </south>
</borderlayout>
```

# Example

![](/zk_component_ref/images/ZKCompRef_Borderlayout.jpg)

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

# Properties

## Size

**Default Value:** none (unset)

Sets the height of the south region. This attribute is a shortcut for the `height` attribute — both are equivalent for `<south>`. Accepts any valid CSS length value such as `"200px"` or `"30%"`.

```xml
<borderlayout height="400px">
    <south size="150px" title="Footer">
        <label value="Footer area" />
    </south>
    <center>
        <label value="Main content" />
    </center>
</borderlayout>
```

{% include LayoutCommonAttributes.md %}

# Supported Events

South declares no own events.

# How to Layout

For more details, please refer to
[Borderlayout]({{site.baseurl}}/zk_component_ref/borderlayout#How_to_Layout).

# Supported Children

`*ALL`

# Use Cases

[Borderlayout]({{site.baseurl}}/zk_component_ref/borderlayout#Use_Cases)