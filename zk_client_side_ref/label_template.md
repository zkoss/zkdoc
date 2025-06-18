**Syntax:**

```xml
<label-template>  
    <component-name>a_component_name</component-name>  
    <component-attribute>a_property</component-attribute>  
</label-template>
```

It specifies how to instantiate a label. When [the text](ZUML_Reference/ZUML/Texts) is found in a ZUML document,
ZK Loader will first check if the so-called
[text-as]({{site.baseurl}}/zk_client_side_ref/language_definition/component)
property is defined. If so, the setter is called to pass the text to the
component. If not, this label template is used to instantiate a label
for holding the text.

Example,

```xml
<label-template>
    <component-name>label</component-name>
    <component-attribute>value</component-attribute>
</label-template>
```

# component-name

`[Required]`

The name of the component definition that represents a label.

# component-attribute

`[Required]`

The property of the component definition for holding the text.


