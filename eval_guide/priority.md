---
title: "Key Factor: Priority & Trade-offs"
permalink: /eval-guide/priority/
---

# Part 1-8: Key Factor: Priority & Trade-offs

Every framework decision is ultimately a prioritization decision. There is no framework that is best at everything — and if someone tells you there is, they are selling something.

The previous sections covered individual factors: team skills, application type, architecture, development speed, enterprise requirements, and maintainability. Each of those factors matters. But in practice, they pull in different directions, and you cannot optimize for all of them simultaneously. At some point, you have to decide what matters most for your specific situation — and accept the trade-offs that come with that choice.

This chapter is about making that prioritization explicit, and about understanding the real costs involved so that the decision is made with clear eyes.

## What are you actually optimizing for?

Start by identifying your top one or two priorities. Not everything can be equal. If you try to optimize for everything, you will end up choosing the most popular framework by default — which may or may not be right for you.

Here are the most common priority profiles, and what they tend to point toward:

**Development speed above everything else** — You need to ship quickly. Time-to-market is the primary constraint. This usually points toward the framework your team already knows best, combined with a rich component ecosystem that reduces the amount of custom work. Beware of treating "fast to start" as the same as "fast throughout" — some frameworks front-load speed and slow down as complexity grows.

**Look, feel, and user experience** — The product needs to look polished, match a brand, and feel modern. Users will judge it on first impression. This tends to favor React or Angular with a well-chosen UI library. Java-centric frameworks can be themed, but deep visual customization requires more effort and the result rarely matches what a dedicated frontend team can produce with modern tooling.

**Scalability and concurrent users** — The application will serve a large number of simultaneous users, or traffic is unpredictable. This tends to favor client-side rendering architectures (React, Angular) where the server is stateless and scales horizontally. Server-centric frameworks that maintain session state per user carry a higher per-user server cost, though for most enterprise applications the actual user counts never reach the level where this becomes a real constraint. It is also worth noting that some server-centric frameworks have specific architectural options to address this — stateless component models, clustering support, and session offloading — so the gap with client-side architectures is narrower than it might initially appear for teams willing to apply those patterns.

**Application performance** — The application itself needs to be fast — fast to load, fast to respond to interactions, fast to render large datasets. This is different from scalability, and the two are often conflated.

Client-side frameworks have an advantage in initial perceived responsiveness for simple interactions, since rendering happens locally in the browser without a server round-trip. For typical pages with limited data, this often results in very smooth interactions. However, for data-heavy applications with large grids, real-time updates, or frequent data synchronization, the picture is more nuanced.

Our Level 3 experiment provides concrete evidence for this distinction. A 10,000-row virtual grid in ZK required one XML attribute and 64 lines of Java and ZUL — no JavaScript, no library selection, no backend paging API. The same feature in React or Angular requires integrating a virtualization library, implementing a paged data-fetching strategy, and managing client-side state for scroll position and caching — even after the library is chosen. For real-time server push, ZK required approximately 15 lines of Java and zero JavaScript; React and Angular have no built-in mechanism and require setting up a WebSocket/SSE client, defining an event protocol, managing connection lifecycle, and integrating incoming data into the application's state management model. These are achievable with available libraries and documentation, but they represent meaningful integration work spanning both the Java backend and the JavaScript frontend. Server-centric frameworks that keep data co-located with business logic and push only incremental UI changes handle these specific scenarios with significantly less developer-side assembly.

The honest answer is that raw performance depends more on implementation quality than on framework choice for typical pages. The framework's architecture starts to matter when the application is pushing limits — very large datasets, very high update frequency — and understanding which architecture handles your specific bottleneck better is more useful than general performance claims.

**Long-term maintainability and stability** — The application will run for five to ten years. The team will change. The priority is a codebase that remains manageable over time with minimal dependency churn. This tends to favor Java-based frameworks with commercial backing, a stable dependency footprint, and predictable upgrade paths.

**Compliance and enterprise fit** — Security, accessibility, audit requirements, and procurement processes are non-negotiable constraints. As covered in [Part 1-6](/eval-guide/enterprise-requirements/), this significantly narrows the field toward commercial-backed solutions for full compliance coverage, or toward carefully constructed React/Angular applications with deliberate library choices.

Most real situations are combinations of the above. A useful exercise is to rank these priorities explicitly — not in a meeting where everyone agrees that everything is important, but as a written list that the team actually commits to. When a disagreement arises later about a framework choice, the priority list becomes the tie-breaker.

## Budget and the hidden cost problem

Framework decisions are often treated as purely technical choices, separate from budget conversations. This is a mistake. The framework you choose has significant financial implications — and some of those implications are not obvious at the time of selection.

**License fees** — Most frameworks in this guide are free to use. React, Angular, Thymeleaf, and Apache Wicket carry no license cost. ZK and Vaadin offer free open-source editions with commercial licensing for enterprise features and support.

The license fee is the most visible cost, which means it is often the only cost that gets formally compared. This is where the analysis usually stops — and where it should actually begin.

