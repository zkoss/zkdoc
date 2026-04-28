---
title: "What We Built and What We Found"
permalink: /eval-guide/build-and-found/
---

# Part 4-1: What We Built and What We Found

Comparisons are only as credible as the work behind them. Rather than relying on documentation, benchmarks from other sources, or theoretical analysis, every comparison in Part 4 is based on applications that were actually built — the same requirements, implemented in each framework, measured under the same conditions.

This chapter summarizes what we built, how we measured it, and what the headline findings were. The detailed measurements are in Part 4-7.

## What we built

### Level 1 — Employee Manager

A low/mid-complexity internal application covering the features common to most enterprise data management tools: an employee list with sortable, filterable columns; employee detail view with inline editing; department drill-down; and basic form validation.

The backend was shared across all six implementations — the same Spring Boot module, the same JPA entities, the same service layer. Each framework implementation was only the UI layer.

This is a representative internal enterprise application — not a toy example, but not unusually complex either. The differences here reflect framework overhead and developer ergonomics at a typical baseline.

### Level 2 — HR Workspace (Advanced Components)

The second application pushed into more demanding territory: four views that require sophisticated UI components — an event calendar, an org chart, a salary pivot table, and a portal dashboard with draggable widgets and live charts.

These components represent a category of requirement that is common in enterprise applications but rarely covered in framework tutorials. The question was whether each framework could deliver these views using framework-native tools, or whether external library assembly was required.

### Level 3 — Live HR Operations Center (Large Data & Real-Time)

The third application tested two capabilities that separate frameworks sharply in demanding enterprise scenarios: a data grid rendering 10,000 employee rows with virtual scrolling, and a real-time server-push dashboard that updates live without page refresh.

### Level 4 — Enterprise Requirements

We evaluated WCAG 2 AA accessibility compliance separately, using the Level 1 application as the context, plus a cross-framework review of security processes and commercial support structures.

## How we measured

For each application and each framework we measured: lines of code (UI and backend separately), number of files, JavaScript written by the developer, third-party libraries required, build time, deployable artifact size, and server response time under warm conditions.

All measurements were taken under consistent conditions: JDK 17, the same hardware, clean builds with tests skipped, response times averaged over requests 2–5 after one warm-up request.

## Headline findings

### On the Employee Manager (Level 1):

ZK produced the fewest lines of code of any framework — 937 total — while writing zero JavaScript. React and Angular required 1,037 and 1,093 lines respectively, including hundreds of lines of JavaScript or TypeScript plus a REST API layer not needed by the server-side frameworks.

Thymeleaf was the fastest to build and the lightest at runtime — no framework JavaScript reaches the browser, and build times are minimal. The trade-off is that the framework contributes nothing beyond templates: all interactive behavior is the developer's responsibility.

All six frameworks completed the Employee Manager successfully.

### On the HR Workspace (Level 2):

This is where the frameworks diverged — and the results were more nuanced than a simple ranking.

The core question was whether each framework could provide all four enterprise components — event calendar, org chart, pivot table, and portal dashboard — and through what mechanism. We used a tiered classification:

- **✅ Native** — a built-in component from the framework vendor, no external library needed
- **🔷 Ecosystem wrapper** — an official framework-specific package (e.g. @fullcalendar/react, PrimeReact, PrimeNG)
- **🔶 Directory add-on or CDN** — a Vaadin Directory add-on (free, Java API), or a CDN-loaded JavaScript library (the correct pattern for server-side frameworks with no component library)
- **💰 Commercial placeholder** — a paid component exists but was not implemented; a placeholder is shown
- **⚠️ No solution** — no framework-appropriate solution found at any tier

The results across all four views:

| View | ZK | Vaadin | Thymeleaf | Wicket | React | Angular |
|---|---|---|---|---|---|---|
| Event Calendar | ✅ Native | 🔶 Directory add-on | 🔶 CDN | 🔶 CDN | 🔷 Ecosystem wrapper | 🔷 Ecosystem wrapper |
| Org Chart | ✅ Native | 🔶 Directory add-on | 🔶 CDN | 🔶 CDN | 🔷 Ecosystem wrapper | 🔷 Ecosystem wrapper |
| Salary Pivot | ✅ Native | 🔶 Directory add-on | 🔶 CDN | 🔶 CDN | 🔷 Ecosystem wrapper | 💰 Commercial only |
| Portal Dashboard | ✅ Native | ✅ Native (commercial) | 🔶 CDN | 🔶 CDN | 🔷 Ecosystem wrapper | 🔷 Ecosystem wrapper |
| Views delivered | 4/4 | 4/4 | 4/4 | 4/4 | 4/4 | 3/4 |

