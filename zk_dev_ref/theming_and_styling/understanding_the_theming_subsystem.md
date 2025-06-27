The collection of the components' stylesheets and associated images is
called a theme. Themes control the overall look and feel of a page
composed of ZK components. For example, the components using the
standard sapphire theme will all follow the same blue-ish color scheme.

Starting from ZK 6.5.2, supporting different themes takes a more
modularized approach. **Theme Support Subsystem** breaks up into a few
pluggable modules: **ThemeRegistry**, **ThemeResolver**, and
**ThemeProvider**. ThemeRegistry keeps track of a list of available
themes to use. ThemeResolver is responsible for setting and obtaining
the current theme. ThemeProvider allows web developers to manipulate the
CSS stylesheets actually employed to style the UI components.
Customizing these modules enables web developers to modify any part of
the theme processing pipeline to fit their particular requirement.

**Theme Support Subsystem** is illustrated by the figure below. In
addition to the three pluggable modules, there also exist facilities to
encapsulate theme information and resolve URLs for locating theme
resources.

Please refer to the subsections for more information on the constituent
parts.

![]({{site.baseurl}}/zk_dev_ref/images/themesubsystem.png)
