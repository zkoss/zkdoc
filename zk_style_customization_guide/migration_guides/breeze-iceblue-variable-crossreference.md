# Breeze → Iceblue Variable Name Cross-Reference

This table maps variables from 9.6.6 breeze to its iceblue 10.3.0 equivalent.
Use this when migrating a breeze-based theme for ZK 10

## Legend

| Symbol | Meaning |
|---|---|
| = | Direct rename; same semantic meaning |
| → | Indirect mapping; values change or multiple source vars collapse into one |
| ✗ | Breeze variable removed in iceblue; no equivalent |
| NEW | New iceblue variable with new in icebluealent |

---

## Typography

| Breeze variable | Iceblue 9.6.6 / 10.3.0 | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@baseFontSize` | = `@baseFontSize` | `--zk-base-font-size` | Default differs in iceblue |
| `@baseTitleFontFamily` | = `@baseTitleFontFamily` | `--zk-base-title-font-family` | |
| `@baseContentFontFamily` | = `@baseContentFontFamily` | `--zk-base-content-font-family` | |
| `@baseLineHeight` | = `@baseLineHeight` | `--zk-base-line-height` | |
| `@fontSizeXLarge` | = `@fontSizeXLarge` | `--zk-font-size-xlarge` | Default differs in iceblue |
| `@fontSizeLarge` | = `@fontSizeLarge` | `--zk-font-size-large` | Default differs in iceblue |
| `@fontSizeMedium` | = `@fontSizeMedium` | `--zk-font-size-medium` | Default differs in iceblue |
| `@fontSizeSmall` | = `@fontSizeSmall` | `--zk-font-size-small` | Default differs in iceblue |
| `@fontSizeXSmall` | = `@fontSizeXSmall` | `--zk-font-size-xsmall` | Default differs in iceblue |

---

## Sizing / Layout

| Breeze variable | Iceblue 9.6.6 / 10.3.0 | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@baseHeight` | = `@baseHeight` | `--zk-base-height` | |
| `@baseIconHeight` | = `@baseIconHeight` | `--zk-base-icon-height` | |
| `@baseButtonHeight` | = `@baseButtonHeight` | `--zk-base-button-height` | |
| `@baseBarHeight` | = `@baseBarHeight` | `--zk-base-bar-height` | |
| `@baseTitleHeight` | = `@baseTitleHeight` | `--zk-base-title-height` | |
| `@baseWidth` / `@baseIconWidth` / etc. | = | `--zk-base-width` etc. | |
| `@baseBorderRadius` | = `@baseBorderRadius` | `--zk-base-border-radius` | |
| `@borderRadiusLarge` | = `@borderRadiusLarge` | `--zk-border-radius-large` | |
| `@borderRadiusSmall` | = `@borderRadiusSmall` | `--zk-border-radius-small` | |
| `@basePopupZIndex` | = `@basePopupZIndex` | `--zk-base-popup-z-index` | |

---

## Core Text Colors

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@baseTextColor` | → `@textColorDefault` | `--zk-text-color-default` | Renamed |
| `@textColorGray` | → `@textColorLight` | `--zk-text-color-light` | Renamed |
| `@textColorGrayDark` | → `@textColorDefault` | `--zk-text-color-default` | Merged into `textColorDefault` |
| `@textColorGrayLight` | → `@textColorLighter` | `--zk-text-color-lighter` | Renamed |
| `@textColorBlue` | → `@colorPrimary` | `--zk-color-primary` | Uses color from palette |
| `@textColorOrange` | → `@colorAccent` | `--zk-color-accent` | Renamed |
| `@textColorGreen` | ✗ (no matching variable) | — | Use per-component override if needed |

**New text tokens in iceblue (new in icebluealent):**

| NEW LESS variable | CSS var | Purpose |
|---|---|---|
| `@textColorDefault3` | `--zk-text-color-default3` | Text on colored backgrounds (button text, header text) |
| `@textColorActive` | `--zk-text-color-active` | Link color, active element text |

---

## Core Background Colors

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@baseBackgroundColor` | → `@colorBackground3` | `--zk-color-background3` | **Critical rename**: in iceblue, `colorBackground3` is the container bg. Setting `baseBackgroundColor` alone in breeze was sufficient; in iceblue you must set `colorBackground3`. |
| `@baseGradientStart` | → (contribute to `@colorBackground1`) | `--zk-color-background1` | Gradients removed. Use darker end value for single color to maintain style identity. |
| `@baseGradientEnd` | → `@baseBackgroundColor` = `@colorBackground3` | `--zk-color-background3` | Gradients removed. |
| `@windowBackgroundColor` | → `@containerBackground` = `@colorBackground1` | `--zk-container-background` / `--zk-color-background1` | Renamed; windows/panels share `colorBackground1` |
| `@panelBackgroundColor` | → `@containerBackground` = `@colorBackground1` | `--zk-container-background` / `--zk-color-background1` | Same as window — panels share variable |
| `@panelBodyBackground` | ✗ | — | Removed in iceblue |

