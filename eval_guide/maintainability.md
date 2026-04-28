---
title: "Key Factor: Maintainability"
permalink: /eval-guide/maintainability/
---

# Part 1-7: Key Factor: Maintainability

Maintainability is the factor that teams think about least during selection and regret most during operation. The framework you choose will be read, modified, debugged, and extended by people who were not involved in the original decision — possibly including a future version of your current team who has forgotten why certain choices were made.

A framework that is fast to build with but hard to maintain is not a fast framework. It is a deferred cost.

## Code that is easy to read and understand

The most important property of maintainable code is that a developer who did not write it can understand it without significant effort.

This is partly about coding discipline and documentation — things your team controls. But it is also shaped by the framework itself. Some frameworks have clear, well-established patterns for how things should be structured. Others are highly flexible, which means every team invents their own patterns, and every codebase looks different.

React gives developers a great deal of freedom. A React application written by one team will look quite different from one written by another. That flexibility is part of its appeal — but it also means a developer joining an existing React codebase needs time to learn that team's specific conventions, state management approach, and component organization, in addition to React itself.

ZK and Vaadin have more opinionated structures. Applications written in these frameworks tend to follow more predictable patterns, which can make them easier to navigate for someone new to the codebase — provided they know the framework.

Thymeleaf + Spring MVC is transparent almost to a fault. The template structure maps closely to the HTML output, and the Spring MVC layer follows well-established Java conventions. For developers already comfortable with Spring, this predictability is an advantage.

## What a new developer actually needs to learn

This is a question that often gets glossed over — teams assume that "knowing the framework" is sufficient, when in reality the full skill requirement varies significantly between approaches.

For React and Angular, a developer joining the team needs to know more than just the framework. They need solid JavaScript or TypeScript skills. They need to understand the specific ecosystem libraries the project uses — the router, the state management library, the component library, the form handling approach — each of which has its own learning curve. They need to understand how to design and consume REST APIs, since the frontend and backend are separate. And they need to understand frontend-specific security practices such as XSS prevention, CSRF handling, and secure token storage in the browser — concerns that do not disappear just because a library handles some of them. In short, a new React or Angular developer is onboarding into a stack, not just a framework.

For ZK and Vaadin, the picture is different. A developer needs to learn the framework's component model and event system, but they do so in Java — a language they likely already know if they are joining a Java team. There is no separate API layer to understand, no frontend build toolchain to configure, and no browser-specific security model to reason about independently, because the framework handles communication and the server enforces security. The scope of new knowledge is narrower, even if the framework itself takes time to master.

For Apache Wicket, the same Java-centric advantage applies. The component model requires learning, but the overall context — Java, Spring, server-side patterns — is familiar to any Java developer.

For Thymeleaf + Spring MVC, a developer familiar with Spring Boot can be productive quickly. The main additional requirement is understanding what JavaScript needs to be added manually for any interactive behavior, which depends on the specific choices the project has made.

None of this means one approach is easier to learn in absolute terms. It means the learning is distributed differently — breadth across many tools for SPA frameworks, depth within a more contained ecosystem for Java-centric ones.

## Onboarding and finding developers

These two concerns are closely related — both come down to the same question: how easy is it to get the right people working productively on this codebase?

React and Angular have the largest developer communities of any frameworks in this guide. Hiring someone with React or Angular experience is straightforward in most markets, and a new hire can often start contributing relatively quickly because the framework is already familiar to them. The risk is that React codebases vary significantly in structure, so familiarity with React in general does not guarantee familiarity with this particular codebase's patterns.

For ZK, Vaadin, and Apache Wicket, direct framework experience is less common in the general hiring pool — but this matters less than it initially appears for Java-oriented organizations. A strong Java developer can become productive in these frameworks within a reasonable timeframe, particularly on the server-side patterns. The onboarding burden is learning the framework's component model, not learning a new language or a new architectural paradigm. The surrounding context — Java, Spring, server-side thinking — is already familiar.

