# Color Variables Reference: ZK 10.3.0 Iceblue

This document maps each ZK 10.3.0 CSS custom property (and its LESS Variable equivalent) to the specific UI elements
it visually controls. Use this to identify which token to change for a given visual area.

## Background Hierarchy

| LESS Variable | CSS Variable | Controls | Default Value |
|---|---|---|---|
| `@baseBackgroundColor` | `--zk-base-background-color` | Page/app root background; also the fallback for elements that inherit from the page | `#FFFFFF` (= `@colorBackground3`) |
| `@colorBackground1` | `--zk-color-background1` | **Window body**, **Panel body**, **Portallayout frame**, **Splitter**, GoldenLayout panel | `#F9FCFF` |
| `@colorBackground3` | `--zk-color-background3` | **Grid/Listbox/Tree row cells**, **Mesh body**, **Tabbox background**, **Navbar background**, **Popup dropdown**, **Calendar**, **Drawer**, **Coachmark**, **Borderlayout header**, **Paging bar** | `#FFFFFF` |

---

## Primary Color Family

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@colorPrimary` | `--zk-color-primary` | **Grid/Listbox/Tree header background**, **Default button background**, **Scrollbar bar**, **Checked tab indicator**, **Paging active item**, **Progressmeter fill**, **Slider area fill**, **Linelayout line/point**, **Stepbar active step**, **Searchbox active state**, **Focused input border** |
| `@colorPrimaryDark` | `--zk-color-primary-dark` | Active/pressed state for buttons, grid header active, combobutton active, cascader active |
| `@colorPrimaryLight` | `--zk-color-primary-light` | **Selected row background** (listbox, tree, comboitem), button hover background |
| `@colorPrimaryLighter` | `--zk-color-primary-lighter` | **Hovered row background** (listbox, tree), splitter hover, drag hover, combo button hover, biglistbox scroll hover |

---

## Accent / Semantic Colors

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@colorAccent` | `--zk-color-accent` | **Focus border color** (keyboard focus ring), button focus border, rangeslider/multislider focus border, mesh focus box-shadow |
| `@colorAccent2` | `--zk-color-accent2` | **Invalid/error border** (constraint violation), errorbox icon, stepbar error state |
| `@colorAccent3` | `--zk-color-accent3` | **Tooltip background** (slider tooltip, fisheyebar tooltip) |

---

## Grey Scale

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@colorGreyDark` | `--zk-color-grey-dark` | **Window/Panel/Container border**, input hover border, chosenbox item border, portalchildren drag button |
| `@colorGreyLight` | `--zk-color-grey-light` | **Base border color** (derives from this), **Button disabled background**, biglistbox frozen background, scrollbar rail, menu separator, nav separator |
| `@colorGreyLighter` | `--zk-color-grey-lighter` | **Disabled field background**, **Readonly field background**, mesh content border, mesh foot background, paging background, errorbox background (indirectly) |

---

## Text Colors

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@textColorDefault` | `--zk-text-color-default` | Primary body text, labels, cell text, input text |
| `@textColorLight` | `--zk-text-color-light` | Secondary text: captions, borderlayout headers, tabbox tabs, menu items, icon color, navbar text |
| `@textColorLighter` | `--zk-text-color-lighter` | Tertiary text: disabled elements (iceblue), icon disabled color, week-of-year, input placeholder |
| `@textColorDefault3` | `--zk-text-color-default3` | **White text on colored backgrounds**: button text (when primary button), grid header text (when blue), active/checked state text |
| `@textColorActive` | `--zk-text-color-active` | Link/active color: paging link color, slider input label, chosenbox checked icon, searchbox selected item |

---

## Input Fields

| LESS Variable | CSS Variable | Controls | Notes |
|---|---|---|---|
| `@inputBorderColor` | `--zk-input-border-color` | Border for **Textbox, Intbox, Doublebox, Longbox, Spinner, DoubleSpinner, Combobox, Datebox, Bandbox, Timebox**, Searchbox, Cascader | |
| `@inputBackgroundColor` | `--zk-input-background-color` | Background for all input fields listed above | |
| `@inputHeight` | `--zk-input-height` | Height of single-line text inputs (Textbox, Intbox, etc.) | Breeze: 22px; Iceblue: 34px |
| `@inputHoverBorderColor` | `--zk-input-hover-border-color` | Border when hovering over an input | |
| `@inputFocusBorderColor` | `--zk-input-focus-border-color` | Border when input has keyboard focus | |
| `@inputDisableBackgroundColor` | `--zk-input-disable-background-color` | Background of disabled input | |
| `@readonlyBorderColor` | `--zk-readonly-border-color` | Border of readonly inputs | |
| `@readonlyBackgroundColor` | `--zk-readonly-background-color` | Background of readonly inputs | |

---

