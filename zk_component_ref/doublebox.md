---
title: "Doublebox"
---


- Demonstration:
  [Doublebox](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Doublebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Doublebox.html)
- JavaScript API: [zul.inp.Doublebox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Doublebox.html)


# Employment/Purpose

An edit box for holding an float point value (double).

# Example

![](/zk_component_ref/images/ZKComRef_Doublebox_Examples.PNG)

```xml
 <doublebox value="2.3"/>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

```xml
<doublebox format="#,##0.##"/>
```

`Since 8.5.2`

You can provide a locale to format the number by specify the String
starts with "locale:"

```xml
<doublebox format="locale:zh-TW"/>
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

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Children

`*NONE`
