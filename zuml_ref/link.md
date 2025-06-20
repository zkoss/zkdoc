**Syntax:**

<?link [href="''uri''"] [''name0''="''value0''"] [''name1''="''value1''"] [''name2''="''value2''"]
    [if="..."] [unless="..."]?>
It specifies an element that should be generated inside the `<head>`
element. It is generated **after** ZK default JavaScript and CSS files.
Thus, it can override ZK default CSS. Currently, only HTML-based clients
(so-called browsers) support them. Furthermore, HTML `<link>` is
actually generated for each of this declaration.

You can specify whatever attributes you like; it is up to a browser to
interpret. ZK only encodes the URI of the `href` and `src` attribute (by
the use of the `encodeURL` method of the `Executions` class). ZK
generates all other attributes directly to the client.

Notice that these header directives are effective only for the main ZUL
page. In other words, they are ignored if a page is included by another
page or servlets. Also, they are ignored if the page is a `zhtml` file.

```xml
<?link rel="alternate" type="application/rss+xml" title="RSS feed"
  href="/rssfeed.php"?>
<?link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"?>
<?link rel="stylesheet" type="text/css" href="~./zul/css/ext.css.dsp"?>

 <window title="My App">
     My content
 </window>
```

# Alternatives

In addition, you could use [ Script component]({{site.baseurl}}/zk_component_ref/essential_components/script)
to embed JavaScript code. The Script component supports more features
such as defer, but it has some memory footprint on the server (since it
is a component).