## Buttons

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@buttonBackgroundColor` | `--zk-button-background-color` | Default (unfocused, unhovered) button background |
| `@buttonColor` | `--zk-button-color` | Default button text color |
| `@buttonBorderColor` | `--zk-button-border-color` | Default button border (iceblue default: `transparent`) |
| `@buttonBorderWidth` | `--zk-button-border-width` | Button border width (iceblue default: `2px`) |
| `@buttonHoverBackgroundColor` | `--zk-button-hover-background-color` | Button background on hover |
| `@buttonActiveBackgroundColor` | `--zk-button-active-background-color` | Button background when clicked/pressed |
| `@buttonDisableBackgroundColor` | `--zk-button-disable-background-color` | Disabled button background |
| `@buttonDisableColor` | `--zk-button-disable-color` | Disabled button text |

---

## Grid / Listbox / Tree (Mesh Components)

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@meshTitleBackgroundColor` | `--zk-mesh-title-background-color` | Header/title cell background for Grid columns, Listbox headers, Tree headers |
| `@meshTitleColor` | `--zk-mesh-title-color` | Header/title cell text color |
| `@meshTitleHoverBackgroundColor` | `--zk-mesh-title-hover-background-color` | Header hover background |
| `@meshTitleActiveBackgroundColor` | `--zk-mesh-title-active-background-color` | Header active/sort background |
| `@meshTitleBorderColor` | `--zk-mesh-title-border-color` | Border between header cells |
| `@meshBackgroundColor` | `--zk-mesh-background-color` | Body row background (even rows) |
| `@meshStripeBackgroundColor` | `--zk-mesh-stripe-background-color` | Body row background (odd rows) — stripe/zebra effect |
| `@meshContentBorderColor` | `--zk-mesh-content-border-color` | Border between body cells |
| `@meshFootBackgroundColor` | `--zk-mesh-foot-background-color` | Footer row background |
| `@meshBodyPadding` | `--zk-mesh-body-padding` | Padding inside body cells |
| `@meshContentFocusBackgroundColor` | `--zk-mesh-content-focus-background-color` | Body cell background when focused |
| `@meshAutoPagingRowHeight` | `--zk-mesh-auto-paging-row-height` | Row height in autopaging mode |

---

## Component States (Global)

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@hoverBackgroundColor` | `--zk-hover-background-color` | Hovered item background (lists, menus, nav items) |
| `@hoverBorderColor` | `--zk-hover-border-color` | Hovered item border |
| `@selectedBackgroundColor` | `--zk-selected-background-color` | Selected item background (listbox row, tree node, comboitem) |
| `@selectedColor` | `--zk-selected-color` | Selected item text color |
| `@selectedHoverBackgroundColor` | `--zk-selected-hover-background-color` | Hovered-while-selected item background |
| `@focusBackgroundColor` | `--zk-focus-background-color` | Background when element has keyboard focus (in iceblue = primary blue) |
| `@focusBorderColor` | `--zk-focus-border-color` | Border when element has keyboard focus (= accent color in iceblue) |
| `@activeBackgroundColor` | `--zk-active-background-color` | Background during mouse-down (click active state) |
| `@disabledColor` | `--zk-disabled-color` | Text color for disabled elements |
| `@disabledBackgroundColor` | `--zk-disabled-background-color` | Background for disabled elements |
| `@disabledOpacity` | `--zk-disabled-opacity` | Opacity multiplier for disabled elements |
| `@invalidBorderColor` | `--zk-invalid-border-color` | Border color for invalid/constraint-error inputs |

---

## Window / Panel / Container

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@containerBackground` | `--zk-container-background` | Window body, Panel body background (= `colorBackground1`) |
| `@containerBorderColor` | `--zk-container-border-color` | Window border, Panel border |
| `@containerPadding` | `--zk-container-padding` | Window/Panel inner padding. Breeze-compact themes typically used `4px`; iceblue default is `16px` |
| `@windowHeaderPadding` | `--zk-window-header-padding` | Padding inside window title bar |

---

## Popup

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@popupBackgroundColor` | `--zk-popup-background-color` | Background of all popup/dropdown overlays: Combobox list, Datebox calendar, Bandbox popup, context menus. In iceblue this equals `colorBackground3`. Some themes override to an explicit `#FFFFFF` even when the container background is non-white. |
| `@popupBorderColor` | `--zk-popup-border-color` | Border of popup overlays |

---

## Navbar

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@navBackgroundColor` | `--zk-nav-background-color` | Navbar background (first level; deeper levels darken by 3% per level) |
| `@navColor` | `--zk-nav-color` | Navbar item text color |
| `@navHoverBackgroundColor` | `--zk-nav-hover-background-color` | Navbar item hover background |
| `@navSelectedColor` | `--zk-nav-selected-color` | **Selected navbar item text color** (often white in breeze-derived themes) |
| `@navSelectedBackgroundColor` | `--zk-nav-selected-background-color` | **Selected navbar item background** (breeze-derived themes often use a dark accent such as `#372F2B`) |
| `@navBorderColor` | `--zk-nav-border-color` | Navbar border |
| `@navSeparatorColor` | `--zk-nav-separator-color` | Navbar separator line |

---

