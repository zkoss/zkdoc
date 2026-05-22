# Guide: ZK 9.6.6 iceblue → ZK 10.3.0 iceblue

Bringing an iceblue theme from ZK 9.6.6 up to ZK 10.3.0. This is the most **architectural;y complex** of the three migration steps from 8.X breeze — the palette stays based on iceblue, but ZK 10.3.X introduces:

1. The **CSS-variable + LESS-variable** model (every LESS variable now resolves to `var(--zk-*)` and is overridable at client-side).
2. A **profiles split** — palette values now live in `profiles/_default.less` under `:root { ... }`, not at the top of `_zkvariables.less`.
3. A **Maven layout move** — `src/archive/...` → `src/main/resources/...`, `src/org/...` → `src/main/java/...`.
4. **Java 11** as the minimum compile target.

If you're starting from ZK 8 or breeze, run the earlier guides first  [guide: Breeze 8.x to 9.X]({{site.baseurl}}/ zk_style_customization_guide/migration_guides/guide-breeze-8.x-to-9.6.6), then  [guide: Breeze to iceblue 9.6.6]({{site.baseurl}}/zk_style_customization_guide/migration_guides/guide-breeze-to-iceblue-9.6.6).

---

## 1. Main changes and similarities

### Similarities

- **Palette**: iceblue colours are preserved (`#0093F9` primary,   `#F9FCFF` window bg, `#FFFFFF` container bg, `#FFA516` accent, etc.).
- **Variable names**: every LESS variable name (`@colorPrimary`,   `@meshTitleBackgroundColor`, etc.) keeps its name. Only the value   expression changes from a literal to a `var(--zk-*)` reference.
- **Component LESS structure**: most component LESS files keep the same rules; only their imports and the indirection level change.
- **Theme registration**: same `Themes.register()` API, same `WebAppInit` interface, same `metainfo/zk/*.xml` shape.

### What changes

| Area | iceblue 9.6.6 | iceblue 10.3.0 |
|---|---|---|
| LESS variable definitions | concrete values in `_zkvariables.less` (or via `profiles/_default.less` for compact overrides) | `_zkvariables.less` defines every var as `var(--zk-*)`; **all values** live in `profiles/_default.less` under `:root` |
| `_zkcssvariables.less` | does not exist | **new file** that imports `_zkvariables` then `profiles/_@{themeProfile}` |
| Profile structure | `profiles/_default.less` mostly empty (just `"Just leave it blank."`) | `profiles/_default.less` is the **primary** source of values, ~400+ lines of `--zk-*` declarations |
| `norm.less` first line | imports `_header.less` | imports **`_zkcssvariables.less`** first, then `_header.less` |
| Runtime customization | not possible without rebuilding | downstream apps can override `:root { --zk-color-primary: ...; }` at runtime |
| Maven layout | `src/archive/...` + `src/org/...` + `preview/...` | **`src/main/resources/...` + `src/main/java/...` + `src/test/...`** |
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

Main architectural shift: in 9.6.6, `_zkvariables.less` was the **value sheet** and the `_zkmixins.less`/component files were the **rule sheet**. In 10.3.0, `_zkvariables.less` is a **name-to-CSS-var proxy sheet** and `profiles/_default.less` is the **value sheet**.

---

## 2. LESS declaration to CSS variables example

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

The component LESS stays the same. The customization seam moves from LESS-compile time to browser runtime. Downstream apps can set 

```css
:root { --zk-color-primary: #ff6600; }
```

and the entire theme follows, without rebuilding.

---

## 3. Step-by-step

### Step 1 — Scaffold from the 10.3.0 template

```sh
cp -r 10.3.0/ mytheme-10.3.0/
```

Run `./init.sh` or replace the placeholders `___THEME_NAME___`, `___THEME_NAME_CAP___`, `___GROUP_ID___`, `___ARTIFACT_ID___`, `___VERSION___`, `___DISPLAY_NAME___`.

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


If you customized variables in `_zkvariables.less`, you can either stay on the same LESS pattern, or move to CSS variables pattern:

