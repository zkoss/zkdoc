---
title: "Decision Guide: Matching Your Situation to a Framework Category"
permalink: /eval-guide/decision-guide/
---

# Part 3-2: The Decision Guide

No framework wins on every dimension. The right choice depends on what matters most for your specific team, application, and constraints. This chapter maps common situations to the framework category most likely to fit — with honest notes on where each recommendation has limits.

The table below works best if you've worked through the factors in [Part 1](/eval-guide/how-to-choose/). If you're coming directly to this chapter, the short version: your team's existing skills and your application's component requirements are usually the two most decisive factors, and everything else follows from there.

A note on React and Angular: in enterprise Java environments, both are almost always used in a hybrid pattern alongside a Spring Boot backend, with the two sides communicating over a REST API. That's how they appear in this guide's experiments. When the table below recommends "Client-Side SPA (React or Angular)," that architectural pattern is implied.

### By Team Profile

| Your team looks like this | Category most likely to fit | Notes |
|---|---|---|
| Primarily Java / backend developers, limited JS experience | Server-Side Java (ZK or Vaadin) | Developers stay in Java. No context-switching to the JS ecosystem, npm, or frontend build tooling. |
| Strong dedicated frontend team (React or Angular experience) | Client-Side SPA (React or Angular + Spring Boot) | Existing skills transfer directly. Full ecosystem available. |
| Full-stack developers comfortable in both Java and JS | Any — decide on application type | Skills are not the constraint; optimize on application requirements instead. |
| Separate frontend and backend teams | Client-Side SPA (React or Angular + Spring Boot) | Each team works in its own stack against an agreed API contract. Do factor in the communication cost. |
| Small team, one developer owns everything end to end | Server-Side Java or Thymeleaf | Fewer technologies to context-switch across. No API boundary to coordinate across. |
| Java team that needs to move fast without deep framework learning | Thymeleaf + Spring MVC | Lowest learning curve for a Spring developer. Limits appear when interactivity grows. |

### By Application Type

| Your application looks like this | Category most likely to fit | Notes |
|---|---|---|
| Internal enterprise tool — data grids, forms, dashboards, workflows | Server-Side Java (ZK or Vaadin) | These frameworks were designed for exactly this. Complex components work out of the box. |
| Requires complex components such as event calendar, org chart, pivot table, or portal dashboard | Server-Side Java (ZK) or Client-Side SPA (React) | ZK provides all four natively. React provides all four via ecosystem wrappers. Angular lacks a free pivot table solution. |
| Public-facing product with strong brand, modern UI, or mobile parity | Client-Side SPA (React or Angular) | Better visual ecosystem, easier to match consumer design standards. |
| Content-heavy site, simple views with form-based navigation, limited interactivity | Thymeleaf + Spring MVC | Simple model, lightweight deployment, easy to understand. |
| Real-time data updates, live dashboards, server-push | Server-Side Java (ZK or Vaadin) | Server-push is a native capability. Client-side frameworks require WebSocket wiring on both ends. |
| Large dataset exploration — sortable, filterable, paged grids | Server-Side Java (ZK or Vaadin) | Native grid components handle this without assembling libraries. |
| Highly custom visual interactions or animations | Client-Side SPA (React or Angular) | React and Angular give more control over rendering and animation. |

### By Architecture & Complexity

| Your architecture looks like this | Category most likely to fit | Notes |
|---|---|---|
| Want to keep everything in one codebase, one language | Server-Side Java (ZK or Vaadin) | No REST API layer. ViewModels call services directly. One build, one deployment. |
| Already have a Spring Boot backend; adding a UI layer | Client-Side SPA or Thymeleaf | A React or Angular frontend leaves the existing backend intact. Thymeleaf is the lower-friction addition if interactivity requirements are modest. |
| Need to scale frontend and backend independently | Client-Side SPA (React or Angular + Spring Boot) | Separate deployments enable separate scaling naturally. |
| Cloud-native / Kubernetes deployment, no sticky sessions permitted | Client-Side SPA or Thymeleaf, or Server-Side Java with stateless mode | React/Angular backends are stateless by default. Thymeleaf is stateless. For server-side Java with this constraint, use: ZK 10 stateless components, Vaadin Hilla, or Wicket stateless mode. Standard sticky session configuration is also a valid and common approach if the constraint is not absolute. |
| Building something that will grow significantly in complexity | Server-Side Java (ZK or Vaadin) or Angular | More opinionated frameworks enforce structure that pays off as codebases grow. |

