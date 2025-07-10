

In addition to generating HTML output to a browser, ZK could be used to
generate (static) XML output to any client that recognizes it, such as
[RSS](http://www.whatisrss.com/) and [Web Services](http://en.wikipedia.org/wiki/Web_service).

Using ZK to generate XML output is straightforward:

1.  Uses the XML component set (http://www.zkoss.org/2007/xml and
    shortcut is `xml`).
2.  Maps the file extension to ZK Loader
3.  Maps the file extension to the XML component set

The XML component set also provides some special components, such as
[transformer]({{site.baseurl}}/zk_component_ref/xml_components/transformer)
that supports XSTL. For more information please refer to [XML Components]({{site.baseurl}}/zk_component_ref/xml_components).

# Use the XML Component Set

The [XML component set](/zuml_ref/xml)
(aka., the XML [language](/zuml_ref/languages), in
ZK terminology) is used to generate XML output. Unlike the
[ZUL](/zuml_ref/zul) or
[XHTML](/zuml_ref/xhtml) component sets,
all unknown[^1] tags in a ZUML document are assumed to belong to the
[native namespace](/zuml_ref/native). It
means ZK generates them directly to the output without instantiating a
ZK component for each of them.

The following is an example that generates the SVG output. It looks very
similar to the XML output you want to generate, except you can use
zscript, EL expressions, macro components and other ZK features.

![]({{site.baseurl}}/zk_dev_ref/images/xml_svg.png)

```xml
 <?page contentType="image/svg+xml;charset=UTF-8"?>
 <svg  height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"
 xmlns:z="zk">
     <z:zscript><![CDATA[
     String[] bgnds = {"purple", "blue", "yellow"};
     int[] rads = {30, 25, 20};
     ]]></z:zscript>
     <circle style="fill:${each}" z:forEach="${bgnds}"
         cx="${50+rads[forEachStatus.index]}"
         cy="${20+rads[forEachStatus.index]}"
         r="${rads[forEachStatus.index]}"/>
 </svg> 
```

The generated output will be

```xml
<svg xmlns="http://www.w3.org/2000/svg"  height="100%"
    version="1.1">
    <circle style="fill:purple" cx="80" cy="50" r="30">
    </circle>
    <circle style="fill:blue" cx="75" cy="45" r="25">
    </circle>
    <circle style="fill:yellow" cx="70" cy="40" r="20">
    </circle>
</svg>
```

where

- The content type is specified with the [page directive](/zuml_ref/page).
  For SVG, it is `image/svg+xml`. The `xml` processing instruction
  (<code>
  <?xml?>

  </code>) and `DOCTYPE` of the output are also specified in the `page`
  directive.
- All tags in this example, such as `svg` and `circle`, are associated
  with a namespace (http://www.w3.org/2000/svg) that is unknown to ZK
  Loader. Thus, they are assumed to belong to the [native namespace](/zuml_ref/native). They are
  output directly rather than instantiating a ZK component for each of
  them.
- To use `zscript`, `forEach` and other ZK specific features, you have
  to specify the [ZK namespace](/zuml_ref/zk) (zk).

> ------------------------------------------------------------------------
>
> <references/>

# Maps the File Extension to ZK Loader

To let ZK Loader process the file, you have to associate it with the ZK
Loader in `WEB-INF/web.xml`. In this example, we map all files with the
`.svg` extension to ZK Loader[^2]:

```xml
 <servlet-mapping>
     <servlet-name>zkLoader</servlet-name>
     <url-pattern>*.svg</url-pattern>
 </servlet-mapping>
```

> ------------------------------------------------------------------------
>
> <references/>

# Maps the File Extension to the XML Component Set

Unless the file extension is `.xml`, you have to associate it with the
XML component set (aka., the XML language) explicitly in
`WEB-INF/zk.xml`. In this example, we map `.svg` to the XML component
set:

```xml
 <language-mapping>
     <language-name>xml</language-name>
     <extension>svg</extension>
 </language-mapping>
```

where `xml` is the language name of the [XML component set](/zuml_ref/xml). Thus, when ZK Loader
parses a file with the `.svg` extension, it knows the default language
is the XML component set[^3].

> ------------------------------------------------------------------------
>
> <references/>

[^1]: By the unknown tag we mean an XML element that is not associated
    with an XML namespace, or the namespace is unknown.

[^2]: We assume ZK Loader (`zkLoader`) is mapped to
    `org.zkoss.zk.ui.http.DHtmlLayoutServlet`.

[^3]: For more information about language identification, please refer
    to [ZUML Reference](/zuml_ref/languages).
