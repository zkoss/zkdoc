# Guide: ZK 9.6.6 iceblue → ZK 10.3.0 iceblue

Bringing an iceblue theme from ZK 9.6.6 up to ZK 10.3.0. This is the most
**architectural** of the three migration steps — the palette stays
iceblue, but ZK 10 introduces:

1. The **CSS-variable + LESS-proxy** model (every LESS variable now
   resolves to `var(--zk-*)`).
2. A **profiles split** — palette values now live in `profiles/_default.less`
   under `:root { ... }`, not at the top of `_zkvariables.less`.
3. A **Maven layout move** — `src/archive/...` → `src/main/resources/...`,
   `src/org/...` → `src/main/java/...`.
4. The **Jakarta namespace** — ZK 10 is jakarta.servlet, not javax.servlet.
5. **Java 11** as the minimum compile target.

If you're starting from ZK 8 or breeze, run the earlier guides first
(`guide-breeze-8.x-to-9.6.6.md`, then `guide-breeze-to-iceblue-9.6.6.md`)
or use the all-in-one `theme-upgrade-guide.md`.

---

## 1. What changes (and what doesn't)

### What stays the same

- **Palette**: iceblue colours are preserved (`#0093F9` primary,
  `#F9FCFF` window bg, `#FFFFFF` container bg, `#FFA516` accent, etc.).
- **Variable names**: every LESS variable name (`@colorPrimary`,
  `@meshTitleBackgroundColor`, etc.) keeps its name. Only the value
  expression changes from a literal to a `var(--zk-*)` reference.
- **Component LESS structure**: most component LESS files keep the same
  rules; only their imports and the indirection level change.
- **Theme registration**: same `Themes.register()` API, same
  `WebAppInit` interface, same `metainfo/zk/*.xml` shape.

### What changes

| Area | iceblue 9.6.6 | iceblue 10.3.0 |
|---|---|---|
| LESS variable definitions | concrete values in `_zkvariables.less` (or via `profiles/_default.less` for compact overrides) | `_zkvariables.less` defines every var as `var(--zk-*)`; **all values** live in `profiles/_default.less` under `:root` |
| `_zkcssvariables.less` | does not exist | **new file** that imports `_zkvariables` then `profiles/_@{themeProfile}` |
| Profile structure | `profiles/_default.less` mostly empty (just `"Just leave it blank."`) | `profiles/_default.less` is the **primary** source of values, ~400+ lines of `--zk-*` declarations |
| `norm.less` first line | imports `_header.less` | imports **`_zkcssvariables.less`** first, then `_header.less` |
| Runtime customization | not possible without rebuilding | downstream apps can override `:root { --zk-color-primary: ...; }` at runtime |
| Maven layout | `src/archive/...` + `src/org/...` + `preview/...` | **`src/main/resources/...` + `src/main/java/...` + `src/test/...`** |
| `pom.xml` `<sourceDirectory>` | `src/` | (default, removed) |
| `pom.xml` `<resources>` | points at `src/archive` | points at `src/main/resources`, references `${zktheme.resources}` and `${zktheme.web.resources}` |
| `pom.xml` `<testSourceDirectory>` | `preview/` | (default `src/test/java`) |
| `<zk.version>` | `9.6.0-Eval` | `10.2.1-jakarta-Eval` (or later) |
| Java target | 8 | **11** |
| Servlet namespace | javax.servlet | **jakarta.servlet** (relevant only if your `WebAppInit` references the namespace directly) |
| `zkspringboot.version` | 2.5.3 | 3.2.6 (Spring Boot 3, Jakarta-aligned) |
| `springboot.version` | 2.5.3 | 3.2.6 |
| Preview test app | `preview/zk/example/ThemePreviewApp.java` | `src/test/java/zk/example/ThemePreviewApp.java` |
| Preview ZULs | `preview/web/*.zul` | `src/test/resources/web/*.zul` |
| Output dir property | `${zktheme.theme.outputDirectory}` (defined identically) | identical |
| Sizing defaults | 16px base font | identical |
| `var(--zk-*)` references in compiled CSS | **none** — values inlined | **everywhere** — preserved through compilation |
| `@themeProfile` selection | unchanged (`"default"` / `"compact"`) | unchanged (same profile files exist, but `_default.less` is now full of `:root` declarations instead of being a no-op) |
| New components (since 9.6.6) | n/a | `zkmax/cropper/`, `zkmax/goldenlayout/`, `zkmax/signature/`, `zkmax/tbeditor/` (paths moved/added) |

