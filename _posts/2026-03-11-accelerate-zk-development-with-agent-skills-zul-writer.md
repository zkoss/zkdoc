---
author: hawk
date: 2026-03-11
version: ZK 9/10
category: small-talk
title: "Accelerate ZK Development with zul-writer"
---

Modern AI coding agents like Claude Code and Gemini CLI are transforming how we write code, but they often lack the specialized knowledge like ZK. That's where [Agent Skills](https://agentskills.io/) come in. Agent skills are specialized capabilities that can be added to AI coding agents to enhance their performance on specific technical tasks, providing framework-specific coding guidance and architectural best practices.

In this small talk, we introduce **zul-writer**, a powerful agent skill designed specifically for ZK developers to accelerate UI development and ensure code quality.

# What Zul-writer Does

The zul-writer is more than just a code generator; it implements a structured workflow to guide developers from initial requirements to a fully functional controller.

## Flexible Entry: Text or Image
The zul-writer is designed to be versatile. You can start with a simple **text prompt** describing your requirements, or leverage its **Visual Analysis** capability by providing a UI screenshot or mockup. When an image is provided, the skill analyzes the layout, identifies components, and plans a strategy for the ZUL implementation, mapping visual elements to ZK components (such as `<borderlayout>`, `<vlayout>`, or `<grid>`).

## A Structured 4-Step Workflow
The skill follows a rigorous process to ensure the generated code meets your project's needs:

1.  **Clarify Requirements**: Instead of guessing, the skill asks targeted questions about your ZK version, the page's purpose (e.g., data entry form vs. dashboard), and your preferred design pattern (MVC or MVVM).
2.  **ZUL Generation**: Based on the clarified requirements, it generates a clean ZUL file, prioritizing ZK components over native HTML and using best practices for flexible sizing (`hflex`/`vflex`).
3.  **Automated Validation**: Code quality is enforced through an integrated validation script (`validate-zul.py`). This script checks for XML well-formedness, XSD schema compliance, and common pitfalls like misplaced attributes or ZK 10 compatibility issues.
4.  **Controller Generation**: Finally, it generates the corresponding Java controller class—a `ViewModel` for MVVM or a class extends `SelectorComposer` for MVC—ready to be wired to your UI.

# Installation

Installing zul-writer skill is straightforward using the Agent Skills CLI. Run the following command in your terminal:

```bash
npx skills add zkoss-demo/agent-skill
```

This command will guide to install zul-writer into your AI coding agents.

# Usage in AI Coding Agents

Once installed, you can use the skill directly within AI coding agents. For example, in Claude Code:

## Create zul from text
```text
/zul-writer create a user profile form with validation in MVVM pattern
```

```text
/zul-writer A centered login box with a logo, a decorative landscape image,
 and input fields for organization, username, and password. 
 Includes "Forgot Password" and "Login" buttons.
```
If you don't specify the pattern, it will ask you to choose one.

## Create zul from image
Just specify a screenshot:
```text
/zul-writer @my-ui-screenshot.png
```

The assistant will then guide you through the 4-step workflow to produce your files.

# Showcase Project

To see Zul-writer in action, check out the [Zul-writer Showcase](https://github.com/zkoss-demo/agent-skill/tree/main/zulwriter-showcase). This repository features a collection of real-world UIs generated entirely by the skill. These examples demonstrate how the skill handles complex layouts, nested components, and different ZK patterns.

Below are a couple of examples of what Zul-writer can generate from UI screenshots generate by Google Stitch :

## App Tracker Dashboard
**Screenshot From Stitch**

![Bank Reconciliation Dashboard](/assets/images/small-talk/zul-writer/Bank Reconciliation Dashboard.png)

**Generated ZUL**

Check out the generated ZUL: [bank-reconciliation.zul](https://github.com/zkoss-demo/agent-skill/blob/main/zulwriter-showcase/src/main/webapp/bank-reconciliation.zul)

![Bank Reconciliation Dashboard](/assets/images/small-talk/zul-writer/bank-reconciliation-zul.png)


## Enterprise Kanban Board
**Screenshot From Stitch**

![Enterprise Kanban Board](/assets/images/small-talk/zul-writer/enterprise-kanban-board.png)

**Generated ZUL**

Check out the generated ZUL: [kanban-board.zul](https://github.com/zkoss-demo/agent-skill/blob/main/skills/zul-writer/assets/kanban-board.zul)

![Enterprise Kanban Board by zul](/assets/images/small-talk/zul-writer/enterprise-kanban-zul.png)

By leveraging Zul-writer, you can significantly reduce the initial time spent on UI code and quickly focus on the core business logic of your ZK applications. Give it a try and experience the power of specialized agent skills!

# Welcome Feedback

If you have any questions or would like to share your experience with Zul-writer, we welcome you to start [a discussion on the ZK Forum](https://forum.zkoss.org/) or you can create a [GitHub issue](https://github.com/zkoss-demo/agent-skill/issues) to report bugs or suggest new features.
