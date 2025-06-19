

# Calendar

- Demonstration:
  [Calendar](http://www.zkoss.org/zkdemo/reporting/simple_calendar)
- Java API: <javadoc>org.zkoss.zul.Calendar</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.db.Calendar</javadoc>


# Employment/Purpose

A calendar displays a 'flat' calendar and allows user to select a day
from it.

The first day of the week is decided by the locale (actually the return
value of the `getFirstDayOfWeek` method in the `java.util.Calendar`).

Since 5.0.3, you can control the first day of the week by the use of the
session attribute and the library property. Please refer to [The First Day of the Week]({{site.baseurl}}/zk_dev_ref/internationalization/the_first_day_of_the_week)
for details.

# Customization

Since 5.0.3, the rendering of the calendar can be customized at the
client by providing JavaScript code that overrides
<javadoc directory="jsdoc">zul.db.Renderer</javadoc>.

# Example

![](/zk_component_ref/images/ZKComRef_Calendar_Example.png)

```xml
     <calendar id="cal" onChange="in.value = cal.value"/>
     <datebox id="in" onChange="cal.value = in.value"/>
```

## Date Range Selector

![](/zk_component_ref/images/dateRangeSelector.png)

Check
[calendar.zul](https://github.com/zkoss/zkbooks/blob/master/componentreference/src/main/webapp/input/calendar.zul#L21)

# Calendar Day Renderer

This is achieved by overriding the default renderer at the client to
customize the appearance of days on ZK's Calendar. For example,

![](/zk_component_ref/images/ZKComRef_Calendar_Example2.png)

```xml
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

{% include version-badge.html version=5.0.3 %}

# Show Week Number

Calendar supports to show a week number of the year. {% include edition-availability.html edition="pe" %}
{% include version-badge.html version=6.5.0 %}

![](/zk_component_ref/images/ZKComRef_Calendar_Week_Of_Year.PNG)

```xml
<calendar weekOfYear="true" />
```

# 2DigitYearStart

{% include version-badge.html version=8.6.2 %}

You can control the 2DigitYearStart by the use of the library property.
Please refer to [ org.zkoss.web.preferred.2DigitYearStart]({{site.baseurl}}/zk_config_ref/the_library_properties/org.zkoss.web.preferred.2digityearstart)
for details.

# Constraint

{% include version-badge.html version=8.5.2 %}

This component also supports `constraint` like [ZK Component Reference/Input/Datebox#Constraint]({{site.baseurl}}/zk_component_ref/input/datebox#Constraint)

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content                                                                                                                                                                                                                                                       |
|---------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.3   | June, 2010   | Calendar Day Renderer                                                                                                                                                                                                                                         |
| 5.0.3   | July, 2010   | An application can control the first day of the week by use of the session attribute and the library property. Please refer to [The First Day of the Week]({{site.baseurl}}/zk_dev_ref/internationalization/the_first_day_of_the_week) for details. |
| 5.0.4   | August, 2010 | Calendar supports moving to next/prev mon by mouse scrolling.                                                                                                                                                                                                 |
| 6.5.0   | June, 2012   | [ZK-1175](http://tracker.zkoss.org/browse/ZK-1175): Calendar support show week number                                                                                                                                                                         |