**New background tokens in iceblue:**

| NEW token | CSS var | Purpose |
|---|---|---|
| `@colorBackground1` | `--zk-color-background1` | Window/Panel bg |
| `@colorBackground3` | `--zk-color-background3` | Container bg: grids, navbars, popups |
| `@colorGreyDark` | `--zk-color-grey-dark` | Container borders, input hover border |
| `@colorGreyLight` | `--zk-color-grey-light` | Base border, button disabled bg |
| `@colorGreyLighter` | `--zk-color-grey-lighter` | Disabled field bg, mesh foot, readonly bg |

---

## Border Colors

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@baseBorderColor` | → `@baseBorderColor` (derives from `@colorGreyLight`) | `--zk-base-border-color` | Still named the same; value now derived |
| `@windowBorderColor` | → `@containerBorderColor` = `@colorGreyDark` | `--zk-container-border-color` | Renamed; windows+panels share one variable |
| `@panelBorderColor` | → `@containerBorderColor` | `--zk-container-border-color` | Same as window |
| `@colorboxBorderColor` | = `@colorboxBorderColor` | `--zk-colorbox-border-color` | |

---

## Icons

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@iconColor` | → `@iconColor` = `@textColorLight` | `--zk-icon-color` | Now derives from text variable |
| `@iconHoverColor` | → `@iconHoverColor` = `@textColorDefault` | `--zk-icon-hover-color` | Now distinct from normal icon |
| `@iconDisabledColor` | → `@iconDisabledColor` = `@textColorLighter` | `--zk-icon-disabled-color` | Now derives from text variable |

---

## Buttons

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@buttonBorderColor` | → `@buttonBorderColor` | `--zk-button-border-color` | Iceblue uses borderless buttons |
| `@buttonGradientStart` | → `@buttonBackgroundColor` = `@colorPrimary` | `--zk-button-background-color` | Gradient removed; solid primary color |
| `@buttonGradientEnd` | ✗ (gradient removed) | — | |
| *(new in iceblue)* | NEW `@buttonColor` = `@textColorDefault3` | `--zk-button-color` | Text color on primary button |
| *(new in iceblue)* | NEW `@buttonHoverBackgroundColor` | `--zk-button-hover-background-color` | |
| *(new in iceblue)* | NEW `@buttonActiveBackgroundColor` | `--zk-button-active-background-color` | |
| *(new in iceblue)* | NEW `@buttonDisableBackgroundColor` | `--zk-button-disable-background-color` | |
| *(new in iceblue)* | NEW `@buttonBorderWidth` | `--zk-button-border-width` | Border width slot |

---

## Input Fields

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@inputBorderColor` | = `@inputBorderColor` | `--zk-input-border-color` | |
| `@inputBackgroundColor` | = `@inputBackgroundColor` | `--zk-input-background-color` | |
| *(new in iceblue)* | NEW `@inputHeight` | `--zk-input-height` | Iceblue defines this explicitly (breeze had no equivalent) |
| *(new in iceblue)* | NEW `@inputHoverBorderColor` | `--zk-input-hover-border-color` | |
| *(new in iceblue)* | NEW `@inputFocusBorderColor` | `--zk-input-focus-border-color` | |
| *(new in iceblue)* | NEW `@comboInputHeight` | `--zk-combo-input-height` | Height of combobox, datebox, bandbox etc. |

---

