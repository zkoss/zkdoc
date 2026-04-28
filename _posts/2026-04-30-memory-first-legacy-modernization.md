---
author: Jumper Chen
date: 2026-04-28
version: ZK 10
category: small-talk
title: "Turning a 2-Year Blocker into a Structured, AI-Assisted Migration"
---


## Overview

Everyone in enterprise software knows the feeling. Somewhere in your organization, there's a Java application that nobody wants to touch. It works — mostly. It runs on a JDK version that went end-of-life years ago. Its framework hasn't been upgraded in the better part of a decade. The original developers have long moved on. And every quarter, someone asks: *"Can we upgrade it?"* — followed by silence.

We lived this story ourselves. And then we found a way out — not by throwing more engineers at the problem, but by teaching AI to remember everything we'd ever learned.

## The Application Nobody Wanted to Upgrade

ZK Fiddle is a 13-year-old web application built on the ZK framework. By the numbers: 188 Java classes, 15 ZUL pages, 5 custom UI components, and 5 Maven modules — a fairly typical enterprise Java project. It had been running on ZK 8.6.4, Jetty 9, and JDK 1.6 for years.

In early 2024, we set a six-week window to modernize the stack. We successfully upgraded the infrastructure layer, including JDK 1.6 to 11 and Jetty 9 to 10 — within the first three weeks. However, when we turned our attention to the UI framework and application migration, we hit three simultaneous roadblocks:

- **Lost Institutional Memory:** The original developers who wrote the core ZK Fiddle logic in 2011 had long since moved on. We weren't just upgrading code; we were archeologists trying to understand *why* certain patterns were used.
- **Technical Depth:** Upgrading the framework isn't just about changing a library version. It requires auditing every Composer and JavaScript widget to ensure 100% feature parity. Without original context or comprehensive test coverage, the manual verification load was overwhelming.
- **The "Timebox" Constraint:** While we regularly help customers successfully migrate ZK versions, those projects have dedicated timelines. Here, we had only three weeks left to wrap it up.

As we reached the deadline, we had to make a tough call. The infrastructure changes stayed, but the framework migration — the part that required the most "human context" — was shelved.

It stayed shelved for **two years**. Not because it was impossible, but because the manual effort and the risk of the unknown didn't justify the cost. We had higher-priority features to build, and the "manual grind" simply wasn't the best use of our engineering time.

## The Real Problem Isn't Code. It's Knowledge.

Here's what we realized after 20 years of maintaining the ZK framework: the biggest barrier to legacy system modernization isn't technical complexity — it's **lost institutional knowledge**.

When an engineer sits down to upgrade a decade-old application, they're missing context that existed once but has since scattered:

- The Jira ticket from 2017 that explains *why* `GenericForwardComposer` was deprecated in favor of `SelectorComposer` and what wiring patterns need to change.
- The Git commit from 2019 that shows exactly how ZK's CSS class naming convention evolved — why `.z-combobox-pp` became `.z-combobox-popup` and what other suffixes changed along with it.
- The upgrade doc that maps every deprecated ZUL attribute to its replacement — like `src=` becoming `image=` on Button components.
- The test case that demonstrates the correct widget namespace registration pattern after ZK refactored its JavaScript API.

This knowledge isn't gone. It's sitting in your Jira, your Git history, your test suites, and your documentation. But it's **fragmented across thousands of records**, written in different formats, by different people, over many years. No single engineer can hold it all in their head. And traditional search tools can't connect the dots across these sources.

This is the problem we set out to solve.

## Institutional Memory as AI Context

We built an internal system called CaseFoundry to address the problem. The concept is simple but the implication is profound: **take 20 years of developer history and transform it into structured, searchable, AI-ready context.**

CaseFoundry ingests raw maintenance records from multiple sources — Git commits, Jira issues, test cases, upgrade documentation, and official framework docs. Each record goes through a refinement process that extracts structured diagnostic information: what component was affected, what the symptom was, what the root cause turned out to be, what the fix strategy was, and which versions are relevant.

The result is a knowledge base of over **20,000 structured cases**, each tagged with component anchors, logic patterns (like `DEPRECATED_API`, `COMPONENT_LIFECYCLE`, or `DATA_BINDING_MISMATCH`), and semantic embeddings that allow AI to find relevant historical precedents — even when the surface-level wording is completely different.

