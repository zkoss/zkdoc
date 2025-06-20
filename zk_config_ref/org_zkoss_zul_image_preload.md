**Property:**

`org.zkoss.zul.image.preload`

`Default: false`  
`[Since 6.5.2]`

It specifies the image will be preloaded or not for
[LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement)
and
[Image]({{site.baseurl}}/zk_component_ref/essential_components/image)
component.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

```xml
<image>
    <custom-attributes org.zkoss.zul.image.preload="true"/>
...
<button image="src.png">
    <custom-attributes org.zkoss.zul.image.preload="true"/>
...
```

# Version History

| Version | Date       | Content                                      |
|---------|------------|----------------------------------------------|
| 6.5.2   | March 2013 | Preload image is now configurable in zk.xml. |
