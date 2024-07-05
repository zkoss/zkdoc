

**Syntax:**

``` xml
 <component>
   <component-name>''a_name''</component-name>
   <extends>''a_name''</extends>
   <component-class>''a_class_name''</component-class>
   <widget-class>''a_class_name''</widget-class>
 
   <mold>
     <mold-name>''a_mold''</mold-name>
     <mold-uri>''a_uri''</mold-uri>
   </mold>
 
   <text-as>''a_property_name''</text-as>
 
   <property>
     <property-name>''a_name''</property-name>
     <property-value>''a_value''</property-value>
   </property>
 
   <annotation>
     <annotation-name>''an_annotation_name''</annotation-name>
     <property-name>''a_property_name''</property-name>
     <attribute>
       <attribute-name>''an_annotation_attr_name''</attribute-name>
       <attribute-value>''an_annotation_attr_value''</attribute-value>
     </attribute>
   </annotation>
 
    <custom-attribute>
     <attribute-name>''a_custom_attr_name''</attribute-name>
     <attribute-value>''a_custom_attr_value''</attribute-value>
   </custom-attribute>
 </component>
```

It declares a component definition. You can use this to define your
custom component which can extend the existing component or a
completely-new component with it's own Java class or JavaScript widget.

# Usage Examples

## Set Default Value for Button in Application-scope

``` xml
    <component>
        <component-name>button</component-name>
        <extends>button</extends>
        <property>
            <property-name>autodisable</property-name>
            <property-value>self</property-value>
        </property>
    </component>
```

# component-name

`[Required]`

The name of the component. It must be unique in the whole language.

# extends

`[Optional]`

It specifies whether this definition is extending from another
definition. If omitted, it is considered a definition of a new
component. If specified, it extends from the given component definition
(which must be defined first).

Notice that the component's name could be the same as the definition it
extends from. If the same, the existent definition is simply overridden
(no new component definition is created). It is a useful technique to
change a component definition, such as adding annotation, providing the
initial properties and so on.

## depend required

if your component extends a component, most likely you need to specify [
<depends>](ZK_Client-side_Reference/Language_Definition/depends)
to ensure parsing order.

# component-class

`[Required if no extends]`

It specifies the component's Java class at the server side. It is
required if you define a new component.

# widget-class

`[Required if no extends][EL expressions allowed]`

It specifies the widget's class at the client side. For Ajax clients, it
must be a JavaScript class. It is required if you define a new
component.

Since EL expressions are allowed, the widget class being associated with
a component could be decided at runtime. Please refer to [Blog: Totally
Different Look per User Without Modifying
Application](http://blog.zkoss.org/index.php/2010/08/02/totally-different-look-per-user-without-modifying-application/)
for an example.

# mold

Any number of molds are allowed.

## Custom Mold

If you just want to register a custom mold for the existing ZK
component, just extends the standard component and specify the mold
like:

``` XML
    <component>
        <component-name>tabbox</component-name>
        <extends>tabbox</extends>
        <mold>
            <mold-name>adjacent</mold-name>
            <mold-uri>mold/tabbox-adjacent.js</mold-uri>
        </mold>
    </component>
```

Then you can specify the mold on the component like

``` xml
<tabbox mold="adjacent">
```

## mold-uri

You can specify:

- a path relative to a widget js
- [ classpath web resource
  path](ZK_Developer%27s_Reference/UI_Composing/ZUML/Include_a_Page#Classpath_Web_Resource_Path)

# property

`[Optional][EL expressions allowed in the property value]`

It specifies an initial property. Once the property is specified, the
corresponding setter will be called when ZK Loader instantiates from a
ZUML document. Of course, if you instantiate it directly in Java, this
setting has no effect.

Suppose we want to make all window's border default to `normal`, we
could do as follows.

[Customization
Reference](ZK_Developer's_Reference/Customization/Component_Properties)

``` xml
<property>
    <property-name>border</property-name>
    <property-value>normal</property-value>
</property>
```

Another example , to turn off combobox's autocomplete.

``` xml
<component>
    <component-name>combobox</component-name>                      <!-- required -->
    <component-class>org.zkoss.zul.Combobox</component-class>      <!-- required -->
    <widget-class>zul.inp.Combobox</widget-class>                  <!-- required -->
    <property> 
        <property-name>autocomplete</property-name>
        <property-value>false</property-value>
    </property>
</component>
```

# text-as

`[Optional]`

It specifies the name of the property to assign the text enclosed by the
XML element. If omitted (default), the text will be interpreted as a
label and a label component defined in
[label-template](ZK_Client-side_Reference/Language_Definition/label-template)
will be used.

For example, if you specify

``` xml
<component>
  <component-name>foo</component-name>
  <text-as>content</text-as>
```

then, the following ZUML document

``` xml
<foo>the content of foo</foo>
```

will cause `foo.setContent("the content of foo")` to be called (assume
foo is an instance of the component).

# template-uri

`[Optional]`

Specify a URI of a zul file as a template of this component. Support
`~.`. When you use the custom tag in a zul, ZK will inject the specified
zul file like you use
<apply templateURI="/my/long/path/mytemplate.zul"/>. If you specify this
element, it will override <extends>.

## Required zuti

This feature requires `zuti` module:

``` xml
<language-addon>
    <addon-name>my-addon</addon-name>
    <version>0.1</version>
    <language-name>xul/html</language-name>
    <depends>zuti</depends>
```

## Define a Custom Component

``` xml
    <component>
        <component-name>megamenu</component-name>
        <template-uri>/uiComposing/megaMenuParameterized.zul</template-uri>
    </component>
    <component>
        <component-name>state-box</component-name>
        <template-uri>/WEB-INF/template/stateBox.zul</template-uri>
    </component>
    <component>
        <component-name>my-box</component-name>
        <template-uri>~./template/infoBox.zul</template-uri>
    </component>
```

Then those custom components are available in application scope, and you
can use it in any zul like other components:

``` xml
<megamenu>
```

This can improve readability and reusability.
