---
title: "Navseparator"
---

- **Java API:** [Navseparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Navseparator.html)
- **JavaScript API:** [Navseparator](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.nav.Navseparator.html)

{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Used to create a separator between nav items.

## Common Use Cases

### Dividing Top-Level Nav Items

Place `<navseparator/>` between logically unrelated groups of `<navitem>` or `<nav>` elements inside a `<navbar>` to draw a visible dividing line:

```xml
<navbar orient="vertical">
    <navitem label="Inbox" iconSclass="z-icon-inbox"/>
    <navitem label="Sent" iconSclass="z-icon-send"/>
    <navseparator/>
    <navitem label="Settings" iconSclass="z-icon-cog"/>
    <navitem label="Help" iconSclass="z-icon-question-circle"/>
</navbar>
```

### Dividing Items Inside a Nested Nav

`<navseparator/>` can also be placed inside a `<nav>` (collapsible sub-menu) to separate groups of child `<navitem>` elements:

```xml
<nav label="Projects" iconSclass="z-icon-folder">
    <navitem label="Active"/>
    <navitem label="On Hold"/>
    <navseparator/>
    <navitem label="Archived"/>
</nav>
```

# Example

![](/zk_component_ref/images/ZKComRef_Navseparator.png)

```xml
    <navbar orient="horizontal" collapsed="true">
        <navitem label="Inbox" iconSclass="z-icon-inbox" />
        <navitem label="Create New Task" iconSclass="z-icon-pencil"/>
        <navseparator/>
        <nav label="Next Actions" iconSclass="z-icon-th-list" badgeText="4">
            <navseparator/>
            <navitem label="Rescue the Baby" iconSclass="z-icon-star"/>
            <navitem label="Play Darts" />
            <navitem label="Plant Flowers" />
            <navitem label="Wash the Car" iconSclass="z-icon-star"/>
        </nav>
        <nav label="Someday" iconSclass="z-icon-tasks" badgeText="2"/>
        <nav label="Done" iconSclass="z-icon-archive"/>
    </navbar>
```

# Supported Events

None

# Supported Children

`*NONE`