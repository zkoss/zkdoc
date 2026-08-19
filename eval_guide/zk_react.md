---
title: "ZK vs React"
description: "ZK vs React compared: architecture, lines of code, and team skills, based on three real applications built with both."
permalink: /eval-guide/zk-react
---

# Part 4-2: ZK vs React

ZK and React represent two fundamentally different philosophies about where web application logic should live and who should build it. This comparison uses the results from our three-level implementation to make the differences concrete.

## The architectural difference

React is a client-side rendering library. The browser downloads a JavaScript application, and that application manages the entire UI. To serve data, the Java backend exposes a REST API; the React frontend calls it. The two sides are developed, deployed, and scaled independently, with the API contract as the boundary between them.

ZK is a server-driven framework. The browser renders what the server tells it to render. User interactions are sent to the server as events; the server processes them and sends back the changes. The developer writes Java; ZK handles all browser communication.

These are not just different implementation choices — they require different skills, produce different codebases, and suit different organizational structures.

## Level 1 comparison: Employee Manager

On the basic Employee Manager, both frameworks completed all requirements successfully. The differences were measurable but not dramatic at this level.

ZK produced 779 total lines of code with zero JavaScript. The developer wrote Java [ViewModels](https://docs.zkoss.org/zk_mvvm_ref/viewmodel/viewmodel) and [ZUL](https://docs.zkoss.org/zk_dev_ref/ui_composing/zuml) templates. No REST API layer was needed.

React required 1,037 lines total, of which 730 were JavaScript or JSX. It also required building a REST API layer on top of the shared backend service, adding coordination surface area that the server-side frameworks did not need.

ZK built in 1.71 seconds, the fastest of the six frameworks in this guide, against React's 3.85 (2.42 Maven plus 1.43 Vite).

On the time until rows appear on screen, React is ahead. Measured in a browser to the same milestone — 15 employee rows painted — React reaches rows in 52.5 ms on a warm click against ZK's 93 ms, roughly 1.8× faster, and on a cold visit with an empty cache React is the fastest of the six at 38.5 ms (n=3, preliminary). This is the expected shape of the architecture: once React's bundle is loaded, drawing a list is a local operation, where ZK's browser has to execute script, build widgets, lay them out and paint on each navigation. React's bundle is also far smaller — 215 KB against ZK's 1.3 MB of framework JavaScript.

## Level 2 comparison: Advanced Components

React delivered all four complex views using five to six npm packages: @fullcalendar/react for the calendar, PrimeReact OrganizationChart for the org chart, react-pivottable for the pivot table, and react-grid-layout plus recharts for the portal dashboard. Each package came from a different vendor.

The integration cost is real and ongoing. Each of these packages comes from a different vendor, with its own release cycle, its own breaking change history, and its own compatibility constraints. Keeping the stack current and compatible is an ongoing maintenance burden that does not exist in a native-component framework.

ZK delivered all four views as native framework components with zero third-party libraries, zero npm packages, and zero JavaScript written by the developer.

## Level 3 comparison: Large Data & Real-Time

React has no built-in support for either feature tested at Level 3.

For a 10,000-row virtual grid, React requires a virtualization library — react-window or react-virtual being the most common choices — plus the JavaScript to integrate it. Estimated developer effort: approximately 200 lines of JavaScript plus library selection and integration work.

For real-time server push, React has no built-in mechanism. The developer is responsible for setting up a WebSocket or SSE connection on both the Spring Boot backend and the React frontend, plus client-side state management to reflect the updates. Estimated developer effort: approximately 350 lines across both sides.

ZK delivered both features with a one-attribute XML configuration for [ROD](https://docs.zkoss.org/zk_dev_ref/performance_tips/turn_on_render_on_demand) (64 total UI lines) and a 15-line [EventQueue](https://docs.zkoss.org/zk_dev_ref/server_push/event_queues) subscriber for server push — zero JavaScript written.

If your application requires large dataset grids or real-time updates, this is the dimension where the Java-centric versus JavaScript-centric architectural divide is most consequential.

## Team and skills

React requires JavaScript or TypeScript competence in addition to Java. A team that is primarily Java developers will need to either hire frontend specialists, train existing developers, or accept a slower ramp-up. The ecosystem of supporting tools — Vite, npm, state management libraries, TypeScript configuration — adds breadth to what the team needs to know.

ZK requires Java and familiarity with ZK's component model and ZUL. A Java developer can be productive in ZK without writing JavaScript at all. The ecosystem to learn is narrower: Maven, Java, ZUL syntax, and ZK's event model.

For teams with strong, dedicated frontend developers who already know React well, React's larger ecosystem and richer visual tooling are real advantages. The calculation changes for teams that are primarily Java developers building internal data applications.

## When React is the better choice

React suits your situation better if your team has strong JavaScript or TypeScript skills, if your application needs a large ecosystem of visual components and UI effects, if you need a clear separation between frontend and backend teams working against an API contract, or if the application is public-facing and brand presentation is a priority.

## When ZK is the better choice

ZK suits your situation better if your team is primarily Java developers, if your application is a data-heavy internal tool where complex grids, calendars, org charts, and real-time updates need to work natively without assembling libraries, or if keeping the full stack in Java is a priority for maintainability and team structure.
