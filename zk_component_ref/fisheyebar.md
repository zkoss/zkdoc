

# Fisheyebar

- Demonstration:
  [Fisheyebar](http://www.zkoss.org/zkdemo/menu/fisheye_menu)
- Java API: [org.zkoss.zkex.zul.Fisheyebar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Fisheyebar.html)
- JavaScript API:
  [zkex.menu.Fisheyebar](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.menu.Fisheyebar.html)

- [Available in ZK PE and EE only](http://www.zkoss.org/product/edition.dsp)

# Employment/Purpose

A fisheye bar is a bar of fisheye that is a menu similar to the fish eye
menu on the Mac OS.

# Example

![](/zk_component_ref/images/ZKComRef_fisheyebar.png)

```xml
<zk>
    <div height="450px">
        <checkbox label="Attach icon edge at bottom"
            onCheck='fsb.attachEdge=self.checked?"bottom":"top"' />
        <checkbox label="Vertical orient"
            onCheck='fsb.orient=self.checked?"vertical":"horizontal"' />
        <separator bar="true" />
        <fisheyebar id="fsb" style="position:absolute;margin:80px 150px;"
            attachEdge="top" itemWidth="80" itemHeight="80" itemMaxHeight="160" itemMaxWidth="160">
            <fisheye image="/img/Centigrade-Widget-Icons/FolderABlue-128x128.png" label="Folder"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/ReadingGlass-128x128.png" label="Reading Glasses"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Briefcase-128x128.png" label="Project"
                onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/MailboxFlag-128x128.png"
                label="Email" onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Globe-128x128.png"
                label="Globe" onClick="alert(self.label)" />
            <fisheye image="/img/Centigrade-Widget-Icons/Spyglass-128x128.png" label="Spyglass"
                onClick="alert(self.label)" />
        </fisheyebar>
    </div>
</zk>
```

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*`[` Fisheye`]({{site.baseurl}}/zk_component_ref/fisheye)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


