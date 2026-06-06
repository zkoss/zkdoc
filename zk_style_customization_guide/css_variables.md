---
title: "CSS Variables"
toc: true
---

{% include supported-since.html version="10.3.0" %}

ZK provides hundreds of CSS custom properties (CSS variables) for easy theming and customization without LESS compilation. This modern approach allows you to override styles at runtime with minimal effort.

# Overview

CSS custom properties (also known as CSS variables) are entities defined by CSS authors that contain specific values to be reused throughout a document. ZK defines a comprehensive set of variables covering colors, spacing, typography, and component-specific styling.

**Benefits over LESS:**
- No compilation step required
- Can be changed at runtime via JavaScript
- Easier to override in your CSS files
- Better browser DevTools support for debugging

# How to Use

Override ZK CSS variables in your own CSS file:

```css
:root {
    --zk-color-primary: #1890ff;
    --zk-base-border-radius: 6px;
}
```

Then include your CSS file in `zk.xml`:

```xml
<desktop-config>
    <theme-uri>/css/custom-theme.css</theme-uri>
</desktop-config>
```

# Variable Categories

ZK CSS variables are organized into the following categories:

## Global Variables

Base variables that affect the entire application:

- Colors (primary, secondary, background, text, border)
- Typography (font family, sizes, weights)
- Spacing (padding, margins, gaps)
- Border radius
- Shadows

## Component-Specific Variables

Each component has its own set of variables for fine-grained control. For example:

- Button: `--zk-button-*`
- Input: `--zk-input-*`
- Window: `--zk-window-*`
- Grid: `--zk-messagebox-*`

# Common Customizations

## Changing Primary Color

```css
:root {
    --zk-color-primary: #6366f1;
    --zk-color-primary-dark: #4338ca;
}
```

## Adjusting Border Radius

```css
:root {
    --zk-border-radius-small: 2px;
    --zk-base-border-radius: 4px;
    --zk-border-radius-large: 8px;
}
```

## Custom Font

```css
:root {
    --zk-base-title-font-family: 'Inter', sans-serif;
    --zk-base-font-size: 14px;
}
```

# Use Case: Building a Dark Theme

A common requirement is to give an application a dark color scheme — dark background with light text — without recompiling LESS. CSS variables make this practical: the developer defines a custom theme CSS file that overrides ZK's color variables, and registers it via `<theme-uri>` as shown above.

## Override Base and State Colors Together

The base colors (background, text, primary) are only half the job. ZK's default interaction-state colors — hover, active, selected, focus, and disabled — are designed to be visible against a light background. If you only darken the base colors, that state feedback can become nearly invisible: a hovered grid row or a selected listbox item may look identical to its neighbors. Grid and listbox hover highlights and group headers (mesh title areas) are the most frequent trouble spots, so tune those state variables explicitly:

```css
:root {
    /* Base colors */
    --zk-base-background-color: #121212;
    --zk-color-primary: #90caf9;

    /* Buttons */
    --zk-button-background-color: #1e1e1e;
    --zk-button-border-color: #3a3a3a;
    --zk-button-color: #e0e0e0;

    /* Interaction states - tune these explicitly */
    --zk-hover-background-color: #2a2a2a;
    --zk-focus-background-color: #2f3b4b;
    --zk-selected-background-color: #1565c0;
    --zk-selected-color: #ffffff;
    --zk-disabled-color: #6f6f6f;

    /* Grid / listbox headers and group rows */
    --zk-mesh-title-background-color: #1c1c1c;
    --zk-mesh-title-hover-background-color: #333333;

    /* Popups and inputs */
    --zk-popup-background-color: #1e1e1e;
    --zk-input-border-color: #3a3a3a;
}
```

Pick hover and selected colors with enough contrast against the dark base so that the highlighted row clearly stands out; a value only one or two shades away from the background is hard to perceive.

## Verify Interaction States

After applying a dark theme, walk through the interaction states on real pages rather than judging the static appearance alone. Hover over grid and listbox rows, select items, hold the mouse down on buttons, tab through inputs to check focus styling, and confirm that disabled controls still read as disabled. Insufficient contrast in hover and selection feedback on data components is the most common gap in a dark theme, and it only shows up when you exercise those states directly.

# Variable Reference

<!-- TODO: Add complete variable reference or link to generated reference -->

For a complete list of available CSS variables, inspect the `:root` styles in your browser's DevTools or refer to the [ZK Theme source](https://github.com/zkoss/zk).

# Runtime Customization

You can dynamically change CSS variables using JavaScript:

```javascript
document.documentElement.style.setProperty('--zk-color-primary', '#ff6b6b');
```

This enables features like:
- User-selectable themes
- Dark/light mode toggle
- Dynamic branding based on user preferences

# Browser Support

CSS custom properties are supported in all modern browsers. For detailed compatibility, see [Can I Use: CSS Variables](https://caniuse.com/css-variables).
