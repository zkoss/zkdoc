---
author: hawk
date: 2025-10-15
version: 10.0.0
category: small-talk
title: "We Tested Context7 with ZK Documentation — Here's What We Learned"
---

# The Story

Recently, I came across a few articles about AI-assisted coding tools and noticed a lot of discussion around [Context7](https://context7.com/). The idea sounded promising — Context7 allows developers to feed documentation directly to AI models, improving their understanding of specific frameworks and libraries.

That made us curious: could Context7 help AI models provide better answers for ZK Framework developers? We decided to find out.

# Executive Summary

We ran a controlled experiment to see if [Context7 MCP server](https://github.com/upstash/context7) could improve AI-generated answers to ZK Framework questions. Our setup was straightforward: using the same AI model (Claude Code) with two conditions — with and without Context7 MCP server — across ten common ZK questions.

## Expected Result 
Context7 should help by providing up-to-date documentation.

## Actual Result
- Without Context7: 73.8% (PASS)
- With Context7: 59% (FAIL)
- **Performance decreased by about 15 percentage points when using Context7**

## Why This Matters
- Context7 is popular in the AI coding community
- Understanding when it works (and doesn't) helps developers choose the right tools
- Highlights the importance of how documentation retrieval systems interact with AI models

# Background: What is Context7?

Context7 is an MCP (Model Context Protocol) server by Upstash that automatically retrieves documentation for over 33,000 libraries. Used by AI coding assistants like Cursor and Claude Code, it promises "up-to-date, version-specific documentation".

**How Context7 Works** (based on their [official documentation](https://github.com/upstash/context7)):
- Dynamically retrieves documentation from source repositories when triggered
- Detects the specific library mentioned in prompts
- Fetches version-specific documentation and code examples
- Injects relevant documentation directly into the AI model's context

**What Context7 provides**:
- Up-to-date code snippets and examples
- Version-specific documentation
- Focused on providing current information to prevent AI hallucinations

**Important Note**: The exact internal architecture (how Context7 parses, indexes, and retrieves documentation) is not publicly documented. Based on community research and reverse engineering efforts (see [this Reddit discussion](https://www.reddit.com/r/ClaudeAI/comments/1muoes4/)), Context7 appears to use some form of semantic search and snippet extraction, but the specific implementation details remain proprietary.

**Critical Note**: ZK documentation already works well with Claude Code directly. Our test focused specifically on Context7's retrieval quality.

# The Experiment Design

**Creating the Test**:

First, I used Claude Code to create 10 common ZK Framework questions and their correct answers by searching and reading the official ZK documentation directly. This became our answer key.

**Control Group** (Baseline - Without Context7):
- AI: Claude Code (Claude Sonnet 4.5)
- Documentation: None - answers based on the AI model's own knowledge
- Method: Claude answers questions without accessing any documentation

**Test Group** (With Context7):
- AI: Claude Code (same model)
- Documentation: Via Context7 MCP server only
- Method: Context7 retrieves ZK documentation snippets, Claude answers using those snippets combined with its own knowledge
- Note: Claude Code did NOT search ZK documentation directly in this test

**The 10 Questions**:
1. How to upgrade ZK from version 8 to version 10?
2. What is MVVM in ZK and how do I enable it?
3. How do I display a list of data in a Listbox component?
4. How do I load my own zk-label.properties for internationalization?
5. What is the difference between MVC and MVVM in ZK?
6. What is ID Space in ZK and how does it work?
7. How do I create a macro component in ZK?
8. How do I enable sorting in a Listbox?
9. How does ZK prevent CSRF (Cross-Site Request Forgery) attacks?
10. How do I handle events between components in ZK?

**Evaluation Method**:
- Use Claude code to give scores based on the answer key from actual ZK documentation
- Score each answer 0 ~ 100 based on:
    - Technical accuracy
    - Completeness
    - Correctness of examples
    - Actionability

# The Results: Context7 Made Things Worse

## Overall Scores:

| Metric | Without Context7 | With Context7 | Change |
|--------|-----------------|---------------|--------|
| **Total Score** | 738/1000 (73.8%) | 590/1000 (59%) | **-148 (-15%)** |
| **Result** | ✅ PASS | ❌ FAIL | Certification failed |
| **Questions worse** | - | 8 out of 10 | 80% degradation |
| **Questions same** | - | 2 out of 10 | 20% neutral |
| **Questions better** | - | 0 out of 10 | **0% improvement** |

**Not a single question improved with Context7.**

## Question-by-Question Results:

| Question | Without Context7 | With Context7 | Change |
|----------|-----------------|---------------|--------|
| Q1: Upgrade 8→10 | 55% | 35% | **-20** ⚠️ |
| Q2: MVVM | 85% | 85% | 0 |
| Q3: Listbox data | 70% | 70% | 0 |
| Q4: i18n properties | 45% | 25% | **-20** ⚠️ |
| Q5: MVC vs MVVM | 90% | 80% | -10 |
| Q6: ID Space | 75% | 55% | **-20** ⚠️ |
| Q7: Macro component | 80% | 75% | -5 |
| Q8: Listbox sorting | 88% | 65% | **-23** ⚠️ |
| Q9: CSRF security | 65% | 20% | **-45** 🔴 |
| Q10: Event handling | 85% | 80% | -5 |

# What This Means for ZK App Developers

**Should You Use Context7 with ZK?**

**For These Questions**: ❌ Not Recommended
- How to upgrade ZK?
- How does security work?
- Configuration setup
- Architectural concepts

**For These Questions**: ✅ Might Help
- Quick syntax lookups
- Component creation examples
- Simple API references

**Better Approaches for ZK**:

1. **Use Claude Code directly** (without Context7)
    - Currently gives better results
    - Can search full documentation
    - Understands complete guides

2. **Search ZK documentation yourself**
    - Visit official docs at zkoss.org
    - Use site search for specific topics
    - Read complete guides for complex topics

3. **Ask in ZK Community**
    - [Forum](https://forum.zkoss.org/)
    - Get human expertise for complex questions

**The Silver Lining**:
- This test validates that ZK documentation is comprehensive and reliable
- AI models CAN already answer ZK-related questions well when given direct access to documentation
- The issue lies in how documentation is retrieved, not in its quality

# Conclusion

**Key Message**:
This isn't about Context7 being bad — it's about understanding when tools fit your use case. Context7 excels at API references but struggles with comprehensive guides. For ZK Framework questions, direct documentation access works better.

**Takeaway for Community**:
- Test tools before adopting
- Compare with baseline
- Share findings transparently
- Choose tools that match your needs

**What We Learned**:
- Not all popular tools fit all frameworks
- Documentation retrieval matters as much as content
- Transparency builds trust and helps community


**Note**: AI tooling evolves quickly, and future versions of Context7 or similar systems may perform differently. The results shared here reflect the state of the tools as of October 2025.

# Looking Forward: Exploring Better Solutions

While Context7 didn’t perform well in this test, the experiment highlighted an important trend — AI-assisted development is becoming part of everyday workflows. As developers increasingly use AI tools, we see value in making ZK’s resources more accessible to both humans and machines.

This doesn’t mean shifting focus away from ZK itself. Rather, it’s about improving how information is discovered, understood, and applied — no matter the tool developers choose.

**What We Plan to Explore Next**:

**1. Claude Code Custom Commands**
- ZK-specific slash commands for common tasks
- Pre-configured prompts that guide Claude to the right documentation
- Quick access to frequently used information

**2. Custom MCP Servers**
- A ZK-optimized MCP server that understands our documentation structure
- Prioritize comprehensive guides over isolated snippets
- Include semantic understanding of ZK-specific concepts (MVVM, ID Space, etc.)

**3. Enhanced Documentation Structure**
- Add metadata to make documentation more AI-friendly
- Create quick-reference guides alongside comprehensive documentation
- Structured data formats for better machine parsing

**Our Goal**: To make ZK’s documentation experience as smooth and accessible as possible — whether you’re reading it directly or using AI tools to help your workflow.

**Want to Contribute?**
- Have ideas for better documentation delivery?
- Experience with building MCP servers or IDE plugins?
- Feedback on what would help your development workflow smoother?

Reach out to us at info@zkoss.org. We're open to collaboration and always eager to hear from developers using ZK Framework.

# Repository 
[ZK Framework Official Documentation Repository](https://github.com/zkoss/zkdoc)