**ZK delivered all four views as native built-in components** — `<calendars>`, `<organigram>`, `<pivottable>`, and `<portallayout>` — with zero third-party libraries and zero JavaScript written by the developer.

**Vaadin delivered all four views with proper Java APIs throughout.** The portal dashboard uses Vaadin's own commercial Dashboard component. The other three views use free Vaadin Directory add-ons (FullCalendar for Flow, OrgChart Add-on, PivotTable for Vaadin) — each exposing a Java API so no JavaScript is required. So in practice: three of four components are from Vaadin Ltd directly (Dashboard, Charts, and PivotTable), and two are from third-party vendors on the Directory (FlowingCode's FullCalendar and OrgChart).

**React delivered all four views using five to six npm packages from multiple vendors:** @fullcalendar/react, PrimeReact OrganizationChart, react-pivottable, react-grid-layout, and recharts — each from a different vendor, each with its own release cycle.

**Angular delivered three of four views.** Angular has official ecosystem wrappers for the calendar (@fullcalendar/angular), org chart (PrimeNG), and portal dashboard (angular-gridster2 + ng2-charts). No free pivot table solution exists for Angular — Syncfusion and DevExtreme both offer commercial options only.

**Thymeleaf and Wicket both delivered all four views by loading CDN JavaScript libraries** — FullCalendar, OrgChart.js, PivotTable.js, and Gridstack.js + Chart.js. These libraries are initialized in HTML templates (Thymeleaf) or via Java renderHead strings (Wicket). The result is functional but requires JavaScript initialization code and produces no Java integration.

#### Lines of code and JavaScript written:

| Framework | Total LOC | JS Written | Views Delivered |
|---|---|---|---|
| ZK | 430 | 0 | 4/4 |
| Vaadin | 592 | 0 | 4/4 |
| Thymeleaf | 274 | ~80 (inline script tags) | 4/4 |
| Wicket | 337 | ~100 (Java string-embedded) | 4/4 |
| React | ~265 | ~265 (JSX) | 4/4 |
| Angular | ~410 | ~410 (TypeScript) | 3/4 |

Thymeleaf's low line count reflects the conciseness of HTML templates plus brief CDN initialization scripts. ZK's higher count reflects the verbosity of Java ViewModels; its ZUL templates are compact.

### On the Live HR Operations Center (Level 3):

This is where the architectural divide between server-side and client-side frameworks became most concrete. Two features were tested: a 10,000-row virtual grid and a real-time server-push dashboard. Both were fully implemented in ZK and Vaadin. The other four frameworks showed explanation cards documenting what would be required.

Large dataset grid (10,000 rows): ZK enabled render-on-demand (ROD) with a single XML attribute — the full dataset loads into a `ListModel`, and ZK renders only the visible rows. The total UI code was 64 lines. Vaadin used `DataProvider.fromCallbacks()` with server-side pagination — 50 lines of Java.

Real-time server-push dashboard: ZK's `EventQueue` with `APPLICATION` scope means a single Spring `@Scheduled` bean publishes updates that are broadcast to all connected browser sessions simultaneously. Total push code: approximately 15 lines. Vaadin used `@Push` with `UI.access()` — approximately 30 lines, with more explicit threading management required.

The Level 3 findings add a new dimension to the "zero JavaScript" story. At Level 1 and Level 2, ZK and Vaadin both write zero JavaScript. At Level 3, both continue to write zero JavaScript — but the client-side frameworks require hundreds of lines of JavaScript infrastructure that the server-side frameworks never write at all.

### On enterprise requirements (Level 4):

Vaadin and ZK have the strongest built-in accessibility support. ZK provides the `za11y.jar` module, which retrofits WAI-ARIA roles, keyboard navigation, screen reader live regions, and high-contrast support across all ZK components. Vaadin's accessibility is built into every component by default. Angular provides useful tooling (`@angular/cdk/a11y`) but requires more manual configuration. React has no built-in accessibility support. Thymeleaf and Wicket have none.

For security process and enterprise support, ZK and Vaadin are the only frameworks in this guide with commercial vendors, formal support contracts, and documented security processes. The others rely on community CVE reporting and internal practices at Meta (React) or Google (Angular).