The mental shift: in 9.6.6, `_zkvariables.less` was the **value sheet** and
the `_zkmixins.less`/component files were the **rule sheet**. In 10.3.0,
`_zkvariables.less` is a **name-to-CSS-var proxy sheet** and
`profiles/_default.less` is the **value sheet**.

---

## 2. The architectural change in one example

### iceblue 9.6.6

```less
// _zkvariables.less
@colorPrimary: #0093F9;
@meshTitleBackgroundColor: @colorPrimary;
```

```less
// component .less (mesh)
.z-column { background: @meshTitleBackgroundColor; }
```

Compiled CSS:

```css
.z-column { background: #0093F9; }
```

### iceblue 10.3.0

```less
// _zkvariables.less
@colorPrimary: var(--zk-color-primary);
@meshTitleBackgroundColor: var(--zk-mesh-title-background-color);
```

```less
// profiles/_default.less
:root {
    --zk-color-primary: #0093F9;
    --zk-mesh-title-background-color: var(--zk-color-primary);
}
```

```less
// component .less (mesh) — unchanged
.z-column { background: @meshTitleBackgroundColor; }
```

Compiled CSS:

```css
.z-column { background: var(--zk-mesh-title-background-color); }
```

The component LESS stays the same. The customization seam moves from
LESS-compile time to browser runtime. Downstream apps can set

```css
:root { --zk-color-primary: #ff6600; }
```

and the entire theme follows, without rebuilding.

> ⚠ **Critical**: if you override a LESS variable in your theme JAR
> (e.g. you add `@colorPrimary: #2184BA;` in a sidecar file imported
> from `_header.less`), the proxy is replaced at LESS-compile time and
> the CSS variable becomes ineffective for properties driven by that
> variable. This is the trade-off between **direct LESS overrides** and
> the **CSS-variable profile** pattern — see `theme-upgrade-guide.md`
> §1a for the full discussion.

---

## 3. Step-by-step

### Step 1 — Scaffold from the 10.3.0 template

```sh
cp -r 10.3.0/ mytheme-10.3.0/
```

Run `./init.sh` or replace the placeholders `___THEME_NAME___`,
`___THEME_NAME_CAP___`, `___GROUP_ID___`, `___ARTIFACT_ID___`,
`___VERSION___`, `___DISPLAY_NAME___`.

### Step 2 — Move your file tree

| 9.6.6 source path | 10.3.0 destination |
|---|---|
| `src/archive/META-INF/MANIFEST.MF` | `src/main/resources/META-INF/MANIFEST.MF` (or rely on bnd to generate) |
| `src/archive/metainfo/zk/config.xml` | `src/main/resources/metainfo/zk/config.xml` |
| `src/archive/metainfo/zk/lang-addon.xml` | `src/main/resources/metainfo/zk/lang-addon.xml` |
| `src/archive/web/...` | `src/main/resources/web/...` |
| `src/org/zkoss/theme/<name>/*.java` | `src/main/java/org/zkoss/theme/<name>/*.java` |
| `preview/zk/example/ThemePreviewApp.java` | `src/test/java/zk/example/ThemePreviewApp.java` |
| `preview/web/*.zul` | `src/test/resources/web/*.zul` |

### Step 3 — Replace `pom.xml`

The 10.3.0 pom is structurally different. Key edits relative to 9.6.6:

