---
author: jameschu
date: 2026-10-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Add a Code Editor to Your App with One ZUL Component"
---

**Add syntax-aware editing to configuration, query, template, and developer-tool screens with standard ZK binding and events.**

## A Code-Oriented Input Component

Applications often contain editable SQL, JSON, XML, CSS, scripts, or Markdown. A multiline textbox can store the text, but it does not show the structure clearly.

ZK 11 adds Codeeditor, an in-page source editor with syntax highlighting. It exposes its content through value and participates in ZK binding and events like other input components.

![Java source displayed in a dark ZK Codeeditor with syntax highlighting and line numbers.](/assets/images/small-talk/zk11-sneak-peek/codeeditor_demo.png)

*The running ZK 11 demo shows Codeeditor rendering Java with syntax highlighting and line numbers.*

## Add an Editor in ZUL

```xml
<codeeditor width="100%" height="320px"
            language="java"
            colorScheme="dark"
            lineNumbers="true"
            value="@bind(vm.source)"/>
```

The preview supports plain text, HTML, XML, Java, JavaScript, CSS, JSON, SQL, and Markdown. colorScheme selects a light or dark editing surface. lineNumbers and tabSize adjust the editor for the content being edited.

## Use Normal Binding and Events

value loads and saves the source text. onChanging reports the current content while the user edits, and onChange fires after a modified value is committed. This allows validation or preview behavior to use the same server-side flow as the rest of the page.

```xml
<codeeditor language="json"
            value="@bind(vm.configuration)"
            onChanging="@command('updatePreview')"/>
```

readonly keeps the content focusable and copyable without allowing changes. disabled prevents both focus and editing when the surrounding workflow is unavailable.

## Where It Fits

Codeeditor is useful in administration and developer-facing screens: a SQL query console, a JSON rule editor, an XML mapping page, a Markdown content form, or a read-only payload viewer.

It is not intended to replace a desktop IDE. The component provides a focused editor inside an application that already owns the validation, authorization, save operation, and execution rules.

## Community Edition Availability

Codeeditor is included in ZK Community Edition. Teams can add the editor without introducing a separate client-side wrapper and can keep application logic in their existing ViewModels or controllers.

Before enabling execution of SQL or scripts, continue to apply the application's normal authorization, validation, and sandboxing rules. Syntax highlighting improves editing; it does not make submitted content safe to execute.

## Summary

This ZK 11 feature provides:

- Syntax highlighting through one ZUL component
- Support for common code, markup, data, and document formats
- MVVM value binding and standard input events
- Read-only, disabled, line-number, tab-size, and color-scheme options

## Plan Where It Fits

Codeeditor is available in ZK 11 preview builds. Consider screens where users currently edit structured text in a multiline textbox. Configuration and template editors are good first candidates because the surrounding application already supplies save, validation, and access-control logic.

## Resources

- [ZK Component Reference](https://docs.zkoss.org/zk_component_ref/)
- [MVVM Data Binding](https://docs.zkoss.org/zk_mvvm_ref/data_binding/)
- [ZK GitHub repository](https://github.com/zkoss/zk)
- [ZK Forum](https://forum.zkoss.org/)

