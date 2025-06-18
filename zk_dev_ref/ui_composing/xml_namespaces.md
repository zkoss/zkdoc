In a ZUML document, an XML namespace is used to identify either a
special functionality or a component set. We call the former [a standard
namespace](ZUML_Reference/ZUML/Namespaces) and the latter [a
language](ZUML_Reference/ZUML/Languages).

# Standard Namespaces

For example, the [client
namespace](ZUML_Reference/ZUML/Namespaces/Client) is used to
indicate that an XML attribute shall be interpreted as a client-side
control.

In the following example, `w:onFocus` is a client-side listener since
`w:` is specified, while `onChange` is an event attribute of a
component.

```xml
<combobox xmlns:w="client" w:onFocus="this.open()" onChange="doOnChange()"/>
```

The [native namespace](ZUML_Reference/ZUML/Namespaces/Native)
is another standard namespace used to indicate that an XML element
should be generated *natively* rather than a component. For example,

```xml
<n:table xmlns:n="native">
  <n:tr>
    <n:td>Username</n:td>
    <n:td><textbox/></n:td>
  </n:tr>
  <n:tr>
    <n:td>Password</n:td>
    <n:td><textbox type="password"/></n:td>
  </n:tr>
</n:table>
```

where `n:table`, `n:tr` and `n:td` are native, i.e., they are generated
directly to the client without creating a component for each of them.

For more information, please refer to [ZUML
Reference](ZUML_Reference/ZUML/Namespaces).

# Languages

A [language](ZUML_Reference/ZUML/Languages)
(<javadoc>org.zkoss.zk.ui.metainfo.LanguageDefinition</javadoc>) is a
collection of component definitions. It is also known as a component
set.

For example, <javadoc>org.zkoss.zul.Window</javadoc>,
<javadoc>org.zkoss.zul.Button</javadoc> and
<javadoc>org.zkoss.zul.Combobox</javadoc> all belong to the same
language called `xul/html`. It is a ZK variant of XUL (and also known as
`zul`).

Component designers are free to designate a component definition to any
component sets they prefer, as long as there is no name conflict.

When parsing a ZUML document, ZK Loader has to decide the language that
an XML element is associated, so that the correct component definition
(<javadoc>org.zkoss.zk.ui.metainfo.ComponentDefinition</javadoc>) can be
resolved. For example, in the following example, ZK needs to know
`window` belongs to the xul/html language, so its component definition
can be retrieved correctly.

```xml
<window>
```

ZK Loader first decides the default language from the extension. For
example, `foo.zul` implies the default language is
[ZUL](ZUML_Reference/ZUML/Languages/ZUL). The default
language is used if an XML element is not specified with any XML
namespace. For example, `window` in the previous example will be
considered as a component definition of [the ZUL
langauge](ZUML_Reference/ZUML/Languages/ZUL).

If the extension is zhtml (such as `foo.zhtml`), the default language
will be [XHTML](ZUML_Reference/ZUML/Languages/XHTML). Thus,
`window` in the previous example will be interpreted incorrectly. To
solve it, you could specify the XML namespace explicitly as follows.

```xml
<!-- foo.zhtml -->
<p> <!-- assumed from the XHTML language -->
    <u:window xmlns:u="zul"/> <!-- ZK Loader will search the ZUL language instead -->
</p>
```

For more information about identifying a language, pelase refer to [ZUML
Reference](ZUML_Reference/ZUML/Languages#Language_Identification).

# Version History

| Version | Date          | Content                                                                                                     |
|---------|---------------|-------------------------------------------------------------------------------------------------------------|
| 5.0.4   | August, 2010  | The shortcut was introduced to make it easy to specify a standard namespace, such as native, client and zk. |
| 5.0.5   | October, 2010 | The shortcut was introduced to make it easy to specify a component set, such as zul and zhtml.              |
