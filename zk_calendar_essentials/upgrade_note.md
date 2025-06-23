This section describes those things to be noticed when upgrade zk
calendars among versions.

# 3.2.0

## [ZKCAL-94 Normalize item headers display](https://tracker.zkoss.org/browse/ZKCAL-94)

* **Consistent Header Display**: In month mold, the new version displays the start time on both single-day and multi-day items, providing a uniform experience across all calendar items. 
  * Previously, only single-day items showed start time in the header, while multi-day items didn't.
* **Display a CalendarItem's Title**: Display a CalendarItem's title instead of its description (previous version). The design aligns to Google Calendar, which is familiar to most end-users.
* **Easy to customize Calendar item's Display**: Each item now is rendered based on a javascript template and a header function renders a header. So app devs can override them to customize display more easily than the previous version. This allows for flexibility in user preferences regarding the calendar's appearance.
* **Revert to Old Display**: For those who prefer the previous display format from version 3.1.2, [https://github.com/zkoss/zkcalendar/blob/master/essentials/src/main/webapp/revertItemDisplay312.js a JavaScript code snippet is provided] to revert the changes, allowing users to customize their experience according to their preferences.

# 3.0.0

When upgrading from ZK Calendar version 2.1 to 3.0, please be aware of
significant breaking changes regarding the naming conventions of certain
classes, APIs, and event listeners.

## Breaking Changes: Renaming of Event Classes and Event Listeners

1.  Renamed Classes: 
    * `CalendarEvent` is now renamed to `CalendarItem`

    * `SimpleCalendarEvent` is now renamed to `SimpleCalendarItem`
2.  Updated Event Listener Names:
    The event listener names have also been updated to reflect the new
    terminology. For example: `onEventCreate` is now renamed to
    `onItemCreate`. Other event listener names that included "Event"
    have similarly been updated to use "Item."

### Reasons for Change
The previous naming convention led to ambiguity, particularly with the
frequent use of the term "event" within the ZK framework. This change
aims to provide clearer distinctions between different functionalities,
making it easier for developers to understand the context of each class
and listener.
