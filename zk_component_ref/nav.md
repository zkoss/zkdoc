---
title: "Nav"
---

- **Demonstration:**
- **Java API:** [Nav](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/Nav.html)
- **JavaScript API:** [Nav](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.nav.Nav.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

A container is used to display `navitem`, it should be placed inside a
`navbar`.

## Common Use Cases

### Collapsible Navigation Group

Use `<nav>` to group related `<navitem>` elements under a single collapsible label inside a `<navbar>`. The `label` attribute names the group; the `iconSclass` attribute decorates it with a Font Awesome icon.

```xml
<navbar orient="vertical" width="200px">
    <navitem label="Home" iconSclass="z-icon-home" />
    <nav label="Get Started" iconSclass="z-icon-th-list">
        <navitem label="Step One" />
        <navitem label="Step Two" />
        <navitem label="Step Three" />
    </nav>
    <navitem label="About" iconSclass="z-icon-flag" />
</navbar>
```

### Badge Count on a Nav Group

Add a `badgeText` attribute to surface a count badge on the group header without requiring the user to expand it.

```xml
<navbar orient="vertical" width="200px">
    <nav label="Messages" iconSclass="z-icon-envelope" badgeText="5">
        <navitem label="Inbox" />
        <navitem label="Sent" />
    </nav>
</navbar>
```

### Nested Nav Groups

`<nav>` elements can be nested to create multi-level navigation hierarchies.

```xml
<navbar orient="vertical" width="220px">
    <nav label="Settings" iconSclass="z-icon-cog">
        <nav label="Account">
            <navitem label="Profile" />
            <navitem label="Password" />
        </nav>
        <navitem label="Notifications" />
    </nav>
</navbar>
```

# Example

![Nav](/zk_component_ref/images/ZKComRef_Nav.png)

```xml
<navbar orient="vertical" width="200px">
    <navitem label="Home" iconSclass="z-icon-home" />
    <nav label="Get Started" iconSclass="z-icon-th-list" badgeText="3">
        <navitem label="Step One" />
        <navitem label="Step Two" />
        <navitem label="Step Three" />
    </nav>
    <navitem label="About" iconSclass="z-icon-flag" />
    <navitem label="Contact" iconSclass="z-icon-envelope"/>
</navbar>
```

- Inherited Supported Events: [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

[Nav]({{site.baseurl}}/zk_component_ref/nav), [Navitem]({{site.baseurl}}/zk_component_ref/navitem), [Navseparator]({{site.baseurl}}/zk_component_ref/navseparator)