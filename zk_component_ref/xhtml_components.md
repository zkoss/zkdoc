

This section describes how to use the [XHTML component set](/zuml_ref/xhtml) (i.e., XHTML
components). XHTML components are in a different component set than [ZUL components](/zuml_ref/zul). You have to
[specify XML namespace](/zuml_ref/languages) to
distinguish them if you want to use them in the same ZUML document. For
example,

```xml
<window xmlns:h="xhtml">
    <h:ul>
        <h:li>Click <button/></h:li>
    </h:ul>
</window>
```

Notice that the HTML component set is one of the approaches to use HTML
tags directly in a ZUML document. In most cases, it is not the best
approach. For information please refer to [ZK Developer's Reference: HTML tags]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags).