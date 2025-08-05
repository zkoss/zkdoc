---
title: "Orgnode"
---


- Java API: [org.zkoss.zkmax.zul.Orgnode](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Orgnode.html)
- JavaScript API: [zkmax.layout.Orgnode](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Orgnode.html)

`<!--REQUIRED ZK EDITION: EE -->
{% include edition-availability.html edition="ee" %}`

{% include version-badge.html version=8.6.0 %}

# Employment/Purpose

Orgnode represents data in an Orgitem. Orgnode can contain any
components in it, such as label, image, textbox etc.

# Example

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

# Supported Events

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*ALL`