## Mesh / Grid / Listbox / Tree

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@meshTitleBorderColor` | = `@meshTitleBorderColor` | `--zk-mesh-title-border-color` | Default derives from `@colorPrimaryDark` |
| `@meshContentBorderColor` | = `@meshContentBorderColor` | `--zk-mesh-content-border-color` | Default derives from `@colorGreyLighter` |
| `@meshBackgroundColor` | = `@meshBackgroundColor` | `--zk-mesh-background-color` | Now defaults to `colorBackground3` |
| `@meshStripeBackgroundColor` | = `@meshStripeBackgroundColor` | `--zk-mesh-stripe-background-color` | Iceblue default: same as `meshBackgroundColor` (no stripe) |
| `@meshFootBackgroundColor` | = `@meshFootBackgroundColor` | `--zk-mesh-foot-background-color` | Default derives from `@colorGreyLighter` |
| `@meshTitleHoverStart` | → `@meshTitleHoverBackgroundColor` | `--zk-mesh-title-hover-background-color` | Gradient pair collapsed to single color (use End value) |
| `@meshTitleHoverEnd` | ✗ (gradient removed) | — | |
| `@meshContentHoverStart` | → `@hoverBackgroundColor` | `--zk-hover-background-color` | Merged into global hover token |
| `@meshContentHoverEnd` | ✗ (gradient removed) | — | |
| `@meshContentFocusStart` | → `@meshContentFocusBackgroundColor` | `--zk-mesh-content-focus-background-color` | |
| `@meshContentFocusEnd` | ✗ (gradient removed) | — | |
| `@meshAutoPagingRowHeight` | = `@meshAutoPagingRowHeight` | `--zk-mesh-auto-paging-row-height` | Default differs in iceblue |
| *(new in iceblue)* | NEW `@meshTitleBackgroundColor` | `--zk-mesh-title-background-color` | Grid header bg — derives from `@colorPrimary` |
| *(new in iceblue)* | NEW `@meshTitleColor` | `--zk-mesh-title-color` | Grid header text — derives from `@textColorDefault3` |
| *(new in iceblue)* | NEW `@meshBodyPadding` | `--zk-mesh-body-padding` | Cell padding |
| *(new in iceblue)* | NEW `@meshGroupBackgroundColor` etc. | `--zk-mesh-group-*` | Group row styling (multiple new vars) |

---

## Component States

### Hover

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@hoverColor` | = `@hoverColor` | `--zk-hover-color` | |
| `@hoverBorderColor` | = `@hoverBorderColor` | `--zk-hover-border-color` | Iceblue: borderless |
| `@hoverBackgroundColor` | = `@hoverBackgroundColor` | `--zk-hover-background-color` | Iceblue derives from `@colorPrimaryLighter` |
| `@hoverGradientStart` | ✗ (gradient removed) | — | |
| `@hoverGradientEnd` | → `@hoverBackgroundColor` | `--zk-hover-background-color` | Use End value |

### Focus

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@focusColor` | = `@focusColor` | `--zk-focus-color` | |
| `@focusBorderColor` | = `@focusBorderColor` | `--zk-focus-border-color` | Iceblue derives from `@colorAccent` |
| `@focusBackgroundColor` | = `@focusBackgroundColor` | `--zk-focus-background-color` | Iceblue derives from `@colorPrimary` |
| `@focusGradientStart/End` | ✗ (gradient removed) | — | |

### Active

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@activeColor` | = `@activeColor` | `--zk-active-color` | Iceblue derives from `@textColorDefault3` |
| `@activeBorderColor` | = `@activeBorderColor` | `--zk-active-border-color` | Iceblue: borderless |
| `@activeBackgroundColor` | = `@activeBackgroundColor` | `--zk-active-background-color` | Iceblue derives from `@colorPrimaryDark` |
| `@activeGradientStart/End` | ✗ (gradient removed) | — | |

