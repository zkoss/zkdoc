---
title: "Server-Side Templating: Traditional MVC"
permalink: /eval-guide/server-side-templating/
---

# Part 2-3: Server-Side Templating: Traditional MVC

Server-side templating frameworks represent the original model for web application development, and in many contexts they remain a perfectly sensible choice. Rather than shipping a JavaScript application to the browser or maintaining a persistent server-side component tree, these frameworks generate complete HTML pages on the server and send them to the browser. When the user interacts with the application, the browser sends a request, the server processes it, renders a new HTML page, and sends it back.

This model is simple, predictable, and well-understood. The framework in this category covered in this guide is Thymeleaf, used in combination with Spring MVC.

## Thymeleaf with Spring MVC

Thymeleaf is a Java template engine that integrates tightly with Spring MVC. A developer writes HTML templates with Thymeleaf expressions embedded in them, Spring MVC handles routing and controller logic, and the server renders the final HTML before sending it to the browser.

Thymeleaf templates are natural HTML — they can be opened directly in a browser and display a reasonable approximation of the final output even without a running server. This makes it easy for developers to work on templates independently. The learning curve is gentle for anyone already familiar with Spring Boot, and the overall model is transparent: request in, HTML out, no client-side layer to reason about.

Where it becomes limiting is in applications that require dynamic UI behavior — updating part of a screen without a full reload, real-time updates, complex in-page interactions. These require adding JavaScript on top, which Thymeleaf leaves entirely to the developer. It pairs naturally with lightweight tools like HTMX or Alpine.js if limited interactivity is needed without committing to a full SPA architecture.

## Shared characteristics

**Simple and predictable model** — The request-response cycle is straightforward: request in, HTML out. There is no persistent connection between browser and server, no client-side state to manage, and no framework layer running in the browser. For developers who understand HTTP and HTML, the mental model is transparent.

**Minimal client-side complexity** — Because the server generates HTML, very little JavaScript is involved by default. This reduces skill requirements, eliminates JavaScript build tooling, and produces applications that work reliably across browser environments.

**Good fit for straightforward applications** — For content-heavy pages, form-based workflows, and applications where interactions are primarily navigation rather than manipulation, Thymeleaf + Spring MVC delivers what is needed with very little overhead.

**Limited dynamic UI capability** — When users expect real-time feedback, partial page updates, or highly interactive interfaces, the page-reload model becomes a constraint. Adding significant JavaScript effectively means building a separate frontend layer on top of the templating layer, at which point a more structured approach may be warranted.

**Cloud-native friendly** — Thymeleaf applications are stateless by nature: the server renders HTML per request and holds no session UI state. Containerization, horizontal scaling, and load balancing work without sticky session configuration, making deployment on Kubernetes or any cloud platform straightforward.

**No commercial product or support** — Thymeleaf is a community-maintained open-source project with no commercial offering. For organizations that need vendor support, that would need to come from a Spring Boot support contract rather than from Thymeleaf directly.
