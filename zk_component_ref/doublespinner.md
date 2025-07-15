

# Doublespinner

- Demonstration:
  [Spinner](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Doublespinner](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Doublespinner.html)
- JavaScript API:
  [zul.inp.Doublespinner](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Doublespinner.html)


# Employment/Purpose

An edit box for holding a constrained double.

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

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

```xml
<doublespinner format="#,##0.##"/>
```

` Since 8.5.2`

You can provide a locale to format the number by specify the String
starts with "locale:"

```xml
<doublespinner format="locale:zh-TW"/>
```

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

# Inherited Functions

Please refer to [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement)
for inherited functions.

# Supported Events

- Inherited Supported Events: [ NumberInputElement]({{site.baseurl}}/zk_component_ref/numberinputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/spinner_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td>![](/zk_component_ref/images/spinner_mold_rounded.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*None`



# Version History



| Version | Date      | Content           |
|---------|-----------|-------------------|
| 5.0.6   | Dec. 2010 | add new component |


