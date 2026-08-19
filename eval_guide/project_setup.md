---
title: "Project Setup and Detailed Measurements"
description: "Project setup and detailed measurements behind our ZK, React, Angular, Vaadin, and Wicket comparison."
permalink: /eval-guide/project-setup
---

# Part 4-7: Project Setup and Detailed Measurements

This chapter documents the full setup, methodology, and raw measurements behind the comparisons throughout Part 4. It is the reference layer — the summaries in Part 4-1 through 4-6 draw from the data here.

The source is public: the applications live in [zkoss-demo/web-ui-framework-comparison](https://github.com/zkoss-demo/web-ui-framework-comparison), Level 1 under `apps/`, Level 2 under `apps2/` and Level 3 under `apps3/`. The underlying measurement reports — including the exclusions, the raw per-iteration samples, and the caveats each figure carries — are in that repository's `doc/` directory: [measurement-report.md](https://github.com/zkoss-demo/web-ui-framework-comparison/blob/master/doc/measurement-report.md) for Level 1, with separate reports for Levels 2 and 3.

## Test environment — Level 1 (Employee Manager)

Level 1 ran all six implementations on Spring Boot 3.3.4 with the Jakarta namespace, under a single multi-module Maven project. A shared Maven module — 7 files, 398 lines of entities, repositories, services, and seed data — provided the backend for every framework, including Vaadin. Each framework implementation is only the UI layer. Seed data was 8 departments and 57 employees, 4 of them inactive.

Hardware and toolchain: Apple M1 Pro (8 cores), macOS 15.7.3, Zulu JDK 17.0.4.1, Maven 3.9.1. All builds were run offline (`mvn -o`) to remove network variance. Framework versions: ZK 10.3.0.1 CE (`zul` — no EE component is used anywhere in the application) with zkspringboot 3.2.7.1, Vaadin 24.4.5, Wicket 10.1.0, React 18.3.1 with Vite 5.4.21, Angular 17.3.12. ZK runs on Jetty 12.0.13, which zkspringboot pulls in; the other five run on Tomcat, as their starters default.

All six applications render 15 rows on the first page of the employee list, verified in source and in the rendered DOM.

## Test environment — Level 2 (HR Workspace)

Level 2 standardized all six implementations on Spring Boot 3.3.4 with the Jakarta namespace, under a single multi-module Maven project. The backend was no longer shared at Level 2 — each framework provided its own data layer, since Level 2 focused on frontend component richness rather than backend integration patterns.

React and Angular were standalone frontend applications at Level 2 — no Spring Boot backend. They used hardcoded mock data. This reflects realistic Level 2 frontend-focused development, and is noted in the measurements.

## Test environment — Level 3 (Live HR Operations Center)

Level 3 used Spring Boot 3.3.4 with the Jakarta namespace (`apps3/`), reusing the Level 2 shared module as a Maven dependency. Only ZK and Vaadin provided full implementations. The other four frameworks provided explanation cards documenting the implementation approach and estimated effort.

All measurements were taken on the same hardware under consistent conditions, with JDK 17 and clean builds (tests skipped). Level 1 response times are measured in a real browser and are described in the Level 1 section below. Level 2 and Level 3 response times are warm server averages (requests 2–5 after one initial warm-up request).

## Level 1: Employee Manager — Full Measurements

### Lines of code

Counted with `wc -l` over hand-written source. The shared backend module (7 files, 398 lines) is counted once and excluded from per-framework totals. Stylesheets are excluded from every framework on the same rule — Vaadin 0, Thymeleaf 34, Wicket 75, Angular 137, ZK 315, React 575 lines — so that no total includes styling.

| Framework | UI Lines | Backend Lines | Total | JS Written |
|---|---|---|---|---|
| Vaadin | 652 (Java only) | — (shared) | **652** | 0 |
| ZK | 402 (Java ViewModel) + 377 (ZUL) | — (shared) | **779** | 0 |
| Wicket | 612 (Java) + 319 (HTML) | — (shared) | **931** | 0 |
| Thymeleaf | 353 (Java) + 651 (HTML) | — (shared) | **1,004** | 0 |
| React | 730 (JSX) + 307 (Java API) | 307 | **1,037** | 730 |
| Angular | 810 (TS) + 295 (Java API) | 295 | **1,105** | 810 |

Two things have to be read alongside this table.

**Vaadin is the smallest, and part of that comes from writing no stylesheet at all.** It composes its UI in Java with no template language and inherits Vaadin's Lumo theme, adding only six `getStyle()` chains. The other five hand-write the design in CSS. Vaadin's 652 lines are real, but they buy a themed look rather than the custom one the others build.

**ZK pages in memory; the other five page on the server.** The user-facing behavior is identical — same pagination, same sorting — but the paging happens in a different place. The other five issue a bounded query per page turn, so their controllers hold page state and implement a sort callback. ZK loads the whole result set into a [`ListModelList`](https://docs.zkoss.org/zk_dev_ref/mvc/list_model) and lets the listbox page and sort it in memory, so its ViewModel needs neither. Part of that saving is the framework doing the work for you; part of it is an unbounded query and a model held per user session — free at 57 rows and idiomatic at that size, but a cost that grows with the dataset. This is a choice made for this application, not a framework limit: ZK supports server-side paging through a custom `ListModel`.

### Build times

Warm `mvn -o clean package -DskipTests -pl <module>`; each module built twice, the second run reported. Frontend builds were measured separately with a warm cache.

| Framework | Maven | Frontend build | Full build |
|---|---|---|---|
| ZK | 1.71s | — | **1.71s** |
| Thymeleaf | 2.36s | — | **2.36s** |
| Wicket | 2.71s | — | **2.71s** |
| React | 2.42s | 1.43s (Vite, 91 modules) | **3.85s** |
| Vaadin | 5.80s | — (runs in-Maven) | **5.80s** |
| Angular | 2.56s | 5.69s (`ng build`) | **8.25s** |

ZK builds fastest of the six. Part of that advantage is dependency count: on CE there are five fewer jars to resolve and repackage than on EE. Vaadin's Maven plugin drives its frontend toolchain inside the Maven run, which is why its single figure is larger than the other server-side frameworks'. Both frontend builds are reproducible — re-running Vite and `ng build` produced byte-identical bundles with identical content hashes.

### Deployable artifact size

| Framework | JAR Size | Frontend JS | Frontend CSS | Notes |
|---|---|---|---|---|
| React | 46.7 MB | 214.6 KB (72.2 KB gzip) | 6.9 KB | Smallest artifact |
| Angular | 46.8 MB | 309.3 KB (83.2 KB gzip) | 6.6 KB | |
| Thymeleaf | 48.2 MB | 78.8 KB (Bootstrap, CDN) | 323.4 KB (CDN) | Server-rendered, but the CDN adds 402 KB to first load |
| Wicket | 50.7 MB | 0 | 0 (inline) | Links nothing at all |
| ZK | 62.4 MB | 1,337.3 KB | 382.2 KB | Framework payload cached after first load |
| Vaadin | 88.5 MB | 2,816.9 KB | 0 (in JS) | Largest on both dimensions |

Sizes in KB = 1,024 bytes as measured over HTTP; build tools report decimal kB, so Vite's "219.71 kB" is the same file this table calls 214.6 KB.

The ZK row is **ZK CE** (`zul`), which is all this application needs — it uses no EE component. Building it against `zkmax` instead pulls in five more jars and gives a 68.7 MB artifact with 1,520 KB of first-load JavaScript and 543 KB of CSS. ZK's 382 KB of CSS is mostly framework theme, not the application's own 315-line stylesheet.

### Time until rows appear on screen

Earlier revisions of this chapter reported server-side request timings. That metric has been retired: it compared unlike things — a REST endpoint returning JSON against a framework rendering a complete page — and it could not measure Vaadin at all. It is replaced by what the user actually waits for.

**The metric is the time until the user sees rows**, measured in a real browser with Playwright 1.62.1 and headless Chromium. The milestone is identical for all six applications: 15 distinct employee e-mail addresses present in the document, caught by a `MutationObserver`, then one `requestAnimationFrame` for the paint. Every application renders an e-mail column, so this counts data rows without depending on any framework's markup — ZK's `tr.z-listitem`, Vaadin's shadow-DOM grid rows and four plain `<tbody>` tables are all counted by one rule. No landing page contains an e-mail address, so the milestone cannot fire early.

Two scenarios were timed. A **warm click** starts when the click lands in an already-open application with its asset cache primed. A **cold visit** starts at navigation start in a fresh browser context with an empty cache. Both use absolute epoch times rather than per-document clocks, so a click that triggers a full-page navigation — Thymeleaf and Wicket — is still measured across the document boundary.

| Framework | Warm click | Cold visit |
|---|---|---|
| Thymeleaf | **22.7 ms** | 67.7 ms |
| Wicket | 39.4 ms | 72.5 ms |
| Angular | 39.6 ms | 63.4 ms |
| React | 52.5 ms | **38.5 ms** |
| ZK | ~93 ms | 99.9 ms † |
| Vaadin | 201.0 ms | 663.8 ms |

† ZK's cold visit loads `/employee-list.zul`, a bare fragment with no header or sidebar. It is **not** comparable to the other five, which load their full shell. ZK's shell load to a clickable navigation control was measured separately at 153.9 ms.

**What this data supports.** ZK puts rows on screen more than twice as fast as Vaadin — 93 ms against 201 ms on a warm click, and Vaadin is the slowest of the six on both scenarios. Against the other four, ZK loses: it finishes fifth of six on the warm click, ahead only of Vaadin. Thymeleaf reaches rows in roughly a quarter of ZK's time because its client does almost nothing once the HTML arrives, where ZK's browser has to execute script, build widgets, lay them out and paint.

**Caveats that travel with these numbers.**

- **n=3, preliminary.** Three timed iterations per application after a discarded warm-up, mean reported, fresh browser context per iteration. Run-to-run spread on the same application reached about 20%. ZK's warm click is 108.9 ms over 3 iterations and 90.4 ms over 20, which is why 93 ms is the figure used.
- **Loopback only.** The cold-visit column does not charge ZK's 1.7 MB or Vaadin's 2.8 MB of framework JavaScript a realistic transfer cost, so it flatters both.
- **C1-only JIT.** Every application was started the documented way, `mvn spring-boot:run`, which forks the JVM with `-XX:TieredStopAtLevel=1`. C2 never engages, so no application here reaches peak JIT performance. This is uniform across the six, so the comparisons stand, but every absolute millisecond is pessimistic against a production `java -jar` launch.

### Architecture complexity

| Framework | Layers | State | Languages |
|---|---|---|---|
| Vaadin | 1 | Server session | Java only |
| ZK | 2 | Server session | Java + ZUL |
| Thymeleaf | 2 | Stateless | Java + HTML |
| Wicket | 2 | Server session | Java + HTML |
| React | 3 | Client (useState) | Java + JSX |
| Angular | 4 | RxJS + services | Java + TypeScript |

## Level 2: HR Workspace — Full Measurements

### Component implementation status

Each view is classified by how the component was delivered:

- ✅ Native — built-in component from the framework vendor, no external library
- 🔷 Ecosystem wrapper — official framework-specific package (e.g. @fullcalendar/react, PrimeReact, PrimeNG)
- 🔶 Directory add-on or CDN — Vaadin Directory add-on (free, Java API), or CDN-loaded JS library (correct pattern for server-side frameworks with no component library)
- 💰 Commercial placeholder — paid component available but not implemented; placeholder shown
- ⚠️ No solution — no framework-appropriate solution found at any tier

| View | ZK | Vaadin | Thymeleaf | Wicket | React | Angular |
|---|---|---|---|---|---|---|
| Event Calendar | ✅ `<calendars>` (native EE) | 🔶 FullCalendar for Flow (Directory, FlowingCode) | 🔶 FullCalendar CDN | 🔶 FullCalendar CDN via renderHead | 🔷 @fullcalendar/react | 🔷 @fullcalendar/angular |
| Org Chart | ✅ `<organigram>` (native EE) | 🔶 OrgChart Add-on (Directory, FlowingCode) | 🔶 OrgChart.js CDN | 🔶 OrgChart.js CDN via renderHead | 🔷 PrimeReact OrganizationChart (MIT) | 🔷 PrimeNG p-organizationChart (MIT) |
| Salary Pivot | ✅ `<pivottable>` (native EE) | 🔶 PivotTable for Vaadin (Directory, Vaadin Component Factory) | 🔶 PivotTable.js CDN | 🔶 PivotTable.js CDN via renderHead | 🔷 react-pivottable (MIT) | 💰 Syncfusion / DevExtreme (commercial — placeholder) |
| Portal Dashboard | ✅ `<portallayout>` + `<charts>` (native EE) | ✅ Vaadin Dashboard + Charts (Vaadin Pro, commercial) | 🔶 Gridstack.js + Chart.js CDN | 🔶 Gridstack.js + Chart.js CDN via renderHead | 🔷 react-grid-layout + recharts (MIT) | 🔷 angular-gridster2 + ng2-charts (MIT) |
| Views delivered | 4/4 | 4/4 | 4/4 | 4/4 | 4/4 | 3/4 |
| Native framework components | 4 | 1 (Dashboard + Charts, commercial) | 0 | 0 | 0 | 0 |
| Ecosystem wrappers | — | — | — | — | 4 | 3 |
| Directory add-ons / CDN | — | 3 (Directory add-ons, free Java API) | 4 (CDN) | 4 (CDN) | — | — |
| Commercial placeholder | — | — | — | — | — | 1 (Pivot) |

**Key notes on Vaadin:** The three Directory add-ons (FullCalendar for Flow, OrgChart Add-on, PivotTable for Vaadin) expose Java APIs — the developer writes no JavaScript. They come from third-party vendors on the Vaadin Directory (FlowingCode, Vaadin Component Factory), not from Vaadin Ltd directly. Each has its own release schedule separate from Vaadin core.

**Key notes on Angular:** No free native Angular pivot table component exists. Syncfusion and DevExtreme both offer commercial solutions. The Angular implementation shows a placeholder for this view.

### Lines of code and JavaScript written

| Framework | Total LOC | JS Written | Views Delivered | Notes |
|---|---|---|---|---|
| ZK | 430 | 0 | 4/4 | All native ZK components; Java ViewModel + ZUL tags |
| Vaadin | 592 | 0 | 4/4 | Directory add-ons use Java API — no JS strings required |
| Thymeleaf | 274 | ~80 (inline `<script>` tags) | 4/4 | CDN lib init code in HTML templates |
| Wicket | 337 | ~100 (Java string-embedded) | 4/4 | JS embedded in `OnDomReadyHeaderItem` Java strings |
| React | ~265 | ~265 (JSX) | 4/4 | FullCalendar, PrimeReact OrgChart, react-pivottable, react-grid-layout + recharts |
| Angular | ~410 | ~410 (TypeScript) | 3/4 | FullCalendar, PrimeNG OrgChart, angular-gridster2 + ng2-charts; Pivot = placeholder |

### Third-party libraries required

| Framework | Libraries Needed | Integration Pattern |
|---|---|---|
| ZK | 0 | All native framework components |
| Vaadin | 3 Directory add-ons + 1 native commercial | Java API (no JS); from 3 different vendors |
| Thymeleaf | 4 (FullCalendar, OrgChart.js, PivotTable.js, Gridstack.js + Chart.js) | CDN `<script>` tags |
| Wicket | 4 (same as Thymeleaf) | CDN via `JavaScriptHeaderItem.forUrl()` + renderHead |
| React | 5–6 NPM packages (from 4 vendors) | Framework-native wrappers (@fullcalendar/react, primereact, react-pivottable, react-grid-layout, recharts) |
| Angular | 4–5 NPM packages (from 3–4 vendors) | Framework-native wrappers; Pivot requires commercial license |

### Build times and artifact sizes (Level 2)

| Framework | Build Time | JAR Size | Frontend JS | Notes |
|---|---|---|---|---|
| Thymeleaf | ~2.1s | 47 MB | CDN only | Minimal deps |
| Wicket | ~2.2s | 49 MB | CDN only | Wicket framework bundled |
| React | ~2.1s† | N/A† | 920 KB (275 KB gzip) | Standalone frontend; FullCalendar, react-pivottable, react-grid-layout |
| ZK | ~3.5s | 76 MB | ~1.5 MB (ZK + ZKCharts) | Larger than Level 1 due to zkcharts and zkmax JARs |
| Angular | ~6.3s† | N/A† | 756 KB (202 KB gzip) | Standalone frontend; Pivot = commercial placeholder |
| Vaadin | ~6.9s | 89 MB | ~2.8 MB | Includes Highcharts, Lit/Polymer; slowest build |

†Standalone frontend build — no Spring Boot backend included in this measurement.

### Server response times — Level 2 (warm, localhost, avg of requests 2–5)

| Framework | Endpoint | Avg Response Time | Notes |
|---|---|---|---|
| React | GET / (Vite dev) | ~1–2 ms | Static HTML shell |
| Angular | GET / (ng serve) | ~1–2 ms | Static HTML shell |
| Thymeleaf | GET /calendar | ~2–3 ms | Server-rendered, CDN component init |
| Wicket | GET /calendar | ~2 ms | CDN component init |
| ZK | GET /calendar.zul | ~7–9 ms | Full calendar component render + session init |
| Vaadin | GET /calendar | ~7–8 ms | Vaadin AJAX-based navigation |

### JavaScript written by developer — Level 2

The Level 2 JS-written metric is the sharpest differentiator between frameworks at this complexity level:

| Framework | JS/TS Written | Source |
|---|---|---|
| ZK | 0 lines | All 4 views use native ZK components |
| Vaadin | 0 lines | Directory add-ons expose Java API — no JS required |
| Thymeleaf | ~80 lines | Inline `<script>` blocks initializing CDN libraries |
| Wicket | ~100 lines | JS embedded in Java string literals via renderHead |
| React | ~265 lines | All UI logic in JSX across 4/4 real npm components |
| Angular | ~410 lines | TypeScript across 3/4 real components; Pivot = placeholder |

ZK and Vaadin both achieve zero JavaScript at Level 2. The distinction between them is who owns the components: ZK's are all from Potix Corporation, Vaadin's are from Vaadin Ltd (Dashboard) plus three third-party Directory vendors.

## Level 3: Live HR Operations Center — Full Measurements

### Scope

Two features were fully implemented in ZK and Vaadin. React, Angular, Thymeleaf, and Wicket ran as minimal Spring Boot applications but showed placeholder views — styled panels rendered within the app in place of each unimplemented feature, describing the libraries, infrastructure, and developer effort that would be required.

### Feature 1: Large Dataset Grid (10,000 rows)

| Metric | ZK | Vaadin | React | Angular | Thymeleaf | Wicket |
|---|---|---|---|---|---|---|
| Built-in virtualization | ✅ ROD (1 XML attribute) | ✅ DataProvider.fromCallbacks() | ❌ External library required | ⚠️ CDK Virtual Scroll (built-in, needs wiring) | ❌ None | ⚠️ Pagination only |
| DOM nodes at runtime | ~20 (viewport only) | ~50–100 (page window) | Library-dependent | Library-dependent | All rows | Current page |
| Server round-trip on scroll | None (data in Java heap) | Yes (offset/limit query per page) | N/A | N/A | N/A | N/A |
| Developer UI code | 64 lines (32 VM + 32 ZUL) | 50 lines | ~200 LOC JS + library | ~150 LOC TS + CDK wiring | ~200 LOC JS | ISortableDataProvider impl |
| JavaScript required | 0 | 0 | ~200 | ~150 | ~200 | 0 (pagination only) |

**ZK note:** For datasets too large for Java heap, ZK also provides `BigListBox + MatrixModel` (ZK EE), where Java heap usage stays constant regardless of dataset size — only the visible rows occupy memory.

**Vaadin note:** `DataProvider.fromCallbacks()` makes a database query per scroll page. Developer writes two lambda callbacks; Vaadin handles the UI-side virtualization.

**Angular note:** Angular CDK Virtual Scroll is built-in, which is an advantage over React (external library). However, the developer must wire it explicitly: `itemSize` strategy, `trackBy` functions, viewport connection.

**Wicket/React/Angular/Thymeleaf note:** LOC estimated — these frameworks were not fully implemented at Level 3. The LOC represents a reasonable implementation scope based on the integration approach described, not measured code.

### Feature 2: Real-Time Server Push Dashboard

| Metric | ZK | Vaadin | React | Angular | Thymeleaf | Wicket |
|---|---|---|---|---|---|---|
| Built-in mechanism | ✅ EventQueue (APPLICATION scope) | ✅ @Push + UI.access() | ❌ None | ❌ None | ❌ None | ⚠️ AbstractAjaxTimerBehavior (polling) |
| Transport | WebSocket/Comet (automatic) | WebSocket (via @Push) | STOMP/SockJS or native WS | RxJS WebSocket | SSE/WebSocket | Interval polling |
| Thread safety | Automatic | ui.access() required by developer | Developer-managed | Developer-managed | Developer-managed | N/A |
| Developer push code | ~15 lines | ~30 lines | ~350 lines | ~300 lines | ~400 lines | ~50 lines (polling) |
| JavaScript required | 0 | 0 | ~350 | ~300 | ~400 | 0 |

**ZK note:** `APPLICATION`-scoped `EventQueue` broadcasts to all connected sessions from a single publisher. Developer subscribes in ViewModel; thread safety is handled by ZK automatically.

**Vaadin note:** `@Push` must be on `AppShellConfigurator` (not `AppLayout` — placing it there causes a startup `RuntimeException`). All UI updates must be wrapped in `ui.access()` to ensure thread safety.

**Wicket note:** `AbstractAjaxTimerBehavior` is client-initiated polling, not true server push. Suitable for low-frequency updates; not suitable for applications requiring immediate push delivery. The LOC represents a reasonable implementation scope based on the integration approach described, not measured code.

**React/Angular/Thymeleaf note:** Achieving real-time push requires assembling WebSocket infrastructure on both server and client sides. None of these frameworks provide a built-in mechanism. The LOC represents a reasonable implementation scope based on the integration approach described, not measured code.

### Total UI LOC and JavaScript written — Level 3

| Framework | Grid LOC | Push LOC | Total UI LOC | JS Required |
|---|---|---|---|---|
| ZK | 64 (VM + ZUL) | 72 (VM + ZUL) | 136 | 0 |
| Vaadin | 50 | 110 | 160 | 0 |
| React | N/A (explanation card) | N/A | — | Library + integration required |
| Angular | N/A (explanation card) | N/A | — | CDK + integration required |
| Thymeleaf | N/A (explanation card) | N/A | — | Library + JS infrastructure required |
| Wicket | N/A (explanation card) | N/A | — | 0 (polling only) |

## Level 4: Enterprise Requirements — WCAG Accessibility

### Accessibility support by framework

| Framework | Built-in Module | Coverage | Manual Effort | Overall Effort |
|---|---|---|---|---|
| Vaadin | ✅ Core (always on) | Very strong — standard components WCAG 2.1 AA | Moderate | Low |
| ZK | ✅ za11y.jar | Strong | Moderate | Low–Medium |
| Angular | ✅ @angular/cdk/a11y | Moderate | Moderate | Medium |
| React | ⚠️ Third-party only | Library-dependent | Moderate–Extensive | Medium–Very High |
| Wicket | ❌ None | Weak | Extensive | High |
| Thymeleaf | ❌ None | None | Everything | Very High |

### Framework-level accessibility detail

**Vaadin** — Accessibility is built into every component, not a separate jar. Standard components are WCAG 2.1 AA compliant and audited annually by TetraLogical. No separate configuration is required. Remaining manual work is limited to application-level semantics (page landmarks, form labels where context is custom, contrast in Lumo overrides).

**ZK** — Adding `za11y.jar` to the classpath retrofits WAI-ARIA roles, keyboard navigation, screen reader live regions, and high-contrast support across all ZK components. Some manual work required for application-specific patterns not covered by the module.

**Angular** — The `@angular/cdk/a11y` package provides `LiveAnnouncer`, `FocusTrap`, `ListKeyManager`, and high-contrast detection. These are useful building blocks, but component libraries (PrimeNG, Angular Material) have inconsistent accessibility quality. More manual testing and remediation than ZK or Vaadin.

**React** — No built-in accessibility support. The best path is choosing an accessible component library (Radix UI, Adobe React Spectrum, Headless UI), but coverage depends entirely on library choice and version. High variability.

**Wicket** — No accessibility module. All ARIA roles, labels, keyboard navigation, and focus management must be written explicitly by the developer. High effort for full WCAG compliance.

**Thymeleaf** — A template engine with no component model and no accessibility scaffolding. Every semantic landmark, ARIA attribute, keyboard handler, and focus behavior is the developer's responsibility.

### Security and enterprise support summary

| Framework | Commercial Support | Security Process | Long-term Assurance |
|---|---|---|---|
| ZK | ✅ Potix Corporation | Snyk + CodeQL + SonarQube CI/CD; ISO 27001; OSCP pen testing | Commercial — direct financial incentive |
| Vaadin | ✅ Vaadin Ltd | Internal security practices; formal audit program | Commercial — direct financial incentive |
| React | ❌ Community only | Meta internal practices; community CVE reporting | Meta-backed; ecosystem dependencies not guaranteed |
| Angular | ❌ Community only | Google internal practices; community CVE reporting | Google-backed; ecosystem dependencies not guaranteed |
| Thymeleaf | ❌ Community only | Community CVE reporting | Apache/community maintained |
| Wicket | ❌ Community only | Community CVE reporting | Apache maintained — slow but stable |

### Notes on methodology

Level 1 response times are browser measurements to a shared on-screen milestone, described in the Level 1 section above; they are n=3 and preliminary. Level 2 and Level 3 response times were measured warm — after one initial request to allow JVM JIT compilation and connection pool initialization — and represent server processing time at localhost, with network latency excluded.

Line counts include all developer-written code in the application layer. Generated code, framework internals, stylesheets, build configuration, and the shared backend module are excluded from per-framework totals.

For Level 2, JavaScript embedded inside Java string literals (as in Wicket's `renderHead` pattern) is counted as JavaScript written by the developer — it is application code, regardless of the surrounding language.

The Level 2 measurements reflect fully functional implementations wherever a framework-appropriate solution was available. Where a commercial placeholder was used (Angular's pivot table), it is noted and excluded from line counts.

The React and Angular Level 2 applications were built as standalone frontend applications with no Spring Boot backend, using hardcoded mock data. This reflects how these frameworks are typically developed when the backend is separate — the frontend is a self-contained application.

Level 3 line counts for React, Angular, and Thymeleaf are estimates only — these frameworks were not implemented, and no code was written or measured. The figures in the Feature 1 and Feature 2 tables reflect the expected scope of a complete implementation based on the documented integration patterns, not actual measurements.
