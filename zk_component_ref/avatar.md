---
title: "Avatar"
---

- **Java API:** [org.zkoss.zul.Avatar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Avatar.html)
- **JavaScript API:** [zul.wgt.Avatar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Avatar.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Avatar` represents a person or an object with an image, initials, or an icon. It is useful in member lists, comments, account menus, and other places where a compact visual identity is needed.

The component uses this fallback order: `image`, `iconSclass`, then `label`. If an image fails to load in the browser, Avatar rerenders with the icon or initials fallback.

# Example

```xml
<!-- The image is shown first; the icon and initials are fallbacks. -->
<avatar image="/img/jane.jpg" label="JD" iconSclass="z-icon-user"/>

<avatar label="CI" shape="circle"/>
<avatar label="SQ" shape="square"/>
<avatar label="SM" size="small"/>
<avatar label="MD" size="medium"/>
<avatar label="LG" size="large"/>
```

# Properties

## Image, Label, and IconSclass

These properties are inherited from `LabelImageElement`. `label` is normally a one- or two-character abbreviation. `iconSclass` is used when no image is available and takes precedence over the label.

## Shape

**Default Value:** `circle`

Allowed values are `circle` and `square`. Other values cause a `WrongValueException`.

## Size

**Default Value:** `medium`

Allowed values are `small`, `medium`, and `large`. For a custom size, override the component's CSS variables:

```xml
<avatar label="XL"
        style="--zk-avatar-size: 48px; --zk-avatar-font-size: 18px;"/>
```

## Gap

**Default Value:** `4`

Sets the safe inset, in pixels, between initials and the edge of the avatar. The allowed range is `0` through `24`; values outside that range cause a `WrongValueException`.

# CSS Variables

| Variable | Default | Purpose |
|---|---:|---|
| `--zk-avatar-size` | `36px` | Width and height |
| `--zk-avatar-font-size` | `14px` | Initials font size |

# Inherited Functions

Please refer to [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement) for inherited functions.

# Supported Events

No component-specific events.

# Supported Children

`*NONE`
