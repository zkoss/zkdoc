---
title: "Progressmeter"
---

- **Demonstration:** [Progressmeter](http://www.zkoss.org/zkdemo/effects/upload_effect)
- **Java API:** [org.zkoss.zul.Progressmeter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Progressmeter.html)
- **JavaScript API:** [zul.wgt.Progressmeter](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Progressmeter.html)

# Employment/Purpose

A progress meter is a bar that indicates how much of a task has been
completed. The value property must be in the range between 0 and 100.

## Common Use Cases

**Determinate Progress** — Display real-time task completion when you can measure progress toward 100%. Bind the `value` property to a server-side integer and update it as the task advances.

**Indeterminate Progress** — Show activity without a measurable endpoint. Use indeterminate mode for long-running operations where the duration is unknown, such as file uploads or background synchronization.

# Example

![Progressmeter Example](/zk_component_ref/images/ZKComRef_Progressmeter_Example.PNG)

```xml
<progressmeter value="10"/>
```

# Properties

## Value

**Default Value:** `0`

Sets the current completion percentage of the progress bar. The value must be an integer in the range 0–100 (inclusive); values outside this range throw an exception at runtime.

```xml
<progressmeter value="60"/>
```

## Indeterminate

{% include supported-since.html version="8.6.1" %}

If true, the progressmeter will show an indeterminate animation and the real value of the progressmeter will be hidden. (default false)

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| Inherited | [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events) | Refer to the inherited component for supported events. |

# Supported Children

`*NONE`