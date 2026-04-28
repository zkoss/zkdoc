---
title: "ZK vs Vaadin"
permalink: /eval-guide/zk-vaadin/
---

# Part 4-6: ZK vs Vaadin

This is the most nuanced comparison in the guide, because ZK and Vaadin are the most similar frameworks in the field. Both are server-driven Java frameworks with commercial backing, built-in accessibility, and strong enterprise support. Both write zero JavaScript for standard applications. The differences between them are real but require more precision to describe than the ZK-vs-React or ZK-vs-Angular comparisons.

## The architectural similarity and difference

Both frameworks keep application logic on the server and push rendered component state to the browser. The main architectural choice within each framework is how you define the UI.

Vaadin is Java-only by design. All UI is defined programmatically in Java — components are Java objects, layouts are composed in Java, and event handlers are Java lambdas. There is no template language. Vaadin also offers Hilla, its TypeScript frontend model for teams that want a more client-driven approach while maintaining Java on the backend.

ZK offers three approaches to UI composition. The most common is ZUL — an XML-based markup language paired with Java ViewModels using the MVVM pattern. ZK also supports pure Java composition (similar to Vaadin's model) and a full MVC pattern. Most ZK applications use ZUL + ViewModel.

## Level 1 comparison: Employee Manager

Both frameworks completed the Employee Manager with zero JavaScript. The differences were measurable but not large.

Vaadin required 1,064 lines of code — more than ZK's 937 — partly because Vaadin's Java-only UI composition tends to be more verbose than ZK's ZUL templates for layout-heavy views.

Vaadin had the fastest warm response times in Level 1 (5–8ms), slightly faster than ZK (11–13ms). However, Vaadin also had the largest initial JavaScript payload at approximately 2.8 MB (versus ZK's approximately 1.5 MB), which affects first-load performance more than subsequent navigation.

Vaadin's build time was the slowest of any Java framework at 6.6 seconds, driven by its build plugin downloading Node.js and running a frontend build step even for Java-only applications. ZK built in 2.6 seconds.

One practical friction point worth noting: Vaadin 24 requires the Jakarta namespace and Spring Boot 3.x, which meant it could not participate in the shared Level 1 backend module (which used Spring Boot 2.7.7 with the javax namespace). Vaadin required entity duplication. This is a framework version requirement, not a fundamental limitation, but it affects teams with existing Spring Boot 2.x infrastructure.

## Level 2 comparison: Advanced Components

ZK delivered all four complex views as native built-in components. No third-party libraries, no JavaScript.

Vaadin delivered all four views, but through two different mechanisms. The portal dashboard used Vaadin's own commercial Dashboard component. The other three views used free Vaadin Directory add-ons — FullCalendar for Flow, OrgChart Add-on by FlowingCode, and PivotTable for Vaadin — each exposing a Java API so no JavaScript is required from the developer.

The distinction that matters is not technical quality but structural maintenance cost. Vaadin's four views came from two different commercial tiers (Vaadin Pro for Dashboard, free Directory add-ons for the others) and three different vendors (Vaadin Ltd, FlowingCode, and Vaadin Component Factory). Each add-on has its own release schedule and compatibility window.

ZK's equivalent — `<portallayout>`, `<charts>`, `<calendars>`, `<organigram>`, `<pivottable>` — are all first-class built-in components, all from Potix, all versioned together, all covered by the same support contract.

## Level 3 comparison: Large Data & Real-Time

Level 3 is where the ZK and Vaadin comparison becomes most instructive — because both frameworks deliver these features natively, and the implementation details reveal meaningful differences in developer experience.

**Large dataset grid:** ZK uses Render-on-Demand (ROD). The full dataset — 10,000 Employee objects — is loaded into a `ListModel`, and ZK renders only the rows visible in the viewport. One XML attribute enables ROD. The total UI code was 64 lines. For extreme-scale datasets, ZK also provides `BigListBox + MatrixModel` (ZK EE), a mode where the Java heap footprint stays constant regardless of dataset size.

Vaadin uses `DataProvider.fromCallbacks()`. The developer implements two lambda callbacks (fetchItems and countItems), and Vaadin makes a database query per scroll page as the user scrolls. This keeps the Java heap footprint low regardless of dataset size. The trade-off is ZK's single upfront load versus Vaadin's per-page queries on scroll.

Both approaches write zero JavaScript.

**Real-time server push:** ZK uses an `APPLICATION`-scoped `EventQueue`. A single Spring `@Scheduled` bean publishes to the queue; ZK broadcasts to all connected browser sessions simultaneously. The developer subscribes to the queue in the ViewModel. Thread safety is handled automatically. Developer push code: approximately 15 lines.

Vaadin uses `@Push` (which must be placed on `AppShellConfigurator` — placing it on `AppLayout` causes a startup `RuntimeException`). UI updates must be wrapped in `ui.access()` to ensure thread safety. Developer push code: approximately 30 lines, with more explicit threading responsibility.

Both write zero JavaScript. The practical difference is developer surface area: ZK's `EventQueue` abstracts threading and broadcast routing; Vaadin's `@Push` gives more direct control but requires the developer to manage thread safety explicitly.

## Accessibility

Both frameworks have strong accessibility support. Vaadin's components are built-in as default. ZK provides the `za11y.jar` module, which retrofits WAI-ARIA roles, keyboard navigation, screen reader live regions, and high-contrast support across all ZK components by adding one JAR to the classpath.

Vaadin has a slight edge in accessibility maturity due to its formal third-party auditing process. Both are meaningfully ahead of Angular, React, Thymeleaf, and Wicket on this dimension.

## Commercial support and security

Both ZK and Vaadin offer commercial licensing and professional support contracts. Both take security seriously with formal processes. ZK's documented process includes Snyk, CodeQL, SonarQube in CI/CD, ISO 27001 certification, and OSCP-certified penetration testing. Both have direct financial incentive — commercial revenue — to maintain and support the frameworks over the long term.

## When Vaadin is the better choice

Vaadin suits your situation better if your team prefers a pure-Java approach without any template language, if Vaadin Copilot's AI-assisted development capability is valuable to your workflow, if Vaadin Hilla is a fit for teams that want TypeScript frontend development with a Java backend, or if the specific Vaadin Directory add-ons for your required components are mature enough for your needs.

## When ZK is the better choice

ZK suits your situation better when your application requires advanced enterprise components — such as calendars, org charts, pivot tables, and portal layouts — that you want all from a single vendor under a single support contract, when ZUL-based layout is preferred over pure-Java UI composition, when build speed matters (ZK at 2.6s versus Vaadin at 6.6s), or when compatibility with Spring Boot 2.x or the javax namespace is a current constraint.