```diff
- <maven.compiler.source>8</maven.compiler.source>
- <maven.compiler.target>8</maven.compiler.target>
- <zk.version>9.6.0-Eval</zk.version>
- <zkspringboot.version>2.5.3</zkspringboot.version>
- <springboot.version>2.5.3</springboot.version>
+ <maven.compiler.source>11</maven.compiler.source>
+ <maven.compiler.target>11</maven.compiler.target>
+ <zk.version>10.2.1-jakarta-Eval</zk.version>
+ <zkspringboot.version>3.2.6</zkspringboot.version>
+ <springboot.version>3.2.6</springboot.version>

- <zktheme.resources>${project.basedir}/src/archive</zktheme.resources>
+ <zktheme.resources>${project.basedir}/src/main/resources</zktheme.resources>

  <build>
-     <sourceDirectory>${project.basedir}/src/</sourceDirectory>
      <resources>
          <resource>
              <directory>${zktheme.resources}</directory>
              <excludes><exclude>web/**</exclude></excludes>
          </resource>
          ...
      </resources>
-     <testSourceDirectory>${project.basedir}/preview/</testSourceDirectory>
-     <testResources>
-         <testResource><directory>${project.basedir}/preview/</directory></testResource>
-     </testResources>
```

The exec/bundle/assembly plugin blocks are otherwise unchanged.

### Step 4 — Reconcile your `_zkvariables.less`

There are two cases.

**Case A — you didn't override anything in `_zkvariables.less`.** The
10.3.0 template's `_zkvariables.less` is already what you want. Don't
copy your 9.6.6 file. Move on.

**Case B — you customized variables in `_zkvariables.less` (e.g. you
changed `@colorPrimary` or `@meshTitleBackgroundColor`).** You have a
decision to make:

| Pattern | Where to put your overrides | Effect |
|---|---|---|
| **Direct LESS** | A new `src/main/resources/web/zul/less/_<theme>.less` imported from `_header.less` after `_zkvariables.less`. Concrete values: `@colorPrimary: #2184BA;`. | The `var(--zk-color-primary)` proxy is replaced at compile time. The CSS variable becomes dead for properties derived from this LESS variable. Compiled CSS has hard values. |
| **CSS-variable profile** | A new `src/main/resources/web/zul/less/_<theme>-profile.less` imported from `norm.less` after `_zkcssvariables.less`. `:root { --zk-color-primary: #2184BA; }`. | The proxy chain stays intact. Compiled CSS keeps `var(--zk-color-primary)`. Downstream apps can re-override at runtime. |

Both patterns are demonstrated by the worked-example projects that
accompany this repo (the direct-LESS variant and the CSS-variable
variant).

> **Recommendation**: if your 9.6.6 theme was the only one in your app
> and you want a self-contained JAR, use Pattern A — it preserves the
> mental model you already have. If you want to support multi-tenant
> theming or palette switching in the future, use Pattern B.

### Step 5 — Handle the new `_zkcssvariables.less` import chain

The 10.3.0 `norm.less` imports `_zkcssvariables.less` **first**:

```less
// norm.less (10.3.0)
@import "~./zul/less/_zkcssvariables.less"; // css variables are loaded through this import since ZK 10.3.0
@import "~./zul/less/_header.less";
@import "~./zul/less/_reset.less";
@import "~./zul/less/font/_variables.less";
```

And `_zkcssvariables.less` is a 2-line file:

```less
@import "_zkvariables.less";
@import "profiles/_@{themeProfile}";
```

This is **why** the `:root` block lands in your compiled CSS — because
`profiles/_default.less` runs first inside `norm.less`, emitting its
`:root` declarations. Without it, the `var(--zk-*)` references in
component LESS files would resolve to nothing.

**If you use Pattern B**, your `_<theme>-profile.less` import goes here:

```less
@import "~./zul/less/_zkcssvariables.less";
@import "~./zul/less/_<theme>-profile.less";   // <-- your CSS vars
@import "~./zul/less/_header.less";
@import "~./zul/less/_reset.less";
@import "~./zul/less/font/_variables.less";
```

**If you use Pattern A**, your `_<theme>.less` import goes into
`_header.less`:

```less
// _header.less
@import "_zkvariables.less";
@import "colors/_@{themePalette}";
@import "_zkmixins.less";
@import "_<theme>.less";   // <-- direct LESS overrides
```

> Note: the 9.6.6 `_header.less` had `@import "profiles/_@{themeProfile}";`
> as an explicit line; in 10.3.0 that import moved into
> `_zkcssvariables.less`. Don't duplicate it.

### Step 6 — Move Java sources

```sh
mkdir -p mytheme-10.3.0/src/main/java/org/zkoss/theme/<name>/
mv <old>/src/org/zkoss/theme/<name>/*.java \
   mytheme-10.3.0/src/main/java/org/zkoss/theme/<name>/
```

