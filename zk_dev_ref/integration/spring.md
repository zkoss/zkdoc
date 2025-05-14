# Overview

Spring Framework is a popular application development framework for
enterprise Java. One key element is its infrastructural support: a
light-weighted container that manages POJOs as Spring beans and maintain
beans' dependency injection relationship. We will talk about several
integration ways including wiring and accessing beans in various
conditions. We assume that readers have knowledge in Spring's basic
configuration and concept such as bean scope, we will therefore not
cover these topics here. Please refer to [Spring
documentation](http://www.springsource.org/spring-framework#documentation).

# Configuration

The minimal Maven dependency you need is :

``` xml
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
    </dependency>
```

<div style="-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;color:#c06330;padding:15px 40px;background:#fed no-repeat 13px 13px;margin-bottom:10px">

![]({{site.baseurl}}/zk_dev_ref/images/Icon_info.png) **Note:** If you don't use Maven,
please refer to Spring Framework Reference Documentation to know which
JAR file you need.

</div>

To integrate ZK application with Spring, the minimal configuration you
have to setup is the following:

**Spring related configuration in web.xml**

``` xml
    <!-- Loads the Spring application context configuration -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- For using web scoped bean -->
    <listener>
        <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
    </listener>
```

You can enable Spring's classpath scanning to register beans.

**WEB-INF/applicationContext.xml**

``` xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <!-- Scans for application @Components to deploy -->
    <context:component-scan base-package="org.zkoss.reference.developer" />

</beans>
```

- Line 12: Apply `@Component` on those classes that you plan to register
  them as Spring beans and specify the base package of those classes.

# Access a Spring Bean in a ZUL

ZUL provides a feature called [ variable
resolver]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/EL_Expressions#Variable_Resolver)
that allows users to access Spring bean using EL expressions. Simply put
the below directive on top of a ZUML page:

**`<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver" ?>`**

Then, on the rest of your page, you can access a Spring-Managed bean
directly using its **bean id**.

Assume that we have 2 beans:

``` java

@Component
@Scope("session")
public class UserPreference {
...
}
```

- User preference should be distinct for each user but shared among
  multiple requests. It is suitable to be a session-scoped bean.

``` java
@Component
public class SystemConfiguration {
...
}
```

- As system configuration should be shared within the whole application,
  this should be a singleton bean.

**Access Spring beans with EL**

``` xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window title="Access Bean with different scopes" border="normal" width="700px"
    apply="org.zkoss.reference.developer.composer.ResolverComposer">
    <vlayout>
        <hlayout>
            User Preference :
            <label id="sessionValue">${userPreference.value}</label>
        </hlayout>
        <hlayout>
            System Configuration :
            <label id="singletonValue">${systemConfiguration.value}</label>
        </hlayout>
    </vlayout>
</window>
```

- The delegating variable-resolver will look-up the bean named
  `userPreference` automatically for you.

# Wire a Spring Bean in a Controller

It is a common requirement that we need a Spring bean in a Controller
(composer/ViewModel), e.g. calling an authentication bean to do login.
You can inject Spring beans into ZK Composer/ViewModel in the following
2 approaches.

| Approach          | Spring @Autowire                     | ZK @WireVariable                             |
|-------------------|--------------------------------------|----------------------------------------------|
| **Primary Use**   | Spring-managed ZK controller         | ZK-managed controller                        |
| **Configuration** | Requires Spring bean registration    | Requires ZK's \`DelegatingVariableResolver\` |
| **Flexibility**   | Injects based on type or bean id     | Injects based on bean id                     |
| **Usage**         | Spring-managed Composer or ViewModel | Any ZK Composer or ViewModel                 |

## Spring's @Autowire

ZK stores a Composer/ViewModel as a component's attribute, and you can
dynamically add/remove components at any time. If you want a fresh new
state of a component when each time you add/create it, you should
declare a Composer/ViewModel as a `prototype` bean. Then you can use
`@Autowire` to wire Spring beans into a Composer/ViewModel.

``` java
@Component
@Scope("prototype")
public class MyComposer extends SelectorComposer<Window> {

    @Autowired
    private MyService myService;

}
```

### Apply a Spring Bean Composer/ViewModel

If you choose this way, you need to specify a Spring bean id when you
apply a composer or ViewModel:

``` xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<vlayout apply="${orderBeanComposer}" >
...
<window viewModel="@id('vm') @init(orderBeanVm)">
```

- Line 1: see
  [\#Access_a_Spring_Bean_in_a_ZUL](#Access_a_Spring_Bean_in_a_ZUL)
- Line 2, 4: you should specify the bean id of your controller instead
  of the full-qualified class name.

## Wire a Spring bean in a Composer

Alternatively, ZK provides another way to wire a Spring bean to a
composer which is not a Spring-managed bean. When we apply a
`SelectorComposer` to a ZUL with
`org.zkoss.zkplus.spring.DelegatingVariableResolver` mentioned in the
previous section, we can apply annotation, `@WireVariable` on a member
field we want to wire a Spring bean with. ZK will then wire the
corresponding Spring bean on the variable **using a variable name that's
the same as the bean's name**. Or, you can specify the bean's name with
`@WireVariable("beanName")`.

**A composer that wires Spring beans**

``` java
public class ResolverComposer extends SelectorComposer<Window> {

    @WireVariable
    private OrderService orderService;
    
    @Wire("#number")
    private Label label;
    
    @Override
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        label.setValue(Integer.toString(orderService.list().size()));
    }

}
```

- Line 1: `@WireVariable("beanName")` only works inside a
  `SelectorComposer`.

**A ZUL with Spring variable resolver**

``` xml

<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<window title="Access Bean with different scopes" border="normal" width="700px"
    apply="org.zkoss.reference.developer.spring.composer.ResolverComposer">
...
</window>
```

## Wire a Spring bean in a ViewModel

Wiring a Spring bean in a ViewModel is very similar to the case in a
composer, simply apply `@WireVariable` with variable resolver. In the
example below we put variable resolver in a zul with a directive.

**A ViewModel that wires a Spring bean**

``` java

public class OrderVM {

    @WireVariable
    private OrderService orderService;

    ...
}
```

**The zul uses OrderVM with a Spring variable resolver**

``` xml

<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<zk>
<window title="Order Management" border="normal" width="600px" apply="org.zkoss.bind.BindComposer" 
viewModel="@id('vm') @init('org.zkoss.reference.developer.spring.order.viewmodel.OrderVM')" 
validationMessages="@id('vmsgs')">

...
</window>
</zk>
```

## Adding Variable Resolver to a Composer/ViewModel

Adding a variable resolver to a ZUL will make it available to all
composers on the ZUL. If you want to add a variable resolver to a
specific composer (or ViewModel) only, you should apply the annotation

**`@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver.class)`**

on **the class that inherits `SelectorComposer` or a ViewModel**. Then,
apply `@WireVariable` on variables like we did in the previous section.

Example code are as follows:

``` java
@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver.class)
public class SpringComposer extends SelectorComposer<Window> {

    @WireVariable
    private OrderService orderService;
...
}
```

# Retrieve a Spring Bean Programmatically

`org.zkoss.zkplus.spring.SpringUtil` is a utility class that allows you
to get Spring-managed beans by their name in Java.

``` java
public class SpringComposer extends SelectorComposer<Window> {

    @Wire("#number")
    private Label label;
    
    @Override
    public void doAfterCompose(Window comp) throws Exception {
        super.doAfterCompose(comp);
        OrderService orderService = (OrderService)SpringUtil.getBean("orderService");
        label.setValue(Integer.toString(orderService.list().size()));
    }
}
```

# Using Scoped-Proxy in a Clustering Environment

We recommend you to apply scoped-proxy on those beans used in a composer
(or a ViewModel) and are not serialized during a session replication. A
reference to a bean might be invalid after session replication in a
clustering environment. Hence, even if you use a singleton bean, it's
better to use the scoped proxy bean. See [Spring Framework
Reference](https://docs.spring.io/spring-framework/docs/5.3.9/reference/html/core.html#beans-factory-scopes-other-injection)

# ZK Spring Addon

ZK also provides additional features for Spring and Spring Security.
Please refer to [ZK Spring Essentials](ZK_Spring_Essentials)
for details.

# Example Source Code

You can get all source code mentioned in this chapter at
[GitHub/zkoss/zkbooks](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.spring).
