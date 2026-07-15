---
title: "Intbox"
---

- **Demonstration:** [Intbox](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Intbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Intbox.html)
- **JavaScript API:** [zul.inp.Intbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Intbox.html)

# Employment/Purpose

An `intbox` is used to let users input integer data.

## Common Use Cases

- **Form integer fields** — Collect whole-number input (quantities, counts, ages, year values) in a data-entry form. Pair with `constraint="no empty"` to prevent blank submission.
- **Bounded numeric input** — Apply `constraint="no negative,no zero"` (or the EE `min`/`max` syntax) to enforce a valid range without writing custom validators.
- **MVVM two-way binding** — Use `value="@bind(vm.amount)"` so the ViewModel receives a typed `Integer` directly, avoiding manual string parsing.
- **In-place editing** — Set `inplace="true"` to render the intbox as a label until the user clicks it, keeping read-heavy UIs visually clean.

# Example

![Intbox](/zk_component_ref/images/ZKComRef_Intbox.png)

While input invalid data:

![Intbox2](/zk_component_ref/images/ZKComRef_Intbox2.png)

```xml
 <window title="Intbox Demo" border="normal" width="200px">
     int box:<intbox/>
 </window>
```

# Properties

## Value

**Default Value:** `null`

Sets the integer value displayed in the input field. The value is typed as `Integer` and may be `null` unless a constraint (such as `no empty`) prevents it. Binding this property via EL expression is the most common pattern.

```xml
<intbox value="42"/>
```

When bound to a ViewModel:

```xml
<intbox value="@bind(vm.quantity)"/>
```

# Supported Events

- Inherited Supported Events: [NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![Intbox](/zk_component_ref/images/ZKComRef_Intbox.png) |
| rounded | ![Spinner mold rounded](/zk_component_ref/images/Spinner_mold_rounded.png) {% include supported-since.html version="5.0.0" %} |

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.