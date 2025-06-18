The <javadoc>org.zkoss.calendar.impl.SimpleCalendarEvent</javadoc> is a
out-of-box, default implementation of the interface
<javadoc type="interface">org.zkoss.calendar.api.CalendarEvent</javadoc>
which we can use directly in ZK Calendar applications.

# How to use SimpleCalendarEvent

Using <javadoc>org.zkoss.calendar.impl.SimpleCalendarEvent</javadoc> is
a simple affair. The code below demonstrates how to construct an
instance and provide it with necessary data.

```java
SimpleCalendarEvent sce = new SimpleCalendarEvent();

sce.setBeginDate(new Date());
sce.setEndDate(new Date());

//The color Strings should only be colors
//that CSS accept
sce.setContentColor("red");
sce.setHeaderColor("red");

sce.setContent("This is the content of the event");
sce.setTitle("This is the title of the event");

//is this event locked?
sce.setLocked(false);
```

Most of the values described above are self-explanatory. However, we do
need to pay particularly close attention to <mp>setContentColor</mp> and
<mp>setHeaderColor</mp> which only accept String values which represent
valid CSS colors. These can be hex or named strings as both are accepted
by the CSS specification.

# The CalendarEvent interface

It is important when working with the calendar to effectively manage the
event data of the calendar. The event data is contained in a class which
implements
<javadoc type="interface">org.zkoss.calendar.api.CalendarEvent</javadoc>.

An implementing Object should provide the following functions:

| Method          | Usage                                                                                                  |
|-----------------|--------------------------------------------------------------------------------------------------------|
| getBeginDate    | Returns the beginning date of the calendar event.                                                      |
| getEndDate      | Returns the end date of the calendar event.(exclusive)                                                 |
| getTitle        | Returns the title of the calendar event.                                                               |
| getContent      | Returns the content of the calendar event.                                                             |
| getHeaderColor  | Returns the color of the header in the calendar event. Only allows the value being recognized by CSS.  |
| getContentColor | Returns the color of the content in the calendar event. Only allows the value being recognized by CSS. |
| getZclass       | Returns the zclass of the calendar event.                                                              |
| isLocked        | Returns whether the calendar event is locked or not.                                                   |

## A CalendarEvent implementation

The code snippet below details a basic class which would fulfill the
contract of the
<javadoc type="interface">org.zkoss.calendar.api.CalendarEvent</javadoc>
interface.

```java
import java.util.Date;
import org.zkoss.calendar.api.CalendarEvent;

/**
 * A non functional implementation of the CalendarEvent
 * 
 */
public class MyCalendarEvent implements CalendarEvent {

    public Date getBeginDate() {
        return new Date();
    }

    public Date getEndDate() {
        return new Date();
    }

    public String getTitle() {
        return "";
    }

    public String getContent() {
        return "";
    }

    public String getHeaderColor() {
        return "";
    }

    public String getContentColor() {
        return "";
    }

    public String getZclass() {
        return "";
    }

    public boolean isLocked() {
        return false;
    }

}
```

In a real implementation, the above class is useless as it does not
contain any meaningful data. We could expand on the class so it could
save state information. However, ZK Calendar already provides a class
named <javadoc>org.zkoss.calendar.impl.SimpleCalendarEvent</javadoc>
which provides the relevant functionality for you.
