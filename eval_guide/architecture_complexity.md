---
title: "Key Factor: Architecture & Complexity"
permalink: /eval-guide/architecture-complexity/
---

# Part 1-4: Key Factor: Architecture & Complexity

Before comparing frameworks, it helps to be clear about what kind of thing you are actually building — and how it works under the hood. The architectural choices baked into a framework will either match your mental model of the application or fight it. Understanding the basics makes that match much easier to see.

## How a web application works — the full picture

Even if you are an experienced developer, it is worth stepping back and seeing the whole system before we talk about where frameworks sit within it.

A web application has several distinct layers, and each one has a job.

**The browser (client)** — This is where the user actually is. The browser receives code — HTML for structure, CSS for appearance, JavaScript for behavior — and turns it into something a person can see and interact with. It handles clicks, keyboard input, scrolls, and touch events. It can store small amounts of data locally. It can make requests to the server in the background without reloading the page. Modern browsers are powerful runtime environments, not just document renderers.

**The server** — The server runs your application's backend logic. It handles authentication, processes business rules, reads and writes to the database, and responds to requests from the browser. Depending on the architecture, it may also be responsible for generating the HTML that the browser displays — or it may simply expose data via an API and leave rendering entirely to the client.

**The communication layer** — Browser and server are separate processes, often running on different machines. They communicate over HTTP — the same protocol used to load web pages. In traditional applications, this communication was page-by-page: the browser requests a URL, the server responds with a full HTML page. In modern applications, the browser often sends smaller requests — just the data it needs — and updates only the relevant part of the screen. This is what makes applications feel fast and interactive.

The format of that communication matters too. Some frameworks communicate via full HTML fragments. Some use JSON data that the client turns into UI. Some use persistent connections (WebSockets) that allow the server to push updates to the browser in real time without the client having to ask.

**Application state** — State is simply the current condition of the application — which user is logged in, what data is loaded, what the user has typed, which filters are active. Every application has state. The question is where it lives and who manages it.

State can live on the server (the server remembers everything about the session), on the client (the browser holds the current state in memory or local storage), or split between the two. This is one of the most consequential architectural decisions in a web application, and it is largely determined by your framework choice.

**Business logic** — Business logic is the rules your application enforces — validation, calculations, workflows, access control. It can live on the server, on the client, or in both places. Server-side logic is more secure and consistent. Client-side logic is more responsive. Most applications end up with some of both, which creates its own coordination challenges.

## Server-centric versus client-centric architecture

The frameworks in this guide fall into two broad architectural camps. Understanding the difference is essential to making a good choice.

### Server-centric architecture

In a server-centric model, the server is in charge. It holds the application state, processes user interactions, and generates the UI. When something happens in the browser — a button click, a form submission — the information is sent to the server, the server updates its state, and a response comes back to update the screen.

Thymeleaf + Spring MVC is the most traditional example of this: the server renders a complete HTML page and sends it to the browser. When the user navigates or submits a form, a new page is rendered server-side and returned.

ZK and Vaadin take a more sophisticated approach within the server-centric model. They maintain a server-side representation of the UI, communicate with the browser over a persistent or Ajax-based channel, and push fine-grained updates rather than full page reloads. The developer writes Java code that describes the UI and handles events — the framework takes care of synchronizing the browser.

Apache Wicket follows a similar philosophy: Java components on the server correspond to what the user sees, and the developer stays largely within the Java world.

**The main advantages of server-centric architecture:**

- Business logic stays on the server, close to the data, away from the client
- Easier to enforce security — less exposure of logic in the browser
- Java developers can build full-featured UI without deep JavaScript knowledge
- State management is simpler — the server is the single source of truth
- Easier to integrate with Java backend services directly

**The tradeoffs:**

- Server carries more load, since it manages state for every active session
- Real-time, highly interactive experiences require more careful design
- Tight coupling between frontend and backend can make independent scaling harder

### Client-centric architecture

In a client-centric model, the browser takes on much more responsibility. The server exposes an API — typically returning JSON data — and the client renders the UI, manages state, and decides what to display. The browser downloads a JavaScript application once, and from that point on, most interactions happen within the browser, with API calls made as needed.

React and Angular are the dominant examples of this model. They are JavaScript frameworks that run in the browser. The server is decoupled from the UI — it provides data, but has no knowledge of what the screen looks like.

**The main advantages of client-centric architecture:**

- Rich, highly interactive experiences with fast in-browser responses
- Clear separation between frontend and backend — teams can work independently
- The server becomes a stateless API, which scales more predictably
- Large ecosystem of UI components and tooling
- Familiar model for frontend specialists

**The tradeoffs:**

- State management in the browser is complex at scale — this is a well-known challenge in large React and Angular applications
- Business logic risks leaking into the frontend if discipline is not maintained
- JavaScript expertise becomes a core requirement
- Initial load time can be significant for large client-side applications
- Security requires careful API design — the server must validate everything it receives

## The role of the framework — and the developer

A framework is not just a collection of UI components. It is an architectural decision. It determines where your logic lives, how your application communicates, and what your developers spend their time thinking about.

Different frameworks absorb different parts of the complexity, and leave the rest to you.

A framework like ZK or Vaadin takes on a significant amount of the communication and state management work. The developer writes components and event handlers in Java. The framework handles serializing those events to the browser, maintaining the server-side component tree, and synchronizing updates. The developer thinks in terms of business logic and UI components — not HTTP, not JSON, not browser rendering.

A framework like React takes on the rendering and component model, but leaves state management, API communication, routing, and data fetching largely to the developer (or to additional libraries). A React application involves many more explicit decisions about how data flows and how components talk to each other.

Thymeleaf + Spring MVC handles the least — it renders templates on the server but leaves all interactivity to whatever JavaScript the developer adds manually. It is the most transparent and the most manual.

This is not a ranking. It is a spectrum of trade-offs between control and abstraction.

What this means in practice:

A Java developer working with ZK can build a fully functional, data-driven enterprise UI without writing a line of JavaScript. The framework handles the browser. The developer handles the application. This is a significant productivity advantage for teams with strong Java backgrounds and limited frontend expertise.

A frontend specialist working with React has precise control over every rendering decision, access to a vast library ecosystem, and a component model that scales well in large frontend teams — but they are also responsible for more of the architecture.

Neither approach shields you from complexity entirely. They move it to different places. The right choice is the one that moves the complexity toward the part of your team that is best equipped to handle it.
