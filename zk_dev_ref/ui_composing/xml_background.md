# Overview

This section provides the most basic concepts of XML to work with ZK. If
you are familiar with XML, you could skip this section. If you want to
learn more, there are a lot of resources on Internet, such as
[<http://www.w3schools.com/xml/xml_whatis.asp>](http://www.w3schools.com/xml/xml_whatis.asp)
and
[<http://www.xml.com/pub/a/98/10/guide0.html>](http://www.xml.com/pub/a/98/10/guide0.html).

XML is a markup language much like HTML but with stricter and cleaner
syntax. It has several characteristics worthwhile to take notes of.

# Document

The whole XML content, no matter whether it is in a file or as a string,
is called an XML document.

## Character Encoding

It is, though optional, a good idea to specify the encoding in your XML
so that the XML parser can interpret it correctly. Note: it must be on
the first line of the XML document.

```xml
 <?xml version="1.0" encoding="UTF-8"?>
```

In addition to specifying the correct encoding, you have to make sure
your XML editor supports it as well.

# Elements

An XML element is everything from (including) the element's start tag to
(including) the element's end tag.

An element can contain other elements, let it be simple text or a
mixture of both. Elements can also have attributes. For example,

```xml
<window title="abc">
  <button label="click me"/>
</window>
```

where both window and button are elements, while title is an attribute
of the window element. The button element is nested in the window
element. We call the window component the parent element of button,
while the button component is a child element of the window.

The document root is the topmost element (without any parent element).
There is exactly one document root per XML document.

## Elements Must Be Well-formed

First, each element must be closed. There are two ways to close an
element as depicted below. They are equivalent.

| Description | Code |
|-------------|------|
| Close by an end tag: | `<window></window>` |
| Close without an end tag: | `<window/>` |

Second, elements must be properly nested.

| Result | Code |
|--------|------|
| Correct: | ```xml<br/><window><br/>    <groupbox><br/>        Hello World!<br/>    </groupbox><br/></window><br/>``` |
| Wrong: | ```xml<br/><window><br/>    <groupbox><br/>        Hello World!<br/>    </window><br/></groupbox><br/>``` |

XML treats every tag as a node in a tree. A node without a parent node
is a root component, and it is the root of a tree. In each zul file,
only **ONE** tree is allowed.

For example, for being a whole zul file, the following is allowed as it
has only one root component.

```xml
<button/>
```

And for being a whole zul file, the following is not allowed as it has
more than one root component.

```xml
<button/>
<button/>
```

You can solve the problem simply by adding a tag to enclose the whole
zul file to serve as the parent node, so that the zul file has one
single tree again.

```xml
<window>
    <button />
    <button />
</window>
```

## Special Characters Must Be Replaced

XML uses `<`*`element-name`*`>` to denote an element, so you have to use
special characters for replacement. For example, you have to use `&lt;`
to represent the `<` character.

| Special Character | Replaced With | Notes |
|------------------|---------------|-------|
| < | &lt; | |
| > | &gt; | |
| & | &amp; | |
| " | &quot; | |
| ' | &apos; | |
| \t (TAB) | &#x09; | Required only if used in an XML attribute's value |
| \n (Linefeed) | &#x0a; | Required only if used in an XML attribute's value |

Alternatively, you could tell XML parser not to interpret a piece of
text by using `CDATA`. See the following:

```xml
 <zscript>
 <![CDATA[
 void myfunc(int a, int b) {
     if (a < 0 && b > 0) {
         //do something
     }
 ]]>
 </zscript>
```

It is suggested to always add inside your <zscript>` `</zscript>. Thus
you don't have to worry about the escape sequences for special
characters like "&", "\<". In addition, the code can also become much
easier to read and maintain.

## Attribute Values Must Be Specified and Quoted

| Result | Code |
|--------|------|
| Correct: | `checked="true"` |
| Wrong: | `width=100%` or `checked` |

Both the single quote (') and the double quote (") can be used, so if
the value has double quotes, you could use the single quote to enclose
it. For example,

```xml
<button onClick='alert("Hello, There")'/>
```

Of course, you can always use &quot; to denote a double quote.

# Comments

A comment is used to leave a note or to temporarily disable a block of
XML code. To add a comment in XML, use `<!--` and `-->` to mark the
comment body.

```xml
 <window>
 <!-- this is a comment and ignored by ZK -->
 </window>
```

# Processing Instruction

A processing instruction is used to carry out the instruction to the
program that processes the XML document. A processing instruction is
enclosed with \<? and ?\>. For example,

```xml
<?page title="Foo"?>
```

Processing instructions may occur anywhere in an XML document. However,
most ZUML processing instructions must be specified at the topmost level
(the same level as the document root).
