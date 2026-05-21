# Component-Level Variable Reference: ZK 10.3.0

This document lists the LESS variables (and their CSS custom property equivalents) that control
each ZK component's appearance. Use this identify which variables to edit in order to change a specific component's look.

Variables marked **[shared]** are global variables used by multiple components.
Variables marked **[component]** are specific to that component.

---

## Global variables (affect all or most components)

These must be set first — most per-component variables derive from them.

| Variable | CSS var | Purpose |
|---|---|---|
| `@colorPrimary` | `--zk-color-primary` | Primary brand color: drives headers, buttons, scrollbars, active states |
| `@colorBackground3` | `--zk-color-background3` | Container surface color: grid rows, navbars, popups, tabbox |
| `@colorBackground1` | `--zk-color-background1` | Elevated surface: window body, panel body, splitter |
| `@baseBorderColor` | `--zk-base-border-color` | Default border used by most components |
| `@baseTextColor` / `@textColorDefault` | `--zk-text-color-default` | Primary text color |
| `@hoverBackgroundColor` | `--zk-hover-background-color` | Hover state for list items, menu items, nav items |
| `@selectedBackgroundColor` | `--zk-selected-background-color` | Selected item background |
| `@focusBorderColor` | `--zk-focus-border-color` | Keyboard focus ring color |
| `@disabledColor` | `--zk-disabled-color` | Disabled element text |
| `@disabledBackgroundColor` | `--zk-disabled-background-color` | Disabled element background |

---

## Textbox / Intbox / Doublebox / Longbox / Decimalbox

| Variable | CSS var | What it controls |
|---|---|---|
| `@inputBorderColor` **[component]** | `--zk-input-border-color` | Border |
| `@inputBackgroundColor` **[component]** | `--zk-input-background-color` | Background |
| `@inputHeight` **[component]** | `--zk-input-height` | Height (iceblue: 34px, breeze: 22px) |
| `@inputPadding` **[component]** | `--zk-input-padding` | Internal padding |
| `@inputColor` **[component]** | `--zk-input-color` | Text color |
| `@inputPlaceholderColor` **[component]** | `--zk-input-placeholder-color` | Placeholder text |
| `@inputHoverBorderColor` **[component]** | `--zk-input-hover-border-color` | Border on hover |
| `@inputFocusBorderColor` **[component]** | `--zk-input-focus-border-color` | Border on focus |
| `@inputDisableBackgroundColor` **[component]** | `--zk-input-disable-background-color` | Disabled background |
| `@readonlyBorderColor` **[shared]** | `--zk-readonly-border-color` | Readonly border |
| `@readonlyBackgroundColor` **[shared]** | `--zk-readonly-background-color` | Readonly background |
| `@invalidBorderColor` **[shared]** | `--zk-invalid-border-color` | Constraint violation border |

---

## Combobox / Datebox / Bandbox / Timebox / Spinner

These extend the input system with a dropdown button.

| Variable | CSS var | What it controls |
|---|---|---|
| `@inputBorderColor` **[shared]** | `--zk-input-border-color` | Input area border |
| `@comboInputHeight` **[component]** | `--zk-combo-input-height` | Total height (34px iceblue) |
| `@comboButtonIconColor` **[component]** | `--zk-combo-button-icon-color` | Dropdown arrow icon color |
| `@comboButtonHoverBorderColor` **[component]** | `--zk-combo-button-hover-border-color` | Dropdown button hover border |
| `@comboButtonHoverBackgroundColor` **[component]** | `--zk-combo-button-hover-background-color` | Dropdown button hover bg |
| `@comboButtonActiveBackgroundColor` **[component]** | `--zk-combo-button-active-background-color` | Dropdown button active bg |
| `@comboPopupBorderColor` **[component]** | `--zk-combo-popup-border-color` | Popup border |
| `@comboPopupItemColor` **[component]** | `--zk-combo-popup-item-color` | Dropdown item text |
| `@comboPopupItemHoverBackgroundColor` **[component]** | `--zk-combo-popup-item-hover-background-color` | Dropdown item hover bg |
| `@comboPopupItemSelectedColor` **[component]** | `--zk-combo-popup-item-selected-color` | Selected item text |

---

## Button / Combobutton

