---
title: "Migrating from a Client-Side Framework to ZK"
permalink: /eval-guide/client-side-to-zk/
---

# Part 5-1: Migrating from a Client-Side Framework to ZK

## How you might have ended up here

Most teams that adopted React or Angular did so for legitimate reasons. React was — and still is — the most widely used frontend framework, with a large talent pool, an extensive ecosystem, and strong community momentum. Angular offered enforced structure and a familiar feel for teams coming from Java's opinionated conventions. At the time of choosing, both were reasonable decisions.

Friction tends to emerge gradually, not all at once. It might be that the REST API layer has become a coordination bottleneck — every new feature requires both teams to move in sync, and small backend changes regularly cause frontend breakage. It might be that the npm dependency stack has grown unwieldy and each upgrade cycle consumes more and more developer time. It might be that the application has grown into territory — complex grids, real-time dashboards, pivot tables — where the client-side ecosystem requires a library-assembly effort that nobody anticipated. It might simply be that the team has changed: the frontend specialists who championed React have moved on, and the remaining Java developers are maintaining a codebase they are not fully comfortable in.

None of these are reasons to migrate immediately. But they are reasons to re-examine the original decision with fresh information.

## Go back to Part 1

Before making any migration decision, work through the questions in [Part 1](/eval-guide/how-to-choose/) as if you were evaluating frameworks for the first time — but with the knowledge you now have about how your application has actually developed and how your team has actually functioned.

Part 1-2 asks about team skills. Has your team composition changed since the original decision? If you built the application with dedicated frontend engineers who are no longer present, and the current team is primarily Java developers, the skill profile that drove the original choice no longer applies.

Part 1-3 asks about application type. Has the application grown into more complex territory than originally anticipated? An application that started as a simple form-and-list tool but has grown to require data-heavy grids, real-time updates, or enterprise components may now have requirements that favor a different architecture.

Part 1-5 asks about development speed. Where is the friction actually coming from? Is it the framework itself, or the API boundary, or the dependency management overhead? Understanding the source of the slowdown matters — because if the real problem is team coordination rather than technology, a migration will not fix it.

Part 1-6 asks about enterprise requirements. Has accessibility compliance or security auditing become a requirement that was not present at the outset? Commercial backing and built-in WCAG support may now be more relevant than they were at the beginning.

If you work through Part 1 and ZK consistently emerges as the better fit — not because it is fashionable, but because it matches your team's skills, your application's requirements, and your organization's constraints — then migration deserves serious consideration. If the answer is mixed, stay put and address the specific friction points you have identified without a full migration.

## Starting small: parallel implementation before full migration

A full codebase migration from a client-side framework to ZK is a significant undertaking and carries real risk. In most cases, the better approach is to start with a contained piece of the application and prove out the migration before committing to the full transition.

The most practical starting point is a new feature, a new internal tool, or a clearly bounded subsection of the existing application. ZK and a React or Angular frontend can coexist in the same organization — they can even share authentication infrastructure and backend services — while the team gains confidence in ZK and builds familiarity with its component model.

A few principles that make this approach work:

- **Start with a feature that plays to ZK's strengths.** If your existing application has a data-heavy view — a large grid, a reporting dashboard, a complex form — that has required ongoing JavaScript maintenance, that is a natural candidate for a ZK implementation. The contrast in development effort will be visible quickly.
- **Use the same backend.** ZK ViewModels call Spring services directly, without a REST API layer. If your existing backend is Spring Boot, ZK plugs directly into the same service layer that your React or Angular frontend already calls via REST. You are not replacing the backend — you are replacing the frontend layer for the new feature.
- **Measure the actual difference.** Track lines of code, time to implement, and ongoing maintenance effort for equivalent features built in the existing framework versus ZK. Real data from your own codebase, with your own team, is more useful than any benchmark from an evaluation guide.
- **Give the team time to build fluency.** ZK's component model and ZUL syntax are learnable quickly for Java developers, but the first implementation will take longer than subsequent ones. Build the evaluation period into your timeline and do not judge the framework on the first feature alone.

Once a meaningful portion of the application has been migrated and the team is productive in ZK, the question of full migration becomes easier to answer — because you will have real evidence from your own codebase rather than estimates.

## What the migration actually involves

The largest effort in a React-to-ZK or Angular-to-ZK migration is rewriting the frontend layer — the components, views, and routing logic. The backend Spring Boot services do not need to change. The data model does not need to change. The REST API layer, once ZK's direct service integration is in place, becomes unnecessary for ZK-driven views and can be retired incrementally.

For each existing frontend view, the ZK equivalent is typically a ZUL template and a Java ViewModel. A developer who knows Java and Spring Boot can produce a working ZK view without writing any JavaScript. The first few views will require learning ZK's component model and data binding syntax. After that, the pattern is consistent and productivity rises quickly.

The areas that require the most attention:

- **Routing and navigation.** React and Angular handle client-side routing in JavaScript. ZK uses server-side navigation — pages are ZUL files loaded by the framework. For applications with complex navigation state that was managed in the client-side router, this requires some rethinking rather than a straight translation.
- **State management.** React and Angular applications often have explicit state management layers (Redux, NgRx, React Context). In ZK, state lives in Java ViewModels on the server, which is simpler for most enterprise applications but requires thinking about session scope and ViewModel lifecycle.
- **Custom components.** If the existing application has custom React or Angular components that go beyond what standard libraries provide, assess whether ZK's built-in component library covers the same ground before starting. In most enterprise applications it will. For applications that depend heavily on custom frontend animations or highly specific visual interactions, evaluate this carefully.

The migration does not need to happen all at once. Views can be migrated incrementally, with the existing client-side framework and ZK coexisting during the transition period.
