{% include ZKComponentReferencePageHeader %}

# Decimalbox

- Demonstration:
  [Decimalbox](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: <javadoc>org.zkoss.zul.Decimalbox</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.inp.Decimalbox</javadoc>
- Style Guide: [
  Decimalbox](ZK_Style_Guide/XUL_Component_Specification/Decimalbox)

# Employment/Purpose

An edit box for holding big decimal value .

# Example

<figure>
<img src="ZKComRef_Decimalbox_Examples.PNG"
title="ZKComRef_Decimalbox_Examples.PNG" />
<figcaption>ZKComRef_Decimalbox_Examples.PNG</figcaption>
</figure>

``` xml
 <decimalbox value="155"/>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

``` xml
<decimalbox format="#,##0.##"/>
```

{% include versionSince\| 8.5.2 %} You can provide a locale to format
the number by specifying a value starting with "locale:", e.g. [Indian
numbering
system](https://en.wikipedia.org/wiki/Indian_numbering_system):

``` xml
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

``` xml
<decimalbox constraint="no negative,no empty"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

``` xml
<decimalbox constraint="no negative: it shall not be negative"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

``` xml
<decimalbox constraint="no negative: ${c:l('err.num.negative')}"/>
```

# Inherited Functions

Please refer to [
NumberInputElement](ZK_Component_Reference/Base_Components/NumberInputElement)
for inherited functions.

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  NumberInputElement](ZK_Component_Reference/Base_Components/NumberInputElement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

{% include ZKComponentReferencePageFooter %}
