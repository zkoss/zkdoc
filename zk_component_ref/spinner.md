---
title: "Spinner"
---


- Demonstration:
  [Spinner](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Spinner](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Spinner.html)
- JavaScript API: [zul.inp.Spinner](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Spinner.html)


# Employment/Purpose

An edit box for holding a constrained integer.

# Example

![](/zk_component_ref/images/ZKComRef_Spinner.png)

```xml
 <window title="Spinner" border="normal" width="150px">
     <spinner />
 </window>
```

# In-place Editing

## Fixed Width

```xml
<spinner width="100px" inplace="true" value="30" />
```

## Dynamic Width

Because inplace editing function in ZK is pure client side action, so we
can use client api to modify the width (server side do not need to know)

![](/zk_component_ref/images/ZK_Component_Reference-Input-Spinner-inplace.jpg)

```xml
<zk xmlns:c="client">
  <spinner inplace="true" value="240" width="30px" c:onFocus='this.setWidth("60px")' c:onBlur='this.setWidth("30px")' />
</zk>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

```xml
<spinner format="#,##0.##"/>
```

{% include version-badge.html version=8.5.2 %} You can provide a locale to format
the number by specifying the String starts with "locale:"

```xml
<spinner format="locale:zh-TW"/>
```

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be a combination of `no empty` and the
minimum and maximum to spinner.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<spinner constraint="no empty,min -2 max 6"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<spinner constraint="no empty,min -2 max 6: between -2 to 6"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<spinner constraint="no empty,min -2 max 6: ${c:l('err.msg.spinner')}"/>
```

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#supported-events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in zul.jar.

| Name | Screenshot                                                                                           |
|---|------------------------------------------------------------------------------------------------------|
| default | ![](/zk_component_ref/images/spinner_mold_default.png)                                               |
| rounded | {% include version-badge.html version=5.0.0 %} ![](/zk_component_ref/images/spinner_mold_rounded.png |

# Supported Children

`*None`
