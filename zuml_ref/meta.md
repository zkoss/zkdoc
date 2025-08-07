---
title: "meta"
---

**Syntax:**

<?meta [''name0''="''value0''"] [''name1''="''value1''"] [''name2''="''value2''"]
    [if="..."] [unless="..."]?>

{% include version-badge.html version="3.6.2" %}

It specifies an element that should be generated inside the HEAD
element. It is generated *before* ZK default JavaScript and CSS files.
Currently only HTML-based clients (so-called browsers) support them.
Furthermore, HTML META tag is actually generated for each of this
declaration.

Developers can specify whatever attributes you like; it is up to the
browser to interpret. ZK only evaluates the `if` and `unless`
attributes, and encodes the URI of the `href` and `src` attribute (by
use of the `encodeURL` method of the `Executions` class). ZK generates
all other attributes directly to the client.

Notice that these header directives are effective only for the main ZUL
page. In other words, they are ignored if a page is included by another
pages or servlets. Also, they are ignored if the page is a `zhtml` file.

```xml
 <?meta name="keywords" content="HTML, CSS, XML" ?>

 <window title="My App">
     My content
 </window>
```


