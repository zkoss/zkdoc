---
title: "org.zkoss.theme.marble.brand"
description: "org.zkoss.theme.marble.brand: Sets the default brand color of the Marble theme for the whole application, using a preset name or a hex color."
---

**Property:** org.zkoss.theme.marble.brand

{% include global-scope-only.html %}
{% include supported-since.html version="11.0.0" %}

Default: none (Marble's default blue)

Sets the default brand color of the [Marble theme]({{site.baseurl}}/zk_style_customization_guide/marble_theme#brand-color) for the whole application. Allowed values (case-insensitive, surrounding spaces are ignored):

* a preset name: `default`, `slate` or `copper`.
* a hex color: `#rgb` or `#rrggbb`.

```xml
<library-property>
    <name>org.zkoss.theme.marble.brand</name>
    <value>#0a7d5a</value>
</library-property>
```

* With a preset name, ZK renders `data-brand="slate"` on the `<html>` element.
* With a hex color, ZK renders `<style>:root{--zk-color-primary:#0a7d5a}</style>` right after the theme stylesheets.

Both are sent with the page, so the first paint already uses the brand color (no flash). The property can also be set as a Java system property, for example `-Dorg.zkoss.theme.marble.brand=slate`. An invalid value is logged as a warning and ignored.

# Precedence

From the weakest to the strongest:

1. This library property
2. `<?root-attributes data-brand="..."?>` in the page
3. CSS loaded by the page's own `<?link?>`
4. Runtime calls to `MarbleBrand.apply(...)`

# Scope

This property only takes effect when the ZUL page itself renders the whole HTML document. If the ZUL page is included by another page, embedded in a JSP or another template, or uses zhtml's `<html>` as its root element, the `<html>` tag is written by you. In these cases, add the `data-brand` attribute to your own `<html>` tag for a preset, or load a CSS file that sets `--zk-color-primary` through a theme URI for a hex color.

# Light Brand Colors

{% include supported-since.html version="11.0.0" %}

`--zk-color-on-primary` (the text color on solid primary surfaces such as a filled button) is always white. If you set a light brand color, for example yellow `#ffd400`, the white text falls below the WCAG AA contrast ratio. Choose one of the following:

* Pick a medium to dark brand color. The built-in `default` (blue), `slate` and `copper` presets are all fine.
* Override `--zk-color-on-primary` with a dark color in your CSS (for example, loaded by a theme URI):

```css
:root {
    --zk-color-on-primary: #1a1a1a;
}
```

* Paint filled buttons with the `z-bg-primary` class, which darkens a light brand color enough for white text.

ZK does not choose white or black text automatically. This is intentional.

See [Marble Brand Color]({{site.baseurl}}/zk_style_customization_guide/marble_theme#light-brand-colors) for details.
