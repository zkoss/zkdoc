# Overview

You can customize a widget's appearance with CSS. But if its DOM
structure doesn't fulfill your requirements, for example, you want to:

- render one more element, `<i/>`, to show an icon
- render some elements in a different position

Then you need to create a custom [
mold](ZK_Developer%27s_Reference/Theming_and_Styling/Molds)
to render different DOM elements.

# Create Mold js

## Get Built-in Mold js

It's better to customize a mold based on the built-in mold js. All
widgets' mold js are bundled with ZK jar files under the path:

`[ZK_JAR] / web / js / [WIDGET_PACKAGE] / mold / *.js`

- `[ZK_JAR]`: could be `zul.jar, zkex.jar, zkmax.jar`
- `[WIDGET_PACKAGE]`: a widget's package folder like java package e.g.
  the mold js of `zul.messh.paging` is at `zul/mesh`
- `*.js`: file name is the widget name e.g. `paging.js`

Copy the built-in mold js to your project's same path and rename to a
readable name, e.g. in a maven project, you need to put `paging.js`
under:

`src/main/resources/web/js/zul/mesh/mold/paging-tooltip.js`

## Modify Mold

After mold js is ready, you can start to modify it. You can use
[Template
literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
to improve the readability (IE not supported).

# Register Custom Mold

With a mold js, you still need to register this custom mold on the
component. So you need to create a [
lang-addon.xml](ZK_Client-side_Reference/Language_Definition#Language_Addon)
and [ register the custom
mold](ZK_Client-side_Reference/Language_Definition/component#Custom_Mold).

# Apply Custom Mold

Specify the mold name you register in `lang-addon.xml` on target
component's `mold` attribute.

``` xml
<paging mold="tooltip"/>
```