**Man-hour cost: the real number** — Developer salaries are almost always the largest line item in a software project. A mid-to-senior developer costs significantly more per year than any framework license. This means that even a small difference in development velocity — measured in hours per feature — can dwarf the license cost difference between a free framework and a commercial one.

Consider a concrete example. If a commercial framework with a meaningful license fee saves each developer two hours per week through better tooling, less context-switching, and reduced boilerplate — that saving, across a team of five developers over a year, represents a substantial number of developer-hours. Whether that saving is real depends on your team and your application, but the point is that the license fee should never be evaluated in isolation from the productivity it enables or the support it includes.

The same logic applies in reverse. A "free" framework that requires your team to assemble and maintain a larger dependency stack, spend more time on cross-team coordination, or handle compliance requirements manually has hidden costs that do not appear on any invoice.

**Onboarding and training cost** — If your team needs to learn a new framework, that learning time has a cost. A developer spending four weeks coming up to speed on an unfamiliar framework is four weeks of reduced output. For a small team on a tight timeline, this is a real budget impact.

**Ongoing maintenance cost** — As discussed in [Part 1-7](/eval-guide/maintainability/), some frameworks require more ongoing maintenance work than others — dependency updates, compatibility fixes, migration work when the ecosystem shifts. This work is done by your developers, on your salary budget. A framework that costs two developer-days per month to keep current is a hidden recurring cost.

**Support cost** — When something goes wrong in a commercially supported framework, you have a vendor to call. When something goes wrong in a community-supported framework, you have Stack Overflow, GitHub issues, and your own debugging time. The value of commercial support is hard to quantify until you need it — at which point it becomes very easy to quantify.

## Making the trade-off explicit

The goal of this chapter is not to push you toward any particular framework. It is to encourage you to make the trade-off consciously rather than by default.

A common failure mode is choosing a framework because it is familiar, popular, or free — without carefully examining whether it fits the application's real requirements and the team's real constraints. Another common failure mode is letting a single vocal advocate on the team drive the decision toward their preference without a structured evaluation.

A useful way to make the trade-off explicit is to build a simple weighted priority table. List the factors that matter to your project. Assign a weight to each based on honest discussion with the people who will live with the decision. Score each framework against each factor. The result will not make the decision for you, but it will reveal where the genuine disagreements lie — and it will make the reasoning visible and revisable.

Part 3-2 provides a decision matrix that does exactly this across the six frameworks in this guide.

## One final thing to accept

There is no perfect choice. Every framework in this guide has been used successfully to build real, production applications. Every framework in this guide has also frustrated teams who chose it for the wrong reasons.

The goal is not to find the objectively best framework. The goal is to find the framework that fits your team, your application, and your priorities well enough that the trade-offs you accept are ones you can live with.

That requires knowing your priorities clearly before you start comparing features.

## Part 1 recap: the questions to answer before you choose

Work through these before evaluating any framework on features, benchmarks, or popularity. There are no right answers — only answers that are honest about your situation.

### Your application

- What type of application am I building — internal tool, customer-facing product, or something in between?
- How data-heavy is it? Will users be viewing, editing, and filtering large datasets?
- How interactive does it need to be — mostly read-only, or highly dynamic with real-time updates?
- How important is visual polish and brand alignment versus functional reliability?
- How many concurrent users do I realistically expect, now and in three years?

### Your team

- What languages and frameworks does my team already know well?
- Is the team primarily backend/Java developers, frontend/JavaScript specialists, or full-stack?
- Who will own the frontend — and is that the same person who owns the backend?
- How much cross-team coordination overhead exists today, and how much can we afford?
- How often does the team change, and how quickly do new developers need to become productive?

### Your architecture

- Do I want business logic close to the data on the server, or am I comfortable with a decoupled API and client-side rendering?
- Who should be responsible for state management — the server, the client, or both?
- How complex will the application become over time, and does the framework's structure scale with that complexity?

### Your enterprise requirements

- Does the application need to meet WCAG accessibility standards?
- Are there security, audit, or data handling requirements specific to my industry?
- Does the organization require a commercial support contract or vendor relationship?
- Will the dependency list need to be formally audited or approved?

### Your maintainability expectations

- How long will this application be in production — one year, five years, ten?
- How stable does the dependency footprint need to be?
- Is there a risk of key third-party libraries being abandoned or becoming incompatible?
- How easy should it be to onboard new developers to this codebase?

### Your priorities and budget

- What is my single most important priority — speed, look & feel, scalability, compliance, or long-term stability?
- What am I explicitly willing to sacrifice to get that priority?
- Have I accounted for hidden costs — onboarding, maintenance, coordination overhead, and support — not just license fees?
- If the framework requires learning investment, does the timeline allow for it honestly?

If you can answer all of these clearly and consistently, the framework comparison in the chapters ahead will feel much more straightforward. Many candidates will rule themselves out before you reach the feature comparisons.
