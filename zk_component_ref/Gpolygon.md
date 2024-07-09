

# Gpolygon

- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A
- Style Guide: N/A

# Employment/Purpose

Polygon drawn on the Google Maps per the given (latitude, longitude)
points, visible zoom level(0~3), and fill color, etc..

# Example

<figure>
<img src="images/ZKComRef_Gpolygon_Example.png
title="ZKComRef_Gpolygon_Example.png" />
<figcaption>ZKComRef_Gpolygon_Example.png</figcaption>
</figure>

``` xml
    <script type="text/javascript" content="zk.googleAPIkey='Your-Google-API-Key'"/>
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <gpolygon path="37.42838786,-122.13998795,
                         37.43561240,-122.13277816,
                         37.42416187,-122.11441040,
                         37.42157162,-122.12007522,
                         37.41734524,-122.12316513,
                         37.42838786,-122.13998795"/>
    </gmaps>
```

## Disable Path Encoding

{% include version-badge.html version=3.3.0 %}

see: [ Gpolyline -
Disable_Path_Encoding](ZK_Component_Reference/Diagrams_and_Reports/Gmaps/Gpolyline#Disable_Path_Encoding)

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
  Gpolyline](ZK_Component_Reference/Diagrams_and_Reports/Gmaps/Gpolyline#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


