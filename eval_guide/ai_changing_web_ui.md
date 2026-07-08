---
title: "How AI Is Changing Web UI Development"
description: "How AI coding tools are changing web UI development and what it means for framework choice."
permalink: /eval-guide/ai-changing-web-ui-development
---

# Part 6-1: How AI Is Changing Web UI Development

## What AI has genuinely improved

The most concrete benefit of AI coding tools has been a time spent reduction of mechanical work — boilerplate templating, lookups, translation of intent into syntax. Developers who already know a framework well can move faster on the parts of the job that are predictable: generating a CRUD form from a data model, scaffolding a new component that follows an established pattern, writing the first draft of a configuration file, translating a design specification into layout code.

For learning, the change is significant. A developer encountering an unfamiliar framework can get working examples explained in plain language, ask why a specific pattern is used rather than another, and iterate on code without consulting documentation for every method signature. The onboarding for new technology has become significantly shorter.

For routine tasks across any framework, AI removes some starting costs. An empty file is less intimidating when a prompt can produce a reasonable starting point. The first version of a new screen, a new service method, or a new test class are realized faster.

AI also helps bridge skill gaps within a team. A Java developer who has never written CSS can produce a reasonable layout with AI assistance. A developer with strong logic skills but unfamiliar with data binding syntax can get the binding correct on their first attempt rather than spending time looking up the proper syntax in the documentation.

## What AI has not changed

[Part 1-2](/eval-guide/team-skills-java-vs-js) covers this in the context of team skills, and the core point bears repeating here with more specificity.

AI generates code that looks correct more often than it is. The output compiles, it runs, and it produces something that resembles the expected behavior. This is the dangerous part. With handwritten code, a developer has to slow down and understand their work before reaching a final state. With AI-generated code, the same developer can accept output that appears to work and move on — with subtle bugs, wrong assumptions, and missed edge cases accumulating silently in the codebase.

AI confidently provides outdated or improper library recommendations. It will recommend deprecated packages, already deprecated APIs, and already superseded integration patterns. A developer with genuine framework knowledge catches these errors. A developer relying solely on AI without that knowledge does not.

Technology selection, a critical step in any development project, has not been improved by AI. The ecosystem changes faster than model training, and AI tools do not perform logical analysis before suggesting a course of action, but instead output results often guided by the majority answer of its training data. The organizational cost of discovering hidden technological debt or technological mismatches in a project after the fact has not changed.

## What has genuinely become different: testing and proofreading

As AI tools' share of written code rises, the importance of testing and proofreading increases proportionally.

A developer creating code by hand has to think carefully about each line as they write as a part of their process. A developer reviewing AI-generated output needs to carry that critical thinking on code they did not write. Since the code appears complete, they expect to simply move on. The volume of AI-generated code can easily exceed the team's capacity to review it thoughtfully.

This means that test coverage, code review practices, and functional validation have become even more important in AI-assisted workflows, not less. But more importantly, what you test needs to shift in specific ways.

## What stays the same

Standard functional testing — does the feature do what it is supposed to do — remains unchanged. Unit tests for service logic, integration tests for data access, and end-to-end tests for user flows are as necessary as before.

## What AI makes worse

AI-generated code has consistent failure patterns that human-written code is less prone to. Knowing these patterns tells you where to focus your review and testing effort.

**Deprecated and outdated API usage.** AI tools are trained on historical code, which means they tend to use deprecated or removed APIs. In Java frameworks, this crops up as outdated ZK component attributes, removed Vaadin APIs, or modified Spring Boot configuration properties. In JavaScript frameworks, it appears as outdated npm packages or React/Angular patterns no longer recommended. This type of programming error still compiles and often runs. In time, it produces incorrect behaviors or warnings that eventually become errors. Explicitly verifying that generated code uses current APIs, not just APIs that exist, is a new review step that was largely unnecessary when developers wrote from their own current knowledge and chose their technology stacks manually.

**Edge cases and error states are often missing.** AI attempts to generate to the exact specifications requested. If the prompt describes the normal case, the code handles the normal case. AI-generated code often fails to account for empty inputs, missing records, null foreign keys, concurrent modifications, and unauthorized access, because these use cases were not in the prompt. In the past, a developer would know from experience to add null checks and error states while writing. With AI, those instincts are not part of the code writing process. While already good practice, negative-path and boundary-condition testing have become necessary to compensate for this gap.

**Code that looks right but behaves wrongly.** AI-generated code usually follows the right patterns, appears syntactically correct, triggers no IDE error or warning, and passes a surface review. However, it also may contain subtle logic errors, incorrect calculations, or wrong data transformations. These are harder to catch than compile errors. Tests that verify actual output values, not just that the code runs without error, matter more than they used to.

## The net effect

The testing requirements have not decreased with AI tools. While writing is quicker, verification in turn needs more attention than ever. A team which adopts AI-generated code without investing in test coverage will accumulate hidden defects faster than ever before, because the volume of generated code increases while the careful line-by-line thinking that handwriting enforces is removed.

If your team is using AI tools heavily, factor in time for proper testing and human verification.

## AI as an assistant, not a replacement

The most useful mental model for AI in a development workflow is not "a tool that writes code for you" but "an assistant that handles the mechanical aspects while you focus on decision-making."

The decision-making parts have not changed. Choosing whether a feature should be implemented at the frontend or the backend is still a design decision. Deciding how to structure data for long-term maintainability is still an architectural decision. Interpreting the user requirements and finding technical responses to them are still domain knowledge questions. Debugging production issues which only occur under specific conditions is still a debugging problem which requires understanding the code and the codebase.

**AI makes competent developers faster. It does not make inexperienced developers competent. And a codebase built primarily by AI without skilled human oversight tends to become harder to maintain over time because of architectural decisions that accumulate over successive AI-generated features without oversight.**

The frameworks that will serve teams best in this environment are the ones that are opinionated enough to keep AI-generated code consistent, well-documented enough to give AI tools accurate context, and mature enough that the patterns they use are well-represented in training data. Being easy to verify and test matters more, not less, in an AI-assisted workflow.
