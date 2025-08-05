---
title: "Presenting Event Data"
---

Having constructed a memory model we can now go ahead and adjust this
code to work in a functional ZK Calendar application. The code below is
a fully working readonly calendar which creates random events when the
button is clicked. This gives a full example using a memory model with
ZK Calendar.

```java
<?xml version="1.0" encoding="UTF-8"?>
<zk xmlns="http://www.zkoss.org/2005/zul">
    <window height="100%" >
        <zscript>
            <![CDATA[
                SimpleCalendarModel scm = new SimpleCalendarModel();
 
                public void addToModel(CalendarEvent ce) {
                    scm.add(ce);
                }
 
                public CalendarEvent createRandomEvent() {
                    SimpleCalendarEvent sce = new SimpleCalendarEvent();
                    Random generator = new Random();
                     
                    long timeNow = System.currentTimeMillis();
                    long roundedTime = timeNow - (timeNow % 1000);
 
                    java.util.Calendar cal = java.util.Calendar.getInstance();
 
                    cal.setTimeInMillis(roundedTime);
                    cal.add(java.util.Calendar.HOUR, -(generator.nextInt(3) + 2));
                    sce.setBeginDate(cal.getTime());
                    System.out.println(cal.getTime());
 
                    cal.setTimeInMillis(roundedTime);
                    cal.add(java.util.Calendar.HOUR, generator.nextInt(3) + 1);
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
 
                    calendar.setModel(scm);
                }
            ]]>
        </zscript>
    <calendars id="calendar" height="80%" firstDayOfWeek="Sunday"
                   timeZone="California=PDT-8" mold="default" readonly="true" />
        <button id="createData" label="Create Data" onClick="createData()" />
    </window>
</zk>
```

The above code's output is shown below.

![](/zk_calendar_essentials/images/ZKCalEss_MemoryModelResult.png)
