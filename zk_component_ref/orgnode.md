---
title: "Orgnode"
description: "Orgnode represents data in an Orgitem. Orgnode can contain any components in it, such as label, image, textbox etc."
---

- **Demonstration:** [Orgnode](https://www.zkoss.org/zkdemo/organigram/orgnode)
- **Java API:** [org.zkoss.zkmax.zul.Orgnode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgnode.html)
- **JavaScript API:** [zkmax.layout.Orgnode](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Orgnode.html)

{% include edition-availability.html edition="ee" %}

{% include supported-since.html version="8.6.0" %}

# Employment/Purpose

Orgnode represents data in an Orgitem. Orgnode can contain any
components in it, such as label, image, textbox etc.

## Common Use Cases

Orgnode is used as the visual content container inside an `<orgitem>`. It accepts any child components — labels, images, buttons, form inputs — so each node in the org chart can display rich, interactive content.

**Displaying a name and title inside an org-chart node:**

```xml
<organigram width="500px">
    <orgchildren>
        <orgitem>
            <orgnode>
                <image src="/img/avatar.png"/>
                <label value="Jane Smith"/>
                <label value="Engineering Manager" style="color:gray"/>
            </orgnode>
        </orgitem>
    </orgchildren>
</organigram>
```

**Nesting nodes to build a reporting hierarchy:**

```xml
<organigram width="700px">
    <orgchildren>
        <orgitem>
            <orgnode label="CEO"/>
            <orgchildren>
                <orgitem>
                    <orgnode label="CTO"/>
                </orgitem>
                <orgitem>
                    <orgnode label="CFO"/>
                </orgitem>
            </orgchildren>
        </orgitem>
    </orgchildren>
</organigram>
```

# Example

```xml
<organigram width="600px">
    <orgchildren>
        <orgitem>
            <orgnode>
                <button label="Snapshot" onClick="camera.snapshot()"/>
            </orgnode>
            <orgchildren>
                <orgitem>
                    <orgnode width="200px" label="Camera">
                        <camera id="camera" onSnapshotUpload="image.setContent(event.media)"/>
                    </orgnode>
                </orgitem>
                <orgitem>
                    <orgnode width="200px" label="Image">
                        <image id="image"/>
                    </orgnode>
                </orgitem>
            </orgchildren>
        </orgitem>
    </orgchildren>
</organigram>
```

# Supported Events

Inherited Supported Events: [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*ALL`
