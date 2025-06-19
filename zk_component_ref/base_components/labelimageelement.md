# Label Image Element

- **Java API**: [`org.zkoss.zul.impl.LabelImageElement`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelImageElement.html)
- **JavaScript API**: [`zul.LabelImageWidget`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.LabelImageWidget.html)

## Employment/Purpose
The Label Image Element is an HTML element that consists of a label and an image. It provides a way to display textual content alongside an image within the user interface.

## Preload Image
**Since**: 6.0.0
The preload image feature, introduced in version 6.0.0, is applicable to all instances of LabelImageElement and Image components. By default, the preload function is disabled, and users need to explicitly enable it by setting the `org.zkoss.zul.image.preload` custom attribute to `true`.

### Example 1:
```xml
<button image="xxx.png">
  <custom-attributes org.zkoss.zul.image.preload="true"/>
</button>
```
In this example, the `org.zkoss.zul.image.preload` custom attribute is set to `true` for the button component, enabling image preloading.

### Example 2:
```xml
<window>
  <custom-attributes org.zkoss.zul.image.preload="true"/>
  <button image="xxx.png"/>
  <image src="xxx.png"/>
</window>
```
In this example, the `org.zkoss.zul.image.preload` custom attribute is set at the window level, which applies it to all child components, including the button and image components.

In both examples, the `custom-attributes` will be recursively checked for the specified attribute based on the [`org.zkoss.zk.ui.ext.Scope`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/Scope.html) documentation.

Version 6.5.2 introduced the ability to apply the feature through the `zk.xml` configuration file as a library property.

### Example 3:
```xml
<!-- zk.xml -->
<zk>
    <library-property>
        <name>org.zkoss.zul.image.preload</name>
        <value>true</value>
    </library-property>
</zk>
```
In this example, the `org.zkoss.zul.image.preload` property is set to `true` in the `zk.xml` file at the library level, enabling image preloading for all applicable components.

## IconSclass
The Label Image Element allows you to specify built-in icon CSS classes to style the displayed icons. For more information on available icon classes, refer to the [ZK Font Awesome documentation]({{site.baseurl}}/zk_dev_ref/integration/presentation_layer/font_awesome).

## Supported Children
`*ALL`: Allows encoding any ZK component as its child.



