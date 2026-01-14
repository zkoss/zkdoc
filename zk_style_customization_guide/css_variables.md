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
