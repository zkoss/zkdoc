---
author: jameschu
date: 2026-11-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Avatars, Badges & More for Modern UIs"
---

**Show team members, highlight notifications, and make filters and navigation easier to use with seven new ZK components.**

## Modern UI Details, Ready to Use

Avatars, notification badges, and removable filter chips give applications a more modern look while making useful information easier to spot. Users can see who is involved, what needs attention, and which filters are active without reading through additional text.

ZK 11 introduces Avatar, Avatargroup, Badge, Chip, Breadcrumb, Confirmpopup, and Carousel. Together, they provide ready-made components for these familiar UI patterns, reducing the custom markup, styling, and interaction code needed to build them.

All seven are included in ZK Community Edition and work with standard ZUL, Java, and MVVM.

## Identity, Counts, and Filters

Avatar shows a person or object using an image, icon, or initials. Avatargroup overlaps several avatars and can collapse additional members into a compact +N indicator. These components fit project teams, approver lists, account menus, and comment threads.

```xml
<avatargroup maxItems="3" size="small">
    <avatar image="/img/amy.jpg" label="AC"/>
    <avatar label="BL"/>
    <avatar label="CM"/>
    <avatar label="DN"/>
</avatargroup>
```

![ZK Avatar components in several sizes and colors, followed by an overlapping Avatargroup.](/assets/images/small-talk/zk11-sneak-peek/avatar_group.png)

Badge adds a count or dot indicator to a control. Chip presents a category, state, or active filter and can be closable when users may remove it.

```xml
<badge count="5" placement="top_right">
    <button iconSclass="z-icon-bell"/>
</badge>

<chip label="Pending review" severity="warning"/>
<chip label="Taipei" rounded="true" closable="true"/>
```

![Notification badges and status chips shown in several styles and severity colors.](/assets/images/small-talk/zk11-sneak-peek/badge_and_chip.png)

## Navigation and Confirmation

Breadcrumb shows the current location in a hierarchy. maxItems collapses the middle of a long path while keeping the beginning and current location visible.

```xml
<breadcrumb maxItems="3"
            separator="icon:z-icon-chevron-right">
    <breadcrumbitem label="Home" href="/"/>
    <breadcrumbitem label="Products" href="/products"/>
    <breadcrumbitem label="Frameworks"/>
    <breadcrumbitem label="ZK"/>
</breadcrumb>
```

![A ZK Breadcrumb showing a hierarchical navigation path with separators and collapsed middle items.](/assets/images/small-talk/zk11-sneak-peek/breadcrumb.png)

Confirmpopup asks for confirmation next to the action that opened it. It keeps the user in context and supports severity, placement, icons, and default focus.

```xml
<button label="Delete" onClick="confirm.open(self)"/>
<confirmpopup id="confirm" severity="error"
              title="Confirm delete"
              message="This cannot be undone. Continue?"
              defaultFocus="cancel"
              onOK="@command('delete')"/>
```

![A contextual confirmation popup anchored to a delete button, with Cancel and Delete actions.](/assets/images/small-talk/zk11-sneak-peek/confirmpopup.png)

## Featured Content and Guided Steps

Carousel displays one Carouselitem at a time. It supports arrows, indicators, keyboard control, horizontal or vertical orientation, autoplay, and slide or fade transitions.

A Carouselitem can contain normal ZK components, not only an image. It can therefore present announcements, onboarding steps, promotions, or account summaries with buttons and bound content.

```xml
<carousel autoplay="true" interval="5000" pause="true">
    <carouselitem label="Quarterly update">
        <label value="Revenue grew 12% this quarter."/>
    </carouselitem>
    <carouselitem label="New workflow">
        <button label="Take the tour"/>
    </carouselitem>
</carousel>
```

![A ZK Carousel showing featured content with navigation arrows and slide indicators.](/assets/images/small-talk/zk11-sneak-peek/carousel.png)

## More UI Options, Less Integration Work

ZK 11 expands its enterprise UI toolkit with modern components for user profiles, notifications, filters, navigation, and featured content. These additions make it easier to build more visually engaging interfaces alongside ZK’s established data and form components.

Because they are ready-to-use ZK components, developers can add them in ZUL and connect them to existing Java code or MVVM bindings, without integrating a separate UI library or building each interaction from scratch.

## Summary

The ZK 11 component set includes:

- Avatar and Avatargroup for compact visual identity

- Badge and Chip for counts, status, categories, and filters

- Breadcrumb for hierarchical navigation

- Confirmpopup for contextual confirmation

- Carousel for announcements, onboarding, and featured content

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview Avatar, Avatargroup, Badge, Chip, Breadcrumb, Confirmpopup, and Carousel in the latest ZK 11 Eval Freshly build (11.0.0.FL.20261021-Eval). These components are included in ZK Community Edition.

To try it in your existing ZK application, update your Maven `pom.xml` with the following configuration:

**1. Add the ZK Evaluation Maven Repository**

```xml
<repositories>
    <repository>
        <id>ZK Evaluation</id>
        <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
</repositories>
```

**2. Update your ZK version and ZUL dependency**

```xml
<properties>
    <zk.version>11.0.0.FL.20261021-Eval</zk.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zul</artifactId>
        <version>${zk.version}</version>
    </dependency>
</dependencies>
```

Make sure all ZK dependencies use the same evaluation version to avoid version conflicts.

Once configured, add one or two components to a representative dashboard. Breadcrumb, team avatars, status chips, a notification badge, and a contextual confirmation work well together as a focused evaluation scenario.

For more details, see the [ZK Maven Setup Guide](https://docs.zkoss.org/zk_installation_guide/maven_setup).

## Resources

- [Avatar](https://docs.zkoss.org/zk_component_ref/avatar)

- [Badge](https://docs.zkoss.org/zk_component_ref/badge)

- [Chip](https://docs.zkoss.org/zk_component_ref/chip)

- [Breadcrumb](https://docs.zkoss.org/zk_component_ref/breadcrumb)

- [Confirmpopup](https://docs.zkoss.org/zk_component_ref/confirmpopup)

- [Carousel](https://docs.zkoss.org/zk_component_ref/carousel)

- [ZK GitHub repository](https://github.com/zkoss/zk)
