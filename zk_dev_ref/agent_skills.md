---
title: Agent Skills
description: "Agent Skills are specialized capabilities that can be added to AI coding agents to enhance their performance on specific technical tasks."
---

# Agent Skills for ZK Development

Agent Skills are specialized capabilities that can be added to AI coding agents to enhance their performance on specific technical tasks. They provide framework-specific coding guidance, architectural best practices, and automated workflows.

## zul-writer

`zul-writer` is a powerful agent skill designed specifically for ZK developers to accelerate UI development and ensure code quality.

Instead of manually creating ZUL files and composer classes, `zul-writer` can generate them automatically based on either:
* Natural language descriptions of your UI requirements
* UI screenshots or mockups (via Visual Analysis)

The skill follows a rigorous 5-step workflow to ensure the generated code meets your project's needs:
1. **Clarify Requirements**: Analyzes your ZK version, the page's purpose, and your preferred design pattern (MVC or MVVM).
2. **ZUL Generation**: Generates a clean ZUL file, prioritizing ZK components over native HTML and using best practices for flexible sizing.
3. **Automated Validation**: Enforces code quality through an integrated script that checks for XML well-formedness, XSD schema compliance, and ZK component compatibility.
4. **Controller Generation**: Generates the corresponding Java controller class (a `ViewModel` or `SelectorComposer`), ready to be wired to your UI.
5. **Preview & Self-Review**: Renders the page in a real browser through ZK's own engine, measures the resulting layout, and checks the image against your requirements before handing the files over.

Each step is also an entry point on its own, so you can ask for just a validation, just a controller, or just a preview of an existing page.

Note that zul-writer also supports a Java-first approach — simply instruct it to generate a minimal ZUL with only a root component and build the UI programmatically in the Composer.

### Further Reading

For a detailed introduction, installation instructions, and a showcase of generated ZK UIs, please refer to the article:
[Accelerate ZK Development with the AI Agent Skill: zul-writer](/small-talk/2026/03/16/accelerate-zk-development-with-agent-skills-zul-writer.html)

For the rendered-preview feedback loop added in zul-writer 2.0, see:
[zul-writer 2.0: Letting the AI See the ZUL Page It Just Wrote](/small-talk/2026/09/01/zul-writer-2-preview-feedback-loop.html)
