---
title: "Area"
---


- Demonstration: N/A
- Java API: [org.zkoss.zul.Area](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Area.html)
- JavaScript API: [zul.wgt.Area](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Area.html)


# Employment/Purpose

An area of a image map. Instead of the application processing the
coordinates, developers can add the area components as children of a
imagemap component thus defining a target. The imagemap component will
translate the mouse pointer coordinates into a logical name ie. The id
of the area the user clicked.

# Example

```xml
<imagemap src="/img/sun.jpg" onClick="alert(event.area)">
    <area id="First" coords="0, 0, 100, 100"/>
    <area id="Second" shape="circle" coords="200, 200, 100"/>
</imagemap>
```

# The shape Property

An area component supports three kinds of shapes: circle, polygon and
rectangle. The coordinates of the mouse position are screen pixels
counted from the upper-left corner of the image beginning with (0, 0).

| Shape | Coordinates / Description |
|---|---|
| circle | coords="x, y, r"
where `x` and `y` define the position of the
circle’s center and `r` is the radius in pixels. |
| polygon | coords="x1, y1, x2, y2, x3, y3..."
where each pair of `x` and `y` define a point
of the polygon. At least three pairs of coordinates are required to
define a triangle. The polygon is automatically closed, so it is not
necessary to repeat the first coordinate at the end of the list to close
the region. |
| rectangle | coords="x1, y1, x2, y2"
where the first coordinate pair is one corner of the rectangle and
the other pair is the corner diagonally opposite. A rectangle is just a
shortened way of specifying a polygon with four vertices. |

If the coordinates in one `area` component overlap with another, the
first one takes precedence.

# Supported Events

- Inherited Supported Events: [ AbstractComponent]({{site.baseurl}}/zk_component_ref/abstractcomponent#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description                | Example Location                              |
|---------|----------------------------|-----------------------------------------------|
| 5.0.2   | Area in Imagemap with href | <http://www.zkoss.org/forum/listComment/3016> |



