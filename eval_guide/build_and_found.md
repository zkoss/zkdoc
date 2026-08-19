---
title: "What We Built and What We Found"
description: "What we built and found benchmarking ZK, React, Angular, Vaadin, and Wicket across three real applications."
permalink: /eval-guide/build-and-found
---

# Part 4-1: What We Built and What We Found

Comparisons are only as credible as the work behind them. Rather than relying on documentation, benchmarks from other sources, or theoretical analysis, every comparison in Part 4 is based on applications that were actually built — the same requirements, implemented in each framework, measured under the same conditions.

**Every application, and every measurement report behind them, is published at [zkoss-demo/web-ui-framework-comparison](https://github.com/zkoss-demo/web-ui-framework-comparison).** The apps are buildable and runnable, the measurement reports are in `doc/`, and any number quoted in Part 4 can be traced to the code it came from and re-measured. The repository is maintained by the ZK team, which is stated there as plainly as it is here — the method is disclosed so the figures can be checked, not because the source is disinterested.

This chapter summarizes what we built, how we measured it, and what the headline findings were. The detailed measurements, project setup, and full data tables are in [Part 4-7: Project Setup and Detailed Measurements](https://docs.zkoss.org/eval-guide/project-setup).

The frameworks covered are: ZK, Vaadin, React (with Spring Boot), Angular (with Spring Boot), Thymeleaf + Spring MVC, and Apache Wicket. These were chosen to represent the main categories of Java web UI development — server-driven Java frameworks, client-side SPA frameworks, and server-side templating — covering both the most commercially significant options and the most commonly used open-source alternatives.

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

For each application and each framework we measured: lines of code (UI and backend separately), number of files, JavaScript written by the developer, third-party libraries required, build time, deployable artifact size, and the time until data rows appear on screen.

All measurements were taken under consistent conditions: Apple M1 Pro, macOS 15.7.3, Zulu JDK 17, Maven 3.9.1, offline builds with tests skipped. At Level 1 all six applications share one Spring Boot 3.3.4 backend module and render 15 rows per page.

Response time is measured in a real browser rather than at the server, because a server figure compares unlike things — a REST endpoint returning JSON against a framework rendering a complete page — and cannot be taken for Vaadin at all. Using Playwright and headless Chromium, we time the moment 15 employee e-mail addresses are present in the document and painted. The milestone is identical for all six, in two scenarios: a warm click inside an already-open application, and a cold visit with an empty cache. These figures are n=3 and preliminary; the full method, the numbers and their caveats are in [Part 4-7](https://docs.zkoss.org/eval-guide/project-setup).

## Headline findings

### On the Employee Manager (Level 1):

**The three server-driven Java frameworks write the least code, and Vaadin writes the least of all.** Vaadin needed 652 lines, ZK 779 and Wicket 931, against Thymeleaf's 1,004, React's 1,037 and Angular's 1,105. Vaadin's lead over ZK comes partly from composing its UI in Java with no template language, and partly from writing no stylesheet at all — it inherits the Lumo theme where the other five hand-write their design in CSS. ZK's figure carries its own qualification: it pages the employee list in memory while the other five page on the server, so its ViewModel holds no page state and needs no sort callback. The feature the user sees is the same; the work sits in a different place.

**Where ZK's advantage is unqualified is what it does not require you to write.** Zero JavaScript, verified mechanically — no `.js` or `.ts` files and no inline `<script>` bodies — against React's 730 lines of JSX and Angular's 810 of TypeScript. And zero REST layer: React and Angular each needed one, 307 and 295 lines of controllers and DTOs that the server-driven frameworks did not write at all, because a ViewModel calls the Spring service directly.

**ZK builds fastest of the six**, at 1.71s against Thymeleaf's 2.36s, Vaadin's 5.80s and Angular's 8.25s full build.

Thymeleaf is the quickest to put rows on screen — 22.7 ms on a warm click, roughly a quarter of ZK's 93 ms — because its client does almost nothing once the HTML arrives. It is not, however, the lightest of the six on the wire — Wicket is, at 21 KB, because it links no external JavaScript or CSS at all. Nor is Thymeleaf's artifact the smallest, and "no framework JavaScript" understates its page: the Bootstrap CDN it links adds 402 KB to first load. The deeper trade-off is that the framework contributes nothing beyond templates — all interactive behavior is the developer's responsibility.

**On render speed ZK finishes fifth of six**, ahead only of Vaadin, which it beats by more than 2× (93 ms against 201 ms). That gap is worth stating plainly in both directions: ZK's browser has to execute script, build widgets, lay them out and paint, which Thymeleaf and Wicket never do; and Vaadin does the same work more slowly.

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

**ZK delivered all four views as native built-in components** — `<calendars>`, [`<organigram>`](https://docs.zkoss.org/zk_component_ref/organigram), `<pivottable>`, and [`<portallayout>`](https://docs.zkoss.org/zk_component_ref/portallayout) — with zero third-party libraries and zero JavaScript written by the developer.

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

This is where the architectural divide between server-side and client-side frameworks became most concrete. Two features were tested: a 10,000-row virtual grid and a real-time server-push dashboard. Both were fully implemented in ZK and Vaadin. For the other four frameworks: React, Angular, Thymeleaf, and Wicket, the applications ran but showed placeholder views in place of each unimplemented feature. Each placeholder is a styled panel within the running application that describes what would be required to implement the feature in that framework: which libraries to integrate, what infrastructure to set up, and what the developer would be responsible for. The full breakdown per framework is in Part 4-7.

Large dataset grid (10,000 rows): ZK enabled render-on-demand (ROD) with a single XML attribute — the full dataset loads into a [`ListModel`](https://docs.zkoss.org/zk_dev_ref/mvc/list_model), and ZK renders only the visible rows. The total UI code was 64 lines. Vaadin used `DataProvider.fromCallbacks()` with server-side pagination — 50 lines of Java.

Real-time server-push dashboard: ZK's [`EventQueue`](https://docs.zkoss.org/zk_dev_ref/server_push/event_queues) with `APPLICATION` scope means a single Spring `@Scheduled` bean publishes updates that are broadcast to all connected browser sessions simultaneously. Total push code: approximately 15 lines. Vaadin used `@Push` with `UI.access()` — approximately 30 lines, with more explicit threading management required.

The Level 3 findings add a new dimension to the "zero JavaScript" story. At Level 1 and Level 2, ZK and Vaadin both write zero JavaScript. At Level 3, both continue to write zero JavaScript — but the client-side frameworks require hundreds of lines of JavaScript infrastructure that the server-side frameworks never write at all.

### On enterprise requirements (Level 4):

Vaadin and ZK have the strongest built-in accessibility support. ZK provides the [`za11y.jar`](https://docs.zkoss.org/zk_dev_ref/accessibility/accessibility) module, which retrofits WAI-ARIA roles, keyboard navigation, screen reader live regions, and high-contrast support across all ZK components. Vaadin's accessibility is built into every component by default. Angular provides useful tooling (`@angular/cdk/a11y`) but requires more manual configuration. React has no built-in accessibility support. Thymeleaf and Wicket have none.

For security process and enterprise support, ZK and Vaadin are the only frameworks in this guide with commercial vendors, formal support contracts, and documented security processes. The others rely on community CVE reporting and internal practices at Meta (React) or Google (Angular).