| Variable | CSS var | What it controls |
|---|---|---|
| `@buttonBackgroundColor` **[component]** | `--zk-button-background-color` | Default button background |
| `@buttonColor` **[component]** | `--zk-button-color` | Button text color |
| `@buttonBorderColor` **[component]** | `--zk-button-border-color` | Button border |
| `@buttonBorderWidth` **[component]** | `--zk-button-border-width` | Border width |
| `@buttonPadding` **[component]** | `--zk-button-padding` | Button padding |
| `@buttonHoverBackgroundColor` **[component]** | `--zk-button-hover-background-color` | Hover background |
| `@buttonHoverColor` **[component]** | `--zk-button-hover-color` | Hover text color |
| `@buttonActiveBackgroundColor` **[component]** | `--zk-button-active-background-color` | Click/press background |
| `@buttonDisableBackgroundColor` **[component]** | `--zk-button-disable-background-color` | Disabled background |
| `@buttonDisableColor` **[component]** | `--zk-button-disable-color` | Disabled text |
| `@buttonFocusBorderColor` **[component]** | `--zk-button-focus-border-color` | Focus ring border |

---

## Toolbarbutton

| Variable | CSS var | What it controls |
|---|---|---|
| `@toolbarButtonColor` **[component]** | `--zk-toolbar-button-color` | Icon/text color (default: `@textColorLight`) |
| `@toolbarButtonBackgroundColor` **[component]** | `--zk-toolbar-button-background-color` | Background (default: `transparent`) |
| `@toolbarButtonCheckedColor` **[component]** | `--zk-toolbar-button-checked-color` | Text when checked (default: `@textColorDefault3` = white) |
| `@toolbarButtonCheckedBackgroundColor` **[component]** | `--zk-toolbar-button-checked-background-color` | Background when checked (default: `@colorPrimary`) |

---

## Grid / Listbox / Tree / Biglistbox (Mesh Components)

| Variable | CSS var | What it controls |
|---|---|---|
| `@meshTitleBackgroundColor` **[component]** | `--zk-mesh-title-background-color` | **Column header background** |
| `@meshTitleColor` **[component]** | `--zk-mesh-title-color` | Column header text color |
| `@meshTitleHoverBackgroundColor` **[component]** | `--zk-mesh-title-hover-background-color` | Header cell hover bg |
| `@meshTitleActiveBackgroundColor` **[component]** | `--zk-mesh-title-active-background-color` | Header cell active/sorted bg |
| `@meshTitleBorderColor` **[component]** | `--zk-mesh-title-border-color` | Border between header cells |
| `@meshBackgroundColor` **[component]** | `--zk-mesh-background-color` | Body row background (even rows) |
| `@meshStripeBackgroundColor` **[component]** | `--zk-mesh-stripe-background-color` | Body row background (odd rows) |
| `@meshContentBorderColor` **[component]** | `--zk-mesh-content-border-color` | Border between body cells |
| `@meshFootBackgroundColor` **[component]** | `--zk-mesh-foot-background-color` | Footer row background |
| `@meshBodyPadding` **[component]** | `--zk-mesh-body-padding` | Cell content padding |
| `@meshContentFocusBackgroundColor` **[component]** | `--zk-mesh-content-focus-background-color` | Cell background when focused |
| `@meshGroupBackgroundColor` **[component]** | `--zk-mesh-group-background-color` | Group row background |
| `@selectedBackgroundColor` **[shared]** | `--zk-selected-background-color` | Selected row highlight |
| `@hoverBackgroundColor` **[shared]** | `--zk-hover-background-color` | Hovered row highlight |
| `@meshAutoPagingRowHeight` **[component]** | `--zk-mesh-auto-paging-row-height` | Auto-paging row height |

---

## Window

| Variable | CSS var | What it controls |
|---|---|---|
| `@containerBackground` **[shared]** | `--zk-container-background` | Window body background |
| `@containerBorderColor` **[shared]** | `--zk-container-border-color` | Window border |
| `@containerPadding` **[shared]** | `--zk-container-padding` | Window body inner padding |
| `@windowHeaderPadding` **[component]** | `--zk-window-header-padding` | Title bar padding |
| `@containerHeaderColor` **[shared]** | `--zk-container-header-color` | Title bar text color |

---

## Panel / Groupbox

