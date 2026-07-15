---
title: "Longbox"
---

- **Demonstration:** [Longbox](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Longbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Longbox.html)
- **JavaScript API:** [zul.inp.Longbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Longbox.html)

# Employment/Purpose

A long`box` is used to let users input long data.

## Common Use Cases

- **Large numeric identifiers** — store and display values such as database primary keys, order numbers, or Unix timestamps that exceed the range of a 32-bit integer.
- **Financial quantities** — capture monetary amounts in minor units (e.g. cents) or large counters where precision beyond `int` is required.
- **Constrained numeric entry** — combine with `constraint="no negative,no empty"` to enforce domain rules (positive-only quantities, required fields) directly in the UI without extra server code.

# Example

![Longbox](/zk_component_ref/images/ZKComRef_longbox.jpg)

```xml
 <window title="Longbox Demo" border="normal" width="400px">
     long box:<longbox width="250px"/>
 </window>
```

# Properties

For the **Format** property, refer to [FormatInputElement]({{site.baseurl}}/zk_component_ref/formatinputelement) — it is inherited and documented on that ancestor class page.

## Value

**Default Value:** `null`

The current value of the longbox as a `Long` object. Returns `null` when the field is empty, unless a constraint (e.g. `no empty`) prevents it. Bind this property via EL or set it programmatically from a ViewModel or composer.

```xml
<zscript>
    Long initialCount = 1_000_000L;
</zscript>
<longbox value="${initialCount}"/>
```

To clear the field in ZUL, omit the `value` attribute or pass an empty EL expression; the component will render as blank.

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be a combination of `no positive`,
`no negative`, `no zero`, `no empty`.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<longbox constraint="no negative,no empty"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<intbox constraint="no negative: it shall not be negative"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<longbox constraint="no negative: ${c:l('err.num.negative')}"/>
```

### min & max constraint

{% include supported-since.html version="10.2.0" %} {% include supported-since.html version=EE %}

```xml
<spinner constraint="min -2 max 6"/>
```

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![Longbox mold default](/zk_component_ref/images/longbox_mold_default.png) |
| rounded | ![Longbox mold rounded](/zk_component_ref/images/longbox_mold_rounded.png) {% include supported-since.html version="5.0.0" %} |

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.
