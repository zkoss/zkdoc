---
title: "Breadcrumb"
---

- **Java API:** [org.zkoss.zul.Breadcrumb](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Breadcrumb.html)
- **JavaScript API:** [zul.wgt.Breadcrumb](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Breadcrumb.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Breadcrumb` shows the current page's position in a hierarchy. Each `Breadcrumbitem` can navigate to a parent page, while the final item normally represents the current page without an `href`.

# Example

```xml
<breadcrumb maxItems="3" separator="icon:z-icon-chevron-right">
    <breadcrumbitem label="Home" href="/"/>
    <breadcrumbitem label="Products" href="/products"/>
    <breadcrumbitem label="Frameworks" href="/products/frameworks"/>
    <breadcrumbitem label="ZK"/>
</breadcrumb>
```

# Breadcrumb Properties

## Separator

**Default Value:** `/`

Sets the separator between items. Use plain text or the `icon:<sclass>` form. A `null` or empty value restores `/`.

## MaxItems

**Default Value:** `0`

Sets the maximum number of displayed items. `0` shows all items. When the count is exceeded, middle items collapse into an ellipsis while the first and last remain visible. The value must be `0` or at least `2`.

# Breadcrumbitem Properties

## Label, Image, and IconSclass

These properties are inherited from `LabelImageElement` and define the item's content.

## Href and Target

`href` sets the destination. When it is `null`, the item renders as plain text. `target` accepts standard link targets such as `_blank`.

Unsafe URL schemes are rejected. Use HTTP(S), a relative or fragment URL, `mailto`, `tel`, or a supported image data URL.

## Disabled

**Default Value:** `false`

A disabled item appears muted and cannot be activated.

# Supported Events

No component-specific events. Items use standard link navigation.

# Supported Children

- `Breadcrumb` accepts only `Breadcrumbitem`.
- `Breadcrumbitem` accepts no children and must be placed inside `Breadcrumb`.
