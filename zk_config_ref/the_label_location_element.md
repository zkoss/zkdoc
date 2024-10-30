**Syntax:**

<label-location>a_uri</label-location>

[Default: `/WEB-INF/zk-label.properties`]

It specifies the location of the properties file for [the
internationalization
labels](ZK_Developer's_Reference/Internationalization/Labels).
If you have multiple properties files, you could specify them one by
one. For example,

``` xml
<system-config>
    <label-location>/WEB-INF/labels/order.properties</label-location>
    <label-location>/WEB-INF/labels/invoice.properties</label-location>
</system-config>
```

Notice that, once specified, `WEB-INF/zk-labels.properties` is ignored.
In other words, ZK loads only the files specified in the label-location
element. If you still want to load it, you have to specify it in
`WEB-INF/zk.xml` too.

``` xml
<system-config>
    <label-location>/WEB-INF/zk-label.properties</label-location><!-- if you still need zk-label.properties -->
    <label-location>/WEB-INF/labels/order.properties</label-location>
    <label-location>/WEB-INF/labels/invoice.properties</label-location>
</system-config>
```
