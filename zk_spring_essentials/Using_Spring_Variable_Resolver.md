### Purpose

Access Spring managed bean within ZK framework

We assume you are already familiar with the Spring Framework - If not
please **refer to the official and extensive [Spring Framework Documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/).**

### DelegatingVariableResolver

You can access any spring managed beans by its id within ZK, for
example, on the ZUML page by declaring `variable-resolver` for
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html) at
the top of your ZUML page.

Lets define a simple bean first

```java
package org.zkoss.zkspringessentials.beans;
public class SimpleBean {
        private String message;
        
        public SimpleBean(String msg) {
                this.message = msg;
        }
        public String getMessage() {
                return message;
        }
}
```

Spring offers different ways of declaring your beans. The classical way
is to declare this bean in your applicationContext.xml Spring
configuration file as below.

```xml
<bean id="simpleBean" class="org.zkoss.zkspringessentials.beans.SimpleBean">
    <constructor-arg value="Hello from a simple bean"/>
</bean>
```

The alternative Java Config to achieve the same (choose for yourself:
Spring and ZK will treat both beans equivalently during runtime):

```java
    @Bean
    public SimpleBean simpleBean() {
        return new SimpleBean("Hello from a simple bean");
    }
```

Now using the
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html)
you can access this bean in ZSCRIPT, EL expressions and ZK data binding
annotations.

#### Access Spring beans in ZSCRIPT

You can access SimpleBean by its bean id in ZSCRIPT as shown below

```xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<zk>
<zscript>
        String msg = simpleBean.message;
</zscript>
<window title="Bean in ZScript" width="640px" border="normal" >
    <label value="${msg}"/>
</window>
</zk>
```

#### Access Spring beans in EL expressions

Similarly you can also access Spring managed beans in any EL expressions
as shown below

```xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<zk>
<window title="Bean in EL Expression" width="640px" border="normal" >
    <label value="${simpleBean.message}"/>
</window>
</zk>
```

#### Access Spring beans in ZK Databinding annotations

The same
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html)
also resolves Spring beans in ZK Databinding expressions:

```xml
<?variable-resolver class="org.zkoss.zkplus.spring.DelegatingVariableResolver"?>
<zk>
<window title="Bean in Databinding Annotation" width="640px" border="normal" 
    viewModel="...">
    <label value="@load(simpleBean.message)"/>
</window>
</zk>
```

### SpringUtil

You can also access Spring beans on a ZUML page without
[org.zkoss.zkplus.spring.DelegatingVariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/DelegatingVariableResolver.html) by
using a utility class
[org.zkoss.zkplus.spring.SpringUtil](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkplus/spring/SpringUtil.html) method
<javadoc method="getBean()">org.zkoss.zkplus.spring.SpringUtil</javadoc>.
Here is an example code to demonstrate this

```xml
<zk>
<zscript>
        import org.zkoss.zkplus.spring.SpringUtil;
        import org.zkoss.zkspringessentials.beans.*;
        SimpleBean simple = SpringUtil.getBean("simpleBean");
        String msg = simple.getMessage();
</zscript>
<window title="Example for SpringUtil#getBean" width="640px" border="normal" >
    <label value="${msg}"/>
</window>
</zk>
```
