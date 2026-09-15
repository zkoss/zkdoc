---
title: "Codeeditor"
description: "Codeeditor provides an in-page source code editor with syntax highlighting."
---

- **Demonstration:** [Code Editor](https://www.zkoss.org/zkdemo/input/code_editor)
- **Java API:** [org.zkoss.zul.Codeeditor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Codeeditor.html)
- **JavaScript API:** [zul.code.Codeeditor](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.code.Codeeditor.html)

{% include edition-availability.html edition="ce" %}
{% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Codeeditor` provides an in-page source code editor with syntax highlighting. Use it to edit configuration, scripts, queries, templates, and other source text without integrating a separate JavaScript editor.

The component synchronizes its content with the server through the `value` property and standard input events, so it also works with ZK data binding.

# Example

Set `language` to enable syntax highlighting and `colorScheme` to select the editor's light or dark appearance:

```xml
<codeeditor width="100%" height="300px"
            language="java" colorScheme="dark">
    <attribute name="value"><![CDATA[
public class Greeting {
    public static void main(String[] args) {
        System.out.println("Hello, ZK 11!");
    }
}
    ]]></attribute>
</codeeditor>
```

# Properties

## Value

**Default Value:** `""`

`value` contains the source text. Assigning `null` resets it to an empty string. You can bind it like other input values:

```xml
<codeeditor value="@bind(vm.source)" language="java"/>
```

## Language

**Default Value:** `plain`

`language` selects the syntax highlighter. Changing it also updates an existing editor without replacing its value.

| Value | Language |
|---|---|
| `plain` | Plain text without syntax highlighting |
| `html` | HTML |
| `xml` | XML |
| `java` | Java |
| `javascript` | JavaScript |
| `css` | CSS |
| `json` | JSON |
| `sql` | SQL |
| `markdown` | Markdown |

## ColorScheme

**Default Value:** `light`

`colorScheme` controls only the editor surface and syntax-highlight colors. Set it to `light` or `dark`.

```xml
<codeeditor language="javascript" colorScheme="dark"/>
```

The property is named `colorScheme`, rather than `theme`, to distinguish the editor's appearance from the global ZK page theme. Changing the page theme does not overwrite an explicitly selected editor color scheme.

## LineNumbers

**Default Value:** `true`

Set `lineNumbers="false"` to hide the line-number gutter:

```xml
<codeeditor language="sql" lineNumbers="false"/>
```

## TabSize

**Default Value:** `4`

`tabSize` controls how many columns are used to display a tab character. It must be a positive integer and does not replace tab characters with spaces.

```xml
<codeeditor language="java" tabSize="2"/>
```

## Readonly and Disabled

Both properties prevent editing, but they serve different purposes:

| Property | Behavior |
|---|---|
| `readonly` | Keeps the editor focusable and allows users to select and copy its content. |
| `disabled` | Prevents focus and editing and displays the editor in a disabled state. |

# Supported Events

| Name | Event Type |
|---|---|
| `onChanging` | **Event:** [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Fired while the user edits the content. Use `event.value` to read the current text. |
| `onChange` | **Event:** [org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Fired when modified content is committed after the editor loses focus. |
| `onFocus` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Fired when the editor receives focus. |
| `onBlur` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Fired when the editor loses focus. |

# Edition Differences

The Community Edition provides value editing, syntax highlighting, history, line numbers, read-only and disabled states, color schemes, and input events.

The Enterprise Edition can layer advanced editing capabilities such as autocompletion, linting, code folding, multiple cursors, search and replace, and diff support onto the same component. Applications can adopt the EE extensions without changing the `<codeeditor>` element or its basic ZUL configuration.

# Inherited Functions

Please refer to [XulElement]({{site.baseurl}}/zk_component_ref/xulelement) for inherited functions.

# Supported Molds

Only the `default` mold is supported.

# Supported Children

`*NONE`

# Version History

| Version | Date | Content |
|---|---|---|
| 11.0.0 | September 2026 | Introduced `Codeeditor` with CE basic editing and syntax highlighting. The editor-specific appearance property is named `colorScheme` to avoid conflicting with the global page theme ([ZK-6086](https://zkoss.atlassian.net/browse/ZK-6086)). |
