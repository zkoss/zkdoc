# Guide: ZK 9.6.6 breeze → ZK 9.6.6 iceblue

Switching a ZK 9.6.6 theme from the **breeze structure** to the **iceblue structure** at the same ZK version. This is a **structure update**, not a version bump — the build chain, project layout, and Java sources should stay the same. What changes is the LESS variable vocabulary and
the some of the visual design language (gradients removed, less variables changed).

This guide assumes you have already migrated to 9.6.6 breeze. If you're still on 8.x breeze, follow through [guide: breeze 8.x to 9.X]({{site.baseurl}}/zk_style_customization_guide/migration_guides/guide-breeze-8.x-to-9.6.6) first.

---

## 1. Main changes and similarities

| Area | breeze 9.6.6 | iceblue 9.6.6 |
|---|---|---|
| `pom.xml` | needs `--less-opts {"javascriptEnabled":true}` | **drop those two arguments** (iceblue's LESS doesn't use JS-side functions) |
| Project layout | `src/archive/...`, `src/org/...`, `preview/...` | identical |
| Java sources | unchanged | unchanged |
| `metainfo/zk/*.xml` | unchanged | unchanged |
| Build pipeline | `exec-maven-plugin` + `npx zklessc` | identical |
| `_header.less` import order | `_zkvariables → _zkmixins` | **`_zkvariables → profiles/_{themeProfile} → colors/_{themePalette} → _zkmixins`** |
| New constants in `_zkvariables.less` | none | `@themeProfile: "default";`, `@themePalette: "iceblue";` |
| Profile system | none | new — `profiles/_default.less` and `profiles/_compact.less` |
| Palette system | none | new — `colors/_iceblue.less` (placeholder for palette swaps) |
| Base font size | 14px | **16px** |
| Variable model | breeze names (`@textColorGray`, `@windowBackgroundColor`, gradient pairs, IE8 variables) | iceblue variables (`@colorPrimary`, `@colorBackground1/3`, `@colorGreyDark/Light/Lighter`, gradients removed) |

The main structural change: in breeze variables, such as blue are directly declared as #2184BA; in iceblue, the main branding color is `@colorPrimary`, etc. Component-level LESS files are wired against the **semantic** names, so a clean palette swap means setting those semantic variabless, not hunting down every `@textColorBlue` reference in your existing theme.

---

## 2. Step-by-step

### Step 1 — Start from the 9.6.6 iceblue template

```sh
cp -r 9.6.6/ mytheme-iceblue-9.6.6/
```

Run `./init.sh` or replace the placeholders. The `init.sh` script substitutes `___THEME_NAME___`, `___THEME_NAME_CAP___`, `___GROUP_ID___`,
`___ARTIFACT_ID___`, `___VERSION___`, `___DISPLAY_NAME___`.

> **Why scaffold from the iceblue template instead of editing the breeze template?**
> The component LESS files under `src/archive/web/js/.../less/` differ between breeze and iceblue. Iceblue dropped the gradient mixins (`.verGradient`, `.horGradient`, `.gradientFallback`), removed IE8 branches, and rewired components to use semantic variables instead of direct color matching. Manually converting your breeze project is more error-prone than carrying just your intentional customizations forward in the iceblue structure.

### Step 2 — Inventory your breeze overrides

Open your breeze `_zkvariables.less`. Make a flat list of every variable **you intentionally set** (not the ones that just match the breeze
defaults). A small breeze-derived theme will typically override ~20-30 variables and leave the rest at breeze defaults.

You can ignore gradient pairs at this stage; you'll handle them in step 4. Ignore IE8 vars completely — they no longer exist in iceblue.

### Step 3 — Translate each override to its iceblue equivalent

Walk through [guide: variable migration reference]({{site.baseurl}}/zk_style_customization_guide/migration_guides/breeze-iceblue-variable-crossreference).For each breeze variable you override:

- **`=`** (rename in name only): use the same name in iceblue.
- **`→`** (semantic shift): use the new name; check the notes column to understand whether the semantics changed.
- **`✗`** (removed): use the recommended replacement.

