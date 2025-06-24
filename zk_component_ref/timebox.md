

# Timebox

- Demonstration: [Date and Time](http://www.zkoss.org/zkdemo/input/date_and_time_picker)
- Java API: [org.zkoss.zul.Timebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timebox.html)
- JavaScript API: [zul.db.Timebox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.db.Timebox.html)


# Employment/Purpose

An edit box for holding a time (a java.util.Date Object) , but only Hour
& Minute are used.

# Example

![](/zk_component_ref/images/ZKCompRef_Timebox.png)

```xml
<timebox cols="11"/>
```

{% include IntegrateMomentjs.md %}

# Properties

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be `no empty`.

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<timebox constraint="no empty: cannot be empty"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<timebox constraint="no empty: ${c:l('err.time.required')}"/>
```

## Format

Use *a* to signify it is *am* or *pm*. The input string follows the
formatting of the
[SimpleDateFormat](http://java.sun.com/j2se/1.5.0/docs/api/java/text/SimpleDateFormat.html).

Below is an example of using *a* within the format.

```xml
<timebox cols="20" format="a hh:mm:ss"/>
```

24 hours mode:

```xml
 
<timebox cols="8" format="HH:mm:ss"/>
```

{% include version-badge.html version=5.0.7 %} In addition to specifying the format
explicitly, you could specify the styling. There are four different
types of styling: short, medium, long and full (representing the styling
of java.text.DateFormat). For example, you could specify the styling
rather than the real format as follows.

```xml
<timebox format="short"/>
<timebox format="long"/>
```

Then the real format of the timebox will be decided at run time
depending the configuration. For more information, please refer to [ZK Developer's Reference: Date and Time Formatting]({{site.baseurl}}/zk_dev_ref/internationalization/date_and_time_formatting).

## Locale

By default, the real format depends on the current locale (i.e.,
[org.zkoss.util.Locales#getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Locales.html#getCurrent()).
However, you could specify the locale for an individual instance such
as:

```xml
<timebox format="medium" locale="de_DE"/>
<timebox format="long" locale="fr"/>
```

## Text

You should set `text` attribute after `format` attribute or ZK might not
convert the specified text well.

```xml
<timebox format="hh:mm:ss a" locale="en" text="12:00:00 AM"/>
```

- If you set `format` later than setting `text` attribute, ZK might
  probably fail to convert the text to a `Date` object according to
  default format and throw `org.zkoss.zk.ui.WrongValueException`.

# Inherited Functions

Please refer to [ FormatInputElement]({{site.baseurl}}/zk_component_ref/base_components/formatinputelement)
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

- Inherited Supported Events: [ FormatInputElement]({{site.baseurl}}/zk_component_ref/base_components/formatinputelement#Supported_Events)

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
<td>![](/zk_component_ref/images/timebox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td><p>![](/zk_component_ref/images/timebox_mold_rounded.png
title="timebox_mold_rounded.png" alt="timebox_mold_rounded.png" /> {%
include version-badge.html version=5.0.0 %}</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date        | Content                                                                                                                                         |
|---------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.7   | April, 2011 | [org.zkoss.zul.Timebox#setFormat(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timebox.html#setFormat(java.lang.String)) supported the styling.                                            |
| 5.0.7   | April, 2011 | [org.zkoss.zul.Timebox#setLocale(java.util.Locale)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timebox.html#setLocale(java.util.Locale)) was introduced to specify a locale other than the current locale. |


