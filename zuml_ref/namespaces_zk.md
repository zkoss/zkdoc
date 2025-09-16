Name: zk 
Namespace URI: http://www.zkoss.org/2005/zk
Namespace shortcut: zk
JavaDoc: [org.zkoss.zk.ui.metainfo.LanguageDefinition#ZK_NAMESPACE](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/LanguageDefinition.html#ZK_NAMESPACE)

It is the standard namespace for specifying ZK specific elements and
attributes, such as the
[ZUML_Reference/ZUML/Elements/zk](/zuml_ref/elements_zk) and [ZUML_Reference/ZUML/Attributes/unless](/zuml_ref/unless).

By default, ZK Loader will detect if an XML element or attribute is a
special element or attribute and then handle it differently. However,
if the default XML namespace is the
[ZUML_Reference/ZUML/Namespaces/Native](/zuml_ref/native) or a component set that
accepts any element name, such as
[ZUML_Reference/ZUML/Languages/XHTML](/zuml_ref/xhtml), you have to specify
the zk namespace. Otherwise, they will be interpreted as a component.
For example,

``` xml
<html xmlns="native" xmlns:u="zul" xmlns:zk="zk">
    <head>
        <title>ZHTML Demo</title>
    </head>
    <body>
        <script type="text/javascript">
        function woo() { //running at the browser
        }
        </script>
        <zk:zscript>
        void addItem() { //running at the server
        }
        </zk:zscript>
        <u:window title="HTML App">
            <input type="button" value="Add Item"
            onClick="woo()" zk:onClick="addItem()"/>
        </u:window>
    </body>
</html>
```
