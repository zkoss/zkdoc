---
title: "Image"
---

- **Demonstration:** [Image](http://www.zkoss.org/zkdemo/multimedia/dynamic_image)
- **Java API:** [org.zkoss.zul.Image](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Image.html)
- **JavaScript API:** [zul.wgt.Image](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Image.html)

# Employment/Purpose

An `image` component displays an image at the browser. You can assign the image by specifying a URI with the `src` property, or programmatically set image content using the `content` property for dynamically generated images. The `hover` property enables a second image to appear when the user moves the mouse over the component.

## Common Use Cases

- **Static image by URL** — use `src` to reference a file served from the web application.
- **Locale-dependent image** — use `src` with a `*` placeholder; ZK resolves the correct locale variant automatically.
- **Dynamically generated image** — use `content` with an `org.zkoss.image.AImage` or `java.awt.image.RenderedImage`; ZK manages caching and memory automatically.
- **Hover effect** — set `hover` to a second image URI that is displayed while the pointer is over the component.

# Example

Displaying a static image by URI:

```xml
<image src="/img/logo.png"/>
```

Displaying a dynamically generated image using `content`:

```xml
<zk>
    Location: <textbox onChange="updateMap(self.value)"/>
    Map: <image id="map"/>
    <zscript><![CDATA[
        void updateMap(String location) {
            if (location.length() > 0) {
                org.zkoss.image.AImage img = new org.zkoss.image.AImage(location);
                map.setContent(img);
            }
        }
    ]]></zscript>
</zk>
```

Showing a hover image:

```xml
<image src="/img/icon.png" hover="/img/icon-hover.png"/>
```

# Properties

## Src

**Default Value:** `null`

Sets the URI of the image to display. Accepts any valid resource URI, including locale-dependent paths (use `*` as a locale placeholder). Calling `src` clears any image set via `content`.

```xml
<image src="/img/logo.png"/>
```

For a locale-dependent image:

```xml
<image src="/img/logo*.png"/>
```

## Content

**Default Value:** `null`

Sets the image content directly from an `org.zkoss.image.Image` object (or a `java.awt.image.RenderedImage`). Use this property when the image is generated at runtime rather than loaded from a static URL. Calling `content` clears any URI set via `src`. The value must be an `org.zkoss.image.Image` instance — wrap raw bytes or streams with `org.zkoss.image.AImage`.

```xml
<zscript><![CDATA[
    import org.zkoss.image.AImage;
    // Assume rawBytes is a byte[] of PNG data
    byte[] rawBytes = java.nio.file.Files.readAllBytes(
        java.nio.file.Paths.get("/path/to/dynamic.png"));
    AImage img = new AImage("dynamic.png", rawBytes);
]]></zscript>
<image content="${img}"/>
```

## Hover

**Default Value:** `null`

{% include supported-since.html version="3.5.0" %}

Sets the URI of the hover image — displayed when the mouse moves over the component. Calling `hover` clears any hover image set programmatically via `setHoverContent`.

```xml
<image src="/img/icon.png" hover="/img/icon-hover.png"/>
```

# Preload Image

{% include supported-since.html version="6.0.0" %}

The feature is applied to all of the LabelImageElement and Image components.

By default the preload function is disabled, so users have to specify the *custom-attributes* to be true. For example,

```xml
<image src="xxx.png">
    <custom-attributes org.zkoss.zul.image.preload="true" />
</image>
```

Or specify just below the root component.

For example,

```xml
<window>
    <custom-attributes org.zkoss.zul.image.preload="true" />
    <button image="xxx.png" />
    <image src="xxx.png" />
</window>
```

As you can see, the *custom-attributes* will be checked recursively

{% include supported-since.html version="6.5.2" %} The feature can also be applied from zk.xml as a library property.

For example,

```xml
<!-- zk.xml -->
<zk>
    <library-property>
        <name>org.zkoss.zul.image.preload</name>
        <value>true</value>
    </library-property>
</zk>
```

# Specifying Alt Attribute

```xml
<zk xmlns:c="client/attribute">
    <image src="/multimedia/zklogo3.png" c:alt="zk logo"/>
</zk>
```

# Supported Events

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Molds

**default**

The standard mold for displaying images. Supports all image formats and features including static URIs, dynamically generated content, and hover effects.

**alphafix** — **Deprecated** — PNG alpha transparency is now handled automatically by ZK. This mold is a legacy no-op and is not recommended for new code.

# Supported Children

`*None`