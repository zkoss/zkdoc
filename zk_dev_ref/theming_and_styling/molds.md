A component could have multiple different visual appearances. Each
appearance is called a **mold**. A mold is basically a combination of a
DOM structure plus CSS. That is, it is the visual representation of a
component. Developers could dynamically change the mold by use of
[org.zkoss.zk.ui.Component#setMold(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setMold(java.lang.String)).

All components support at least a mold called `default`, which is the
default value. Some components might have support for two or more molds.
For example, tabbox supports both `default` and `accordion` molds.

If `tabbox`'s `mold` is not set, it uses the default mold.

```xml
<tabbox>
    <tabs>
        <tab label="First tab" />
        <tab label="Second tab" />
    </tabs>
    ...
</tabbox>
```

And you could set `tabbox`'s mold to "accordion" to change the look.

```xml
<tabbox mold="accordion">
    <tabs>
        <tab label="First tab" />
        <tab label="Second tab" />
    </tabs>
    ...
</tabbox>
```

# Supported Mold

To know which mold a component supports, please refer to [ZK Component Reference](/zk_component_ref/introduction)).

# Custom Mold

To largely change how a component renders in a browser, see
[ZK Client-side Reference/Customization/Custom Mold]({{site.baseurl}}/zk_client_side_ref/custom_mold).
