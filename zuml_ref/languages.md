# Overview

A language
([org.zkoss.zk.ui.metainfo.LanguageDefinition](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/LanguageDefinition.html)) is a
collection of component definitions. It is also known as a component
set.

For example, [org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html),
[org.zkoss.zul.Button](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Button.html) and
[org.zkoss.zul.Combobox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Combobox.html) all belong to the same
language called `xul/html`. It is a ZK variant of XUL (and also known as
`zul`).

Component designers are free to designate a component definition to any
component set they prefer, as long as there is no name conflict[^1].

For introduction of languages vs standard namespaces, please refer to
[ZK Developer's References]({{site.baseurl}}/zk_dev_ref/ui_composing/xml_namespaces).

# Language Identification

When parsing a ZUML document, ZK Loader has to decide the language that
a XML element is associated, such that the correct component definition
([org.zkoss.zk.ui.metainfo.ComponentDefinition](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/ComponentDefinition.html)) can be
resolved. For example, in the following example, ZK needs to know if
`window` belongs to the xul/html language, so its component definition
can be retrieved correctly.

```xml
<window>
```

ZK Loader takes the following steps to decide the language an XML
element is associated with:

1.  It assumes a default language for a ZUML document. The default
    language is decided by the filename's extension (see below).
2.  If an XML element has no namespace prefix, then
    1.  Handle it specially, if the element is a special ZK element,
        such as [zk](zuml_ref/zuml/elements/zk) and
        [attribute](zuml_ref/zuml/elements/attribute).
    2.  Look up the component definition belonging to the default
        language, otherwise.
3.  If an XML element has a prefix, then the XML namespace is used to
    resolve:
    1.  Handle it specially, if the XML namespace is one of the standard
        namespaces, such as
        [native](zuml_ref/zuml/namespaces/native) and
        [client](zuml_ref/zuml/namespaces/client).
    2.  Look up the language with the given XML namespace, otherwise
    3.  Then, look up the component definition from the language found
        in the previous step

## Filename Extension

The default language is decided based on the extension of the filename
([org.zkoss.zk.ui.metainfo.LanguageDefinition#getByExtension(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/LanguageDefinition.html#getByExtension(java.lang.String))).
In addition, a language is associated with one or multiple extensions
(defined by the component developer). For example, the extensions
associated with the [xul/html language](zuml_ref/zuml/languages/zul) are `zul` and
`xul`, while the [xhtml language](zuml_ref/zuml/languages/xhtml) (aka., a
component set) is associated with the extensions including `zhtml`,
`html`, `html`, and `xhtml`.

Thus, if a file or URI whose extension is `zul` or `xul`, the default
language will be assumed to be the `xul/html` language.

### Filename Extension vs URL Mapping

The association of extensions with a language is defined in a language.
However, to really have ZK Loader to process a particular file, you have
to configure `WEB-INF/web.xml` correctly. For example, if you want to
map all `*.xul` files to ZK Loader, you could add the following to
`WEB-INF/web.xml`:

```xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>*.xul</url-pattern>
</servlet-mapping>
```

If the extension of the mapped URL does not match any language, the
xul/html language is assumed.

## XML Namespace

In addition to extension association, a language is also associated with
a unique XML namespace. Thus, you can identify the language for a given
XML element by the use of XML namespace.

With the XML namespace, you could:

1.  Map a default language for a unknown extension
2.  Mix two or more languages in one ZUML document

### Map a default language for a unknown extension

For example, you map ZK Loader to `*.foo`, which is not associated with
any language. Then, you have to specify the XML namespace as shown in
the following example:

```xml
<window xmlns="http://www.zkoss.org/2005/zul">
...
```

where the xmlns attribute declares a XML namespace to associate all
element without explicit prefix, such as window in this case.
Furthermore,
[`http://www.zkoss.org/2005/zul`](http://www.zkoss.org/2005/zul) is the
unique XML namespace associated with the xul/html namespace.

### Mix two or more languages in a ZUML document

If you want to use several languages in the same XML document, you could
use XML namespaces to distinguish them too. For example, the xhtml
language's namespace is http://www.w3.org/1999/xhtml, and we could mix
the use as follows.

```xml
<window xmlns:h="http://www.w3.org/1999/xhtml">
    <h:table>
        <h:tr>
            <h:td>
                <button/>
            </h:td>
        </h:tr>
    </h:table>
</window>
```

Notice that, when using the xhtml language, `table`, `tr` and `td` are
also components though they are very simple -- a simple wrapper of HTML
tags. However, there is a better way to generate HTML tags: the native
namespace. It generates HTML tags directly without maintaining the
component[^2]. The associated XML namespace of the native namespace is
http://www.zkoss.org/2005/zk/native, so we can rewrite the previous
example to be more efficient:

```xml
<window xmlns:h="http://www.zkoss.org/2005/zk/native">
    <h:table>
        <h:tr>
            <h:td>
                <button/>
            </h:td>
        </h:tr>
    </h:table>
</window>
```

> ------------------------------------------------------------------------
>
> <references/>

## XML Namespace with Shortcut

To make it easy to specify a namespace, you could specify a shortcut
instead of the full namespace URI. For languages, the shortcut is the
last word of the namespace URI. For example, `zul` for
[`http://www.zkoss.org/2005/zul`](http://www.zkoss.org/2005/zul), and
`xhtml` for <http://www.w3.org/1999/xhtml>. Thus, we can simply the
previous example as follows.

```xml
<window xmlns:h="xhtml">
    <h:table>
        <h:tr>
            <h:td>
                <button/>
            </h:td>
        </h:tr>
    </h:table>
</window>
```

# Standard Languages

ZK provides three different languages (aka., component sets): xul/xhtml,
xhtml and xml. The xul/xhtml and xhtml langauges can be used for any
modern browser (Ajax assumed), while the zml language is used for
generating XML document (non-Ajax). The developers are free to add their
own language[^3].

> ------------------------------------------------------------------------
>
> <references/>

<table>
<thead>
<tr class="header">
<th><p>Language</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>xul/html</p></td>
<td><p><code>Name: xul/html (aka., zul)</code><br />
<code>File Extensions: zul, xul</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zul"><code>http://www.zkoss.org/2005/zul</code></a><br />
<code>Namespace shortcut: zul</code><br />
<code>Device: Ajax</code></p>
<p>XUL-compliant component sets. We adopt <a
href="https://developer.mozilla.org/En/XUL">XUL</a> for this language,
if the specification is applicable. For more information, please refer
to <a href="ZK_Component_Reference" title="wikilink">ZK Component
Reference</a>.</p></td>
</tr>
<tr class="even">
<td><p>xhtml</p></td>
<td><p><code>Name: xhtml</code><br />
<code>File Extensions: zhtml, xhtml, html, htm</code><br />
<code>Namespace: </code><a
href="http://www.w3.org/1999/xhtml"><code>http://www.w3.org/1999/xhtml</code></a><br />
<code>Namespace shortcut: xhtml</code><br />
<code>Device: Ajax</code></p>
<p>XHTML-compliant component sets. It is one-to-one mapping of XHTML
tags to ZK components. Since they are components, you can add and remove
them dynamically (and control it at the server). For more information
please refer to the <a href="zuml_ref/ZUML/Languages/XHTML"
title="wikilink">XHTML Namespace</a> section or <a
href="{{site.baseurl}}/zk_component_ref/xhtml_components" title="wikilink">ZK
Component Reference</a>.</p>
<p><strong>Performance Tip:</strong> The XHTML language is designed to
allow application to modify the client dynamically (at the server). If
you don't need it (it is generally true), you should use the <a
href="zuml_ref/ZUML/Namespaces/Native" title="wikilink">Native
namespace</a> instead. For more information, please refer to <a
href="ZK_Developer&#39;s_Reference/Performance_Tips/Use_Native_Namespace_instead_of_XHTML_Namespace"
title="wikilink">Performance Tips</a>.</p></td>
</tr>
<tr class="odd">
<td><p>xml</p></td>
<td><p><code>Name: xml</code><br />
<code>File Extensions: xml</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2007/xml"><code>http://www.zkoss.org/2007/xml</code></a><br />
<code>Namespace shortcut: xml</code><br />
<code>Device: XML</code><br />
<code>Available only ZK EE</code></p>
<p>XML component sets. It is used to generate (static) XML document. For
more information please refer to the <a
href="zuml_ref/ZUML/Languages/XML" title="wikilink">XML</a>
section.</p></td>
</tr>
</tbody>
</table>

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date          | Content                                                                                                     |
|---------|---------------|-------------------------------------------------------------------------------------------------------------|
| 5.0.4   | August, 2010  | The shortcut was introduced to make it easy to specify a standard namespace, such as native, client and zk. |
| 5.0.5   | October, 2010 | The shortcut was introduced to make it easy to specify a component set, such as zul and zhtml.              |

[^1]: For more information please refer to [ZK Component Development Essentials](/zk_component_dev_essentials/zk_component_overview)

[^2]: For more information please refer to the [Native Namespace](zuml_ref/zuml/namespaces/native) section

[^3]: Notice that there are so-called [Standard Namespaces](zuml_ref/zuml/namespaces) associated
    with XML namespaces (for a ZUML document) to provide special
    functionality (than specify components).
