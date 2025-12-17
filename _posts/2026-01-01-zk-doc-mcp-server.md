---
author: hawk
date: 2026-01-01
version: any zk version
category: small-talk
title: "ZK Doc MCP Server: Bringing Accurate ZK Knowledge to your AI Assistants"
---

# Introduction

## The IDE-Centric approach
When we first explored how to improve the accuracy for AI-assisted ZK development, we started with an IDE-centric approach. In the article [Empower Your AI with ZK Knowledge to Boost Development](https://www.zkoss.org/wiki/Small_Talks/2025/July/Empower_Your_AI_with_ZK_Knowledge_to_Boost_Development), we showed how developers could load ZK documentation into IDE tools like Cursor so that AI assistants could better understand ZK concepts.
This approach worked reasonably well, but it also had clear limitations. It required IDE-specific setup, manual downloading of documentation, and ongoing maintenance. In addition, searching was mostly keyword-based, which made it harder for AI tools to understand developer intent or retrieve the most relevant content.
To address these issues, we next evaluated an MCP server–based solution.
## The Context7 Experiment
In our [follow-up test](https://docs.zkoss.org/small-talk/2025/10/15/we-tested-context7.html), we evaluated Context7, a general-purpose MCP server designed to retrieve library documentation. When tested with ZK-specific questions, Context7 achieved only 59% accuracy.
It performed well for basic tasks such as finding API references, method signatures, and class structures. However, it struggled with more practical questions ZK developers often ask—such as framework architecture, component lifecycles, best practices, and how ZK’s server-centric model interacts with client-side rendering.
This highlighted an important limitation: a generic documentation MCP server is not enough for framework-specific development. ZK requires deeper contextual understanding that goes beyond simple API lookups.

# Introducing the ZK Doc MCP Server
To overcome these limitations, we built the ZK Doc MCP Server, an MCP server designed specifically for ZK documentation.
In our tests, the ZK Doc MCP Server achieved 92.2% accuracy on the same ZK-related questions — an improvement of 33.2% compared to Context7. This improvement comes from ZK-specific document indexing, semantic search tuned for framework concepts, and relevance-based result ranking.
Instead of returning isolated snippets, the server provides richer, more contextual documentation content to AI assistants. It also removes the need for IDE-specific configuration or local documentation maintenance.
At a high level, the ZK Doc MCP Server acts as a bridge between AI assistants and official ZK documentation. When you ask an AI tool a ZK-related question, the server searches authoritative ZK sources and returns framework-specific information that the AI can use to generate better answers.

## The Test: Same Questions, Better Results
We evaluated Claude with the ZK Doc MCP Server against the same 10 questions used in our previous Context7 assessment. This direct comparison reveals how accurate documentation access transforms AI assistance for ZK development.

### Questions Evaluated

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

### Results: Significant Improvement

| Metric                     | ZK Doc MCP | Context7 | Improvement |
|----------------------------|------------|----------|-------------|
| **Overall Score**          | 92.2%      | 59%      | **+33.2%**  |
| Excellent Responses (90%+) | 9/10       | 2/10     | +7          |

| Metric                     | ZK Doc MCP | AI Model Only | Improvement |
|----------------------------|------------|---------------|-------------|
| **Overall Score**          | 92.2%      | 73.8%         | **+18.4%**  |
| Excellent Responses (90%+) | 9/10       | 1/10          | +8          |

"AI Model Only" means not using any zk-specific knowledge, neither zk mcp or context7 mcp, but just relies on AI model’s internal knowledge.

### Individual Question Performance

| Question | Topic | Score |
|----------|-------|-------|
| 1 | ZK Upgrade v8 to v10 | 95/100 |
| 2 | MVVM in ZK | 95/100 |
| 3 | Listbox Data Display | 85/100 |
| 4 | Internationalization Labels | 90/100 |
| 5 | MVC vs MVVM Difference | 95/100 |
| 6 | ID Space | 90/100 |
| 7 | Macro Component | 92/100 |
| 8 | Listbox Sorting | 95/100 |
| 9 | CSRF Prevention | 92/100 |
| 10 | Event Handling | 93/100 |

**Total Score: 922/1000 (92.2%)**

# MCP Server Installation and Configuration
Installation and configuration are straightforward. You can use it with any AI that supports MCP servers. The setup typically requires just a few lines of configuration — no complex dependencies or infrastructure changes needed.
See [ZK Documentation MCP Server](/zk_dev_ref/zk_doc_mcp_server) for step-by-step instructions.

# How to Use the ZK Doc MCP Server
## Ask ZK related questions
The ZK Doc MCP Server integrates seamlessly with your AI coding assistant. When you ask questions about ZK Framework, the assistant automatically searches relevant documentation and provides accurate answers grounded in official sources.

```txt
in zk, which pattern should I use, mvc or mvvm ?
```
Other useful prompts include:

```text
How do I implement MVVM in ZK?
```

```text
Find examples of data binding in ZK
```

The assistant determines when to search automatically, ensuring you always get current, accurate ZK documentation without manual lookups.

## Search doc
You can also explicitly request searches using prompts like:

```txt
search zk doc for "What is ID Space"
```
## Show doc source content

Then, the AI assistant summarizes the query results for you. If you need deeper context, request the full source content:

```txt
show me the source doc content
```

## Submit feedback
We hope this tool helps you develop faster and more easily. If the search results don’t meet your expectations, we encourage you to submit feedback so we can improve the ZK documentation. Your feedback is saved locally and automatically submitted as a GitHub issue at https://github.com/zkoss/zkdoc/issues, allowing our documentation team to identify gaps and improve content based on real developer needs.

```txt
submit feedback about the search results - they didn't cover MVVM pattern implementation
```

## Show MCP server setting
Inspect your current ZK Doc MCP Server configuration to verify setup or debug connection issues. This displays all environment variables, configuration paths, and effective settings in use.

```txt
show zk doc mcp settings
```
# Roadmap
The ZK Doc MCP Server currently focuses on semantic search across official ZK documentation, allowing AI assistants to retrieve relevant guides, references, and examples.
Looking ahead, we are exploring several possible improvements, such as:
further tuning search relevance for common development tasks
keeping documentation content aligned with future ZK releases,
extending search coverage to API and Javadoc references,
and improving how example code is surfaced for common use cases.
Your feedback will help us understand which areas are most important to you, so we can focus on what brings the most value in future improvements.

# Conclusion
The ZK Doc MCP Server significantly improves AI-assisted ZK development by grounding answers in official documentation. With 92.2% accuracy, it delivers more reliable and practical results than general-purpose documentation servers.
For ZK developers, this means fewer misleading answers, less time spent verifying AI output, and faster access to relevant framework knowledge.
If you’re interested in trying it out, see the ZK Doc MCP Server installation guide. We welcome feedback and suggestions through GitHub, as community input helps us continuously improve both the documentation and the tooling around it.


