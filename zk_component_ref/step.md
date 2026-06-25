---
title: "Step"
---

- **Demonstration:** [Step](https://www.zkoss.org/zkdemo/menu/stepbar)
- **Java API:** [org.zkoss.zkmax.zul.Step](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Step.html)
- **JavaScript API:** [zkmax.wgt.Step](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.wgt.Step.html)

{% include edition-availability.html edition="pe" %}
{% include supported-since.html version="9.0.0" %}

# Employment/Purpose

A step is used for displaying user navigation, it should be placed
inside a Stepbar and shouldn't be used without a Stepbar.

## Common Use Cases

### Marking a Step as Complete

Set `complete="true"` to visually indicate that a step has been finished. This is typically updated programmatically as the user advances through the workflow.

```xml
<stepbar width="600px">
    <step title="Personal Info" complete="true"/>
    <step title="Review" complete="true"/>
    <step title="Submit"/>
</stepbar>
```

### Flagging a Step With an Error

Set `error="true"` to highlight that a step requires attention. When both `complete` and `error` are set on the same step, the error state takes visual precedence.

```xml
<stepbar width="600px">
    <step title="Upload File" complete="true"/>
    <step title="Validate" error="true"/>
    <step title="Process"/>
</stepbar>
```

### Using a Custom Icon

Use `iconSclass` to replace the default step icon with any ZK icon font class. The custom icon overrides both the complete and error icons when set.

```xml
<stepbar width="600px">
    <step title="Account" iconSclass="z-icon-user"/>
    <step title="Payment" iconSclass="z-icon-credit-card"/>
    <step title="Confirm" iconSclass="z-icon-check"/>
</stepbar>
```

# Example

![](/zk_component_ref/images/Stepbar-example.png)

```xml
<zk>
    <stepbar linear="false" activeIndex="2" width="600px">
        <step title="First Step" iconSclass="z-icon-home"/>
        <step title="Second Step" complete="true" />
        <step title="Third Step" error="true" />
    </stepbar>
</zk>
```

# Properties

## Complete

Whether this step is completed. (Default: false)

The default visual style:
![](/zk_component_ref/images/Step-complete-default.png)

## Error

Whether this step is in error. (Default: false)

The default visual style:
![](/zk_component_ref/images/Step-error-default.png)

The priority of `error` is higher than `complete`. If both properties
are set, the result will be an error state visually.

## IconSclass

Set the icon CSS class to apply a custom icon.

If you set this property, it will override the complete and error icons
accordingly.

[center ](File:Step-iconsclass.png)

```xml
    <stepbar width="800px">
        <step title="Custom Step icon" iconSclass="z-icon-star-o"/>
        <step title="Custom Error" error="true" iconSclass="z-icon-bug"/>
        <step title="Custom Complete" iconSclass="z-icon-home"/>
    </stepbar>
```

Please read
[{{site.baseurl}}/zk_component_ref/labelimageelement#IconSclass]({{site.baseurl}}/zk_component_ref/labelimageelement#IconSclass)
to know more available build-in icons.

## Title

Set the title (label) of each step. (Default: empty)

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| (Inherited) | [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events) | See parent component for supported events |

# Supported Children

`* None`