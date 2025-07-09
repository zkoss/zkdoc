

Here we introduce how to customize the standard themes, such as iceblue,
breeze and silver gray.

# Customize standard themes using theme template

Please see [ZK Developer's Reference/Theming and Styling/Creating Custom Themes/Theme Template]({{site.baseurl}}/zk_dev_ref/theming_and_styling/theme_template).

# Change Font Size and Family

You can use CSS to define the fonts (there are no special config
attributes available/required anymore)

If you want to define the default font family **for all ZK components
only**:

```css
[class*="z-"]:not([class*="z-icon-"]) {
    font-family: Arial;
}
```

If you want to define the default font family for **the whole page
body** (including html native element):

```css
body *:not([class*="z-icon-"]) {
    font-family: Arial;
}
```

# Change Font Size and Family - ZK 6.5 and below

The default theme of ZK components uses the library properties to
control the font size and family. You can change them easily by
specifying different values.

Notice that the library properties control the theme for the whole
application. If you want to provide <i>per-user</i> theme (like zkdemo
does), you have to [ implement a theme provider]({{site.baseurl}}/zk_dev_ref/theming_and_styling/theme_providers).

## Font Size

The default theme uses the following library properties to control the
font sizes.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Default</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>org.zkoss.zul.theme.fontSizeM</p>
</center></td>
<td><center>
<p>12px</p>
</center></td>
<td><p>The default font size. It is used in the most
components.</p></td>
</tr>
<tr class="even">
<td><center>
<p>org.zkoss.zul.theme.fontSizeS</p>
</center></td>
<td><center>
<p>11px</p>
</center></td>
<td><p>The smaller font size used in the component that requires small
fonts, such as <code>toolbar</code>.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>org.zkoss.zul.theme.fontSizeXS</p>
</center></td>
<td><center>
<p>10px</p>
</center></td>
<td><p>The extremely small font size; rarely used.</p></td>
</tr>
<tr class="even">
<td><center>
<p>org.zkoss.zul.theme.fontSizeMS</p>
</center></td>
<td><center>
<p>11px</p>
</center></td>
<td><p>The font size used in the menu items.</p></td>
</tr>
</tbody>
</table>

To change the default value, you can specify the library properties in
`WEB-INF/zk.xml` as follows.

```xml
<library-property>
    <name>org.zkoss.zul.theme.fontSizeM</name>
    <value>12px</value>
</library-property>
<library-property>
    <name>org.zkoss.zul.theme.fontSizeS</name>
    <value>10px</value>
</library-property>
<library-property>
    <name>org.zkoss.zul.theme.fontSizeXS</name>
    <value>9px</value>
</library-property>
```

## Font Family

The following library properties control the font family.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>org.zkoss.zul.theme.fontFamilyT</p></td>
<td><p>Default:
<code>Verdana, Tahoma, Arial, Helvetica, sans-serif</code></p>
<p>The font family used for titles and captions.</p></td>
</tr>
<tr class="even">
<td><p>org.zkoss.zul.theme.fontFamilyC</p></td>
<td><p>Default: <code>Verdana, Tahoma, Arial, serif</code></p>
<p>The font family used for contents.</p></td>
</tr>
</tbody>
</table>

# Add Additional CSS

If you want to customize certain components, you can provide a CSS file
to override the default setting. For example, if you want to customize
the look and feel of the `a` component, you can provide a CSS file with
the following content.

```css
.z-a-disd {
    color: #C5CACB !important;
    cursor: default!important;
    text-decoration: none !important;
}
.z-a-disd:visited, .z-a-disd:hover {
    text-decoration: none !important;
    cursor: default !important;;
    border-color: #D0DEF0 !important;
}
```

Then, specify it in `WEB-INF/zk.xml` as follows.

```xml
 <desktop-config>
     <theme-uri>/css/my.css</theme-uri>
 </desktop-config>
```

For more information, please refer to the [ZK Style Guide](zk_style_guide).
