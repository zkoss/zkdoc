---
title: "Doublespinner"
---

- **Demonstration:** [Spinner](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Doublespinner](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Doublespinner.html)
- **JavaScript API:** [zul.inp.Doublespinner](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Doublespinner.html)

# Employment/Purpose

An edit box for holding a constrained double.

## Common Use Cases

- **Numeric input with bounds**: Use `doublespinner` when you need users to enter a floating-point number and want to enforce a minimum/maximum range via the `constraint` attribute (e.g. `min 0.0 max 100.0`).
- **Controlled increments**: When a value must increase or decrease in a fixed step (e.g. `0.1`, `0.5`, or `2.5`), set the `step` attribute so the spinner buttons move the value by that exact amount.
- **Embedded numeric editors**: Hide the spin buttons (`buttonVisible="false"`) when the spinner is used inside a compact form or table cell where only keyboard input is expected, while still enforcing the numeric type and constraint.

# Example

![](/zk_component_ref/images/ZKComRef_Doublespinner.png)

```xml
     <doublespinner step="0.5" />
```

# In-place Editing

## Fixed Width

```xml
<doublespinner width="100px" inplace="true" value="30" />
```

## Dynamic Width

Because inplace editing function in ZK is pure client side action, so we
can use client api to modify the width (server side do not need to know)

![](/zk_component_ref/images/ZK_Component_Reference-Input-Spinner-inplace.jpg)

```xml
<zk xmlns:c="client">
  <doublespinner inplace="true" value="240" width="30px" c:onFocus='this.setWidth("60px")' c:onBlur='this.setWidth("30px")' />
</zk>
```

# Properties

## ButtonVisible

**Default Value:** `true`

Controls whether the up/down spin buttons to the right of the input field are rendered. Set to `false` to hide the buttons and allow only direct keyboard input; the numeric type and any `constraint` are still enforced.

```xml
<doublespinner buttonVisible="false" value="3.14"/>
```

{% include SpinnerStep.md component="doublespinner" type="a `double`" default="1.0" step="0.5" value="3.14" %}

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be a combination of `no empty` and the
minimum and maximum to doublespinner.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<doublespinner step="0.5" constraint="no empty,min -2.5 max 6.5"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<doublespinner step="0.5" constraint="no empty,min -2.5 max 6.5: between -2.5 to 6.5"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<doublespinner step="0.5" constraint="no empty,min -2.5 max 6.5: ${c:l('err.msg.doublespinner')}"/>
```

## Value

**Default Value:** `null`

The current value of the spinner as a `Double`. The value may be `null` unless a `no empty` constraint is set. To bind an initial value from a ViewModel or `<zscript>`, use EL:

```xml
<zscript>
    Double initialValue = 3.14;
</zscript>
<doublespinner value="${initialValue}"/>
```

For simple literal values, the attribute form is sufficient:

```xml
<doublespinner value="2.5"/>
```

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![](/zk_component_ref/images/spinner_mold_default.png) |
| rounded | ![](/zk_component_ref/images/spinner_mold_rounded.png) |

# Supported Children

`*None`

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.