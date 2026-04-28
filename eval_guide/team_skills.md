---
title: "Key Factor: Team Skills and Stack"
permalink: /eval-guide/team-skills-java-vs-js/
---

# Part 1-2: Key Factor: Team Skills and Stack

Of all the factors in this decision, team skills is the one most likely to be underweighted — and the one that causes the most pain when ignored.

It's easy to look at a framework's feature list and think "we can learn this." And you can. But learning takes time, mistakes happen during that time, and the people who know the codebase best are the ones who built it. Before evaluating any framework on its technical merits, get clear on who is actually going to build and maintain this thing.

## What building a web application actually requires

Modern web applications involve more than one layer of skill. At minimum, you need someone who can handle the frontend rendering and interactivity, someone who owns the backend logic and data layer, and someone who understands how the two connect. In small teams, one person often covers all of this. In larger teams, these roles are more separated — and the framework you choose will affect how cleanly that separation holds.

Some frameworks lean heavily on JavaScript and browser-side rendering. Others keep most of the logic on the server and push minimal code to the browser. A few let you write the entire application — frontend included — in Java. Each model requires a different skill profile.

## Your existing stack matters

Start with what you already have. What language does your backend run in? What do your developers spend most of their time writing?

If your team is primarily Java developers building Spring Boot applications, a framework that requires them to context-switch into a JavaScript-heavy frontend ecosystem creates real friction. They can do it — but every new library, every build tool, every npm error is time spent outside their area of confidence.

If your team already has strong React or Angular experience, a Java-centric UI framework may feel unnecessarily limiting, and you may struggle to hire or retain frontend developers who want to work with something more flexible.

The frameworks in this guide fall roughly into two camps:

- **JavaScript-first:** React, Angular — these live in the JS/TS ecosystem, use npm, and expect frontend development skills
- **Java-first:** ZK, Vaadin, Apache Wicket, Thymeleaf + Spring MVC — these stay within the Java ecosystem, and a backend developer can build UI without leaving familiar ground

Neither camp is better. They suit different teams.

## Who is going to build it — and who is going to maintain it

"Our team can learn it" is not the same as "our team is ready to build production software in it next month."

Think concretely about the people involved. Are they backend developers being asked to own the frontend? Are they frontend specialists who don't know the Java backend? Are they full-stack developers who are comfortable in both worlds?

Also think about the future. Will you need to hire for this? A framework with a large talent pool is easier to staff than one with a narrow specialist community.

## Learning curve and ease of onboarding

A low learning curve matters most in two situations: when you need to ship quickly, and when your team turns over regularly.

Some frameworks have a gentle ramp — a developer with general web experience can be productive in days. Others have a steeper curve but reward the investment with more power and structure once you're past it.

For internal tools and enterprise applications with stable teams, a higher initial investment often makes sense. For projects where you need new developers contributing quickly, or where the team composition changes frequently, a lower barrier to entry is a real advantage.

## Knowledge reuse

If your team already knows React, choosing React means your developers can apply patterns they already understand, reuse components they've built before, and draw on a much larger pool of tutorials, libraries, and answers on Stack Overflow.

The same applies on the Java side. A team that knows Vaadin or ZK can move their skills between projects. A team that learns Spring MVC with Thymeleaf for one project can apply that knowledge to the next one.

Knowledge reuse also affects architecture decisions. If your backend team deeply understands Java object models and Spring services, a framework that lets them build UI in the same language and paradigm — without a separate API layer — can significantly reduce the surface area of the application and the coordination overhead between teams.

## Does AI change this?

AI coding tools have made it easier to write unfamiliar code. A developer who has never written a React component can produce a working one faster than ever, with an LLM explaining each step.

But there are things AI does not fix.

- **Consistency** — AI generates code in the style and patterns it learned from. If nobody on your team understands the framework deeply, you end up with a codebase that works but has no coherent structure. Different AI-generated components will make different choices. Technical debt accumulates silently.
- **Debugging and maintenance** — When something breaks in production, you need someone who understands what the code is doing. AI can help diagnose problems, but it cannot replace judgment built from experience with a framework. A team that used AI to write a ZK application without understanding ZK will struggle when edge cases arise.
- **Third-party library choices** — AI will confidently recommend libraries that are outdated, deprecated, or simply not the right fit for your stack. A developer with framework knowledge knows which libraries are well-maintained, which are commonly used together, and which ones to avoid. Without that knowledge, you're relying on the AI to get this right — and it often doesn't.
- **Validation and testing** — AI-generated code looks correct more often than it is. It compiles, it runs, and it produces something that resembles the expected output — which makes it easy to assume it is working as intended. Without a developer who understands the framework well enough to review the output critically, subtle bugs, incorrect assumptions, and missing edge cases pass undetected. AI does not know your business rules, your data edge cases, or the specific behavior your users depend on. Human validation — code review, functional testing, and domain knowledge — is not optional when AI is involved in development. It becomes more important, because the volume of generated code increases while the careful line-by-line thinking that writing code by hand enforces is reduced.
- **Long-term maintenance** — The code you write today will be read, modified, and debugged by someone in three years. That someone will have their own AI tools, but they'll still need to understand the architecture and the patterns in use. A codebase built by AI without informed human oversight tends to become harder to maintain over time, not easier.

AI is genuinely useful for accelerating development in a framework your team already understands. It's a poor substitute for that understanding in the first place.
