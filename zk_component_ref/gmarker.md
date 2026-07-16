---
title: "Gmarker"
description: "Gmarker: The gmarker displays a marker on a Google Map at a specific latitude and longitude coordinate."
---

- **Demonstration:** [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- **Java API:** N/A

# Employment/Purpose

The `gmarker` displays a marker on a Google Map at a specific latitude and longitude coordinate. You use markers to highlight points of interest, indicate locations to your users, or enable interactive selection. The marker's appearance is customizable — you control the icon image, shadow, dimensions, and anchor points to match your application's design.

## Common Use Cases

- Displaying location pins for nearby stores, restaurants, or services
- Showing event locations on a map with custom icons and labels
- Creating draggable markers that allow users to reposition points on a map
- Building heatmaps where markers appear/disappear based on zoom level
- Attaching info windows to markers so users can view details on click

# Example

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122">
    <gmarker lat="37.3" lng="-122" title="Our Location"/>
</gmaps>
```

# Properties

## DraggingEnabled

**Default Value:** `false`

Sets whether this `gmarker` is enabled to drag **inside** the map. When `true`, the marker uses the Google Maps native drag behaviour and stays within the map bounds. When `false`, the marker can be dragged as a regular ZK component (i.e., it can be dragged **outside** the map). This property takes precedence over the generic `draggable` attribute.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122">
    <gmarker lat="37.3" lng="-122" draggingEnabled="true"/>
</gmaps>
```

## IconAnchorX

Sets the x pixel coordinate (relative to the top-left corner of the icon image) at which this icon is anchored to the map. Values less than or equal to `-100` are ignored. Pair with [`iconAnchorY`](#iconanchory) to fully specify the anchor point.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122">
    <gmarker lat="37.3" lng="-122"
             iconImage="/img/marker.png"
             iconAnchorX="16" iconAnchorY="32"/>
</gmaps>
```

## IconAnchorY

Sets the y pixel coordinate (relative to the top-left corner of the icon image) at which this icon is anchored to the map. Values less than or equal to `-100` are ignored. Pair with [`iconAnchorX`](#iconanchorx) to fully specify the anchor point.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122">
    <gmarker lat="37.3" lng="-122"
             iconImage="/img/marker.png"
             iconAnchorX="16" iconAnchorY="32"/>
</gmaps>
```

## IconDragCrossAnchorX

Sets the x pixel offset (relative to the icon anchor) of the drag-cross image shown while the marker is being dragged. Values less than or equal to `-100` are ignored. Pair with [`iconDragCrossAnchorY`](#icondragcrossanchory).

```xml
<gmarker lat="37.3" lng="-122"
         iconDragCrossImage="/img/cross.png"
         iconDragCrossAnchorX="8" iconDragCrossAnchorY="8"/>
```

## IconDragCrossAnchorY

Sets the y pixel offset (relative to the icon anchor) of the drag-cross image shown while the marker is being dragged. Values less than or equal to `-100` are ignored. Pair with [`iconDragCrossAnchorX`](#icondragcrossanchorx).

```xml
<gmarker lat="37.3" lng="-122"
         iconDragCrossImage="/img/cross.png"
         iconDragCrossAnchorX="8" iconDragCrossAnchorY="8"/>
```

## IconDragCrossHeight

Sets the pixel height of the drag-cross image displayed while the marker is being dragged. Values less than `0` are ignored. Pair with [`iconDragCrossWidth`](#icondragcrosswidth) and [`iconDragCrossImage`](#icondragcrossimage).

```xml
<gmarker lat="37.3" lng="-122"
         iconDragCrossImage="/img/cross.png"
         iconDragCrossWidth="16" iconDragCrossHeight="16"/>
```

## IconDragCrossImage

Sets the URL of the cross image displayed over the marker while it is being dragged. A `null` value is ignored. Use together with [`iconDragCrossWidth`](#icondragcrosswidth), [`iconDragCrossHeight`](#icondragcrossheight), and the anchor offsets to position the image correctly.

```xml
<gmarker lat="37.3" lng="-122"
         iconDragCrossImage="/img/drag-cross.png"
         iconDragCrossWidth="24" iconDragCrossHeight="24"
         iconDragCrossAnchorX="12" iconDragCrossAnchorY="12"/>
```

## IconDragCrossWidth

Sets the pixel width of the drag-cross image displayed while the marker is being dragged. Values less than `0` are ignored. Pair with [`iconDragCrossHeight`](#icondragcrossheight) and [`iconDragCrossImage`](#icondragcrossimage).

```xml
<gmarker lat="37.3" lng="-122"
         iconDragCrossImage="/img/cross.png"
         iconDragCrossWidth="16" iconDragCrossHeight="16"/>
```

## IconHeight

Sets the pixel height of the marker foreground icon image. Values less than `0` are ignored. Pair with [`iconWidth`](#iconwidth); both must be set for the size to take effect.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconWidth="32" iconHeight="32"/>
```

## IconImage

Sets the URL of the foreground image for the marker icon, replacing the default Google Maps pin. A `null` value is ignored. Use in combination with [`iconWidth`](#iconwidth) and [`iconHeight`](#iconheight) to set the icon dimensions, and [`iconAnchorX`](#iconanchorx)/[`iconAnchorY`](#iconanchory) to control the map attachment point.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122">
    <gmarker lat="37.3" lng="-122"
             iconImage="/img/custom-marker.png"
             iconWidth="32" iconHeight="32"
             iconAnchorX="16" iconAnchorY="32"/>
</gmaps>
```

## IconImageMap

Sets a comma-delimited list of integers representing the x/y coordinate pairs of an image map used to define the clickable region of the icon in browsers other than Internet Explorer. A `null` value is ignored. Each pair describes a polygon vertex; the coordinates are relative to the icon image's top-left corner.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconImageMap="0,0,16,0,16,32,0,32"/>
```

## IconInfoAnchorX

Sets the x pixel coordinate (relative to the top-left corner of the icon image) at which the info window is anchored to this icon. Values less than or equal to `-100` are ignored. Pair with [`iconInfoAnchorY`](#iconinfoanchory).

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconInfoAnchorX="16" iconInfoAnchorY="0"/>
```

## IconInfoAnchorY

Sets the y pixel coordinate (relative to the top-left corner of the icon image) at which the info window is anchored to this icon. Values less than or equal to `-100` are ignored. Pair with [`iconInfoAnchorX`](#iconinfoanchorx).

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconInfoAnchorX="16" iconInfoAnchorY="0"/>
```

## IconMaxHeight

Sets the number of pixels that the marker will visually rise vertically when dragged. Values less than `0` are ignored. This gives a visual "lift" effect during drag operations.

```xml
<gmarker lat="37.3" lng="-122"
         draggingEnabled="true"
         iconMaxHeight="20"/>
```

## IconMozPrintImage

Sets the URL of the foreground icon image used when printing maps in Firefox/Mozilla. It must be the same size as the main icon image set by [`iconImage`](#iconimage). A `null` value is ignored.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconMozPrintImage="/img/marker-print.png"/>
```

## IconPrintImage

Sets the URL of the foreground icon image used when printing maps. It must be the same size as the main icon image set by [`iconImage`](#iconimage). A `null` value is ignored. For Firefox/Mozilla use [`iconMozPrintImage`](#iconmozprintimage) instead.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconPrintImage="/img/marker-print.png"
         iconMozPrintImage="/img/marker-print-moz.png"/>
```

## IconPrintShadow

Sets the URL of the shadow image used when printing maps. It should be a GIF image because most browsers cannot print PNG images correctly. A `null` value is ignored.

```xml
<gmarker lat="37.3" lng="-122"
         iconShadow="/img/shadow.png"
         iconPrintShadow="/img/shadow-print.gif"/>
```

## IconShadow

Sets the URL of the shadow image for the marker icon. The shadow is rendered beneath the foreground icon image. A `null` value is ignored. Use [`iconShadowWidth`](#iconshadowwidth) and [`iconShadowHeight`](#iconshadowheight) to size the shadow.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconShadow="/img/marker-shadow.png"
         iconShadowWidth="51" iconShadowHeight="34"/>
```

## IconShadowHeight

Sets the pixel height of the marker shadow image. Values less than `0` are ignored. Pair with [`iconShadowWidth`](#iconshadowwidth); both must be set for the shadow size to take effect.

```xml
<gmarker lat="37.3" lng="-122"
         iconShadow="/img/marker-shadow.png"
         iconShadowWidth="51" iconShadowHeight="34"/>
```

## IconShadowWidth

Sets the pixel width of the marker shadow image. Values less than `0` are ignored. Pair with [`iconShadowHeight`](#iconshadowheight); both must be set for the shadow size to take effect.

```xml
<gmarker lat="37.3" lng="-122"
         iconShadow="/img/marker-shadow.png"
         iconShadowWidth="51" iconShadowHeight="34"/>
```

## IconTransparent

Sets the URL of a virtually transparent version of the foreground icon image, used by Internet Explorer to capture click events correctly. The image should be a 24-bit PNG at 1% opacity but with the same shape and dimensions as [`iconImage`](#iconimage). A `null` value is ignored.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconTransparent="/img/marker-transparent.png"/>
```

## IconWidth

Sets the pixel width of the marker foreground icon image. Values less than `0` are ignored. Pair with [`iconHeight`](#iconheight); both must be set for the icon size to take effect.

```xml
<gmarker lat="37.3" lng="-122"
         iconImage="/img/marker.png"
         iconWidth="32" iconHeight="32"/>
```

## Maxzoom

**Default Value:** `-1` (undefined — marker is always visible at high zoom)

Sets the maximum map zoom level at which this marker is visible. When the map zoom exceeds this value the marker is hidden. The Google Maps API supports zoom levels `0`–`19` (constant `Gmarker.ZOOM_LIMIT`). A value of `-1` means no upper limit is applied.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122" zoom="10">
    <!-- visible only at zoom levels 5 through 12 -->
    <gmarker lat="37.3" lng="-122" minzoom="5" maxzoom="12"/>
</gmaps>
```

## Minzoom

**Default Value:** `0`

Sets the minimum map zoom level at which this marker is visible. When the map zoom falls below this value the marker is hidden. Must be `0` or greater; negative values cause a `UiException` at runtime. Pair with [`maxzoom`](#maxzoom) to define a visibility range.

```xml
<gmaps width="500px" height="400px" lat="37.3" lng="-122" zoom="10">
    <!-- visible only at zoom levels 5 through 12 -->
    <gmarker lat="37.3" lng="-122" minzoom="5" maxzoom="12"/>
</gmaps>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onMapDrop` | [MapDropEvent]({{site.baseurl}}/zk_component_ref/mapdropevent) | Notifies that some component is dragged and dropped on the gmaps or gmarker component with latitude and longitude information. |

- Inherited Supported Events: [Ginfo]({{site.baseurl}}/zk_component_ref/ginfo#Supported_Events)

# Supported Children

`*None`
