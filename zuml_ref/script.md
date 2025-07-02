**Syntax:**

<?script [type="text/javascript"] [src="''uri''"] [charset="''encoding''"]
  [content="''javascript snippet''"] [if="..."] [unless="..."]?>

It tells ZK to generate a <code>

<script>

</code> inside <code>

<head>

</code> **after ZK default JavaScript and CSS files**. Thus, it can be
used to override what is defined in ZK default JavaScript code.
Currently, only HTML-based clients (so-called browsers) support it.
Furthermore, an HTML SCRIPT tag is generated for each of these
declarations.

You can specify whatever attributes you like; it is up to the browser to
interpret. ZK only evaluates the `if` and `unless` attributes, and
encodes the URI of the `href` and `src` attribute (by use of
[org.zkoss.zk.ui.Execution#encodeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#encodeURL(java.lang.String))).
So you can specify an absolute or relative path. ZK generates all other
attributes directly to the client.

```xml
<?script src="/js/foo.js"?>
<?script content="var foo = true; if (zk.ie) doSomething();"?>

 <window title="My App">
     My content
 </window>
```

As shown above, the attribute value could span multiple lines.

# Alternatives

Alternatively, you could use [the script component]({{site.baseurl}}/zk_component_ref/script)
to embed JavaScript code. The script component supports more features
such as defer, but it has some memory footprint at the server (since it
is a component).

# Limitation: Ignored by Inclusion

Notice that these header directives are effective only when you visit
the page directly. In other words, they are ignored if a page is
included by another page with <include>, <apply>, or servlets API. Also,
they are ignored if the page is a `zhtml` file.
