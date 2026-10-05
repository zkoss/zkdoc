---
title: "org.zkoss.theme.marble.density"
description: "org.zkoss.theme.marble.density: Sets the default density of the Marble theme for the whole application, either comfortable or compact."
---

**Property:** org.zkoss.theme.marble.density

{% include global-scope-only.html %}
{% include supported-since.html version="11.0.0" %}

Default: `comfortable`

Sets the default density of the [Marble theme]({{site.baseurl}}/zk_style_customization_guide/marble_theme#density) for the whole application. Allowed values (case-insensitive, surrounding spaces are ignored):

* `comfortable`: the default density.
* `compact`: tighter control heights, row heights and cell padding, for data-dense applications.

```xml
<library-property>
    <name>org.zkoss.theme.marble.density</name>
    <value>compact</value>
</library-property>
```

ZK renders `data-density="compact"` on the `<html>` element together with the page, so the first paint is already compact (no flash). The property can also be set as a Java system property, for example `-Dorg.zkoss.theme.marble.density=compact`. An invalid value is logged as a warning and ignored.

# Precedence

From the weakest to the strongest:

1. This library property
2. `<?root-attributes data-density="..."?>` in the page
3. CSS loaded by the page's own `<?link?>`
4. Runtime calls to `MarbleDensity.apply(...)`

# Scope

This property only takes effect when the ZUL page itself renders the whole HTML document. If the ZUL page is included by another page, embedded in a JSP or another template, or uses zhtml's `<html>` as its root element, the `<html>` tag is written by you. In these cases, add the `data-density="compact"` attribute to your own `<html>` tag.

See [Marble Density]({{site.baseurl}}/zk_style_customization_guide/marble_theme#density) for details.
