# Overview

[Cross-site
scripting](http://en.wikipedia.org/wiki/Cross-site_scripting) (XSS) is a
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

``` xml
<textbox value="${any_value}"/>
```

## Attributes to Generate Texts

[
Label](ZK%20Component%20Reference/Essential%20Components/Label)
component's `value` and those attributes that generate texts into a page
including `label, title, tooltiptext, placeholder, name, type`, and
message like `createMessage, emptyMessage`. (ZK encodes them with
`zUtl.encodeXML()` at client-side.)

Since ZK implicitly turns an EL expression like `${myMessage}` on a zul
into a [
Label](ZK%20Component%20Reference/Essential%20Components/Label),
so it's encoded, too.

# What ZK Doesn't Encode

## Components used to Generate HTML Directly

ZK provides several ways to write HTML tags in a zul, including
\[\[ZK_Developer%27s_Reference/UI_Patterns/HTML_Tags/The_html_Component
\| ZK

<html>

component\]\], [ native
namespace](ZK_Developer%27s_Reference/UI_Patterns/HTML_Tags/The_native_Namespace),
and [ xhtml
components](ZK_Developer%27s_Reference/UI_Patterns/HTML_Tags/The_XHTML_Component_Set).
Since their purpose is to allow you to write HTML tags directly, ZK
doesn't encode them.

## Comboitem's `content`

The <javadoc>org.zkoss.zul.Comboitem</javadoc>'s `content` attribute is
designed to allow applications to generate HTML content directly. In
other words, it is not encoded. In most cases we expect these values to
come from the server-side. However, if your application takes user input
as the content property, you will need to encode it properly. For
example, if the value of `any_content`, in the following example, is
generated directly without proper encoding, it may be vulnerable to XSS
attacks.

``` xml
<html>${any_content}</html>
```

The content is sanitized by default to avoid XSS attack. Please don't
use JavaScript in the content.

## Some methods of `Clients`

As the name says this utility allows more direct client-side access.
Thus the methods don't encode the strings passed into them to allow
formatting of the messages at the client-side, e.g.:

``` java
Clients.showNotification("Successfully processed: <br/>" + myTextbox.getValue());
```

When displaying user input using methods such as
<javadoc method="showBusy(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>,
<javadoc method="showNotification(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>,
or anything similar; or when using
<javadoc method="evalJavaScript(java.lang.String)">org.zkoss.zk.ui.util.Clients</javadoc>
to dynamically concatenate JS code, user input should be escaped
carefully.

## Client-side Actions

The [client-side
action]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Actions_and_Effects)
is not encoded and the options are interpreted as a JSON object. In most
cases we expect the values to come from the server-side. However, if you
allow end-users to specify them (not recommended), you should encode
them by yourself.

## Page Directive

All attributes of \[\[ZUML_Reference/ZUML/Processing_Instructions/page\|

<?page?>

\]\] are not encoded.

# Sanitize User Input

As a framework, ZK tries to maintain a good balance between flexibility
and default settings. Regarding attributes that are not escaped by
default, application developers should use ZK
<javadoc method="escapeXML(java.lang.String)">org.zkoss.xml.XMLs</javadoc>
or [Apache Commons Lang's
StringEscapeUtils](https://commons.apache.org/proper/commons-lang/javadocs/api-2.6/org/apache/commons/lang/StringEscapeUtils.html)
to sanitize user input if you are taking user input as these attributes.
