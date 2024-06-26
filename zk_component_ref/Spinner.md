

# Spinner

- Demonstration:
  [Spinner](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: <javadoc>org.zkoss.zul.Spinner</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.inp.Spinner</javadoc>
- Style Guide: [
  Spinner](ZK_Style_Guide/XUL_Component_Specification/Spinner)

# Employment/Purpose

An edit box for holding a constrained integer.

# Example

![](ZKComRef_Spinner.png)

``` xml
 <window title="Spinner" border="normal" width="150px">
     <spinner />
 </window>
```

# In-place Editing

## Fixed Width

``` xml
<spinner width="100px" inplace="true" value="30" />
```

## Dynamic Width

Because inplace editing function in ZK is pure client side action, so we
can use client api to modify the width (server side do not need to know)

<figure>
<img src="ZK_Component_Reference-Input-Spinner-inplace.jpg"
title="ZK_Component_Reference-Input-Spinner-inplace.jpg" />
<figcaption>ZK_Component_Reference-Input-Spinner-inplace.jpg</figcaption>
</figure>

``` xml
<zk xmlns:c="client">
  <spinner inplace="true" value="240" width="30px" c:onFocus='this.setWidth("60px")' c:onBlur='this.setWidth("30px")' />
</zk>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

``` xml
<spinner format="#,##0.##"/>
```

{% include versionSince\| 8.5.2 %} You can provide a locale to format
the number by specifying the String starts with "locale:"

``` xml
<spinner format="locale:zh-TW"/>
```

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be a combination of `no empty` and the
minimum and maximum to spinner.

To specify two or more constraints, use comma to separate them as
follows.

``` xml
<spinner constraint="no empty,min -2 max 6"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

``` xml
<spinner constraint="no empty,min -2 max 6: between -2 to 6"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

``` xml
<spinner constraint="no empty,min -2 max 6: ${c:l('err.msg.spinner')}"/>
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
<td>![](spinner_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td><p><img src="spinner_mold_rounded.png"
title="spinner_mold_rounded.png" alt="spinner_mold_rounded.png" /> {%
include versionSince| 5.0.0 %}</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


