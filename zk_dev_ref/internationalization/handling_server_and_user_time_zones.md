

# Overview

Time is a complicated concept in a web application that serves users
across multiple time zones, and especially when serving users in a
different time zone than the server itself.

# Time and frame of reference

One important point to define when referring to a position in time is
"to which point of reference is this time relative?".

In a face-to-face conversation, you could say "I'll see you tomorrow at
10 o'clock in the morning". Since you are both in the same time zone,
the assumption would be that you are referring to time relative to your
local time zone.

However, if you are calling a person a few time zones away from you, you
would need to make the distinction clear. "I'll call you tomorrow at 10
o'clock *my time*", "I'll call you at 10 o'clock *your time*" or even
I'll call you at 10 o'clock GMT+0" are usable sentences since they point
to a frame of reference for time.

Be sure you know how ZK determines its server time zone by reading
[Internationalization/Time
Zone](ZK_Developer's_Reference/Internationalization/Time_Zone).

# Use of server's time zone

When a client-side date or time value is sent to the ZK server, it is
sent as a "moment in global time", which is then automatically converted
to the server's local time zone. For example, if a user selected Jan 1st
2022, with a time of 08:00 at GMT+4, the server will receive the
matching point in time in its own time zone. If the server is on GMT+0
time zone, for example, it will receive Jan 1st 2022, with a time of
04:00 at GMT+0

<figure>
<img src="images/Universal_time_conversion.png
title="Universal_time_conversion.png" />
<figcaption>Universal_time_conversion.png</figcaption>
</figure>

In this case, the displayed times of "GMT+0 00:00", "GMT+4 04:00" and
"GMT+8 08:00" all represent the same point in time. They all convert to
the same "GMT+0 00:00".

This is necessary if multiple users located in multiple time zones are
interacting on the same timeline. For a chat tool, you need to display
the time of each message relative to their position on the global shared
timeline. Even if that value is converted back to a localized time in
the user time zone for display, these timestamps should exist in the
same frame of reference from the server's point of view.

# Use of client's time zone

Conversely, you may need to use a ZK component that provides a Date and
time selection to retrieve a point in time in the user's own local time
zone. This could be done to fill a date on a form or to prefill a time
limit in a report. In these cases, the important information is the date
and time expressed relative to the end-user.

## Default time of the day selection in ZK Datebox

The [ Datebox](ZK%20Component%20Reference/Input/Datebox) has
the ability to provide date selection with or without time-of-day.

Depending on how the Datebox is set up, it can cater to a number of use
cases.

This table shows which position in time-of-day (Hours, minutes, seconds)
will be sent to the server as part of the Date selection.

``` java
//does not contain time information
userInputDatebox.setFormat("yyyy-MM-dd");
//contains time information
userInputDatebox.setFormat("yyyy-MM-dd HH:mm:ss");

//time information was set by server as the time of day and timezone of the date object passed to the component
java.util.Date existingDateObject = ...;
userInputDatebox.setValue(existingDateObject);

//time information was not set by the server
userInputDatebox.setValue(null); //default if nothing else was set as value.
```

These choices combine as follow:

|                             | Date set on component by the server                                                  | Datebox empty before user selection                                                |
|-----------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Format contains time        | Send a date at the selected time of day in the user's time zone, on the selected day | Send a date at the current time of day in the user's time zone on the selected day |
| Format doesn't contain time | Send a date at the time of day of the server's initial date, on the selected day     | Send a date at midnight in the user's time zone on the selected day                |

## Common issue with client time

Based on the table in the previous section, some Date parsing issues may
occur if the Datebox was empty before the user's selection. Since an
empty Datebox will send back a point in time at midnight in the user's
time zone if the user's time zone and the server's time zone are
different, the resulting moment in time at the server may be a match "in
universal time", but on another day than the selection done "in the
user's time zone" due to time zone differences.

A user in GMT-8 may have selected "GMT-8 January 31st at 23:00". If the
server time zone is set to GMT+0, the date will be converted to the
identical point in time in GMT+0, which is "GMT+0 February 1st at
07:00". If you are using this time to extract a "day of the week", you
will retrieve the value a day late.

Inversely, if a user on GMT+8 selects "GMT+8 February 1st at 00:00", the
server on GMT+0 will resolve this point in time to "GMT+0 January 31st
at 16:00" If you are using this time to extra a "day of the week", you
will retrieve a value a day early.

## Solutions for client time

There are two ways to resolve the difference between client time zone
and server time zone.

### Converting server time to client time

Sometimes, it is necessary to display a moment in time to the user. This
can be done by showing the full Date and Time information, including the
time zone, or by converting the moment in time into a "local display
string" matching the user's locale and time zone information.

ZK itself doesn't perform time calculations. As a Java framework, ZK
will delegate the task of manipulating time to the relevant Java APIs.

ZK can retrieve the client's locale and time zone information [from the
clientInfoEvent](ZK_Developer's_Reference/UI_Patterns/Browser_Information_and_Control).

A common option is to use Java DateFormat to parse and display time in a
locale-sensitive manner. For most use cases,
[SimpleDateFormat](https://docs.oracle.com/javase/10/docs/api/java/text/SimpleDateFormat.html)
is a good option to transform a date object formatted as server time
into the user's own time zone.

``` java
SimpleDateFormat userSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //creates a SimpleDateFormat formatter
userSimpleDateFormat.setTimeZone(TimeZone.getTimeZone(clientZoneId)); //Select the time zone in which the Date object should be displayed
String formattedTimeInUserTimezone = userSimpleDateFormat.format(userInputDatebox.getValue()); //retrieve and parse a Date object
```

The resulting string is a representation of the user selected point in
time, converted to server Date, and expressed back into the user's own
time zone.

### Retrieving a LocalDateTime object from user input

Starting in ZK 9, ZK Components extending
[DateTimeFormatInputElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/DateTimeFormatInputElement.html)
([Datebox](ZK_Component_Reference/Input/Datebox),
[Timebox](ZK_Component_Reference/Input/Timebox) and
[Timepicker](ZK_Component_Reference/Input/Timepicker))
provide the option to retrieve the user input value as:

- [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)
  with
  [DateTimeFormatInputElement#getValueInLocalDate](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/DateTimeFormatInputElement.html#getValueInLocalDate--)
- [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html)
  with
  [DateTimeFormatInputElement#getValueInLocalTime](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/DateTimeFormatInputElement.html#getValueInLocalTime--)
- [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)
  with
  [DateTimeFormatInputElement#getValueInLocalDateTime](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/DateTimeFormatInputElement.html#getValueInLocalDateTime--)
- [ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html)
  with
  [DateTimeFormatInputElement#getValueInZonedDateTime](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/DateTimeFormatInputElement.html#getValueInZonedDateTime--)

Important note: These values should not be considered reliable options
to compare two points in time. Of these 4 options, only ZonedDateTime
can be semi-reliably converted to a point in time in the server's frame
of reference for time. Even so, it would still be possible for errors to
happen due to changes in time zone settings, DST, historical changes in
time, etc.

These are colloquial expressions of a time in relation to the user's own
time exclusively.

They are a convenient way to retrieve a date expressed relative to the
user. Any operation that requires date and time conversion should use
the previous option and convert server time to client time instead.

# Runnable samples

A runnable time and date sample is available [in
github](https://github.com/zkoss/zkbooks/tree/master/developersreference).
[Main composer
class](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/java/org/zkoss/reference/developer/internationalization/DateboxTimezoneComposer.java)
and [display zul
page](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/internationalization/datebox-timezone.zul).
