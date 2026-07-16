---
title: "Doublebox"
description: "Doublebox: An edit box for holding an float point value (double)."
---

- **Demonstration:** [Doublebox](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Doublebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Doublebox.html)
- **JavaScript API:** [zul.inp.Doublebox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Doublebox.html)

# Employment/Purpose

An edit box for holding an float point value (double).

## Common Use Cases

- **Scientific or financial data entry** — collecting floating-point measurements, prices, rates, or percentages where integer precision is insufficient.
- **Form validation** — combine with the `constraint` attribute (`no negative`, `no zero`, `no empty`) to enforce business rules without server round-trips.
- **Locale-aware number display** — use the inherited `format` attribute (e.g. `"#,##0.##"` or `"locale:de-DE"`) to render the value according to the end-user's locale.
- **Inline editing in grids** — place inside a `<row>` or a grid cell renderer for compact, type-safe numeric editors.

# Example

![Doublebox Examples](/zk_component_ref/images/ZKComRef_Doublebox_Examples.PNG)

```xml
 <doublebox value="2.3"/>
```

# Properties

## Value

**Default Value:** `null`

Sets or returns the numeric value held by this doublebox as a `Double` object. The value may be `null` unless a `no empty` constraint prevents it. Assign a numeric literal directly in ZUL:

```xml
<doublebox value="2.3"/>
```

When binding via MVVM, use EL to connect a `Double` property on your ViewModel:

```xml
<doublebox value="@bind(vm.price)"/>
```

## Constraint

You could specify what value to accept for input controls by the use of
the `constraint`property. It could be a combination of `no positive`,
`no negative`, `no zero`, `no empty`.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<doublebox constraint="no negative,no empty"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<doublebox constraint="no negative: it shall not be negative"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<doublebox constraint="no negative: ${c:l('err.num.negative')}"/>
```

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in zul.jar.

| Name | Snapshot |
|---|---|
| default | ![Doublebox mold default](/zk_component_ref/images/Doublebox_mold_default.png) |
| rounded | ![Doublebox mold rounded](/zk_component_ref/images/Doublebox_mold_rounded.png) |

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.