Common renames you'll hit early:

| breeze | iceblue |
|---|---|
| `@baseTextColor` | `@textColorDefault` |
| `@textColorGray` | `@textColorLight` |
| `@textColorGrayDark` / `…Light` | `@textColorLighter` (the two collapse) |
| `@textColorBlue` | `@colorPrimary` |
| `@textColorOrange` | `@colorAccent` |
| `@baseBackgroundColor` | `@colorBackground3` |
| `@windowBackgroundColor` / `@panelBackgroundColor` | `@containerBackground` (= `@colorBackground1`) |
| `@windowBorderColor` / `@panelBorderColor` | `@containerBorderColor` |
| `@panelBodyBackground` | ✗ — removed |
| `@tabSelectedBackgroundColor` | `@tabboxSelectedBackgroundColor` |
| `@scrollbarWidth` / `…Height` | `@scrollbarSize` (one var; iceblue default 10px vs breeze 16px) |
| `@weekColor` | `@weekdayColor` |
| `@notificationArrowColor` | ✗ — removed (flat iceblue toasts) |
| `@menuActiveBorderColor*`, `@menuPopupSeparator*` | ✗ — removed (flat menus) |
| `@meshContentHoverStart/End` | `@hoverBackgroundColor` (merged into global variable) |
| `@meshContentFocusStart/End` | `@meshContentFocusBackgroundColor` (single value, breeze End wins) |
| `@buttonGradientStart/End` | `@buttonBackgroundColor` (single value, breeze End wins; iceblue default is `@colorPrimary` not grey) |
| `@meshTitleHoverStart/End` | `@meshTitleHoverBackgroundColor` (single value, breeze End wins) |
| `@progressmeterGradientStart/End` | `@progressmeterBackgroundColor` (single value) |
| `@popupGradientStart/End`, `@scrollbarGradientStart/End`, `@splitterGradientStart/End`, `@groupGradientStart/End` | ✗ — all removed |

For new variables introduced in iceblue without a breeze equivalent, you **may set or ignore them** — the iceblue defaults (in
`profiles/_default.less` and `_zkvariables.less`) will cover them with the default style if unset.

### Step 4 — Collapse gradient pairs

Each `@xxxGradientStart` / `@xxxGradientEnd` pair maps to a single iceblue background color.
To maintain visual identity:

1. **General case**: use the **End** value (darker / more saturated).
2. **Maps to a background color variable**: e.g. `@buttonGradientStart/End` →
   `@buttonBackgroundColor`. Iceblue only uses one for each background.
3. **removed entirely**: `@popupGradientStart/End`, `@scrollbarGradientStart/End`, `@splitterGradientStart/End`, `@groupGradientStart/End` — Unused afer migration. No replacement needed.

### Step 5 — Address the background hierarchy

In breeze, setting `@baseBackgroundColor` was effectively the page background. In iceblue there are **three** layers and most ZK widgets **don't** read `@baseBackgroundColor`:

| Variable | Where it renders |
|---|---|
| `@baseBackgroundColor` | Page root backround, fallback if unset. |
| `@colorBackground1` | **Window** body, **Panel** body, Portallayout, Splitter |
| `@colorBackground3` | **Grid / Listbox / Tree rows**, Mesh body, Tabbox, Navbar, Popup, Calendar, Drawer, Coachmark, Borderlayout header, Paging bar |

### Step 6 — Address the primary color family

Iceblue derives a lot from `@colorPrimary`:

```less
@colorPrimary:        #0093F9;
@colorPrimaryDark:    #0064ED;          // = darken
@colorPrimaryLight:   lighten(@colorPrimary, 25%);
@colorPrimaryLighter: lighten(@colorPrimary, 45%);  // hover row bg
```

If you set `@colorPrimary` to your breeze blue (`#2184BA`) and rely on the `lighten()` defaults, `@colorPrimaryLighter` will end up at a near-white that may not match what you want. Set `@colorPrimaryDark`, `@colorPrimaryLight`, `@colorPrimaryLighter` **explicitly** when migrating a non-blue primary.

