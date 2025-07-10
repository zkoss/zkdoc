

There are two ways to implement a component. One is to implement a
component in a Java class, extending from other component or one of the
skeletal implementations with an optional JavaScript class. It is
flexible and, technically, is also able to implement any functionality
you want. For more information please refer to [ZK Component Development Essentials](/zk_component_dev_essentials/zk_component_overview).

On the other hand, we could implement a new component by using the
others and composing them in a ZUML page. In other words, we could
define a new component by expressing it in a ZUML page. It works like
composition, macro expansion, or inline replacement.

For the sake of convenience, we call the first type of components
*primitive components* and the second type *macro components*. In this
section we will get into more details on how to implement a macro
component and how to use it.

There is a similar concept called composite components. Unlike macros,
you could derive from any component but you have to do the loading of
ZUML manually. For more information please refer to the [Composite Component]({{site.baseurl}}/zk_dev_ref/ui_composing/composite_component)
section.

# Definition, Declaration and Use

It is straightforward to apply macro components to an application:

1.  Define (aka., Implement) a macro component in a ZUML page.
2.  Declare the macro component in the page or the whole application
    that is going to use the macro component.
3.  Use the macro components. The use of a macro component is the same
    as using primitive components.

## Define Macro Component

The definition of a macro component is expressed in a ZUML page. In
other words, the page is the template of the macro component. It is the
same as any other ZUML pages as it does not require any special syntaxes
at all. Furthermore, any ZUML page can be used as a macro component too.

For example, assume that we want to pack a label and a text box as a
macro component. Then we could create a page, say
`/WEB-INF/macros/username.zul`, as follows.

```xml
<hlayout>
    Username: <textbox/>
</hlayout>
```

## Declare Macro Component

Before using a macro component, you have to declare it first. It is
straightforward to use [component directives](zuml_ref/component).
For example, we could add the first line to the page that is going to
use the *username* macro component:

```xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul"?>
```

As shown, we have to declare the component's name (the `name` attribute)
and the URI of the page defining the macro component (the `macroURI`
attribute).

If you prefer to make a macro component available to all pages, you
could add the component definition to the so-called language addon and
add it to
[WEB-INF/zk.xml]({{site.baseurl}}/zk_config_ref/the_language-config_element).

## Use Macro Component

Using a macro component in a ZUML page is the same as the use of any
other components. There is no difference at all.

```xml
<window>
    <username/>
</window>
```

# Pass Properties to Macro Component

Like an ordinary component, you can specify properties (a.k.a.,
attributes) when using a macro component. For example,

```xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul"?>
<window>
    <username who="John" label="Username"/>
</window>
```

All these properties specified are stored in a map that is then passed
to the template (aka., the macro definition; `macroURI`) via a variable
called `arg`. Then, from the template, you could access these properties
by the use of EL expressions as shown below:

```xml
<hlayout>
    ${arg.label}: <textbox value="${arg.who}"/>
</hlayout>
```

## arg.includer

In addition to properties (aka., attributes), a property called
`arg.includer` is always passed. It refers to the macro component
itself. With this, we could reference other information such as its
parent:

```xml
${arg.includer.parent}
```

Notice that `arg.includer` is different from the so-called inline
macros. The inline macros are special macro components and used for
inline expansion. For more information please refer to [Inline Macros]({{site.baseurl}}/zk_dev_ref/ui_composing/inline_macros)
section.

## Pass Initial Properties

Sometimes it is helpful to pass a list of initial properties that will
be used to initialize a component when it is instantiated. It can be
done easily as follows.

```xml
<?component name="mycomp" macroURI="/macros/mycomp.zul"
   myprop="myval" another="anotherval"?>
```

Therefore,

```xml
<mycomp/>
```

is equivalent to

```xml
<mycomp myprop="myval1" another="anotherval"/>
```

# Control Macro in Java

## Instantiate Macro in Java

To instantiate a macro component in Java, you could do the followings.

1.  Looks up the component definition
    ([org.zkoss.zk.ui.metainfo.ComponentDefinition](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/ComponentDefinition.html))
    with the use of
    [org.zkoss.zk.ui.Page#getComponentDefinition(java.lang.String, boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#getComponentDefinition(java.lang.String, boolean)).
2.  Invokes
    [org.zkoss.zk.ui.metainfo.ComponentDefinition#newInstance(org.zkoss.zk.ui.Page, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/ComponentDefinition.html#newInstance(org.zkoss.zk.ui.Page, java.lang.String))
    to instantiate the component.
3.  Invokes
    [org.zkoss.zk.ui.Component#setParent(org.zkoss.zk.ui.Component)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setParent(org.zkoss.zk.ui.Component))
    to attach the macro to a parent, if necessary.
4.  Invokes
    [org.zkoss.zk.ui.Component#applyProperties()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#applyProperties())
    to apply the initial properties defined in the component definition.
5.  Invokes
    [org.zkoss.zk.ui.ext.DynamicPropertied#setDynamicProperty(java.lang.String, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/DynamicPropertied.html#setDynamicProperty(java.lang.String, java.lang.Object))
    to assign any properties you want.
6.  Finally, invokes
    [org.zkoss.zk.ui.ext.AfterCompose#afterCompose()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/ext/AfterCompose.html#afterCompose())
    to create components defined in the template

For example,

```java
HtmlMacroComponent ua = (HtmlMacroComponent)
    page.getComponentDefinition("username", false).newInstance(page, null);
ua.setParent(wnd);
ua.applyProperties(); //apply properties defined in the component definition
ua.setDynamicProperty("who", "Joe");
ua.afterCompose(); //then the ZUML page is loaded and child components are created
```

It is a bit tedious. If you implement your own custom Java class
(instead of [org.zkoss.zk.ui.HtmlMacroComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlMacroComponent.html)), it
will be simpler. For example,

```java
Username ua = new Username();
ua.setParent(wnd);
ua.setWho("Joe");
```

Please refer to the [Implement Custom Java Class]({{site.baseurl}}/zk_dev_ref/ui_composing/implement_custom_java_class)
section for details.

## Change Template at Runtime

You could change the template dynamically by the use of
[org.zkoss.zk.ui.HtmlMacroComponent#setMacroURI(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlMacroComponent.html#setMacroURI(java.lang.String)).
For example,

```xml
<username id="ua"/>
<button onClick="ua.setMacroURI(&quot;another.zul&quot;)"/>
```

If the macro component was instantiated, all of its children will be
removed first, and then the new template will be applied (so-called
recreation).
