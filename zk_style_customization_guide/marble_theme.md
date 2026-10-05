---
title: Marble Theme
description: "Marble is ZK's default theme since 11.0, styled after Material Design 3. Learn how to change its brand color, switch to compact density, restyle single components with theme variables, and use utility classes."
permalink: /zk_style_customization_guide/marble_theme
toc: true
---

{% include supported-since.html version="11.0.0" %}

# What is Marble

Marble is ZK's default look and feel since 11.0, styled after Material Design 3. You customize it with **CSS custom properties** and a few declarative HTML attributes, so you can change it without forking the theme or running a build step.

## What You Can Customize

| You want to... | Use |
|----------------|-----|
| Recolor the whole application from one brand color | [Brand Color](#brand-color) |
| Make the whole application, or one region, more compact | [Density](#density) |
| Restyle one kind of component, for example make all buttons pill-shaped | [Component Theme Variables](#component-theme-variables) |
| Add spacing, layout or visibility rules in ZUL without writing CSS | [Utility Classes](#utility-classes) |

Marble also supports Windows high-contrast mode, the reduced-motion setting and printing out of the box. See [Accessibility and Print](#accessibility-and-print).

## Current Limitations

- **Light mode only:** Marble has no dark mode.
- **RTL not complete:** ZK supports `dir="rtl"`, but Marble's CSS does not fully support right-to-left layouts yet. For example, directional icons such as chevrons and arrows are not flipped.

---

# Getting Started

Upgrade to ZK 11.0 or later, and your application uses Marble. No configuration is needed.

```xml
<zk>
  <window title="Hello Marble" border="normal">
    <vlayout>
      <label value="Your app now uses the Marble theme"/>
      <button label="Click me"/>
    </vlayout>
  </window>
</zk>
```

---

# Marble and IceBlue

Marble and IceBlue are two **parallel themes**, not an upgrade path from one to the other. IceBlue was the default theme from ZK 8.5 to 10.x; Marble is the default since 11.0.

## Staying on IceBlue

If your application needs to keep IceBlue, see [Switching Themes](/zk_dev_ref/theming_and_styling/switching_themes) for how to include and select a theme, and [org.zkoss.theme.preferred](/zk_config_ref/org_zkoss_theme_preferred) for the library property.

## CSS Variables Compatibility Note

The [CSS Variables](/zk_style_customization_guide/css_variables) page (since 10.3.0) describes the variables of the IceBlue theme. Variable names used in its examples are not guaranteed to exist in Marble, so the overrides shown there may have no effect. For Marble, use the [Brand Color](#brand-color), [Density](#density) and [Component Theme Variables](#component-theme-variables) sections below.

---

# Brand Color

Change Marble's brand color with one value. The rest of the palette is derived from it automatically.

## How It Works

The brand color is the CSS custom property `--zk-color-primary`, called the **seed**. Marble derives the related colors from it with CSS relative color syntax (`oklch(from …)`): the light container tint (`--zk-color-primary-container`), the dark text on that tint (`--zk-color-on-primary-container`), the secondary color, the hover and pressed overlays, and the keyboard focus ring. Each derived color keeps the seed's hue but uses a fixed lightness, so a blue, teal, orange or purple seed all produce a legible palette.

The secondary color is derived from the primary seed by default, so changing the primary color re-tints the secondary color too. If your brand has an independent second color, set `--zk-color-secondary` yourself (see [Custom CSS](#3-custom-css-loaded-after-the-theme)).

The brand color is **whole-application only**. It must be set on the document root (`<html>` or `:root`). Setting `data-brand` or `--zk-color-primary` on a container inside the page does not re-derive the colors for that region.

## Ways to Set the Brand Color

### 1. zk.xml Library Property (Recommended for a Fixed Brand)

Set the brand once in `zk.xml`. ZK renders it with the page, so the first paint already uses your brand color (no flash).

```xml
<library-property>
    <name>org.zkoss.theme.marble.brand</name>
    <value>slate</value>   <!-- built-in preset: default, slate, copper -->
</library-property>
```

Or use your own hex color:

```xml
<library-property>
    <name>org.zkoss.theme.marble.brand</name>
    <value>#6a1b9a</value>   <!-- #rgb or #rrggbb -->
</library-property>
```

For a preset, ZK renders a `data-brand` attribute on `<html>`. For a hex color, ZK renders `<style>:root{--zk-color-primary:#…}</style>` right after the theme stylesheets.

**Scope:** This property only works when the ZUL page renders the whole HTML document (a top-level ZUL page). If the ZUL page is included by another page, embedded in a JSP or another template, or uses zhtml's `<html>` as its root element, you write the `<html>` tag yourself. In that case, add the attribute to your own tag for a preset (for example `<html data-brand="slate">`), or load a CSS file that sets `--zk-color-primary` through a theme URI for a hex color.

**See also:** [org.zkoss.theme.marble.brand](/zk_config_ref/org_zkoss_theme_marble_brand)

### 2. Page Root Attributes

To use a preset on one ZUL page, put the `data-brand` attribute on that page's `<html>` element with the `root-attributes` directive:

```xml
<?root-attributes data-brand="copper"?>
<zk>
  <window>…</window>
</zk>
```

This overrides the library property. For a hex color, use custom CSS (option 3).

### 3. Custom CSS (Loaded After the Theme)

Override the seed in a CSS file that is loaded after the theme CSS:

```css
/* custom-brand.css */
:root {
    --zk-color-primary: #6a1b9a;   /* your brand color; everything else derives */
}
```

Load it for the whole application in `zk.xml`:

```xml
<desktop-config>
    <theme-uri>/css/custom-brand.css</theme-uri>
</desktop-config>
```

Or on one page:

```xml
<?link rel="stylesheet" type="text/css" href="/css/custom-brand.css"?>
```

For a fuller rebrand, override the other seeds too. Each one re-derives its own container colors. Setting `--zk-color-secondary` stops it from being derived from the primary color:

```css
:root {
    --zk-color-primary:   #6a1b9a;   /* brand purple */
    --zk-color-secondary: #00897b;   /* independent second color */
    --zk-color-error:     #c62828;
    --zk-color-warning:   #ef6c00;
}
```

If one derived color is not quite right for your brand, set it directly. The others still derive from the seed:

```css
:root {
    --zk-color-primary: #6a1b9a;
    --zk-color-primary-container: #ede7f6;   /* pin just this one */
}
```

### 4. Runtime Switch with Java

To let users pick a brand at runtime, call `MarbleBrand.apply()` inside an event listener or an MVVM command:

```java
import org.zkoss.zul.theme.MarbleBrand;

MarbleBrand.apply(MarbleBrand.Brand.SLATE);    // switch the whole app to a preset
MarbleBrand.apply(MarbleBrand.Brand.DEFAULT);  // back to the default blue
```

**MVVM example:**

```java
@Command
public void selectBrand(@BindingParam("brand") String brand) {
    MarbleBrand.apply(MarbleBrand.Brand.valueOf(brand));   // "DEFAULT", "SLATE" or "COPPER"
}
```

Use this only for a choice the user makes at runtime. `MarbleBrand.apply()` runs after the first paint, so calling it when a page loads causes a brief color flash. For a fixed brand, use the library property (option 1) or custom CSS (option 3).

## Precedence

From the weakest to the strongest:

1. The `org.zkoss.theme.marble.brand` library property
2. `<?root-attributes data-brand="..."?>` in the page
3. CSS loaded by the page's own `<?link?>`
4. Runtime calls to `MarbleBrand.apply()`

## Built-in Presets

| Preset | Seed |
|--------|------|
| `default` (blue) | `#376fd0` |
| `slate` | `#506274` |
| `copper` | `#b45309` |

All three are mid-to-dark colors, so white text on their filled surfaces meets WCAG AA contrast.

## Filled Background Classes

To paint a button or a surface with a role color, use the `z-bg-*` utility classes: `z-bg-primary`, `z-bg-secondary`, `z-bg-error`, `z-bg-success`, `z-bg-warning` and `z-bg-info`. Their background is darkened automatically when the color is too light, so white text on them stays legible whichever brand color you choose:

```xml
<button label="Save" sclass="z-bg-secondary"/>
```

## What Is Not Re-tinted

- **Neutral surfaces:** the `--zk-color-surface*` colors keep Marble's own light, cool tint. They do not follow the brand color.
- **Status colors:** `--zk-color-status-success`, `-warning`, `-error`, `-info` and `-neutral` are a separate palette (success is always green, and so on). They do not follow the brand color.

Override them directly if you need to.

## Light Brand Colors

**⚠ Contrast Warning**

`--zk-color-on-primary` (the text color on filled primary surfaces, such as the default button) is always **white**, and the default button uses the brand color as is. If you set a light brand color, for example yellow `#ffd400`, the white text falls below the WCAG AA contrast ratio (4.5:1).

Choose one of these:

1. **Pick a medium or dark brand color.** The built-in presets (blue, slate, copper) all work.
2. **Override `--zk-color-on-primary` with a dark color** in your CSS:

   ```css
   :root {
       --zk-color-primary: #ffd400;      /* light yellow */
       --zk-color-on-primary: #1a1a1a;   /* dark text */
   }
   ```

3. **Paint the buttons with `z-bg-primary`**, which darkens a light brand color enough for white text (see [Filled Background Classes](#filled-background-classes)).

ZK does not choose white or black text automatically. This is intentional.

---

# Density

Marble's default (comfortable) spacing and control heights suit general business UIs. For data-dense applications, such as ERP screens with many rows and fields, switch to **compact** density to tighten control heights, row heights and cell padding.

## How It Works

Density is controlled by the `data-density` attribute. Put `data-density="compact"` on an element, and everything inside it shrinks. On `<html>`, it applies to the whole application, including popups appended to the body (menus, modal windows, notifications). On a container, it applies only to that region. It nests: a container inside a compact region can set `data-density="comfortable"` to go back.

## Ways to Set Density

### 1. zk.xml Library Property (Recommended for a Fixed Default)

Set the default density for the whole application once. ZK renders `data-density="compact"` on `<html>` with the page, so the first paint is already compact (no flash).

```xml
<library-property>
    <name>org.zkoss.theme.marble.density</name>
    <value>compact</value>   <!-- comfortable (default) | compact -->
</library-property>
```

It can also be set as a Java system property: `-Dorg.zkoss.theme.marble.density=compact`.

**Scope:** This property only works when the ZUL page renders the whole HTML document. If the ZUL page is included by another page, embedded in a JSP or another template, or uses zhtml's `<html>` as its root element, write the attribute in your own `<html>` tag instead:

```html
<html data-density="compact">
```

**See also:** [org.zkoss.theme.marble.density](/zk_config_ref/org_zkoss_theme_marble_density)

### 2. Single Region (ZUL Container)

Make one region compact while the rest of the page stays comfortable. In ZUL, set the attribute through the `client/attribute` namespace:

```xml
<zk xmlns:ca="client/attribute">
    <vlayout ca:data-density="compact">
        <grid>…</grid>
    </vlayout>
</zk>
```

{% include Notice.html text="Do not write <code>&lt;vlayout data-density='compact'&gt;</code> without the <code>ca:</code> prefix. <code>data-density</code> is not a property of the component, so ZK fails with a <code>PropertyNotFoundException</code>." %}

### 3. Runtime Switch with Java

To let users switch density at runtime, call `MarbleDensity.apply()` inside an event listener or an MVVM command:

```java
import org.zkoss.zul.theme.MarbleDensity;

// Whole app
MarbleDensity.apply(MarbleDensity.Density.COMPACT);
MarbleDensity.apply(MarbleDensity.Density.COMFORTABLE);  // back to the default

// One region: a component and its descendants
MarbleDensity.apply(myGridPanel, MarbleDensity.Density.COMPACT);
```

**MVVM example with a toggle:**

```java
private boolean compact;

@Command
public void toggleDensity() {
    compact = !compact;
    MarbleDensity.apply(compact ? MarbleDensity.Density.COMPACT
                                : MarbleDensity.Density.COMFORTABLE);
}
```

Calling `MarbleDensity.apply()` when a page loads causes a brief flash, because it runs after the first paint. For a fixed default, use the library property (option 1) or write `data-density` in your own `<html>` tag.

### 4. Your Own Switch

Marble does not ship a density switch widget. The `data-density` attribute is the only contract, so you can also set it from your own JavaScript, for example:

```javascript
document.documentElement.setAttribute('data-density', 'compact');
```

## Precedence

From the weakest to the strongest:

1. The `org.zkoss.theme.marble.density` library property
2. `<?root-attributes data-density="..."?>` in the page
3. CSS loaded by the page's own `<?link?>`
4. Runtime calls to `MarbleDensity.apply()`

## Compact Values

| Token | Comfortable | Compact | Used by |
|-------|-------------|---------|---------|
| `--zk-control-height-xs` | 28px | 24px | small and icon buttons, close buttons |
| `--zk-control-height-sm` | 32px | 28px | paging controls, window close button |
| `--zk-control-height-md` | 40px | 32px | inputs, icon buttons, list rows, vertical menu items |
| `--zk-control-height-lg` | 48px | 40px | toolbar, menubar, tabs, panel and groupbox header, notification |
| `--zk-control-height-xl` | 56px | 48px | window header |
| `--zk-button-height` | 36px | 30px | buttons, combobutton |
| `--zk-button-height-lg` | 44px | 38px | `.z-button-lg` |
| `--zk-menuitem-height` | 36px | 30px | popup menu rows |
| `--zk-data-row-min-height` | 52px | 36px | tree rows, grid and listbox paging bar |
| `--zk-grid-cell-padding` | 16px | 6px 12px | grid cells |
| `--zk-listbox-cell-padding` | 16px | 6px 12px | listbox cells |
| `--zk-tree-cell-padding` | 8px / 16px | 4px 12px | tree cells |

For example, inputs shrink from 40px to 32px, buttons from 36px to 30px, and grid cells from 16px padding to 6px top and bottom and 12px left and right.

## Tuning the Values

To change the compact values, write your own `html[data-density="compact"]` rule and set any token from the table above. This selector is more specific than Marble's own rule, so it wins regardless of the loading order:

```css
html[data-density="compact"] {
    --zk-button-height: 28px;
}
```

You can also adjust a single size without touching the rest, for example `--zk-toolbar-height: 40px;`.

## Intentionally Not Scaled

Icon sizes, calendar day cells, the minimum height of a textarea, and decorative spacing stay the same in compact mode. Scaling them would distort icons and content-driven layouts. Adjust them individually if you need to.

## Touch Targets

Compact heights are below the Material Design 3 minimum touch target of 44 to 48px. Compact mode is meant for dense desktop screens, not touch devices.

---

# Component Theme Variables

To restyle one kind of component without forking the theme or adding `!important`, override that component's theme variables. Each themed component reads a small set of CSS custom properties named `--zk-<component>-*`, such as `--zk-button-bg` and `--zk-button-radius`.

## Whole Application

Set the variables on `:root` in a stylesheet that is loaded **after** the theme CSS (for example, through a `theme-uri` in `zk.xml`):

```css
:root {
    --zk-button-radius: 9999px;   /* every button becomes a pill */
    --zk-button-bg: #6750a4;
}
```

The theme declares its defaults on `:root` too, so a stylesheet loaded before the theme CSS loses. If you cannot control the loading order, use a more specific selector such as `html:root`.

## One Region

Variables inherit, so setting them on a container restyles only the components inside it. Loading order does not matter here:

```xml
<div style="--zk-button-radius:9999px; --zk-button-bg:#6750a4; --zk-button-fg:#fff">
    <button label="Pill"/>          <!-- restyled -->
</div>
<button label="Default"/>           <!-- not inside the div, unchanged -->
```

## Rules

- **Override the component variable, not a global token, for a region.** For example, to recolor the buttons in one region, set `--zk-button-bg` on the container. Setting `--zk-color-primary` on the container does not change them, because the component defaults are resolved once on `:root`.
- **Typography is global.** Font size, weight and line height come from the shared type scale, not from component variables.
- **Finding the variables:** the defaults are declared on `:root`, so you can see which `--zk-<component>-*` variables a component reads by inspecting it in your browser's developer tools.

---

# Utility Classes

Marble ships utility classes with the `z-` prefix, for spacing, display, flex and grid layout, sizing, typography, borders, colors and printing. Use them in `sclass` to lay out a page without writing CSS.

## Naming Rules

- **Bootstrap names for properties:** `z-m-1` (margin), `z-px-2` (horizontal padding), `z-d-flex` (display), `z-position-absolute`, `z-border-top`.
- **Tailwind names where they are shorter:** `z-justify-center`, `z-items-center`, `z-gap-4`, `z-text-xs`.
- **One name per rule:** there are no aliases.
- **Logical directions:** `start` and `end` instead of `left` and `right`, for example `z-ms-2` (margin at the start side) and `z-border-end`.
- **Breakpoints in the middle:** `z-d-md-none` (hide at the medium breakpoint and wider). A trailing `-sm`, `-md` or `-lg` always means a size, as in `z-vstack-md`.

## Spacing Policy

Marble components have **no default margin**. You declare spacing with a parent container class or a utility class.

**Use stack classes to space children:**

```xml
<div sclass="z-vstack-md">   <!-- 16px between stacked children -->
    <window>A</window>
    <window>B</window>
</div>

<div sclass="z-hstack">      <!-- 12px between children in a row -->
    <button label="Save"/>
    <button label="Cancel"/>
</div>
```

**Sizes:** `z-vstack-sm` (8px), `z-vstack` (12px), `z-vstack-md` (16px), `z-vstack-lg` (24px); `z-hstack` has the same sizes. ZK's own `<vlayout spacing>` and `<hlayout spacing>` also work.

For a single exception, use a margin utility:

```xml
<window sclass="z-mb-6"/>   <!-- margin-bottom: 24px -->
```

Layout components such as `vlayout`, `hlayout`, `div` and `borderlayout` bodies have no default padding either. Add a padding utility where you need it:

```xml
<vlayout>
    <div sclass="z-p-4">Content with 16px padding</div>
</vlayout>
```

## Common Classes (Examples)

```xml
<!-- Layout -->
<div sclass="z-d-flex z-gap-4">
    <button label="One"/>
    <button label="Two"/>
</div>

<!-- Text -->
<label sclass="z-text-lg z-fw-bold" value="Title"/>

<!-- Sizing -->
<div sclass="z-w-100">Full width</div>

<!-- Spacing -->
<div sclass="z-p-4 z-m-0">16px padding, no margin</div>
```

## Responsive Classes

The responsive display classes apply at a breakpoint and wider:

| Breakpoint | Minimum width |
|------------|---------------|
| `sm` | 600px |
| `md` | 900px |
| `lg` | 1200px |
| `xl` | 1536px |

```xml
<!-- Hidden on narrow screens, shown at 900px and wider -->
<div sclass="z-d-none z-d-md-block">Wide content</div>
```

For a card layout that adjusts its column count to the available width without breakpoints, use `z-grid-fill` with `z-d-grid`. Each column is at least 180px wide by default; change it with `--zk-grid-min`:

```xml
<div sclass="z-d-grid z-grid-fill z-gap-4" style="--zk-grid-min: 240px">
    <div sclass="z-paper z-p-4">Card A</div>
    <div sclass="z-paper z-p-4">Card B</div>
    <div sclass="z-paper z-p-4">Card C</div>
</div>
```

---

# Accessibility and Print

## Forced Colors (Windows High-Contrast Mode)

When `@media (forced-colors: active)` applies, the operating system replaces the page colors and removes shadows. Marble restores what would otherwise be lost:

- **Focus:** inputs show a visible outline when focused.
- **Selected rows:** use the system `Highlight` and `HighlightText` colors.
- **Surfaces:** windows, panels and popups get a border in place of their shadow.
- **Icons:** follow the system text color.
- **Buttons:** get a border to show their shape.
- **Invalid inputs:** get a double border, because the red border color is lost.

This works on every page with no extra code. To test it, use the rendering tools in Chrome or Edge DevTools and emulate the CSS media feature `forced-colors: active`.

## Reduced Motion

When the user's operating system asks for reduced motion (`@media (prefers-reduced-motion: reduce)`), Marble shortens all CSS transitions and animations to almost zero.

## Print

Marble includes `z-d-print-*` classes for print layout. They only take effect when printing:

```xml
<!-- Hidden when printing, e.g. toolbars and navigation -->
<div sclass="z-d-print-none">Toolbar</div>

<!-- Hidden on screen, shown when printing -->
<div sclass="z-d-none z-d-print-block">For printed copy only</div>
```

The available values are `none`, `block`, `flex`, `grid` and `inline-block`.

When printing, Marble also automatically:

- Hides floating elements such as modal masks, toasts, the loading bar and drawers.
- Unsticks sticky grid, listbox and tree headers, so long tables can break across pages.
- Expands scrollable grid, listbox and tree bodies, so all loaded rows are printed.
- Replaces shadows with thin borders.
- Keeps brand colors and backgrounds (they are not converted to grayscale).

Frozen columns (`<frozen>`) are positioned by JavaScript, so a horizontally scrolled grid may be cut off on paper. For wide reports, consider paging or a server-side export.

---

# Related Resources

- [org.zkoss.theme.marble.brand](/zk_config_ref/org_zkoss_theme_marble_brand)
- [org.zkoss.theme.marble.density](/zk_config_ref/org_zkoss_theme_marble_density)
- [CSS Variables](/zk_style_customization_guide/css_variables) (IceBlue)
- [Switching Themes](/zk_dev_ref/theming_and_styling/switching_themes)
