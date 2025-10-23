
Leveraging AI models like GPT, Gemini, or Claude can significantly accelerate your ZK application development. However, to get the best results, it's crucial to guide these models effectively. This guide outlines our recommended approach for integrating AI into your ZK development workflow.

# Our Recommendation: Spec-Driven Development

While it might be tempting to ask an AI to "build a login page" (a practice often called "vibe coding"), this approach can lead to unpredictable and often incorrect results. We strongly advocate for **Spec-Driven Development**.

This means you first define a clear specification for the feature you want to build. This specification should outline the requirements, behaviors, which pattern to apply (MVC/MVVM). Then, you provide this specification to the AI model and ask it to generate the code, including automated tests.

**Benefits of Spec-Driven Development:**

*   **Predictability:** A detailed spec leaves less room for the AI to make incorrect assumptions.
*   **Verifiability:** The generated code can be tested against the spec to ensure it meets the requirements.
*   **Maintainability:** The spec serves as documentation for the application.

You can write these specifications manually or use tools designed for this purpose, such as [openspec](https://openspec.dev/) or [spec-kit](https://github.com/github/spec-kit).


# Empower AI models with ZK knowledge

Currently, we provide a rule-based approach, so you can tell an AI model to read the rules and help you develop zk application with zk document as its knowledge base.

For more details on this approach, see [Empower Your AI with ZK Knowledge to Boost Development](https://www.zkoss.org/wiki/Small_Talks/2025/July/Empower_Your_AI_with_ZK_Knowledge_to_Boost_Development).

# ZK's Role: A UI Framework

It's important to understand that ZK is a UI framework and does not provide any built-in APIs for communicating with AI models (LLMs) like ChatGPT, Gemini, or Claude. You are responsible for managing the interaction with these models.

# The Ever-Evolving AI Landscape

The world of AI is changing at a breakneck pace. The tools and techniques mentioned in this guide are current as of its writing, but new and better methods may emerge. Please check this page from time to time again in the future.