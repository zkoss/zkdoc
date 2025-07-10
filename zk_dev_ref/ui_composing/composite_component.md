

Like a [macro component]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component),
a composite component is an approach to compose a component based on a
template. Unlike a macro component, a composite component has to create
and wire the child components by itself, and handle ID space if
necessary. The advantage is that a composite component can extend from
any component, such as [org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html), such that
it is easier to fit to any situation (and no need for the inline
concept).

In short, it is suggested to use a macro component if applicable (since
it is easier), while using a composite component otherwise.

> ------------------------------------------------------------------------
>
> If you'd like to assemble UI at runtime (aka., templating), please
> refer to [the Templating > section]({{site.baseurl}}/zk_dev_ref/ui_patterns/templating)
> for more information.

# Implement a Composite Component

First, you have to decide which component to extend from.
[org.zkoss.zul.Div](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Div.html) is a common choice as it is a
simple component. However, here our example extends from
[org.zkoss.zul.Row](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Row.html), so it can be used under
[org.zkoss.zul.Rows](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Rows.html), which the regular macros cannot.

Second, you have to implement a template (in a ZUML document) to define
what child components the composite component has. Then, you have to
implement a Java class to put them together.

## Implement a Template

The implementation of a template is straightforward. There is nothing
special to handle. Since it is rendered by
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)),
you could pass whatever data you prefer to it (through the `arg`
argument).

Suppose we have a template as follows, and it is placed at
`/WEB-INF/composite/username.zul`.

```xml
<zk>
  Usename: <textbox id="mc_who"/>
</zk>
```

## Implement a Java Class

To implement a Java class we shall:

1.  Extend from the component class you want.
2.  (Optional) Implement [org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html) to
    make it an [ID space owner]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui#ID_Space).