### By Development Speed

| Your priority looks like this | Category most likely to fit | Notes |
|---|---|---|
| Ship something working quickly with your current team | Whatever your team already knows | Familiarity beats any other factor for initial velocity. |
| Need rich enterprise components working quickly without integration work | Server-Side Java (ZK) | Native components for grids, calendars, charts, org charts, pivot tables. No library selection required. |
| Need a simple CRUD interface fast without a learning curve | Thymeleaf + Spring MVC | If the team knows Spring Boot, Thymeleaf is a one-afternoon addition. |
| Performance in the browser matters (fast interactions, no round-trips) | Client-Side SPA | Interactions happen in the browser without server latency. First-load payload is the tradeoff. |

### By Enterprise Requirements

| Your requirement looks like this | Category most likely to fit | Notes |
|---|---|---|
| WCAG compliance required | Server-Side Java (ZK or Vaadin) | ZK via za11y.jar; Vaadin built-in. Angular provides useful tooling (@angular/cdk/a11y) but requires more manual work. Thymeleaf and Wicket provide nothing. |
| Commercial support contract / vendor SLA required | ZK or Vaadin | The only two frameworks in this guide with commercial vendors and support tiers. |
| Library auditing / software bill of materials (SBOM) required | Server-Side Java | Java's dependency model (Maven/Gradle) is more auditable. React/Angular applications can have hundreds of transitive npm dependencies. |
| Procurement requires an approved vendor list | ZK or Vaadin | Commercial vendors with defined products and support contracts. Open-source frameworks typically cannot satisfy this requirement. |
| Long-term maintenance stability (5–10 year horizon) | Server-Side Java (ZK or Vaadin) | Commercial backing, stable Java ecosystem, smaller third-party dependency footprint. React/Angular have large ecosystems but more ecosystem churn risk over long timelines. |

### By Priority Trade-off

| If your top priority is… | Lean toward | Accepting the trade-off that… |
|---|---|---|
| Visual polish and customization | Client-Side SPA (React or Angular) | More JS complexity, larger dependency surface, REST API layer required |
| Developer productivity for a Java team | Server-Side Java (ZK or Vaadin) | Larger initial page payload, smaller talent pool, less visual flexibility |
| Minimum viable stack, lowest footprint | Thymeleaf + Spring MVC | Limited interactivity, no built-in components, manual JS for anything dynamic |
| Enforced consistency across a large team | Angular | Steepest learning curve, most verbose architecture, no free pivot table solution |
| Complex enterprise components, natively | ZK | Commercial licensing for the full component set (EE edition) |
| Long-term stability, minimum dependency churn | Server-Side Java | Less visual ecosystem diversity than React/Angular |
| Maximum flexibility to build anything | React | Most assembly required — routing, state, components, forms all chosen separately |
| Large dataset and/or real-time updates | Server-Side Java | Client-side requires integration and assembly |

### How to Use This Table

A few things to keep in mind when applying these recommendations:

Most situations point to two or three categories, not one. The table above narrows the field. The individual framework comparisons in Part 4 — and particularly the head-to-head comparisons from Part 4-2 to Part 4-6 — will help you decide between the candidates that survive the first filter.

The categories in this table don't map one-to-one to specific frameworks. "Server-Side Java" covers ZK, Vaadin, and Wicket, which differ meaningfully in component richness and commercial backing. If enterprise components or commercial support matter to you, ZK and Vaadin are the relevant candidates; Wicket is not. Part 4 covers these distinctions in detail.

Your situation may legitimately point in different directions depending on the factor. A team with strong React skills building an internal data-heavy tool is in genuine tension between team familiarity (pointing toward React) and application type (pointing toward server-side Java). The right answer depends on which factor you weight more heavily — which is why [Part 1](/eval-guide/how-to-choose/) asks you to rank your priorities explicitly before comparing frameworks.
