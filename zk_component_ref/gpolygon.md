---
title: "Gpolygon"
---


- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A


# Employment/Purpose

Polygon drawn on the Google Maps per the given (latitude, longitude)
points, visible zoom level(0~3), and fill color, etc..

# Example

![](/zk_component_ref/images/ZKComRef_Gpolygon_Example.png)

```xml
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

{% include version-badge.html version="3.3.0" %}

see: [ Gpolyline - Disable_Path_Encoding]({{site.baseurl}}/zk_component_ref/gpolyline#Disable_Path_Encoding)

# Supported Events

- Inherited Supported Events: [ Gpolyline]({{site.baseurl}}/zk_component_ref/gpolyline#Supported_Events)

# Supported Children

`*None`
