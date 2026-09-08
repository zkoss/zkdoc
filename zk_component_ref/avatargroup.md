---
title: "Avatargroup"
---

- **Java API:** [org.zkoss.zul.Avatargroup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Avatargroup.html)
- **JavaScript API:** [zul.wgt.Avatargroup](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Avatargroup.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Avatargroup` displays related [Avatar]({{site.baseurl}}/zk_component_ref/avatar) components as an overlapping group. When space is limited, `maxCount` keeps the group compact by replacing excess avatars with a `+N` indicator.

# Example

```xml
<avatargroup maxCount="3" shape="circle" size="small">
    <avatar label="A"/>
    <avatar label="B"/>
    <avatar label="C"/>
    <avatar label="D"/>
    <avatar label="E"/>
</avatargroup>
```

This example shows three avatars and a `+2` overflow indicator.

# Properties

## MaxCount

**Default Value:** `0`

Sets the maximum number of visible avatars. `0` shows every avatar. Negative values cause a `WrongValueException`.

## Size

Sets a `small`, `medium`, or `large` default for child avatars. A child can still specify its own size.

## Shape

Sets a `circle` or `square` default for child avatars. A child can still specify its own shape.

# Accessibility

Use the client-attribute namespace to provide a group name:

```xml
<avatargroup xmlns:ca="client/attribute"
             ca:aria-label="Project members">
    <avatar label="JD"/>
    <avatar label="KL"/>
</avatargroup>
```

The ZK Accessibility add-on supplies the group role and an accessible description for the overflow indicator.

# CSS Variables

| Variable | Default | Purpose |
|---|---:|---|
| `--zk-avatargroup-overlap` | `-8px` | Overlap between adjacent avatars |

# Supported Events

No component-specific events.

# Supported Children

`*Avatar`

Adding another component type causes a `UiException`.
