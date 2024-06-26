

# Stepbar

- [Demonstration](https://www.zkoss.org/zkdemo/menu/stepbar)
- Java API: <javadoc>org.zkoss.zkmax.zul.Stepbar</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.wgt.Stepbar</javadoc>

{% include ZK EE %} {% include versionSince\| 9.0.0 %}

# Employment/Purpose

Stepbar is a navigation component suitable for displaying the progress
of a multi-step task.

# Example

![](stepbar-example.jpg)

``` xml
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

IE10 is not supported as it only partially supports flexbox. [Check
flexbox browser support](https://caniuse.com/flexbox).

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

![](Stepbar-linear.gif)

## Model

The step model associated with this stepbar. (Learn [ Model-Driven
Rendering](ZK_Developer%27s_Reference/MVC/Model#Model-Driven_Rendering))

You can use <javadoc>org.zkoss.zkmax.zul.DefaultStepModel</javadoc>,
wrap an existing <javadoc>org.zkoss.zul.ListModelList</javadoc> by
DefaultStepModel's constructor, or implement
[StepModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/StepModel.html).

## StepRenderer

The renderer used to render each step.(Learn [ Model-Driven
Rendering](ZK_Developer%27s_Reference/MVC/Model#Model-Driven_Rendering))

You can specify your own
<javadoc>org.zkoss.zkmax.zul.StepRenderer</javadoc> at this attribute to
renders a Step object with your data.

## WrappedLabels

Set whether the labels in children steps are wrapped. (Default: false)

true: ![](Stepber-WrappedLabels.png "Stepber-WrappedLabels.png")

false: ![](Stepbar-example.png "Stepbar-example.png")

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Represents an event caused by a user's selection changed at the
client.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*`[` Step`](ZK_Component_Reference/Supplementary/Stepbar/Step)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date           | Content                                                                          |
|---------|----------------|----------------------------------------------------------------------------------|
| 9.0.0   | November, 2019 | [ZK-4375](https://tracker.zkoss.org/browse/ZK-4375): Provide a stepbar component |


