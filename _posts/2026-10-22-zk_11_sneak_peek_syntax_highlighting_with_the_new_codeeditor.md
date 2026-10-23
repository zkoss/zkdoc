---
author: jameschu
date: 2026-11-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Syntax Highlighting with the New Codeeditor"
---

**Add syntax-aware editing to configuration, query, template, and developer-tool screens with standard ZK binding and events.**

## A Code-Oriented Input Component

Applications often contain editable SQL, JSON, XML, CSS, scripts, or Markdown. A multiline textbox can store the text, but it does not show the structure clearly.

ZK 11 introduces Codeeditor, an in-page source editor with syntax highlighting that users can use to view and edit code directly in your application.

![Java source displayed in a dark ZK Codeeditor with syntax highlighting and line numbers.](/assets/images/small-talk/zk11-sneak-peek/codeeditor_demo.png)

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

Use Codeeditor for a JSON configuration editor, an XML mapping page, a Markdown content form, or a read-only payload viewer. Syntax highlighting makes structured content easier to read and edit, while standard ZK binding and events let you connect it to your application logic.

## Summary

This ZK 11 feature provides:

- Syntax highlighting through one ZUL component

- Support for common code, markup, data, and document formats

- MVVM value binding and standard input events

- Read-only, disabled, line-number, tab-size, and color-scheme options

## Try It in ZK 11 Eval Freshly

ZK 11 is coming soon, and you can preview Codeeditor in the latest ZK 11 Eval Freshly build (11.0.0.FL.20261021-Eval). Codeeditor is included in ZK Community Edition.

To try it in your existing ZK application, update your Maven `pom.xml` with the following configuration:

**1. Add the ZK Evaluation Maven Repository**

```xml
<repositories>
    <repository>
        <id>ZK Evaluation</id>
        <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
</repositories>
```

**2. Update your ZK version and ZUL dependency**

```xml
<properties>
    <zk.version>11.0.0.FL.20261021-Eval</zk.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zul</artifactId>
        <version>${zk.version}</version>
    </dependency>
</dependencies>
```

Make sure all ZK dependencies use the same evaluation version to avoid version conflicts.

Once configured, replace a multiline textbox that holds JSON, SQL, XML, or Markdown with Codeeditor. Configuration and template editors are good first candidates because the surrounding application already supplies save, validation, and access-control logic.

For more details, see the [ZK Maven Setup Guide](https://docs.zkoss.org/zk_installation_guide/maven_setup).

## Resources

- [ZK Component Reference](https://docs.zkoss.org/zk_component_ref/)

- [MVVM Data Binding](https://docs.zkoss.org/zk_mvvm_ref/data_binding/)

- [ZK GitHub repository](https://github.com/zkoss/zk)
