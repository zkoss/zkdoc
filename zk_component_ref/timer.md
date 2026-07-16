---
title: "Timer"
description: "Timer is a special component that is invisible. It fires one or more org.zkoss.zk.ui.event.Event after a specified delay, notice that the timer won't fire…"
---

- **Demonstration:** [Timer](http://www.zkoss.org/zkdemo/userguide/#u3)
- **Java API:** [org.zkoss.zul.Timer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timer.html)
- **JavaScript API:** [zul.utl.Timer](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.utl.Timer.html)

# Employment/Purpose

Timer is a special component that is invisible. It fires one or more
org.zkoss.zk.ui.event.Event after a specified delay, notice that the
timer won't fire any event until it is attached to a page.

# Example

```xml
<label id="now" />
<timer id="timer" delay="1000" repeats="true"
    onTimer="now.setValue(new Date().toString())" />
```

# Properties

## Delay

**Default Value:** `0`

Sets the number of milliseconds between successive `onTimer` events. If a negative value is supplied, `0` is used instead (fires immediately). Combine with `repeats="true"` to create a recurring interval.

```xml
<timer delay="1000" repeats="true"
    onTimer="label.setValue(new Date().toString())" />
```

## Repeats

**Default Value:** `false`

Controls whether the timer fires `onTimer` continuously at each `delay` interval (`true`), or fires only once and then stops (`false`). When `false`, the timer automatically stops after the first firing.

```xml
<!-- Fire once after 2 seconds -->
<timer delay="2000" repeats="false" onTimer="doSomething()" />

<!-- Fire every 500 ms indefinitely -->
<timer delay="500" repeats="true" onTimer="pollStatus()" />
```

## Running

**Default Value:** `true`

Starts or stops the timer. Setting `running="false"` stops the timer without removing it from the page; setting it back to `true` restarts it. Note that a single-shot timer (`repeats="false"`) automatically sets itself to not-running after it fires.

```xml
<!-- Start a paused timer that the user activates via a button -->
<timer id="poller" delay="3000" repeats="true" running="false"
    onTimer="refreshData()" />
<button label="Start" onClick="poller.setRunning(true)" />
<button label="Stop"  onClick="poller.setRunning(false)" />
```

## Common Use Cases

### Auto-refresh a label every second

```xml
<label id="clock" />
<timer delay="1000" repeats="true"
    onTimer="clock.setValue(new java.util.Date().toString())" />
```

### Run a one-shot delayed action

```xml
<timer delay="3000" repeats="false"
    onTimer="Clients.evalJavaScript(&quot;alert('3 seconds elapsed')&quot;)" />
```

### Start and stop a polling timer from a button

```xml
<timer id="poller" delay="5000" repeats="true" running="false"
    onTimer="syncData()" />
<button label="Start polling" onClick="poller.setRunning(true)" />
<button label="Stop polling"  onClick="poller.setRunning(false)" />
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onTimer` | [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes the timer you specified has triggered an event. To know which timer, invoke the `getTarget` method in the Event class. |

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`