### Step 7 — Decide whether to use the compact profile

Iceblue's default profile assumes `@baseFontSize: 16px;`, `@inputHeight: 34px;`, `@containerPadding: 16px;`. Breeze-based apps are designed with tighter spacing. with these defaults, widgets become larger, dense tables may overflow.

If you want breeze-like density, set the profile to compact in `_zkvariables.less`:

```less
@themeProfile: "compact";
```

That switches to `profiles/_compact.less`, which sets:

| Variable | compact value |
|---|---|
| `@baseFontSize` | 12px |
| `@inputHeight` | 24px |
| `@containerPadding` | 5px |

If you want to stay close to the breeze sizing, choosing the compact version of the theme as the base for your iceblue project is the easiest starting approach.

### Step 8 — Build your override file

You have two options for where to put your iceblue values:

**Option A** — edit `_zkvariables.less` in place. Simple but harder to
diff against future ZK 9.6 template updates.

**Option B** — create a separate file (e.g.
`src/archive/web/zul/less/_<theme>.less`) and import it from
`_header.less` **after** the existing imports:

```less
// _header.less
@import "_zkvariables.less";
@import "profiles/_@{themeProfile}";
@import "colors/_@{themePalette}";
@import "_zkmixins.less";
@import "_<theme>.less";   // <-- your overrides, higher priority in CCS cascade due to being later in order
```

Option B scales better and makes future ZK upgrades easier by keeping your palette changes and ZK defaults separate — and aligns with the ZK 10 customization pattern, so the next migration is cheaper.

### Step 9 — `pom.xml` cleanup

Compare to the breeze 9.6.6 pom (single non-trivial difference):

```diff
   <argument>${zktheme.theme.outputDirectory}</argument>
   <argument>--compress</argument>
-  <argument>--less-opts</argument>
-  <argument>{"javascriptEnabled":true}</argument>
 </arguments>
```

Iceblue's LESS doesn't call `Lighten(...)` / `Darken(...)` as runtime JS
functions (it uses LESS's built-in `lighten()` / `darken()` instead, which
are pure LESS), so the `--less-opts` argument can be dropped. The build
will work with it left in, but iceblue templates omit it.

---

## 3. Reference card — file-by-file edits

| File | breeze 9.6.6 | iceblue 9.6.6 | Action |
|---|---|---|---|
| `pom.xml` | uses `--less-opts` | drops `--less-opts` | trim 2 lines |
| `package.json` | exists | identical | keep |
| `assembly/*.xml` | exists | identical | keep |
| `src/archive/metainfo/zk/*.xml` | breeze-era | identical structure | keep, bump `version-uid` if you changed it |
| `src/archive/web/zul/less/_header.less` | imports `_zkvariables`, `_zkmixins` | adds `profiles/_@{themeProfile}` and `colors/_@{themePalette}` between them | **replace** |
| `src/archive/web/zul/less/_zkvariables.less` | breeze palette | iceblue palette + `@themeProfile`/`@themePalette` at top | **replace, then re-add your intentional overrides at the bottom (or in a sidecar file)** |
| `src/archive/web/zul/less/_zkmixins.less` | has `.verGradient`, `.horGradient` | leaner | **replace** |
| `src/archive/web/zul/less/profiles/_default.less` | n/a | new | **add** (template provides empty) |
| `src/archive/web/zul/less/profiles/_compact.less` | n/a | new | **add** (template provides) |
| `src/archive/web/zul/less/colors/_iceblue.less` | n/a | new (empty) | **add** |
| `src/archive/web/js/.../less/*.less` | breeze-styled components | iceblue-styled components | **replace all from template** |
| Java sources, `Version.java` etc. | unchanged | unchanged | carry |

---

## 4. What's next

To take this iceblue 9.6.6 theme to ZK 10.3.0, run [guide: iceblue 9.X to 10.X]({{site.baseurl}}/zk_style_customization_guide/migration_guides/guide-iceblue-9.6.6-to-10.3.0). This steps contains architectural shifts to CSS-variable / LESS variables and the project layout move from `src/archive` to `src/main/resources`.
