

# Overview

This is an overview of the default themes and applicable add-on themes
for each ZK version.

| | ZK 6.5 | ZK 7.0 | ZK 8.0 | ZK 8.5 | ZK 8.6 | ZK 10+ |
|---|--------|--------|--------|--------|--------|--------|
| Default Theme | Breeze | Breeze | Breeze | Iceblue | Iceblue | Iceblue |
| Applicable Themes | Sapphire Silvertail | Sapphire<br/>Silvertail<br/>Atlantic | Sapphire<br/>Silvertail<br/>Atlantic | Sapphire<br/>Silvertail<br/>Atlantic<br/>ZK Theme Pack | Iceblue Compact<br/>Sapphire<br/>Silvertail<br/>Atlantic<br/>ZK Theme Pack<br/>Theme Pack Compact | Iceblue Compact<br/>ZK Theme Pack<br/>Theme Pack Compact |

- Theme pack contains 23 themes.
- Theme Pack Compact contains 23 compact themes.

# Trendy Design Themes (Deprecated): Breeze, Sapphire, Silvertail

Trendy design emphasizes on gradient background, rounded corners and
shadow effects. **Breeze** is a greyish based theme that supports
desktop and tablet, **sapphire** is a blueish based theme that supports
desktop only and **silvertail** is a silverish based theme that also
support desktop only.

See below to take a quick view at the look and feel of Breeze, Sapphire
and Silvertail, click image to view original size.

![](/zk_dev_ref/images/Breeze-look-and-feel.png) 
![](/zk_dev_ref/images/Sapphire-look-and-feel.png)
![](/zk_dev_ref/images/Silvertail-look-and-feel.png)

<div style="clear: both">
</div>

# Flat Design Theme (Deprecated): Atlantic

On the contrary, flat design replaces skeuomorphism (gradient
background, rounded corner and shadow effect) with simplicity and visual
clarity to communicate. It is easy to create and customize a new theme
based on this design. **Atlantic** is a blueish based theme that
supports both desktop and tablets.

See below to take a quick view at the look and feel of **Atlantic**,
click image to view original size.

![](/zk_dev_ref/images/atlantic-look-and-feel.png)

## Not to Import Google Font

Please refer to [ZK Configuration Reference/zk.xml/The Library Properties/org.zkoss.theme.atlantic.useGoogleFont.disabled]({{site.baseurl}}/zk_config_ref/org_zkoss_theme_atlantic_usegooglefont_disabled)

# ZK Theme Pack

