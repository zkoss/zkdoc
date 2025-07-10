# Overview

Many resources depend on the Locale and, sometimes, the browser. For
example, you might need to use a larger font for Chinese characters to
have better readability. ZK provides a way to load locale and
browser-dependent resources including JavaScript, CSS, and images.

# Specifying Locale- and browser-dependent URL

ZK can handle this for you automatically by specifying a URL with
**asterisk** `*`. This feature is supported by all components that
accept a URL, e.g. the src of [ \<script\>](zk_component_reference/essential_components/script)
or [ \<?script?\>](zuml_ref/script).
The algorithm is as follows.

## Absolute or Relative Path

You can only specify an absolute path to load a locale-dependent
resource at 9.x and before. Relative path is supported.

## One "\*" for Locale Code

If you specify only one `*` in a URL, such as `/my*.css`, then `*` will
be replaced with a **locale code** depending on the current locale that
ZK detects. For example:

- URI: **`/my*.css`**
- User's preferences (current locale): **`de_DE`**

Then ZK looks for files in the order below one-by-one in your website
until any of them is found:

1.  `/my_de_DE.css`
2.  `/my_de.css`
3.  `/my.css`

## Two "\*" for Locale and Browser Code

Such as "/my\*/lang\*.css", then the first "\*" will be replaced with a
**browser code** as follows:

- `ie` for Internet Explorer
- `saf` for Chrome, Safari
- `moz` for Firefox and other browsers[^1].

Moreover, the last asterisk will be replaced with a proper Locale as
described in the previous rule. In summary, the last asterisk represents
the Locale, while the first asterisk represents the browser type.

For example:

**zul**

```xml
<style src="/i18n/css-*/mycss*.css" />
```

The result in an HTML with Chrome:

```html
<link ... href="/i18n/css-saf/mycss.css" ...>
```

## All other "\*" are ignored

## Note

The last asterisk that represents the Locale must be placed right before
the first dot ("."), or at the end if no dot at all. Furthermore, no
following slash (/) is allowed, i.e., it must be part of the filename,
rather than a directory. If the last asterisk doesn't fulfill this
constraint, it will be eliminated (not ignored).

For example, "/my/lang.css\*" is equivalent to "/my/lang.css".

In other words, you can consider it as neutral to the Locale.

**Tip**: We can apply this rule to specify a URI depending on the
browser type, but not depending on the Locale. For example,
"/my/lang\*.css\*" will be replaced with "/my/langie.css" if Internet
Explorer is the current user's browser.

> ------------------------------------------------------------------------
>
> <references/>

## Example

In the following example, we assume the preferred Locale is `de_DE` and
the browser is Internet Explorer.

<table>
<thead>
<tr class="header">
<th><center>
<p>URI</p>
</center></th>
<th><center>
<p>Resources that are searched</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>/css/norm*.css</p></td>
<td><ol>
<li>/norm_de_DE.css</li>
<li>/norm_de.css</li>
<li>/norm.css</li>
</ol></td>
</tr>
<tr class="even">
<td><p>/css-*/norm*.css</p></td>
<td><ol>
<li>/css-ie/norm_de_DE.css</li>
<li>/css-ie/norm_de.css</li>
<li>/css-ie/norm.css</li>
</ol></td>
</tr>
<tr class="odd">
<td><p>/img*/pic*/lang*.png</p></td>
<td><ol>
<li>/imgie/pic*/lang_de_DE.png</li>
<li>/imgie/pic*/lang_de.png</li>
<li>/imgie/pic*/lang.png</li>
</ol></td>
</tr>
<tr class="even">
<td><p>/img*/lang.gif</p></td>
<td><ol>
<li>/img/lang.gif</li>
</ol></td>
</tr>
<tr class="odd">
<td><p>/img/lang*.gif*</p></td>
<td><ol>
<li>/img/langie.gif</li>
</ol></td>
</tr>
<tr class="even">
<td><p>/img*/lang*.gif*</p></td>
<td><ol>
<li>/imgie/lang*.gif</li>
</ol></td>
</tr>
</tbody>
</table>

# Locating Locale- and browser-dependent resources in Java

In addition to ZUML, you can also load browser- and Locale-dependent
resources in Java. Here is a list of methods that you can use.

- The `encodeURL`, `forward`, and `include` methods in
  [org.zkoss.zk.ui.Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html) for encoding URL,
  forwarding to another page and including a page. In most cases, these
  methods are all you need.
- The `locate`, `forward`, and `include` method in
  [org.zkoss.web.servlet.Servlets](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/Servlets.html) for locating Web
  resouces. You rarely need them when developing ZK applications, but
  useful for writing a servlet, portlet or filter.
- The `encodeURL` method in
  [org.zkoss.web.servlet.http.Encodes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/http/Encodes.html) for encoding
  URL. You rarely need them when developing ZK applications, but useful
  for writing a Servlet, Portlet or Filter.

<!-- -->

- The `locate` method in
  [org.zkoss.util.resource.Locators](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/resource/Locators.html) for locating class
  resources.

[^1]: In the future editions, we will use different codes for browsers
    other than Internet Explorer, Firefox and Safari.
