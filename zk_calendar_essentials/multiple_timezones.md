In ZK Calendar the default time zone is the first timezone which was
added. If no time zone was entered then the system’s time zone is taken
as default (by `java.util.TimeZone.getDefault()`). All the dates in the
Calendar component use [UTC coordinated universal time](http://en.wikipedia.org/wiki/UTC). If you wish to show the date
and time with regard to your settings you need to use the function
<mp>getDefaultTimeZone()</mp> to retrieve the local time and use that to
format your date and time.

For example:

```java
SimpleDateFormat create_sdf = new SimpleDateFormat("HH:mm");
create_sdf.setTimeZone(calendars.getDefaultTimeZone());
                
Calendar cal = Calendar.getInstance(org.zkoss.util.Locales.getCurrent());
String[] times = create_sdf.format(evt.getBeginDate()).split(":");      
int hours = Integer.parseInt(times[0])*2;
int mins = Integer.parseInt(times[1]);
if (mins >= 30) hours++;
createEvent.getFellow("ppbt").setSelectedIndex(hours);
```

The above example is used to display the correct time of day in a
*Listbox*.
