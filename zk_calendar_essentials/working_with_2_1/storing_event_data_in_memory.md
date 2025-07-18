It is easy to store scheduled data in memory and can be done by using
the [org.zkoss.calendar.impl.SimpleCalendarModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/calendar/impl/SimpleCalendarModel.html). This
model provides functions to add and remove
[org.zkoss.calendar.api.CalendarEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/calendar/api/CalendarEvent.html)’s.

The following code demonstrates how to generate and store a few random
events in the
[org.zkoss.calendar.impl.SimpleCalendarModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/calendar/impl/SimpleCalendarModel.html).

```java
SimpleCalendarModel scm = new SimpleCalendarModel();

public void addToModel(CalendarEvent ce) {
    scm.add(ce);
}

public CalendarEvent createRandomEvent() {
    SimpleCalendarEvent sce = new SimpleCalendarEvent();
    Random generator = new Random();

    long timeNow = new Date().getTime();
    long roundedTime = timeNow - (timeNow % 1000);

    Calendar cal = Calendar.getInstance();

    cal.setTimeInMillis(roundedTime);
    cal.add(Calendar.HOUR, -(generator.nextInt(3) + 2));
    sce.setBeginDate(cal.getTime());
    System.out.println(cal.getTime());

    cal.setTimeInMillis(roundedTime);
    cal.add(Calendar.HOUR, generator.nextInt(3) + 1);
    sce.setEndDate(cal.getTime());
    System.out.println(cal.getTime());

    //The color Strings should only be colors
    //that CSS accept
    sce.setContentColor("red");
    sce.setHeaderColor("red");

    sce.setContent("This is the content of the event");
    sce.setTitle("This is the title of the event");

    //is this event locked?
    sce.setLocked(false);

    return sce;
}

public void createData() {
    scm = new SimpleCalendarModel();

    for(int i=0; i<3; i++) {
        CalendarEvent ce = createRandomEvent();
        addToModel(ce);
    }
}
```

This code can then be incorporated to function as the in memory model
for ZK Calendar. We discuss this in [ Presenting Event Data]({{site.baseurl}}/zk_calendar_essentials/working_with_2_1/presenting_event_data)
