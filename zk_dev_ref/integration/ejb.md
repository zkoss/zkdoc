\_\_TOC\_\_

Enterprise JavaBeans (EJB) technology is the server-side component
architecture for Java EE. Here we describe how to use it in a ZUML
document.

Here we use [JBoss](http://jboss.org) as the example. The configuration
of the server might vary from one server to another, but the ZUML
document is the same.

Notice that if you would like to access EJB in Java (such as in [a
composer](ZK_Developer's_Reference/MVC/Controller/Composer)
or in [a
richlet](ZK_Developer's_Reference/UI_Composing/Richlet)), you
could skip this section (since you could use the approach described in
any EJB guide).

# Use JndiVariableResolver to Resolve EJB in EL Expressions

Referencing an EJB in an EL expression is straightforward: specifying
<javadoc>org.zkoss.zkplus.jndi.JndiVariableResolver</javadoc> in [the
variable-resolver
directive](ZUML_Reference/ZUML/Processing_Instructions/variable-resolver).
For example,

``` xml
<?variable-resolver class="org.zkoss.zkplus.jndi.JndiVariableResolver" ?>
<window>
...
</window>
```

Depending your configuration, you might have to pass extra information
about JNDI to it such as:

``` xml
<?variable-resolver class="org.zkoss.zkplus.jndi.JndiVariableResolver"
  arg0="ZkEJB3Demo"
  arg1="mail=java:comp/env/mailing,sec=java:comp/security/module" ?>
<!--
    arg0: prepend - the prepended part of JDNDI name
    arg1: mapping - the key-value pairs for JNDI names and the corresponding variable names
-->
<window>
...
</window>
```

<javadoc>org.zkoss.zkplus.jndi.JndiVariableResolver</javadoc> will
resolve variables in the following order:

1.  java:comp/env
2.  java:comp
3.  java:
4.  Variable could be found as a session beans with the `prepend`
    argument (arg0).
5.  The key-value pairs which is defined in the `mapping` argument
    (arg1)

# Example: Retrieve Session Beans

The session beans are bound to the `java:comp/env` configured by
`jboss-web.xml` and `web.xml`. For example, suppose we have them as
follows:

**`jboss-web.xml`**:

``` xml
<ejb-local-ref>
    <ejb-ref-name>personLocalBean</ejb-ref-name>
    <ejb-ref-type>Session</ejb-ref-type>
    <local>demo.PersonBeanLocal</local>
    <local-jndi-name>ZkEJB3Demo/PersonBean/local</local-jndi-name>
</ejb-local-ref>
```

**`web.xml`**:

``` xml
<ejb-local-ref>
    <ejb-ref-name>personLocalBean</ejb-ref-name>
    <ejb-ref-type>Session</ejb-ref-type>
    <local-home>demo.PersonBeanLocal</local-home>
    <local>demo.PersonBeanLocal</local>
</ejb-local-ref>
```

Then, we could access them as follows.

``` xml
<?variable-resolver class="org.zkoss.zkplus.jndi.JndiVariableResolver" ?>
<listbox width="600px">
    <listhead sizable="true">
        <listheader label="name" sort="auto"/>
        <listheader label="email" sort="auto"/>
    </listhead>
    <listitem forEach="${personLocalBean.allPersons}"> <!-- resolve personLocalBean from JNDI -->
        <listcell label="${each.name}"/>
        <listcell label="${each.email}"/>
    </listitem>
</listbox>
```

The variables provided by a variable resolver is also available to the
Java code in
[zscript](ZK_Developer's_Reference/UI_Composing/ZUML/Scripts_in_ZUML).
For example,

``` xml
<zscript>
personLocalBean.createDemoData();
</zscript>
```

# Example: Retrieve EntityManagerFactory

Persistence units are not bound into JNDI by default, so we have to
define JBoss specific properties in `persistence.xml` to bind them into
JNDI. For example,

``` xml
</persistence-unit>
    <properties>
        <property name="jboss.entity.manager.factory.jndi.name" value="java:comp/entityManagerFactory"/>
    </properties>
</persistence-unit>
```

Then, we could retrieve the entity manager factory by use of
<javadoc>org.zkoss.zkplus.jndi.JndiVariableResolver</javadoc>.

# Source Code

You can get all source code mentioned in this section at
[github](https://github.com/zkoss/zkbooks/tree/master/developersreference/integration.ejb)
