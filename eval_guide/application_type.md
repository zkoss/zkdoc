---
title: "Key Factor: Application Type"
permalink: /eval-guide/application-type/
---

# Part 1-3: Key Factor: Application Type

Not all web applications are the same — and frameworks that are excellent for one type can be awkward or over-engineered for another.

Before choosing a framework, be clear about what you are actually building. This sounds obvious, but in practice, teams often describe their application in generic terms ("a web app") and then discover mid-project that their specific requirements weren't well-served by the framework they chose.

## Internal tools versus customer-facing applications

This is the most fundamental split, and it drives more of the framework decision than most people expect.

Internal applications — admin panels, operations dashboards, data management tools, reporting interfaces — are used by a known, limited audience. Users are typically trained. Functionality matters more than style. Performance expectations are reasonable. These applications often need complex data grids, forms with business logic, and deep integration with backend systems. Accessibility compliance, if required, is driven by company policy rather than public regulation.

Java-based frameworks like ZK and Vaadin are particularly strong here. They were designed for exactly this use case, and they show it — rich data grid components, event-driven architecture, and tight Java integration out of the box.

Customer-facing applications are a different challenge. Your users are untrained, impatient, and comparing your interface to every other product they use. First impressions matter. Load time matters. Mobile experience matters. Brand and visual identity matter.

React and Angular have a stronger ecosystem for this context — more UI libraries with modern design, more tooling for performance optimization, and a larger pool of frontend developers who specialize in polished user interfaces.

## Traffic and scale

For most enterprise and internal applications, traffic is not the primary concern. Hundreds or a few thousand concurrent users is manageable by almost any framework with sensible infrastructure.

If you are building something that will serve tens of thousands of concurrent users, or faces unpredictable traffic spikes — a public-facing consumer product, a high-traffic reporting dashboard — then rendering architecture matters. Server-side rendering frameworks carry more server load per user session than client-rendered ones, because the server maintains more state. This is rarely a dealbreaker, but it should be on your radar.

Before ruling out a server-side framework on this basis, check whether it offers architectural options to address the problem. ZK, for example, provides stateless components and server-push optimizations designed specifically for higher-load scenarios. A framework that has thought seriously about scalability will have answers here — the question is whether those answers fit your infrastructure and your team's ability to apply them. If a server-side framework you are considering has no story for reducing session state at scale, that is worth treating as a real limitation. If it does, the gap with client-side architectures narrows considerably for most realistic traffic levels.

For truly extreme-scale scenarios — millions of concurrent users, global distribution, unpredictable viral traffic — client-side rendering with a stateless API backend remains the more naturally scalable architecture, and React or Angular will give you more control over that design.

## Cloud-native and containerized deployments

Containerized deployment — Docker, Kubernetes, or a cloud platform's managed runtime — is most relevant when your application needs to scale horizontally to handle a variable or large number of concurrent users, or when your organization has standardized on a container platform for all workloads. Public-facing applications with unpredictable traffic are the clearest case. Internal enterprise applications with a fixed, predictable user base are less likely to need aggressive horizontal scaling, though many organizations deploy them in containers anyway for operational consistency. If your deployment falls into either of these categories, the architectural model of your framework affects how straightforwardly it fits.

Client-centric frameworks are naturally cloud-native. A React or Angular application compiles to a set of static files served by a web server; the Spring Boot backend is a stateless REST API. Both components are independently containerizable, independently scalable, and trivially load-balanced behind a standard ingress. No session affinity is required; any container instance can serve any request.

Server-centric frameworks like ZK, Vaadin, and Wicket maintain server-side session state by default. Each user's UI state lives in a specific server session, which means requests from a given user must be routed to the same server instance — a requirement known as sticky sessions. Most load balancers and Kubernetes ingress controllers support sticky sessions (typically via a cookie), and the approach works reliably in practice. It does add a configuration step and a constraint that does not exist for stateless architectures.

However, this picture is evolving. ZK 10 introduced stateless components — a mode where components are rendered without maintaining server-side state between requests, trading some of ZK's real-time push capabilities for full horizontal scalability without sticky sessions. Vaadin introduced Hilla as a stateless alternative that compiles TypeScript views and communicates with a stateless Spring Boot backend, closer in deployment model to a hybrid SPA. Wicket allows developers to opt pages and components into a stateless mode, reducing session footprint for specific use cases.

For most enterprise deployments — internal applications with predictable concurrent user counts — sticky sessions are a non-issue. The operational overhead is minimal and the constraint is well understood by platform teams. Where it matters is in architectures with very high concurrent sessions, auto-scaling pod counts that change rapidly, or strict platform requirements against session affinity. If your deployment model falls into one of these categories, it should be an explicit input to your framework decision, not an afterthought.

## Data volume and real-time requirements

Two categories of requirement deserve explicit attention before finalizing a framework choice, because they produce large differences in implementation effort across frameworks.

