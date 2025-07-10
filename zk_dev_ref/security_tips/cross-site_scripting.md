# Overview

[Cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting) (XSS) is a
type of computer security vulnerability typically found in web
applications that enables malicious attackers to inject client-side
scripts into web pages viewed by other users. Because HTML documents
have a flat, serial structure that mixes control statements, formatting,
and the actual content, any non-validated user-supplied data included in
the resulting page without proper HTML encoding may lead to markup
injection.

# What ZK Encodes

## All Input Components Block XSS

To prevent a XSS attack, ZK components encode any value that might be
input by a user by escaping `&` and other unsafe characters. For
example, the following statement is totally safe even if `any_value`
contains a script like <code>

<script>

alert('xss')

</script>

</code>:

```xml
<textbox value="${any_value}"/>
```

## Attributes to Generate Texts

[ Label](zk_component_reference/essential_components/label)
component's `value` and those attributes that generate texts into a page
including `label, title, tooltiptext, placeholder, name, type`, and
message like `createMessage, emptyMessage`. (ZK encodes them with
`zUtl.encodeXML()` at client-side.)

Since ZK implicitly turns an EL expression like `${myMessage}` on a zul
into a [ Label](zk_component_reference/essential_components/label),
so it's encoded, too.

# What ZK Doesn't Encode

## Components used to Generate HTML Directly

ZK provides several ways to write HTML tags in a zul, including
\[\[{{site.baseurl}}/zk_dev_ref/ui_patterns/the_html_component
\| ZK

<html>

component\]\], [ native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace),
and [ xhtml components]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_xhtml_component_set).
Since their purpose is to allow you to write HTML tags directly, ZK
doesn't encode them.

## Comboitem's `content`

The [org.zkoss.zul.Comboitem](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Comboitem.html)'s `content` attribute is
designed to allow applications to generate HTML content directly. In
other words, it is not encoded. In most cases we expect these values to
come from the server-side. However, if your application takes user input
as the content property, you will need to encode it properly. For
example, if the value of `any_content`, in the following example, is
generated directly without proper encoding, it may be vulnerable to XSS
attacks.

```xml
<html>${any_content}</html>
```

The content is sanitized by default to avoid XSS attack. Please don't
use JavaScript in the content.

## Some methods of `Clients`

As the name says this utility allows more direct client-side access.
Thus the methods don't encode the strings passed into them to allow
formatting of the messages at the client-side, e.g.:

```java
Clients.showNotification("Successfully processed: <br/>" + myTextbox.getValue());
```

When displaying user input using methods such as
[org.zkoss.zk.ui.util.Clients#showBusy(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showBusy(java.lang.String)),
[org.zkoss.zk.ui.util.Clients#showNotification(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#showNotification(java.lang.String)),
or anything similar; or when using
[org.zkoss.zk.ui.util.Clients#evalJavaScript(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Clients.html#evalJavaScript(java.lang.String))
to dynamically concatenate JS code, user input should be escaped
carefully.

## Client-side Actions

The [client-side action]({{site.baseurl}}/zk_dev_ref/ui_patterns/actions_and_effects)
is not encoded and the options are interpreted as a JSON object. In most
cases we expect the values to come from the server-side. However, if you
allow end-users to specify them (not recommended), you should encode
them by yourself.

## Page Directive

All attributes of \[\[zuml_ref/page\|

<?page?>

\]\] are not encoded.

# Sanitize User Input

As a framework, ZK tries to maintain a good balance between flexibility
and default settings. Regarding attributes that are not escaped by
default, application developers should use ZK
[org.zkoss.xml.XMLs#escapeXML(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xml/XMLs.html#escapeXML(java.lang.String))
or [Apache Commons Lang's StringEscapeUtils](https://commons.apache.org/proper/commons-lang/javadocs/api-2.6/org/apache/commons/lang/StringEscapeUtils.html)
to sanitize user input if you are taking user input as these attributes.
