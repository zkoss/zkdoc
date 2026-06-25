---
title: "Fisheye"
---

- **Demonstration:** [Fisheye](http://www.zkoss.org/zkdemo/menu/fisheye_menu)
- **Java API:** [org.zkoss.zkex.zul.Fisheye](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Fisheye.html)
- **JavaScript API:** [zkex.menu.Fisheye](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.menu.Fisheye.html)

{% include edition-availability.html edition="ee" %}

{% include supported-since.html version="5.0.0" %}

# Employment/Purpose

A fisheye item

## Common Use Cases

- **Toolbar-style navigation** — place multiple `<fisheye>` items inside a `<fisheyebar>` to build a Mac-style dock or application launcher where icons magnify on hover.
- **Icon-only action triggers** — use the `image` and `label` attributes together with `onClick` to give users a compact, visually rich way to invoke commands without cluttering the UI with text buttons.
- **Dynamic image items** — when icon artwork must be generated at runtime (e.g. user avatars or data-driven thumbnails), set the image via `imageContent` from a `<zscript>` block or a ViewModel, letting the fisheye item render the programmatically created image.

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

# Properties

# Supported Events

Inherited Supported Events: [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*None`

# Inherited Functions

Please refer to [LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement)
for inherited functions.