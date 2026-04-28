---
title: "ZK vs Apache Wicket"
permalink: /eval-guide/zk-wicket/
---

# Part 4-4: ZK vs Apache Wicket

ZK and Wicket share the same foundational philosophy — both are server-driven Java frameworks that keep application logic on the server and write zero JavaScript for standard application features. But they diverge significantly in component richness, commercial backing, and what happens when application requirements grow beyond the basics.

## The architectural similarity

Both frameworks use a server-side component model where Java objects represent UI elements. Both maintain session state on the server. Both communicate with the browser through their own AJAX protocol without requiring the developer to write JavaScript.

The key structural difference is how components are defined. Wicket co-locates Java page classes with HTML template files — the developer writes an `EmployeePage.java` alongside an `EmployeePage.html`, and Wicket binds them together using `wicket:id` attributes. ZK uses ZUL files — XML-based templates that are closer to the component model itself, paired with Java ViewModels.

## Level 1 comparison: Employee Manager

Both frameworks completed the Employee Manager successfully with zero JavaScript. Wicket produced 1,006 lines of code across Java and HTML files — slightly more than ZK's 937, but in the same range.

The more meaningful difference was in response time. Wicket averaged 14–24ms for warm requests, compared to ZK's 11–13ms. Both are fast in absolute terms, but the gap is consistent.

Wicket's build time was fast at 2.4 seconds, comparable to Thymeleaf and slightly faster than ZK's 2.6 seconds.

## Level 2 comparison: Advanced Components

This is where the frameworks diverge most clearly. Wicket has no built-in complex component library. To implement the four enterprise views — event calendar, org chart, pivot table, and portal dashboard — Wicket loads CDN JavaScript libraries (FullCalendar, OrgChart.js, PivotTable.js, Gridstack.js) and initializes them via Wicket's `renderHead` pattern, embedding JavaScript strings inside Java code.

The result worked, but required approximately 100 lines of JavaScript embedded in Java strings — code without IDE support, without type checking, and without the data binding that ZK's native components provide. The calendar, org chart, pivot table, and dashboard all function, but the developer is writing JavaScript library integration code, not Java component code.

ZK delivered all four views as native framework components, fully data-bound to Java ViewModels, with zero JavaScript.

## Level 3 comparison: Large Data & Real-Time

Wicket's Level 3 story is different from the client-side frameworks. It writes zero JavaScript — but it also has more limited built-in capabilities for the two features tested.

For large datasets, Wicket's `ISortableDataProvider` supports server-side pagination: the developer implements a query interface that Wicket calls as the user pages through data. This is a functional approach, but it is page-based rather than virtual-scroll-based — the user clicks through pages rather than scrolling through a continuous view.

For real-time updates, Wicket provides `AbstractAjaxTimerBehavior` — a client-initiated polling mechanism that refreshes a component at a configurable interval. This is polling, not push: the client asks for updates on a schedule, rather than the server pushing changes when they occur. For low-frequency updates (every 30 seconds), this is adequate. For live dashboards requiring immediate update delivery, polling's latency is a limitation.

ZK uses an `APPLICATION`-scoped `EventQueue` that broadcasts to all connected sessions simultaneously from a single `@Scheduled` bean. Updates are delivered via WebSocket the moment they are published.

For applications where pagination and polling are sufficient, Wicket handles these cases natively. For applications that require virtual scrolling over large datasets or true real-time push, the difference in built-in capability is meaningful.

## Commercial support and documentation

This is a meaningful practical difference. Wicket is maintained by the Apache Software Foundation with no commercial offering, no dedicated support tier, and no vendor SLA. Documentation is community-maintained. Support comes from Stack Overflow and the mailing list.

ZK offers commercial support through Potix, professional documentation, and a dedicated support channel for enterprise customers. A procurement process that requires a vendor relationship, a support contract, or a software bill of materials with accountable maintainers will find ZK a more straightforward fit than Wicket.

## When Wicket is the better choice

Wicket suits your situation better if your team values its specific co-location pattern for HTML and Java, if the application's complexity stays within what Wicket's built-in components handle well (standard data tables with pagination, form-heavy workflows), and if commercial support is not a requirement.

## When ZK is the better choice

ZK suits your situation better when complex enterprise components need to work natively without CDN assembly, when response time consistency matters, when real-time push or large-dataset virtual scrolling are requirements, or when the application will be maintained under an enterprise support contract. For most enterprise scenarios where both frameworks are candidates, ZK's richer component library and commercial backing are decisive advantages.
