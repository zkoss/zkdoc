# Orgnode

- Java API: <javadoc>org.zkoss.zkmax.zul.Orgnode </javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.layout.Orgnode
  </javadoc>

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement#Supported_Events)

# Supported Children

`*ALL`

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