| Variable | CSS var | What it controls |
|---|---|---|
| `@containerBackground` **[shared]** | `--zk-container-background` | Panel body background |
| `@containerBorderColor` **[shared]** | `--zk-container-border-color` | Panel border |
| `@containerPadding` **[shared]** | `--zk-container-padding` | Panel body inner padding |
| `@panelHeaderPadding` **[component]** | `--zk-panel-header-padding` | Caption bar padding |
| `@containerHeaderColor` **[shared]** | `--zk-container-header-color` | Caption text color |

---

## Tabbox / Tab

| Variable | CSS var | What it controls |
|---|---|---|
| `@tabboxBackgroundColor` **[component]** | `--zk-tabbox-background-color` | Tabbox background (= `colorBackground3`) |
| `@tabboxTabColor` **[component]** | `--zk-tabbox-tab-color` | Inactive tab text (= `textColorLight`) |
| `@tabboxTabBackgroundColor` **[component]** | `--zk-tabbox-tab-background-color` | Inactive tab background |
| `@tabboxTabHoverColor` **[component]** | `--zk-tabbox-tab-hover-color` | Tab text on hover |
| `@tabboxSelectedColor` **[component]** | `--zk-tabbox-selected-color` | Active tab text color (= `@colorPrimary`) |
| `@tabboxSelectedBorderColor` **[component]** | `--zk-tabbox-selected-border-color` | Active tab indicator (bottom line) |
| `@tabboxSelectedBackgroundColor` **[component]** | `--zk-tabbox-selected-background-color` | Active tab background |
| `@tabboxTabMinHeight` **[component]** | `--zk-tabbox-tab-min-height` | Minimum tab height (48px in iceblue) |

---

## Menu / Menubar / Menuitem

| Variable | CSS var | What it controls |
|---|---|---|
| `@menuBackground` **[component]** | `--zk-menu-background` | Menubar background |
| `@menuItemColor` **[component]** | `--zk-menu-item-color` | Menu item text (= `textColorLight`) |
| `@menuItemHoverBackground` **[component]** | `--zk-menu-item-hover-background` | Menu item hover bg |
| `@menuItemActiveBackground` **[component]** | `--zk-menu-item-active-background` | Menu item active/clicked bg |
| `@menuPopupBackground` **[component]** | `--zk-menu-popup-background` | Popup menu background |
| `@menuPopupItemHoverBackground` **[component]** | `--zk-menu-popup-item-hover-background` | Popup item hover bg |
| `@menuSeparatorBorderColor` **[component]** | `--zk-menu-separator-border-color` | Separator line |

---

## Navbar / Nav

| Variable | CSS var | What it controls |
|---|---|---|
| `@navBackgroundColor` **[component]** | `--zk-nav-background-color` | Navbar background |
| `@navColor` **[component]** | `--zk-nav-color` | Nav item text |
| `@navHoverBackgroundColor` **[component]** | `--zk-nav-hover-background-color` | Nav item hover |
| `@navSelectedColor` **[component]** | `--zk-nav-selected-color` | **Selected item text** (often white in breeze-derived themes) |
| `@navSelectedBackgroundColor` **[component]** | `--zk-nav-selected-background-color` | **Selected item bg** (e.g. a dark `#372F2B` for breeze-derived themes) |
| `@navBorderColor` **[component]** | `--zk-nav-border-color` | Nav border |
| `@navSeparatorColor` **[component]** | `--zk-nav-separator-color` | Separator between nav groups |
| `@navCollapsedWidth` **[component]** | `--zk-nav-collapsed-width` | Width when navbar is collapsed |

---

## Borderlayout (North/South/East/West/Center)

| Variable | CSS var | What it controls |
|---|---|---|
| `@borderlayoutHeaderBackgroundColor` **[component]** | `--zk-borderlayout-header-background-color` | Section header background |
| `@borderlayoutHeaderColor` **[component]** | `--zk-borderlayout-header-color` | Section header text |
| `@borderlayoutBodyPadding` **[component]** | `--zk-borderlayout-body-padding` | Content area padding |
| `@borderlayoutCollapsedSize` **[component]** | `--zk-borderlayout-collapsed-size` | Collapsed section size |
| `@baseBorderColor` **[shared]** | `--zk-base-border-color` | Section borders |

---