Critically, these cases are **cross-linked**. A Jira issue about a null pointer exception is connected to the Git commit that fixed it, which is connected to the test case that validates the fix, which is connected to the documentation that explains the new API. The AI doesn't just find one record — it finds the *full diagnostic chain*.

We then exposed this knowledge base through the **Model Context Protocol (MCP)** — an open standard that lets AI coding assistants like Claude Code, Cursor, and GitHub Copilot access external tools. When an AI agent encounters a problem during migration, it can query CaseFoundry to find historically similar cases, check upgrade checklists, review known breaking changes, and find working code examples — all without a human having to search for anything.

This is a crucial distinction: the AI isn't relying on whatever it learned during training, which may be years out of date. It's pulling from a **nightly-updated knowledge base** that reflects the latest fixes, the latest version compatibility data, and the latest migration patterns. The knowledge stays current even as the framework evolves.

We call this the **"Memory-First"** approach: before asking AI to write a single line of migration code, give it access to the full institutional memory of the framework.

## The Result: From Stalled Upgrade to a Systematic Migration Process

In the last week of March, we pointed Claude Code — equipped with CaseFoundry's MCP tools — at the same ZK Fiddle application whose ZK framework upgrade had been shelved for over two years.

The process didn’t start with code changes. It started with **planning**. Using CaseFoundry's `suggest_migration` tool, it produced a prioritized migration plan — identifying every breaking change between ZK 8.6.4 and 10.2.1, ordering them by dependency, and flagging the highest-risk areas (custom widgets, deprecated Composers, CSS theme changes) before writing a single line. This planning-first approach ensured that the migration followed a structured and traceable path, rather than a series of ad-hoc code changes. Instead of relying on ad-hoc code changes, the upgrade is performed through a structured, knowledge-driven process powered by CaseFoundry, with built-in validation at each step.

Then it executed. The migration was consolidated into a single, coherent change set — not by guessing, but by reconstructing the intent behind years of changes. Alongside the migration, it also delivered new feature enhancements, demonstrating that AI can handle modernization and feature development simultaneously. The migration execution progressed significantly faster than traditional manual approaches, enabled by a structured, AI-assisted process. Here's what the upgrade involved:

- **ZK 8.6.4 → 10.2.1** — the core framework upgrade that had been shelved for 2 years
- **Deep dependency realignment**: major dependency upgrades across Spring, Hibernate, and the Servlet API — spanning over a decade of version gaps
- **Deprecated dependencies removed**: `zuljsp` and `zcommons-el` — artifacts that no longer exist in the ZK 10 ecosystem
- **All Composers, DAOs, Filters, ZUL pages, CSS, and JavaScript** touched and migrated
- **5 custom components migrated**: including widget JavaScript that depends on internal ZK APIs undocumented in any upgrade guide
- **6 new REST API endpoints + Rate Limiter + AI Proxy** — built alongside the migration, not as a separate effort
- **47 test files / 384 test methods generated from scratch** — the original project had zero tests. Coverage spans JUnit unit tests, Spring DAO integration tests, and end-to-end WebDriver tests

Let's look at how this approach handled the most challenging aspects of the migration — because these are the exact scenarios that make framework migrations hard:

### Deprecated API Migration at Scale

Every Composer in the application — `CaseListComposer`, `LoginComposer`, `SandboxListComposer`, `ContentComposer`, `LeftReferenceComposer`, `SourceCodeEditorComposer`, and others — used `GenericForwardComposer`, which has been deprecated since ZK 6 in favor of `SelectorComposer`. This was not a simple find-and-replace. Instead, the migration followed established wiring patterns derived from historical cases. It rewired each Composer's event binding pattern correctly — replacing convention-based `onXxx$myid` methods with `@Wire` and `@Listen` annotations — because CaseFoundry contained the Jira tickets and commit examples showing exactly how the wiring model changed between the two approaches.

### CSS Class Renaming Across the Entire UI

ZK 10 systematically renamed its CSS classes (ex. `.z-combobox-pp` became `.z-combobox-popup`). These changes are scattered across dozens of files, and missing even one breaks the UI silently. All such occurrences were consistently identified and updated based on naming evolution patterns recorded in CaseFoundry.

### ZUL Attribute Migration

Seemingly small changes — like `src=` becoming `image=` on Button components — are the kind of thing that compiles fine but breaks at runtime. These changes were systematically identified and corrected across all ZUL pages, guided by the upgrade patterns captured in CaseFoundry.

### Custom Widget JavaScript

