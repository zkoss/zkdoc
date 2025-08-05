---
title: "Orgchildren"
---


- Java API: [org.zkoss.zkmax.zul.Orgchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgchildren.html)
- JavaScript API: [zkmax.layout.Orgchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Orgchildren.html)

`<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}`

{% include version-badge.html version=8.6.0 %}

# Employment/Purpose

`Orgchildren`contains a collection of Orgitem components. It is main
body of the `Organigram`and it also the main body of an `Orgitem`'s
children.

# Example

![](/zk_component_ref/images/Orgchildren_example.png)

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



