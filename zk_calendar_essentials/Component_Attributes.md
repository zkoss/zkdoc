

# The Calendar Component

- [Demo](https://www.zkoss.org/zkdemo/zk_calendar/zk_calendar)
- [javadoc](https://www.zkoss.org/javadoc/latest/zkcal/)

ZK Calendar is a single ZK component. Developers can put it within any
ZK container component, such as <window/>, <tabbox/>, or <groupbox/>,
etc.

For example:

``` xml
<window title="Bare ZK Calendar" border="normal">
    <calendars />
</window>
```

If you don't specify an attribute on <calendars/>, Calendars will just
run with the default values.

## Only Toolbar Allowed

Only a [
toolbar](ZK%20Component%20Reference/Essential%20Components/Toolbar)
is allowed as its child:

``` XML
    <calendars>
        <toolbar>...</toolbar>
    </calendars>
```

# Component Attributes

Developers can customize the calendars component by its attributes in a
zul.

## days

Default: `7`

Sets the days displayed in the default mold, that is, how many columns
will be displayed.

## dateFormatter

Sets the date formatter. In fact, there are 5 places in the calendar
must have different date display. See
[ZK_Calendar_Essentials/Customization](ZK_Calendar_Essentials/Customization).

## readonly

Default: `false`

If it's true, an end-user cannot create, edit, or move an item on the
Calendars.

## firstDayOfWeek

Default: `Sunday`

Determine the first day of a week to be displayed on the calendar.

## model

Specify a model to add or remove items in a calendar. See
[ZK_Calendar_Essentials/CRUD_Calendar_Items](ZK_Calendar_Essentials/CRUD_Calendar_Items)

## mold

Supported values:

- `default`: displays date/time of one week in a grid style. The column
  headers are "days" and row headers are "time".
- `month`: displays the days in a month.

### The Default Mold

In the default mold, the content of the calendar is separated into two
parts. The main component area is where date time events are displayed
and the top of the Calendar component is used to display the daylong
event.

<figure>
<img src="images/ZKCalEss_Default_mold.jpg
title="ZKCalEss_Default_mold.jpg" />
<figcaption>ZKCalEss_Default_mold.jpg</figcaption>
</figure>

### The Month Mold

In the month mold, the content of each day has no background color, the
text is colored and the item over one day has a background color with
white text. When using the month mold, each row represents one week.

![](images/ZKCalEss_Month_mold.jpg)

By just changing one attribute ZK affords us exceptional power. But how
do we change this attribute? The next section explains how.

## timeZone

Default: `java.util.TimeZone.getDefault()`

The Calendar can display 1 or multiple time zones according to what you
specify below. Then the first time zone you specify will be the
Calendar's default time zone.

``` xml
<calendars timeZone="Finland=GMT+2, Taiwan=GMT+8"/>
```

![](images/zkcal-timeZone.png)

## width , height

Set the size of the component, for example:

``` xml
<calendars width="400px" height="600px"/>
```

## beginTime

Default: 0

Supported Value: an integer between 0 - 23

Sets the beginning hour of a day.

``` xml
<calendars beginTime="8"/>
```

![](images/zkcal-beginTime.png)

## weekOfYear

default: `false`

Determine whether to show the week number of one year.

![](images/WeekOfyear.jpg)

# Add Application Logic

If you want to add, remove, or show items on a Calendars, please read [
Implementing Event
Listeners](ZK_Calendar_Essentials/Implementing_Event_Listeners).