No code changes needed for typical themes:

- `Version.java`: bump `UID` to `"10.3.0"`.
- `<X>ThemeWebAppInit.java`: unchanged. The `WebAppInit` interface, the
  `Themes.register(...)` API, and the
  `ResponsiveThemeRegistry.TABLET_PREFIX` constant are all preserved
  through the jakarta move.

If your theme has additional Java code that touches `javax.servlet` or
`javax.faces` directly, swap to `jakarta.*`. Most themes don't.

### Step 7 — Migrate the `MANIFEST.MF`

If your 9.6.6 theme had a hand-edited `MANIFEST.MF` (often the case for
themes packaged as OSGi bundles), copy it to
`src/main/resources/META-INF/MANIFEST.MF`. The `maven-bundle-plugin` in
the 10.3.0 pom still references `${project.basedir}/src/archive/META-INF/MANIFEST.MF`
in its `_include` instruction — **update that path** to the new location
if your MANIFEST is hand-edited, otherwise let bnd auto-generate.

### Step 8 — Carry component `.less` customizations

For each `*.less` you customized under `src/archive/web/js/.../less/`,
move it to `src/main/resources/web/js/.../less/`. Diff against the
10.3.0 template's copy of the same file — ZK shipped fixes between 9.6
and 10.3 and you'll want them.

New `.less` files that did **not** exist in 9.6.6:

- `src/main/resources/web/js/zkmax/cropper/less/cropper.less` (new
  cropper component)
- `src/main/resources/web/js/zkmax/goldenlayout/less/goldenlayout.less`
  (split into its own directory — was at `zkmax/layout/` in 9.6.6)
- `src/main/resources/web/js/zkmax/signature/less/signature.less`
  (split from `zkmax/wgt/`)
- `src/main/resources/web/js/zkmax/tbeditor/less/tbeditor.less` (new
  toolbar editor component)

Don't customize them unless you have reason; they inherit from the
shared semantic tokens and pick up your palette automatically.

### Step 9 — Update `metainfo/zk/*.xml`

```xml
<!-- src/main/resources/metainfo/zk/config.xml -->
<version-uid>10.3.0</version-uid>      <!-- bumped -->

<!-- src/main/resources/metainfo/zk/lang-addon.xml -->
<version-uid>10.3.0</version-uid>      <!-- bumped -->
```

XML shape is unchanged.

### Step 10 — Build

```sh
node -v                  # must be >= 10.16 still
npm install
mvn clean package
```

Output: `target/<artifactId>.jar`. The compiled CSS now lands at
`target/classes/web/<artifactId>/...`.

Sanity check: open one of the compiled CSS files (e.g.
`target/classes/web/<artifactId>/zul/css/zk.wcs`) and verify it contains
`var(--zk-*)` references — that proves the proxy chain worked. If you
see hardcoded color literals everywhere instead, you accidentally
overrode the LESS proxies (Pattern A) when you intended Pattern B.

### Step 11 — Run the preview app (ZK 10 version)

```sh
mvn test exec:java@preview-app   # http://localhost:8080
```

The preview app is now under `src/test/java/zk/example/ThemePreviewApp.java`,
not `preview/`. ZULs are under `src/test/resources/web/`. If you'd
customized the preview app in 9.6.6, port your changes.

### Step 12 — Smoke-test in a ZK 10 app

ZK 10 apps run on a **jakarta.servlet** container (Tomcat 10+,
Jetty 11+). If your test target is Tomcat 9 / Jetty 9, the JAR will not
run there. The theme JAR itself doesn't include servlet code, but the
ZK runtime it depends on does.

Drop the JAR into your ZK 10 app's `WEB-INF/lib/` and either set
`<library-property>` or the `zktheme` cookie as documented in the
template README.

---

## 4. Common gotchas

### "The compiled CSS has literal colors, not `var(--zk-*)` references"

You used Pattern A (direct LESS override) when you meant Pattern B. The
moment any `_<theme>.less` does `@colorPrimary: #2184BA;`, the
`var(--zk-color-primary)` proxy is gone for all properties driven by
`@colorPrimary`. Switch to Pattern B (set `--zk-color-primary` in a
`_<theme>-profile.less` imported from `norm.less`) to preserve the
proxy.

