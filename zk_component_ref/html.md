---
title: "Html"
---

- **Demonstration:** [Html](http://www.zkoss.org/zkdemo/composite/html_element)
- **Java API:** [org.zkoss.zul.Html](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Html.html)
- **JavaScript API:** [zul.wgt.Html](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Html.html)

# Employment/Purpose

The simplest way is to use an XUL component called `html` to embed
whatever HTML tags you want to send directly to the browser. To avoid ZK
from interpreting the HTML tags, you usually enclose them with `<![CDATA[` and
`]]>`. In other words, they are not the child component. Rather, they
are stored in the `content` property. Notice you can use EL expressions
in it.

## Common Use Cases

### Embedding a Rich-Text Fragment

Use `<html>` when you need to insert a block of pre-built HTML (for example, content returned from a rich-text editor or a CMS) directly into a ZUL page:

```xml
<window title="Article Preview" border="normal">
    <html content="${articleViewModel.bodyHtml}"/>
</window>
```

### Mixing ZK Components and Native HTML

Wrap native HTML that must coexist with ZK siblings. Because `<html>` renders as a `<span>`, it integrates into the ZK component tree without breaking layout:

```xml
<hlayout>
    <label value="Rating:"/>
    <html><![CDATA[
        <span style="color:gold">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
    ]]></html>
</hlayout>
```

### Dynamic HTML via EL

Bind `content` to a bean property when the markup must be refreshed at runtime:

```xml
<html content="${vm.notice}" style="color:red"/>
```

Update `vm.notice` in a ViewModel and notify the binding; ZK pushes the new markup to the client without a full page reload.

# Example

![](/zk_component_ref/images/ZKComRef_Html.png)

```xml
 <window id="win" title="Html Demo" border="normal">
     <html><![CDATA[
         <h4>Hi, ${win.title}</h4>
         <p>It is the content of the html component.</p>
     ]]></html>
 </window>
```

where `<h4>...</p>` will become the content of the `html` element (see
also the `getContent` method of the `org.zkoss.zul.Html` class).

The `html` component generates the HTML `SPAN` tag to enclose the
content. In other words, it generates the following HTML tags when
rendered to the browser.

```xml
 <span id=”...”>
     <h4>Hi, Html Demo</h4>
     <p>It is the content of the html component.</p>
 </span>
```

# Size Issue

On Chrome, if `<html>`'s sibling uses `vflex` to set height flexibly, developer must
override `.z-html` CSS like this:

```css
.z-html {
    display:block;
}
```

or

```css
.z-html {
    display: inline-block;
}
```

Without this setting, `offsetHeight` of `<html>` will be zero, and sibling's height will be wrong.

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Properties

## Content

**Default Value:** `""`  (empty string)

Sets the raw HTML markup to be output directly to the browser inside the enclosing `<span>` element. The value is written to the client without escaping, so **do not pass user-supplied input** to this property — doing so opens an XSS vulnerability.

In ZUL, embed the markup using a CDATA section so the ZK parser does not attempt to interpret the HTML as child components:

```xml
<html><![CDATA[
    <h4>Hello, World</h4>
    <p>Arbitrary HTML rendered inside a SPAN.</p>
]]></html>
```

You can also set the content dynamically via an EL expression or a ViewModel binding:

```xml
<html content="${vm.htmlContent}"/>
```

# Supported Children

`*None`