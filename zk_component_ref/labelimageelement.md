---
title: "LabelImageElement"
description: "LabelImageElement: The LabelImageElement is an HTML element that combines label and image content."
---

- **Java API:** [`org.zkoss.zul.impl.LabelImageElement`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelImageElement.html)

# Employment/Purpose

The LabelImageElement is an HTML element that combines label and image content. It provides a way to display textual content alongside an image within the user interface.

# Preload Image

{% include supported-since.html version="6.0.0" %}

The preload image feature enables images to load before rendering, applicable to all LabelImageElement and Image component instances. By default, image preloading is disabled. Enable it explicitly by setting the `org.zkoss.zul.image.preload` custom attribute to `true`.

### Enable Preload on a Specific Component

```xml
<button image="xxx.png">
  <custom-attributes org.zkoss.zul.image.preload="true"/>
</button>
```

### Enable Preload at Window Level

```xml
<window>
  <custom-attributes org.zkoss.zul.image.preload="true"/>
  <button image="xxx.png"/>
  <image src="xxx.png"/>
</window>
```

In both examples, the `custom-attributes` are recursively checked based on the [`org.zkoss.zk.ui.ext.Scope`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/Scope.html) specification.

### Configure Globally via zk.xml

{% include supported-since.html version="6.5.2" %}

```xml
<!-- zk.xml -->
<zk>
    <library-property>
        <name>org.zkoss.zul.image.preload</name>
        <value>true</value>
    </library-property>
</zk>
```

# Properties

These properties are inherited by components that extend `LabelImageElement` (e.g. `<button>`, `<toolbarbutton>`). The examples below use `<button>` as a representative concrete component.

## Image

Specifies the URI of the image to display on the element. Accepts a path relative to the web application context.

```xml
<button image="/img/logo.png"/>
```

## ImageContent

{% include supported-since.html version="3.0.7" %}

Sets the image content directly with a dynamically generated `org.zkoss.image.Image` (or a `java.awt.image.RenderedImage`) instead of a URI. This is typically assigned from a controller rather than in ZUL; the EL example below binds a generated image.

```xml
<button imageContent="${myImage}"/>
```

## HoverImage

{% include supported-since.html version="3.5.0" %}

Specifies the URI of an image that is displayed when the mouse hovers over the element. When the mouse moves away, the normal `image` is shown again.

```xml
<button hoverImage="/img/hover.png"/>
```

## HoverImageContent

{% include supported-since.html version="5.0.8" %}

Sets the hover image content directly with a dynamically generated `org.zkoss.image.Image` (or a `java.awt.image.RenderedImage`) instead of a URI. This is typically assigned from a controller rather than in ZUL; the EL example below binds a generated image.

```xml
<button hoverImageContent="${hoverImg}"/>
```

## IconSclass

Specifies a single built-in icon font style class to style the displayed icon. For more information on available icon classes, refer to the [ZK Font Awesome documentation]({{site.baseurl}}/zk_dev_ref/integration/font_awesome). If `iconSclasses` is set, `iconSclass` is ignored.

```xml
<button iconSclass="z-icon-star"/>
```

## IconSclasses

{% include supported-since.html version="10.0.0" %}

Specifies multiple icon font style classes (a space-separated list). If `iconSclasses` is set, `iconSclass` is ignored: `iconSclasses` takes precedence over `iconSclass`. For more information on available icon classes, refer to the [ZK Font Awesome documentation]({{site.baseurl}}/zk_dev_ref/integration/font_awesome).

```xml
<button iconSclasses="z-icon-star z-icon-lg"/>
```

## IconTooltip

{% include supported-since.html version="10.0.0" %}

Specifies the tooltip text shown for the icon. If `iconTooltips` is set, `iconTooltip` is ignored: `iconTooltips` takes precedence over `iconTooltip`.

```xml
<button iconSclass="z-icon-star" iconTooltip="Favorite"/>
```

## IconTooltips

{% include supported-since.html version="10.0.0" %}

Specifies multiple icon tooltips, one per icon (a space-separated list aligned with `iconSclasses`). If `iconTooltips` is set, `iconTooltip` is ignored: `iconTooltips` takes precedence over `iconTooltip`.

```xml
<button iconSclasses="z-icon-star z-icon-bell" iconTooltips="Favorite Notify"/>
```

# Supported Children

`*ALL`: Allows encoding any ZK component as its child.
