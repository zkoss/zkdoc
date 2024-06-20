{% include ZKComponentReferencePageHeader %}

# Calendar

- Demonstration:
  [Calendar](http://www.zkoss.org/zkdemo/reporting/simple_calendar)
- Java API: <javadoc>org.zkoss.zul.Calendar</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.db.Calendar</javadoc>
- Style Guide: [
  Calendar](ZK_Style_Guide/XUL_Component_Specification/Calendar)

# Employment/Purpose

A calendar displays a 'flat' calendar and allows user to select a day
from it.

The first day of the week is decided by the locale (actually the return
value of the `getFirstDayOfWeek` method in the `java.util.Calendar`).

Since 5.0.3, you can control the first day of the week by the use of the
session attribute and the library property. Please refer to [The First
Day of the
Week](ZK_Developer%27s_Reference/Internationalization/The_First_Day_of_the_Week)
for details.

# Customization

Since 5.0.3, the rendering of the calendar can be customized at the
client by providing JavaScript code that overrides
<javadoc directory="jsdoc">zul.db.Renderer</javadoc>.

# Example

<figure>
<img src="ZKComRef_Calendar_Example.png"
title="ZKComRef_Calendar_Example.png" />
<figcaption>ZKComRef_Calendar_Example.png</figcaption>
</figure>

``` xml
     <calendar id="cal" onChange="in.value = cal.value"/>
     <datebox id="in" onChange="cal.value = in.value"/>
```

## Date Range Selector

![](dateRangeSelector.png)

Check
[calendar.zul](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/input/calendar.zul#L21)

# Calendar Day Renderer

This is achieved by overriding the default renderer at the client to
customize the appearance of days on ZK's Calendar. For example,

<figure>
<img src="ZKComRef_Calendar_Example2.png"
title="ZKComRef_Calendar_Example2.png" />
<figcaption>ZKComRef_Calendar_Example2.png</figcaption>
</figure>

``` xml
<zk>
    <script><![CDATA[
        zk.afterLoad('zul.db', function(){
            zul.db.Renderer.cellHTML = function (cal, y, m, day, monthofs) {
                return '<a href="javascript:;" style="color:red;">' + day + '</a>';
            };
        });
    ]]></script>
    <calendar/>
</zk>
```

{% include versionSince\| 5.0.3 %}

# Show Week Number

Calendar supports to show a week number of the year. {% include ZK EE %}
{% include versionSince\| 6.5.0 %}

<figure>
<img src="ZKComRef_Calendar_Week_Of_Year.PNG"
title="ZKComRef_Calendar_Week_Of_Year.PNG" />
<figcaption>ZKComRef_Calendar_Week_Of_Year.PNG</figcaption>
</figure>

``` xml
<calendar weekOfYear="true" />
```

# 2DigitYearStart

{% include versionSince\| 8.6.2 %}

You can control the 2DigitYearStart by the use of the library property.
Please refer to [
org.zkoss.web.preferred.2DigitYearStart](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.web.preferred.2DigitYearStart)
for details.

# Constraint

`{% include versionSince| 8.5.2 %}`

This component also supports `constraint` like [ZK Component
Reference/Input/Datebox#Constraint](ZK_Component_Reference/Input/Datebox#Constraint)

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
<td><p>onWeekClick</p></td>
<td><p>Denotes a user clicks upon a label of week of year. [ZK
EE]</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date         | Content                                                                                                                                                                                                                                                       |
|---------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.3   | June, 2010   | Calendar Day Renderer                                                                                                                                                                                                                                         |
| 5.0.3   | July, 2010   | An application can control the first day of the week by use of the session attribute and the library property. Please refer to [The First Day of the Week](ZK_Developer%27s_Reference/Internationalization/The_First_Day_of_the_Week) for details. |
| 5.0.4   | August, 2010 | Calendar supports moving to next/prev mon by mouse scrolling.                                                                                                                                                                                                 |
| 6.5.0   | June, 2012   | [ZK-1175](http://tracker.zkoss.org/browse/ZK-1175): Calendar support show week number                                                                                                                                                                         |

{% include ZKComponentReferencePageFooter %}