## Calendar / Datebox (calendar popup)

| Variable | CSS var | What it controls |
|---|---|---|
| `@calendarBackgroundColor` **[component]** | `--zk-calendar-background-color` | Calendar background |
| `@calendarTitleColor` **[component]** | `--zk-calendar-title-color` | Month/year title text |
| `@calendarCellColor` **[component]** | `--zk-calendar-cell-color` | Day cell text |
| `@calendarCellHoverBackgroundColor` **[component]** | `--zk-calendar-cell-hover-background-color` | Day cell hover |
| `@calendarSelectedBackgroundColor` **[component]** | `--zk-calendar-selected-background-color` | Selected date bg |
| `@calendarSelectedColor` **[component]** | `--zk-calendar-selected-color` | Selected date text |
| `@weekendColor` **[component]** | `--zk-weekend-color` | Weekend day text (breeze mapped this to the accent color; e.g. `#fc2800` red-orange) |
| `@weekendBackgroundColor` **[component]** | `--zk-weekend-background-color` | Weekend day bg |
| `@weekofyearBackgroundColor` **[component]** | `--zk-weekofyear-background-color` | Week number column bg |

---

## Slider

| Variable | CSS var | What it controls |
|---|---|---|
| `@sliderBackgroundColor` **[component]** | `--zk-slider-background-color` | Track background |
| `@sliderAreaBackgroundColor` **[component]** | `--zk-slider-area-background-color` | Filled track area (= `@colorPrimary`) |
| `@sliderInputColor` **[component]** | `--zk-slider-input-color` | Value label text |
| `@tooltipBackgroundColor` **[shared]** | `--zk-tooltip-background-color` | Value tooltip bg (= `@colorAccent3`) |

---

## Paging

| Variable | CSS var | What it controls |
|---|---|---|
| `@pagingColor` **[component]** | `--zk-paging-color` | Page link text |
| `@pagingBorderColor` **[component]** | `--zk-paging-border-color` | Paging area border |
| `@pagingBackgroundColor` **[component]** | `--zk-paging-background-color` | Paging area background |
| `@pagingItemHoverBackgroundColor` **[component]** | `--zk-paging-item-hover-background-color` | Page button hover |
| `@pagingItemActiveBackgroundColor` **[component]** | `--zk-paging-item-active-background-color` | Current page button bg |
| `@pagingItemSelectedColor` **[component]** | `--zk-paging-item-selected-color` | Current page text |

---

## Splitter (Hbox / Vbox resize handle)

| Variable | CSS var | What it controls |
|---|---|---|
| `@splitterSize` **[component]** | `--zk-splitter-size` | Handle width/height |
| `@splitterBackgroundColor` **[component]** | `--zk-splitter-background-color` | Resting background |
| `@splitterHoverBackgroundColor` **[component]** | `--zk-splitter-hover-background-color` | Hover background |
| `@splitterDragBackgroundColor` **[component]** | `--zk-splitter-drag-background-color` | While dragging |
| `@splitterBorderColor` **[component]** | `--zk-splitter-border-color` | Handle border |
| `@splitterButtonTextColors` **[component]** | `--zk-splitter-button-text-colors` | Collapse button icon colors |
| `@splitterButtonTextSize` **[component]** | `--zk-splitter-button-text-size` | Collapse button icon size |

---

## Scrollbar

| Variable | CSS var | What it controls |
|---|---|---|
| `@scrollbarSize` **[component]** | `--zk-scrollbar-size` | Track width/height |
| `@scrollbarBarBackgroundColor` **[component]** | `--zk-scrollbar-bar-background-color` | Scrollbar thumb |
| `@scrollbarBarHoverBackground` **[component]** | `--zk-scrollbar-bar-hover-background` | Thumb on hover |
| `@scrollbarBackgroundColor` **[component]** | `--zk-scrollbar-background-color` | Track/rail background |
| `@scrollbarBorderColor` **[component]** | `--zk-scrollbar-border-color` | Track border |

---

## Progressmeter

| Variable | CSS var | What it controls |
|---|---|---|
| `@progressmeterBackgroundColor` **[component]** | `--zk-progressmeter-background-color` | Filled bar color (= `@colorPrimary`; breeze was `#C6E9FA`) |
| `@progressmeterBorderColor` **[component]** | `--zk-progressmeter-border-color` | Outer border |

