 With [component
definitions](ZK_Client-side_Reference/Language_Definition/component),
we could specify the initial values for the properties, attributes and
annotations of a component.

# Properties

Depending on the requirement, you could change the initial value of a
property for a particular ZUML document or for the whole application.

Notice that the initial values are applicable only to the component
instantiated by ZK Loaders. It has no effect if you instantiate it in
pure Java (unless you invoke
<javadoc method="applyProperties()" type="interface">org.zkoss.zk.ui.Component</javadoc>
after instantiating a component).

## Page-wide Initialization

Suppose we want to assign `normal` to the border property
(<javadoc method="setBorder(java.lang.String)">org.zkoss.zul.Window</javadoc>)
of all windows in a ZUML document, then we could use [the component
directive](ZUML_Reference/ZUML/Processing_Instructions/component)
as follows.

``` xml
<?component name="window" extends="window" border="normal"?>
<window title="Border"/>
```

## Application-wide Initialization

If you prefer to have the same initial value for all ZUML documents, you
could specify it in [a language
addon](ZK_Client-side_Reference/Language_Definition). For
example, we could prepare a file called `WEB-INF/lang-addon.xml` with
the following content:

``` xml
<language-addon>
    <addon-name>myapp</addon-name>
    <language-name>xul/html</language-name>
    <component>
        <component-name>window</component-name>
        <extends>window</extends>
        <property>
            <property-name>border</property-name>
            <property-value>normal</property-value>
        </property>
    </component>
</language-addon>
```

Then, we could specify this file by adding the following content to
`WEB-INF/zk.xml`:

``` xml
    <language-config>
        <addon-uri>/WEB-INF/lang-addon.xml</addon-uri>
    </language-config>
```

For more information, please refer to [ZK Configuration
Reference](ZK_Configuration_Reference/zk.xml/The_language-config_Element).

# Molds

A mold is yet another property
(<javadoc method="setMold(java.lang.String)" type="interface">org.zkoss.zk.ui.Component</javadoc>),
so you could change the initial value as described in the previous
section. However, since it is common to change the value, we allow
developers to specify the mold for a given component in a library
property. As shown, the library is named as *`ClassName`*`.mold`. For
example, if you would like to specify `trendy` as the initial mold of a
button, then you could add the following to `WEB-INF/zk.xml`:

``` xml
    <library-property>
        <name>org.zkoss.zul.Button.mold</name>
        <value>trendy</value>
    </library-property>
```

# Attributes

Like properties, you could assign an attribute's initial value for a
given component in the whole application (like calling
\[<https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/Scope.html#setAttribute(java.lang.String,%20java.lang.Object,%20boolean>)
Component.setAttribute()\]).

Notice that the initial values are applicable only to the component
instantiated by ZK Loaders. It has no effect if you instantiate it in
pure Java (unless you invoke
<javadoc method="applyProperties()" type="interface">org.zkoss.zk.ui.Component</javadoc>
after instantiating a component).

## Page-wide Initialization

Unlike the initial value of a property, there is no way to specify the
initial value of a custom attribute in a ZUML document.

## Application-wide Initialization

Similar to customizing the initial value of a property, you could
specify the following in [a language
addon](ZK_Client-side_Reference/Language_Definition) to
assign an initial value of a attribute to a component.

``` xml
<language-addon>
    <addon-name>myapp</addon-name>
    <language-name>xul/html</language-name>
    <component>
        <component-name>panel</component-name>
        <extends>panel</extends>
        <custom-attribute>
            <attribute-name>any.attribute.name</attribute-name>
            <attribute-value>any.value</attribute-value>
        </custom-attribute>
    </component>
</language-addon>
```
