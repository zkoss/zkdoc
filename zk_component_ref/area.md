---
title: "Area"
---

- **Demonstration:** N/A
- **Java API:** [org.zkoss.zul.Area](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Area.html)
- **JavaScript API:** [zul.wgt.Area](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Area.html)

# Employment/Purpose

An area of a image map. Instead of the application processing the
coordinates, developers can add the area components as children of a
imagemap component thus defining a target. The imagemap component will
translate the mouse pointer coordinates into a logical name ie. The id
of the area the user clicked.

## Common Use Cases

### Image Map with Mixed Shapes

Combine rectangle, circle, and polygon areas on a single image map. If regions overlap, the first matching `area` takes precedence.

```xml
<imagemap src="/img/world-map.jpg" onClick="alert(event.area)">
    <area id="europe"   shape="polygon" coords="340,100,400,80,430,120,390,150"/>
    <area id="atlantic" shape="circle"  coords="250,200,60"/>
    <area id="americas" shape="rect"    coords="50,80,220,320"/>
</imagemap>
```

### Navigating with href via onClick

Use the `onClick` event on the parent `<imagemap>` and read `event.area` to obtain the `id` of the clicked region, then navigate or update the UI accordingly.

```xml
<imagemap src="/img/menu.png"
          onClick="execution.sendRedirect(&quot;/&quot; + event.area + &quot;.zul&quot;)">
    <area id="home"    coords="0,0,100,50"/>
    <area id="about"   coords="100,0,200,50"/>
    <area id="contact" coords="200,0,300,50"/>
</imagemap>
```

# Example

```xml
<imagemap src="/img/sun.jpg" onClick="alert(event.area)">
    <area id="First" coords="0, 0, 100, 100"/>
    <area id="Second" shape="circle" coords="200, 200, 100"/>
</imagemap>
```

# Properties

## coords

**Default Value:** `null`

Sets the pixel coordinates of the clickable region within the image map. The format depends on the value of the `shape` attribute. Coordinates are counted from the upper-left corner of the image, starting at `(0, 0)`.

| Shape | Format | Description |
|---|---|---|
| `circle` / `circ` | `x,y,r` | Center point `(x,y)` and radius `r` in pixels. |
| `polygon` / `poly` | `x1,y1,x2,y2,x3,y3,...` | Each pair defines a vertex. At least three pairs required. The polygon is closed automatically. |
| `rectangle` / `rect` (default) | `x1,y1,x2,y2` | Diagonally opposite corners of the rectangle. |

```xml
<imagemap src="/img/map.jpg">
    <!-- rectangle (default shape) -->
    <area id="topLeft" coords="0,0,100,100"/>
    <!-- circle -->
    <area id="center" shape="circle" coords="200,200,50"/>
    <!-- polygon (triangle) -->
    <area id="tri" shape="polygon" coords="300,0,400,100,200,100"/>
</imagemap>
```

## shape

**Default Value:** `null` (treated as `rectangle`)

Sets the shape of the clickable region for this area. A `WrongValueException` is thrown for any value not in the accepted set.

| Value | Meaning |
|---|---|
| `null` (default) | Rectangle (same as `rect`/`rectangle`). |
| `rect` | Rectangle. |
| `rectangle` | Rectangle (alias for `rect`). |
| `circle` | Circle. |
| `circ` | Circle (alias for `circle`). |
| `polygon` | Polygon. |
| `poly` | Polygon (alias for `polygon`). |

See [coords](#coords) for the coordinate format that corresponds to each shape.

```xml
<imagemap src="/img/map.jpg">
    <area id="circleZone" shape="circle" coords="100,100,50"/>
    <area id="polyZone" shape="polygon" coords="0,0,150,0,75,100"/>
    <area id="rectZone" shape="rect" coords="200,0,350,100"/>
</imagemap>
```

# Supported Events

- Inherited Supported Events: [ AbstractComponent]({{site.baseurl}}/zk_component_ref/abstractcomponent#Supported_Events)

# Supported Children

`*None`