---
title: "Ginfo"
description: "Ginfo: The popup info window of the Google Maps. You can specify the content in pure text or HTML."
---

- **Demonstration:** [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- **Java API:** N/A

# Employment/Purpose

The popup info window of the Google Maps. You can specify the content in pure text or HTML.

## Common Use Cases

### Display a Static Info Window on Load

Set `open="true"` on a `ginfo` to display the info window immediately when the map loads. The body text (or `content` attribute) accepts plain text or HTML.

```xml
<gmaps width="500px" height="300px">
    <ginfo lat="37.4419" lng="-122.1419" open="true">
        <![CDATA[
            Welcome to <b>ZK HQ</b>.<br/>
            <a href="http://www.zkoss.org">Learn more</a>
        ]]>
    </ginfo>
</gmaps>
```

### Open an Info Window on Marker Click

Attach a `ginfo` as a sibling of a `gmarker` inside the same `gmaps`. Toggle `open` in the `onMapClick` event handler to show the info window when the user clicks the marker.

```xml
<gmaps id="mymap" width="500px" height="300px">
    <ginfo id="myinfo" lat="37.4410" lng="-122.1490">ZK Office</ginfo>
    <gmarker id="mymark" lat="37.4410" lng="-122.1490"/>
    <attribute name="onMapClick">
        Gmarker gmarker = event.getGmarker();
        if (gmarker != null) {
            myinfo.setOpen(true);
        }
    </attribute>
</gmaps>
```

### Set the Anchor Programmatically

When you need to position the info window at a location computed at runtime, construct a `LatLng` in `<zscript>` and pass it to `setAnchor()`.

```xml
<zscript>
    import org.zkoss.gmaps.LatLng;
    LatLng pt = new LatLng(37.7765, -122.4140);
    myinfo.setAnchor(pt);
    myinfo.setOpen(true);
</zscript>
<gmaps id="mymap" width="500px" height="300px">
    <ginfo id="myinfo">San Francisco</ginfo>
</gmaps>
```

# Example

[Gmaps]({{site.baseurl}}/zk_component_ref/gmaps#Example)

# Properties

## Anchor

{% include supported-since.html version="3.0.2" %}

**Default Value:** `LatLng(37.4419, -122.1419)`

Sets the geographic anchor point (latitude and longitude) of the info window on the map. In ZUL, set the anchor position using the `lat` and `lng` attributes separately. To set a `LatLng` object programmatically, construct it in `<zscript>` or a ViewModel and assign it via EL.

```xml
<zscript>
    import org.zkoss.gmaps.LatLng;
    LatLng anchor = new LatLng(37.4419, -122.1419);
</zscript>
<gmaps width="500px" height="300px">
    <ginfo lat="37.4419" lng="-122.1419" open="true">Hello, ZK.</ginfo>
</gmaps>
```

Note: `anchor` accepts a `LatLng` object; construct it in `<zscript>`, a composer, or a ViewModel.

## Content

**Default Value:** `""` (empty string)

Sets the content of the info window. The value can be plain text or an HTML string. Because `ginfo` declares `text-as="content"`, you can also supply the content as inline body text in ZUL.

```xml
<gmaps width="500px" height="300px">
    <ginfo open="true">
        <![CDATA[
            Hello, <a href="http://www.zkoss.org">ZK</a>.
        ]]>
    </ginfo>
</gmaps>
```

## Lat

Sets the latitude of the info window's anchor point in decimal degrees. This is a convenience shorthand for changing the latitude component of the `anchor` property.

```xml
<gmaps width="500px" height="300px">
    <ginfo lat="37.4419" lng="-122.1419" open="true">My location</ginfo>
</gmaps>
```

## Lng

Sets the longitude of the info window's anchor point in decimal degrees. This is a convenience shorthand for changing the longitude component of the `anchor` property.

```xml
<gmaps width="500px" height="300px">
    <ginfo lat="37.4419" lng="-122.1419" open="true">My location</ginfo>
</gmaps>
```

## Open

**Default Value:** `false`

Controls whether the info window is currently displayed on the map. Setting `open="true"` opens the info window; setting it to `false` closes it. Only one info window can be open at a time within a parent `gmaps`.

```xml
<gmaps id="mymap" width="500px" height="300px">
    <ginfo id="myinfo" open="true">Hello, ZK.</ginfo>
</gmaps>
```

# Supported Events

| Name | Event Type | Description |
|------|------------|-------------|
| Inherited Supported Events | | [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events) |

# Supported Children

`*None`