### "I overrode `--zk-color-primary` at runtime but the page didn't change"

You used Pattern A in the theme JAR. The CSS variable is "dead" because
the compiled CSS doesn't reference it for the overridden properties.
The fix is the same: switch the theme JAR to Pattern B.

### "Build fails: `Could not resolve dependency org.zkoss.zk:zkmax:9.6.0-Eval`"

You didn't update `<zk.version>` in `pom.xml`. ZK 10 uses
`10.2.1-jakarta-Eval` (or newer) on the
`https://mavensync.zkoss.org/eval/` repository.

### "Build fails: `cannot find symbol jakarta.servlet.*`"

You have explicit `javax.servlet` imports in your theme's Java code (e.g.
a custom `WebAppInit` subclass that touches `HttpServletRequest`).
Swap `javax.servlet.*` → `jakarta.servlet.*`. ZK 10 ships with the
jakarta namespace.

### "Build fails: source/target version mismatch"

`<maven.compiler.source>` and `<maven.compiler.target>` must both be
`11` (or higher). Spring Boot 3 transitively requires Java 17 at
runtime for the preview app, but the **theme JAR itself** compiles on
11. If the preview app fails but `mvn clean package -Dmaven.test.skip`
works, that's the cause.

### "Preview app fails: Spring Boot 3 needs Jakarta"

Yes — Spring Boot 3 dropped javax. If your 9.6.6 preview app referenced
`javax.servlet`, those imports must change to `jakarta.servlet` when
moving to 10.3.0. The preview app shipped with the 10.3.0 template is
already Jakarta-aligned.

### "I copied my old preview ZULs and they don't render"

Check the path. 9.6.6 served preview ZULs from `preview/web/`. 10.3.0
serves them from `src/test/resources/web/`. The Spring Boot config in
`ThemePreviewApp.java` was updated to match — if you copied an old
`ThemePreviewApp.java` over the new one, undo and use the new one.

### "The compact profile no longer reduces sizes"

Iceblue 10.3.0's `profiles/_compact.less` is conceptually the same but
emits `--zk-*` declarations in `:root` (not LESS variable reassignments).
If you'd modified `_compact.less` in 9.6.6 with extra rules, those rules
need to be rewritten as CSS-variable overrides.

### "I see `--zk-mesh-title-background-color: var(--zk-color-primary);` in profile — won't this break if I override `@colorPrimary` in Pattern A?"

Yes, partially. Pattern A overrides set `@colorPrimary` to a literal —
that propagates to anywhere component LESS uses `@colorPrimary`. But it
does **not** propagate to `--zk-mesh-title-background-color`, because
that's a CSS variable in `:root`, set at runtime, deriving from
`--zk-color-primary` (also at runtime).

In practice: when component LESS does
`background: @meshTitleBackgroundColor`, that resolves to
`background: var(--zk-mesh-title-background-color)`, which reads
`--zk-color-primary` from `:root` at runtime — so the iceblue default
`#0093F9` wins, even though you set `@colorPrimary: #2184BA;` in your
override file. Result: grid title is iceblue blue while buttons (which
directly use `@colorPrimary` in component LESS, not the mesh proxy) are
your custom blue. **Inconsistency.**

The fix: in Pattern A, also set the derived LESS variables explicitly
(`@meshTitleBackgroundColor: #2184BA;`), or switch to Pattern B and
override `--zk-color-primary` in `:root` — the cascade then takes care
of everything downstream automatically.

This is the subtle reason Pattern B is the better choice for a faithful
palette change — it lets the iceblue `--zk-*` derivation chain do its
work.

---

## 5. Reference card — file-by-file edits

