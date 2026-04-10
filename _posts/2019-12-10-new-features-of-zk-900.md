---
author: hawk
date: 2019-12-10
version: "9.0.0"
category: small-talk
title: "New Features of ZK 9.0.0"
---

# Introduction

**"Easy"**, **"Ajax without Javascript"** and **"Rich Components"** are
the 3 top rated ZK values by the community since day one. ZK 9 carries
on with the same drive and brings you 20+ new features and components
such as Toast, Stepbar, Rangeslider, Drawer, Inputgroup, Anchornav,
Linelayout, and more — making development even easier than ever.

ZK 9 requires **Java 8** to compile, so please make sure you are with
Java SE 8 or later versions. If you are coming from an older ZK version,
remember to check out the [Upgrade Tips](#upgrade-tips) at the end of the page.

For more information please refer to the [Release Notes](https://www.zkoss.org/product/zk/releasenote/9.0.0).

# Upgrade to JDK 8

{% include edition-availability.html edition="ce" %}

## ZK Now Requires Java SE 8 or Later

The Java compiler source/target has been updated to Java 8, meaning the
Java binary-compatible level is now Java 8 instead of Java 6. Please
make sure to use Java 8 or later Java versions.

## Support JDK 8 Date/Time API

Datebox, Calendar, Timebox and Timepicker components now support JDK 8
Date/Time API. Their constructors and setters now accept JDK 8 Date/Time
and the getters can return JDK 8 Date/Time type. For example `Datebox`
supports the following constructors:

```java
org.zkoss.zul.Datebox#Datebox(java.util.Date)
org.zkoss.zul.Datebox#Datebox(java.time.LocalDate)
org.zkoss.zul.Datebox#Datebox(java.time.LocalDateTime)
org.zkoss.zul.Datebox#Datebox(java.time.LocalTime)
org.zkoss.zul.Datebox#Datebox(java.time.ZonedDateTime)
```

For details, please refer to the Javadoc:
[Datebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Datebox.html),
[Timebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Timebox.html),
[Calendar](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Calendar.html),
[Timepicker](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Timepicker.html)

# Support CSS3 Flex

{% include edition-availability.html edition="ce" %}

ZK 9 implements hflex/vflex in a whole new, more performant way — using [CSS3
flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox),
which is natively supported by modern browsers. With this change,
JavaScript size calculation is eliminated, improving client-side
performance. This change should be transparent for developers.

However, if your application depends on the previous implementation, you
can fall back by adding the property below in `zk.xml`:

```xml
<library-property>
    <name>org.zkoss.zul.css.flex</name>
    <value>true</value>
</library-property>
```

For more details, see the [configuration reference](https://www.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zul.css.flex).

# Embed ZK App into an External App

{% include edition-availability.html edition="ee" %}

Instead of using an iframe, ZK 9 introduces a new way to embed your ZK
application into an external application such as a NodeJS or Python-based
web page. By using ZK Client Binding in JavaScript, you can also control
ZK components from these external apps.

This feature makes it easy to combine ZK with other front-end frameworks
and leverage the best of both worlds. For more details, see [Embedded ZK Application](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/Integration/Miscellenous/Embedded_ZK_Application).

# New Input Components

## [Inputgroup](https://www.zkoss.org/wiki/ZK_Component_Reference/Containers/Inputgroup)

{% include edition-availability.html edition="ce" %}

With the new `Inputgroup` component, you can prepend or append labels,
buttons, checkboxes, or radio buttons to your input components to create
a custom input group.

![Inputgroup]({{site.baseurl}}/assets/images/small-talk/inputgroup_small.png)

## [Tristate Checkbox](https://www.zkoss.org/wiki/ZK_Component_Reference/Input/Checkbox#tristate)

{% include edition-availability.html edition="ce" %}

Since ZK 8.6, the indeterminate state of a checkbox could be displayed.
In ZK 9, users can now also *set* the indeterminate state, in addition to
checked and unchecked. Specify `mold="tristate"` to enable the tri-state checkbox.

## [Rangeslider](https://www.zkoss.org/wiki/ZK_Component_Reference/Input/Rangeslider)

{% include edition-availability.html edition="pe" %}

An enhanced slider that allows users to select a range between a specified
upper and lower bound.

![Rangeslider]({{site.baseurl}}/assets/images/small-talk/rangeslider.png)

## [Multislider](https://www.zkoss.org/wiki/ZK_Component_Reference/Input/Multislider)

{% include edition-availability.html edition="ee" %}

Multislider provides multiple handles for specifying the range and
boundaries of multiple segments.

![Multislider]({{site.baseurl}}/assets/images/small-talk/multislider.png)

## [Searchbox](https://www.zkoss.org/wiki/ZK_Component_Reference/Input/Searchbox)

{% include edition-availability.html edition="ee" %}

Searchbox allows users to select one or more entries from a list and
filter the list to find the target entry.

## [Cascader](https://www.zkoss.org/wiki/ZK_Component_Reference/Input/Cascader)

{% include edition-availability.html edition="ee" %}

Cascader is a cascading input control for multi-level input, such as an
address input that allows users to drill down and select Country > State > City.

![Cascader]({{site.baseurl}}/assets/images/small-talk/cascader.gif)

# New Navigation Components

## [Anchornav](https://blog.zkoss.org/2019/08/29/anchornav-a-new-zk-addon-for-scrolling-within-a-page/)

{% include edition-availability.html edition="pe" %}

Anchornav allows you to navigate to desired ZK components on a page and
highlights the current navigation link based on the current scroll position.

## [Stepbar](https://www.zkoss.org/wiki/ZK_Component_Reference/Supplementary/Stepbar)

{% include edition-availability.html edition="ee" %}

Stepbar displays the progress in a workflow and allows you to dynamically
add or remove steps.

# New Layout Components

## [Linelayout](https://www.zkoss.org/wiki/ZK_Component_Reference/Layouts/Linelayout)

{% include edition-availability.html edition="ee" %}

Linelayout is useful for presenting events that happen across different
timelines. It is available in both vertical and horizontal orientations.

![Linelayout]({{site.baseurl}}/assets/images/small-talk/linelayout.png)

## [Drawer](https://www.zkoss.org/wiki/ZK_Component_Reference/Containers/Drawer)

{% include edition-availability.html edition="ee" %}

Drawer is a panel that attaches to one of the four sides of your web page.
Like a desk drawer, it can be collapsed to stay out of view or opened to
display additional content.

![Drawer]({{site.baseurl}}/assets/images/small-talk/drawer.gif)

## [Kanban-style Portal Layout](https://www.zkoss.org/wiki/ZK_Component_Reference/Layouts/Portallayout/Portalchildren#Title)

{% include edition-availability.html edition="ee" %}

Portal Layout now provides `PortalChildren` title and frame design, making
it easy to create a Kanban-style board layout.

![Kanban]({{site.baseurl}}/assets/images/small-talk/kanban.png)

# More New Components

## [PDFViewer](https://www.zkoss.org/wiki/ZK_Component_Reference/Multimedia_and_Miscellaneous/Pdfviewer)

{% include edition-availability.html edition="pe" %}

PDFViewer lets users view PDF documents inside a ZK application without
leaving the browser. It includes controls for zoom in/out, rotate, and
page navigation.

## [Loading Bar](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/UI_Patterns/Useful_Java_Utilities#Loadingbar)

{% include edition-availability.html edition="ee" %}

A modern, lightweight loading animation that indicates progress. It can
be placed at the top or bottom of the page. You can configure its value
(progress percentage), position, and whether to use an indeterminate animation.

Loading progress:
![Loading bar progress]({{site.baseurl}}/assets/images/small-talk/loadingbar.gif)

Indeterminate:
![Loading bar indeterminate]({{site.baseurl}}/assets/images/small-talk/loadingbar2.gif)

## [Toast](https://www.zkoss.org/wiki/ZK_Developer's_Reference/UI_Patterns/Useful_Java_Utilities#Toast)

{% include edition-availability.html edition="ee" %}

Toast is a stackable notification that can be pinned on the screen.

## [Coachmark](https://www.zkoss.org/wiki/ZK_Component_Reference/Supplementary/Coachmark)

{% include edition-availability.html edition="ee" %}

Coachmark guides users to focus on a specific component on the page. Using
the `next` attribute, it can lead to the next coachmark to walk users through
a sequence of steps. Coachmarks accept both text and ZK components as content.

![Coachmark]({{site.baseurl}}/assets/images/small-talk/coachmark.png)

# Enhancements

## New ZK Less Engine

{% include edition-availability.html edition="ce" %}

The `zkless-engine-maven-plugin` has been replaced by the
[zkless-engine](https://www.npmjs.com/package/zkless-engine) npm module
([GitHub](https://github.com/zkoss/zkless-engine)). It provides a
command-line interface (CLI) that significantly reduces theme build times
and improves development turnaround with an incremental watch compiler and
live browser reloading.

This CLI can be invoked directly or integrated into Maven or Gradle builds,
making the older maven plugin obsolete. See the
[README](https://github.com/zkoss/zkless-engine/blob/master/README.md) for details.

When upgrading a theme to ZK 9, you need to escape ZK-specific syntax
using the [escape (e) function](http://lesscss.org/functions/#string-functions-e).
See [this commit](https://github.com/zkoss/zkThemeTemplate/commit/bb3de98705f946a1963a631e72c4f274d6e5005d)
for an example of upgrading ZK's default styles.

## Upgrade to jQuery 1.12.4

{% include edition-availability.html edition="ce" %}

The underlying jQuery version is upgraded to **1.12.4** to include security fixes.

# Upgrade Tips

- The Java binary-compatible level is Java 8 since ZK 9.
- ZK Databinding 1 is moved to a legacy module `zkplus-legacy`.
- ZK DSP Library is moved to a new module `zweb-dsp`.
- `SimpleLocalTimeConstraint` is used by default instead of `SimpleConstraint` in Timebox and Timepicker.
- Use `Notification.show` instead of `Clients.showNotification`, as the former follows single responsibility principle.
- Custom themes based on [zkThemeTemplate](https://github.com/zkoss/zkThemeTemplate) need to merge the latest changes (see [New ZK Less Engine](#new-zk-less-engine)).
