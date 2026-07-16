---
title: "Stepbar"
description: "Stepbar is a navigation component suitable for displaying the progress of a multi-step task."
---

- **Demonstration:** [Stepbar](https://www.zkoss.org/zkdemo/menu/stepbar)
- **Java API:** [org.zkoss.zkmax.zul.Stepbar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Stepbar.html)
- **JavaScript API:** [zkmax.wgt.Stepbar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.wgt.Stepbar.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include supported-since.html version="9.0.0" %}

# Employment/Purpose

Stepbar is a navigation component suitable for displaying the progress of a multi-step task.

## Common Use Cases

**Wizard / multi-step form** — place a `<stepbar>` above a sequence of panels and bind `activeIndex` to the current step so the progress indicator stays in sync with the visible panel:

```xml
<zk>
    <stepbar id="bar" activeIndex="0" width="700px">
        <step title="Personal Info" />
        <step title="Account Setup" />
        <step title="Confirmation" />
    </stepbar>
    <button label="Next" onClick="bar.activeIndex = bar.activeIndex + 1" />
</zk>
```

**Vertical checkout flow** — use `orient="vertical"` when horizontal space is limited:

```xml
<stepbar orient="vertical" activeIndex="1" width="200px">
    <step title="Cart" />
    <step title="Shipping" />
    <step title="Payment" />
    <step title="Review" />
</stepbar>
```

**Model-driven steps** — populate steps from a `StepModel` when the step list is dynamic:

```xml
<zscript>
    import org.zkoss.zkmax.zul.DefaultStepModel;
    import org.zkoss.zul.ListModelList;
    ListModelList items = new ListModelList(java.util.Arrays.asList("Order", "Ship", "Deliver"));
    DefaultStepModel model = new DefaultStepModel(items);
</zscript>
<stepbar model="${model}" width="600px" />
```

# Example

![Stepbar example](/zk_component_ref/images/stepbar-example.jpg)

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

# Accessibility

{% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

## Keyboard Support

(Only available if <b>linear</b> is `false`)

| Key | Description |
|---|---|
| ArrowLeft / ArrowUp | Focus on the previous step. |
| ArrowRight/ ArrowDown | Focus on the next step. |
| Enter / Spacebar | Select the step. |

{% include ZKComponentReferenceAccessibilityNamingReference.md %}

# Properties

## ActiveIndex

The index of the active step. (Default: 0)

## ActiveStep

The active step object. (Default: first step)

## Linear

Set whether the steps in this stepbar are displayed in order.

Non-linear means users can toggle the active steps easily by clicking on any step even if the step is not the next one in the sequence. In linear mode, they can only activate in order.

![Stepbar linear](/zk_component_ref/images/Stepbar-linear.gif)

## Orient

**Default Value:** `horizontal`

Sets the orientation of the stepbar. Accepted values:

| Value | Meaning |
|---|---|
| `horizontal` | Steps flow left-to-right (default) |
| `vertical` | Steps stack top-to-bottom |

{% include supported-since.html version="10.2.0" %}

```xml
<stepbar orient="vertical" width="200px">
    <step title="First Step" />
    <step title="Second Step" />
    <step title="Third Step" />
</stepbar>
```

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

true: ![Stepber Wrapped Labels](/zk_component_ref/images/Stepber-WrappedLabels.png)

false: ![Stepbar example](/zk_component_ref/images/Stepbar-example.png)

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onChange` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Represents an event caused by a user's selection changed at the client. |

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[`Step`]({{site.baseurl}}/zk_component_ref/step)