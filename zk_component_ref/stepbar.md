---
title: "Stepbar"
---


- [Demonstration](https://www.zkoss.org/zkdemo/menu/stepbar)
- Java API: [org.zkoss.zkmax.zul.Stepbar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Stepbar.html)
- JavaScript API: [zkmax.wgt.Stepbar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.wgt.Stepbar.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version="9.0.0" %}

# Employment/Purpose

Stepbar is a navigation component suitable for displaying the progress
of a multi-step task.

# Example

![](/zk_component_ref/images/stepbar-example.jpg)

```xml
<zk>
    <stepbar activeIndex="1" width="600px">
        <step title="First Step" />
        <step title="Second Step" />
        <step title="Third Step"/>
    </stepbar>
</zk>
```

# Supported Browsers

It is compatible with browsers that fully support CSS flexbox, like IE
11, Edge, Firefox, Opera, Chrome, and Safari.

IE10 is not supported as it only partially supports flexbox. [Check flexbox browser support](https://caniuse.com/flexbox).

# Properties

## ActiveIndex

The index of the active step. (Default: 0)

## ActiveStep

The active step object. (Default: first step)

## Linear

Set whether the steps in this stepbar are displayed in order.

Non-linear means users can toggle the active steps easily by clicking on
any step even if the step is not the next one in the sequence. In linear
mode, they can only activate in order.

![](/zk_component_ref/images/Stepbar-linear.gif)

## Model

The step model associated with this stepbar. (Learn [ Model-Driven Rendering]({{site.baseurl}}/zk_dev_ref/mvc/model#Model-Driven_Rendering))

You can use [org.zkoss.zkmax.zul.DefaultStepModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/DefaultStepModel.html),
wrap an existing [org.zkoss.zul.ListModelList](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModelList.html) by
DefaultStepModel's constructor, or implement
[StepModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/StepModel.html).

## StepRenderer

The renderer used to render each step.(Learn [ Model-Driven Rendering]({{site.baseurl}}/zk_dev_ref/mvc/model#Model-Driven_Rendering))

You can specify your own
[org.zkoss.zkmax.zul.StepRenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/StepRenderer.html) at this attribute to
renders a Step object with your data.

## WrappedLabels

Set whether the labels in children steps are wrapped. (Default: false)

true: ![](/zk_component_ref/images/Stepber-WrappedLabels.png)

false: ![](/zk_component_ref/images/Stepbar-example.png)

# Supported Events

| Name | Event Type |
|---|---|
| `onChange` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)
Represents an event caused by a user's selection changed at the
client. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Step`]({{site.baseurl}}/zk_component_ref/step)



# Version History



| Version | Date           | Content                                                                          |
|---------|----------------|----------------------------------------------------------------------------------|
| 9.0.0   | November, 2019 | [ZK-4375](https://tracker.zkoss.org/browse/ZK-4375): Provide a stepbar component |


