---
author: jameschu
date: 2026-10-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Avatars, Badges & More for Polished UIs"
---

**Add consistent identity, status, navigation, confirmation, and featured-content patterns with new Community Edition components.**

## New Building Blocks for Common UI Details

ZK 11 adds Avatar, Avatargroup, Badge, Chip, Breadcrumb, Confirmpopup, and Carousel to Community Edition. These components cover interface details that applications often implement repeatedly.

They are regular ZK components. They can be declared in ZUL, updated from Java, bound with MVVM, and styled with the active theme.

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

Badge adds a count or dot indicator to a control. Chip presents a category, state, or active filter and can be closable when users may remove it.

```xml
<badge count="5" placement="top_right">
    <button iconSclass="z-icon-bell"/>
</badge>

<chip label="Pending review" severity="warning"/>
<chip label="Taipei" rounded="true" closable="true"/>
```

![ZK Avatar components in several sizes and colors, followed by an overlapping Avatargroup.](/assets/images/small-talk/zk11-sneak-peek/avatar_group.png)

*Avatar and Avatargroup provide consistent visual identity for people and teams.*

![Notification badges and status chips shown in several styles and severity colors.](/assets/images/small-talk/zk11-sneak-peek/badge_and_chip.png)

*Badge and Chip make counts, states, and active filters easier to scan.*

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

Confirmpopup asks for confirmation next to the action that opened it. It keeps the user in context and supports severity, placement, icons, and default focus.

```xml
<button label="Delete" onClick="confirm.open(self)"/>
<confirmpopup id="confirm" severity="error"
              title="Confirm delete"
              message="This cannot be undone. Continue?"
              defaultFocus="cancel"
              onOK="@command('delete')"/>
```

![A ZK Breadcrumb showing a hierarchical navigation path with separators and collapsed middle items.](/assets/images/small-talk/zk11-sneak-peek/breadcrumb.png)

*Breadcrumb keeps hierarchical navigation readable, even when the path is long.*

![A contextual confirmation popup anchored to a delete button, with Cancel and Delete actions.](/assets/images/small-talk/zk11-sneak-peek/confirmpopup.png)

*Confirmpopup asks for confirmation beside the action that opened it.*

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

*Carousel can present announcements, onboarding steps, or other component-based content.*

## Use the Components as a Consistent Set

The main value is consistency. A project does not need a different custom implementation for every avatar fallback, notification count, filter chip, breadcrumb separator, or confirmation popup.

Teams planning a ZK 11 interface can identify these repeated patterns early and use the standard components when they become available in the project's target build.

## Summary

This ZK 11 feature provides:

- Avatar and Avatargroup for compact visual identity
- Badge and Chip for counts, status, categories, and filters
- Breadcrumb for hierarchical navigation
- Confirmpopup for contextual confirmation
- Carousel for announcements, onboarding, and featured content

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview Avatar, Avatargroup, Badge, Chip, Breadcrumb, Confirmpopup, and Carousel in the latest ZK 11 Eval Freshly build (`11.0.0.FL.20261021-Eval`). These components are included in ZK Community Edition.

To try them in your existing ZK application, update your Maven `pom.xml` with the following configuration:

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
- [ZK Forum](https://forum.zkoss.org/)

