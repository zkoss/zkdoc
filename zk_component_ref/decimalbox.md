---
title: "Decimalbox"
description: "Decimalbox: An edit box for holding big decimal value."
---

- **Demonstration:** [Decimalbox](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Decimalbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Decimalbox.html)
- **JavaScript API:** [zul.inp.Decimalbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Decimalbox.html)

# Employment/Purpose

An edit box for holding big decimal value.

## Common Use Cases

- **Financial / monetary input** — collecting prices, amounts, or rates where exact decimal precision matters (e.g. `scale="2"` for currency).
- **Scientific data entry** — accepting measurements or coefficients that require arbitrary precision beyond what a plain `doublebox` provides.
- **Validated numeric fields** — pairing with constraints such as `no negative,no empty` to enforce business rules directly in the UI without extra server-side code.

# Example

![Decimalbox Examples](/zk_component_ref/images/ZKComRef_Decimalbox_Examples.PNG)

```xml
 <decimalbox value="155"/>
```

# Properties

## Scale

**Default Value:** `AUTO` (scale decided by what the user enters)

Sets the number of decimal places to preserve in the stored value. When set to a positive integer, any value entered by the user is rounded to that many decimal places using the component's rounding mode. The special constant `AUTO` (the default) leaves the scale exactly as typed.

```xml
<decimalbox scale="2" value="1234.5678"/>
```

Setting `scale="2"` on the example above stores `1234.57` (rounded to 2 decimal places).

## Value

**Default Value:** `null`

Gets or sets the component's current value as a `java.math.BigDecimal`. The value may be `null` unless a `no empty` constraint is applied. When binding to a backend ViewModel, use EL or a `<zscript>` block to supply the initial `BigDecimal` object.

```xml
<zscript>
    import java.math.BigDecimal;
    BigDecimal initialAmount = new BigDecimal("9999.99");
</zscript>
<decimalbox value="${initialAmount}"/>
```

The value is a `BigDecimal` object; construct it in `<zscript>`, a composer, or a ViewModel rather than passing a raw Java expression inline.

# Supported Events

- Inherited Supported Events: [NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

**default**

The standard rectangular input box appearance.

```xml
<decimalbox mold="default" value="3.14"/>
```

**rounded**

Renders the input with rounded corners, matching the rounded style used by other input components.

```xml
<decimalbox mold="rounded" value="3.14"/>
```

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.
