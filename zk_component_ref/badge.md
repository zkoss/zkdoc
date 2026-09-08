---
title: "Badge"
---

- **Java API:** [org.zkoss.zul.Badge](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Badge.html)
- **JavaScript API:** [zul.wgt.Badge](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Badge.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Badge` displays a short status or count. It can stand alone or wrap another component, such as a cart button or notification icon.

# Example

```xml
<badge value="NEW" severity="success"/>
<badge count="5"/>
<badge count="0" showZero="true"/>
<badge count="150"/><!-- displays 99+ -->
<badge dot="true" severity="danger"/>

<badge count="3" placement="top_right">
    <button label="Cart"/>
</badge>
```

# Properties

## Value and Count

`value` displays text and takes precedence over `count`. An empty value is treated as `null`. `count` defaults to `0` and cannot be negative.

## Max

**Default Value:** `99`

When `count` exceeds `max`, the badge displays `{max}+`. The value must be at least `1`.

## ShowZero

**Default Value:** `false`

Set it to `true` to display a numeric badge when `count` is zero.

## Dot

**Default Value:** `false`

Displays a small indicator without the `value` or `count` text.

## Severity

**Default Value:** `info`

Allowed values are `info`, `success`, `warning`, `danger`, and `secondary`. Badge, Chip, and Confirmpopup use this shared severity vocabulary.

## Placement

**Default Value:** `top_right`

In wrap mode, sets the indicator position to `top_right`, `top_left`, `bottom_right`, or `bottom_left`.

# Supported Events

No component-specific events.

# Supported Children

`*ALL`

Adding a child switches the badge to wrap mode. Setting `visible="false"` hides both the indicator and its wrapped child.
