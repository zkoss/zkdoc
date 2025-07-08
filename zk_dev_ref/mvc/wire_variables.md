# Wire Variables

[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html) not only
wires UI components, but also wires beans from implicit objects and
registered variable resolvers.

 

## Wire from Implicit Objects

Wiring from an implicit object is equivalent to calling
[org.zkoss.zk.ui.Components#getImplicit(org.zkoss.zk.ui.Page, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Components.html#getImplicit(org.zkoss.zk.ui.Page, java.lang.String)),
by the name specified on `@WireVariable`. If the name is absent and the
field or method parameter is of type
[org.zkoss.zk.ui.Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html),
[org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html),
[org.zkoss.zk.ui.Desktop](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Desktop.html),
[org.zkoss.zk.ui.Session](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html), or
[org.zkoss.zk.ui.WebApp](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html), it still
will be wired to the correct implicit object. However, in other cases,
an exception will be thrown.

```java
public class FooComposer extends SelectorComposer<Window> {
    
    @WireVariable
    private Page _page;
    
    @WireVariable
    private Desktop _desktop;
    
    @WireVariable
    private Session _sess;
    
    @WireVariable
    private WebApp _wapp;
    
    @WireVariable("desktopScope")
    private Map<String, Object> _desktopScope;

}
```

 

## Wire from Variable Resolver

There are two approaches to register a variable resolver: the
[org.zkoss.zk.ui.select.annotation.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/VariableResolver.html)
annotation or [the variable-resolver directive](zuml_ref/ZUML/Processing_Instructions/variable-resolver).
Here is the example of registering variable resolvers with annotations.

```java
@VariableResolver({foo1.MyResolver.class, foo2.AnotherResolver.class})
public class FooComposer extends SelectorComposer<Gird> {
....
}
```

To have [org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html) wire
a variable, you have to annotate it with the
[org.zkoss.zk.ui.select.annotation.WireVariable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/WireVariable.html)
annotation. For example,

```java
@VariableResolver({foo1.MyResolver.class, foo2.AnotherResolver.class})
public class FooComposer extends SelectorComposer<Gird> {
    @WireVariable
    Department department;
    @WireVariable
    public void setManagers(Collection<Manager> managers) {
        //...
    }
}
```

## Wire Spring-managed Beans

If you'd like [org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html)
to wire the Spring-managed beans, you can register the Spring variable
resolver,
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html)
with `@VariableResolver`. Then, you can annotate `@WireVariable` to wire
a Spring-managed bean. It's wired according to its variable name as the
bean's \*id\*. For example,

```java
@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver.class)
public class PasswordSetter extends SelectorComposer<Window> {
    @WireVariable
    private User user;
    @Wire
    private Textbox password; //wired automatically if there is a textbox named password

    @Listen("onClick=#submit")
    public void submit() {
        user.setPassword(password.getValue());
    }
}
```

[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html) is
a variable resolver used to retrieve the Spring-managed bean, so the
variable will be retrieved and instantiated by Spring.

Notice that the variables are wired before instantiating the component
and its children, so you can use them in EL expressions. For example,
assume we have a composer as follows.

```java
@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver.class)
public class UsersComposer extends SelectorComposer<Window> {
    @WireVariable
    private List<User> users;

    public ListModel<User> getUsers() {
        return new ListModelList<User>(users);
    }
}
```

Then, you could reference to `getUsers()` in the ZUML document. For
example,

```xml
<window apply="UsersComposer">
    <grid model="${$composer.users}">
...
```

where `$composer` is a built-in variable referring to the composer. For
more information, please refer to [the Composer section]({{site.baseurl}}/zk_dev_ref/mvc/composer).

> ------------------------------------------------------------------------
>
> <references/>

## Warning: Not a good idea to have Spring managing the composer

There is a tendency to make the composer a Spring-managed bean. For
example, assume we have a composer called `passwordSetter` and managed
by Spring, then we might do as follows.

```xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window apply="${passwordSetter}">
...
```

```java
@Component
public class PasswordSetter extends SelectorComposer {
   @Autowired User user;
...
```

Unfortunately, this approach is error-prone. The reason is that none of
Spring's scopes matches correctly with the lifecycle of the composers.
For example, if the Session scope is used, it will cause errors when the
user opens two browser windows to visit the same page. In this case, the
same composer will be used to serve all desktops in the given session,
and it is wrong.

The Prototype scope is a better choice since a new instance is
instantiated for each request. However, it also implies another new
instance will be instantiated if the Spring variable resolver is called
to resolve the same name again in the later requests. It is unlikely,
but it might be triggered implicitly and hard to debug. For example, it
happens if some of your code evaluates an EL expression that references
the composer's name, when an event is received.

[ZK Spring](http://www.zkoss.org/product/zkspring) is recommended if you
want to use Spring intensively. It extends Spring to provide the scopes
matching ZK lifecycle, such as the IdSpace and Component scopes. Please
refer to [ZK Spring Essentials](ZK_Spring_Essentials) for
more detailed information.

## Wire other variables in GenericForwardComposer based composers

Composers extending
[org.zkoss.zk.ui.util.GenericAutowireComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/GenericAutowireComposer.html) such as
[org.zkoss.zk.ui.util.GenericForwardComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/GenericForwardComposer.html) will
automatically wire variables based on convention during
doAfterCompose(Component comp).

This method supports autowiring based on naming convention. You don't
need to specify annotations explicitly, but it is error-prone if it is
used improperly.

This wiring by convention will wire variables based on their name in
composer, if a bean registered with the same name can be found in the
following locations:

- If enabled: ZScript variable of same name;
- If enabled: Xel variable of same name
- Attribute of component holding the composer declaration
- Attribute of component's ancestor components
- Attribute of component's page
- Attribute of component's desktop
- Attribute of component's session
- Attribute of component's webapp

Searching in zscript and xel variables can be enabled with library
properties:

[enable zscript variable wiring]({{site.baseurl}}/zk_config_ref/org.zkoss.zk.ui.composer.autowire.zscript)

[enable xel variable wiring]({{site.baseurl}}/zk_config_ref/org.zkoss.zk.ui.composer.autowire.xel)

# Wire CDI-managed Beans

The approach to work with CDI is similar to the approach for Spring,
except the variable resolver for CDI is
[org.zkoss.zkplus.cdi.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/cdi/DelegatingVariableResolver.html).

# Wiring Sequence

When extending from
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html), the fields
and methods with the proper annotations will be wired automatically.
Here is the sequence of wiring:

- In
  [org.zkoss.zk.ui.util.ComposerExt#doBeforeCompose(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ComposerExt.html#doBeforeCompose(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo)),
  it wires variables to the fields and methods annotated with the
  [org.zkoss.zk.ui.select.annotation.WireVariable](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/WireVariable.html)
  annotation. Here is the sequence of how it looks for the variable:
  1.  First, it will look for the variable resolver defined in the ZUML
      document (by use of
      [org.zkoss.zk.ui.Page#addVariableResolver(org.zkoss.xel.VariableResolver)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#addVariableResolver(org.zkoss.xel.VariableResolver))).
  2.  Second, it looks for the variable resolver annotated at the class
      with the
      [org.zkoss.zk.ui.select.annotation.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/VariableResolver.html)
      annotation.
  3.  If none is found, it looks for [the implicit objects](zuml_ref/EL_Expressions/Implicit_Objects),
      such as session and page.

# Version History

| Version | Date          | Content                       |
|---------|---------------|-------------------------------|
| 6.0.0   | February 2012 | @WireVariable was introduced. |
