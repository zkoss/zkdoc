---
title: "Server-Side / Java-Centric Frameworks"
permalink: /eval-guide/server-side/
---

# Part 2-2: Server-Side / Java-Centric Frameworks

Java-centric frameworks take a fundamentally different approach to web UI development. Rather than sending a JavaScript application to the browser and letting the client manage the UI, these frameworks keep the application logic on the server. The browser renders what the server tells it to render, and user interactions are handled by server-side code.

This is not an outdated model. For enterprise applications — internal tools, data-heavy systems, complex workflows — keeping logic on the server has real advantages: tighter security, simpler state management, and the ability for Java developers to build full-featured UI without mastering a separate frontend ecosystem.

The three frameworks in this category are Apache Wicket, ZK Framework, and Vaadin.

## Apache Wicket

Apache Wicket is one of the oldest actively maintained Java web frameworks, and it shows in the best way — it is stable, well-tested, and has survived long enough to shed everything unnecessary. It uses a pure component-based model where Java objects map directly to HTML elements. Developers write Java classes that represent UI components, and Wicket handles the relationship between those components and the HTML. There is no separate templating language to learn.

Wicket's philosophy is that Java developers should be able to build web UIs using the same object-oriented patterns they use everywhere else. This makes it appealing to teams that are deeply Java-oriented and want to minimize the cognitive distance between backend and frontend code. It does not offer commercial support, but has been maintained reliably under the Apache Software Foundation for two decades.

## ZK Framework

ZK is one of the most feature-rich Java UI frameworks available, with a comprehensive built-in component library that covers most enterprise application requirements out of the box — grids, trees, charts, calendars, form components, and more — without assembling third-party libraries.

ZK uses an event-driven model. Developers define UI components in either Java or ZUL (ZK's XML-based markup language), wire up event listeners, and let the framework handle browser communication. The developer never needs to write JavaScript unless extending the framework for specialized needs.

ZK's particular strength is data-heavy enterprise applications. Its grid and list components support render-on-demand (ROD) virtualization — enabling smooth 10,000-row scrolling with a single XML configuration attribute, with only the visible rows rendered in the DOM and the full dataset held in Java memory. For even larger datasets, ZK's BigListBox + MatrixModel mode keeps both DOM node count and Java heap usage constant regardless of total dataset size. Real-time server push is handled through an APPLICATION-scoped EventQueue — a single scheduler publishes to all connected sessions simultaneously, with zero JavaScript and automatic thread safety for the subscriber. ZK maintains a formal security process, supports WCAG via the za11y.jar module, and provides AI-assisted tools including an MCP documentation server. Commercial licensing and professional support tiers are available.

## Vaadin

Vaadin allows Java developers to build web UIs entirely in Java without writing JavaScript. Its component model is Java-first: developers create UI components as Java objects, set their properties, add event listeners, and the framework handles what the browser renders.

Vaadin also places strong emphasis on WCAG accessibility compliance and offers Vaadin Copilot, an AI assistant built specifically for Vaadin development. Like ZK, it offers commercial licensing and enterprise support contracts from a company whose primary product is the framework itself. For large dataset handling, Vaadin's DataProvider pattern executes a server-side query per scroll page with two developer-implemented lambda callbacks, keeping Java heap usage low at the cost of a server round-trip per scroll interaction.

## Shared characteristics

**Strong Java focus** — All three frameworks allow a Java developer to build a complete web application without leaving the Java ecosystem. This eliminates the frontend/backend split for teams where Java is the primary skill.

**Event-driven or component-based model** — Rather than thinking in terms of HTTP requests and responses, developers think in terms of UI components and the events those components fire. This model maps naturally to how Java developers already think about object-oriented design.

**Faster development for internal applications** — For data management tools, admin panels, operational dashboards, and enterprise workflows, these frameworks reduce the amount of glue code required to connect backend logic to a working UI. A single developer can often own an entire feature end to end.

**Less frontend specialization required, but customization takes more effort** — Teams do not need dedicated frontend developers. Java generalists can be productive in these frameworks without deep knowledge of JavaScript, CSS frameworks, or browser rendering behavior.

The trade-off is that deep UI customization — custom themes, branded visual identity, or components that go beyond what the built-in library provides — requires more deliberate effort than in client-side frameworks where a rich ecosystem of design systems and UI libraries is readily available. For applications where function matters more than form, this is rarely a concern. For applications with strong visual or branding requirements, it is worth factoring in upfront.

**Stateful by default — containerization requires sticky sessions, with evolving alternatives** — Because these frameworks maintain server-side session state, a user's requests must be routed to the same server instance across the session. In containerized deployments, this requires configuring sticky sessions at the load balancer or ingress controller — a standard feature that adds a configuration step not present in stateless architectures. For most enterprise applications with predictable concurrent user counts, this is straightforward in practice. For architectures with aggressive horizontal auto-scaling or explicit requirements against session affinity, it is a constraint worth evaluating. ZK 10's stateless component mode, Vaadin's Hilla, and Wicket's per-page stateless opt-in offer paths toward more cloud-native deployments for teams where this matters.

**Commercially backed (ZK and Vaadin)** — Both ZK and Vaadin are developed by companies whose primary business is the framework itself, which aligns their commercial interests with keeping the product well-maintained and enterprise-ready. This makes commercial support contracts, vendor relationships, and long-term maintenance commitments available in a way that purely community-driven frameworks cannot offer. Wicket is the exception — it is community-maintained under the Apache Software Foundation without a commercial offering.