ZK Theme Pack ([Live demo](https://www.zkoss.org/zkthemepackdemo/))
contains 23 modern themes, including lite themes, dark themes and
mix-match themes. These themes are designed for ZK 8.5 and later
versions and are compatible with ZK 8.5's default Iceblue theme.

## How to Apply

To apply a theme in the theme pack, your project should include the
theme pack jar first:

```xml
        <dependency>
            <groupId>org.zkoss.themepack</groupId>
            <artifactId>theme-pack</artifactId>
            <version>${zk.version}</version>
        </dependency>
```

Then apply a theme according to [ZK Developer's Reference/Theming and Styling/Switching Themes]({{site.baseurl}}/zk_dev_ref/theming_and_styling/switching_themes).

## Lite themes

Iceblue(**default**), Poppy, Marigold, Olive, Aurora, Lavender

![]({{site.baseurl}}/zk_dev_ref/images/zk85_theme_lite.png)

## Dark themes

Ruby, Amber, Emerald, Aquamarine, Montana, Violet

![]({{site.baseurl}}/zk_dev_ref/images/zk85_theme_dark.png)

## Mix-match

Cheese and Wine, Winter Spring, Blueberry and Raspberry, Macaron, Deep
Sea, Garden Salad, Zen, Mysterious Green, Cardinal, Space Black, Office
and Material

![]({{site.baseurl}}/zk_dev_ref/images/ZK85_Theme_Mix.png)

## Accessibility-ready themes

These themes conform to the WCAG2-compliant contrast level and focus
styles. Note that for WCAG compliance, in addition to using a WCAG
theme, you will also need to include the za11y (zk-accessibility) module
to your project. Read [Developer's Reference/Accessibility]({{site.baseurl}}/zk_dev_ref/accessibility/accessibility)
for more information.

![ left \| thumb \| 269px \| WCAG (Blue)](wcag_blue.png)

<div style="clear: both">
</div>

# ZK Theme Pack Compact

The breeze-compatible compact variant for ZK Theme Pack Theme is
introduced since 8.6.0 allowing developers to upgrade their existing
breeze/sapphire/silvertail-themed applications to a modern theme with
the minimum code change. Each theme in the theme pack has a
corresponding compact theme. The compact themes have smaller font size,
padding, margin, but keep the same color design. it's more suitable for
migrating from an old theme like breeze without breaking the page
layout. Learn more at [8.6 New Features](https://www.zkoss.org/wiki/Small_Talks/2018/November/New_Features_of_ZK_8.6.0#Refresh_Theme_without_Code_Change_-_Compact_Theme).

# Installation

1.  Download the preferred theme.jar file or obtain by maven.
    - Default theme (Breeze or Iceblue) - built-in theme, no need to
      download and register.
    - Sapphire, Silvertail, Atlantic (Deprecated since 10.0.0) - from
      [github](http://github.com/zkoss/zkthemes/releases)
    - ZK Theme Pack - download from [premium downloads](https://www.zkoss.org/download/premium#zktheme) or [ZK EE maven repository]({{site.baseurl}}/zk_installation_guide/maven_setup#PE_.2F_EE_.28premium_users_only.299).
2.  Place theme.jar file under "**projectName/WEB-INF/lib**" folder.
3.  Apply preferred theme by a library property in **zk.xml** file under
    "**projectName/WEB-INF**" folder

<div style="margin-left: 2em">

```xml
<!-- zk.xml -->
<library-property>
    <name>org.zkoss.theme.preferred</name>
    <value>sapphire</value> <!-- or silvertail, atlantic, deepsea, gardensalad etc. -->
</library-property>
```

</div>

## Theme Artifact

```xml
      <dependency>
        <groupId>org.zkoss.theme</groupId>
        <artifactId>breeze</artifactId>
        <version>${zk.version}</version>
      </dependency>
      <dependency>
        <groupId>org.zkoss.theme</groupId>
        <artifactId>atlantic</artifactId>
        <version>${zk.version}</version>
      </dependency>
      <dependency>
        <groupId>org.zkoss.theme</groupId>
        <artifactId>sapphire</artifactId>
        <version>${zk.version}</version>
      </dependency>
      <dependency>
        <groupId>org.zkoss.theme</groupId>
        <artifactId>silvertail</artifactId>
        <version>${zk.version}</version>
      </dependency>
      <dependency>
        <groupId>org.zkoss.themepack</groupId>    <!-- >=8.6.1   -->
        <!--<groupId>org.zkoss.theme</groupId>--> <!-- <=8.6.0.1 -->
        <artifactId>theme-pack</artifactId>
        <version>${zk.version}</version>
      </dependency>
```

## All Theme Names of Theme Pack

1.  iceblue
2.  amber
3.  aquamarine
4.  aurora
5.  blueberryandraspberry
6.  cardinal
7.  cheeseandwine
8.  deepsea
9.  emerald
10. gardensalad
11. lavender
12. macaron
13. marigold
14. material
15. montana
16. mysteriousgreen
17. office
18. olive
19. poppy
20. ruby
21. spaceblack
22. violet
23. winterspring
24. zen
25. wcag
26. wcag_navy
27. wcag_purple

### Compact Theme Name

Append the name with **\_c** gives you the theme name of the compact
variant. For example:

iceblue ---\> **iceblue_c**

# Switching Themes

You can include multiple themes in the same application and allow your
end-users to choose their preferred themes. For more information please
refer to [Switching Themes]({{site.baseurl}}/zk_dev_ref/theming_and_styling/switching_themes)

# Customizing a Theme

To build a custom theme based on a standard ZK theme, read [Customize a standard theme]({{site.baseurl}}/zk_dev_ref/theming_and_styling/customizing_standard_themes).

Also, reference [Theming and Styling]({{site.baseurl}}/zk_dev_ref/theming_and_styling/theming_and_styling).

# Version History

| Version | Date         | Content                                              |
|---------|--------------|------------------------------------------------------|
| 10.0.0  | Jan 17, 2023 | Deprecate Breeze, Sapphire, Silvertail, and Atlantic |
