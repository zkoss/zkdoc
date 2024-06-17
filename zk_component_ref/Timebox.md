# Timebox

- Demonstration: [Date and
  Time](http://www.zkoss.org/zkdemo/input/date_and_time_picker)
- Java API: <javadoc>org.zkoss.zul.Timebox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.db.Timebox</javadoc>
- Style Guide: [
  Timebox](ZK_Style_Guide/XUL_Component_Specification/Timebox)

# Employment/Purpose

An edit box for holding a time (a java.util.Date Object) , but only Hour
& Minute are used.

# Example

![](ZKCompRef_Timebox.png)

``` xml
<timebox cols="11"/>
```

# Properties

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be `no empty`.

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

``` xml
<timebox constraint="no empty: cannot be empty"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

``` xml
<timebox constraint="no empty: ${c:l('err.time.required')}"/>
```

## Format

Use *a* to signify it is *am* or *pm*. The input string follows the
formatting of the
[SimpleDateFormat](http://java.sun.com/j2se/1.5.0/docs/api/java/text/SimpleDateFormat.html).

Below is an example of using *a* within the format.

``` xml
<timebox cols="20" format="a hh:mm:ss"/>
```

24 hours mode:

``` xml
 
<timebox cols="8" format="HH:mm:ss"/>
```

In addition to specifying the format explicitly, you could specify the
styling. There are four different types of styling: short, medium, long
and full (representing the styling of java.text.DateFormat). For
example, you could specify the styling rather than the real format as
follows.

``` xml
<timebox format="short"/>
<timebox format="long"/>
```

Then the real format of the timebox will be decided at run time
depending the configuration. For more information, please refer to [ZK
Developer's Reference: Date and Time
Formatting](ZK_Developer's_Reference/Internationalization/Date_and_Time_Formatting).

## Locale

By default, the real format depends on the current locale (i.e.,
<javadoc method="getCurrent()">org.zkoss.util.Locales</javadoc>.
However, you could specify the locale for an individual instance such
as:

``` xml
<timebox format="medium" locale="de_DE"/>
<timebox format="long" locale="fr"/>
```

## Text

You should set `text` attribute after `format` attribute or ZK might not
convert the specified text well.

``` xml
<timebox format="hh:mm:ss a" locale="en" text="12:00:00 AM"/>
```

- If you set `format` later than setting `text` attribute, ZK might
  probably fail to convert the text to a `Date` object according to
  default format and throw `org.zkoss.zk.ui.WrongValueException`.

# Inherited Functions

Please refer to [
FormatInputElement](ZK_Component_Reference/Base_Components/FormatInputElement)
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
  FormatInputElement](ZK_Component_Reference/Base_Components/FormatInputElement#Supported_Events)

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
<td>![](timebox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td><p><img src="timebox_mold_rounded.png"
title="timebox_mold_rounded.png" alt="timebox_mold_rounded.png" />
</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date        | Content                                                                                                                                         |
|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.7   | April, 2011 | <javadoc method="setFormat(java.lang.String)">org.zkoss.zul.Timebox</javadoc> supported the styling.                                            |
| 5.0.7   | April, 2011 | <javadoc method="setLocale(java.util.Locale)">org.zkoss.zul.Timebox</javadoc> was introduced to specify a locale other than the current locale. |