---

## Chosenbox

| Variable | CSS var | What it controls |
|---|---|---|
| `@chosenboxItemBorderColor` **[component]** | `--zk-chosenbox-item-border-color` | Selected tag border |
| `@chosenboxItemBackgroundColor` **[component]** | `--zk-chosenbox-item-background-color` | Selected tag bg |
| `@chosenboxItemColor` **[component]** | `--zk-chosenbox-item-color` | Selected tag text |
| `@chosenboxCreateIconColor` **[component]** | `--zk-chosenbox-create-icon-color` | "Create new" icon color |
| `@chosenboxPopupHoverBackgroundColor` **[component]** | `--zk-chosenbox-popup-hover-background-color` | Dropdown item hover |

---

## Errorbox (constraint violation tooltip)

| Variable | CSS var | What it controls |
|---|---|---|
| `@errorboxColor` **[component]** | `--zk-errorbox-color` | Error text (= `@colorAccent2`) |
| `@errorboxBorderColor` **[component]** | `--zk-errorbox-border-color` | Error border |
| `@errorboxBackgroundColor` **[component]** | `--zk-errorbox-background-color` | Error bg (light red/pink) |

---

## Notification

| Variable | CSS var | What it controls |
|---|---|---|
| `@notificationInfoColor` **[component]** | `--zk-notification-info-color` | Info toast indicator color |
| `@notificationWarningColor` **[component]** | `--zk-notification-warning-color` | Warning toast indicator |
| `@notificationErrorColor` **[component]** | `--zk-notification-error-color` | Error toast indicator |

---

## New Components (ZK 10 only)

### Goldenlayout

| Variable | CSS var | What it controls |
|---|---|---|
| `@goldenLayoutBackgroundColor` | `--zk-golden-layout-background-color` | Panel area background (= `colorBackground1`) |
| `@goldenLayoutHeaderBackgroundColor` | `--zk-golden-layout-header-background-color` | Tab strip background (= `colorBackground3`) |
| `@goldenLayoutSelectedBorderColor` | `--zk-golden-layout-selected-border-color` | Active tab bottom border (= `colorPrimary`) |
| `@goldenLayoutHeaderColor` | `--zk-golden-layout-header-color` | Tab text |

### Organigram

| Variable | CSS var | What it controls |
|---|---|---|
| `@orgnodeBackgroundColor` | `--zk-orgnode-background-color` | Node card background (= `colorBackground3`) |
| `@orgnodeHoverBackgroundColor` | `--zk-orgnode-hover-background-color` | Node hover bg |
| `@orgnodeSelectedBackgroundColor` | `--zk-orgnode-selected-background-color` | Selected node bg (= `colorPrimary`) |
| `@orgnodeSelectedColor` | `--zk-orgnode-selected-color` | Selected node text |

### Signature

| Variable | CSS var | What it controls |
|---|---|---|
| `@signatureBorderColor` | `--zk-signature-border-color` | Canvas border |
| `@signatureBorderRadius` | `--zk-signature-border-radius` | Canvas border radius |

### Drawer

| Variable | CSS var | What it controls |
|---|---|---|
| `@drawerBackgroundColor` | `--zk-drawer-background-color` | Panel background (= `colorBackground3`) |
| `@drawerMaskOpacity` | `--zk-drawer-mask-opacity` | Overlay mask opacity (0.5) |
| `@drawerTitleTextColor` | `--zk-drawer-title-text-color` | Title text |
| `@drawerTitleLineColor` | `--zk-drawer-title-line-color` | Title underline |

### Rangeslider / Multislider

| Variable | CSS var | What it controls |
|---|---|---|
| `@rangesliderButtonColor` | `--zk-rangeslider-button-color` | Handle color (= `colorPrimary`) |
| `@rangesliderButtonHoverColor` | `--zk-rangeslider-button-hover-color` | Handle hover (= `colorPrimaryLight`) |
| `@rangesliderButtonFocusBorderColor` | `--zk-rangeslider-button-focus-border-color` | Handle focus ring (= `colorAccent`) |
| `@rangesliderTrackColor` | `--zk-rangeslider-track-color` | Track background |

### Searchbox

