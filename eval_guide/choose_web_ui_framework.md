---
title: "How to Choose a Web UI Framework"
permalink: /eval-guide/choose-web-ui-framework/
---

# Part 1-1: How to Choose a Web UI Framework

## Introduction

Choosing a framework is not really a technical question. It's a question about your team, your product, and what trade-offs you're willing to make.

Most developers approach this backwards — they look at framework features first, then try to decide if those features match their needs. This guide suggests the opposite: understand your situation first, then let the framework choice follow naturally.

This page walks you through the key factors. Each one is covered in more depth in its own section, but you'll find a short summary here so you can see the full picture before diving in.

## Start with your context

Before comparing any two frameworks, answer three questions honestly:

- **What kind of application are you building?** An internal admin tool, a public-facing product, and an enterprise data platform have very different requirements — even if they all look like "web apps" from the outside.
- **What skills does your team already have?** A Java-heavy backend team and a React-specialist frontend team will have very different productivity curves depending on what you choose. Ignoring this leads to slow onboarding, increased risk, and code that nobody feels fully confident maintaining.
- **What matters more right now — speed or flexibility?** Both are legitimate priorities. A startup validating an idea needs to ship fast. An enterprise team building a system that will run for ten years needs maintainability. Frameworks make different trade-offs here, and being clear about your priority will rule out several options immediately.

This guide is based on building real applications across multiple frameworks, so the comparisons that follow come from first-hand experience rather than documentation reading.

## Key decision factors — a summary

**Team skills and stack** — The best framework for your team is usually the one your team already knows reasonably well. This isn't about being conservative — it's about recognizing that onboarding costs are real, that fewer people can review code written in an unfamiliar paradigm, and that debugging is harder in a framework nobody fully understands yet. If your backend is Java and your team thinks in Java, that matters. → [Part 1-2](/eval-guide/team-skills-java-vs-js/)

**Application type** — The shape of your application matters more than most developers admit. A document-heavy reporting tool, a highly interactive dashboard, a form-heavy data entry screen, and a public marketing site all have different rendering needs, different state management complexity, and different performance profiles. → [Part 1-3](/eval-guide/application-type/)

**Architecture and complexity** — How complex will the application get over time? How many developers will work on it simultaneously? Frameworks that are easy to start with can become harder to organize at scale, while frameworks that feel heavy at first often pay off once the codebase grows. → [Part 1-4](/eval-guide/architecture-complexity/)

**Development speed** — Some frameworks let you ship a working screen in an afternoon. Others require more setup but give you more control later. If time-to-market is your primary constraint, this factor should weigh heavily in your decision. → [Part 1-5](/eval-guide/development-speed/)

**Enterprise requirements** — If your application must meet accessibility standards (WCAG), pass a security audit, or be backed by commercial support, that narrows your options significantly. Open-source frameworks with no commercial backing may not fit this column. → [Part 1-6](/eval-guide/enterprise-requirements/)

**Maintainability** — Who will maintain this in two years? Will those people be easy to hire? Is the framework likely to still be actively supported? → [Part 1-7](/eval-guide/maintainability/)

**Priority & Trade-offs** — Every framework sits somewhere on the spectrum between "opinionated and productive" and "flexible and open-ended." Neither end is wrong, but they attract different teams and suit different projects. Understanding where your team and project sit on this spectrum will help you avoid picking a framework that fights you at every turn. → [Part 1-8](/eval-guide/priority/)

## The decision framework

Once you have clear answers to the questions above, the choice usually narrows quickly. The following parts of this guide are organized to help you move from your context to a specific recommendation — or a short shortlist — without having to read everything.

If you want to skip ahead to a framework recommendation based on your situation, Part 3 maps common team and project profiles to the frameworks that fit them best. Part 3-2 provides a full decision matrix with "use X if…" summaries for each framework covered in this guide.

The rest of Part 1 covers each factor above in more detail, with concrete examples and the kinds of questions you should ask yourself and your team.
