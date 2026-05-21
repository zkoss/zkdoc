# Guide: ZK 9.6.6 breeze → ZK 9.6.6 iceblue

Switching a ZK 9.6.6 theme from the **breeze palette** to the **iceblue
palette** at the same ZK version. This is a **palette swap with structural
renames**, not a version bump — the build chain, project layout, and Java
sources stay the same. What changes is the LESS variable vocabulary and
the visual design language (gradients abolished, semantic tokens
introduced).

This guide assumes you have already migrated to 9.6.6 breeze. If you're
still on 8.x breeze, run `guide-breeze-8.x-to-9.6.6.md` first.

---

## 1. What changes (and what doesn't)

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
| Variable model | breeze names (`@textColorGray`, `@windowBackgroundColor`, gradient pairs, IE8 tokens) | iceblue semantic tokens (`@colorPrimary`, `@colorBackground1/3`, `@colorGreyDark/Light/Lighter`, gradients abolished) |

The big mental shift: in breeze you said "blue is #2184BA and orange is
`@textColorOrange`"; in iceblue you say "the brand color is `@colorPrimary`,
container surfaces are `@colorBackground3`, elevated surfaces are
`@colorBackground1`". Component LESS files are wired against the **semantic**
names, so a clean palette swap means setting those semantic vars, not
hunting down every `@textColorBlue` reference.

---

## 2. Step-by-step

### Step 1 — Start from the 9.6.6 iceblue template

```sh
cp -r 9.6.6/ mytheme-iceblue-9.6.6/
```

Run `./init.sh` or replace the placeholders. The `init.sh` script
substitutes `___THEME_NAME___`, `___THEME_NAME_CAP___`, `___GROUP_ID___`,
`___ARTIFACT_ID___`, `___VERSION___`, `___DISPLAY_NAME___`.

> **Why scaffold from the iceblue template and not edit the breeze one?**
> The component LESS files under `src/archive/web/js/.../less/` differ
> between breeze and iceblue. Iceblue dropped the gradient mixins
> (`.verGradient`, `.horGradient`, `.gradientFallback`), removed IE8
> branches, and rewired components to use the semantic tokens. Manually
> converting your breeze tree is more error-prone than carrying just your
> intentional customizations forward.

### Step 2 — Inventory your breeze overrides

Open your breeze `_zkvariables.less`. Make a flat list of every variable
**you intentionally set** (not the ones that just match the breeze
defaults). A small breeze-derived theme will typically override
~20-30 variables and leave the rest at breeze defaults.

Forget gradient pairs at this stage; you'll collapse them in step 4.
Forget IE8 vars completely — they don't exist in iceblue.

### Step 3 — Translate each override to its iceblue equivalent

Walk through `migration-data/breeze-iceblue-variable-crossreference.md`.
For each breeze variable you override:

- **`=`** (rename in name only): use the same name in iceblue.
- **`→`** (semantic shift): use the new name; check the notes column to
  understand whether the semantics changed.
- **`✗`** (removed): use the recommended replacement, typically a
  semantic token. `migration-data/full-variable-mapping-table.md` has
  the recommended values per overridden variable.

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
| `@meshContentHoverStart/End` | `@hoverBackgroundColor` (merged into global token) |
| `@meshContentFocusStart/End` | `@meshContentFocusBackgroundColor` (single value, breeze End wins) |
| `@buttonGradientStart/End` | `@buttonBackgroundColor` (single value, breeze End wins; iceblue default is `@colorPrimary` not grey) |
| `@meshTitleHoverStart/End` | `@meshTitleHoverBackgroundColor` (single value, breeze End wins) |
| `@progressmeterGradientStart/End` | `@progressmeterBackgroundColor` (single value) |
| `@popupGradientStart/End`, `@scrollbarGradientStart/End`, `@splitterGradientStart/End`, `@groupGradientStart/End` | ✗ — all abolished |

For new tokens iceblue introduced that breeze had no equivalent for, you
**don't have to set them** — the iceblue defaults (in
`profiles/_default.less` plus the top of `_zkvariables.less`) cover them.
Override only when you want something different.

### Step 4 — Collapse gradient pairs

