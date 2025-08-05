
- Demonstration:
- Java API:
  [Navbar](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Navbar.html)
- JavaScript API:
  [Navbar](http://www.zkoss.org/javadoc/latest/jsdoc/zkmax/nav/Navbar.html)
- Style Guide:
- <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Provide a roadmap to help user navigate through website. It's a
container that usually contains nav elements.

# Example

![](/zk_component_ref/images/ZKComRef_Nav.png)

```xml
<navbar orient="vertical" width="200px">
    <navitem label="Home" iconSclass="z-icon-home" />
    <nav label="Get Started" iconSclass="z-icon-th-list" badgeText="3">
        <navitem label="Step One" />
        <navitem label="Step Two" />
        <navitem label="Step Three" />
    </nav>
    <navitem label="About" iconSclass="z-icon-flag" />
    <navitem label="Contact" iconSclass="z-icon-envelope"/>
</navbar>
```

# Properties

## Orient

A `navbar` could be placed in a vertical or horizontal orientation, the
`orient` attribute decides.

| Orient | Snapshot |
|---|---|
| horizontal | ![](/zk_component_ref/images/ZKComRef_Nav_hor.png) |
| vertical | ![](/zk_component_ref/images/ZKComRef_Nav.png) |

## Collapsed

A `navbar` can be collapsed, the `collapsed` attribute decides.

| Collapsed | Orient | Snapshot |
|---|---|---|
| true | horizontal | ![](/zk_component_ref/images/ZKComRef_Nav_Hor_Cld.png) |
| false | horizontal | ![](/zk_component_ref/images/ZKComRef_Nav_Hor_No.png) |
| true | vertical | ![](/zk_component_ref/images/ZKComRef_Nav_Ver_Cld.png) |
| false | vertical | ![](/zk_component_ref/images/ZKComRef_Nav_Ver_No.png) |

## Autoclose

{% include version-badge.html version=8.0.4 %} By default only a single
`nav`-element is open at any time - automatically closing other
`nav`-elements which are not on the current open path. This behavior can
be disabled setting `autoclose="false"`, which keeps nav elements open
until they are clicked again by the user.

```xml
    <navbar orient="vertical" autoclose="false">
        <nav label="nav 1">
            <navitem label="nav 1.1"/>
            <navitem label="nav 1.2"/>
        </nav>
        <nav label="nav 2">
            <navitem label="nav 2.1"/>
            <navitem label="nav 2.2"/>
        </nav>
    </navbar>
```

# Supported Events

| Name | Event Type |
|---|---|
| `onSelect` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Notifies one that
the user has selected a navitem in the navbar. |

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*`[` Nav`]({{site.baseurl}}/zk_component_ref/nav)`, `[` Navitem`]({{site.baseurl}}/zk_component_ref/navitem)`,`[` Navseparator`]({{site.baseurl}}/zk_component_ref/navseparator)



# Version History



| Version | Date         | Content                                                                                          |
|---------|--------------|--------------------------------------------------------------------------------------------------|
| 7.0.0   | August, 2013 | [Navbar](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Navbar.html) was introduced. |


