---
title: "Label"
---

- **Demonstration:** [Label](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Label](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Label.html)
- **JavaScript API:** [zul.wgt.Label](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Label.html)

# Employment/Purpose

A label component represents a piece of text. A pure text on the zul
will be automatically converted to a label.

## Common Use Cases

- **Form field labels** — pair a `<label>` with an input widget (e.g. `<textbox>`) to provide a visible caption; use `sclass` or `style` to match form layout.
- **Dynamic text display** — bind `value` to a view-model property so the label re-renders automatically when the backing data changes (MVVM `@bind` or `@load`).
- **Pre-formatted output** — set `pre="true"` to preserve spaces, tabs, and newlines when showing code snippets or structured plain-text content.
- **Truncated display** — set `maxlength` to a positive integer to cap visible characters, useful in tight table cells or list items where overflow must be avoided.

# Example

![Label](/zk_component_ref/images/ZKComRef_Label.PNG)

```xml
 <window title="Label Demo" >
 <grid>
     <rows>
         <row>Label(normal): <label id="lb1"/></row>
         <row>Label(color): <label id="lb2" style="color:red"/></row>
         <row>Label(font): <label id="lb3" style="font-weight:bold"/></row>
         <row>Label(size): <label id="lb4" style="font-size:14pt"/></row>
         <row>Label(maxlength): <label id="lb5" maxlength="5"/></row>
         <row>Label(pre): <label id="lb6" pre="true"/></row>
         <row>input:
             <textbox id="txt" rows="2"><attribute name="onChange">
                     lb1.value=self.value;
                     lb2.value=self.value;
                     lb3.value=self.value;
                     lb4.value=self.value;
                     lb5.value=self.value;
                     lb6.value=self.value;
             </attribute></textbox>
         </row>
     </rows>
 </grid>
 </window>
```

You can control how a label is displayed with the `style`, `pre` and
`maxlength` Properties.

For example, if you specify `pre` to be `true`, all white spaces, such
as new line, space and tab, are preserved.

A label component represents a piece of text.

![Label Example2](/zk_component_ref/images/ZKComRef_Label_Example2.png)

```xml
<window border="normal"> 
    Hello World
</window>
```

If you want to add an attribute to a label, it has to be written as
follows:

![Label Example3](/zk_component_ref/images/ZKComRef_Label_Example3.png)

```xml
<window border="normal">
    <label style="color: red" value="Hello World" />
</window>
```

# Special Character

Since ZUML is XML, not HTML, so it doesn't accept
**`&`**`nbsp;`. However, you can use
**`&`**`#160;` instead. For the whole list, please refer th
[List of XML and HTML character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references).

# Properties

## Value

**Default Value:** `""`

Sets the text content displayed by the label. Passing `null` is treated as an empty string. Because `value` is the `textAs` attribute for `<label>`, you can also supply it as inline text content:

```xml
<!-- attribute form -->
<label value="Hello World" />

<!-- inline text form (equivalent) -->
<label>Hello World</label>
```

## Pre

{% include supported-since.html version="5.0.0" %}

When set to `true`, preserves all white spaces (including new lines, spaces, and tabs) in the label's value, useful for displaying pre-formatted text such as code snippets or structured plain-text content.

```xml
<window border="normal" width="300px">
    <label id="lb1" pre="true"></label>
    <zscript><![CDATA[
        lb1.value = "    this   thing   has   spaces.\nnext line.";
    ]]></zscript>
</window>
```

## Multiline

{% include supported-since.html version="5.0.0" %}

When set to `true`, preserves new lines and white space at the beginning of each line, but not other interior spaces or tabs. This is similar to `pre` but less strict.

```xml
<window border="normal" width="300px">
    <label id="lb2" multiline="true" />
    <zscript><![CDATA[
        lb2.value = "    this   thing   has   spaces.\nnext line.";
    ]]></zscript>
</window>
```

## Maxlength

{% include supported-since.html version="5.0.0" %}

Limits the number of characters displayed in the label. When set to a positive integer and both `pre` and `multiline` are `false`, the label shows only the first `maxlength` characters of its value, truncating the rest. A value of `0` disables truncation.

```xml
<window border="normal" width="300px">
    <label id="lb3" maxlength="10" />
    <zscript><![CDATA[
        lb3.value = "    this is more than 10 chars.";
    ]]></zscript>
</window>
```

### Property Interaction Table

| pre | multiline | maxlength | Description |
|-----|-----------|----------|-------------|
| true | any | any | All white spaces are preserved, including new lines, spaces and tabs. |
| false | true | any | New lines are preserved. |
| false | false | positive | The label only show its value up to the length of "maxlength". |
| false | false | 0 | The label is displayed regularly. |

![Label Text ZK5](/zk_component_ref/images/ZKComRef_Label_Text_ZK5.png)

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`
