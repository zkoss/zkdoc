---
author: jameschu
date: 2026-10-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: A Fresh, Customizable Look with the Marble Theme"
---

**A Material 3-based default theme with semantic color tokens, density options, utility classes, and targeted CSS customization.**

## A New Default Theme for ZK 11

ZK 11 introduces Marble, a new default theme styled after Material Design 3. Marble gives existing ZK applications a modern appearance and makes common branding and layout changes easier to manage.

Marble works with existing ZUL pages and server-side application logic. It changes how components are presented, not how a ZK application is structured. IceBlue remains supported and can still be selected for applications that want to keep their current appearance.

![A working ZK 11 dashboard using the Marble theme, with an overview banner, status cards, filters, and an order list.](/assets/images/small-talk/zk11-sneak-peek/marble_dashboard.png)

*Marble applied to a working ZK dashboard with standard inputs, buttons, semantic statuses, and a Listbox.*

![Diagram showing a primary brand seed producing semantic colors and consistently styled ZK components.](/assets/images/small-talk/zk11-sneak-peek/marble_brand_system.png)

*One brand color feeds semantic roles that are reused across components.*

## Configure Your Brand with Semantic Colors

Marble starts with a primary brand color and derives a coordinated palette from it. The palette includes primary and secondary roles, container colors, readable foreground colors, interaction overlays, and focus indicators. This is more reliable than copying the same hexadecimal value into many component rules.

```css
:root {
    --zk-color-primary: #6a1b9a;
}
```

Application styles can then use semantic roles such as Primary, Secondary, Surface, and Error. Utility classes such as z-bg-primary and z-text-on-primary use the same theme values. If the primary color changes later, pages that use those roles change with it.

```xml
<div sclass="z-bg-primary z-text-on-primary z-p-4">
    Branded application header
</div>
```

![The same ZK dashboard shown with Marble's default blue, slate, and copper presets.](/assets/images/small-talk/zk11-sneak-peek/marble_color_presets.png)

*Changing the primary brand color updates related component and container colors across the page.*

## Choose Comfortable or Compact Density

Marble supports comfortable and compact densities. Comfortable is the default and provides more space around controls. Compact reduces control heights, row heights, and cell padding for data-heavy desktop screens.

```xml
<library-property>
    <name>org.zkoss.theme.marble.density</name>
    <value>compact</value>
</library-property>
```

Density can also be scoped to part of a page. A dashboard can keep its navigation and forms comfortable while using compact spacing in a transaction area. Compact density is intended for dense desktop work, not as a substitute for a touch-friendly layout.

![A vertical comparison of the same ZK controls and Listbox in comfortable and compact Marble density.](/assets/images/small-talk/zk11-sneak-peek/marble_density.png)

*Comfortable and compact density use the same components and data while changing control and row spacing.*

## Use Built-In Layout Utilities

Marble includes utility classes for spacing, display, flex and grid layout, gaps, color, borders, responsive visibility, and printing. They cover common page-level styling without requiring a new CSS selector for every screen.

```xml
<div sclass="z-d-grid z-grid-cols-3 z-gap-4 z-p-4">
    <panel title="Open Orders"/>
    <panel title="Pending Review"/>
    <panel title="Completed Today"/>
</div>
```

The utility classes use the same spacing and color system as the components. This helps custom page content and standard ZK controls look like parts of the same interface.

![Diagram of three cards in a grid with 16-pixel gaps and 16-pixel container padding.](/assets/images/small-talk/zk11-sneak-peek/marble_spacing_utilities.png)

*The same spacing scale controls the gap between panels and the padding around their container.*

## Customize a Component Without Copying Theme CSS

Marble exposes component-level CSS custom properties using the --zk-&lt;component&gt;-* naming pattern. Use them when a product needs a specific component treatment beyond the global brand settings.

```css
:root {
    --zk-button-radius: 9999px;
}

.billing-panel {
    --zk-button-bg: var(--zk-color-secondary);
}
```

A root-level override applies throughout the application. A scoped override, such as the billing-panel example, affects only that region. This avoids duplicating internal theme selectors or relying on broad !important rules.

## Accessibility and Printing

Marble includes built-in handling for Windows High Contrast through forced-colors, reduced-motion preferences, focus indicators, and print output. These styles preserve important states such as focus, selection, boundaries, and disabled controls when the operating system replaces normal colors.

This does not remove the need to test application-specific content and contrast. It gives standard ZK components a stronger baseline for those environments.

## Preview Availability and Limitations

Marble is available in ZK 11 preview builds. The preview is light-mode only, and right-to-left styling is not yet complete. Theme variables and utility names should also be confirmed against the final ZK 11 Beta documentation before publication.

Teams planning a ZK 11 upgrade can apply Marble to a representative form, dashboard, and data view. This provides an early view of the new default while IceBlue remains available as a parallel theme choice.

## Summary

This ZK 11 feature provides:

- Material 3-based styling for existing ZK pages
- Semantic Primary and Secondary colors derived from a brand seed
- Comfortable and compact density options
- Layout utilities and component-level CSS variables
- Built-in support for forced-colors, reduced motion, and printing

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview Marble in the latest ZK 11 Eval Freshly build (`11.0.0.FL.20261021-Eval`).

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

Once configured, open a representative form, dashboard, or data view to assess Marble with your existing components and custom CSS. IceBlue remains supported, so you can evaluate Marble without switching every application immediately.

For more details, see the [ZK Maven Setup Guide](https://docs.zkoss.org/zk_installation_guide/maven_setup).

## Resources

- [Marble Theme documentation](https://docs.zkoss.org/zk_style_customization_guide/marble_theme)
- [ZK Style Customization Guide](https://docs.zkoss.org/zk_style_customization_guide/)
- [ZK GitHub repository](https://github.com/zkoss/zk)
- [ZK Forum](https://forum.zkoss.org/)

