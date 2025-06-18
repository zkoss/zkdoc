In addition to annotating a component or its properties, you could
annotate a component definition, such that all its instances will have
the annotations.

To annotate a component definition, you have to specify the annotations
in [a language
definition]({{site.baseurl}}/zk_client_side_ref/language_definition).
For example, we could extend the definition of bandbox to add
annotations. Please refer to [ZK Component Reference/Annotation/Data
Binding]({{site.baseurl}}/zk_component_ref/annotation/data_binding) for
detail.

```xml
<component>
    <component-name>bandbox</component-name>
    <extends>bandbox</extends>
    <annotation>
        <annotation-name>ZKBIND</annotation-name>
        <property-name>value</property-name>
        <attribute>
            <attribute-name>ACCESS</attribute-name>
            <attribute-value>both</attribute-value>
        </attribute>
        <attribute>
            <attribute-name>SAVE_EVENT</attribute-name>
            <attribute-value>onChange</attribute-value>
        </attribute>
        <attribute>
            <attribute-name>LOAD_REPLACEMENT</attribute-name>
            <attribute-value>rawValue</attribute-value>
        </attribute>
        <attribute>
            <attribute-name>LOAD_TYPE</attribute-name>
            <attribute-value>java.lang.String</attribute-value>
        </attribute>
    </annotation>
    <annotation>
        <annotation-name>ZKBIND</annotation-name>
        <property-name>open</property-name>
        <attribute>
            <attribute-name>ACCESS</attribute-name>
            <attribute-value>both</attribute-value>
        </attribute>
        <attribute>
            <attribute-name>SAVE_EVENT</attribute-name>
            <attribute-value>onOpen</attribute-value>
        </attribute>
    </annotation>       
</component>
```