## Calendar

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@weekendColor` | `--zk-weekend-color` | **Weekend day text color** in calendar/datebox. Breeze default mapped this to the accent color (often a red-orange like `#fc2800`). |
| `@weekendBackgroundColor` | `--zk-weekend-background-color` | Weekend day cell background |
| `@calendarSelectedBackgroundColor` | `--zk-calendar-selected-background-color` | Selected date cell background |
| `@calendarSelectedColor` | `--zk-calendar-selected-color` | Selected date text color |
| `@weekofyearBackgroundColor` | `--zk-weekofyear-background-color` | Week-of-year column background (breeze: dark grey; iceblue: transparent) |

---

## Scrollbar

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@scrollbarSize` | `--zk-scrollbar-size` | Scrollbar track width/height. Breeze: `16px`; iceblue: `10px`. |
| `@scrollbarBarBackgroundColor` | `--zk-scrollbar-bar-background-color` | The draggable scrollbar thumb/bar color |
| `@scrollbarBarHoverBackground` | `--zk-scrollbar-bar-hover-background` | Scrollbar bar color on hover |
| `@scrollbarBackgroundColor` | `--zk-scrollbar-background-color` | Scrollbar track (rail) background |
| `@scrollbarBorderColor` | `--zk-scrollbar-border-color` | Scrollbar border (iceblue: `transparent`) |

---

## Splitter (Hbox / Vbox / Borderlayout resize handle)

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@splitterSize` | `--zk-splitter-size` | Splitter handle width/height |
| `@splitterBackgroundColor` | `--zk-splitter-background-color` | Splitter resting background (= `colorBackground1`) |
| `@splitterHoverBackgroundColor` | `--zk-splitter-hover-background-color` | Splitter hover background (= `colorPrimaryLighter`) |
| `@splitterDragBackgroundColor` | `--zk-splitter-drag-background-color` | Splitter background while dragging |
| `@splitterBorderColor` | `--zk-splitter-border-color` | Splitter border |
| `@splitterButtonTextColors` | `--zk-splitter-button-text-colors` | Collapse button icon color (2-value list: normal, hover) |

---

## Progressmeter

| LESS Variable | CSS Variable | Controls |
|---|---|---|
| `@progressmeterBackgroundColor` | `--zk-progressmeter-background-color` | The filled progress bar color (= `@colorPrimary` in iceblue; was gradient in breeze: `#C6E9FA`) |
| `@progressmeterBorderColor` | `--zk-progressmeter-border-color` | Progress bar border |

---

## New Components (ZK 10 only — no ZK 8.x breeze equivalent)

| Component | Key variables | CSS vars |
|---|---|---|
| **Goldenlayout** | `@goldenLayoutBackgroundColor`, `@goldenLayoutHeaderBackgroundColor`, `@goldenLayoutSelectedBackgroundColor` | `--zk-golden-layout-*` |
| **Organigram** | `@orgnodeBackgroundColor`, `@orgnodeHoverBackgroundColor`, `@orgnodeSelectedBackgroundColor` | `--zk-orgnode-*` |
| **Signature** | `@signatureBorderColor`, `@signatureBorderRadius` | `--zk-signature-*` |
| **Drawer** | `@drawerBackgroundColor`, `@drawerTitleTextColor`, `@drawerMaskOpacity` | `--zk-drawer-*` |
| **Rangeslider** | `@rangesliderButtonColor`, `@rangesliderButtonHoverColor`, `@rangesliderButtonFocusBorderColor` | `--zk-rangeslider-*` |
| **Multislider** | `@multisliderButtonColor`, `@multisliderButtonColor2` | `--zk-multislider-*` |
| **Searchbox** | `@searchboxBorderColor`, `@searchboxBackgroundColor`, `@searchboxActiveBackgroundColor` | `--zk-searchbox-*` |
| **Cascader** | `@cascaderBorderColor`, `@cascaderBackgroundColor`, `@cascaderActiveBorderColor` | `--zk-cascader-*` |
| **Stepbar** | `@stepActiveColor`, `@stepInactiveColor`, `@stepErrorColor`, `@stepCompleteColor` | `--zk-step-*` |
| **Linelayout** | `@linelayoutLineColor`, `@linelayoutPointBackgroundColor` | `--zk-linelayout-*` |
| **Coachmark** | `@coachmarkBackgroundColor`, `@coachmarkMaskBackground` | `--zk-coachmark-*` |
| **Rating** | `@ratingIcon`, `@ratingIconHover`, `@ratingIconSelected` | `--zk-rating-*` |
| **Pdfviewer** | `@pdfviewerToolbarBackgroundColor`, `@pdfviewerToolbarButtonHoverBackgroundColor` | `--zk-pdfviewer-*` |
| **Inputgroup** | `@inputgroupTextBackgroundColor` | `--zk-inputgroup-*` |

All new components inherit from the shared variables (`@colorPrimary`, `@colorBackground3`, etc.)
by default. In iceblue this means they automatically pick up the primary and container colors from the theme palette.
