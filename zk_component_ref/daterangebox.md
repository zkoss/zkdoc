---
title: "Daterangebox"
---

- **Java API:** [org.zkoss.zkmax.zul.Daterangebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Daterangebox.html)
- **JavaScript API:** [zkmax.db.Daterangebox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.db.Daterangebox.html)

{% include edition-availability.html edition="ee" %}
{% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Daterangebox` lets a user enter or choose a begin and end date in one component. Its popup displays multiple calendar panels, making it suitable for travel dates, reporting periods, reservations, and date-range filters.

# Example

```xml
<daterangebox value="@bind(vm.period)"
              format="yyyy/MM/dd"
              numberOfMonths="2"
              minNights="1"
              maxNights="30"
              placeholder="Select a date range"/>
```

The `value` is an [org.zkoss.zul.DateRange](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/DateRange.html), whose begin and end values are inclusive.

# Working with Values

Use `value` to read or replace both endpoints atomically. You can also bind `beginValue` and `endValue` separately.

```java
DateRange range = daterangebox.getValue();
Date begin = range.getBegin();
Date end = range.getEnd();

daterangebox.setValue(DateRange.of(begin, end));
```

Java Time variants are available for `LocalDate`, `LocalDateTime`, and `ZonedDateTime`. For example, use `getValueInLocalDate()` and `setValueInLocalDate(LocalDateRange)` when the application works with calendar dates rather than `java.util.Date`.

# Properties

## Format, Locale, and TimeZone

`format` applies the same `SimpleDateFormat` pattern to both inputs. Without an explicit pattern, the component uses a locale-sensitive medium date format. `locale` and `timeZone` control parsing and display.

When `showTime="true"`, the popup includes time selection. If the format has no time field, the effective format adds `HH:mm`.

## NumberOfMonths

**Default Value:** `2`

Sets the number of side-by-side calendar panels. It accepts `1` through the configured maximum, which defaults to `12`.

## AllowEmpty

**Default Value:** `both`

Controls which endpoint may be empty:

| Value | Meaning |
|---|---|
| `none` | Both endpoints are required. |
| `begin` | Only the begin endpoint may be empty. |
| `end` | Only the end endpoint may be empty. |
| `both` | Either endpoint may be empty. |

## MinNights and MaxNights

Both values default to `0`. `minNights` sets the minimum calendar-day difference; `maxNights` sets the maximum. A zero maximum means unlimited.

```xml
<daterangebox minNights="2" maxNights="14"/>
```

## Constraint

The component applies a `SimpleDateConstraint` to both endpoints. Rules such as `no past`, `no future`, `before`, `after`, and `between` work as they do for Datebox.

## Popup and Input Options

| Property | Default | Description |
|---|---:|---|
| `position` | `after_start` | Popup position relative to the input. |
| `buttonVisible` | `true` | Shows the calendar button. |
| `weekOfYear` | `false` | Shows week numbers. |
| `showTodayLink` | `false` | Shows a localized Today shortcut. |
| `open` | `false` | Opens or closes the popup programmatically. |
| `hoverPreview` | `true` | Previews a range while choosing its end. |
| `readonly` | `false` | Prevents editing and opening the popup. |
| `disabled` | `false` | Disables interaction. |
| `lenient` | `true` | Allows lenient parsing. |
| `strictDate` | `false` | Rejects impossible dates such as November 31. |

`separator` defaults to `~`. `placeholder` applies to both inputs; `beginPlaceholder` and `endPlaceholder` override it for one endpoint.

# Global Defaults

Set commonly used defaults with library properties:

```xml
<library-property>
    <name>org.zkoss.zul.daterangebox.numberOfMonths</name>
    <value>2</value>
</library-property>
<library-property>
    <name>org.zkoss.zul.daterangebox.numberOfMonths.max</name>
    <value>12</value>
</library-property>
<library-property>
    <name>org.zkoss.zul.daterangebox.hoverPreview</name>
    <value>true</value>
</library-property>
<library-property>
    <name>org.zkoss.zul.daterangebox.separator</name>
    <value>~</value>
</library-property>
```

`numberOfMonths.max` cannot exceed the framework's safety ceiling of `24`.

# Supported Events

| Name | Event Type |
|---|---|
| `onChange` | **Event:** `Daterangebox.RangeChangeEvent` Fired after a committed change. Read `getRange()`, `getBegin()`, or `getEnd()`. |
| `onChanging` | **Event:** `Daterangebox.RangeChangeEvent` Fired while the user changes the range. |
| `onOpen` | **Event:** [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) Fired when the popup opens or closes. |
| `onError` | **Event:** [org.zkoss.zk.ui.event.ErrorEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ErrorEvent.html) Fired for invalid input. |

`RangeChangeEvent` is not an `InputEvent`; do not read `event.value`. MVVM binding continues to work through `value`, `beginValue`, and `endValue`.

# Supported Children

`*ALL`
