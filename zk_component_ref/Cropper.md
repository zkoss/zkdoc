

# Cropper

{% include version-badge.html version=8.6.0 %}

- Java API: <javadoc>org.zkoss.zkmax.zul.Cropper</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.med.Cropper</javadoc>
- {% include edition-availability.html edition=pe %}

# Browser Support

- This component supports IE10+ and modern browsers.

# Employment/Purpose

This component allows users to crop a selected range of image.

# Example

<figure>
<img src="ZKCompRef_Cropper.png" title="ZKCompRef_Cropper.png"
width="700" />
<figcaption>ZKCompRef_Cropper.png</figcaption>
</figure>

``` xml
<cropper x="50" y="100" w="100" h="100" onCrop="img.setContent(event.getMedia())" width="800px"
 toolbarVisible="true"  src="swimming-pool.jpg"/>
    <image id="img"/>
```

# Properties and Features

## Src

The src of the image.

## Content

The content image.

## AspectRatio

The width and height of the selected range will be fixed to the
specified ratio.

## MinWidth

The minimum width of the selected range.

## MinHeight

The minimum height of the selected range.

## MaxWidth

The maximum width of the selected range.

## MaxHeight

The maximum height of the selected range

## X

The left offset of the selected range.

## Y

The top offset of the selected range.

## W

The width of the selected range.

## H

The height of the selected range.

## ToolbarVisible

This component provides a built-in toolbar with `Crop` and `Cancel`
buttons. You can make it invisible and create your UI control. Then call
`crop()` and `cancel()` on your own.

## CroppedFormat

Image formats like `image/jpeg` or `image/png` is allowed, Default is
set to `image/png`

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
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user has resized
the selected range.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes user is resizing
the selected range.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onCrop</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> Denotes user has
cropped the image.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  HtmlBasedComponent](ZK_Component_Reference/Base_Components/HtmlBasedComponent#Supported_Events)

# Supported Children

- NONE

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