| Variable | CSS var | What it controls |
|---|---|---|
| `@searchboxBorderColor` | `--zk-searchbox-border-color` | Input border (= `inputBorderColor`) |
| `@searchboxBackgroundColor` | `--zk-searchbox-background-color` | Input background |
| `@searchboxActiveBackgroundColor` | `--zk-searchbox-active-background-color` | Active/expanded state bg |
| `@searchboxPopupItemHoverBackgroundColor` | `--zk-searchbox-popup-item-hover-background-color` | Dropdown item hover |

### Cascader

| Variable | CSS var | What it controls |
|---|---|---|
| `@cascaderBorderColor` | `--zk-cascader-border-color` | Input border (= `inputBorderColor`) |
| `@cascaderBackgroundColor` | `--zk-cascader-background-color` | Input background |
| `@cascaderActiveBorderColor` | `--zk-cascader-active-border-color` | Active state border |
| `@cascaderPopupItemHoverBackgroundColor` | `--zk-cascader-popup-item-hover-background-color` | Dropdown item hover |

### Stepbar

| Variable | CSS var | What it controls |
|---|---|---|
| `@stepActiveColor` | `--zk-step-active-color` | Active/current step color (= `colorPrimary`) |
| `@stepInactiveColor` | `--zk-step-inactive-color` | Inactive step color |
| `@stepCompleteColor` | `--zk-step-complete-color` | Completed step color |
| `@stepErrorColor` | `--zk-step-error-color` | Error step color (= `colorAccent2`) |

### Linelayout

| Variable | CSS var | What it controls |
|---|---|---|
| `@linelayoutLineColor` | `--zk-linelayout-line-color` | Connecting line (= `colorPrimary`) |
| `@linelayoutPointBackgroundColor` | `--zk-linelayout-point-background-color` | Timeline node background |
| `@linelayoutPointIconColor` | `--zk-linelayout-point-icon-color` | Icon inside node |

### Coachmark

| Variable | CSS var | What it controls |
|---|---|---|
| `@coachmarkBackgroundColor` | `--zk-coachmark-background-color` | Tooltip card background |
| `@coachmarkMaskBackground` | `--zk-coachmark-mask-background` | Page overlay (rgba black) |

### Rating

| Variable | CSS var | What it controls |
|---|---|---|
| `@ratingIcon` | `--zk-rating-icon` | Empty star color |
| `@ratingIconHover` | `--zk-rating-icon-hover` | Star color on hover |
| `@ratingIconSelected` | `--zk-rating-icon-selected` | Filled/selected star color |
| `@ratingDisabled` | `--zk-rating-disabled` | Disabled star color |

### Pdfviewer

| Variable | CSS var | What it controls |
|---|---|---|
| `@pdfviewerToolbarBackgroundColor` | `--zk-pdfviewer-toolbar-background-color` | Toolbar background (= `colorBackground3`) |
| `@pdfviewerToolbarButtonHoverBackgroundColor` | `--zk-pdfviewer-toolbar-button-hover-background-color` | Toolbar button hover |
| `@pdfviewerToolbarButtonActiveBackgroundColor` | `--zk-pdfviewer-toolbar-button-active-background-color` | Toolbar button active |

### Inputgroup

| Variable | CSS var | What it controls |
|---|---|---|
| `@inputgroupTextBackgroundColor` | `--zk-inputgroup-text-background-color` | Addon text background (`#E9ECEF`) |

---

## Drag and Drop (global)

| Variable | CSS var | What it controls |
|---|---|---|
| `@dragBackgroundColor` | `--zk-drag-background-color` | Dragged item card background |
| `@dragHoverBackgroundColor` | `--zk-drag-hover-background-color` | Valid drop target hover |
| `@dragAllowBorderColor` | `--zk-drag-allow-border-color` | Valid drop target border |
| `@dragDisAllowBorderColor` | `--zk-drag-disallow-border-color` | Invalid drop target border |
| `@dragDisAllowBackgroundColor` | `--zk-drag-disallow-background-color` | Invalid drop target bg |

---

## Mask / Loading

| Variable | CSS var | What it controls |
|---|---|---|
| `@maskBackgroundColor` | `--zk-mask-background-color` | Component loading overlay |
| `@loadingBackgroundColor` | `--zk-loading-background-color` | Full-page loading bg |
