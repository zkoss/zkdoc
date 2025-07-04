

# Event Listener

ZK supports to add an event listener on zul or in Java, please refer to
[ZK Developer's Reference/Event Handling/Event Listening]({{site.baseurl}}/zk_dev_ref/event_handling/event_listening).

# Supported Events

The ZK Calendar will fire events below:

## [CalendarsEvent.ON_ITEM_CREATE](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_ITEM_CREATE)

This event is triggered when a user clicks an empty cell in the time
cell.

![ center](images/onitemcreate.gif) Event name in 2.1:
[ON_EVENT_CREATE (onEventCreate)](https://www.zkoss.org/javadoc/zkcal/2.1.5/org/zkoss/calendar/event/CalendarsEvent.html#ON_EVENT_CREATE)

## [CalendarsEvent.ON_ITEM_EDIT](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_ITEM_EDIT)

This event is triggered when a user clicks on an existing calendar item.

![](/zk_calendar_essentials/images/onitemedit.gif) Event name in 2.1:
[ON_EVENT_EDIT(onEventEdit)](https://www.zkoss.org/javadoc/zkcal/2.1.5/org/zkoss/calendar/event/CalendarsEvent.html#ON_EVENT_EDIT)

## [CalendarsEvent.ON_ITEM_UPDATE](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_ITEM_UPDATE)

This event is triggered when a user drags to change a calendar item's
time span or drags to move the item to a different date.

![](/zk_calendar_essentials/images/onitemupdate.gif)

![](/zk_calendar_essentials/images/onitemupdate2.gif)

Event name in 2.1:
[`ON_EVENT_UPDATE(onEventUpdate)`](https://www.zkoss.org/javadoc/zkcal/2.1.5/org/zkoss/calendar/event/CalendarsEvent.html#ON_EVENT_UPDATE)

## [CalendarsEvent.ON_ITEM_TOOLTIP](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_ITEM_TOOLTIP)

It's fired when you hover a mouse on a calendar item. Listen to this
event to show a tooltip for an item.

![](/zk_calendar_essentials/images/onitemtooltip.jpg)

```java
    @Listen(CalendarsEvent.ON_ITEM_TOOLTIP +"= calendars")
    public void showTooltip(CalendarsEvent event) {
        tooltipText.setValue(event.getCalendarItem().getTitle() + "-" + event.getCalendarItem().getContent());
    }
```

## [CalendarsEvent.ON_WEEK_CLICK](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_WEEK_CLICK)

Calendars fires this event when you click the week number of the year on
the left-hand side when you set [ weekOfYear="true"]({{site.baseurl}}/zk_calendar_essentials/component_attributes#weekOfYear).

![](/zk_calendar_essentials/images/OnWeekClick.gif)

An Event object is passed to your event listener.

## [CalendarsEvent.ON_DAY_CLICK](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html#ON_DAY_CLICK)

Calendars fires this event when you click when a user clicks on the date
texts (TUE 10/3) on the top of the component.

![](/zk_calendar_essentials/images/OnDayClick.gif)

It passes an [Event object](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html),
not CalendarsEvent, to your event listener, and you can get the clicked
date:

```java
public class EventComposer extends SelectorComposer<Component> {
...
    @Listen(CalendarsEvent.ON_DAY_CLICK + "=calendars")
    public void handleDayClick(Event event){
        Date clickedDate = (Date) event.getData();
    }
```

# CalendarsEvent

ZK will call your event listener method with an
[org.zkoss.calendar.event.CalendarsEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/calendar/event/CalendarsEvent.html) as a
parameter when one of the `ON_ITEM_*` events is triggered. So you should
declare your method signature like:

```java
    @Listen(CalendarsEvent.ON_ITEM_CREATE + " = #calendars")
    public void showCreationBox(CalendarsEvent event) {...}
```

Then you can call `getBeginDate(), getEndDate(),`or `getCalendarItem()`
to implement your application logic. Please refer to
[javadoc](http://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/event/CalendarsEvent.html)
for complete methods and their details.
