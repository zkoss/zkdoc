---
title: "Tbeditor"
---

- **Demonstration:** [Tbeditor](https://www.zkoss.org/zkdemo/input/rich_text)
- **Java API:** [Tbeditor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Tbeditor.html)
- **JavaScript API:** [Tbeditor](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.tbeditor.Tbeditor.html)

{% include edition-availability.html edition="pe" %}

{% include supported-since.html version="8.0.0" %}

# Employment/Purpose

Tbeditor is a rich text editor to be used inside web pages. It's a
WYSIWYG editor, which means that the text being edited on it looks as
similar as possible to the results users have when publishing it.

The component wraps [Trumbowyg](http://alex-d.github.io/Trumbowyg/)

## Common Use Cases

- **Blog and CMS authoring** — embed `tbeditor` wherever users compose HTML content (blog posts, product descriptions, announcements) and bind `value` to a ViewModel property to persist the HTML markup.
- **In-line comment / note fields** — drop `tbeditor` into a form alongside structured fields when the note field needs lightweight rich-text formatting (bold, italic, links) without the weight of a full document editor.
- **Configurable toolbar** — use the `config` property to restrict the toolbar to exactly the buttons relevant to your use-case (e.g. only `bold`, `italic`, `link`) so the editor stays uncluttered.

## Bundled Versions

| ZK     | Trumbowyg    |
|--------|--------------|
| 10.3.0 | 2.31        |
| 9.6.0 | 2.7.2        |
| 8.5.0  | 2.6          |
| 8.0.0  | 2.0.0-beta.2 |

# Example

![](/zk_component_ref/images/Zkcompref_tbeditor.png )

```xml
<tbeditor id="tb" value="this is a demo for &lt;b&gt;trumbowy&lt;/b&gt; editor!!" />
```

# Properties

## value

**Default Value:** `""` (empty string)

Sets the editor's HTML content. You may include HTML tags to decorate the text; the editor renders them as formatted output. The current content is returned by `getValue()` as an HTML string.

```xml
<tbeditor value="Hello, &lt;b&gt;world&lt;/b&gt;!"/>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onChange` | [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) | Denotes that the content of the component has been modified by a user |
| `onChanging` | [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) | Denotes that a user is changing the content of an input component. Notice that the component's content (at the server) won't be changed until `onChange` is received. Thus, you have to invoke the `getValue` method in the `InputEvent` class to retrieve the temporary value. |

# Supported Children
`*NONE`