Internal consistency matters as much as framework familiarity in both cases. A codebase that follows clear, documented conventions is faster to onboard into than one where every developer has done things their own way. Frameworks that enforce more structure — Angular, ZK, Vaadin — help here by limiting the degrees of freedom and the resulting variation.

If your organization experiences high developer turnover, or expects the team to grow significantly, the availability of framework-experienced developers in your market is worth researching concretely before making a decision.

## Bug fix lead time and framework responsiveness

When a bug is discovered — particularly a security vulnerability or a regression introduced by a framework update — how quickly it gets fixed depends heavily on who maintains the framework and what their obligations are.

Open-source community-maintained frameworks operate on volunteer time and community prioritization. Bugs that affect many users get fixed quickly. Bugs that affect a narrow use case may wait weeks or months. There is no guarantee of a timeline.

Commercially supported frameworks — ZK and Vaadin — offer support contracts that include committed response times for critical issues. If your application is in production and a framework bug is causing failures, having a vendor you can escalate to with an SLA is worth a great deal.

This also connects to patch cadence. Frameworks that release updates frequently tend to fix bugs faster — but frequent updates also mean more compatibility work on your side. Frameworks with longer but more stable release cycles are easier to stay current with, at the cost of slower bug resolution. The right balance depends on how much operational overhead your team can absorb.

## Long-term assurance

Will this framework still be actively maintained in five years? In ten?

Nobody can answer this with certainty — but some frameworks carry more confidence than others.

React and Angular are backed by Meta and Google respectively, which provides strong confidence in their own long-term maintenance. Both have enormous user bases that create gravitational pull of their own. However, React and Angular applications typically depend on a surrounding ecosystem of third-party libraries — routers, state managers, component libraries, utility packages — each maintained by independent teams with no obligation to stay current. A framework backed by a large company does not guarantee that the ten other libraries your application depends on will still be maintained and compatible in five years. This is a real and common source of maintenance burden in long-running React and Angular applications, and worth factoring in alongside the framework's own longevity.

ZK is maintained by Potix Corporation, a commercial company with revenue tied to ZK's success — a direct financial incentive to keep the framework maintained and competitive. Vaadin Ltd operates on the same model. Both have been in continuous development for nearly two decades. Their commercial model is actually a stability signal, and their smaller third-party dependency footprint means fewer external projects to worry about over time.

Thymeleaf and Apache Wicket are community-maintained under well-established open-source governance. Both are mature and have been stable for many years. The risk is lower than a single-maintainer open-source project, though the pace of development is slower than commercially backed alternatives.

The warning sign to watch for in any framework is visibly slowing activity — fewer commits, older open issues, declining community engagement. Before committing to any framework, check its repository activity and release history. A framework that has not released an update in eighteen months may still be perfectly usable, but it deserves a harder look.

## Third-party dependencies and compatibility

Every framework brings dependencies with it — its own and those of the ecosystem it operates in. Those dependencies have their own release cycles, their own compatibility requirements, and their own maintenance trajectories.

This is a more acute issue in the JavaScript ecosystem than the Java ecosystem, for structural reasons.

A typical React application depends on a UI component library, a routing library, a state management library, a form handling library, and several utility packages — each maintained by a different team, each with its own versioning. When React releases a major version, some of these libraries update quickly. Others lag for months. Some are abandoned altogether. Keeping a React application's dependencies current and compatible is an ongoing operational task that requires active attention.

This is not hypothetical. It is a common source of maintenance burden in long-running React applications. The component library that was popular when the project started may no longer be maintained. The state management pattern that was idiomatic three years ago has been superseded. Each of these changes creates migration work.

Java-based frameworks have a more stable dependency model. The Java ecosystem moves more slowly, which is sometimes frustrating during development but is genuinely valuable during long-term maintenance. A ZK or Vaadin application written five years ago is more likely to build and run without intervention than a React application of the same age.

When a dependency stops being maintained, you face three options: migrate to an alternative, fork and maintain it yourself, or accept the risk of an unmaintained dependency. None of these is free. Minimizing the number of third-party dependencies — and choosing frameworks that do not require a large ecosystem of supporting libraries — reduces the frequency with which you face this choice.
