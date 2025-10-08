
**Syntax:**
```xml
<?page [id="..."] [title="..."] [style="..."] [cacheable="'''false'''|true"]
   [language="xul/html"] [zscriptLanguage="Java"]
   [contentType="text/html;charset=UTF-8"]
   [docType="''tag PUBLIC &quot;doctype name&quot; &quot;doctype UI&quot;''"]
   [widgetClass="..."]
   [xml="version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;"]
   [complete="true|'''false'''"]
   [automaticTimeout="true|'''false'''"]
   [viewport="width=device-width,initial-scale=1.0"]?>
```

It specifies how a page should be handled. The `id` and `title`
arguments are the two most important ones.

# automaticTimeout
{% include supported-since.html version="3.6.3" %}

`[Optional]`  
`[Default: the applicatioin default]`

It specifies whether to automatically redirect to the timeout URI. If it
is false, a page will be redirected to the timeout URI when the user
takes some action after timeout. In other words, nothing would happen if
the user does nothing.

If omitted, whether to automatically timeout depends on the
application's configuration. Please refer to [session-config](/zk_config_ref/the_session_config_element).

A typical use is to turn off the automatic timeout for the timeout page
(otherwise, it will be reloaded again after the session is timeout again). 
For example,

```xml
<!-- my timeout page -->
<?page automaticTimeout="false"?>
<zk>
  You didn't access for a while. Please login again.
</zk>
```

Of course, you don't need to do anything, if the timeout page is not a ZUML page.

# cacheable

`[Optional]`  
`[Default: false if Ajax devices, true ifxml and MIL devices]`

It specifies whether the client can cache the output.

**Note**: Browsers, such as Firefox and IE, don't handle the cache of
DHTML correctly, so it is not safe to specify `cacheable` with true for
Ajax devices.

# complete

```xml
[Optional][Default: false]
```

It specifies that this page is a complete page. By complete we mean the
page has everything that the client expects. For example, if the client
is a HTML browser, then a complete page will generate all the necessary
HTML tags, such as `<html>`, `<head>`, `<body>`.

By default (`false`), a ZK page is assumed to be complete *if and only if*
it is *not* included by other pages. In other words, if a ZK page is
included by other pages, ZK will generate `<div>` (if the client is a
HTML browser) to enclose the output of the (incomplete) ZK page.

If you have a ZK page that contains a complete HTML page and is included
by other pages, you have to specify `true` for this option. For example,
the includer is nothing but it includes another page:

```xml
//includer.jsp
 <jsp:include page="includee.zhtml"/>
```

And, the included page contains a complete HTML page:

```html
 <?page complete="true"?>
 <htmlxmlns="http://www.zkoss.org/2005/zk/native">
     <head>
         <title>My Title</tile>
     </head>
     <body>
         My Content
     </body>
 </html>
```

# contentType

`[Optional]`  
`[Default: depends on the device]`

It specifies the content type. If not specified, it depends on the
device. For Ajax devices, it is `text/html;charset=UTF-8`. Forxml and
MIL devices, it is `text/xml;charset=UTF-8`.

Application developers rarely need to change it, unless forxml devices.

The encoding charset specified here only affects the output of a ZUML
document. For browsers, it is the HTML page which receives. The encoding
of the JavaScript files or CSS files that a HTML page might reference
are not affected.

# docType

`[Optional]`  
`[Default: depends on the device]`

It specifies the `DOCTYPE` (the root tag and DTD) that will be generated
to the output directly. This directive is mainly used byxml devices.
You rarely need to specify the DOCTYPE directive for Ajax or MIL
devices. For example,

```xml
 <?page docType="svg PUBLIC &quot;-//W3C//DTD SVG 1.1//EN&quot; &quot;http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd&quot;"?>
```

will cause the output to be generated with the following snippet

```xml
 <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"">
```

Notice that the `<!DOCTYPE...>` specified in a ZUML page is processed by
ZK Loader. It is not part of the output.

If an empty string is specified, DOCTYPE won't be generated (since
5.0.5):

```xml
<?page docType="" ?>
```

# id

`[Optional]`  
`[Default: generated automatically][EL allowed]`

Specifies the identifier of the page, such that we can retrieve it back.
If an alphabetical identifier is assigned, it will be available to
scripts (aka., `zscript`) and EL expressions embedded in ZUML pages.

```xml
 <?page id="${param.id}"?>
```

# language

`[Optional]`  
`[Default: depending on the extension][Allowed values: xul/html | xhtml]`

Specifies the markup language for this page. The markup language
determines the default component set. Currently, it supports `xul/html`
and `xhtml`.

**Note**: You can place the page directive in any location of an xml
document, but the `language` attribute is meaningful only if the
directive is located at the topmost level.

# style

`[Optional]`  
`[Default: width:100%]`  
`[EL allowed]`

Specifies the CSS style used to render the page. If not specified, it
depends on the mold. The default mold uses `width:100%` as the default
value.

```xml
 <?page style="width:100%;height:100%"?>
```

# title

`[Optional]`  
`[Default: none][EL allowed]`

Specifies the page title that will be shown as the title of the browser.

It can be changed dynamically by calling the `setTitle` method in the
[org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html) interface.

```xml
 <?page title="${param.title}"?>
```

# viewport

{% include supported-since.html version="6.5.0" %}

`[Optional]`  
`[Default: auto]`  
`[EL allowed]`

Specifies the page viewport that will define the resolution and scale on
browsers. ZK only generates this when it detects a mobile browser.

It can be changed dynamically by
[Page.setViewport()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#setViewport-java.lang.String-).

```xml
 <?page viewport="width=device-width,initial-scale=1.0,maximum-scale=5.0"?>
```

# widgetClass

`[Options]`  
`[Default: `<i>`depending on the device`</i>`]`  
`[EL allowed]`  
`[Since 5.0.5]`

Specifies the widget class of this page. If not specified, the device's
default is assumed. For example, the Ajax device's default is
[zk.Page](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Page.html).

```xml
<?page widgetClass="foo.MyPage"?>
```

# xml

`[Optional]`  
`[Default: none]`

Specifies the `xml` processing instruction (i.e., `<?xml?>`) that will be generated to the output. Currently, only xml
devices support this option.

For example,

```xml
 <?pagexml="version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;"?>
```

will generate the following as the first line of the output

```xml
 <?xml version="1.0" encoding="UTF-8"?>
```

# zscriptLanguage

`[Optional]`  
`[Default: Java][Allowed values: Java | JavaScript | Ruby | Groovy]`

Specifies the default scripting language, which is assumed if an
`zscript` element doesn't specify any scripting language explicitly.

```xml
 <?page zscriptLanguage="JavaScript"?>

 <zscript>
     var m = round(box.value); //JavaScript is assumed.
 </zscript>
```

If this option is omitted, Java is assumed. Currently, ZK supports four
different languages: Java, JavaScript, Ruby and Groovy. This option is
case-insensitive.

**Note**: Deployers can extend the number of supported scripting
languages. Please refer to [Extensions/zscript](/zuml_ref/extensions/zscript) for more details.

# Version History

| Version | Date            | Content                                   |
|---------|-----------------|-------------------------------------------|
| 5.0.5   | October, 2010   | If empty, DOCTYPE won't be generated.     |
| 5.0.5   | October, 2010   | The widgetClass attribute was introduced. |
| 6.5.0   | September, 2012 | The viewport attribute was introduced.    |
