 With [component definitions]({{site.baseurl}}/zk_client_side_ref/component),
we could specify the initial values for the properties, attributes and
annotations of a component. If you want to set the initial value of a property (such as `showTodayLink` for `Datebox`, or any other property for any component) globally across your application, you can use the language addon mechanism described above.

# Properties

Depending on the requirement, you can change the initial value of a
property(attribute) for a particular ZUML document or for the whole application.

Notice that the initial values are applicable only to the component
instantiated by ZK Loaders. It has no effect if you instantiate it in
pure Java (unless you invoke
[org.zkoss.zk.ui.Component#applyProperties()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#applyProperties())
after instantiating a component).

## Page-wide Initialization

Suppose we want to assign `normal` to the border property
([org.zkoss.zul.Window#setBorder(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html#setBorder(java.lang.String)))
of all windows in a ZUML document, then we could use [the component directive](zuml_ref/component)
as follows.

```xml
<?component name="window" extends="window" border="normal"?>
<window title="Border"/>
```

## Application-wide Initialization

If you prefer to have the same initial value for all ZUML documents, you
could specify it in [a language addon]({{site.baseurl}}/zk_client_side_ref/language_definition). For
example, we could prepare a file called `WEB-INF/lang-addon.xml` with
the following content:

```xml
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

```xml
    <language-config>
        <addon-uri>/WEB-INF/lang-addon.xml</addon-uri>
    </language-config>
```

For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_language_config_element).

# Molds

A mold is yet another property
([org.zkoss.zk.ui.Component#setMold(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setMold(java.lang.String))),
so you could change the initial value as described in the previous
section. However, since it is common to change the value, we allow
developers to specify the mold for a given component in a library
property. As shown, the library is named as *`ClassName`*`.mold`. For
example, if you would like to specify `trendy` as the initial mold of a
button, then you could add the following to `WEB-INF/zk.xml`:

```xml
    <library-property>
        <name>org.zkoss.zul.Button.mold</name>
        <value>trendy</value>
    </library-property>
```

# Attributes

Like properties, you could assign an attribute's initial value for a
given component in the whole application (like calling
\[<https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/Scope.html#setAttribute(java.lang.String,_java.lang.Object,_boolean>)
Component.setAttribute()\]).

Notice that the initial values are applicable only to the component
instantiated by ZK Loaders. It has no effect if you instantiate it in
pure Java (unless you invoke
[org.zkoss.zk.ui.Component#applyProperties()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#applyProperties())
after instantiating a component).

## Page-wide Initialization

Unlike the initial value of a property, there is no way to specify the
initial value of a custom attribute in a ZUML document.

## Application-wide Initialization

Similar to customizing the initial value of a property, you could
specify the following in [a language addon]({{site.baseurl}}/zk_client_side_ref/language_definition) to
assign an initial value of a attribute to a component.

```xml
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
