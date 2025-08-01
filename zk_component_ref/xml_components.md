

This section describes how to use the [XML component set](/zuml_ref/xml). The XML component
set is a special [component set](/zuml_ref/languages) used in a XML device. A
XML device is a client that accepts XML output. You can *not* use it
with [ZUL](/zuml_ref/zul) or
[XHTML](/zuml_ref/xhtml).

For introduction please refer to [ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/ui_patterns/xml_output).

Most of XML elements with the XML namespace are mapped to a general XML
component ([org.zkoss.zml.XmlNativeComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zml/XmlNativeComponent.html)) that
will generate the element and all its attributes to the client directly.
However, the XML component set also provide some components for
different functionality. We discuss them one-by-one in the following
sections.