| File | 9.6.6 | 10.3.0 | Action |
|---|---|---|---|
| `pom.xml` | Java 8, zk 9.6.0, src/archive | Java 11, zk 10.x-jakarta, src/main/resources | **replace** |
| `package.json` | exists | identical | keep |
| `assembly/*.xml` | exists | identical | keep |
| `src/archive/...` | source root | does not exist | **move** content to `src/main/resources/...` |
| `src/org/...` | Java sources | does not exist | **move** to `src/main/java/...` |
| `preview/...` | preview app + ZULs | does not exist | **move** to `src/test/java/...` and `src/test/resources/...` |
| `metainfo/zk/config.xml` | exists | identical shape, version bumped | **carry, bump** |
| `metainfo/zk/lang-addon.xml` | exists | identical shape, version bumped | **carry, bump** |
| `Version.java` | UID = "9.6.0" | UID = "10.3.0" | **bump UID** |
| `<X>ThemeWebAppInit.java` | javax-ok | jakarta-ok (if it touches servlet) | **carry, switch namespace if needed** |
| `_zkvariables.less` | concrete values | `var(--zk-*)` proxies | **replace with template's, then put overrides in sidecar file** |
| `_zkcssvariables.less` | does not exist | new — imports `_zkvariables` + active profile | **add** (from template) |
| `_header.less` | imports `_zkvariables`, `profiles/_{themeProfile}`, `colors/_{themePalette}`, `_zkmixins` | imports `_zkvariables`, `colors/_{themePalette}`, `_zkmixins` (profile moved to `_zkcssvariables.less`) | **replace** |
| `_zkmixins.less` | iceblue mixins | iceblue mixins (minor updates) | **replace from template** |
| `profiles/_default.less` | empty | **400+ lines of `:root { --zk-*: ...; }`** | **replace from template** |
| `profiles/_compact.less` | LESS variable overrides | `:root` CSS variable overrides | **replace from template** |
| `colors/_iceblue.less` | empty | empty | keep |
| `norm.less` | imports `_header.less` first | imports `_zkcssvariables.less` first, then `_header.less` | **replace from template, re-add your custom overrides** |
| `_<theme>.less` | n/a | optional — Pattern A overrides | **add if you want Pattern A** |
| `_<theme>-profile.less` | n/a | optional — Pattern B overrides | **add if you want Pattern B (recommended)** |
| component `.less` files | yours | template + minor updates + new components | **carry, diff, copy new** |

---

## 6. Estimating the work

For a small iceblue 9.6.6 theme with ~30 variable overrides (Pattern B):

1. ~30 min: scaffold the new 10.3.0 project, run init.
2. ~30 min: move files into the `src/main/...` layout.
3. ~30 min: build a `_<theme>-profile.less` with your CSS variable
   overrides, import it from `norm.less`.
4. ~30 min: bump versions, update Java imports if any, update MANIFEST
   reference path.
5. ~30-60 min: build, install Node if needed, fix dependency issues.
6. ~1 hour: visually verify in the preview app and a real ZK 10 app.

Total: 3-4 hours for a clean migration.

For Pattern A (direct LESS overrides), add ~1 hour for the derived-LESS
variable issue (§"I see --zk-mesh-title-background-color..." gotcha) —
you'll need to set a few extra variables to keep palette derivation
consistent.

For a heavily customized theme that touches many component LESS files,
budget 1-2 days because of the file-by-file diffing against the new
template, plus the careful audit of whether any component LESS file
hard-codes a color that should have been a variable.

---

## 7. After migration: take advantage of CSS variables

Once your theme is on 10.3.0 with Pattern B, you unlock runtime
re-theming. Downstream apps can do:

```html
<!-- light theme -->
<style>
:root {
    --zk-color-primary: #2184BA;
    --zk-color-background3: #FFFFFF;
}
</style>

<!-- dark theme, toggled by a class on body -->
<style>
body.dark {
    --zk-color-primary: #4FC3F7;
    --zk-color-background3: #1A1A1A;
    --zk-color-background1: #2A2A2A;
    --zk-text-color-default: #FFFFFF;
}
</style>
```

No theme JAR rebuild, no LESS recompile. This is the main payoff of the
10.3.0 architecture; the CSS-variable variant in this repo's worked
examples demonstrates it end-to-end.

---

## 8. References

- `theme-upgrade-guide.md` — comprehensive 8.x breeze → 10.3.0 iceblue
  guide (covers the whole path if you want to skip 9.6.6).
- `migration-data/color-token-semantic-reference.md` — what each token
  controls, including the iceblue background hierarchy (page →
  `colorBackground1` window/panel → `colorBackground3` container).
- `migration-data/component-level-variable-reference.md` — by-component
  inventory of every variable.
- ZK official docs: <https://docs.zkoss.org/zk_style_customization_guide/css_variables>.
