# Font Awesome Bundled

Starting from ZK 7.0.0 integrates [Font Awesome
4.0.1](https://fontawesomelib.com/releases/4.0.1/list/all/index.html)
with the prefix **z-icon**. You don't need to manually include Font
Awesome CSS because it's already packaged with ZK jar.

# Basic Usage

To use it, just specify a built-in CSS class at the `iconSclass`
attribute. All subclasses of
[LabelImageElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelImageElement.html)
(e.g. button) and some components with an icon (e.g. combobox, bandbox)
support `iconSclass`. Some components have attributes that contain
"iconSclass" e.g. `errorboxIconSclass` or `overflowPopupIconSclass` For
a complete list of icon CSS classes, please refer to [FontAwesome
Cheatsheet](http://fontawesome.io/cheatsheet/).

For example, to add a home icon on a Button,

``` xml
    <button iconSclass="z-icon-home" />
```

If you want to use other Font Awesome functions such as the animation
icon, you can include the external Font Awesome CSS link and add the CSS
class to iconSclass. For example,

``` xml
<?link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css" rel="stylesheet"?>
    <button iconSclass="z-icon-bell fa-spin" />
    <button iconSclass="z-icon-home fa-2x fa-rotate-90" />
```

ZK 8.0.0 integrates Font Awesome 4.3.0. Also, with ZK 8 there is no need
to include an external font awesome CSS link to use an animation icon.
Therefore the example above becomes

``` xml
    <button iconSclass="z-icon-bell z-icon-spin" />
    <button iconSclass="z-icon-home z-icon-2x z-icon-rotate-90" />
```

ZK 8.5.2 integrates [Font Awesome
4.7.0](https://fontawesome.com/v4.7.0/icons/).

ZK 10.0.0 integrates [Font Awesome 6.4.2 free
icons](https://fontawesome.com/v6/search?o=r&m=free) and supports both
Font Awesome 4 syntax and Font Awesome 6 syntax with styles specified:

``` xml
    <!--Font Awesome 4 syntax-->
    <button iconSclass="z-icon-bell" />
    <!--Font Awesome 6 syntax-->
    <button iconSclass="z-icon-bell z-icon-solid" />
    <button iconSclass="z-icon-bell z-icon-regular" />
```

# IconTooltip

The iconTooltip attribute is introduced for adding a tooltip to an icon.

``` xml
    <button iconSclass="z-icon-home" iconTooltip="home"/>
```

# Multiple icons and tooltips

One LabelImageElement can have multiple icons and tooltips set using
Java API:

``` java
    e.setIconSclasses(new String[] {"z-icon-home", "z-icon-podcast"});
    e.setIconTooltips(new String[] {"tooltip1", "tooltip2"});
```

Please note that this is only supported through Java API but not Zul
attributes.

# Not Supported Usages

The following usages mentioned in [Font Awesome official
document](https://fontawesome.com/docs/web/) are not supported:

- Duotone
- Stacking icons
- Layering Text & Counters
- Power Transforms

# Use Other Icons

The iconSclass not only applies to font awesome icons ("z-icon-"
classes): Any css class can be applied to customize. Notice you need to
manually include related CSS or font file. For example, the bootstrap
glyphicons can be used here too:

``` xml
    <button iconSclass="glyphicon glyphicon-envelope" />
```

Since the web font is loaded after the character is being displayed if
there is no cache, ZK doesn't know if the web font is ready when
initializing. Therefore using `hflex="min"` with iconSclass may not get
the desired result. Moreover, the final width of icons might not be the
same. To make the width of icons always be fixed, add `z-icon-fw`.

``` xml
    <button iconSclass="z-icon-fw z-icon-home" />
    <button iconSclass="z-icon-fw z-icon-bell z-icon-spin" />
```