Each `@xxxGradientStart` / `@xxxGradientEnd` pair maps to a single iceblue
background color. Rules (full table in
`migration-data/full-variable-mapping-table.md` §"Gradient Collapse
Rules"):

1. **General**: use the **End** value (darker / more saturated).
2. **Peach gradients** (`@baseGradientStart: #fcd5b4` / `#fff4ea`): use
   the **Start** — it's the distinctive color.
3. **Sky-blue states** (`@hoverGradientStart: #F2F9FE` / `…End: #D6F0FD`):
   use the **End** — that's the blue tint that defines the hover look.
4. **Maps to a semantic token**: e.g. `@buttonGradientStart/End` →
   `@buttonBackgroundColor`. You only get one slot.
5. **Abolished entirely**: `@popupGradientStart/End`,
   `@scrollbarGradientStart/End`, `@splitterGradientStart/End`,
   `@groupGradientStart/End` — drop them. No replacement.

### Step 5 — Address the background hierarchy (most common gotcha)

In breeze, setting `@baseBackgroundColor` was effectively the page
background. In iceblue there are **three** layers and most ZK widgets
**don't** read `@baseBackgroundColor`:

| Variable | Where it renders |
|---|---|
| `@baseBackgroundColor` | Page root, fallback. Affects very little. |
| `@colorBackground1` | **Window** body, **Panel** body, Portallayout, Splitter |
| `@colorBackground3` | **Grid / Listbox / Tree rows**, Mesh body, Tabbox, Navbar, Popup, Calendar, Drawer, Coachmark, Borderlayout header, Paging bar |

If your breeze theme set `@baseBackgroundColor: #E7E7E7`, in iceblue you
typically want:

```less
@colorBackground3: #E7E7E7;   // container surfaces — biggest visual area
@colorBackground1: #E7E7E7;   // (or a slightly different shade for elevated surfaces)
@baseBackgroundColor: #E7E7E7; // for completeness; rarely visible
```

This is the #1 cause of "I set the background and grids are still white".

### Step 6 — Address the primary color family

Iceblue derives a lot from `@colorPrimary`:

```less
@colorPrimary:        #0093F9;
@colorPrimaryDark:    #0064ED;          // = darken
@colorPrimaryLight:   lighten(@colorPrimary, 25%);
@colorPrimaryLighter: lighten(@colorPrimary, 45%);  // hover row bg
```

If you set `@colorPrimary` to your breeze blue (`#2184BA`) and rely on
the `lighten()` defaults, `@colorPrimaryLighter` will end up at a near-white
that may not match what you want. Set `@colorPrimaryDark`,
`@colorPrimaryLight`, `@colorPrimaryLighter` **explicitly** when migrating
a non-blue primary.

### Step 7 — Decide whether to use the compact profile

Iceblue's default profile assumes `@baseFontSize: 16px;`,
`@inputHeight: 34px;`, `@containerPadding: 16px;`. Breeze-era apps usually
look "too airy" with these defaults — widgets become large, dense tables
overflow.

If you want breeze-like density, set in `_zkvariables.less`:

```less
@themeProfile: "compact";
```

That switches to `profiles/_compact.less`, which sets:

| Token | compact value |
|---|---|
| `@baseFontSize` | 12px |
| `@inputHeight` | 24px |
| `@containerPadding` | 5px |

Often this single line saves a hundred individual overrides.

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
@import "_<theme>.less";   // <-- your overrides, win the cascade
```

Option B scales better and makes future ZK upgrades easier — and aligns
with the ZK 10 customization pattern, so the next migration is cheaper.

### Step 9 — Sanity-check by reading `_default.less`

Open `9.6.6/src/archive/web/zul/less/profiles/_default.less`. It's
nearly blank — most iceblue defaults are inlined in `_zkvariables.less`
itself. The profile system is there for **scale tweaks** (font sizes,
heights, paddings); the **color palette** is hooked through
`colors/_<themePalette>.less`, which is also nearly blank for iceblue
itself (it's the extension point for theme-pack alternates like
`montana.less` or `sapphire.less`).

If you want to ship multiple palette variants, drop a new
`colors/_<myname>.less` and toggle `@themePalette: "<myname>";` in your
override file. The component LESS files don't need to change.

### Step 10 — `pom.xml` cleanup

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

### Step 11 — Build and visually verify

```sh
npm install
mvn clean package
mvn test exec:java@preview-app   # http://localhost:8080
```

Open the preview app. Walk through every page in `preview/web/`. The
ZULs ship pre-populated with one of each component type; comparing the
rendered look to your breeze deployment is the fastest way to spot
mappings you missed.

---

## 3. Common gotchas

### "Grids are still white after I set my container background"

You set `@baseBackgroundColor`. Iceblue grids read `@colorBackground3`.
Set both (and `@colorBackground1` for window/panel bodies). See §Step 5.

### "Buttons are blue instead of grey"

Iceblue defaults buttons to `@colorPrimary` background with
`@textColorDefault3` (white) text. To get the breeze look back:

```less
@buttonBackgroundColor: #EEEEEE;
@buttonColor: #000000;
@buttonBorderColor: #A9A9A9;
@buttonBorderWidth: 1px;    // iceblue default is 2px transparent
@buttonHoverBackgroundColor: #D6F0FD;
```

### "Hover/selected rows are too bright"

You set `@colorPrimary` without setting `@colorPrimaryLighter`. The
`lighten(@colorPrimary, 45%)` default produces near-white for non-blue
primaries. Set `@colorPrimaryLighter` explicitly.

### "My breeze gradient went away and now buttons look flat"

Correct — iceblue is intentionally flat. Either accept it (the iceblue
design language) or use CSS in your override file to re-apply a
`linear-gradient(...)` background on the relevant `.z-button`. ZK 9.6.6
no longer ships gradient mixins (`.verGradient`, `.horGradient` —
removed); use vanilla CSS.

### "`@weekColor` doesn't work anymore"

Renamed to `@weekdayColor`. Same value, different name.

### "Notifications look wrong / missing arrows"

Iceblue toasts are flat boxes without arrow indicators.
`@notificationArrowColor` was removed. If you need arrows, add them via
your own CSS in the override file.

### "Calendar weekend cells aren't highlighted"

Breeze defaulted `@weekendBackgroundColor: #F2F2F2;` (light grey).
Iceblue defaults to `transparent`. Set it back if you want the breeze
look.

### "I get LESS errors about undefined `@xxxGradientStart`"

You inherited a custom component LESS file from a breeze project that
calls `.verGradient(@xxxGradientStart, @xxxGradientEnd)`. Either:

1. Update that component LESS to use a single color (the iceblue mixin
   set doesn't include `.verGradient`), or
2. Re-introduce the breeze mixin in your own `_zkmixins.less` if you
   really need it.

Most of the time, dropping the gradient entirely is the right answer.

### "Java code fails to compile"

Iceblue 9.6.6 ships the same Java API as breeze 9.6.6. If you get a
compile error, the issue is the **source/target** in `pom.xml` (must be
8, not 1.5). Make sure you updated that.

### "I changed `@themeProfile` to `compact` and now nothing works"

You probably typo'd. Valid values are `"default"` and `"compact"`. The
`@import "profiles/_@{themeProfile}";` line tries to import
`profiles/_<value>.less`, so a typo silently produces a missing-file
error during `mvn package`.

---

## 4. Reference card — file-by-file edits

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

## 5. Estimating the work

For a small theme (~30 variable overrides):

1. ~20 min: scaffold the new project from the iceblue template, copy
   Java/metainfo/MANIFEST forward.
2. ~30 min: translate variable names using the cross-reference table.
3. ~30 min: collapse gradients, set background hierarchy, set primary
   color family.
4. ~30-60 min: visually compare in the preview app, fix per-component
   stragglers.
5. ~30 min: smoke test in a real ZK 9.6 app.

Total: 2-3 hours for a clean breeze-to-iceblue palette swap.

For a heavily customized theme that overrode many component LESS files
in breeze, expect 1-2 days because you must port those component
customizations against the new iceblue component LESS files (which were
rewritten without gradients and against semantic tokens).

---

## 6. What's next

To take this iceblue 9.6.6 theme to ZK 10.3.0, run
`guide-iceblue-9.6.6-to-10.3.0.md`. That covers the architectural shift
to CSS-variable / LESS-proxy pattern, the Jakarta namespace, the Java 11
bump, and the project layout move from `src/archive` to
`src/main/resources`.