3.  Render the template in the constructor by the use of
    [org.zkoss.zk.ui.Executions#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))
    or others.
4.  (Optional) Wire variables, components and event listeners after
    rendering with the use of
    [org.zkoss.zk.ui.select.Selectors#wireVariables(org.zkoss.zk.ui.Component, java.lang.Object, java.util.List)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireVariables(org.zkoss.zk.ui.Component, java.lang.Object, java.util.List))
    (wiring variables),
    [org.zkoss.zk.ui.select.Selectors#wireComponents(org.zkoss.zk.ui.Component, java.lang.Object, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireComponents(org.zkoss.zk.ui.Component, java.lang.Object, boolean))
    (wiring components) and
    [org.zkoss.zk.ui.select.Selectors#wireEventListeners(org.zkoss.zk.ui.Component, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireEventListeners(org.zkoss.zk.ui.Component, java.lang.Object))
    (wiring event listeners).

For example,

```java
package foo;

import org.zkoss.zk.ui.IdSpace;
import org.zkoss.zk.ui.select.Selectors;
import org.zkoss.zul.Row;
import org.zkoss.zul.Textbox;

public class Username extends Row implements IdSpace {
    @Wire
    private Textbox mc_who; //will be wired when Components.wireVariables is called

    public Username() {
        //1. Render the template
        Executions.createComponents("/WEB-INF/composite/username.zul", this, null);

        //2. Wire variables, components and event listeners (optional)
        Selectors.wireVariables(this, this, null);
        Selectors.wireComponents(this, this, false);
        Selectors.wireEventListeners(this, this);
    }
    public String getWho() {
        return mc_who.getValue();
    }
    public void setWho(String who) {
        mc_who.setValue(who);
    }
    //public void onOK() {..} //Add event listeners if required, and wired by Components.addForwards
}
```

After
[org.zkoss.zk.ui.Executions#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))
is called, all components specified in the template will be instantiated
and become the child components of the composite component (Row). Notice
that the URI must match the location of the template correctly.

Depending on the implementation you want, you could wire the data
members (`mc_who`) by calling
[org.zkoss.zk.ui.select.Selectors#wireComponents(org.zkoss.zk.ui.Component, java.lang.Object, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireComponents(org.zkoss.zk.ui.Component, java.lang.Object, boolean)).
This method will search all data members and setter methods and *wire*
the component with the same ID. Similarly,
[org.zkoss.zk.ui.select.Selectors#wireEventListeners(org.zkoss.zk.ui.Component, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireEventListeners(org.zkoss.zk.ui.Component, java.lang.Object))
is used to wire event listeners.

For more information, please refer to [the Wire Components section]({{site.baseurl}}/zk_dev_ref/mvc/wire_variables)
and [Wire Event the Listeners section]({{site.baseurl}}/zk_dev_ref/mvc/wire_event_listeners)
sections.

> ------------------------------------------------------------------------
>
> Notice that there is a utility called
> \[<http://github.com/zanyking/ZK-Composite>\| ZK Composite\]. With the
> help of \[<http://github.com/zanyking/ZK-Composite>\| ZK Composite\],
> components are created and wired automatically based on the Java
> annotations you provide. In other words, Step 3 and 4 are done
> automatically. For more information, please refer to the [Define > Components with Java > Annotations](#Define_Components_with_Java_Annotations)
> section.

### Wire Spring-managed Beans

[org.zkoss.zk.ui.select.Selectors#wireVariables(org.zkoss.zk.ui.Component, java.lang.Object, java.util.List)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#wireVariables(org.zkoss.zk.ui.Component, java.lang.Object, java.util.List))
will wire variables that can be resolved by the registered variable
resolver. In addition to [the variable-resolver directive](zuml_ref/variable-resolver),
you can create any variable resolver manually and pass it as the third
argument.
[org.zkoss.zk.ui.select.Selectors#newVariableResolvers(java.lang.Class, java.lang.Class)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#newVariableResolvers(java.lang.Class, java.lang.Class))
provides a convenient way to instantiate variable resolvers. For
example, let us say we'd like to wire Spring-manage beans, then we can
do as follows.

```java
@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver)
public class Username extends Row implements IdSpace {
    @WireVariable
    private User user;

    public Username() {
        Executions.createComponents("/WEB-INF/composite/username.zul", this, null);

        Selectors.wireVariables(this, this,
            Selectors.newVariableResolvers(getClass(), Row.class));
        Selectors.wireComponents(this, this, false);
        Selectors.wireEventListeners(this, this);
    }
...
```

[org.zkoss.zk.ui.select.Selectors#newVariableResolvers(java.lang.Class, java.lang.Class)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/Selectors.html#newVariableResolvers(java.lang.Class, java.lang.Class))
will look for the `@VariableResolver` annotation and instantiate it
automatically. As shown, we annotate
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html) to
resolve Spring-managed bean.

For more information, please refer to [the Wire Variables section]({{site.baseurl}}/zk_dev_ref/mvc/wire_variables).

### ID Space

Unless you extend a component that is an [ID space owner]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui#ID_Space)
(such as [org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html)), all child components
specified in the template will be in the same ID space as its parent. It
might be convenient at the first glance. However, it will cause ID
conflict if we have multiple instances of the same composite component.
Thus, it is generally suggested to make the composite component a space
owner.

It can be done easily by implementing an extra interface
[org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html). No other method needs to be
implemented.

```java
public class Username extends Row implements IdSpace {
...
```

Of course, if you prefer not to have an additional ID space, you don't
need to implement [org.zkoss.zk.ui.IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html).

# Use Composite Component

Like macros and any other primitive components, you have to declare a
composite component before using it. This can be done by using
[component directives](zuml_ref/component).
Then, we could use it the same way (they are actually primitive
components). For example,

```xml
<?component name="username" extends="row" class="foo.Username"?>

<grid>
    <rows>
      <username who="Joe"/>
      <username who="Hellen"/>
    </rows>
</grid>
```

# Define Composite Components as Standard Components

If a composite component is used in multiple pages, it is better to
define it in the application level, such that it can be accessed in any
page without any [component directives](zuml_ref/component).

There are basic two approaches to define a component in the application
level:

1.  Define it in an XML file which is called [a language addon]({{site.baseurl}}/zk_client_side_ref/language_definition).
2.  Define it with Java annotations.

## Define Components in a Language Addon

A language addon is an XML file providing additional component
definitions or customizing the standard components. For example, you can
define the username component described in the previous section as
follows.

```xml
<language-addon>
    <addon-name>myapp</addon-name>
    <component>
        <component-name>username</component-name>
        <extends>rows</extends>
        <component-class>foo.Username</component-class>
    </component>
</language-addon>
```

For more information, please refer to [Customization: Component Properties]({{site.baseurl}}/zk_dev_ref/customization/component_properties#Application-wide_Initialization).

## Define Components with Java Annotations

Instead of maintaining the definitions in the language addon as
described above, you can define the component with Java annotation with
a utility called [ZK Composite](https://github.com/zanyking/ZK-Composite). For example,

```java
@Composite(name="username", macroURI="/WEB-INF/partial/username.zul")
public class Username extends Rows implements IdSpace {
    @Wire
    private Textbox mc_who; //will be wired when Components.wireVariables is called
 
    //Note: no need to create components and wire variables/components

    public String getWho() {
        return mc_who.getValue();
    }
    public void setWho(String who) {
        mc_who.setValue(who);
    }
}
```

This approach is suggested if you have to develop several composite
components. As shown, it is more convenient since you don't have to
maintain a separate XML file (the language addon). Furthermore, it will
create the components and wire them automatically based on the
annotations.

Notice that it requires [additional JAR files](http://github.com/zanyking/ZK-Composite/downloads), please refer
to [Small Talks: Define Composite Component using Java Annotation in ZK6](https://www.zkoss.org/wiki/Small_Talks/2011/December/Define_Composite_Component_using_Java_Annotation_in_ZK6)
for the details.
