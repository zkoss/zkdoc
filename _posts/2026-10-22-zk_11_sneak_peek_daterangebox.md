---
author: jameschu
date: 2026-10-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Easier Date-Range Selection with Daterangebox"
---

**Select, validate, and bind a complete period as one value instead of coordinating two separate date inputs.**

## One Component for a Complete Period

Many applications ask for a start and end date: a report period, hotel stay, campaign window, or maintenance interval. Two Datebox components can collect those values, but the application must keep them ordered, synchronize their constraints, and decide when the range is complete.

ZK 11 introduces Daterangebox for this case. It displays and edits both endpoints as one control and commits them as one DateRange value.

![A hotel-stay Daterangebox with its two-month calendar popup open.](/assets/images/small-talk/zk11-sneak-peek/daterangebox_demo.png)

*The running ZK 11 demo shows one Daterangebox field opening a two-month calendar.*

## Create the Picker in One Tag

```xml
<daterangebox value="@bind(vm.stay)"
              numberOfMonths="2"
              minNights="1"
              maxNights="14"
              allowEmpty="none"
              showTodayLink="true"
              beginPlaceholder="Check-in"
              endPlaceholder="Check-out"/>
```

numberOfMonths can show adjacent months in the popup, which helps when a range crosses a month boundary. minNights and maxNights restrict the duration. allowEmpty controls whether the beginning, end, both, or neither endpoint may be empty.

## Express Business Rules in the View

Range rules can be declared together instead of split between two input controls. The following report filter rejects past dates, requires both endpoints, and limits the selected range to thirty days.

```xml
<daterangebox id="period"
              value="@bind(vm.period)"
              constraint="no past"
              minNights="0"
              maxNights="30"
              allowEmpty="none"/>
```

For an open-ended search, allowEmpty can permit only the beginning or only the end to be empty. showTime adds time selection when dates alone are not precise enough. Locale and time-zone settings control parsing and display in the same way as other ZK date inputs.

## Bind One Range or Separate Endpoints

value binds the complete range, which is usually the simplest MVVM model. Applications that already store separate properties can bind beginValue and endValue instead.

```java
private DateRange period;

public DateRange getPeriod() {
    return period;
}

public void setPeriod(DateRange period) {
    this.period = period;
}
```

ZK also provides range variants for LocalDate, LocalDateTime, and ZonedDateTime. Use the type that matches the business meaning of the value. A report over calendar dates usually does not need a time zone; an appointment range often does.

## Handle Range Events Directly

Daterangebox fires onChanging while the value is being edited and onChange when the range is committed. The listener receives Daterangebox.RangeChangeEvent, which exposes the complete range and each endpoint.

```java
@Listen("onChange = #period")
public void updateQuote(Daterangebox.RangeChangeEvent event) {
    DateRange range = event.getRange();
    Date begin = event.getBegin();
    Date end = event.getEnd();
    // Recalculate using the committed range.
}
```

This is a range-specific event rather than a normal InputEvent. In an MVVM screen, binding value and running a command is usually enough; the listener form is useful when a controller needs the endpoints immediately.

## Summary

This ZK 11 feature provides:

- One field and one value for a complete date range
- Built-in duration and empty-endpoint rules
- Multiple calendar panels and optional time selection
- Whole-range, endpoint, and Java Time binding options
- Range-specific onChanging and onChange events

## Try It in ZK 11 EE Freshly

Daterangebox is available in the latest ZK 11 EE FL (freshly) build. A report filter or reservation form that currently uses two Datebox components is a good place to evaluate it. Compare both the user interaction and the amount of synchronization code required in the ViewModel or controller.

## Resources

- [Daterangebox component reference](https://docs.zkoss.org/zk_component_ref/daterangebox)
- [Datebox component reference](https://docs.zkoss.org/zk_component_ref/datebox)
- [ZK GitHub repository](https://github.com/zkoss/zk)
- [ZK Forum](https://forum.zkoss.org/)

