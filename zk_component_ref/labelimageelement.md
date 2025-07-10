

# Label Image Element

- Demonstration: N/A
- Java API: [org.zkoss.zul.impl.LabelImageElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/LabelImageElement.html)
- JavaScript API:
  [zul.LabelImageWidget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.LabelImageWidget.html)

# Employment/Purpose

An HTML element with a label and an image.

# Preload Image

{% include version-badge.html version=6.0.0 %}

The feature is applied to all of the LabelImageElement and Image
components.

By default the preload function is disabled, so users have to specify
the *custom-attributes* and set it to true. For example,

```xml
<button image="xxx.png">
  <custom-attributes org.zkoss.zul.image.preload="true"/>
</button>
```

Or specify it just below the root component.

For example,

```xml
<window>
  <custom-attributes org.zkoss.zul.image.preload="true"/>
  <button image="xxx.png"/>
  <image src="xxx.png"/>
</window>
```

As you can see, the *custom-attributes* will be checked recursively (see
also
[org.zkoss.zk.ui.ext.Scope#getAttribute(java.lang.String,boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/Scope.html#getAttribute(java.lang.String,boolean))).

{% include version-badge.html version=6.5.2 %}

The feature can also applied from zk.xml as a library property.

For example,

```xml
<!-- zk.xml -->
<zk>
    <library-property>
        <name>org.zkoss.zul.image.preload</name>
        <value>true</value>
    </library-property>
</zk>
```

# IconSclass

Allow you to specify built-in icon CSS classes, see
[Font Awesome]({{site.baseurl}}/zk_dev_ref/integration/font_awesome)

# Supported Events

- Inherited Supported Events: [ LabelElement]({{site.baseurl}}/zk_component_ref/base_components/labelelement#Supported_Events)

# Supported Children

`*All`

# Version History

| Version | Date           | Content                                                                                                                                |
|---------|----------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 8.6.2   | May 2019       | [ZK-4243: The result of hflex="min" is not sufficient if the content has Font Awesome icons](https://tracker.zkoss.org/browse/ZK-4243) |
| 7.0.0   | October 2012   | Add iconSclass attribute with FontAwesome supported.                                                                                   |
| 6.0.0   | September 2011 | [ZK-314: A way to pre-load images since many UIs depend on the size of an image](http://tracker.zkoss.org/browse/ZK-314)               |
| 10.0.0  | August 2023    | [ZK-5502: Allow users to customize tooltip on the icon](http://tracker.zkoss.org/browse/ZK-5502)                                       |
| 10.0.0  | August 2023    | [ZK-5503: Allow users to set multiple icons and tooltips on the same LabelImageElement](http://tracker.zkoss.org/browse/ZK-5503)       |
| 10.0.0  | September 2023 | [ZK-5119: Integrate Font Awesome 6 free icons](http://tracker.zkoss.org/browse/ZK-5119)                                                |


