**Property:**

`org.zkoss.zul.image.preload`

`Default: false`  
`[Since 6.5.2]`

It specifies the image will be preloaded or not for
[LabelImageElement](ZK_Component_Reference/Base_Components/LabelImageElement)
and
[Image](ZK_Component_Reference/Essential_Components/Image)
component.

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
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
