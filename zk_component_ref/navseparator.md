

# Navseparator

- Demonstration:
- Java API:
  [Navseparator](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Navseparator.html)
- JavaScript API:
  [Navseparator](http://www.zkoss.org/javadoc/latest/jsdoc/zkmax/nav/Navseparator.html)
- Style Guide:
- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Used to create a separator between nav items..

# Example

![](/zk_component_ref/images/ZKComRef_Navseparator.png)

```xml
    <navbar orient="horizontal" collapsed="true">
        <navitem label="Inbox" iconSclass="z-icon-inbox" />
        <navitem label="Create New Task" iconSclass="z-icon-pencil"/>
        <navseparator/>
        <nav label="Next Actions" iconSclass="z-icon-th-list" badgeText="4">
            <navseparator/>
            <navitem label="Rescue the Baby" iconSclass="z-icon-star"/>
            <navitem label="Play Darts" />
            <navitem label="Plant Flowers" />
            <navitem label="Wash the Car" iconSclass="z-icon-star"/>
        </nav>
        <nav label="Someday" iconSclass="z-icon-tasks" badgeText="2"/>
        <nav label="Done" iconSclass="z-icon-archive"/>
    </navbar>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

# Version History



| Version | Date          | Content                                                                                                      |
|---------|---------------|--------------------------------------------------------------------------------------------------------------|
| 7.0.0   | October, 2013 | [Navseparator](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Navseparator.html) was introduced. |


