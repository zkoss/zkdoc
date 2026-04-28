---
title: "ZK vs Thymeleaf + Spring MVC"
permalink: /eval-guide/zk-thymeleaf/
---

# Part 4-5: ZK vs Thymeleaf + Spring MVC

Thymeleaf and ZK sit at opposite ends of the server-side spectrum. Thymeleaf is the most minimal approach in this guide — a template engine with no component model and no AJAX protocol. ZK is a full server-driven component framework. The comparison between them is less a head-to-head and more a question of which trade-offs fit your requirements.

## The architectural difference

Thymeleaf + Spring MVC is a stateless request-response model. Each page request results in a controller method being called, a model being populated, and a complete HTML page being rendered and returned. There is no persistent connection, no client-side framework, and no component model. Each response is a complete, independent HTML document.

ZK maintains server-side component state and communicates with the browser through its own AJAX protocol. User interactions trigger server-side events; the server updates the component tree and pushes the changes to the browser. The page does not reload — only the changed parts of the UI are updated.

## Level 1 comparison: Employee Manager

Thymeleaf was the standout performer on the basic metrics. It had the fastest build time (2.2 seconds), the smallest deployable artifact (40 MB JAR, no framework JavaScript), and the fastest warm response times (7–9ms). For a content-display and form-submission application, Thymeleaf's stateless model is efficient and lightweight.

Thymeleaf required 1,038 lines of code compared to ZK's 937, with the additional lines split between HTML templates and Java controllers. Both are reasonable for the feature set.

Where ZK showed an advantage was in component capability. ZK's grid components handle sorting, filtering, and pagination as built-in behaviors. In Thymeleaf, these require either a server round-trip per interaction (which works, but is slower) or custom JavaScript (which adds complexity and moves the developer outside the Thymeleaf model).

## Level 2 comparison: Advanced Components

Thymeleaf delivered all four complex views by loading CDN JavaScript libraries: FullCalendar, OrgChart.js, PivotTable.js, and Gridstack.js + Chart.js. The templates initialize each library via inline `<script>` blocks.

The result was functional — all four views worked — but the architecture was essentially a thin HTML wrapper around five independent JavaScript libraries. Thymeleaf itself contributed nothing to the calendar, the org chart, the pivot table, or the dashboard. The developer was writing JavaScript library integration code, not Thymeleaf template code.

ZK delivered the same four views as native components with zero JavaScript and zero third-party dependencies.

The Thymeleaf approach produces fewer total lines of code (274 vs ZK's 430 for Level 2) because HTML templates are terse and the CDN initialization scripts are short. But the apparent conciseness reflects that Thymeleaf is not doing the work — the CDN libraries are.

There is also a deeper integration gap. Each CDN library operates independently with its own visual design language — getting a calendar, an org chart, a pivot table, and a dashboard to look cohesive requires custom CSS work that ZK's unified theme system handles automatically.

## When Thymeleaf is the better choice

Thymeleaf suits your situation better if the application is primarily content display and form-based navigation with limited interactivity, if the team already knows Spring Boot and wants to minimize new technology, if build simplicity and lightweight deployment are priorities, and if the requirements do not include the kinds of components where Thymeleaf's limitations would show up — complex grids, real-time updates, or deep data interaction.

## When ZK is the better choice

ZK suits your situation better when the application requires complex interactive components — data grids with rich filtering and sorting, event calendars, org charts, pivot tables, or real-time dashboards — that need to be built without assembling CDN libraries, when data binding between the UI and the backend needs to be automatic rather than manually managed, or when the application will grow in complexity over time and the CDN-assembly approach will accumulate maintenance debt.
