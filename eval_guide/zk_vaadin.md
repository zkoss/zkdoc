---
title: "ZK vs Vaadin"
description: "ZK vs Vaadin compared: two Java-centric UI frameworks evaluated head-to-head on real applications."
permalink: /eval-guide/zk-vaadin
---

# Part 4-6: ZK vs Vaadin

This is the most nuanced comparison in the guide, because ZK and Vaadin are the most similar frameworks in the field. Both are server-driven Java frameworks with commercial backing, built-in accessibility, and strong enterprise support. Both write zero JavaScript for standard applications. The differences between them are real but require more precision to describe than the ZK-vs-React or ZK-vs-Angular comparisons.

## The architectural similarity and difference

Both frameworks keep application logic on the server and push rendered component state to the browser. The main architectural choice within each framework is how you define the UI.

Vaadin is Java-only by design. All UI is defined programmatically in Java — components are Java objects, layouts are composed in Java, and event handlers are Java lambdas. There is no template language. Vaadin also offers Hilla, its TypeScript frontend model for teams that want a more client-driven approach while maintaining Java on the backend.

ZK offers three approaches to UI composition. The most common is [ZUL](https://docs.zkoss.org/zk_dev_ref/ui_composing/zuml) — an XML-based markup language paired with Java [ViewModels](https://docs.zkoss.org/zk_mvvm_ref/viewmodel/viewmodel) using the MVVM pattern. ZK also supports [pure Java composition](https://docs.zkoss.org/get_started/building_ui_in_java) (similar to Vaadin's model) and a full MVC pattern. Most ZK applications use ZUL + ViewModel.

## Level 1 comparison: Employee Manager

Both frameworks completed the Employee Manager with zero JavaScript, on the same Spring Boot 3.3.4 backend module. The differences are measurable, and they do not all point the same way.

**Vaadin writes less code, by a modest margin.** It needed 652 lines against ZK's 779 — ZK is 19.5% larger, 127 lines on an application of this size. Most of the gap is structural: Vaadin composes its UI in Java with no template language, so where ZK writes a ViewModel and a ZUL template per view, Vaadin writes a single Java class. ZK's figure carries a qualification of its own: it pages the employee list in memory, where the other frameworks in this guide page on the server, so its ViewModel holds no page state and needs no sort callback. Neither total includes stylesheets — ZK hand-writes 315 lines of CSS for a custom design and Vaadin writes none, inheriting Lumo, and that work is excluded from both figures. Code volume is not what separates these two frameworks; the measures that follow are.

**ZK puts rows on screen more than twice as fast.** Measured in a real browser to an identical milestone — 15 employee rows painted — ZK reaches rows in about 93 ms on a warm click against Vaadin's 201 ms. On a cold visit with an empty cache the gap is wider still, 99.9 ms against 663.8 ms, though ZK's cold-visit page is a bare fragment without the application shell and so is not a like-for-like load; ZK's full shell took 153.9 ms separately. These figures are n=3 and preliminary. Vaadin is the slowest of the six frameworks in this guide on both scenarios, and ZK is second-slowest — this comparison favors ZK, but neither framework is fast against Thymeleaf's 22.7 ms.

Vaadin also ships the larger framework payload: approximately 2.8 MB of first-load JavaScript against ZK's 1.3 MB, and an 88.5 MB artifact against ZK's 62.4 MB. Both are cached after the first visit.

**ZK builds 3.4× faster** — 1.71 seconds against Vaadin's 5.80, the slowest Maven build of the six. Vaadin's plugin drives a frontend toolchain inside the Maven run even for a Java-only application.

Worth stating plainly, because it affects licensing cost as much as performance: the ZK figures here are **ZK CE**, the free edition. This application uses no EE component. Building the same application against `zkmax` would raise the artifact to 68.7 MB and first-load JavaScript to 1,520 KB.

## Level 2 comparison: Advanced Components

ZK delivered all four complex views as native built-in components. No third-party libraries, no JavaScript.

Vaadin delivered all four views, but through two different mechanisms. The portal dashboard used Vaadin's own commercial Dashboard component. The other three views used free Vaadin Directory add-ons — FullCalendar for Flow, OrgChart Add-on by FlowingCode, and PivotTable for Vaadin — each exposing a Java API so no JavaScript is required from the developer.

The distinction that matters is not technical quality but structural maintenance cost. Vaadin's four views came from two different commercial tiers (Vaadin Pro for Dashboard, free Directory add-ons for the others) and three different vendors (Vaadin Ltd, FlowingCode, and Vaadin Component Factory). Each add-on has its own release schedule and compatibility window.

ZK's equivalent — `<portallayout>`, `<charts>`, `<calendars>`, `<organigram>`, `<pivottable>` — are all first-class built-in components, all from Potix, all versioned together, all covered by the same support contract.

## Level 3 comparison: Large Data & Real-Time

Level 3 is where the ZK and Vaadin comparison becomes most instructive — because both frameworks deliver these features natively, and the implementation details reveal meaningful differences in developer experience.

**Large dataset grid:** ZK uses [Render-on-Demand (ROD)](https://docs.zkoss.org/zk_dev_ref/performance_tips/turn_on_render_on_demand). The full dataset — 10,000 Employee objects — is loaded into a [`ListModel`](https://docs.zkoss.org/zk_dev_ref/mvc/list_model), and ZK renders only the rows visible in the viewport. One XML attribute enables ROD. The total UI code was 64 lines. For extreme-scale datasets, ZK also provides `BigListBox + MatrixModel` (ZK EE), a mode where the Java heap footprint stays constant regardless of dataset size.

Vaadin uses `DataProvider.fromCallbacks()`. The developer implements two lambda callbacks (fetchItems and countItems), and Vaadin makes a database query per scroll page as the user scrolls. This keeps the Java heap footprint low regardless of dataset size. The trade-off is ZK's single upfront load versus Vaadin's per-page queries on scroll.

Both approaches write zero JavaScript.

**Real-time server push:** ZK uses an `APPLICATION`-scoped [`EventQueue`](https://docs.zkoss.org/zk_dev_ref/server_push/event_queues). A single Spring `@Scheduled` bean publishes to the queue; ZK broadcasts to all connected browser sessions simultaneously. The developer subscribes to the queue in the ViewModel. Thread safety is handled automatically. Developer push code: approximately 15 lines.

Vaadin uses `@Push` (which must be placed on `AppShellConfigurator` — placing it on `AppLayout` causes a startup `RuntimeException`). UI updates must be wrapped in `ui.access()` to ensure thread safety. Developer push code: approximately 30 lines, with more explicit threading responsibility.

Both write zero JavaScript. The practical difference is developer surface area: ZK's `EventQueue` abstracts threading and broadcast routing; Vaadin's `@Push` gives more direct control but requires the developer to manage thread safety explicitly.

## Accessibility

Both frameworks have strong accessibility support. Vaadin's components are built-in as default. ZK provides the [`za11y.jar`](https://docs.zkoss.org/zk_dev_ref/accessibility/accessibility) module, which retrofits WAI-ARIA roles, keyboard navigation, screen reader live regions, and high-contrast support across all ZK components by adding one JAR to the classpath.

Vaadin has a slight edge in accessibility maturity due to its formal third-party auditing process. Both are meaningfully ahead of Angular, React, Thymeleaf, and Wicket on this dimension.

## Commercial support and security

Both ZK and Vaadin offer commercial licensing and professional support contracts. Both take security seriously with formal processes. ZK's documented process includes Snyk, CodeQL, SonarQube in CI/CD, ISO 27001 certification, and OSCP-certified penetration testing. Both have direct financial incentive — commercial revenue — to maintain and support the frameworks over the long term.

## When Vaadin is the better choice

Vaadin suits your situation better if your team has existing Vaadin experience and a stable, well-functioning codebase, if Vaadin Copilot's AI-assisted development capability is valuable to your workflow, if Vaadin Hilla is a fit for teams that want TypeScript frontend development with a Java backend, or if the specific Vaadin Directory add-ons for your required components are mature enough for your needs.

## When ZK is the better choice

ZK suits your situation better when your application requires advanced enterprise components — such as calendars, org charts, pivot tables, and portal layouts — that you want all from a single vendor under a single support contract, when ZK's AI tooling — an [MCP documentation server](https://docs.zkoss.org/zk_dev_ref/zk_doc_mcp_server) for grounded answers and a [ZUL writer agent](https://docs.zkoss.org/zk_dev_ref/agent_skills) for code generation — fits your development workflow, when build speed matters (ZK at 1.71s versus Vaadin at 5.80s), when first-visit render latency matters (ZK reaches rows on screen more than twice as fast), or when a javax-namespace build is a current constraint — ZK ships one, and Vaadin 24 requires Jakarta and Spring Boot 3.x.
