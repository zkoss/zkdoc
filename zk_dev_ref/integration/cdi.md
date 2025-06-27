# Overview

Contexts and Dependency Injection (CDI) is one of Java EE 6 features and
is composed of a set of services designed for using with stateful
objects. It also allows developers to integrate various kinds of objects
in a loosely coupled and type safe way. We will talk about several ways
of integration including injecting and accessing CDI beans under
different conditions. We assume that readers have knowledge in basic CDI
configuration and concept such as bean scope, we will therefore not
cover those topics here. Please refer to [Oracle's CDI tutorial](http://docs.oracle.com/javaee/6/tutorial/doc/gjbnr.html).

# Access a CDI Bean in a ZUL

ZUL provides a feature called [ variable resolver]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/el_expressions#Variable_Resolver)
that allows users to access CDI bean using EL expression. To do this,
simply put the below directive on top of a ZUML page:

**`<?variable-resolver class="org.zkoss.zkplus.cdi.DelegatingVariableResolver" ?>`**

Then, in the rest of your page, you can access a CDI bean which has
`@Named` directly using its **bean EL name**.

**Session scoped bean**

```java
@SessionScoped @Named
public class UserPreference implements Serializable{
...
}
```

- User preference should be distinct for each user but shared among
  multiple requests. It is suitable to be a session scoped bean.

**Application scoped bean**

```java
@ApplicationScoped @Named
public class SystemConfiguration implements Serializable{
...
}
```

- As system configuration should be shared within the whole application,
  it should be an application scoped bean.

**Access bean using EL in a ZUL**

```xml
<?variable-resolver class="org.zkoss.zkplus.cdi.DelegatingVariableResolver"?>
...
            <hlayout>
                User Preference :
                <label id="sessionValue">${userPreference.value}</label>
            </hlayout>
            <hlayout>
                System Configuration :
                <label id="applicationValue">${systemConfiguration.value}</label>
            </hlayout>
...
```

# Wire CDI beans

## Wire a CDI bean in a Composer

It is likely that we need to use a CDI bean in a composer, for example
calling a service layer object to perform business logic. If a composer
is a CDI bean, we can simply use `@Inject` to inject all collaborators.
However, we do not recommend this approach as explained in previously.

ZK provides another approach to wire a CDI bean in a composer which is
not a CDI bean. With help of
`org.zkoss.zkplus.spring.DelegatingVariableResolver` and
`@WireVairable`, we can inject CDI beans into a composer. There are two
ways to apply a variable resolver to a composer. We can

1.  Put it in a zul with directive mentioned in the previous section or,
2.  In a Java class with annotation, `@VariableResolver` then apply the
    annotation, `@WireVariable` on the variables which we want to inject
    CDI beans to.

Example code are as follow:

**A composer injected with a CDI bean**

```java

public class ResolverComposer extends SelectorComposer<Window> {

    @WireVariable("normalOrderService")
    NormalOrderService orderService;
    
    @Wire("#number")
    private Label label;
    
    
    @Override
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        label.setValue(Integer.toString(orderService.findAll().size()));
    }
    
}
```

**A ZUL with CDI variable resolver**

```xml

<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window title="Access Bean with different scopes" border="normal" width="700px"
    apply="org.zkoss.reference.developer.spring.composer.OrderComposer">
...
</window>
```

## Wire a CDI bean in a ViewModel

Like wiring in a composer, we apply CDI variable resolver with directive
and `@WireVariable` to inject CDI beans.

```java

public class MyViewModel{

    @WireVariable
    private UserPreference userPreference;
    @WireVariable
    private ProductService productService;
    
    private List<String> productList;
    
    @Init
    public void doAfterCompose(Window comp) throws Exception {
        productList = productService.findAll();
    }

    public UserPreference getUserPreference() {
        return userPreference;
    }
    
}
```

```xml

<?variable-resolver class="org.zkoss.zkplus.cdi.DelegatingVariableResolver"?>
<window border="normal" width="500px"
    apply="org.zkoss.bind.BindComposer" 
    viewModel="@id('vm')@init('org.zkoss.reference.developer.composer.MyViewModel')">
...
</window>
```

## Adding Variable Resolver to a Composer (or ViewModel)

Adding a variable resolver to a ZUL will make it available to all
composers on the ZUL. If you only want to add a variable resolver to a
specific composer (or ViewModel), you should apply the annotation

**`@VariableResolver(org.zkoss.zkplus.cdi.DelegatingVariableResolver.class)`**

on **the class that inherits `SelectorComposer` or a ViewModel**, then,
apply `@WireVariable` on variables like shown in the previous section.

Example code are as follows:

```java
@VariableResolver(org.zkoss.zkplus.cdi.DelegatingVariableResolver.class)
public class MyComposer extends SelectorComposer<Window> {

    @WireVariable
    private UserPreference userPreference;
...
}
```

# Warning: Declare a Composer (or ViewModel) as a CDI bean

Developers might tend to make a composer (or a ViewModel) as a CDI bean,
but we don't recommend this approach. Because none of CDI's copes
matches correctly with the life cycle of the composers. The scope of a
composer is "desktop" scope. It is shorter than "session" and longer
than "prototype". Only ZK knows when to create composers (or ViewModel),
so it's better to let composers be managed by ZK.

If you insist on making composers (or ViewModel) as CDI beans,
`@Dependent` scope could be a feasible scope but you need to use with
care; each time you try to resolve a composer bean, you will get a new
instance of a composer. If the composer stores some states, it would
cause inconsistency states among multiple composers.

# Example Source Code

All source code of examples used in this chapter can be found
[here](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.cdi).

# Version History

| Version | Date          | Content                  |
|---------|---------------|--------------------------|
| 6.5.0   | November 2012 | Rewrite for improvement. |
