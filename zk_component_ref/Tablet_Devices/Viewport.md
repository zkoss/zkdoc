

{% include versionSince\| 6.5.0 %}

# Viewport Content

The default viewport content generated in ZK when using tablet device
is:

``` xml
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

# Customize

Users can specify viewport settings by library properties or XML
processing instructions.

## Library Properties

{% include versionSince\| 6.5.0 %} The default value of
[org.zkoss.zul.tablet.meta.viewport.disabled](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zul.tablet.meta.viewport.disabled)
property is `false`. If it is set to `true`, ZK won't render viewport
content for all pages. Thus, users can specify the viewport on each ZUL
page by [meta
instruction](ZUML_Reference/ZUML/Processing_Instructions/meta).

## XML processing instruction

Users can keep the default setting and assign custom viewport on
specific pages by overwriting viewport content in [page
instruction](ZUML_Reference/ZUML/Processing_Instructions/page)
as follows:

``` xml
<?page viewport="width=device-width, initial-scale=1.0"?>
```


