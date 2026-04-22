---
title: "The language-addon"
---

The language-addon contains a description of the relation between the
component and widget referred to as the component definition. The path
of the file must be **/metainfo/zk/lang-addon.xml** and be located in
the Java class path.

```xml
<language-addon>
    <addon-name>simplelabel</addon-name>
    <language-name>xul/html</language-name>
 
    <component>
        <component-name>simplelabel</component-name>
        <component-class>com.foo.SimpleLabel</component-class>
        <widget-class>com.foo.SimpleLabel</widget-class>
        <mold>
            <mold-name>default</mold-name>
            <mold-uri>mold/simple-label.js</mold-uri>
            <css-uri>css/simple-label.css.dsp</css-uri>
        </mold>
    </component>
</language-addon>
```

The table below describes the elements used within the above XML and
their descriptions.

| Name            | Description                                                                           |
|-----------------|---------------------------------------------------------------------------------------|
| addon-name      | A unique name for this addon                                                          |
| annotation      | [Annotation setting for Data Binding]({{site.baseurl}}/zk_component_ref/data_binding) |
| language-name   | The language name that this addon belongs to (for instance, xul/html or zhtml)        |
| component-name  | A unique name of the component in the language of this addon                          |
| component-class | The name of the component class (Java class)                                          |
| widget-class    | The name of the widget class (JavaScript class)                                       |
| mold            | A mold definition (optional)                                                          |
| mold-name       | The name of the mold. The default mold is named default.                              |
| mold-uri        | The URI of the mold                                                                   |
| css-uri         | The URI of the CSS file for the mold                                                  |

A component may have multiple molds which may or may not have different
widget classes. To handle this you may specify the **<widget-class>**
inside **<mold>**. You can specify more than one mold.

After creating the component descriptor language-addon we need to create
the widget package descriptor.

For more information, please refer to [ZK Client-side Reference: Language Definition]({{site.baseurl}}/zk_client_side_ref/language_definition).
