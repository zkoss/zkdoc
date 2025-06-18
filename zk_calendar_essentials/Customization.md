# "More Items" Link

If there is not enough space to show events in one day, the Calendar
will show a "more items" link:

![](/zk_calendar_essentials/images/moreEventLink.png)

The default text is from a javascript object.

```javascript
msgcal.dayMORE = "+{0} more";
msgcal.monthMORE = "+{0} more";
```

To provide a different locale of text or override the text, you need to
create a javascript file and load it. For example,

**msgcal_zh.js**

```javascript
zk.afterLoad('calendar', function() {
    msgcal = {};
    msgcal.dayMORE = "+{0} 事件";
    msgcal.monthMORE = "+{0} 事件";
});//zk.afterLoad
```

Then load the script with [
land-addon.xml]({{site.baseurl}}/zk_dev_ref/internationalization/warning_and_error_messages#Defined_in_a_JS_File)

# Date Format in Captions

## Default

Calendar renders those captions in week date and time with js,
`zk.fmt.Date`.

You can change the date format in captions by your own implementation.
There are several ways:

## Extend `SimpleDateFormatter`

Extending the internal default implementation
<javadoc>org.zkoss.calendar.impl.SimpleDateFormatter</javadoc> allows
you to override part of captions.

## Implement `DateFormatter` interface

If you like to start from scratch, you can implement
<javadoc>org.zkoss.calendar.api.ZonedDateTimeFormatter</javadoc> or
<javadoc type="interface">org.zkoss.calendar.api.DateFormatter</javadoc>
interface which requires 5 methods to be implemented. These are as
follows:

| Method                  | Usage                                     |
|-------------------------|-------------------------------------------|
| getCaptionByDayOfWeek   | Returns the caption of the day of week.   |
| getCaptionByTimeOfDay   | Returns the caption of the time of day.   |
| getCaptionByDate        | Returns the caption of the date.          |
| getCaptionByDateOfMonth | Returns the caption of the date of month. |
| getCaptionByPopup       | Returns the caption of the popup title.   |

Each method enables us to customize the appearance of the calendar at
any opportunity. Implementing an interface such as this is excellent if
you require fine-grained control.

## Applying a Customized DateFormatter

To make use of a customized
<javadoc type="interface">org.zkoss.calendar.api.DateFormatter</javadoc>
implementation, there are 2 ways:

**By Java**

```java
calendar.setDateFormatter(new MyDateFormatter());
```

**By ZUL**

```xml
<calendars dateFormatter="org.zkoss.calendar.essentials.MyDateFormatter"/>
```