### Selected

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@selectedColor` | = `@selectedColor` | `--zk-selected-color` | Iceblue default: `@baseTextColor` |
| `@selectedBorderColor` | = `@selectedBorderColor` | `--zk-selected-border-color` | Iceblue: borderless |
| `@selectedBackgroundColor` | = `@selectedBackgroundColor` | `--zk-selected-background-color` | Iceblue derives from `@colorPrimaryLight` |
| `@selectedGradientStart/End` | ✗ (gradient removed) | — | |
| `@selectedHoverColor` | = `@selectedHoverColor` | `--zk-selected-hover-color` | |
| `@selectedHoverBorderColor` | = `@selectedHoverBorderColor` | `--zk-selected-hover-border-color` | |
| `@selectedHoverBackgroundColor` | = `@selectedHoverBackgroundColor` | `--zk-selected-hover-background-color` | Iceblue: `= selectedBackgroundColor` |
| `@selectedHoverGradientStart/End` | ✗ (gradient removed) | — | |
| `@selectedFocusColor/BorderColor/BackgroundColor` | = (same names) | `--zk-selected-focus-*` | Iceblue: all same as `selectedBackgroundColor` |
| `@selectedFocusGradientStart/End` | ✗ (gradient removed) | — | |

### Checked

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@checkedColor` | = `@checkedColor` | `--zk-checked-color` | Iceblue derives from `@colorPrimary` |
| `@checkedBorderColor` | = `@checkedBorderColor` | `--zk-checked-border-color` | |
| `@checkedBackgroundColor` | = `@checkedBackgroundColor` | `--zk-checked-background-color` | Iceblue derives from `@textColorDefault3` |
| `@checkedGradientStart/End` | ✗ (gradient removed) | — | |

### Disabled

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@disabledColor` | = `@disabledColor` | `--zk-disabled-color` | Iceblue derives from `@textColorLighter` |
| `@disabledBackgroundColor` | = `@disabledBackgroundColor` | `--zk-disabled-background-color` | Iceblue derives from `@colorGreyLighter` |
| `@disabledOpacity` | = `@disabledOpacity` | `--zk-disabled-opacity` | Iceblue removes opacity dimming |

### Invalid / Read-only

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@invalidBorderColor` | = `@invalidBorderColor` | `--zk-invalid-border-color` | Iceblue derives from `@colorAccent2` |
| `@readonlyBorderColor` | = `@readonlyBorderColor` | `--zk-readonly-border-color` | |
| `@readonlyBackgroundColor` | = `@readonlyBackgroundColor` | `--zk-readonly-background-color` | |

---

## Container (Window / Panel)

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@windowBorderColor` | → `@containerBorderColor` | `--zk-container-border-color` | Renamed; windows+panels share token |
| `@windowBackgroundColor` | → `@containerBackground` = `@colorBackground1` | `--zk-container-background` | |
| `@windowFramePadding` | → `@containerPadding` | `--zk-container-padding` | Default differs in iceblue |
| `@panelBorderColor` | → `@containerBorderColor` | `--zk-container-border-color` | Same as window |
| `@panelBackgroundColor` | → `@containerBackground` | `--zk-container-background` | Same as window |
| `@panelBodyBackground` | ✗ | — | Removed |
| `@tabSelectedBackgroundColor` | → `@tabboxSelectedBackgroundColor` | `--zk-tabbox-selected-background-color` | Renamed |

---

## Popup / Menu

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@popupBorderColor` | = `@popupBorderColor` | `--zk-popup-border-color` | |
| `@popupBackgroundColor` | = `@popupBackgroundColor` | `--zk-popup-background-color` | Iceblue derives from `@colorBackground3` |
| `@popupGradientStart/End` | ✗ (gradient removed) | — | |
| `@menuActiveBorderColorTR` | ✗ | — | Removed (flat menu in iceblue) |
| `@menuActiveBorderColorBL` | ✗ | — | Removed |
| `@menuPopupBackground` | → `@menuPopupBackground` | `--zk-menu-popup-background` | |
| `@menuSeparatorBorderColor` | = `@menuSeparatorBorderColor` | `--zk-menu-separator-border-color` | |
| `@menuSeparatorBackgroundColor` | = `@menuSeparatorBackgroundColor` | `--zk-menu-separator-background-color` | |
| `@menuPopupSeparatorBorder` | ✗ | — | Removed |
| `@menuPopupSeparatorBackground` | ✗ | — | Removed |

---

