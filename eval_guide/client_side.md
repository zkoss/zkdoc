---
title: "Client-Side / SPA Frameworks"
permalink: /eval-guide/client-side/
---

# Part 2-1: Client-Side / SPA Frameworks

Client-side frameworks — also called Single Page Application (SPA) frameworks — represent the dominant model for modern web development. In this architecture, the browser downloads a JavaScript application on first load, and from that point forward, the UI is rendered and managed entirely in the browser. The server's role is reduced to providing data via an API, rather than generating HTML pages.

This model emerged as web applications became more interactive and user experience expectations rose. The result is a rich, responsive UI that feels closer to a desktop application than a traditional web page — but it comes with its own complexity and skill requirements.

The three frameworks in this category are React, Angular, and Vue.js.

## React

React is the most widely used frontend framework in the world by most measures — job postings, npm downloads, and developer surveys consistently place it at the top.

React is not a full framework in the traditional sense. It is a UI library focused on component rendering. Everything else — routing, state management, data fetching, form handling — is left to the developer to assemble from the broader ecosystem. This flexibility is both React's greatest strength and its most significant source of complexity. A React application can look very different from team to team depending on the choices made around these surrounding tools.

React's ecosystem is vast. There are mature libraries for almost every common requirement, an enormous community, and a large global talent pool.

## Angular

Angular differs from React in one fundamental way: it is a complete, opinionated framework rather than a focused library. Angular includes built-in solutions for routing, state management, form handling, HTTP communication, and testing. A developer starting an Angular project does not need to make the ecosystem assembly decisions they would in React — the framework has already made them.

Angular uses TypeScript as its primary language, which is JavaScript with static typing. This pays off in large teams and large codebases — the compiler catches a significant class of errors before they reach runtime, and the code is easier to navigate with IDE tooling. The tradeoff is a steeper learning curve. Angular introduces its own concepts — modules, decorators, dependency injection, observables — that take time to absorb before a developer becomes productive. In return, Angular-based codebases tend to be more consistent across teams, because the framework makes more of the architectural decisions for you.

Angular is strongly represented in enterprise environments, particularly in large organizations that value the structure and consistency it enforces.

## Vue.js

Vue occupies a middle ground between React and Angular — more structured than React but less opinionated than Angular, and generally considered to have the gentlest learning curve of the three. Its template-based approach feels familiar to developers coming from an HTML background, making it accessible beyond dedicated frontend specialists. Vue has a strong following among smaller teams and independent developers, and its ecosystem, while smaller than React's, is well-maintained.

## Shared characteristics

**Rich, highly interactive UI** — Because rendering happens in the browser, interactions are fast and smooth. There is no full-page reload between actions. Complex, dynamic interfaces — drag-and-drop, real-time updates, animated transitions — are natural fits for this architecture.

**Strong JavaScript, TypeScript, and broader frontend skills required** — Developers working with these frameworks need solid JavaScript skills at minimum, and TypeScript is increasingly the standard. But the skill requirement goes beyond the language itself. Developers also need to understand client-server communication — how to design and consume APIs, handle asynchronous data fetching, and manage loading and error states in the UI. Frontend security is its own discipline: XSS prevention, CSRF handling, secure token storage in the browser, and ensuring that sensitive logic does not leak into client-side code. These are not difficult concepts, but they require deliberate attention in a way that server-centric frameworks largely handle on behalf of the developer.

Beyond core skills, SPA development relies heavily on third-party ecosystem choices. Because React and Angular provide only the core rendering layer (or in Angular's case, a structured but still bounded framework), teams must select and assemble additional libraries for routing, state management, form handling, component UI, data fetching, and more. Each of these choices has implications for maintenance, compatibility, and longevity as discussed in [Part 1-7](/eval-guide/maintainability/). Navigating this ecosystem well — knowing which libraries are well-maintained, widely adopted, and likely to remain compatible with future framework versions — is itself a skill that takes experience to develop. This extends to capabilities like large dataset virtualization and real-time server push, where React and Angular have no built-in solutions — each requires selecting, integrating, and maintaining an additional library or infrastructure layer, with the developer responsible for scroll event handling, data fetching, state management, and lifecycle cleanup.

**Largest talent pool and ecosystem** — These frameworks benefit from the largest global developer pool and the most extensive ecosystem of libraries, tools, and learning resources among the options in this guide. This makes hiring, onboarding, and finding solutions to common problems relatively straightforward.

**Clear frontend and backend separation** — The frontend is a distinct application, communicating with the backend via API. This enables independent deployment and scaling, and allows frontend and backend teams to work in parallel — while also introducing the coordination overhead discussed in [Part 1-5](/eval-guide/development-speed/).

**Cloud-native deployment by default** — Because client-side frameworks compile to static files and their paired Spring Boot backend is a stateless REST API, both components containerize without special configuration. No session state is maintained on the server between requests, so any container instance can serve any user. Standard load balancing, horizontal auto-scaling, and Kubernetes deployments require no sticky session configuration. This is a genuine operational simplicity advantage in containerized environments.

**Large ecosystems** — All three frameworks have extensive libraries, tooling, component libraries, and community resources. Finding a solution to a common problem is rarely difficult. Managing the resulting dependency tree over time is a different matter, as discussed in [Part 1-7](/eval-guide/maintainability/).

**No commercial product or support** — React, Angular, and Vue are open source projects maintained by organizations or communities. Commercial support and SLAs are typically sourced through third-party providers rather than directly from the framework maintainers.
