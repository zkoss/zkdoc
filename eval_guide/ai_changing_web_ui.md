---
title: "How AI Is Changing Web UI Development"
permalink: /eval-guide/ai-changing-web-ui-development/
---

# Part 6-1: How AI Is Changing Web UI Development

## What AI has genuinely improved

The most concrete benefit of AI coding tools is a reduction in the time spent on mechanical work — the boilerplate, the lookup, the translation of intent into syntax. Developers who already know a framework well can move faster on the parts of the job that are predictable: generating a CRUD form from a data model, scaffolding a new component that follows an established pattern, writing the first draft of a configuration file, translating a design specification into layout code.

For learning, the change is significant. A developer encountering an unfamiliar framework can get working examples explained in plain language, ask why a specific pattern is used rather than another, and iterate on code without consulting documentation for every method signature. The on-ramp to a new technology has become significantly shorter.

For routine tasks across any framework, AI removes much of the friction of starting. An empty file is less intimidating when a prompt can produce a reasonable starting point. The first version of a new screen, a new service method, or a new test class takes less time to exist in the codebase.

AI also helps bridge skill gaps within a team. A Java developer who has never written CSS can produce a reasonable layout with AI assistance. A developer who is strong on logic but weak on data binding syntax can get the binding correct on the first attempt rather than spending time hunting for the right syntax in documentation.

## What AI has not changed

[Part 1-2](/eval-guide/team-skills-java-vs-js/) covers this in the context of team skills, and the core point bears repeating here with more specificity.

AI generates code that looks correct more often than it is. The output compiles, it runs, and it produces something that resembles the expected behavior. This is the dangerous part. With code written by hand, a developer who does not understand what they are writing tends to slow down, recognize the confusion, and seek understanding. With AI-generated code, the same developer can accept output that appears to work and move on — with subtle bugs, wrong assumptions, and missed edge cases accumulating silently in the codebase.

AI is also a confident source of outdated and incorrect library recommendations. It will recommend deprecated packages, APIs that have changed, and integration patterns that were common a few years ago but have since been superseded. A developer with genuine framework knowledge catches these errors. A developer relying on AI without that knowledge does not.

Third-party library selection, which was already one of the harder judgment calls in modern web development, has not been improved by AI. The ecosystem changes faster than training data, and AI tools have no reliable way to distinguish between a well-maintained library and one that has been abandoned. The organizational cost of discovering this six months into a project has not changed.

## What has genuinely become different: testing and verification

One practical consequence of AI in development workflows that is not discussed enough: as AI tools increase the volume of code that gets written, the importance of verification increases proportionally.

A developer writing code by hand tends to think carefully about each line — because writing is slow and effort discourages carelessness. A developer reviewing AI-generated output needs to supply that thinking deliberately, because the code appears complete and the natural instinct is to move on. The volume of generated code can easily exceed the team's capacity to review it thoughtfully.

This means that test coverage, code review practices, and functional validation have become more important in AI-assisted workflows, not less. But more importantly, what you test needs to shift in specific ways.

## What stays the same

Standard functional testing — does the feature do what it is supposed to do — remains unchanged. Unit tests for service logic, integration tests for data access, and end-to-end tests for user flows are as necessary as before.

## What AI makes worse, specifically

AI-generated code has consistent failure patterns that human-written code is less prone to. Knowing these patterns tells you where to focus your review and testing effort.

**Deprecated and outdated API usage.** AI tools are trained on historical code, which means they confidently use APIs that were correct two years ago but have since been deprecated or removed. In Java frameworks, this shows up as outdated ZK component attributes, removed Vaadin APIs, or Spring Boot configuration properties that changed between versions. In JavaScript frameworks, it appears as npm packages that have been superseded or React/Angular patterns that the current version discourages. This class of bug compiles and often runs — it just produces wrong behavior or warnings that eventually become errors. Explicitly verifying that generated code uses current APIs, not just APIs that exist, is a new review step that was largely unnecessary when developers wrote from their own current knowledge.

**Edge cases and error states are often missing.** AI generates what was asked for. If the prompt describes the normal case, the code handles the normal case. Empty inputs, missing records, null foreign keys, concurrent modifications, and unauthorized access are systematically under-handled in AI-generated code because they were not in the prompt. In the past, an experienced developer would instinctively add null checks and error states while writing. With AI, those instincts are not in the loop. Negative-path and boundary-condition testing — which was always good practice — has become specifically necessary to compensate for this gap.

**Code that looks right but behaves wrongly.** AI produces code that looks correct, follows the right patterns, and passes a quick review — but contains subtle logical errors in conditionals, calculations, or data transformations. These are harder to catch than compile errors precisely because they look right. Tests that verify actual output values, not just that the code runs without error, matter more than they used to.

## The net effect

The testing workload has not decreased with AI tools. The speed gain is in the writing phase; the verification phase requires equal or more attention. A team that adopts AI for code generation without investing in test coverage will accumulate hidden defects faster than before, because the volume of generated code increases while the careful line-by-line thinking that writing by hand enforces is removed.

If your team is using AI tools heavily, factor in time for proper testing and human verification — especially for deprecated API checks, edge cases, and logic correctness. These are the gaps AI consistently leaves.

## AI as an assistant, not a replacement

The most useful mental model for AI in a development workflow is not "a tool that writes code for you" but "an assistant that handles the mechanical parts while you handle the judgment."

The judgment parts have not changed. Deciding whether a feature belongs in the frontend or the backend is still a design decision. Deciding how to structure a data model for long-term maintainability is still an architectural decision. Deciding whether the edge case in the requirements document is a real requirement or a misunderstanding is still a domain knowledge question. Debugging the production issue that only reproduces under specific load conditions is still a debugging problem that requires understanding the codebase.

**AI makes competent developers faster. It does not make inexperienced developers competent. And a codebase built primarily by AI without skilled human oversight tends to become harder to maintain over time — not because the initial code is bad, but because the architectural decisions that accumulate across a year of AI-generated features were never consciously made by anyone who understood the full picture.**

The frameworks that will serve teams best in this environment are the ones that are opinionated enough to keep AI-generated code consistent, well-documented enough to give AI tools accurate context, and mature enough that the patterns they use are well-represented in training data. Being easy to verify and test matters more, not less, in an AI-assisted workflow.