## Navbar

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@navColor` | = `@navColor` | `--zk-nav-color` | |
| `@navBorderColor` | = `@navBorderColor` | `--zk-nav-border-color` | |
| `@navBackgroundColor` | = `@navBackgroundColor` | `--zk-nav-background-color` | |
| `@navHoverBackgroundColor` | = `@navHoverBackgroundColor` | `--zk-nav-hover-background-color` | Iceblue: same as `navBackground` |
| `@navSelectedColor` | = `@navSelectedColor` | `--zk-nav-selected-color` | Iceblue derives from `@colorPrimary` |
| `@navSelectedBackgroundColor` | = `@navSelectedBackgroundColor` | `--zk-nav-selected-background-color` | Iceblue defaults to `@navBackgroundColor` |
| `@navSeparatorColor` | = `@navSeparatorColor` | `--zk-nav-separator-color` | |
| `@navCollapsedWidth` | = `@navCollapsedWidth` | `--zk-nav-collapsed-width` | |

---

## Calendar

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@calendarTitleColor` | = `@calendarTitleColor` | `--zk-calendar-title-color` | |
| `@calendarTitleHoverColor` | = `@calendarTitleHoverColor` | `--zk-calendar-title-hover-color` | |
| `@calendarCellColor` | = `@calendarCellColor` | `--zk-calendar-cell-color` | |
| `@calendarSelectedColor` | = `@calendarSelectedColor` | `--zk-calendar-selected-color` | Iceblue derives from `@textColorDefault3` |
| `@calendarSelectedHoverColor` | = `@calendarSelectedHoverColor` | `--zk-calendar-selected-hover-color` | |
| `@weekendColor` | = `@weekendColor` | `--zk-weekend-color` | Iceblue default: `@baseTextColor` |
| `@weekendBackgroundColor` | = `@weekendBackgroundColor` | `--zk-weekend-background-color` | Iceblue removes the background tint |
| `@weekColor` | → `@weekdayColor` | `--zk-weekday-color` | Renamed |
| `@weekofyearColor` | = `@weekofyearColor` | `--zk-weekofyear-color` | |
| `@weekofyearBackgroundColor` | = `@weekofyearBackgroundColor` | `--zk-weekofyear-background-color` | Iceblue removes the background tint |

---

## Scrollbar

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@scrollbarWidth` | → `@scrollbarSize` | `--zk-scrollbar-size` | Renamed; iceblue default is slimmer |
| `@scrollbarHeight` | ✗ (merged into size) | — | |
| `@scrollbarBorderColor` | = `@scrollbarBorderColor` | `--zk-scrollbar-border-color` | Iceblue: borderless |
| `@scrollbarBackgroundColor` | = `@scrollbarBackgroundColor` | `--zk-scrollbar-background-color` | |
| `@scrollbarGradientStart/End` | ✗ (gradient removed) | — | |
| *(new in iceblue)* | NEW `@scrollbarBarBackgroundColor` | `--zk-scrollbar-bar-background-color` | The thumb/bar color (derives from `@colorPrimary`) |
| *(new in iceblue)* | NEW `@scrollbarBarHoverBackground` | `--zk-scrollbar-bar-hover-background` | |

---

## Drag and Drop

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@dragColor` | = `@dragColor` | `--zk-drag-color` | |
| `@dragBackgroundColor` | = `@dragBackgroundColor` | `--zk-drag-background-color` | Iceblue derives from `@popupBackgroundColor` |
| `@dragHoverBackgroundColor` | = `@dragHoverBackgroundColor` | `--zk-drag-hover-background-color` | Iceblue derives from `@colorPrimaryLighter` |
| `@dragAllowBorderColor` | → `@dragAllowBorderColor` | `--zk-drag-allow-border-color` | Iceblue derives from `@colorPrimary` |
| `@dragAllowBackgroundColor` | → `@dragAllowBackgroundColor` | `--zk-drag-allow-background-color` | Iceblue derives from `@popupBackgroundColor` |
| `@dragDisAllowBorderColor` | → `@dragDisAllowBorderColor` | `--zk-drag-disallow-border-color` | Iceblue: borderless |
| `@dragDisAllowBackgroundColor` | → `@dragDisAllowBackgroundColor` | `--zk-drag-disallow-background-color` | Iceblue derives from `@colorGreyLighter` |

