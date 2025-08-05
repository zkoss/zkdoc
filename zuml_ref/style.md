---
title: "style"
---

**Syntax:**

<?style [type="text/css"] [src="''uri''"] [charset="''encoding''"]
  [content="''css snippet''"] [if="..."] [unless="..."]?>
It specifies an element that shall be generated inside the HEAD element.
It is generated *after* ZK default JavaScript and CSS files. Thus, it
could override what is defined in ZK default CSS code. Currently only
HTML-based clients (so-called browsers) support it. Furthermore, HTML
STYLE or LINK tags are actually generated for each of this declaration.

Developers can specify whatever attributes you like; it is up to the
browser to interpret. ZK only evaluates the `if` and `unless`
attributes, and encodes the URI of the `href` and `src` attribute (by
use of
[org.zkoss.zk.ui.Execution#encodeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#encodeURL(java.lang.String))).
ZK generates all other attributes directly to the client.

Notice that these header directives are effective only for the main ZUL
page. In other words, they are ignored if a page is included by another
pages or servlets. Also, they are ignored if the page is a `zhtml` file.

```xml
<?style src="/css/foo.css"?>
<?style content="
  div.blue {background: blue}
"?>

 <div sclass="blue">
     My content
 </div>
```

As shown above, the attribute value could span multiple lines.

# Alternatives

Alternatively, you could use [the style component]({{site.baseurl}}/zk_component_ref/style)
to embed CSS code. Using the style component if you'd like to add or
remove the style dynamically (since it is a component), or the page will
be included by others.

# Version History

| Version | Date       | Content                             |
|---------|------------|-------------------------------------|
| 5.0.8   | July, 2011 | The style directive was introduced. |
