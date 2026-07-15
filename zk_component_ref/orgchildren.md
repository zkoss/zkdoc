---
title: "Orgchildren"
---

- **Demonstration:** [Orgchildren](https://www.zkoss.org/zkdemo/organigram)
- **Java API:** [org.zkoss.zkmax.zul.Orgchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgchildren.html)
- **JavaScript API:** [zkmax.layout.Orgchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Orgchildren.html)

{% include edition-availability.html edition="ee" %}

{% include supported-since.html version="8.6.0" %}

# Employment/Purpose

`Orgchildren` contains a collection of Orgitem components. It is main
body of the `Organigram` and it also the main body of an `Orgitem`'s
children.

## Common Use Cases

- **Direct child of `<organigram>`** — Every `<organigram>` must contain exactly one top-level `<orgchildren>` as its immediate child. Place all root `<orgitem>` elements inside it.
- **Nesting branch nodes** — When an `<orgitem>` has subordinates, wrap those subordinates in a nested `<orgchildren>` directly inside the parent `<orgitem>`. This establishes the tree hierarchy rendered by Organigram.
- **Flat root with multiple peers** — To display an org chart with several top-level nodes side by side, place multiple sibling `<orgitem>` elements inside the single root `<orgchildren>`.

```xml
<organigram width="600px">
    <orgchildren>
        <orgitem label="CEO">
            <orgchildren>
                <orgitem label="CTO"/>
                <orgitem label="CFO"/>
            </orgchildren>
        </orgitem>
    </orgchildren>
</organigram>
```

# Example

![Orgchildren example](/zk_component_ref/images/Orgchildren_example.png)

        <organigram width="600px">
            <orgchildren>
                <orgitem label="Item1">
                    <orgchildren>
                        <orgitem label="Item2">
                            <orgchildren>
                                <orgitem label="Item3"/>
                                <orgitem label="Item4"/>
                            </orgchildren>
                        </orgitem>
                    </orgchildren>
                </orgitem>
            </orgchildren>
        </organigram>

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*`[` Orgitem`]({{site.baseurl}}/zk_component_ref/orgitem)