---

## Splitter

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@splitterSize` | = `@splitterSize` | `--zk-splitter-size` | |
| `@splitterGradientStart` | → `@splitterBackgroundColor` | `--zk-splitter-background-color` | gradient removed; iceblue derives from `@colorBackground1` |
| `@splitterGradientEnd` | ✗ (gradient removed) | — | |
| *(new in iceblue)* | NEW `@splitterHoverBackgroundColor` | `--zk-splitter-hover-background-color` | |
| *(new in iceblue)* | NEW `@splitterButtonTextColors` | `--zk-splitter-button-text-colors` | 2-value list (normal, hover) |
| *(new in iceblue)* | NEW `@splitterDragBackgroundColor` | `--zk-splitter-drag-background-color` | |

---

## Paging

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@pagingColor` | = `@pagingColor` | `--zk-paging-color` | Iceblue derives from `@textColorDefault` |
| `@pagingSelectedColor` | → `@pagingItemSelectedColor` | `--zk-paging-item-selected-color` | Renamed |
| `@pagingBorderColor` | = `@pagingBorderColor` | `--zk-paging-border-color` | |
| `@pagingActiveBorderColor` | → `@pagingItemActiveBackgroundColor` | `--zk-paging-item-active-background-color` | Renamed; semantics changed |
| `@pagingBackgroundColor` | = `@pagingBackgroundColor` | `--zk-paging-background-color` | |
| `@pagingSelectedBackgroundColor` | → `@pagingItemSelectedBackgroundColor` | `--zk-paging-item-selected-background-color` | Renamed; iceblue removes the tint |

---

## Misc / Notification / Loading

| Breeze variable | → Iceblue equivalent | CSS var (10.3.0) | Notes |
|---|---|---|---|
| `@maskBackgroundColor` | = `@maskBackgroundColor` | `--zk-mask-background-color` | |
| `@loadingBackgroundColor` | = `@loadingBackgroundColor` | `--zk-loading-background-color` | |
| `@notificationInfoColor` | = `@notificationInfoColor` | `--zk-notification-info-color` | Default changed in iceblue |
| `@notificationWarningColor` | = `@notificationWarningColor` | `--zk-notification-warning-color` | |
| `@notificationErrorColor` | = `@notificationErrorColor` | `--zk-notification-error-color` | |
| `@notificationArrowColor` | ✗ | — | Removed |
| `@progressmeterGradientStart/End` | → `@progressmeterBackgroundColor` | `--zk-progressmeter-background-color` | gradient removed; iceblue derives from `@colorPrimary` |
| `@errorboxColor` | = `@errorboxColor` | `--zk-errorbox-color` | Iceblue derives from `@colorAccent2` |
| `@errorboxBorderColor` | = `@errorboxBorderColor` | `--zk-errorbox-border-color` | Iceblue: borderless |
| `@errorboxBackgroundColor` | = `@errorboxBackgroundColor` | `--zk-errorbox-background-color` | |
| `@collapsedBorderColor` | = `@collapsedBorderColor` | `--zk-collapsed-border-color` | |
| `@collapsedBackgroundColor` | = `@collapsedBackgroundColor` | `--zk-collapsed-background-color` | |
| `@groupGradientStart/End` | ✗ (gradient removed) | — | |
| `@sliderBorderColor` | = `@sliderBorderColor` | `--zk-slider-border-color` | |
| `@sliderActiveBorderColor` | → `@sliderAreaBackgroundColor` | `--zk-slider-area-background-color` | Renamed |
| `@chosenboxItemBorderColor` | = `@chosenboxItemBorderColor` | `--zk-chosenbox-item-border-color` | Iceblue derives from `@colorPrimaryDark` |
| `@chosenboxCreateIconColor` | = `@chosenboxCreateIconColor` | `--zk-chosenbox-create-icon-color` | Iceblue derives from `@colorPrimary` |
| `@biglistboxBackgroundColor` | → `@biglistboxFrozenBackgroundColor` | `--zk-biglistbox-frozen-background-color` | Renamed/split |
| `@biglistboxFrozenBackground` | → `@biglistboxFrozenBackgroundColor` | `--zk-biglistbox-frozen-background-color` | |
