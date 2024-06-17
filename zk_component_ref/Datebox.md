# Datebox

- Demonstration: [Date and
  Time](http://www.zkoss.org/zkdemo/input/date_and_time_picker)
- Java API: <javadoc>org.zkoss.zul.Datebox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.db.Datebox</javadoc>
- Style Guide: [
  Datebox](ZK_Style_Guide/XUL_Component_Specification/Datebox)

# Employment/Purpose

An edit box for holding a date. After click on the calender, a
`calender` will pop-up for inputting date.

# Keyboard Navigation `datebox`

- Alt+DOWN to pop up the `calendar.`

<!-- -->

- LEFT, RIGHT, UP and DOWN to change the selected day from the
  `calendar.`

<!-- -->

- ENTER to activate the selection by copying the selected day to the
  `datebox` control.

<!-- -->

- Alt+UP or ESC to give up the selection and close the `calendar`.

# Customization

You can customize the rendering of the calendar at the client by
JavaScript code that overrides
<javadoc directory="jsdoc">zul.db.Renderer</javadoc>.

# Example

<figure>
<img src="ZKComRef_Datebox_Example.PNG"
title="ZKComRef_Datebox_Example.PNG" />
<figcaption>ZKComRef_Datebox_Example.PNG</figcaption>
</figure>

``` xml
 <datebox lenient="true" buttonVisible="false" />
 <datebox lenient="false" buttonVisible="true" />
```

# Properties and Features

## Constraint

You can specify the date range to accept by the `constraint` property
with one or multiple following values:

- `no empty`
- `no future`
- `no past`
- `no today`.

It also supports an interval of dates. For example,

``` xml
<datebox constraint="between 20071225 and 20071203"/>
<datebox constraint="before 20071225"/>
<datebox constraint="after 20071225"/>
```

**Notices**

1.  The format of the date in the constraint must be `yyyMMdd`. It is
    independent of the locale.
2.  The date specified in the above constraints (before/after/between)
    is *included*. For example, `"before 20071225"` includes December
    25, 2007 and any day before it, and `"after 20110305"` includes
    March 5, 2011 and any day after it.
3.  The constraint is actually represented with an instance of the
    `org.zkoss.zul.SimpleDateConstraint` class. You can retrieve the
    parsed beginning and ending date with the `getBeginDate` and
    `getEndDate` methods.

``` java
((SimpleDateConstraint)datebox.getConstraint()).getBeginDate();
```

### Multiple Constraints

To specify two or more constraints, use a comma to separate them as
follows:

``` xml
<datebox constraint="no past,no empty"/>
```

### Custom Error Message

If you prefer to display a different message from the default one, you
can append the error message to the constraint with a colon.

``` xml
<datebox constraint="no empty, no future: now or never"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with a colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

``` xml
<datebox constraint="no empty, no future: ${c:l('err.date.nowornever')}"/>
```

## Displayed Time Zones

The image below shows the new <Javadoc>org.zkoss.zul.Datebox</Javadoc>
functionality which allows the user to change the time zone to other
predefined time zones. Viewing the zul markup provided below the image
we can see that the displayedTimeZones is set to "GMT+12,GMT+8". These
options are specified by the developer and restrict the user to the
available time zones.

<figure>
<img src="ZKComRef_Datebox_Timezone.png"
title="ZKComRef_Datebox_Timezone.png" />
<figcaption>ZKComRef_Datebox_Timezone.png</figcaption>
</figure>

``` xml
<datebox id="datebox1" format="M/d/yy KK:mm:ss a" width="150px" displayedTimeZones="GMT+12,GMT+8" timeZone="GMT+8" timeZonesReadonly="false"/>
```

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`. When the
formatting of the `datebox` is null, it means the date will be outputted
using the format `yyyy/MM/dd`.

``` xml
<datebox format="MM/dd/yyyy"/>
```

Like any other properties, you are able to change the format
dynamically, as depicted below.

``` xml
<datebox id="db"/>
<button label="set MM-dd-yyyy" onClick='db.setFormat("MM-dd-yyyy")'/>
```

### Length Option

In addition to specifying the format explicitly, you could specify the
length option. It supports four different length options mentioned at
[java.text.DateFormat](http://docs.oracle.com/javase/7/docs/api/java/text/DateFormat.html):

- short
- medium
- long
- full

For example, you could specify the styling rather than the real format
as follows.

``` xml
<datebox format="short"/>
<datebox format="long"/>
```

Then the real format of the datebox will be decided at run-time
depending on the configuration. For more information, please refer to
[ZK Developer's Reference: Date and Time
Formatting](ZK_Developer's_Reference/Internationalization/Date_and_Time_Formatting).

In addition, you could specify the format for both date and time by
using the syntax:

``` XML
format="option_for_date+option_for_time"
```

For example,

``` xml
<datebox format="medium+full"/>
```

#### Warning

Because [Java default locale provider changes since JDK
9](http://openjdk.java.net/jeps/252), the built-in formats (e.g. `long`)
for some locales might change since JDK 9. We recommend you to use a
fixed format pattern.

### Validation

If a user's input doesn't match the specified format, a Datebox will
show an error message. It's a client-side validation.

## Locale

Default: depends on the current locale (i.e.,
<javadoc method="getCurrent()" >org.zkoss.util.Locales</javadoc>) at
run-time

You can enforce the locale for an individual component such as:

``` xml
<datebox locale="de-DE" format="full"/>
<datebox locale="fr" format="full"/>
```

### Multiple-Eras Calendar

Datebox can display some multiple-eras calendar systems including:

- ROC(Taiwan): `locale="zh-TW-u-ca-roc"`
- Japan: `locale="ja-JP-u-ca-japanese"`
- Buddhist: `locale="th-TH-u-ca-buddhist"`

![](Roc-calendar.jpg "Roc-calendar.jpg")
![](jp-calendar.jpg "jp-calendar.jpg")
![](buddhist-calendar.jpg "buddhist-calendar.jpg")

See [complete locale
list](https://www.oracle.com/java/technologies/javase/jdk8-jre8-suported-locales.html).

Reference:
[Era](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/Era.html)

## Position

By default, the popup position is set to `after_start`, for other
possible popup positions please refer to
[Popup#Position](ZK_Component_Reference/Essential_Components/Popup#Position).

## The First Day of the Week

The first day of the week is decided by the locale by default. (actually
the return value of the `getFirstDayOfWeek` method in the
`java.util.Calendar`).

You can control the first day of the week by the use of the session
attribute and the library property. Please refer to [The First Day of
the
Week](ZK_Developer%27s_Reference/Internationalization/The_First_Day_of_the_Week)
for details.

## 2DigitYearStart

You can control the 2DigitYearStart by the use of the library property,
[org.zkoss.web.preferred.2DigitYearStart](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.web.preferred.2DigitYearStart).

## Show Week Number

Datebox supports to show a week number of the year in a calendar.

<figure>
<img src="ZKComRef_Datebox_Week_Of_Year.PNG"
title="ZKComRef_Datebox_Week_Of_Year.PNG" />
<figcaption>ZKComRef_Datebox_Week_Of_Year.PNG</figcaption>
</figure>

``` xml
<datebox weekOfYear="true" />
```

## Show Link of Today

Datebox supports a link to jump back to the date of today quickly

<figure>
<img src="ZKComRef_Datebox_Link_Of_Today.PNG"
title="ZKComRef_Datebox_Link_Of_Today.PNG" />
<figcaption>ZKComRef_Datebox_Link_Of_Today.PNG</figcaption>
</figure>

``` xml
<datebox id="db" showTodayLink="true" ></datebox>
```

The format is the same with that specified on format attribute

## Show Timebox

By default, there is no Timebox in the popup Calendar. If the specified
`format` attribute contains a time format (like below), it will show a
Timebox at the bottom of the popup Calendar.

``` xml
<datebox format="yyyy-MM-dd HH:mm"/>
```

## Monthly / yearly option

`Default: ``day`

You can specify the `selectLevel` attribute to restrict the date
granularity users can select. For example, you can limit users to just
select a month, it doesn't show the day view to users to choose a day.

Available values are:

- `year`
- `month`
- `day`.

``` xml
<datebox format="yyyy" selectLevel="year"/>
```

## Close Popup OnTimezoneChange

Datebox supports switching whether to auto close the datebox popup after
changing the timezone.

example:

``` xml
<datebox closePopupOnTimezoneChange="false" displayedTimeZones="GMT+12,GMT+8" timeZone="GMT+8" timeZonesReadonly="false"/>
```

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
<td><center>
<p><code>onTimeZoneChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes the time zone of
the component is changed by user.</p></td>
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
<td>![](datebox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>rounded</p>
</center></td>
<td><p><img src="datebox_mold_rounded.png"
title="datebox_mold_rounded.png" alt="datebox_mold_rounded.png" />
</p></td>
</tr>
</tbody>
</table>

# Supported Children

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

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date         | Content                                                                                                                                                                                                                                                       |
|---------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.3   | July, 2010   | An application can control the first day of the week by use of the session attribute and the library property. Please refer to [The First Day of the Week](ZK_Developer%27s_Reference/Internationalization/The_First_Day_of_the_Week) for details. |
| 5.0.4   | August, 2010 | Calendar supports moving to next/prev mon by mouse scrolling.                                                                                                                                                                                                 |
| 5.0.7   | April, 2011  | <javadoc method="setFormat(java.lang.String)">org.zkoss.zul.Datebox</javadoc> supported the styling.                                                                                                                                                          |
| 5.0.7   | April, 2011  | <javadoc method="setLocale(java.util.Locale)">org.zkoss.zul.Datebox</javadoc> was introduced.                                                                                                                                                                 |
| 6.5.0   | June, 2012   | [ZK-1175](https://tracker.zkoss.org/browse/ZK-1175): Calendar support show week number                                                                                                                                                                        |
| 9.5.1   | October 2020 | [ZK-3289](https://tracker.zkoss.org/browse/ZK-3289): Monthly / yearly options for datebox.                                                                                                                                                                    |
