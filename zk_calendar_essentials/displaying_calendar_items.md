# Component in MVC Pattern

In the component perspective, Calendars is designed in MVC pattern:

- [`Calendars`](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/Calendars.html)
  (Controller): call `ContentRenderer` to render a calendar to the
  client-side, dispatch UI events to the corresponding event listeners,
  receives events from `CalendarModel` then render a calendar upon
  changed
  [`CalendarItem`](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/api/CalendarItem.html)
- [`CalendarModel`](http://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/impl/SimpleCalendarModel.html)
  (Model): stores `CalendarItem`
- `ContentRenderer` (View): renders a calender-related data to the
  client-side upon `CalendarModel`

Based on the above architecture, if you want to show some items on a
Calendar, you need to create some `CalendarItem` objects, put them into
a `CalendarModel`, and assign the model to `Calendars`. The default
implementation,
[`DefaultCalendarItem`](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/impl/DefaultCalendarItem.html)
and
[`SimpleCalendarModel`](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/impl/SimpleCalendarModel.html),
are sufficient for most requirements.

# Create a CalendarItem

Starting from version 3.0.0, we have renamed the `CalendarEvent` class
to `CalendarItem`. This change was made to reduce potential confusion
between events on the calendar and events fired by the ZK framework."

You can simply create a `CalendarItem` with the default builder:

```java
 DefaultCalendarItem calendarItem = new DefaultCalendarItem.Builder()
                .withTitle("my title")
                .withContent("my content")
                .withBegin(LocalDateTime.now().truncatedTo(ChronoUnit.HOURS))
                .withEnd(LocalDateTime.now().truncatedTo(ChronoUnit.HOURS).plusHours(2))
                .withZoneId(calendars.getDefaultTimeZone().toZoneId())
                .build();
```

If you don't specify the title, it displays **\[begin time - end
time\]** at an item's header: ![](/zk_calendar_essentials/images/Calendar-item.png)

If an item is shorter than half an hour, it appends the content in the
header:

![](/zk_calendar_essentials/images/Calendar-item-halfhour.png)

# Create a CalendarModel

You can instantiate a `SimpleCalendarModel` with a collection of
`DefaultCalendarItem` or add a `DefaultCalendarItem` after
instantiation.

```java
private SimpleCalendarModel model;
...
    model = new SimpleCalendarModel(CalendarItemGenerator.generateList());
    DefaultCalendarItem calendarItem = new DefaultCalendarItem("my title",
                "my content",
                null,
                null,
                false,
                LocalDateTime.now().truncatedTo(ChronoUnit.HOURS),
                LocalDateTime.now().truncatedTo(ChronoUnit.HOURS).plusHours(2)
    model.add(calendarItem);
```

# Assign the Model to Calendars

After creating a `SimpleCalendarModel`, we need to associate a component
with the model, so that Calendar will render items to a browser.

```java
public class DisplayComposer extends SelectorComposer {

    @Wire("calendars")
    private Calendars calendars;
    private SimpleCalendarModel model;

    @Override
    public void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
        initModel();
        calendars.setModel(model);
    }
```

# Display a Tooltip

To show a tooltip when an end-user hover this mouse on an calendar item,
you need to:

1.  create a popup
2.  link the popup with your calendars with [ tooltip]({{site.baseurl}}/zk_dev_ref/ui_patterns/tooltips,_context_menus_and_popups#Tooltips)
    attribute.
3.  implement the logic to show a tooltip in an [ onItemTooltip listener]({{site.baseurl}}/zk_calendar_essentials/implementing_event_listeners#CalendarsEvent.ON_ITEM_TOOLTIP).

```xml
    <calendars height="100%"  beginTime="8"
     apply="org.zkoss.calendar.essentials.DisplayTooltipComposer"
     tooltip="tooltipPopup, position=after_pointer"/>
    <popup id="tooltipPopup">
        <label id="tooltipText"/>
    </popup>
```

# Customizing Calendar Item Appearance

From calendar 3.1.0 and onward,
[SimpleCalendarItem](https://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/impl/SimpleCalendarItem.html)
supports sclass, style, contentStyle and headerStyle attributes.

the sclass attribute will add a CSS class on the top DOM node of the
calendar item, which allow the whole element to be used in a css
selector.

```java
    calendarItem.setSclass("myClass");
```

```css
    .myClass{ //selector for the whole node
        //my-css-property: myValue;
    }
    .myClass .z-calitem-body{ //selector for a sub-node
        //my-css-property: myValue;
    }
```

This is a good way to assign styles to categories of items.

If you need to assign styles to individual items, you can use the style,
contentStyle and headerStyle properties instead: ![Areas targeted by each style attributes](images/calendar_style_targets.png)

```java
    calendarItem.setStyle("background-color: #0093f9"); //affects the whole item
    calendarItem.setHeaderStyle("background-color: red; color: white;"); //affects the header node, may override setStyle for this node
    calendarItem.setContentStyle("background-color: rgb(255, 255, 0); color: white;"); //affects the content node, may override setStyle for this node
```

`before 3.1.0`

Before calendar 3.1.0, only the background color can be customized for
the calendar item's main Node with the contentColor attribute, and the
header's node with the headerColor attribute. These are deprecated after
3.1.0, and should be replaced by style attributes.
