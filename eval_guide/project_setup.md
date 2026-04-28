---
title: "Project Setup and Detailed Measurements"
permalink: /eval-guide/project-setup/
---

# Part 4-7: Project Setup and Detailed Measurements

This chapter documents the full setup, methodology, and raw measurements behind the comparisons throughout Part 4. It is the reference layer — the summaries in Part 4-1 through 4-6 draw from the data here.

## Test environment — Level 1 (Employee Manager)

Level 1 used Spring Boot 2.7.7 with the javax namespace for ZK, Thymeleaf, Wicket, and React. A shared Maven module provided the backend entities, repositories, and service layer — all frameworks used the same backend code.

Vaadin required its own separate Spring Boot 3.x setup with the Jakarta namespace, which meant it could not participate in the shared javax module. Vaadin's Level 1 entities were duplicated from the shared module.

## Test environment — Level 2 (HR Workspace)

Level 2 standardized all six implementations on Spring Boot 3.3.4 with the Jakarta namespace, under a single multi-module Maven project. The backend was no longer shared at Level 2 — each framework provided its own data layer, since Level 2 focused on frontend component richness rather than backend integration patterns.

React and Angular were standalone frontend applications at Level 2 — no Spring Boot backend. They used hardcoded mock data. This reflects realistic Level 2 frontend-focused development, and is noted in the measurements.

## Test environment — Level 3 (Live HR Operations Center)

Level 3 used Spring Boot 3.3.4 with the Jakarta namespace (`apps3/`), reusing the Level 2 shared module as a Maven dependency. Only ZK and Vaadin provided full implementations. The other four frameworks provided explanation cards documenting the implementation approach and estimated effort.

All measurements were taken on the same hardware under consistent conditions, with JDK 17 and clean builds (tests skipped). Response times are warm averages (requests 2–5 after one initial warm-up request).

## Level 1: Employee Manager — Full Measurements

### Lines of code

The shared backend module (7 files, 398 lines) is counted once and excluded from per-framework totals.

| Framework | UI Lines | Backend Lines | Total | JS Written |
|---|---|---|---|---|
| ZK | 937 (Java VM + ZUL) | — (shared) | 937 | 0 |
| Vaadin | 1,064 (Java only) | — (shared*) | 1,064 | 0 |
| Thymeleaf | 1,038 (HTML + Java) | — (shared) | 1,038 | 0 |
| Wicket | 1,006 (Java + HTML) | — (shared) | 1,006 | 0 |
| React | 730 (JSX) + 307 (Java API) | 307 | 1,037 | 730 |
| Angular | 798 (TS) + 295 (Java API) | 295 | 1,093 | 798 |

\*Vaadin required entity duplication due to Jakarta namespace incompatibility with the shared javax module.

### Build times

| Framework | Build Time | Notes |
|---|---|---|
| Thymeleaf | ~2.2s | Maven only |
| Wicket | ~2.4s | Maven only |
| ZK | ~2.6s | Maven + WAR packaging |
| React | ~3.3s | Maven + Vite |
| Vaadin | ~6.6s | Maven + Vaadin plugin (downloads Node) |
| Angular | ~7.5s | Maven + ng build |

### Deployable artifact size

| Framework | JAR Size | Frontend JS | Notes |
|---|---|---|---|
| React | 39 MB | 215 KB (72 KB gzip) | Smallest payload |
| Thymeleaf | 40 MB | None | Server-rendered |
| Wicket | 43 MB | None | Server-rendered |
| ZK | 60 MB | 1,520 KB | ZK framework cached after first load |
| Vaadin | 88 MB | 2,678 KB | Largest on both dimensions |

### Server response times (warm, localhost, avg of requests 2–5)

| Framework | Endpoint | Avg Response |
|---|---|---|
| Vaadin | GET /employees | ~5–8 ms |
| Thymeleaf | GET /employees | ~7–9 ms |
| React | GET /api/employees | ~5–10 ms |
| Angular | GET /api/employees | ~6–14 ms |
| ZK | GET /index.zul | ~11–13 ms |
| Wicket | GET /employees | ~14–24 ms |

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
| Vaadin | ✅ Core (always on) | Very strong — WCAG Compatible | Moderate | Low |
| ZK | ✅ za11y.jar | Very Strong — WCAG Compatible | Moderate | Low–Medium |
| Angular | ✅ @angular/cdk/a11y | Moderate | Moderate | Medium |
| React | ⚠️ Third-party only | Library-dependent | Moderate–Extensive | Medium–Very High |
| Wicket | ❌ None | Weak | Extensive | High |
| Thymeleaf | ❌ None | None | Everything | Very High |

### Framework-level accessibility detail

**Vaadin** — Accessibility is built into every component. No separate configuration required. Remaining manual work is limited to application-level semantics (page landmarks, form labels where context is custom).

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

All response times were measured warm — after one initial request to allow JVM JIT compilation and connection pool initialization. Response times represent the server processing time at localhost; network latency is excluded.

Line counts include all developer-written code in the application layer. Generated code, framework internals, and the shared backend module are excluded from per-framework totals.

For Level 2, JavaScript embedded inside Java string literals (as in Wicket's `renderHead` pattern) is counted as JavaScript written by the developer — it is application code, regardless of the surrounding language.

The Level 2 measurements reflect fully functional implementations wherever a framework-appropriate solution was available. Where a commercial placeholder was used (Angular's pivot table), it is noted and excluded from line counts.

The React and Angular Level 2 applications were built as standalone frontend applications with no Spring Boot backend, using hardcoded mock data. This reflects how these frameworks are typically developed when the backend is separate — the frontend is a self-contained application.

Level 3 line counts for React, Angular, and Thymeleaf are estimates only — these frameworks were not implemented, and no code was written or measured. The figures in the Feature 1 and Feature 2 tables reflect the expected scope of a complete implementation based on the documented integration patterns, not actual measurements.
