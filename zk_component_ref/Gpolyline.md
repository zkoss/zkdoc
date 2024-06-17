# Gpolyline

- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A
- Style Guide: N/A

# Employment/Purpose

Polyline drawn on the Google Maps per the given (latitude, longitude)
points and visible zoom level(0~3).

# Example

<figure>
<img src="ZKComRef_Gpolyline_Example.png"
title="ZKComRef_Gpolyline_Example.png" />
<figcaption>ZKComRef_Gpolyline_Example.png</figcaption>
</figure>

``` xml
    <script type="text/javascript" content="zk.googleAPIkey='Your-Google-API-Key'"/>
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <gpolyline path="37.42838786,-122.13998795,
                         37.43561240,-122.13277816,
                         37.42416187,-122.11441040,
                         37.42157162,-122.12007522,
                         37.41734524,-122.12316513,
                         37.42838786,-122.13998795"/>
    </gmaps>
```

## Disable Path Encoding

In order to preserve bandwidth the polyline/polygon path coordinates are
encoded (default) with a [lossy
algorithm](https://developers.google.cn/maps/documentation/utilities/polylinealgorithm)
(i.e. some precision is lost - visible at high zoom levels). In cases
where the highest precision is needed (e.g. when editing a
polyline/polygon) this encoding can be disabled by setting
`pathEncoded="false"` / `polygon.setPathEncoded(false);` - at the cost
of increased network request and response sizes.

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
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
