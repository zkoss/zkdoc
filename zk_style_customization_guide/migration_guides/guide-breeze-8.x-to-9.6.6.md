# Guide: ZK 8.x breeze → ZK 9.6.6 breeze

Migrating a ZK 8.x breeze-based theme to ZK 9.6.6 while **maitaining the breeze palette and structure**. There is no palette renaming and no architectural change to the LESS variable model. The changes are mostly **build/scaffolding**, plus adding additional rules for the new widgets ZK introduced between 8.x and 9.6.

---

## 1. Important changes

| Topic | 8.x breeze | 9.6.6 breeze |
|---|---|---|
| LESS variable file | `src/archive/web/zul/less/_zkvariables.less` | same path, same variable names, most of the palette can be reused as-is |
| Header import order | `_zkvariables.less` → `_zkmixins.less` | unchanged |
| Themable concepts | gradients, IE8 tokens, breeze defaults | mostly unchanged (IE8 tokens are no longer actively added) |
| Java sources | `src/org/zkoss/theme/<name>/` | unchanged |
| `metainfo/zk/*.xml` | unchanged path | bump to target ZK 9.x version |
| Build chain | `zkless-engine-maven-plugin` (Java-based) | **`exec-maven-plugin` + `npx zklessc` (Node-based)** |
| Java version | 1.5 | **8** |
| ZK dependency | `8.x.x` | `9.6.X` |
| Test infra | none by default | optional Spring-Boot preview app |
| New widgets | n/a | rangeslider, multislider, organigram, signature, goldenlayout, rating, drawer, inputgroup, pdfviewer, searchbox, stepbar, portalchildren, linelayout, coachmark, cascader, barscanner, anchornav, media (camera/cropper/video), zkmax-listbox/tree/grid variants |

The breeze palette **does not move**. Every breeze variable name in your old `_zkvariables.less` continues to exist in 9.6.6-breeze with the same default. The migration touches the project skeleton, not the look.

---

## 2. Step-by-step

### Step 1 — Start from the 9.6.6 breeze template

```sh
cp -r 9.6.6-breeze/ mytheme-9.6.6/
```

Starting from a fresh theme template on v9.6.6 breeze branch, placeholders (`___THEME_NAME___`, `___THEME_NAME_CAP___`,
`___GROUP_ID___`, `___ARTIFACT_ID___`, `___VERSION___`, `___DISPLAY_NAME___`) are filled by running `./init.sh`.


### Step 2 — Carry your `_zkvariables.less` across

```sh
cp <old>/src/archive/web/zul/less/_zkvariables.less \
   mytheme-9.6.6/src/archive/web/zul/less/_zkvariables.less
```

