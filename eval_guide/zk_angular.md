---
title: "ZK vs Angular"
permalink: /eval-guide/zk-angular/
---

# Part 4-3: ZK vs Angular

Angular is the most structurally opinionated of the client-side frameworks in this guide. Where React gives developers freedom to assemble their own architecture, Angular prescribes it: modules, services, dependency injection, decorators, and a strict component model are built in and expected. This comparison uses our three-level implementation to make the practical differences concrete.

## The architectural difference

Angular applications are organized around a four-layer architecture in our measurement: Spring Boot controller, REST API, Angular service, and Angular component. Each layer has its own responsibility, its own testing surface, and its own boilerplate.

ZK collapses this into two layers: a Java ViewModel and a ZUL template. The ViewModel calls Spring services directly. There is no REST API layer, no client-side service abstraction, and no client-side state management.

## Level 1 comparison: Employee Manager

Angular produced the most lines of code of any framework in our test — 1,093 total, with 798 lines of TypeScript. It also had the longest build time at 7.5 seconds (Maven plus ng build).

ZK produced 937 lines, zero JavaScript, and built in 2.6 seconds.

The qualitative difference is also meaningful. Angular's dependency injection system, module structure, decorators, and boilerplate have a steep initial learning curve. A developer new to Angular needs to understand not just how to write components, but how Angular's architecture works before producing working code. The payoff is a highly structured codebase that scales well across large teams — but the upfront investment is real.

ZK's learning curve is medium. The component model and ZUL syntax take time to absorb, but a Java developer is already working in a familiar language with familiar tooling.

## Level 2 comparison: Advanced Components

Angular delivered three of four complex views. The event calendar (@fullcalendar/angular), org chart (PrimeNG `<p-organizationChart>`), and portal dashboard (angular-gridster2 + ng2-charts) each have Angular-native ecosystem wrappers. The salary pivot table does not — no free Angular-native solution exists. Syncfusion and DevExtreme both offer commercial pivot table components; our implementation showed a placeholder.

For the three views Angular did deliver, the integration required verbose dependency injection wiring, module imports, and more configuration than equivalent React implementations. Angular's structural rigidity, which is an asset for large team consistency, adds overhead in component integration scenarios.

ZK delivered all four views natively with zero third-party dependencies.

## Level 3 comparison: Large Data & Real-Time

For large dataset handling, Angular's CDK Virtual Scroll is built-in — a genuine advantage over React, which requires an external library. However, Angular CDK Virtual Scroll requires explicit wiring: the developer implements an `itemSize` strategy, manages `trackBy` functions, and connects the virtual scroll viewport to the data source. Estimated effort: approximately 150 lines of TypeScript.

For real-time server push, Angular has no built-in mechanism. The developer is responsible for setting up a WebSocket connection using RxJS WebSocket, managing subscriptions, and reflecting updates in component state. Estimated effort: approximately 300 lines across both sides.

Angular's four-layer architecture (controller, REST API, Angular service, component) means each of these features must be threaded through all four layers before it reaches the UI — more moving parts than a two-layer server-side framework.

ZK delivered both features natively: ROD in 64 UI lines with one XML attribute, push in approximately 15 lines via EventQueue — zero JavaScript written.

## Team and skills

Angular has the steepest skill requirement of any framework in this guide. A developer needs TypeScript, Angular's module system, dependency injection, RxJS for reactive patterns, and the Angular CLI toolchain — before writing a single application-specific line of code.

Angular's rigidity is also its strength in large teams: the enforced patterns make it harder for a large codebase to become inconsistent. If your team has a large, dedicated frontend group with Angular experience, that investment pays dividends as the codebase grows. The framework makes many architectural decisions for you, which reduces the variability that plagues large React codebases.

## When Angular is the better choice

Angular suits your situation better if you have a dedicated frontend team with TypeScript experience, if your organization is large enough that enforced architectural consistency is more valuable than flexibility, if you need a framework that prescribes patterns across a large team, or if you have an existing Angular investment that would be expensive to abandon.

## When ZK is the better choice

ZK suits your situation better if your team is Java-focused, if you need complex enterprise components to work without library assembly, if the pivot table gap in Angular's ecosystem is a real requirement rather than a nice-to-have, or if the overhead of Angular's four-layer architecture is not justified by your team structure or application complexity.
