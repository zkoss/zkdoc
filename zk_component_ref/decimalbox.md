# Decimalbox

- Demonstration:
  [Decimalbox](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Decimalbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Decimalbox.html)
- JavaScript API:
  [zul.inp.Decimalbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Decimalbox.html)


# Employment/Purpose

An edit box for holding big decimal value .

# Example

![](/zk_component_ref/images/ZKComRef_Decimalbox_Examples.PNG)

```xml
 <decimalbox value="155"/>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

```xml
<decimalbox format="#,##0.##"/>
```

{% include version-badge.html version=8.5.2 %} You can provide a locale to format
the number by specifying a value starting with "locale:", e.g. [Indian numbering system](https://en.wikipedia.org/wiki/Indian_numbering_system):

```xml
<decimalbox format="locale:en-In"/>
```

Ref:
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat>

## Constraint

You could specify what value to accept for input controls by the use of
the `constraint`property. It could be a combination of `no positive`,
`no negative`, `no zero`, `no empty`.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<decimalbox constraint="no negative,no empty"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<decimalbox constraint="no negative: it shall not be negative"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<decimalbox constraint="no negative: ${c:l('err.num.negative')}"/>
```

### min & max constraint

{% include version-badge.html version=10.2.0 %}
<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}

```xml
<spinner constraint="min -2 max 6"/>
```

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Children

`*NONE`

