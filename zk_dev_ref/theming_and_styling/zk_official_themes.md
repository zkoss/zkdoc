

# Overview

This is an overview of the default themes and applicable add-on themes
for each ZK version.

<table>
<thead>
<tr class="header">
<th width="120"></th>
<th width="130"><p>ZK 6.5</p></th>
<th width="130"><p>ZK 7.0</p></th>
<th width="130"><p>ZK 8.0</p></th>
<th width="130"><p>ZK 8.5</p></th>
<th width="130"><p>ZK 8.6</p></th>
<th width="130"><p>ZK 10+</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Default Theme</p></td>
<td><p>Breeze</p></td>
<td><p>Breeze</p></td>
<td><p>Breeze</p></td>
<td><p>Iceblue</p></td>
<td><p>Iceblue</p></td>
<td><p>Iceblue</p></td>
</tr>
<tr class="even">
<td><p>Applicable Themes</p></td>
<td><p>Sapphire Silvertail</p></td>
<td><p>Sapphire<br />
Silvertail<br />
Atlantic</p></td>
<td><p>Sapphire<br />
Silvertail<br />
Atlantic</p></td>
<td><p>Sapphire<br />
Silvertail<br />
Atlantic<br />
ZK Theme Pack</p></td>
<td><p>Iceblue Compact<br />
Sapphire<br />
Silvertail<br />
Atlantic<br />
ZK Theme Pack<br />
Theme Pack Compact</p></td>
<td><p>Iceblue Compact<br />
ZK Theme Pack<br />
Theme Pack Compact</p></td>
</tr>
</tbody>
</table>

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

![ left \| thumb \| 269px \|
Breeze](breeze-look-and-feel.png " left | thumb | 269px | Breeze") ![
left \| thumb \| 269px \|
Sapphire](sapphire-look-and-feel.png " left | thumb | 269px | Sapphire")
![ left \| thumb \| 269px \|
Silvertail](silvertail-look-and-feel.png " left | thumb | 269px | Silvertail")

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

<figure>
<img src="images/atlantic-look-and-feel.png
title=" none | thumb | 300px | Atlantic" />
<figcaption> none | thumb | 300px | Atlantic</figcaption>
</figure>

## Not to Import Google Font

Please refer to [ZK Configuration Reference/zk.xml/The Library
Properties/org.zkoss.theme.atlantic.useGoogleFont.disabled](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.theme.atlantic.useGoogleFont.disabled)

# ZK Theme Pack

ZK Theme Pack ([Live demo](https://www.zkoss.org/zkthemepackdemo/))
contains 23 modern themes, including lite themes, dark themes and
mix-match themes. These themes are designed for ZK 8.5 and later
versions and are compatible with ZK 8.5's default Iceblue theme.

## How to Apply

To apply a theme in the theme pack, your project should include the
theme pack jar first:

``` xml
        <dependency>
            <groupId>org.zkoss.themepack</groupId>
            <artifactId>theme-pack</artifactId>
            <version>${zk.version}</version>
        </dependency>
```

Then apply a theme according to [ZK Developer's Reference/Theming and
Styling/Switching
Themes](ZK_Developer's_Reference/Theming_and_Styling/Switching_Themes).

## Lite themes

Iceblue(**default**), Poppy, Marigold, Olive, Aurora, Lavender

![]({{site.baseurl}}/zk_dev_ref/images/ZK85_Theme_Lite.png)

## Dark themes

Ruby, Amber, Emerald, Aquamarine, Montana, Violet

![]({{site.baseurl}}/zk_dev_ref/images/ZK85_Theme_Dark.png)

## Mix-match

Cheese and Wine, Winter Spring, Blueberry and Raspberry, Macaron, Deep
Sea, Garden Salad, Zen, Mysterious Green, Cardinal, Space Black, Office
and Material

![]({{site.baseurl}}/zk_dev_ref/images/ZK85_Theme_Mix.png)

## Accessibility-ready themes

These themes conform to the WCAG2-compliant contrast level and focus
styles. Note that for WCAG compliance, in addition to using a WCAG
theme, you will also need to include the za11y (zk-accessibility) module
to your project. Read [Developer's
Reference/Accessibility](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Accessibility)
for more information.

![ left \| thumb \| 269px \| WCAG
(Blue)](Wcag_blue.png " left | thumb | 269px | WCAG (Blue)") ![ left \|
thumb \| 269px \| WCAG
Navy](Wcag_navy.png " left | thumb | 269px | WCAG Navy") ![ left \|
thumb \| 269px \| WCAG
Purple](Wcag_purple.png " left | thumb | 269px | WCAG Purple")

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
layout. Learn more at [8.6 New
Features](https://www.zkoss.org/wiki/Small_Talks/2018/November/New_Features_of_ZK_8.6.0#Refresh_Theme_without_Code_Change_-_Compact_Theme).

# Installation

1.  Download the preferred theme.jar file or obtain by maven.
    - Default theme (Breeze or Iceblue) - built-in theme, no need to
      download and register.
    - Sapphire, Silvertail, Atlantic (Deprecated since 10.0.0) - from
      [github](http://github.com/zkoss/zkthemes/releases)
    - ZK Theme Pack - download from [premium
      downloads](https://www.zkoss.org/download/premium#zktheme) or [ZK
      EE maven
      repository](https://www.zkoss.org/wiki/ZK_Installation_Guide/Maven_Setup#PE_.2F_EE_.28premium_users_only.299).
2.  Place theme.jar file under "**projectName/WEB-INF/lib**" folder.
3.  Apply preferred theme by a library property in **zk.xml** file under
    "**projectName/WEB-INF**" folder

<div style="margin-left: 2em">

``` xml
<!-- zk.xml -->
<library-property>
    <name>org.zkoss.theme.preferred</name>
    <value>sapphire</value> <!-- or silvertail, atlantic, deepsea, gardensalad etc. -->
</library-property>
```

</div>

## Theme Artifact

``` xml
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
refer to [Switching
Themes](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling/Switching_Themes)

# Customizing a Theme

To build a custom theme based on a standard ZK theme, read [Customize a
standard
theme](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling/Customizing_Standard_Themes).

Also, reference [Theming and
Styling](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling).

# Version History

| Version | Date         | Content                                              |
|---------|--------------|------------------------------------------------------|
| 10.0.0  | Jan 17, 2023 | Deprecate Breeze, Sapphire, Silvertail, and Atlantic |
