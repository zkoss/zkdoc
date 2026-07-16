---
title: "Gpolygon"
---

- **Demonstration:**
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- **Java API:** [in release zip](https://github.com/zkoss/zkgmapsz/releases)

# Employment/Purpose

Polygon drawn on the Google Maps per the given (latitude, longitude)
points, visible zoom level(0~3), and fill color, etc..

# Example

![Gpolygon Example](/zk_component_ref/images/ZKComRef_Gpolygon_Example.png)

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

## Common Use Cases

### Filled Polygon with Colored Outline

Use both `fill` and `outline` together to render a polygon with a distinct border and a semi-transparent interior. The outline color is controlled by the inherited `color` attribute, while the interior uses `fillColor` and `fillOpacity`.

```xml
<gmaps width="500px" height="300px" showSmallCtrl="true">
    <gpolygon color="#0000CC" fill="true" fillColor="#3399FF" fillOpacity="40"
              outline="true"
              path="37.42838786,-122.13998795,
                    37.43561240,-122.13277816,
                    37.42416187,-122.11441040,
                    37.42838786,-122.13998795"/>
</gmaps>
```

### Outline-Only Polygon (No Fill)

Set `fill="false"` to draw only the polygon border without shading the interior area.

```xml
<gmaps width="500px" height="300px">
    <gpolygon fill="false" outline="true" color="#CC0000"
              path="37.42838786,-122.13998795,
                    37.43561240,-122.13277816,
                    37.42416187,-122.11441040,
                    37.42838786,-122.13998795"/>
</gmaps>
```

## Disable Path Encoding

{% include supported-since.html version="3.3.0" %}

see: [ Gpolyline - Disable_Path_Encoding]({{site.baseurl}}/zk_component_ref/gpolyline#Disable_Path_Encoding)

# Properties

## Outline

**Default Value:** `true`

Controls whether the polygon's border is drawn using the line color set by the `color` attribute (inherited from `Gpolyline`). Set to `false` to suppress the outline entirely, rendering only the fill area.

```xml
<gmaps width="500px" height="300px">
    <gpolygon outline="false"
              path="37.42838786,-122.13998795,37.43561240,-122.13277816,37.42416187,-122.11441040"
              fillColor="#0000FF" fillOpacity="40"/>
</gmaps>
```

## Fill

**Default Value:** `true`

Controls whether the interior of the polygon is filled with the color specified by `fillColor`. Set to `false` to draw only the outline without any interior shading.

```xml
<gmaps width="500px" height="300px">
    <gpolygon fill="false"
              path="37.42838786,-122.13998795,37.43561240,-122.13277816,37.42416187,-122.11441040"/>
</gmaps>
```

## FillColor

**Default Value:** `#808080`

Sets the fill color of the polygon interior as a hex color string in `#RRGGBB` format. This color is applied only when `fill` is `true`. If set to `null`, the value resets to the default `#808080`.

```xml
<gmaps width="500px" height="300px">
    <gpolygon fillColor="#3399FF" fillOpacity="60"
              path="37.42838786,-122.13998795,37.43561240,-122.13277816,37.42416187,-122.11441040"/>
</gmaps>
```

## FillOpacity

**Default Value:** `50`

Sets the opacity of the polygon fill as an integer from `0` (fully transparent) to `100` (fully opaque). Values outside this range throw an exception. This property takes effect only when `fill` is `true`.

| Value | Meaning |
|-------|---------|
| `0`   | Fully transparent — fill is invisible |
| `1`–`99` | Partially transparent |
| `100` | Fully opaque — no transparency |

```xml
<gmaps width="500px" height="300px">
    <gpolygon fillOpacity="75" fillColor="#FF0000"
              path="37.42838786,-122.13998795,37.43561240,-122.13277816,37.42416187,-122.11441040"/>
</gmaps>
```

# Supported Events

- Inherited Supported Events: [ Gpolyline]({{site.baseurl}}/zk_component_ref/gpolyline#Supported_Events)

# Supported Children

`*None`