The first is large dataset display. If your application needs to display, scroll, or filter thousands or more rows in a data grid — common in HR, operations, inventory, or monitoring applications — the framework's built-in support (or lack of it) has real consequences.

Server-centric frameworks like ZK and Vaadin handle this natively: ZK's render-on-demand (ROD) virtualization loads data into Java memory once and renders only the visible rows, enabled by a single configuration attribute. Vaadin's DataProvider pattern executes a server-side query per scroll page with two lambda callbacks. Both write zero JavaScript. React and Angular require integrating a virtualization library, implementing a paged data-fetching strategy, and managing client-side state for scroll position and caching — even after the library is chosen. Thymeleaf renders all rows in the DOM with no native alternative.

The second is real-time data updates. If your dashboard, monitoring view, or operational screen needs to reflect events as they happen — headcount changes, status updates, live feeds — how the framework handles server push matters significantly. ZK's EventQueue broadcasts server events to all connected sessions from a single publisher in ~15 lines of Java, with zero JavaScript and automatic thread safety. Vaadin's `@Push` mechanism achieves the same result in ~30 lines with manual thread-safety wrapping. React and Angular have no built-in push mechanism; a complete implementation usually requires setting up a WebSocket/SSE client, defining an event protocol, managing connection lifecycle (reconnect/cleanup), and integrating incoming data into the application's state management model — work that spans both the Java backend and the JavaScript frontend. Thymeleaf requires the same, with no framework support for either side.

If either of these requirements applies to your application, treat it as a filter before evaluating other factors. The implementation cost differences are larger than at any other level in our experiments.

## Customization: special components versus general ones

Some applications need highly specific UI components — a custom flight-seating chart, a specialized map interface, a domain-specific data visualization. Others can be built entirely from standard components: tables, forms, buttons, modals.

If your application requires significant custom component work, you generally have three paths: build it yourself, use a third-party library, or outsource it to a specialist.

React's component model is flexible and well-documented, which makes building your own components relatively straightforward — but building something polished and production-ready still requires solid JavaScript and frontend skills. More commonly, teams turn to React's large ecosystem of third-party component libraries rather than building from scratch. This works well when the right library exists and is well-maintained, but it introduces its own trade-offs: license considerations, version compatibility, and the risk that a library you depend on stops being maintained. The outsourcing path is also viable for React — there is a large global pool of React developers and agencies, so commissioning a custom component is generally straightforward, though you still end up owning and maintaining whatever is delivered.

While ZK allows for custom component development, it is a specialized skill involving both server-side Java and client-side rendering. The ZK team offers this as a service, which helps ensure components meet official standards without requiring in-house expertise. However, compared to frameworks like React or Angular, teams with strong JavaScript skills may find custom component development more approachable and self-service, reducing the need for external support.

Thymeleaf + Spring MVC largely defers custom UI to whatever JavaScript you bring in yourself — there is no component model to speak of, so custom interactive components require writing and maintaining standalone JavaScript, pulling in a separate frontend library, or outsourcing the frontend work entirely to a JavaScript specialist.

Whichever path you take — build, borrow, or have it built — you will own the result. Factor in not just the cost of acquiring the component, but the cost of maintaining it over time.

If your application is primarily standard components, this matters much less — and you should weight other factors more heavily.

## Look and feel: function versus visual polish

Think about how much the visual design matters for your specific application.

Some applications need to match a brand, look modern and polished, and feel like a consumer product. Others need to be functional, reliable, and clear — and nobody will complain that the buttons don't have enough personality.

React and Angular have rich ecosystems of design systems and UI libraries — Material UI, Ant Design, Tailwind-based component libraries — that make it easier to build something that looks current. The tradeoff is that these libraries add complexity, version dependency, and sometimes opinionated constraints of their own.

ZK and Vaadin have their own built-in component themes. They are clean and professional, but customizing them significantly to match an external brand identity takes more effort. If the application is purely internal and visual polish is not a priority, this is a non-issue. If you need a specific branded look, factor in that extra work.

## Your industry and the nature of your application

Industry context shapes requirements in ways that don't always appear on a feature checklist.

Regulated industries — banking, healthcare, government, insurance — often carry specific requirements around accessibility (WCAG compliance), security (audit trails, session management, data handling), and vendor support (commercial backing, SLAs, long-term maintenance commitments). Not all open-source frameworks can satisfy these requirements without significant additional work. This is an area where ZK and Vaadin have a deliberate advantage — they offer commercial licensing, professional support, and have been built with enterprise compliance in mind.

Less regulated, fast-moving environments — startups, internal tooling for tech companies, early-stage products — have much more flexibility. The constraint here is usually development speed and developer experience, not compliance. React's ecosystem shines in this context.

## A useful exercise

Before finalizing your framework decision, write down the five most technically demanding screens in your application. What do they need to do? How much data do they handle? How custom is the interaction?

Then ask: does the framework I'm considering have a clear, well-supported path to building each of these? Or would two or three of them require significant workarounds?

The answer will tell you more than any benchmark.
