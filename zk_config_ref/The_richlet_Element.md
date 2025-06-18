To declare a richlet, you have to add the `richlet` element to `zk.xml`.
You could specify any number of `richlet` elements. Each of them must
have two child elements, `richlet-name` and `richlet-class`, and might
have any number of the `init-param` child elements.

The class name specified in the `richlet-class` element must implement
the <javadoc type="interface">org.zkoss.zk.ui.Richlet</javadoc>
interface. The name and value specified in the `init-param` element can
be retrieved when the `init` method of
<javadoc method="init(org.zkoss.zk.ui.RichletConfig)" type="interface">org.zkoss.zk.ui.Richlet</javadoc>
is called.

```xml
<richlet>
    <richlet-name>Test</richlet-name>
    <richlet-class>org.zkoss.zkdemo.TestRichlet</richlet-class>
    <init-param>
        <param-name>any</param-name>
        <param-value>any</param-value>
    </init-param>
</richlet>
```

Once declaring a richlet, you can map it to any number of URL by the use
of [the richlet-mapping
element]({{site.baseUrl}}/zk_config_ref/The_richlet-mapping_Element)
as described in the next section.


