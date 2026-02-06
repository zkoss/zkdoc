---
author: hawk
date: 2026-02-18
version: 10.3.0.1
category: small-talk
title: "Introducing iceblue_rem: Easy Global UI Resizing with REM-Based Theming"
---

# Overview

We are excited to introduce **iceblue_rem**, a new ZK theme that brings scalable, responsive UI sizing to your ZK applications. This theme maintains the familiar look of the default iceblue theme while converting all component dimensions to CSS `rem` units - enabling you to resize the entire UI by simply adjusting a single CSS value.

# Why REM Units Matter

Traditional pixel-based themes have fixed component sizes. If you need larger buttons for accessibility or smaller components for data-dense dashboards, you face the tedious task of overriding dozens of CSS rules.

With `iceblue_rem`, all sizing properties - heights, widths, line-heights, and icon sizes - use `rem` units. This means:

- **Uniform Scaling**: Change the root font size, and all ZK components scale proportionally
- **Better Accessibility**: Users who need larger UI elements can simply increase the root font size
- **Responsive Flexibility**: Adapt your UI density for different screen sizes or user preferences

# How It Works

The iceblue_rem theme assumes **1rem = 8px** as the base unit. For example:

- A button with `height: 4rem` renders at 32px (4 × 8px)
- An input with `height: 4.5rem` renders at 36px (4.5 × 8px)

To scale all components, simply change the root font size:

```css
/* Default: 1rem = 8px */
:root {
  font-size: 8px;
}

/* Scale up 25%: 1rem = 10px */
:root {
  font-size: 10px;
}

/* Scale up 50%: 1rem = 12px */
:root {
  font-size: 12px;
}
```
For most applications, this is all you need to do. 

Once the root font size is set, the entire ZK UI scales together — no more overriding individual component styles one by one.

## Working with Existing Root Font Sizes (Optional)

Some applications already define a root font size for their typography - often the browser default of 16px. Changing it to 8px would break your existing styles.

If your application already defines a custom root font size, iceblue_rem provides the `--zk-rem-ratio` CSS variable to address the conflict. This multiplier adjusts ZK component sizes without changing your root font size.

### The Formula

```
--zk-rem-ratio = 8 / YOUR_ROOT_FONT_SIZE_IN_PX
```

### Common Presets

| Your Root Font Size | --zk-rem-ratio Value |
|---------------------|----------------------|
| 8px (ZK default)    | 1                    |
| 10px                | 0.8                  |
| 12px                | 0.667                |
| 14px                | 0.571                |
| 16px (browser default) | 0.5               |

### Example: Using 16px Root Font Size

```css
:root {
  font-size: 16px;        /* Your application's typography base */
  --zk-rem-ratio: 0.5;    /* 8 / 16 = 0.5 */
}
```

With this configuration:
- ZK components render at correct sizes (e.g., a 4rem button = 4 × 16px × 0.5 = 32px)
- Your application's rem-based styles work normally with the 16px base
- Both ZK and your application coexist without conflicts

# Quick Start

## Step 1: Add the Theme Dependency

Add iceblue_rem to your project's dependencies (Maven example):

```xml
<dependency>
    <groupId>org.zkoss.theme</groupId>
    <artifactId>iceblue_rem</artifactId>
    <version>${theme.version}</version>
</dependency>
```
Check https://mavensync.zkoss.org/maven2/org/zkoss/theme/iceblue_rem/ for the latest version

## Step 2: Apply the Theme

In your `zk.xml`:

```xml
<library-property>
    <name>org.zkoss.theme.preferred</name>
    <value>iceblue_rem</value>
</library-property>
```

See [Switching Themes](/zk_dev_ref/theming_and_styling/switching_themes)

## Step 3: Set Root Font Size (Optional)
By default, iceblue_rem sets the root font size to 8px. If your application uses a root font size other than 8px, add the ratio adjustment:

```css
:root {
  font-size: 16px;
  --zk-rem-ratio: 0.5;
}
```

# Dynamic Scaling with JavaScript

The `--zk-rem-ratio` variable can be changed at runtime, enabling dynamic UI scaling:

```javascript
// Scale up components by 20%
document.documentElement.style.setProperty('--zk-rem-ratio', '1.2');

// Reset to default
document.documentElement.style.setProperty('--zk-rem-ratio', '1');
```

This opens possibilities for user preferences, accessibility settings, or responsive adjustments without page reload.

# Summary

The iceblue_rem theme brings modern, scalable UI sizing to ZK applications:

- **Same familiar iceblue appearance** - no visual redesign required
- **REM-based sizing** - all components scale together
- **Simple integration** - just set root font size or use `--zk-rem-ratio`
- **Runtime flexibility** - adjust component sizes dynamically via CSS or JavaScript

Whether you're building accessible applications, responsive dashboards, or simply want more control over your UI density, iceblue_rem provides the foundation for scalable ZK interfaces.

## Notes on Status and Feedback 

This rem-based theme is currently provided as an experimental option. We intentionally released it as a separate theme to evaluate real-world compatibility and gather feedback before considering any changes to our official default theme.

If this approach proves helpful and stable for users, we plan to consider integrating it into our official theming system in a future release. We welcome feedback and encourage you to try it out and share your experience. Please provide your feedback on this [forum thread](https://forum.zkoss.org) or contact us at info@zkoss.org.

# Resources

- [ZK Theme Template - iceblue rem source](https://github.com/zkoss/zkThemeTemplate/tree/iceblue_rem) - Create custom themes based on iceblue_rem
