

# Step

- Demonstration: \[<https://www.zkoss.org/zkdemo/menu/stepbar>\| Step\]
- Java API: [org.zkoss.zkmax.zul.Step](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Step.html)
- JavaScript API: [zkmax.wgt.Step](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.wgt.Step.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version=9.0.0 %}

# Employment/Purpose

A step is used for displaying user navigation, it should be placed
inside a Stepbar and shouldn't be used without a Stepbar.

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`* None`



# Version History



| Version | Date           | Content                                                                          |
|---------|----------------|----------------------------------------------------------------------------------|
| 9.0.0   | November, 2019 | [ZK-4375](https://tracker.zkoss.org/browse/ZK-4375): Provide a stepbar component |