| Pattern | Where to put your overrides | Effect |
|---|---|---|
| **Direct LESS** | A new `src/main/resources/web/zul/less/_<theme>.less` imported from `_header.less` after `_zkvariables.less`. Concrete values: `@colorPrimary: #2184BA;`. | The `var(--zk-color-primary)` variable is replaced at compile time. The CSS variable becomes dead for properties derived from this LESS variable. Compiled CSS has hard values. |
| **CSS-variable profile** | A new `src/main/resources/web/zul/less/_<theme>-profile.less` imported from `norm.less` after `_zkcssvariables.less`. `:root { --zk-color-primary: #2184BA; }`. | The proxy chain stays intact. Compiled CSS keeps `var(--zk-color-primary)`. Downstream apps can re-override at runtime. |

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

This is **why** the `:root` block lands in your compiled CSS — because `profiles/_default.less` runs first inside `norm.less`, emitting its
`:root` declarations. Without it, the `var(--zk-*)` references in component LESS files would resolve to nothing.

If you use a separate variable file with your customization, you may import your `_<theme>-profile.less` here:

```less
@import "~./zul/less/_zkcssvariables.less";
@import "~./zul/less/_<theme>-profile.less";   // <-- your CSS vars
@import "~./zul/less/_header.less";
@import "~./zul/less/_reset.less";
@import "~./zul/less/font/_variables.less";
```

### Step 6 — Move Java sources

```sh
mkdir -p mytheme-10.3.0/src/main/java/org/zkoss/theme/<name>/
mv <old>/src/org/zkoss/theme/<name>/*.java \
   mytheme-10.3.0/src/main/java/org/zkoss/theme/<name>/
```

No code changes needed for typical themes:

- `Version.java`: bump `UID` to `"10.3.0"`. - `<X>ThemeWebAppInit.java`: unchanged. The `WebAppInit` interface, the `Themes.register(...)` API, and the `ResponsiveThemeRegistry.TABLET_PREFIX` constant are all preserved through the javax-to-jakarta update.

If your theme has additional Java code that touches `javax.servlet` or `javax.faces` directly, swap to `jakarta.*` for these dependencies. For most themes, this is not expected.

### Step 7 — Migrate the `MANIFEST.MF`

If your 9.6.6 theme had a hand-edited `MANIFEST.MF` (if your themes are packaged as OSGi bundles), copy it to `src/main/resources/META-INF/MANIFEST.MF`. The `maven-bundle-plugin` in the 10.3.0 pom still references `${project.basedir}/src/archive/META-INF/MANIFEST.MF` in its `_include` instruction — **update that path** to the new location if your MANIFEST is hand-edited, otherwise let bnd auto-generate.

### Step 8 — Carry component `.less` customizations

For each `*.less` you customized under `src/archive/web/js/.../less/`, move it to `src/main/resources/web/js/.../less/`. Diff against the
10.3.0 template's copy of the same file — ZK shipped fixes between 9.6 and 10.3 and you'll want them.

New `.less` files that did **not** exist in 9.6.6:

- `src/main/resources/web/js/zkmax/cropper/less/cropper.less` (new
  cropper component)
- `src/main/resources/web/js/zkmax/goldenlayout/less/goldenlayout.less`
  (split into its own directory — was at `zkmax/layout/` in 9.6.6)
- `src/main/resources/web/js/zkmax/signature/less/signature.less`
  (split from `zkmax/wgt/`)
- `src/main/resources/web/js/zkmax/tbeditor/less/tbeditor.less` (new
  toolbar editor component)

If your application does not use these component, you may simply use the default value in these LESS files.

### Step 9 — Update `metainfo/zk/*.xml`

```xml
<!-- src/main/resources/metainfo/zk/config.xml -->
<version-uid>10.3.0</version-uid>      <!-- bumped -->

<!-- src/main/resources/metainfo/zk/lang-addon.xml -->
<version-uid>10.3.0</version-uid>      <!-- bumped -->
```

---

## 4. Reference card — file-by-file edits

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

## 5. References

- [color variable reference]({{site.baseurl}}/zk_style_customization_guide/migration_guides/color-variable-reference) — what each variable controls, including the iceblue background hierarchy (page → `colorBackground1` window/panel → `colorBackground3` container).
- [component level variable reference]({{site.baseurl}}/zk_style_customization_guide/migration_guides/component-level-variable-reference) — by-component inventory of every variable.
- [CSS Variables guide]({{site.baseurl}}/zk_style_customization_guide/css_variables)