This section describes those things to be noticed when upgrade zk
calendars among versions.

# 3.2.0

- [ZKCAL-94 Normalize item headers
  display](https://tracker.zkoss.org/browse/ZKCAL-94)

**Reasons for Implementation:**

1.  **Inconsistency in Display**: Previously, the start time header was
    only visible for single-day items, while multi-day items did not
    display this header. This inconsistency could confuse users trying
    to manage their schedules effectively.
2.  **User Experience Improvement**: By allowing users to choose whether
    to display the start time header for all item types, the upgrade
    aims to enhance the overall usability of the calendar. This change
    aligns the display format with user expectations and improves
    clarity.
3.  **Alignment with Google Calendar**: The solution was designed to
    mirror the display format of Google Calendar, which is familiar to
    many users. This alignment helps users transition smoothly between
    different calendar applications.

**Results:**

1.  **Consistent Header Display**: The implementation allows for the
    start time header to be displayed for multi-day items, providing a
    uniform experience across all calendar entries.
2.  **Improved Usability**: Users can now easily scan their calendars
    without confusion regarding the visibility of time headers, leading
    to better time management.
3.  **Flexibility for Users**: For those who prefer the previous display
    format from version 3.1.2, a JavaScript code snippet is provided to
    revert the changes, allowing users to customize their experience
    according to their preferences.

**Reverting Changes:**

For users who prefer the previous display format from version 3.1.2, [a
JavaScript code is
available](https://github.com/zkoss/zkcalendar/blob/master/essentials/src/main/webapp/revertItemDisplay312.js)
to revert the changes. This allows for flexibility in user preferences
regarding the calendar's appearance.

# 3.0.0

When upgrading from ZK Calendar version 2.1 to 3.0, please be aware of
significant breaking changes regarding the naming conventions of certain
classes, APIs, and event listeners.

## Reasons for Change

The previous naming convention led to ambiguity, particularly with the
frequent use of the term "event" within the ZK framework. This change
aims to provide clearer distinctions between different functionalities,
making it easier for developers to understand the context of each class
and listener.

**Breaking Changes: Renaming of Event Classes and Event Listeners**

1.  Renamed Classes:
      
    `CalendarEvent` is now renamed to `CalendarItem`

    `SimpleCalendarEvent` is now renamed to `SimpleCalendarItem`
2.  Updated Event Listener Names:
      
    The event listener names have also been updated to reflect the new
    terminology. For example: `onEventCreate` is now renamed to
    `onItemCreate`. Other event listener names that included "Event"
    have similarly been updated to use "Item."
