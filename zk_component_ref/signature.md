---
title: "Signature"
---


{% include version-badge.html version="8.6.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %}

- Java API: [org.zkoss.zkmax.zul.Signature](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Signature.html)
- JavaScript API:
  [zkmax.wgt.Signature](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.wgt.Signature.html)

# Browser Support

- This component supports IE10+ and modern browsers.

# Employment/Purpose

Signature components support signature pad on the desktop and mobile
browsers. User can customize pen size, pen color, background color etc.,
it also provides undo, save and clear methods.

# Example

![](/zk_component_ref/images/Signature.png)

```xml
<signature width="600px" height="300px" penColor="white" backgroundColor="#AED6F1" penSize="6"/>
```

## Buttons

There are 3 buttons when you hover on this component: (from left to
right)

1.  **undo**: to remove the last step that was drawn on the signature
    pad.
2.  **save**: to save the signature image to the server, a user can get
    the image by listening onSave event.
3.  **clear**: to clear signature pad.

# toolbarVisible

The toolbar contains 3 buttons: undo button, clear button, and save
button. They are visible by default. If you can hide them:

```xml
<signature toolbarVisible="false"/>
```

The toolbar buttons only contain icons by default. If you want to show
message after icons on the buttons, we provide three attributes:
`undoLabel`, `clearLabel`, and `saveLabel`.

Default:

![](/zk_component_ref/images/Signature_toolbar.png)

Customized:

![](/zk_component_ref/images/Signature_toolbar2.png)

```xml
<signature undoLabel="Undo" clearLabel="Clear" saveLabel="Save"/>
```

# Style Attributes

There are some attributes to adjust the signature style:

## penSize

the width of a line on the signature, the default is 1.

## penColor

Can be any color format accepted by context.fillStyle(canvas), defaults
to black.

## backgroundColor

Can be any color format accepted by context.fillStyle(canvas), defaults
to white.

## backgroundImage

{% include version-badge.html version="9.6.0" %} Can be any image format accepted by
context.drawImage(canvas), defaults to null.

# BackgroundIncluded

{% include version-badge.html version="9.6.0" %}

The background color and image will be saved by default. If you don't
want to save the background color and image, please use the following
setting.

```xml
<signature backgroundIncluded="false"/>
```

## Scanned Paper Form

You can load a scanned paper form as a background and save it with a
signature. ![](/zk_component_ref/images/Paper-form.jpg)

# Saves Signature Image

After clicking "Save" button, the component will upload the signature to
a server. You can listen `onSave` to get the uploaded signature and show
it with
[Image]({{site.baseurl}}/zk_component_ref/image):

```xml
    <signature onSave="image.setContent(event.getMedia())"/>
    <image id="image"/>
```

## File Size Limit

If you see `SizeLimitExceededException`, you can adjust max uploading
file size by [ file-size-threshold]({{site.baseurl}}/zk_config_ref/the_max_upload_size_element).

# Supported Events

| Name | Event Type |
|---|---|
| onSave | **Event:**
[org.zkoss.zk.ui.event.UploadEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/UploadEvent.html) When user invoke
the save method, the event would be triggered. |
| onClear | **Event:**
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) When user invoke the
clear method, the event would be triggered. |

# Version History



| Version | Date        | Content |
|---------|-------------|---------|
| 8.6.0   | August 2018 |         |


