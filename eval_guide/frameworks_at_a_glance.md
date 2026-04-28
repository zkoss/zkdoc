---
title: "The Frameworks at a Glance"
permalink: /eval-guide/frameworks-at-a-glance/
---

# Part 3-1: The Frameworks at a Glance

Part 2 covered each framework category in depth. Before mapping them to specific situations, it helps to see the whole picture at once — what each category is designed for, where it naturally excels, and where its limits show up.

This is not a ranking. Every category in this guide has been used successfully to build real enterprise applications. The goal here is to make the trade-offs visible so that the decision table that follows is easier to apply to your specific situation.

### Client-Side / SPA Frameworks (React, Angular, Vue.js)

**What they are:** The browser downloads a JavaScript application on first load and manages the entire UI from that point forward. The server becomes a data provider — it supplies JSON via API, but knows nothing about what the browser is showing.

In enterprise Java environments, React and Angular are almost always used in a hybrid architectural pattern: a Spring Boot backend exposes a REST API, and the React or Angular frontend consumes it as a separate application. This is the architecture used in our experiments. The two applications — frontend and backend — are developed, deployed, and scaled independently, with the API contract as the shared boundary. See [Part 2-4](/eval-guide/hybrid/) for a fuller discussion of this pattern.

**Where they excel:**

- Highly interactive interfaces with fast, smooth in-page transitions and no full-page reloads
- Public-facing or consumer-grade products where visual polish, animation, and brand alignment are priorities
- Applications that need a mobile and web client built from shared logic
- Teams with strong JavaScript or TypeScript expertise who want to stay in that ecosystem
- Organizations with a clear frontend/backend team split that want each side to work and deploy independently

**The honest costs:**

- Require a REST or GraphQL API layer between backend and frontend — extra surface area to design, version, and maintain
- The skill requirement goes beyond the framework: developers also need to understand API design, client-side state management, browser security (XSS, CSRF, token storage), and the ecosystem of supporting libraries
- A typical production application depends on a routing library, a component library, a state manager, a form library, and several utility packages — each from a different vendor, each with its own lifecycle. Keeping this stack compatible and current is an ongoing operational task
- Every feature that crosses the API boundary requires both frontend and backend to move in sync — coordination overhead that a single-codebase framework does not have
- React and Angular offer no commercial support contracts. Support comes from community and third-party consultancies

React is the most flexible and most widely used, with the largest talent pool. Its ecosystem provides good-to-excellent solutions for most common requirements. The flip side is that every React application looks different — routing, state management, and component choices are up to the team.

Angular is more opinionated and more structured. It makes more architectural decisions for you, which enforces consistency across large teams at the cost of a steeper initial learning curve. It is strongly represented in large enterprise environments.

### Server-Driven / Java-Centric Frameworks (ZK, Vaadin, Apache Wicket)

**What they are:** The server controls the UI. Application logic, state, and rendering decisions live on the server. The browser renders what the server sends and reports user events back to the server. The developer writes Java; the framework handles browser communication.

**Where they excel:**

- Teams that are primarily Java developers — the frontend is built in Java without requiring JavaScript expertise or a separate frontend specialist
- Data-heavy internal applications: complex data grids, live filtering, large-dataset virtualization, real-time server-push dashboards, enterprise forms — all without assembling JavaScript libraries or writing JavaScript infrastructure code
- Scenarios where tight backend integration is a priority — ViewModels call Spring services directly, with no API layer to design or version
- Organizations with enterprise compliance requirements: accessibility, security process, vendor SLAs, and procurement-friendly commercial relationships
- Applications with long maintenance horizons — Java's stable ecosystem means fewer forced upgrades and fewer abandoned dependencies

**The honest costs:**

- Initial page load carries more weight — ZK and Vaadin ship their framework JavaScript to the browser (~1.5 MB and ~2.8 MB respectively), though this is cached after the first visit
- Customizing the visual appearance beyond the framework's built-in themes takes more effort than with modern frontend tooling
- Smaller talent pools than React or Angular, though any capable Java developer can learn these frameworks
- Server session state per user means the server carries more memory load as concurrency grows, and containerized deployments require sticky session configuration to route each user back to the same instance. This is well-supported by standard load balancers and Kubernetes ingress controllers, but it is a configuration step that stateless architectures do not require. ZK 10 stateless components, Vaadin Hilla, and Wicket's stateless mode offer alternatives for teams where this constraint matters.

ZK provides the most comprehensive built-in component library — including enterprise-specific components like event calendar, org chart, pivot table, and portal layout — all native, all under one license, with no third-party library assembly required. Uses ZUL, an XML-based markup language, for layout alongside Java ViewModels. Commercial support through Potix Corporation.

Vaadin is Java-only with no template language — the entire UI is composed in Java code. Offers strong built-in accessibility and Vaadin Copilot for AI-assisted development. Dashboard and charts are native; other complex components require Directory add-ons from external vendors. Commercial support through Vaadin Ltd.

Apache Wicket co-locates Java component classes with HTML templates, which feels natural to developers who prefer seeing HTML structure separately from logic. No commercial offering. Smaller community. No built-in complex component library.

### Server-Side Templating (Thymeleaf + Spring MVC)

**What it is:** The most minimal model in this guide. The server renders complete HTML pages in response to each request. There is no persistent connection, no client-side framework layer, and no component model — just controller, template, and HTML output.

**Where it excels:**

- Content-heavy pages and form-based workflows where interactions are primarily navigation rather than live data manipulation
- Teams already deeply familiar with Spring Boot who want to stay as close to standard HTTP and HTML as possible
- Applications where build simplicity, lightweight deployment, and transparency in the stack are priorities
- Situations where Thymeleaf's limitations are not limitations — if you don't need a calendar, org chart, or real-time updates, the lack of a component library is irrelevant

**The honest costs:**

- No component model means every interactive behavior beyond a page reload requires adding JavaScript manually. Tables don't sort themselves. Filters require either a server round-trip or custom JavaScript
- All four complex enterprise views (calendar, org chart, pivot table, portal dashboard) require loading CDN JavaScript libraries and writing initialization code — Thymeleaf itself contributes nothing to these views
- No accessibility scaffolding. Every ARIA role, keyboard navigation pattern, and focus management behavior must be written manually
- No commercial support

### Quick-Reference Summary

| | Client-Side SPA (React, Angular) | Server-Side Java (ZK, Vaadin, Wicket) | Templating (Thymeleaf) |
|---|---|---|---|
| **Typical Java backend** | Spring Boot REST API (hybrid pattern) | Direct service calls | Direct service calls |
| **Language** | Java + JavaScript / TypeScript | Java | Java + HTML |
| **JS written by developer** | All of it | Zero (standard apps) | Zero by default |
| **Rich component library** | Via ecosystem (npm) | Built-in (ZK/Vaadin) or none (Wicket) | None — CDN only |
| **Visual customization** | Excellent | Moderate | Excellent |
| **Commercial support** | No | Yes (ZK, Vaadin) | No |
| **Cloud-native / Containerized** | Native fit — stateless, no sticky sessions needed | Requires sticky sessions by default; ZK 10 stateless mode, Vaadin Hilla, Wicket stateless opt-in available | Native fit — stateless by design |
| **WCAG built-in** | Partial (library-dependent) | Strong (ZK, Vaadin) | None |
| **Best for** | Polished UIs, split teams, public-facing products | Complex enterprise apps, Java teams | Simple content and form workflows |