This is where most manual upgrades die. The custom `Rating` component had its widget namespace changed from `rating.Rating` to `zkfiddle.wgt.Rating` — a change required in 10 separate places within `Rating.js`. The `fiddletabs.js` widget needed its CSS selectors updated to match the new `-content` naming convention. These components had no migration documentation whatsoever — the original developer's design intent existed only in years-old Git commits. CaseFoundry's history of ZK's internal widget API evolution gave the AI the context to recover that intent and make the changes correctly.

### Dependency Chain Untangling

Upgrading ZK alone would have been insufficient. Spring had to jump from 3.0.5 to 5.3.39 — a gap of nearly 14 years and multiple major versions. Hibernate went from 3.6.4 to 5.6.15. The Servlet API moved from 2.4 to 3.1.0. Legacy libraries like `google-collections` were replaced with `Guava 33.2.1`, and obsolete ZK artifacts like `zuljsp` and `zcommons-el` were removed entirely. Each of these changes has its own cascade of API incompatibilities — these were resolved as an integrated whole through a structured migration approach.

## How We Verified the Migration

With the technical heavy lifting out of the way — the dependencies untangled and the custom JavaScript modernized — the core migration was finished. But moving an application forward by 14 years is a massive jump, and 'finished' isn't the same as 'production-ready.' We needed a solid way to prove that the AI's changes actually held up under real-world conditions. This is a critical part of the process — ensuring that migration outcomes are verifiable and not treated as a black box. Here's how we validated the result:

**Automated test coverage built from zero.** The original ZK Fiddle had no tests whatsoever. As part of the migration, the AI generated 47 test files containing 384 test methods, spanning three layers: JUnit unit tests for models and utilities, Spring-context integration tests for DAOs and service layers, and Selenium WebDriver end-to-end tests for critical user flows. These tests were then run against the migrated application to catch regressions.

**Manual smoke testing.** After automated tests passed, we performed hands-on verification of all major user flows — creating fiddles, executing code, sharing results — to confirm that the application behavior matched the pre-upgrade baseline.

**Incremental review.** Rather than treating the AI's output as a black box, we reviewed the migration diff section by section. The structured nature of CaseFoundry's knowledge meant the AI's changes were traceable — each modification could be mapped back to a specific upgrade rule or historical case, making the review process significantly faster than reviewing ad-hoc manual changes.

The result: ZK Fiddle is now running on ZK 10.2.1 in production.

## Why This Matters Beyond ZK

The "Memory-First" approach we describe here was developed in the context of ZK, but the underlying idea applies to any long-lived system.

Most enterprise applications already contain the knowledge needed for modernization — embedded in Git history, issue trackers, and documentation. The real challenge is not the lack of information, but the difficulty of accessing and connecting it.

CaseFoundry turns this fragmented history into structured, AI-accessible context, enabling relevant knowledge to be retrieved and applied during upgrades. As a result, modernization becomes less about rediscovering past decisions and more about applying what is already known.

## What's Next
*AI accelerates the process, while ZK experts ensure correctness and handle edge cases.*

**For ZK users:** If you're running an older version of ZK and have been putting off the upgrade to ZK 10, we're currently working with selected pilot projects to further refine and validate this structured migration approach in real-world scenarios.

This work builds on a knowledge base of over 20,000 structured cases derived from 20 years of ZK development history, which we've successfully applied in our internal migration. If you're interested in exploring whether this can apply to your application, we'd be glad to take a look together. **[→ Contact us for a migration assessment](https://forms.gle/sBJMxL4TgB7wxw7f9)**

**For enterprise teams with other legacy Java systems:** If you're interested in applying the "Memory-First" methodology to your own framework or platform — using your Git history, your issue tracker, and your test suites as the foundation for AI-assisted modernization — we're actively exploring how this approach could fit your environment. **[→ Explore applicability](https://forms.gle/5e8N4yQD8mBvoML78)**

If you have any other feedback or questions about this article, feel free to reach out to us at info@zkoss.org.

## Resources

- [ZK Documentation](https://www.zkoss.org/documentation) — Official ZK framework documentation
- [ZK GitHub Repository](https://github.com/zkoss/zk) — ZK framework source code
- [ZK Upgrade Guide](https://docs.zkoss.org/zk_dev_ref/upgrade_tips/version_upgrade) — Official migration reference
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) — The open standard powering CaseFoundry's AI integration
- [ZK Forum](https://forum.zkoss.org/) — Community support and discussion