Then **append** the 9.6.6 breeze defaults for the new variable groups (the template's `_zkvariables.less` from line 240 onward — `signature`, `goldenlayout`, `rating`, `drawer`, `rangeslider`, `multislider`, `inputgroup`, `pdfviewer`, `searchbox`, `stepbar`, `portalchildren`, `linelayout`, `coachmark`, `cascader`, `organigram`). Skipping them will not cause the projet to fail to build (the new widgets just fail to render with absent values).

Copy the **new** blocks from the template into the bottom of your file. No changes to existing blocks are necessary.

### Step 3 — Carry your customized component LESS files across

For every `*.less` you customized under `src/archive/web/js/.../less/`, use diff to identify changes between your original file and the current target. Apply as needed. Some changes can be provided by ZK updates, and some may be customizations made to your theme.

Example useful diff command:

```sh
diff <old>/src/archive/web/js/zul/grid/less/grid.less \
     9.6.6-breeze/src/archive/web/js/zul/grid/less/grid.less
```
New `.less` files that did **not** exist in 8.x —  use as-is unless you want to customize them:

- `zkex/pdfviewer/less/pdfviewer.less`
- `zkex/slider/less/rangeslider.less`, `sliderbuttons.less`
- `zkmax/barscanner/less/barcodescanner.less`
- `zkmax/grid/less/grid.less` (the new biglistbox-style grid)
- `zkmax/inp/less/cascader.less`, `searchbox.less`
- `zkmax/layout/less/goldenlayout.less`, `linelayout.less`, `organigram.less`
- `zkmax/med/less/camera.less`, `cropper.less`, `video.less`
- `zkmax/nav/less/anchornav.less`, `coachmark.less`
- `zkmax/sel/less/listbox.less`, `tree.less` (zkmax variants)
- `zkmax/slider/less/multislider.less`
- `zkmax/wgt/less/drawer.less`, `signature.less`, `stepbar.less`
- `zul/wgt/less/checkbox.less`, `inputgroup.less`, `rating.less`, `selectbox.less`

### Step 4 — Update `pom.xml`

The 9.6.6 `pom.xml` is materially different. Key differences are:

| 8.x pom | 9.6.6 pom |
|---|---|
| `<zk.version>8.x.x</zk.version>` | `<zk.version>9.x.x</zk.version>` |
| `<maven.compiler.source>1.5</source>` | `<maven.compiler.source>8</source>` |
| `org.zkoss.maven:zkless-engine-maven-plugin` | `org.codehaus.mojo:exec-maven-plugin` invoking `npx zklessc` |
| no `package.json`, no Node prerequisite | **Node ≥ 10.16 required**; install via `npm install` |
| no test deps | optional `zkspringboot-autoconfig` + `spring-boot-starter-web` (scope=test) for the preview app |
| `<sourceDirectory>src/</sourceDirectory>` | same, plus `<testSourceDirectory>preview/</testSourceDirectory>` |
| no `<resources>` split | `<directory>src/archive</directory>` (excludes web) + `<directory>src/archive/web</directory>` (excludes `.less`, target = `<artifactId>` web dir) |
| `<zktheme.theme.outputDirectory>` undefined | defined as `target/classes/web/<artifactId>/` so compiled CSS lands at the conventional theme JAR location |

Critical detail for the breeze palette: the LESS compiler needs JS functions (the breeze theme uses `Lighten()` / `Darken()` LESS-JS calls in `@rangesliderButtonHoverColor` etc.). The 9.6.6-breeze pom passes:

```xml
<argument>--less-opts</argument>
<argument>{"javascriptEnabled":true}</argument>
```

to `zklessc`. **Keep these two lines.** Without them, the build fails with "JavaScript evaluation error" on lines that call javascript functions.

### Step 5 — Update Java sources

Move Java files from `src/org/...` to `src/org/...` — no path change. But:

- `Version.java`: bump `UID` to e.g. `"9.6.0"` and update the matching
  `version-uid` in `metainfo/zk/config.xml` and
  `metainfo/zk/lang-addon.xml`.
- `<X>ThemeWebAppInit.java`: no semantic changes. The class still
  implements `WebAppInit`, still calls `Themes.register(...)`, still
  registers the tablet variant for EE.
- The compiler target moves from `1.5` to `8`. Use a modern API only if
  you want to — nothing in 9.6.6 forces it.

### Step 6 — Update `metainfo/zk/*.xml`

```xml
<!-- config.xml -->
<version-uid>9.6.0</version-uid>      <!-- bumped -->
<!-- lang-addon.xml -->
<version-uid>9.6.0</version-uid>      <!-- bumped -->
```

The XML files themselves are byte-for-byte the same shape. Only the
version string changes.

### Step 7 — Update `MANIFEST.MF` and `assembly/*.xml`

The breeze 9.6.6 template ships `assembly/zip.xml` and
`assembly/bundle.xml` for the `maven-assembly-plugin`. The
`MANIFEST.MF` path in the bundle plugin is still
`src/archive/META-INF/MANIFEST.MF`. If you had a MANIFEST in 8.x, copy it
over; otherwise the maven-bundle-plugin will generate one.

### Step 8 — Install Node and build

```sh
node -v                  # must be >= 10.16
npm install              # installs zkless-engine
mvn clean package
```

Output: `target/<artifactId>.jar`. Drop into `WEB-INF/lib` of a ZK 9.6
test app and verify visually.

### Step 9 — Run the preview app (optional but recommended)

```sh
mvn test exec:java@preview-app          # http://localhost:8080
```

Drop sample ZULs into `preview/web/` (start with `preview.zul` that ships
in the template; add one ZUL per component family you care about).
Comparing visually against your 8.x deployment is the fastest way to spot
regressions caused by ZK's own fixes between 8 and 9.6.

### Step 10 — Smoke-test in a real ZK 9.6 app

Drop the JAR into a ZK 9.6 app's `WEB-INF/lib/`. Either:

- set `<library-property><name>org.zkoss.theme.preferred</name><value>yourtheme</value></library-property>`
  in `WEB-INF/zk.xml`, **or**
- set cookie `zktheme=yourtheme`.

Hard refresh. Look for "Theme registered" in the server log — that
confirms your `WebAppInit` listener fired.

---

## 3. Common gotchas

### Build fails with `Lighten is not defined` or `JavaScript evaluation error`

You dropped the `--less-opts {"javascriptEnabled":true}` arguments. Breeze
uses LESS-JS function calls in component LESS files (multislider,
rangeslider especially). Restore the two argument lines.

### Build fails with `npx: command not found`

Install Node ≥ 10.16. ZK 9.6's LESS pipeline replaced the old Java
`zkless-engine-maven-plugin` with a Node-based `zklessc` invoked through
`exec-maven-plugin`. There is no Java fallback.

### `package.json` missing

The 9.6.6 template ships one — `cp 9.6.6-breeze/package.json` into your
project. Without it, `npm install` has nothing to install.

### IE8 styling differs

ZK 9.6 components no longer special-case IE8. The `@meshBackgroundColorIE8`
group of variables in your old `_zkvariables.less` is dead code; you can
keep it (harmless) or delete it.

### New widgets render unstyled

If a page uses `<rangeslider>`, `<organigram>`, `<drawer>` etc. and looks
unstyled, you forgot to copy the corresponding `.less` blocks from the
9.6.6-breeze `_zkvariables.less` (step 2). Append the missing blocks.

### `Themes.register(...)` signature changed

It hasn't, between 8 and 9.6. If you get a compile error, the import is
wrong — make sure it's `org.zkoss.zul.theme.Themes` and the tablet
register call uses `org.zkoss.zkmax.theme.ResponsiveThemeRegistry`.

### CSS lands at the wrong URL

Check `<zktheme.theme.outputDirectory>` in `pom.xml` resolves to
`target/classes/web/${project.artifactId}/`. The runtime expects
`/zkau/web/<themename>/css/...`; if the `themename` and `artifactId` don't
match, the browser will request CSS from a path the JAR doesn't serve.

---

## 4. Quick reference — file-by-file diff

| File (relative to project root) | 8.x | 9.6.6 breeze | Action |
|---|---|---|---|
| `pom.xml` | zkless-engine + Java 1.5 | exec + npx zklessc + Java 8 | **replace** |
| `package.json` | n/a | new | **add** (copy template's) |
| `init.sh` | n/a | placeholder rename script | **add** (optional) |
| `readme.md` | usage notes | template usage notes | **rewrite** |
| `assembly/zip.xml`, `assembly/bundle.xml` | exist | exist, identical shape | **keep / replace** |
| `src/archive/META-INF/MANIFEST.MF` | exists | optional (bnd may generate) | **keep** |
| `src/archive/metainfo/zk/config.xml` | exists | `<version-uid>` bumped | **bump version** |
| `src/archive/metainfo/zk/lang-addon.xml` | exists | `<version-uid>` bumped | **bump version** |
| `src/archive/web/zul/less/_zkvariables.less` | breeze 8.x vars | breeze 8.x vars + new widget blocks | **carry + append new blocks** |
| `src/archive/web/zul/less/_header.less` | unchanged | unchanged | **carry** |
| `src/archive/web/zul/less/_zkmixins.less` | unchanged | unchanged | **carry** |
| `src/archive/web/zul/less/norm.less` | exists | exists, minor updates | **carry, diff against template** |
| `src/archive/web/js/.../less/*.less` | yours | template + new files | **carry yours, copy template for new widgets** |
| `src/org/zkoss/theme/<name>/Version.java` | UID = 8.x.x | UID = 9.6.0 | **bump UID** |
| `src/org/zkoss/theme/<name>/<X>ThemeWebAppInit.java` | unchanged | unchanged | **carry** |
| `preview/zk/example/ThemePreviewApp.java` | n/a | Spring-Boot preview | **add** (optional) |
| `preview/web/preview.zul` | n/a | sample page | **add** (optional) |

---

## 5. Estimating the work

For a small theme that just overrides ~30 variables, this
migration is a half-day:

1. ~30 min: scaffold + carry the variables file + bump the version uid.
2. ~30 min: replace the pom, install Node, get the build green.
3. ~1 hour: copy customized component LESS files, diff against template,
   resolve conflicts.
4. ~1 hour: visually compare the preview app to your old deployment, fix
   stragglers.
5. ~1 hour: smoke test in a real ZK 9.6 app.

For a large theme that customizes 50+ component LESS files (like sapphire
or atlantic in their original repos), budget 2-3 days, dominated by
component LESS diffing in step 3.

---

## 6. Next step

If your end goal is **iceblue** (the ZK 10 default) or **ZK 10.3.0**, this
guide is only step 1. Continue with:

- `guide-breeze-to-iceblue-9.6.6.md` — switch palette while staying on
  ZK 9.6.6.
- `guide-iceblue-9.6.6-to-10.3.0.md` — adopt the ZK 10 CSS-variable +
  LESS-proxy architecture and the Jakarta namespace.

Or jump direct: `theme-upgrade-guide.md` covers the whole 8.x breeze →
10.3.0 iceblue path in one shot (recommended if you don't need an
intermediate 9.6 release).
